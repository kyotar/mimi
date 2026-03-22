'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { getPalette, type UIShow } from '@/lib/types'

export default function ShowThumb({ show }: { show: UIShow }) {
  const { play, currentShow, isPlaying } = usePlayer()
  const palette = getPalette(show.id)
  const isActive = currentShow?.id === show.id && isPlaying

  return (
    <div className="flex-shrink-0 w-28 md:w-32 group">
      <Link
        href={`/shows/${show.id}`}
        className="relative block aspect-square rounded-mimi overflow-hidden"
        style={{ backgroundColor: palette.bg }}
      >
        {show.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={show.imageUrl}
            alt={show.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif text-3xl font-bold opacity-20 select-none"
              style={{ color: palette.fg }}
            >
              {show.title.slice(0, 2)}
            </span>
          </div>
        )}

        {/* Play overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              play(show)
            }}
            className="w-8 h-8 rounded-full bg-cream/90 hover:bg-cream flex items-center justify-center transition-colors"
            aria-label={`${show.title}を再生`}
          >
            {isActive ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1.5" y="1.5" width="3" height="9" rx="1" fill="#1c1a17" />
                <rect x="7.5" y="1.5" width="3" height="9" rx="1" fill="#1c1a17" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" fill="#1c1a17" />
              </svg>
            )}
          </button>
        </div>

        {isActive && (
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rust" />
        )}
      </Link>

      <p className="font-sans text-xs text-ink font-medium mt-1.5 leading-snug line-clamp-2 px-0.5">
        {show.title}
      </p>
    </div>
  )
}
