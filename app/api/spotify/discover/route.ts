import { searchShows } from '@/lib/spotify'
import type { NextRequest } from 'next/server'

const CATEGORY_QUERIES: Record<string, string[]> = {
  'すべて':   ['日本語 podcast', 'テック podcast japan', 'ビジネス podcast japan'],
  'デザイン': ['デザイン podcast', 'UI UX design podcast japan', 'クリエイティブ podcast'],
  'テック':   ['テック エンジニア podcast', 'technology podcast japan', 'IT programming podcast'],
  'ビジネス': ['ビジネス podcast japan', 'スタートアップ起業家 podcast', 'business japan podcast'],
  'ライフ':   ['ライフスタイル podcast japan', 'culture lifestyle podcast japan', 'wellness podcast japan'],
}

export async function GET(req: NextRequest) {
  const cat = req.nextUrl.searchParams.get('category') ?? 'すべて'
  const queries = CATEGORY_QUERIES[cat] ?? CATEGORY_QUERIES['すべて']
  const perQuery = 10

  try {
    const results = await Promise.all(queries.map((q) => searchShows(q, perQuery)))
    const seen = new Set<string>()
    const shows = results.flat().filter((s) => {
      if (!s || seen.has(s.id)) return false
      seen.add(s.id)
      return true
    })
    return Response.json(shows)
  } catch (err) {
    console.error('Discover error:', err)
    return Response.json({ error: 'Failed to fetch shows' }, { status: 500 })
  }
}
