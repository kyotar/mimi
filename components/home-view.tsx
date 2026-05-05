'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PodcastGrid from '@/components/podcast-grid'
import HalfModal from '@/components/half-modal'
import SearchOverlay from '@/components/search-overlay'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { CATEGORIES, type Category, type UIShow } from '@/lib/types'

const PAGE_SIZE = 24

interface Props {
  initialCategory: Category
  initialShows: UIShow[]
  initialTotal: number
}

export default function HomeView({ initialCategory, initialShows, initialTotal }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory)
  const [shows, setShows] = useState<UIShow[]>(initialShows)
  const [offset, setOffset] = useState(PAGE_SIZE)
  const [total, setTotal] = useState(initialTotal)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedShow, setSelectedShow] = useState<UIShow | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const mountedRef = useRef(false)

  // Hide-on-scroll header
  useEffect(() => {
    let prev = window.scrollY
    const onScroll = () => {
      const cur = window.scrollY
      setHidden(cur > prev && cur > 100)
      prev = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Refetch on category change (skip first mount)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    let cancelled = false
    setIsLoading(true)
    fetch(`/api/spotify/discover?category=${encodeURIComponent(activeCategory)}`)
      .then((r) => r.json())
      .then((data: { shows: UIShow[]; total: number }) => {
        if (cancelled) return
        setShows(Array.isArray(data.shows) ? data.shows : [])
        setTotal(data.total ?? 0)
        setOffset(PAGE_SIZE)
        setIsLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [activeCategory])

  const hasMore = offset < total
  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return
    setIsLoading(true)
    fetch(
      `/api/spotify/discover?category=${encodeURIComponent(activeCategory)}&offset=${offset}`
    )
      .then((r) => r.json())
      .then((data: { shows: UIShow[]; total: number }) => {
        const newShows = Array.isArray(data.shows) ? data.shows : []
        setShows((prev) => {
          const seen = new Set(prev.map((s) => s.id))
          return [...prev, ...newShows.filter((s) => !seen.has(s.id))]
        })
        setOffset((o) => o + PAGE_SIZE)
        setTotal(data.total ?? 0)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [activeCategory, offset, hasMore, isLoading])

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !isLoading)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 bg-ink/90 backdrop-blur-sm transition-transform duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <a href="/" className="font-serif italic text-xl text-rust flex-shrink-0">
            mimi
          </a>
          <nav className="flex gap-2 overflow-x-auto scrollbar-none flex-1 min-w-0">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                    active
                      ? 'bg-rust text-cream'
                      : 'text-cream/50 hover:text-cream/80'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </nav>
          <button
            onClick={() => setSearchOpen(true)}
            className="text-cream/70 hover:text-cream flex-shrink-0"
            aria-label="検索"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </header>

      <main className="pt-14">
        <PodcastGrid shows={shows} isLoading={isLoading} onSelect={setSelectedShow} />
        <div ref={sentinelRef} className="h-1" />
        {!hasMore && shows.length > 0 && (
          <p className="text-center font-mono text-xs text-cream/30 py-8">
            すべて見ました
          </p>
        )}
      </main>

      <HalfModal
        show={selectedShow}
        category={activeCategory}
        onClose={() => setSelectedShow(null)}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={setSelectedShow}
      />
    </>
  )
}
