import Link from 'next/link'
import type { UIShow } from '@/lib/types'

interface ShowGridProps {
  shows: UIShow[]
}

export default function ShowGrid({ shows }: ShowGridProps) {
  if (shows.length === 0) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
      {shows.map((show) => (
        <Link
          key={show.id}
          href={`/shows/${show.id}`}
          className="block group"
        >
          <div className="aspect-square overflow-hidden border border-tan rounded-mimi mb-3">
            {show.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={show.imageUrl}
                alt={show.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-tan/40 flex items-center justify-center">
                <span className="font-serif text-3xl text-ink/30 select-none">
                  {show.title.slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <p className="font-sans text-sm text-ink line-clamp-2 leading-relaxed">
            {show.title}
          </p>
        </Link>
      ))}
    </div>
  )
}
