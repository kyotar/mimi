import PodcastCard from './podcast-card'
import type { UIShow } from '@/lib/types'

interface GalleryGridProps {
  shows: UIShow[]
}

export default function GalleryGrid({ shows }: GalleryGridProps) {
  if (shows.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="font-sans text-ink/40 text-sm">番組が見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 px-6 py-6">
      {shows.map((show) => (
        <PodcastCard key={show.id} show={show} />
      ))}
    </div>
  )
}
