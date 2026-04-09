import GalleryClient from './gallery-client'
import { searchShows } from '@/lib/spotify'
import { CATEGORY_QUERIES } from '@/lib/categories'
import type { Category, UIShow } from '@/lib/types'

export const revalidate = 3600

const GALLERY_PAGE_SIZE = 24

async function fetchCategory(cat: Category): Promise<{ shows: UIShow[]; total: number }> {
  const queries = CATEGORY_QUERIES[cat] ?? CATEGORY_QUERIES['すべて']
  const results = await Promise.all(queries.map((q) => searchShows(q, 10)))
  const total = Math.max(...results.map((r) => r.total))
  const seen = new Set<string>()
  const allShows = results.flatMap((r) => r.items).filter((s) => {
    if (!s || seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })
  return { shows: allShows.slice(0, GALLERY_PAGE_SIZE), total }
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const initialCategory = (searchParams.category as Category) ?? 'すべて'
  const { shows, total } = await fetchCategory(initialCategory)

  return (
    <GalleryClient
      initialCategory={initialCategory}
      initialShows={shows}
      initialTotal={total}
    />
  )
}
