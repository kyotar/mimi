'use client'

import { type UIShow } from '@/lib/types'

interface Props {
  shows: UIShow[]
  isLoading: boolean
  onSelect: (show: UIShow) => void
}

export default function PodcastGrid({ shows, isLoading, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-[2px] bg-ink select-none">
      {shows.map((show) => (
        <button
          key={show.id}
          onClick={() => onSelect(show)}
          className="aspect-square overflow-hidden group relative bg-vinyl"
        >
          {show.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={show.imageUrl}
              alt={show.title}
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-2xl text-white/30 select-none">
                {show.title.slice(0, 2)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/70 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-end p-2 pointer-events-none">
            <p className="font-sans text-xs text-white line-clamp-2 leading-tight">
              {show.title}
            </p>
          </div>
        </button>
      ))}
      {isLoading &&
        Array.from({ length: 12 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="aspect-square bg-white/5 animate-pulse" />
        ))}
    </div>
  )
}
