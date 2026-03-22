'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { getPalette, type UIShow } from '@/lib/types'

interface CoverCardProps {
  show: UIShow
}

export default function CoverCard({ show }: CoverCardProps) {
  const { play, currentShow, isPlaying } = usePlayer()
  const palette = getPalette(show.id)
  const isActive = currentShow?.id === show.id && isPlaying

  return (
    <Link
      href={`/shows/${show.id}`}
      className="relative block aspect-square overflow-hidden group"
      style={{ backgroundColor: palette.bg }}
    >
      {/* Cover art */}
      {show.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={show.imageUrl}
          alt={show.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif text-4xl font-bold opacity-20 select-none"
            style={{ color: palette.fg }}
          >
            {show.title.slice(0, 2)}
          </span>
        </div>
      )}

      {/* Hover / active overlay */}
      <div
        className={`
          absolute inset-0 flex flex-col justify-end p-3
          bg-gradient-to-t from-black/80 via-black/20 to-transparent
          transition-opacity duration-200
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            play(show)
          }}
          className="self-start mb-2 w-9 h-9 rounded-full bg-cream/90 hover:bg-cream flex items-center justify-center transition-colors"
          aria-label={`${show.title}を再生`}
        >
          {isActive ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="3.5" height="10" rx="1" fill="#1c1a17" />
              <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="#1c1a17" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2l9 5-9 5V2z" fill="#1c1a17" />
            </svg>
          )}
        </button>
        <p className="font-sans text-xs text-cream/90 font-medium leading-tight line-clamp-2">
          {show.title}
        </p>
        {show.host && <p className="font-mono text-xs text-cream/50 mt-0.5">{show.host}</p>}
      </div>

      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rust" />
      )}
    </Link>
  )
}
