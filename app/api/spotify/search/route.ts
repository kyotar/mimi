import { searchShows } from '@/lib/spotify'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (!q.trim()) return Response.json([])

  try {
    return Response.json(await searchShows(q, 10))
  } catch (err) {
    console.error('Search error:', err)
    return Response.json({ error: 'Search failed' }, { status: 500 })
  }
}
