import { searchShows } from '@/lib/spotify'
import { CATEGORY_QUERIES } from '@/lib/categories'
import type { Category } from '@/lib/types'
import type { NextRequest } from 'next/server'

const PAGE_SIZE = 48
const PER_QUERY_LIMIT = 10
const WINDOWS_PER_PAGE = 2
const QUERY_STEP = PER_QUERY_LIMIT * WINDOWS_PER_PAGE

export async function GET(req: NextRequest) {
  const cat = (req.nextUrl.searchParams.get('category') ?? 'すべて') as Category
  const offset = Number(req.nextUrl.searchParams.get('offset') ?? '0')
  const queries = CATEGORY_QUERIES[cat] ?? CATEGORY_QUERIES['すべて']

  try {
    const tasks = queries.flatMap((q) =>
      Array.from({ length: WINDOWS_PER_PAGE }, (_, i) =>
        searchShows(q, PER_QUERY_LIMIT, offset + i * PER_QUERY_LIMIT)
      )
    )
    const results = await Promise.all(tasks)
    const total = Math.max(...results.map((r) => r.total), 0)
    const seen = new Set<string>()
    const allShows = results.flatMap((r) => r.items).filter((s) => {
      if (!s || seen.has(s.id)) return false
      seen.add(s.id)
      return true
    })
    const shows = allShows.slice(0, PAGE_SIZE)
    const nextOffset = offset + QUERY_STEP
    return Response.json({ shows, total, nextOffset, hasMore: nextOffset < total })
  } catch (err) {
    console.error('Discover error:', err)
    return Response.json({ error: 'Failed to fetch shows' }, { status: 500 })
  }
}
