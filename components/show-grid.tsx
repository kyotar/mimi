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
        className="relative aspect-square rounded-mimi overflow-hidden border border-tan transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-md"
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
      <p className="font-sans text-[13px] text-ink font-medium mt-2 leading-[1.6] line-clamp-2 group-hover:text-rust transition-colors">
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-6">
      {shows.map((show) => (
        <ShowGridCard key={show.id} show={show} />
      ))}
    </div>
  )
}
