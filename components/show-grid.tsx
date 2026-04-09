'use client'

import Link from 'next/link'
import PodcastCard from './podcast-card'
import type { UIShow } from '@/lib/types'

interface ShowGridProps {
  shows: UIShow[]
}

export default function ShowGrid({ shows }: ShowGridProps) {
  if (shows.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-6">
      {shows.map((show) => (
        <div key={show.id}>
          <PodcastCard show={show} />
          <Link href={`/shows/${show.id}`} className="block mt-2">
            <p className="font-sans text-xs text-ink leading-relaxed line-clamp-2">
              {show.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  )
}
