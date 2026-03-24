import Link from 'next/link'
import ShowGrid from '@/components/show-grid'
import CategoryCards from '@/components/category-cards'
import HeroShow from '@/components/hero-show'
import { searchShows } from '@/lib/spotify'
import { getPickupKeyword, NEW_QUERIES } from '@/lib/discover'

// Revalidate every hour; keyword itself changes at UTC midnight (daily)
export const revalidate = 3600

export default async function HomePage() {
  const keyword = getPickupKeyword()

  const [pickupResult, ...newResults] = await Promise.all([
    searchShows(`${keyword} ポッドキャスト`, 10),
    ...NEW_QUERIES.map((q) => searchShows(q, 20)),
  ])

  const pickupShows = pickupResult.items

  // Deduplicate 新着・注目 shows
  const seen = new Set(pickupShows.map((s) => s.id))
  const newShows = newResults
    .flatMap((r) => r.items)
    .filter((s) => {
      if (seen.has(s.id)) return false
      seen.add(s.id)
      return true
    })
    .slice(0, 20)

  return (
    <main className="pt-14 pb-16">
      {/* キャッチコピー */}
      <div className="py-10 flex items-center justify-center px-6">
        <p className="font-serif text-2xl md:text-3xl italic text-ink text-center leading-snug">
          ジャケットで、推しの番組と出会う。
        </p>
      </div>

      {/* 今日の1枚 */}
      {pickupShows[0] && (
        <HeroShow show={pickupShows[0]} keyword={keyword} />
      )}

      {/* カテゴリーから探す */}
      <section className="py-8 border-t border-tan/40">
        <div className="px-6 mb-4">
          <h2 className="font-serif text-3xl italic text-ink">カテゴリーから探す</h2>
        </div>
        <CategoryCards />
      </section>

      {/* 新着・注目 */}
      <section className="py-8 border-t border-tan/40">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="font-serif text-3xl italic text-ink">新着・注目</h2>
          <Link
            href="/gallery"
            className="font-sans text-xs text-ink/40 hover:text-rust transition-colors"
          >
            もっと見る →
          </Link>
        </div>
        <ShowGrid shows={newShows} />
      </section>
    </main>
  )
}
