'use client'

import Link from 'next/link'
import { useSearchContext } from '@/lib/search-context'

export default function Header() {
  const { requestSearch } = useSearchContext()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cream border-b border-tan/60">
      <div className="flex items-center justify-between px-6 h-14">
        <Link href="/" className="font-serif text-2xl italic text-rust leading-none">
          mimi
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-sans text-sm text-ink hover:text-rust transition-colors"
          >
            Discover
          </Link>
          <Link
            href="/gallery"
            className="font-sans text-sm text-ink/50 hover:text-rust transition-colors"
          >
            Gallery
          </Link>
          <button
            onClick={requestSearch}
            className="text-ink/50 hover:text-rust transition-colors"
            aria-label="検索"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12.5 12.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
