import Link from 'next/link'
import { searchShows } from '@/lib/spotify'
import type { UIShow } from '@/lib/types'

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'メンタルヘルス': ['メンタル', '心理', '精神', 'ストレス', 'HSP', 'うつ', 'セラピー', 'カウンセリング', '自己肯定'],
  'ビジネス':      ['ビジネス', '経営', '仕事', '戦略', 'スタートアップ', '起業', 'マネジメント', 'マーケ'],
  'テック':        ['AI', '人工知能', 'テック', 'プログラミング', '開発', 'エンジニア', 'IT', 'ソフトウェア', 'データ', 'DX'],
  'デザイン':      ['デザイン', 'UI', 'UX', 'クリエイティブ', 'プロダクトデザイン'],
  '健康':          ['健康', 'ウェルネス', '運動', '栄養', 'フィットネス', 'ダイエット', 'ヨガ'],
  '学び':          ['学び', '勉強', '教育', '歴史', '英語', '読書', 'アカデミア', '知識'],
  'カルチャー':    ['映画', '音楽', 'カルチャー', 'アート', 'エンタメ', 'アニメ', 'ドラマ', '小説'],
  'キャリア':      ['キャリア', '転職', '働き方', '副業'],
  '雑談':          ['雑談', 'トーク', 'ラジオ', 'おしゃべり', '日常'],
}

function detectCategory(show: UIShow): string {
  const text = `${show.title} ${show.description}`.toLowerCase()
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return category
    }
  }
  return 'ポッドキャスト'
}

interface Props {
  show: UIShow
}

export default async function RelatedShows({ show }: Props) {
  const category = detectCategory(show)

  let related: UIShow[] = []
  try {
    const result = await searchShows(`${category} ポッドキャスト`, 10)
    related = result.items.filter((s) => s.id !== show.id).slice(0, 4)
  } catch {
    return null
  }

  if (related.length === 0) return null

  return (
    <section className="px-6 py-10 border-t border-tan/40">
      <h2 className="font-serif text-3xl italic text-ink mb-2">
        このジャケットが気になった人へ
      </h2>
      <p className="font-mono text-xs text-rust mb-6">#{category}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map((s) => (
          <Link key={s.id} href={`/shows/${s.id}`} className="block group">
            <div className="aspect-square overflow-hidden border border-tan rounded-mimi mb-3">
              {s.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-tan/40 flex items-center justify-center">
                  <span className="font-serif text-3xl text-ink/30 select-none">
                    {s.title.slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
            <p className="font-sans text-sm text-ink leading-relaxed line-clamp-2">
              {s.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
