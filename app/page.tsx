import HomeView from '@/components/home-view'
import Footer from '@/components/footer'
import { searchShows } from '@/lib/spotify'
import { CATEGORY_QUERIES } from '@/lib/categories'
import type { Category, UIShow } from '@/lib/types'

const PAGE_SIZE = 24
const DEFAULT_CATEGORY: Category = 'すべて'

export const revalidate = 3600

export default async function HomePage() {
  const queries = CATEGORY_QUERIES[DEFAULT_CATEGORY]

  let shows: UIShow[] = []
  let total = 0
  try {
    const results = await Promise.all(queries.map((q) => searchShows(q, 10, 0)))
    total = Math.max(...results.map((r) => r.total))
    const seen = new Set<string>()
    shows = results
      .flatMap((r) => r.items)
      .filter((s) => {
        if (!s || seen.has(s.id)) return false
        seen.add(s.id)
        return true
      })
      .slice(0, PAGE_SIZE)
  } catch {
    // fall through with empty
  }

  return (
    <>
      <HomeView
        initialCategory={DEFAULT_CATEGORY}
        initialShows={shows}
        initialTotal={total}
      />
      <Footer />
    </>
  )
}
