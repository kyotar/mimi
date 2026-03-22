'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import CategoryFilter from '@/components/category-filter'
import { SHOWS, PALETTES, type Category } from '@/lib/mock-data'

function formatPlays(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`
  return n.toLocaleString('ja-JP')
}

export default function RankingPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて')
  const { play, currentShow, isPlaying } = usePlayer()

  const ranked = [...SHOWS]
    .filter((s) => activeCategory === 'すべて' || s.category === activeCategory)
    .sort((a, b) => b.weeklyPlays - a.weeklyPlays)

  return (
    <main className="pt-14 pb-16">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {/* Section header */}
      <div className="px-6 pt-8 pb-4 border-b border-tan/40">
        <h1 className="font-serif text-2xl italic text-ink">週間ランキング</h1>
        <p className="font-mono text-xs text-ink/40 mt-1">Weekly Top Charts</p>
      </div>

      {/* Ranking list */}
      <ol>
        {ranked.map((show, i) => {
          const rank = i + 1
          const palette = PALETTES[show.palette]
          const isActive = currentShow?.id === show.id && isPlaying
          const isTop3 = rank <= 3

          return (
            <li
              key={show.id}
              className="flex items-center gap-4 px-6 py-4 border-b border-tan/30 hover:bg-tan/10 transition-colors group"
            >
              {/* Rank number */}
              <span
                className={`
                  flex-shrink-0 w-8 text-right font-mono text-sm font-medium tabular-nums
                  ${isTop3 ? 'text-rust' : 'text-ink/30'}
                `}
              >
                {String(rank).padStart(2, '0')}
              </span>

              {/* Cover thumbnail */}
              <Link
                href={`/shows/${show.id}`}
                className="flex-shrink-0 w-12 h-12 rounded-mimi overflow-hidden relative"
                style={{ backgroundColor: palette.bg }}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center font-serif text-lg font-bold opacity-30 select-none"
                  style={{ color: palette.fg }}
                >
                  {show.title.slice(0, 2)}
                </span>
                {isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-rust" />
                  </div>
                )}
              </Link>

              {/* Show info */}
              <div className="flex-1 min-w-0">
                <Link href={`/shows/${show.id}`}>
                  <p className="font-sans text-sm text-ink font-medium leading-snug hover:text-rust transition-colors truncate">
                    {show.title}
                  </p>
                </Link>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-sans text-xs text-ink/50">{show.host}</span>
                  <span className="text-tan">·</span>
                  <span
                    className="font-mono text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${palette.bg}20`, color: palette.bg }}
                  >
                    {show.category}
                  </span>
                </div>
              </div>

              {/* Weekly plays */}
              <div className="flex-shrink-0 text-right">
                <p className="font-mono text-sm text-ink font-medium tabular-nums">
                  {formatPlays(show.weeklyPlays)}
                </p>
                <p className="font-mono text-xs text-ink/30">再生 / 週</p>
              </div>

              {/* Play button */}
              <button
                onClick={() => play(show)}
                className="flex-shrink-0 w-8 h-8 rounded-full border border-tan hover:border-rust hover:text-rust text-ink/40 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                aria-label={`${show.title}を再生`}
              >
                {isActive ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1.5" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
                    <rect x="7.5" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </main>
  )
}
