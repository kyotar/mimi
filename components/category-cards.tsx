import Link from 'next/link'

const CATEGORIES = [
  { label: 'ビジネス',   bg: '#7a3520', fg: '#f5f0e8' },
  { label: 'テック',     bg: '#1c1a17', fg: '#f5f0e8' },
  { label: 'デザイン',   bg: '#b84c2a', fg: '#f5f0e8' },
  { label: 'キャリア',   bg: '#3d2e28', fg: '#d4c4a8' },
  { label: '雑談',       bg: '#c4b49a', fg: '#1c1a17' },
  { label: '健康',       bg: '#2a2520', fg: '#d4c4a8' },
  { label: 'カルチャー', bg: '#5c3a2a', fg: '#f5f0e8' },
  { label: '学び',       bg: '#4a3728', fg: '#d4c4a8' },
]

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6">
      {CATEGORIES.map(({ label, bg, fg }) => (
        <Link
          key={label}
          href={`/gallery?category=${encodeURIComponent(label)}`}
          className="relative aspect-[3/2] rounded-mimi overflow-hidden flex items-end p-4 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: bg }}
        >
          <span className="font-serif text-2xl italic leading-none" style={{ color: fg }}>
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}
