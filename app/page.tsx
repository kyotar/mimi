import HomeView from '@/components/home-view'
import Footer from '@/components/footer'
import { searchShows } from '@/lib/spotify'
import { CATEGORY_QUERIES } from '@/lib/categories'
import type { Category, UIShow } from '@/lib/types'

const PAGE_SIZE = 48
const PER_QUERY_LIMIT = 10
const WINDOWS_PER_PAGE = 2
const QUERY_STEP = PER_QUERY_LIMIT * WINDOWS_PER_PAGE
const DEFAULT_CATEGORY: Category = 'すべて'

export const revalidate = 3600

export default async function HomePage() {
  const queries = CATEGORY_QUERIES[DEFAULT_CATEGORY]

  let shows: UIShow[] = []
  let total = 0
  try {
    const tasks = queries.flatMap((q) =>
      Array.from({ length: WINDOWS_PER_PAGE }, (_, i) =>
        searchShows(q, PER_QUERY_LIMIT, i * PER_QUERY_LIMIT)
      )
    )
    const results = await Promise.all(tasks)
    total = Math.max(...results.map((r) => r.total), 0)
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

  const nextOffset = QUERY_STEP
  const hasMore = nextOffset < total

  return (
    <>
      <HomeView
        initialCategory={DEFAULT_CATEGORY}
        initialShows={shows}
        initialNextOffset={nextOffset}
        initialHasMore={hasMore}
      />
      <Footer />
    </>
  )
}
