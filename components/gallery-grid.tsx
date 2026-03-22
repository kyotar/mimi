import CoverCard from './cover-card'
import type { Show } from '@/lib/mock-data'

interface GalleryGridProps {
  shows: Show[]
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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {shows.map((show) => (
        <CoverCard key={show.id} show={show} />
      ))}
    </div>
  )
}
