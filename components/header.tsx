import Link from 'next/link'

export default function Header() {
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
            href="/ranking"
            className="font-sans text-sm text-ink/50 hover:text-rust transition-colors"
          >
            Ranking
          </Link>
        </nav>
      </div>
    </header>
  )
}
