import DiscoverClient from '@/components/discover-client'
import { searchShows } from '@/lib/spotify'
import { getPickupKeyword, NEW_QUERIES } from '@/lib/discover'

const GRID_COLS = 4
const NEW_SHOWS_LIMIT = 24

// Revalidate every hour; keyword itself changes at UTC midnight (daily)
export const revalidate = 3600

export default async function HomePage() {
  const keyword = getPickupKeyword()

  const [pickupResult, ...newResults] = await Promise.all([
    searchShows(`${keyword} ポッドキャスト`, 10),
    ...NEW_QUERIES.map((q) => searchShows(q, 10)),
  ])

  const pickupShows = pickupResult.items

  // Deduplicate 新着・注目 shows
  const seen = new Set(pickupShows.map((s) => s.id))
  const deduped = newResults.flatMap((r) => r.items).filter((s) => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })
  const trimmed = Math.min(NEW_SHOWS_LIMIT, Math.floor(deduped.length / GRID_COLS) * GRID_COLS)
  const newShows = deduped.slice(0, trimmed)

  return (
    <DiscoverClient
      pickupShow={pickupShows[0] ?? null}
      keyword={keyword}
      newShows={newShows}
    />
  )
}
