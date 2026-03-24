'use client'

import { useState, useEffect, useCallback } from 'react'

const GALLERY_PAGE_SIZE = 24
import CategoryFilter from '@/components/category-filter'
import GalleryGrid from '@/components/gallery-grid'
import { type Category, type UIShow } from '@/lib/types'

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {Array.from({ length: 21 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-tan/30"
          style={{ animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  )
}

export default function GalleryClient({ initialCategory }: { initialCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    (initialCategory as Category) ?? 'すべて'
  )
  const [shows, setShows] = useState<UIShow[]>([])
  const [total, setTotal] = useState(0)
  const [nextOffset, setNextOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setShows([])
    setTotal(0)
    setNextOffset(0)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    fetch(`/api/spotify/discover?category=${encodeURIComponent(activeCategory)}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: { shows: UIShow[]; total: number }) => {
        clearTimeout(timeout)
        const loaded = Array.isArray(data.shows) ? data.shows : []
        setShows(loaded)
        setTotal(data.total ?? 0)
        setNextOffset(GALLERY_PAGE_SIZE)
        setLoading(false)
      })
      .catch((err) => {
        clearTimeout(timeout)
        if (err.name === 'AbortError') {
          setError('読み込みがタイムアウトしました')
        } else {
          setError('番組の読み込みに失敗しました')
        }
        setLoading(false)
      })

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [activeCategory, retryCount])

  const loadMore = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)

    fetch(
      `/api/spotify/discover?category=${encodeURIComponent(activeCategory)}&offset=${nextOffset}`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
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
      .catch(() => {
        setLoadingMore(false)
      })
  }, [activeCategory, nextOffset, loadingMore])

  const hasMore = nextOffset < total

  return (
    <main className="pt-14 pb-16">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      {loading && <GallerySkeleton />}
      {error && (
        <div className="flex flex-col items-center justify-center gap-4 py-32">
          <p className="font-sans text-ink/40 text-sm">{error}</p>
          <button
            onClick={() => setRetryCount((c) => c + 1)}
            className="font-sans text-xs text-rust hover:opacity-70 transition-opacity"
          >
            再試行
          </button>
        </div>
      )}
      {!loading && !error && (
        <>
          <GalleryGrid shows={shows} />
          {hasMore && (
            <div className="flex justify-center mt-8 mb-4">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="font-sans text-sm text-ink border border-ink/30 px-6 py-2 hover:border-ink/60 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-ink"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    読み込み中…
                  </>
                ) : (
                  'もっと見る'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
