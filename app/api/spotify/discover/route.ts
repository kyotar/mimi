import { searchShows } from '@/lib/spotify'
import { CATEGORY_QUERIES } from '@/lib/categories'
import type { Category } from '@/lib/types'
import type { NextRequest } from 'next/server'

const GALLERY_PAGE_SIZE = 24

export async function GET(req: NextRequest) {
  const cat = (req.nextUrl.searchParams.get('category') ?? 'すべて') as Category
  const offset = Number(req.nextUrl.searchParams.get('offset') ?? '0')
  const queries = CATEGORY_QUERIES[cat] ?? CATEGORY_QUERIES['すべて']

  try {
    const results = await Promise.all(queries.map((q) => searchShows(q, 10, offset)))
    const total = Math.max(...results.map((r) => r.total))
    const seen = new Set<string>()
    const allShows = results.flatMap((r) => r.items).filter((s) => {
      if (!s || seen.has(s.id)) return false
      seen.add(s.id)
      return true
    })
    const shows = allShows.slice(0, GALLERY_PAGE_SIZE)
    return Response.json({ shows, total })
  } catch (err) {
    console.error('Discover error:', err)
    return Response.json({ error: 'Failed to fetch shows' }, { status: 500 })
  }
}
