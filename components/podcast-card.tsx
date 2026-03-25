'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { getPalette, type UIShow } from '@/lib/types'

interface PodcastCardProps {
  show: UIShow
}

export default function PodcastCard({ show }: PodcastCardProps) {
  const { currentShow, isPlaying } = usePlayer()
  const palette = getPalette(show.id)
  const isActive = currentShow?.id === show.id && isPlaying

  return (
    <Link
      href={`/shows/${show.id}`}
      className="relative block aspect-square overflow-hidden group border border-tan rounded-mimi transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
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

      {/* Hover overlay with play icon */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          bg-ink/60
          transition-opacity duration-200
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M13 9l14 9-14 9V9z" fill="#f5f0e8" />
        </svg>
      </div>

      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rust" />
      )}
    </Link>
  )
}
