'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import CategoryFilter from '@/components/category-filter'
import GalleryGrid from '@/components/gallery-grid'
import { type Category, type UIShow } from '@/lib/types'

const GALLERY_PAGE_SIZE = 24

interface Props {
  initialCategory: Category
  initialShows: UIShow[]
  initialTotal: number
}

export default function GalleryClient({ initialCategory, initialShows, initialTotal }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory)
  const [shows, setShows] = useState<UIShow[]>(initialShows)
  const [total, setTotal] = useState(initialTotal)
  const [nextOffset, setNextOffset] = useState(GALLERY_PAGE_SIZE)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const mountedRef = useRef(false)

  // Refetch only when user changes category (not on initial mount)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    let cancelled = false
    setLoading(true)

    fetch(`/api/spotify/discover?category=${encodeURIComponent(activeCategory)}`)
      .then((r) => r.json())
      .then((data: { shows: UIShow[]; total: number }) => {
        if (cancelled) return
        setShows(Array.isArray(data.shows) ? data.shows : [])
        setTotal(data.total ?? 0)
        setNextOffset(GALLERY_PAGE_SIZE)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [activeCategory])

  const loadMore = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)
    fetch(
      `/api/spotify/discover?category=${encodeURIComponent(activeCategory)}&offset=${nextOffset}`
    )
      .then((r) => r.json())
      .then((data: { shows: UIShow[]; total: number }) => {
        const newShows = Array.isArray(data.shows) ? data.shows : []
        setShows((prev) => {
          const seenIds = new Set(prev.map((s) => s.id))
          return [...prev, ...newShows.filter((s) => !seenIds.has(s.id))]
        })
        setTotal(data.total ?? 0)
        setNextOffset((prev) => prev + GALLERY_PAGE_SIZE)
        setLoadingMore(false)
      })
      .catch(() => setLoadingMore(false))
  }, [activeCategory, nextOffset, loadingMore])

  const hasMore = nextOffset < total

  return (
    <main className="pt-14 pb-16">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <div className={loading ? 'opacity-50 transition-opacity' : ''}>
        <GalleryGrid shows={shows} />
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8 mb-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="font-sans text-sm text-ink border border-ink/30 px-6 py-2 hover:border-ink/60 transition-colors disabled:opacity-50"
          >
            {loadingMore ? '読み込み中…' : 'もっと見る'}
          </button>
        </div>
      )}
    </main>
  )
}
