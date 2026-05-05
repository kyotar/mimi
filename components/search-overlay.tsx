'use client'

import { useEffect, useRef, useState } from 'react'
import PodcastGrid from '@/components/podcast-grid'
import { type UIShow } from '@/lib/types'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (show: UIShow) => void
}

const SUGGESTIONS = ['ビジネス', 'テック', 'デザイン', '雑談', '健康', '学び']

export default function SearchOverlay({ open, onClose, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<UIShow[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(Array.isArray(data) ? data : [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm overflow-y-auto">
      <div className="sticky top-0 z-10 bg-ink/95 backdrop-blur-sm border-b border-tan/20 px-4 py-3 flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="番組を検索…"
          className="flex-1 bg-transparent border-b border-tan/40 focus:border-cream outline-none font-sans text-sm text-cream placeholder:text-cream/40 py-2"
        />
        <button
          onClick={onClose}
          className="font-mono text-xs text-cream/60 hover:text-cream px-2"
        >
          閉じる
        </button>
      </div>

      <div className="px-4 py-6">
        {!query && (
          <div>
            <p className="font-mono text-xs text-cream/40 mb-3">気分で探す</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="border border-tan/30 rounded-full px-4 py-1.5 font-mono text-xs text-cream/70 hover:border-cream hover:text-cream transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {query && (
          <PodcastGrid
            shows={results}
            isLoading={loading}
            onSelect={(show) => {
              onSelect(show)
              onClose()
            }}
          />
        )}
        {query && !loading && results.length === 0 && (
          <p className="text-center font-mono text-xs text-cream/40 py-12">
            見つかりませんでした
          </p>
        )}
      </div>
    </div>
  )
}
