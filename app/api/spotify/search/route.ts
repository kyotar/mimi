import { searchShows } from '@/lib/spotify'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (!q.trim()) return Response.json([])

  try {
    const result = await searchShows(q, 10)
    return Response.json(result.items)
  } catch (err) {
    console.error('Search error:', err)
    return Response.json({ error: 'Search failed' }, { status: 500 })
  }
}
