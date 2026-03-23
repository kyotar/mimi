'use client'

import Link from 'next/link'
import { type UIShow } from '@/lib/types'

interface Props {
  show: UIShow
  keyword: string
}

export default function HeroShow({ show, keyword }: Props) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between px-6 mb-6">
        <div>
          <h2 className="font-serif text-3xl italic text-ink">今日の1枚</h2>
          <span className="font-mono text-xs text-rust mt-0.5 block">#{keyword}</span>
        </div>
        <Link
          href="/gallery"
          className="font-sans text-xs text-ink/40 hover:text-rust transition-colors"
        >
          すべて見る →
        </Link>
      </div>

      <div className="px-6">
        <Link
          href={`/shows/${show.id}`}
          className="flex flex-col md:flex-row gap-6 md:gap-10 group"
        >
          {/* Cover */}
          <div className="flex-shrink-0 w-full md:w-[400px] aspect-square rounded-mimi overflow-hidden border border-tan transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-md">
            {show.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={show.imageUrl}
                alt={show.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-tan/30 flex items-center justify-center">
                <span className="font-serif text-8xl font-bold text-ink/20 select-none">
                  {show.title.slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-4 md:max-w-sm">
            <h3 className="font-serif text-3xl md:text-4xl italic leading-tight text-ink group-hover:text-rust transition-colors">
              {show.title}
            </h3>
            {show.host && (
              <p className="font-sans text-sm text-ink/60">{show.host}</p>
            )}
            <p className="font-sans text-sm text-ink/70 leading-relaxed line-clamp-4">
              {show.description}
            </p>
            <span className="inline-flex items-center gap-2 bg-rust text-cream rounded-pill px-5 py-2 font-sans text-sm w-fit">
              Spotifyで聴く →
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
