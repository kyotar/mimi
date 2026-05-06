import type { NextRequest } from 'next/server'
import { getModalEpisodes } from '@/lib/spotify'

export async function GET(req: NextRequest) {
  const showId = req.nextUrl.searchParams.get('showId')
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? '3')
  if (!showId) return Response.json({ error: 'showId required' }, { status: 400 })

  try {
    const items = await getModalEpisodes(showId, limit)
    return Response.json({ items })
  } catch (err) {
    console.error('Episodes API error:', err)
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}
