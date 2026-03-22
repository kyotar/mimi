'use client'

import { useState } from 'react'
import CategoryFilter from '@/components/category-filter'
import GalleryGrid from '@/components/gallery-grid'
import { SHOWS, type Category } from '@/lib/mock-data'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('すべて')

  const shows =
    activeCategory === 'すべて'
      ? SHOWS
      : SHOWS.filter((s) => s.category === activeCategory)

  return (
    <main className="pt-14 pb-16">
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <GalleryGrid shows={shows} />
    </main>
  )
}
