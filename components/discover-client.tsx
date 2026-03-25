'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import ShowGrid from '@/components/show-grid'
import CategoryCards from '@/components/category-cards'
import HeroShow from '@/components/hero-show'
import DiscoverSearch from '@/components/discover-search'
import { useSearchContext } from '@/lib/search-context'
import { type UIShow } from '@/lib/types'

interface DiscoverClientProps {
  pickupShow: UIShow | null
  keyword: string
  newShows: UIShow[]
}

export default function DiscoverClient({ pickupShow, keyword, newShows }: DiscoverClientProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const { searchRequested, clearSearchRequest } = useSearchContext()

  // Listen for search request from header
  useEffect(() => {
    if (searchRequested) {
      setSearchOpen(true)
      clearSearchRequest()
    }
  }, [searchRequested, clearSearchRequest])

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  return (
    <main className="pt-14 pb-16">
      {/* Search area (slide-in, replaces normal content) */}
      {searchOpen ? (
        <DiscoverSearch isOpen={searchOpen} onClose={closeSearch} />
      ) : (
        <>
          {/* キャッチコピー */}
          <div className="py-10 flex items-center justify-center px-6">
            <p className="font-serif text-2xl md:text-3xl italic text-ink text-center leading-snug">
              ジャケットで、推しの番組と出会う。
            </p>
          </div>

          {/* 今日の1枚 */}
          {pickupShow && (
            <HeroShow show={pickupShow} keyword={keyword} />
          )}

          {/* 気分で掘る */}
          <section className="py-8 border-t border-tan/40">
            <div className="px-6 mb-4">
              <h2 className="font-serif text-3xl italic text-ink">気分で掘る</h2>
            </div>
            <CategoryCards />
          </section>

          {/* いま熱い番組 */}
          <section className="py-8 border-t border-tan/40">
            <div className="flex items-center justify-between px-6 mb-4">
              <h2 className="font-serif text-3xl italic text-ink">いま熱い番組</h2>
              <Link
                href="/gallery"
                className="font-sans text-xs text-ink/40 hover:text-rust transition-colors"
              >
                棚を見る →
              </Link>
            </div>
            <ShowGrid shows={newShows} />
          </section>
        </>
      )}
    </main>
  )
}
