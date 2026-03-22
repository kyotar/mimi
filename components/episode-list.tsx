'use client'

import { usePlayer } from '@/lib/player-context'
import type { Episode, Show } from '@/lib/mock-data'

interface EpisodeListProps {
  show: Show
  episodes: Episode[]
}

export default function EpisodeList({ show, episodes }: EpisodeListProps) {
  const { play, currentShow, isPlaying } = usePlayer()

  if (episodes.length === 0) {
    return (
      <p className="font-sans text-sm text-ink/40 py-8">エピソードはまだありません</p>
    )
  }

  return (
    <ol className="divide-y divide-tan/40">
      {episodes.map((ep) => {
        const isActive = currentShow?.id === show.id && isPlaying

        return (
          <li
            key={ep.id}
            className="flex items-center gap-4 py-4 group"
          >
            {/* Episode number */}
            <span className="flex-shrink-0 font-mono text-xs text-ink/30 w-6 text-right">
              {ep.number}
            </span>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-ink font-medium leading-snug">
                {ep.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-xs text-ink/40">{ep.publishedAt}</span>
                <span className="font-mono text-xs text-ink/40">{ep.duration}</span>
              </div>
            </div>

            {/* Play button */}
            <button
              onClick={() => play(show)}
              className="flex-shrink-0 w-8 h-8 rounded-full border border-tan hover:border-rust hover:text-rust flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
              aria-label={`${ep.title}を再生`}
            >
              {isActive ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1.5" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
                  <rect x="7.5" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" fill="currentColor" />
                </svg>
              )}
            </button>
          </li>
        )
      })}
    </ol>
  )
}
