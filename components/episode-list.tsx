'use client'

import { useEffect } from 'react'
import { usePlayer } from '@/lib/player-context'
import type { UIShow, UIEpisode } from '@/lib/types'

function formatDateJa(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${y}年${Number(m)}月${Number(d)}日`
}

interface EpisodeListProps {
  show: UIShow
  episodes: UIEpisode[]
}

export default function EpisodeList({ show, episodes }: EpisodeListProps) {
  const { play, pause, currentEpisode, isPlaying } = usePlayer()

  // Debug: preview_url の確認
  useEffect(() => {
    episodes.forEach((ep) => {
      console.log(`[mimi] Episode "${ep.title}" — preview_url: ${ep.audioUrl ?? 'null'}`)
    })
  }, [episodes])

  if (episodes.length === 0) {
    return (
      <p className="font-sans text-sm text-ink/40 py-8">エピソードはまだありません</p>
    )
  }

  return (
    <ol className="divide-y divide-tan/40">
      {episodes.map((ep, i) => {
        const isCurrent = currentEpisode?.id === ep.id
        const isActive = isCurrent && isPlaying
        const hasPreview = !!ep.audioUrl

        return (
          <li
            key={ep.id}
            className={`flex items-center gap-4 py-4 group relative ${
              isActive ? 'bg-cream/5' : ''
            }`}
          >
            {/* Active indicator — rust left bar */}
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-rust rounded-r" />
            )}

            <span className="flex-shrink-0 font-mono text-xs text-rust w-8 text-right">
              {show.episodeCount - i}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-ink font-medium leading-snug">
                {ep.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-xs text-ink/40">{formatDateJa(ep.publishedAt)}</span>
                <span className="font-mono text-xs text-ink/40">{ep.duration}</span>
              </div>
            </div>

            {hasPreview ? (
              <button
                onClick={() => {
                  if (isCurrent) {
                    // Same episode: toggle play/pause
                    if (isPlaying) {
                      pause()
                    } else {
                      play(show, ep)
                    }
                  } else {
                    // Different episode: start new
                    play(show, ep)
                  }
                }}
                className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  isActive
                    ? 'border-rust bg-rust text-cream'
                    : isCurrent
                      ? 'border-rust text-rust opacity-100'
                      : 'border-tan text-ink hover:border-rust hover:bg-rust hover:text-cream opacity-0 group-hover:opacity-100'
                }`}
                aria-label={`${ep.title}を${isActive ? '停止' : '再生'}`}
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
            ) : (
              <a
                href={show.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 font-mono text-[11px] text-rust hover:opacity-70 transition-opacity"
              >
                Spotifyで聴く →
              </a>
            )}
          </li>
        )
      })}
    </ol>
  )
}
