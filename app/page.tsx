import Link from 'next/link'
import ShowScroll from '@/components/show-scroll'
import CategoryCards from '@/components/category-cards'
import { searchShows } from '@/lib/spotify'
import { getPickupKeyword, NEW_QUERIES } from '@/lib/discover'

// Revalidate every hour; keyword itself changes at UTC midnight (daily)
export const revalidate = 3600

export default async function HomePage() {
  const keyword = getPickupKeyword()

  const [pickupShows, ...newResults] = await Promise.all([
    searchShows(`${keyword} podcast`, 10),
    ...NEW_QUERIES.map((q) => searchShows(q, 10)),
  ])

  // Deduplicate 新着・注目 shows
  const seen = new Set(pickupShows.map((s) => s.id))
  const newShows = newResults
    .flat()
    .filter((s) => {
      if (seen.has(s.id)) return false
      seen.add(s.id)
      return true
    })
    .slice(0, 20)

  return (
    <main className="pt-14 pb-16">
      {/* 今週のピックアップ */}
      <section className="py-8">
        <div className="flex items-center justify-between px-6 mb-4">
          <div>
            <h2 className="font-serif text-xl italic text-ink">今週のピックアップ</h2>
            <span className="font-mono text-xs text-ink/40 mt-0.5 block">#{keyword}</span>
          </div>
          <Link
            href="/gallery"
            className="font-sans text-xs text-ink/40 hover:text-rust transition-colors"
          >
            すべて見る →
          </Link>
        </div>
        <ShowScroll shows={pickupShows} />
      </section>

      {/* カテゴリーから探す */}
      <section className="py-8 border-t border-tan/40">
        <div className="px-6 mb-4">
          <h2 className="font-serif text-xl italic text-ink">カテゴリーから探す</h2>
        </div>
        <CategoryCards />
      </section>

      {/* 新着・注目 */}
      <section className="py-8 border-t border-tan/40">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="font-serif text-xl italic text-ink">新着・注目</h2>
          <Link
            href="/gallery"
            className="font-sans text-xs text-ink/40 hover:text-rust transition-colors"
          >
            もっと見る →
          </Link>
        </div>
        <ShowScroll shows={newShows} />
      </section>
    </main>
  )
}
