'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import PodcastCard from './podcast-card'
import { type UIShow } from '@/lib/types'

const SUGGEST_TAGS = ['ビジネス', '雑談', '健康', 'テック', 'カルチャー', '学び']

interface DiscoverSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function DiscoverSearch({ isOpen, onClose }: DiscoverSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UIShow[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Debounced search
  useEffect(() => {
    const q = query.trim()
    if (!q) { setResults([]); return }

    setLoading(true)
    const timer = setTimeout(() => {
      fetch(`/api/spotify/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(Array.isArray(data) ? data : [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag)
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="animate-slideDown"
      style={{ animation: 'slideDown 0.2s ease-out' }}
    >
      {/* Search box */}
      <div className="px-6 pt-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50"
            width="18" height="18" viewBox="0 0 18 18" fill="none"
          >
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 12.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="番組名、キーワードで検索…"
            className="w-full pl-11 pr-12 py-3 bg-cream border border-tan rounded-mimi font-sans text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink transition-colors"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
            aria-label="検索を閉じる"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Suggest tags (before typing) */}
      {!query.trim() && (
        <div className="flex flex-wrap gap-2 px-6 mt-4">
          {SUGGEST_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-4 py-1.5 border border-tan rounded-pill font-mono text-xs text-ink/70 hover:text-ink hover:border-ink/40 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {query.trim() && loading && (
        <div className="flex justify-center py-16">
          <div className="w-5 h-5 border-2 border-tan/60 border-t-ink/40 rounded-full animate-spin" />
        </div>
      )}

      {/* Results grid */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-6 py-6">
          {results.map((show) => (
            <PodcastCard key={show.id} show={show} />
          ))}
        </div>
      )}

      {/* No results */}
      {query.trim() && !loading && results.length === 0 && (
        <p className="text-center font-sans text-sm text-ink/40 py-16">
          &ldquo;{query}&rdquo; に一致する番組が見つかりませんでした
        </p>
      )}
    </div>
  )
}
