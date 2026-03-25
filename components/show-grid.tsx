'use client'

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
        <PodcastCard key={show.id} show={show} />
      ))}
    </div>
  )
}
