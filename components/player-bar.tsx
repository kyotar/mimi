'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { PALETTES } from '@/lib/mock-data'

export default function PlayerBar() {
  const { currentShow, isPlaying, toggle } = usePlayer()

  if (!currentShow) return null

  const palette = PALETTES[currentShow.palette]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-vinyl border-t border-white/10">
      <div className="flex items-center gap-4 px-6 h-16">
        {/* Cover thumbnail */}
        <Link href={`/shows/${currentShow.id}`} className="flex-shrink-0">
          <div
            className="w-10 h-10 rounded-mimi flex items-center justify-center"
            style={{ backgroundColor: palette.bg }}
          >
            <span
              className="font-serif text-sm font-bold opacity-40"
              style={{ color: palette.fg }}
            >
              {currentShow.title.slice(0, 2)}
            </span>
          </div>
        </Link>

        {/* Show info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs text-cream/90 font-medium truncate">
            {currentShow.title}
          </p>
          <p className="font-mono text-xs text-cream/40 truncate">{currentShow.host}</p>
        </div>

        {/* Play / pause */}
        <button
          onClick={toggle}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
          aria-label={isPlaying ? '一時停止' : '再生'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="3.5" height="10" rx="1" fill="#f5f0e8" />
              <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="#f5f0e8" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2l9 5-9 5V2z" fill="#f5f0e8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
