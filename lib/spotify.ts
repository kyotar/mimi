import type { UIShow, UIEpisode } from './types'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API_BASE = 'https://api.spotify.com/v1'

let tokenCache: { token: string; expiresAt: number } | null = null

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.token

  const creds = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Spotify auth failed: ${res.status}`)

  const data = await res.json()
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  }
  return tokenCache.token
}

interface RawShow {
  id: string
  name: string
  publisher?: string   // present in search results, absent in full show endpoint
  description: string
  total_episodes: number
  images: { url: string }[]
  external_urls: { spotify: string }
}

interface RawEpisode {
  id: string
  name: string
  duration_ms: number
  release_date: string
  audio_preview_url: string | null
}

function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function toUIShow(s: RawShow): UIShow {
  return {
    id: s.id,
    title: s.name,
    host: s.publisher ?? '',
    description: s.description,
    episodeCount: s.total_episodes,
    imageUrl: s.images?.[0]?.url ?? null,
    spotifyUrl: s.external_urls.spotify,
  }
}

function toUIEpisode(e: RawEpisode): UIEpisode {
  return {
    id: e.id,
    title: e.name,
    duration: formatDuration(e.duration_ms),
    publishedAt: e.release_date,
    audioUrl: e.audio_preview_url ?? null,
  }
}

export async function searchShows(
  query: string,
  limit = 10,
  offset = 0
): Promise<{ items: UIShow[]; total: number }> {
  const token = await getToken()
  const safeLimit = Math.min(limit, 10)
  const params = new URLSearchParams({
    q: query,
    type: 'show',
    market: 'JP',
    limit: String(safeLimit),
    offset: String(offset),
  })
  const res = await fetch(`${API_BASE}/search?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Spotify search failed: ${res.status}`)
  const data = await res.json()
  const items = ((data.shows?.items ?? []) as RawShow[]).filter(Boolean).map(toUIShow)
  return { items, total: data.shows?.total ?? 0 }
}

export async function getShow(id: string): Promise<UIShow | null> {
  const token = await getToken()
  const res = await fetch(`${API_BASE}/shows/${id}?market=JP`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Spotify show failed: ${res.status}`)
  return toUIShow(await res.json())
}

export async function getShowEpisodes(id: string, limit = 20): Promise<UIEpisode[]> {
  const token = await getToken()
  const params = new URLSearchParams({ market: 'JP', limit: String(limit) })
  const res = await fetch(`${API_BASE}/shows/${id}/episodes?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Spotify episodes failed: ${res.status}`)
  const data = await res.json()
  return ((data.items ?? []) as RawEpisode[]).filter(Boolean).map(toUIEpisode)
}
