'use client'

import { useEffect } from 'react'
import { type UIShow } from '@/lib/types'

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

export default function HalfModal({ show, category, onClose }: Props) {
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
        className={`fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-cream">
          <div className="w-10 h-1 bg-tan rounded-full" />
        </div>
        {show && (
          <div className="px-6 pb-8 mx-auto max-w-2xl">
            <div className="flex gap-4 mb-6">
              {show.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={show.imageUrl}
                  alt={show.title}
                  className="w-24 h-24 object-cover border border-tan flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 bg-vinyl border border-tan flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-rust mb-1">{category}</p>
                <h2 className="font-serif italic text-xl text-ink leading-tight mb-2 line-clamp-2">
                  {show.title}
                </h2>
                <p className="font-sans text-xs text-ink/60">
                  {show.episodeCount}エピソード
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-ink/80 leading-relaxed mb-6 line-clamp-6 whitespace-pre-line">
              {show.description}
            </p>

            <div className="flex gap-3 mb-4">
              <a
                href={show.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-rust text-cream font-sans text-sm text-center py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Spotifyで聴く
              </a>
              <button
                onClick={handleShare}
                className="border border-tan text-ink font-mono text-xs px-4 py-3 rounded-full hover:bg-tan/30 transition-colors"
              >
                Xで紹介
              </button>
            </div>

            <a
              href={`/shows/${show.id}`}
              className="block text-center font-mono text-xs text-ink/40 hover:text-rust transition-colors"
            >
              番組詳細を見る →
            </a>
          </div>
        )}
      </div>
    </>
  )
}
