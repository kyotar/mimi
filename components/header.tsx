import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cream border-b border-tan/60">
      <div className="flex items-center justify-between px-6 h-14">
        <Link href="/" className="font-serif text-2xl italic text-rust leading-none">
          mimi
        </Link>
        <Link
          href="/"
          className="font-mono text-xs text-ink/50 hover:text-rust transition-colors"
        >
          ← 棚に戻る
        </Link>
      </div>
    </header>
  )
}
