'use client'

import { useEffect, useState } from 'react'
import { type UIShow } from '@/lib/types'

interface ModalEpisode {
  id: string
  name: string
  durationMs: number
  releaseDate: string
  spotifyUrl: string
}

interface Props {
  show: UIShow | null
  category: string
  onClose: () => void
}

function buildTweetText(show: UIShow): string {
  const hashtags = show.description.match(/#[\w぀-鿿゠-ヿ一-鿿]+/g) ?? []
  const tagStr = hashtags.length > 0 ? ' ' + hashtags.join(' ') : ''
  return `「${show.title}」をmimiで見つけた！\n${show.spotifyUrl}\n\n#mimi_podcast${tagStr}`
}

function formatDate(date: string): string {
  if (!date) return ''
  const parts = date.split('-')
  if (parts.length < 3) return date
  const [y, m, d] = parts
  return `${y}年${parseInt(m, 10)}月${parseInt(d, 10)}日`
}

function formatDuration(ms: number): string {
  const min = Math.round(ms / 60000)
  return `${min}分`
}

export default function HalfModal({ show, category, onClose }: Props) {
  const [episodes, setEpisodes] = useState<ModalEpisode[]>([])
  const [epLoading, setEpLoading] = useState(false)

  useEffect(() => {
    if (!show) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [show, onClose])

  useEffect(() => {
    if (!show) {
      setEpisodes([])
      return
    }
    let cancelled = false
    setEpLoading(true)
    fetch(`/api/episodes?showId=${show.id}&limit=3`)
      .then((r) => r.json())
      .then((data: { items?: ModalEpisode[] }) => {
        if (cancelled) return
        setEpisodes(Array.isArray(data.items) ? data.items : [])
      })
      .catch(() => {
        if (!cancelled) setEpisodes([])
      })
      .finally(() => {
        if (!cancelled) setEpLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [show])

  const handleShare = () => {
    if (!show) return
    const text = buildTweetText(show)
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-2xl transition-transform duration-300 ease-out max-h-[80vh] overflow-y-auto ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-center pt-3 pb-4 sticky top-0 bg-surface">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>
        {show && (
          <div className="mx-auto max-w-2xl">
            <div className="px-5 pb-4 flex gap-4 items-start">
              {show.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={show.imageUrl}
                  alt={show.title}
                  className="w-20 h-20 object-cover flex-shrink-0 rounded-sm"
                />
              ) : (
                <div className="w-20 h-20 bg-white/5 flex-shrink-0 rounded-sm" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-rust mb-1 uppercase tracking-wider">
                  {category}
                </p>
                <h2 className="font-serif italic text-lg text-white leading-tight line-clamp-2 mb-1">
                  {show.title}
                </h2>
                <p className="font-mono text-xs text-white/40">
                  {show.episodeCount} episodes
                </p>
              </div>
            </div>

            <p className="px-5 pb-5 font-sans text-sm text-white/60 leading-relaxed line-clamp-3 whitespace-pre-line">
              {show.description}
            </p>

            <div className="px-5 pb-5 flex gap-2">
              <a
                href={show.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-rust text-white font-sans text-sm text-center py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Spotifyで聴く
              </a>
              <button
                onClick={handleShare}
                className="border border-white/20 text-white/70 font-mono text-xs px-4 py-2.5 rounded-full hover:bg-white/5 hover:text-white transition-colors"
              >
                Xで紹介
              </button>
            </div>

            <div className="border-t border-white/10 px-5 pt-4 pb-8">
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider mb-3">
                Latest Episodes
              </p>
              {epLoading && episodes.length === 0 && (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-12 bg-white/5 animate-pulse rounded-sm" />
                  ))}
                </div>
              )}
              {!epLoading && episodes.length === 0 && (
                <p className="font-mono text-xs text-white/30 py-3">
                  エピソードを取得できませんでした
                </p>
              )}
              {episodes.map((ep, i) => (
                <a
                  key={ep.id}
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 group"
                >
                  <span className="font-mono text-xs text-rust w-4 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-white/80 leading-snug line-clamp-2 group-hover:text-white transition-colors">
                      {ep.name}
                    </p>
                    <p className="font-mono text-[10px] text-white/30 mt-1">
                      {formatDate(ep.releaseDate)} · {formatDuration(ep.durationMs)}
                    </p>
                  </div>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-xs mt-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
