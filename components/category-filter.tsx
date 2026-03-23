'use client'

import { CATEGORIES, type Category } from '@/lib/types'

interface CategoryFilterProps {
  active: Category
  onChange: (cat: Category) => void
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-14 z-30 bg-cream border-b border-tan/60">
      <div className="flex gap-1 px-6 py-3 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              flex-shrink-0 px-4 py-1.5 rounded-pill font-sans text-sm transition-colors
              ${active === cat
                ? 'bg-rust text-cream'
                : 'bg-transparent text-ink/60 hover:text-ink hover:bg-tan/40'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
