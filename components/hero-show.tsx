'use client'

import Link from 'next/link'
import { type UIShow } from '@/lib/types'

interface Props {
  show: UIShow
  keyword: string
}

export default function HeroShow({ show, keyword }: Props) {
  return (
    <section className="relative overflow-hidden py-16 px-6">
      {/* Blurred background image */}
      {show.imageUrl && (
        <div
          className="absolute inset-0 scale-[1.15]"
          style={{
            backgroundImage: `url(${show.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px)',
            opacity: 0.6,
          }}
        />
      )}
      {/* Dark overlay — Vinyl #2a2520 */}
      <div className="absolute inset-0 bg-vinyl/55" />

      {/* Foreground content */}
      <div className="relative z-[2]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-3xl italic text-cream">今日の1枚</h2>
            <span className="font-mono text-base text-rust mt-0.5 block">#{keyword}</span>
          </div>
          <Link
            href="/gallery"
            className="font-sans text-xs text-cream/70 hover:text-rust transition-colors"
          >
            棚を見る →
          </Link>
        </div>

        <Link
          href={`/shows/${show.id}`}
          className="flex flex-col md:flex-row gap-6 md:gap-10 group"
        >
          {/* Cover — PC 360px+ */}
          <div className="flex-shrink-0 w-full md:w-[400px] aspect-square rounded-mimi overflow-hidden border border-tan shadow-lg transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-xl">
            {show.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={show.imageUrl}
                alt={show.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-tan/30 flex items-center justify-center">
                <span className="font-serif text-8xl font-bold text-cream/20 select-none">
                  {show.title.slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-4 md:max-w-sm">
            <h3 className="font-serif text-3xl italic leading-tight text-cream group-hover:text-rust transition-colors">
              {show.title}
            </h3>
            {show.host && (
              <p className="font-sans text-sm text-cream/70">{show.host}</p>
            )}
            <p className="font-sans text-sm text-cream/70 leading-relaxed">
              {show.description.length > 60
                ? `${show.description.slice(0, 60)}...`
                : show.description}
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
