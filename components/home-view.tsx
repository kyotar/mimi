'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PodcastGrid from '@/components/podcast-grid'
import HalfModal from '@/components/half-modal'
import SearchOverlay from '@/components/search-overlay'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useDragScroll } from '@/hooks/useDragScroll'
import { CATEGORIES, type Category, type UIShow } from '@/lib/types'

interface Props {
  initialCategory: Category
  initialShows: UIShow[]
  initialNextOffset: number
  initialHasMore: boolean
}

export default function HomeView({
  initialCategory,
  initialShows,
  initialNextOffset,
  initialHasMore,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory)
  const [shows, setShows] = useState<UIShow[]>(initialShows)
  const [offset, setOffset] = useState(initialNextOffset)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedShow, setSelectedShow] = useState<UIShow | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const mountedRef = useRef(false)

  useDragScroll()

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
    fetch(`/api/spotify/discover?category=${encodeURIComponent(activeCategory)}&offset=0`)
      .then((r) => r.json())
      .then((data: { shows: UIShow[]; nextOffset: number; hasMore: boolean }) => {
        if (cancelled) return
        const items = Array.isArray(data.shows) ? data.shows : []
        setShows(items)
        setOffset(data.nextOffset ?? 0)
        setHasMore(items.length > 0 && Boolean(data.hasMore))
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

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return
    setIsLoading(true)
    fetch(
      `/api/spotify/discover?category=${encodeURIComponent(activeCategory)}&offset=${offset}`
    )
      .then((r) => r.json())
      .then((data: { shows: UIShow[]; nextOffset: number; hasMore: boolean }) => {
        const newShows = Array.isArray(data.shows) ? data.shows : []
        let addedCount = 0
        setShows((prev) => {
          const seen = new Set(prev.map((s) => s.id))
          const fresh = newShows.filter((s) => !seen.has(s.id))
          addedCount = fresh.length
          return [...prev, ...fresh]
        })
        setOffset(data.nextOffset ?? offset)
        const apiHasMore = Boolean(data.hasMore)
        setHasMore(apiHasMore && addedCount > 0)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [activeCategory, offset, hasMore, isLoading])

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !isLoading)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 bg-ink/95 backdrop-blur-sm transition-transform duration-300 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <a href="/" className="font-serif italic text-lg text-rust flex-shrink-0 leading-none">
            mimi
          </a>
          <nav className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1 min-w-0">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors ${
                    active
                      ? 'bg-rust text-white'
                      : 'text-white/30 hover:text-white/70'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </nav>
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white/50 hover:text-white flex-shrink-0 p-1"
            aria-label="検索"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </header>

      <main className="pt-10 cursor-grab active:cursor-grabbing">
        <PodcastGrid shows={shows} isLoading={isLoading} onSelect={setSelectedShow} />
        <div ref={sentinelRef} className="h-4" />
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
