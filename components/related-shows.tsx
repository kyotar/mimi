import PodcastCard from './podcast-card'
import { searchShows } from '@/lib/spotify'
import type { UIShow } from '@/lib/types'

const KEYWORDS = [
  'ビジネス', 'スタートアップ', 'マーケティング',
  'テクノロジー', 'エンジニア', 'AI',
  'デザイン', 'クリエイティブ',
  'キャリア', '働き方', '転職',
  '雑談', 'トーク',
  '健康', 'ウェルネス', 'メンタルヘルス',
  '映画', '音楽', 'カルチャー', 'エンタメ',
  '学び', '教育', '読書', '歴史', '英語',
  'ニュース', '社会', '経済',
]

function inferKeyword(show: UIShow): string {
  const haystack = `${show.title} ${show.description}`.toLowerCase()
  for (const k of KEYWORDS) {
    if (haystack.includes(k.toLowerCase())) return k
  }
  return 'ポッドキャスト'
}

interface Props {
  show: UIShow
}

export default async function RelatedShows({ show }: Props) {
  const keyword = inferKeyword(show)

  let related: UIShow[] = []
  try {
    const result = await searchShows(`${keyword} ポッドキャスト`, 10)
    related = result.items.filter((s) => s.id !== show.id).slice(0, 4)
  } catch {
    return null
  }

  if (related.length === 0) return null

  return (
    <section className="px-6 py-10 border-t border-tan/40">
      <h2 className="font-serif text-3xl italic text-ink mb-6">
        このジャケットが気になった人へ
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map((s) => (
          <div key={s.id}>
            <PodcastCard show={s} />
            <p className="mt-2 font-sans text-xs text-ink leading-relaxed line-clamp-2">
              {s.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
