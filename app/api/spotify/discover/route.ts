import { searchShows } from '@/lib/spotify'
import type { NextRequest } from 'next/server'

const GALLERY_PAGE_SIZE = 24

const CATEGORY_QUERIES: Record<string, string[]> = {
  'すべて':    ['ポッドキャスト おすすめ', 'ビジネス ポッドキャスト', 'テクノロジー ポッドキャスト'],
  'ビジネス':  ['ビジネス ポッドキャスト', 'スタートアップ ポッドキャスト', 'マーケティング ポッドキャスト'],
  'テック':    ['テクノロジー ポッドキャスト', 'エンジニア ポッドキャスト', 'IT ポッドキャスト'],
  'デザイン':  ['デザイン ポッドキャスト', 'クリエイティブ ポッドキャスト', 'UI UX ポッドキャスト'],
  'キャリア':  ['キャリア ポッドキャスト', '仕事 ポッドキャスト', '転職 働き方 ポッドキャスト'],
  '雑談':      ['雑談 ポッドキャスト', 'トーク ポッドキャスト', '日常 おしゃべり ポッドキャスト'],
  '健康':      ['健康 ポッドキャスト', 'ウェルネス ポッドキャスト', 'メンタルヘルス ポッドキャスト'],
  'カルチャー': ['映画 ポッドキャスト', '音楽 カルチャー ポッドキャスト', 'エンタメ ポッドキャスト'],
  '学び':      ['学び ポッドキャスト', '教育 ポッドキャスト', '読書 勉強 ポッドキャスト'],
}

export async function GET(req: NextRequest) {
  const cat = req.nextUrl.searchParams.get('category') ?? 'すべて'
  const offset = Number(req.nextUrl.searchParams.get('offset') ?? '0')
  const queries = CATEGORY_QUERIES[cat] ?? CATEGORY_QUERIES['すべて']

  try {
    const results = await Promise.all(queries.map((q) => searchShows(q, 20, offset)))
    const total = Math.max(...results.map((r) => r.total))
    const seen = new Set<string>()
    const shows = results.flatMap((r) => r.items).filter((s) => {
      if (!s || seen.has(s.id)) return false
      seen.add(s.id)
      return true
    }).slice(0, GALLERY_PAGE_SIZE)
    return Response.json({ shows, total })
  } catch (err) {
    console.error('Discover error:', err)
    return Response.json({ error: 'Failed to fetch shows' }, { status: 500 })
  }
}
