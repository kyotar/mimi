'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { getPalette, type UIShow } from '@/lib/types'

interface CoverCardProps {
  show: UIShow
}

export default function CoverCard({ show }: CoverCardProps) {
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

      {/* Hover overlay */}
      <div
        className={`
          absolute inset-0 flex flex-col justify-end p-3
          bg-gradient-to-t from-black/80 via-black/20 to-transparent
          transition-opacity duration-200
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
      >
        <p className="font-sans text-xs text-cream/90 font-medium leading-relaxed line-clamp-2">
          {show.title}
        </p>
        {show.host && <p className="font-mono text-xs text-rust mt-0.5">{show.host}</p>}
      </div>

      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rust" />
      )}
    </Link>
  )
}
