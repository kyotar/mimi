'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getPalette, type UIShow } from '@/lib/types'

const SUGGEST_TAGS = ['デザイン', '雑談', 'ビジネス', '健康', 'テック']

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UIShow[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [searchOpen])

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    if (searchOpen) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [searchOpen])

  // Debounced search
  useEffect(() => {
    const q = query.trim()
    if (!q) { setResults([]); return }

    setLoading(true)
    const timer = setTimeout(() => {
      fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(Array.isArray(data) ? data : [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, 350)

    return () => clearTimeout(timer)
  }, [query])

  const handleShowClick = useCallback((id: string) => {
    setSearchOpen(false)
    router.push(`/shows/${id}`)
  }, [router])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-cream border-b border-tan/60">
        <div className="flex items-center justify-between px-6 h-14">
          <Link href="/" className="font-serif text-2xl italic text-rust leading-none">
            mimi
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="font-sans text-sm text-ink hover:text-rust transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/gallery"
              className="font-sans text-sm text-ink/50 hover:text-rust transition-colors"
            >
              Gallery
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="text-ink/50 hover:text-rust transition-colors"
              aria-label="検索"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12.5 12.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center pt-[15vh]"
          style={{ backgroundColor: 'rgba(28,26,23,0.8)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false)
          }}
        >
          {/* Search box */}
          <div className="w-full max-w-[600px] px-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30"
                width="18" height="18" viewBox="0 0 18 18" fill="none"
              >
                <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12.5 12.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="番組名、キーワードで検索…"
                className="w-full pl-11 pr-4 py-3.5 bg-cream border border-tan rounded-mimi font-sans text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/40 transition-colors"
              />
            </div>

            {/* Suggest tags */}
            {!query.trim() && (
              <div className="flex flex-wrap gap-2 mt-4">
                {SUGGEST_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-1.5 border border-tan rounded-pill font-mono text-xs text-cream/70 hover:text-cream hover:border-cream/40 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Loading */}
            {query.trim() && loading && (
              <div className="flex justify-center mt-8">
                <div className="w-5 h-5 border-2 border-tan/40 border-t-cream/60 rounded-full animate-spin" />
              </div>
            )}

            {/* Results */}
            {!loading && results.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-1">
                {results.map((show) => {
                  const palette = getPalette(show.id)
                  return (
                    <button
                      key={show.id}
                      onClick={() => handleShowClick(show.id)}
                      className="text-left group"
                    >
                      <div
                        className="aspect-square rounded-mimi overflow-hidden border border-tan transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-md"
                        style={{ backgroundColor: palette.bg }}
                      >
                        {show.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={show.imageUrl}
                            alt={show.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span
                              className="font-serif text-3xl font-bold opacity-20 select-none"
                              style={{ color: palette.fg }}
                            >
                              {show.title.slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="font-sans text-xs text-cream/80 font-medium mt-2 leading-relaxed line-clamp-2 group-hover:text-cream transition-colors">
                        {show.title}
                      </p>
                    </button>
                  )
                })}
              </div>
            )}

            {/* No results */}
            {query.trim() && !loading && results.length === 0 && (
              <p className="text-center font-sans text-sm text-cream/40 mt-8">
                &ldquo;{query}&rdquo; に一致する番組が見つかりませんでした
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
