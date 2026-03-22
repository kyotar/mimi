'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { getPalette, type UIShow } from '@/lib/types'

function ShowGridCard({ show }: { show: UIShow }) {
  const { currentShow, isPlaying } = usePlayer()
  const palette = getPalette(show.id)
  const isActive = currentShow?.id === show.id && isPlaying

  return (
    <Link href={`/shows/${show.id}`} className="group">
      <div
        className="relative aspect-square rounded-mimi overflow-hidden"
        style={{ backgroundColor: palette.bg }}
      >
        {show.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={show.imageUrl}
            alt={show.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-serif text-4xl font-bold opacity-20 select-none"
              style={{ color: palette.fg }}
            >
              {show.title.slice(0, 2)}
            </span>
          </div>
        )}
        {isActive && (
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rust" />
        )}
      </div>
      <p className="font-sans text-xs text-ink font-medium mt-1.5 leading-snug line-clamp-2">
        {show.title}
      </p>
    </Link>
  )
}

interface ShowGridProps {
  shows: UIShow[]
}

export default function ShowGrid({ shows }: ShowGridProps) {
  if (shows.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-6">
      {shows.map((show) => (
        <ShowGridCard key={show.id} show={show} />
      ))}
    </div>
  )
}
