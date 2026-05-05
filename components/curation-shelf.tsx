import Link from 'next/link'
import type { UIShow } from '@/lib/types'
import type { CurationEntry } from '@/lib/curation'

interface Props {
  curator: string
  shows: Array<{ show: UIShow; entry: CurationEntry }>
}

export default function CurationShelf({ curator, shows }: Props) {
  if (shows.length === 0) return null

  return (
    <section className="py-10 border-t border-tan/40">
      <div className="px-6 mb-6">
        <h2 className="font-serif text-3xl italic text-ink">
          {curator}が今週聴いた棚
        </h2>
        <p className="font-sans italic text-sm text-ink/60 mt-1">
          mimiをつくった人の、今週のジャケ棚。
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {shows.map(({ show, entry }) => (
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
            <p className="font-sans text-sm text-ink line-clamp-2 leading-relaxed mb-2">
              {show.title}
            </p>
            <p className="font-sans italic text-sm text-ink/70 border-l-2 border-rust pl-3 line-clamp-3">
              {entry.comment}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
