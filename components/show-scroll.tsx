import ShowThumb from './show-thumb'
import type { UIShow } from '@/lib/types'

export default function ShowScroll({ shows }: { shows: UIShow[] }) {
  if (shows.length === 0) return null

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 pb-2">
      {shows.map((show) => (
        <ShowThumb key={show.id} show={show} />
      ))}
    </div>
  )
}
