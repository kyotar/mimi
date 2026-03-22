'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { SHOWS, PALETTES } from '@/lib/mock-data'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { play, currentShow, isPlaying } = usePlayer()

  const q = query.trim().toLowerCase()
  const results = q
    ? SHOWS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.host.toLowerCase().includes(q) ||
          s.category.includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    : []

  return (
    <main className="pt-14 pb-16">
      {/* Search input */}
      <div className="sticky top-14 z-30 bg-cream border-b border-tan/60 px-6 py-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="番組名、ホスト、カテゴリで検索…"
            autoFocus
            className="w-full pl-9 pr-4 py-2.5 bg-tan/20 border border-tan/60 rounded-mimi font-sans text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/40 focus:bg-cream transition-colors"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink transition-colors"
              aria-label="クリア"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {!q && (
        <div className="px-6 pt-12 text-center">
          <p className="font-serif text-3xl italic text-ink/10 mb-3">mimi</p>
          <p className="font-sans text-sm text-ink/30">キーワードを入力してください</p>
        </div>
      )}

      {/* No results */}
      {q && results.length === 0 && (
        <div className="px-6 pt-12 text-center">
          <p className="font-sans text-sm text-ink/40">
            &ldquo;{query}&rdquo; に一致する番組が見つかりませんでした
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="px-6 pt-5 pb-2 font-mono text-xs text-ink/30">
            {results.length}件
          </p>
          <ul className="divide-y divide-tan/30">
            {results.map((show) => {
              const palette = PALETTES[show.palette]
              const isActive = currentShow?.id === show.id && isPlaying

              return (
                <li
                  key={show.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-tan/10 transition-colors group"
                >
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

                  {/* Info */}
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
                    <p className="font-sans text-xs text-ink/40 mt-1 truncate">{show.description}</p>
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
          </ul>
        </>
      )}
    </main>
  )
}
