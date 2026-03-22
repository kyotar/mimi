'use client'

import { useState, useEffect } from 'react'
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    fetch(`/api/spotify/discover?category=${encodeURIComponent(activeCategory)}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        clearTimeout(timeout)
        setShows(Array.isArray(data) ? data : [])
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
  }, [activeCategory])

  return (
    <main className="pt-14 pb-16">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      {loading && <GallerySkeleton />}
      {error && (
        <div className="flex flex-col items-center justify-center gap-4 py-32">
          <p className="font-sans text-ink/40 text-sm">{error}</p>
          <button
            onClick={() => setActiveCategory(activeCategory)}
            className="font-sans text-xs text-rust hover:opacity-70 transition-opacity"
          >
            再試行
          </button>
        </div>
      )}
      {!loading && !error && <GalleryGrid shows={shows} />}
    </main>
  )
}
