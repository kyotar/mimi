'use client'

import { useState, useEffect } from 'react'
import CategoryFilter from '@/components/category-filter'
import GalleryGrid from '@/components/gallery-grid'
import { CATEGORIES, type Category, type UIShow } from '@/lib/types'

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="aspect-square bg-tan/30 animate-pulse" />
      ))}
    </div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて')
  const [shows, setShows] = useState<UIShow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`/api/spotify/discover?category=${encodeURIComponent(activeCategory)}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then((data) => {
        setShows(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [activeCategory])

  return (
    <main className="pt-14 pb-16">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      {loading && <GallerySkeleton />}

      {error && (
        <div className="flex items-center justify-center py-32">
          <p className="font-sans text-ink/40 text-sm">番組の読み込みに失敗しました</p>
        </div>
      )}

      {!loading && !error && <GalleryGrid shows={shows} />}
    </main>
  )
}
