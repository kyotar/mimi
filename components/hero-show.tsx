'use client'

import Link from 'next/link'
import { type UIShow } from '@/lib/types'

const CATEGORY_COMMENTS: Record<string, string> = {
  'ビジネス': 'ビジネスのヒントが詰まった一枚。',
  'スタートアップ': '起業家の熱量が滲む、今日の推し。',
  'テック': 'テクノロジーの最前線を耳で体感。',
  'テクノロジー': 'テクノロジーの最前線を耳で体感。',
  'デザイン': 'デザイナーなら一度は聴いてほしい。',
  'キャリア': '働き方を問い直す、今日の一枚。',
  '雑談': 'なんとなく流したら、沼にはまる番組。',
  '健康': '聴くだけで、今日の体が変わる気がする。',
  'ライフスタイル': '暮らしをちょっと整えたくなる一枚。',
  'カルチャー': 'センスが磨かれる一枚を、今日も。',
  '学び': '知的好奇心を刺激する今日の推し番組。',
  '英語学習': '聴いてるだけで英語耳が育つ一枚。',
  'マーケティング': 'マーケター必聴のインサイトがここに。',
  '投資': 'お金の感覚がアップデートされる一枚。',
  '旅行': '旅に出たくなる、耳からのガイド。',
  '映画': '映画好きなら絶対刺さる一枚。',
  '読書': '本を読みたくなるポッドキャスト。',
  '料理': '台所に立ちたくなる音の時間。',
  '音楽': '音楽好きの感性を揺さぶる一枚。',
  'コミュニケーション': '人との関わり方を見直す一枚。',
  'メンタルヘルス': '心を整える時間に、そっと寄り添う。',
  '社会': '今の社会を捉え直す視点をくれる一枚。',
  '経済': '経済ニュースがすっと腑に落ちる一枚。',
  '科学': '世界の仕組みに驚く、知の刺激。',
  '歴史': '歴史の裏側に引き込まれる一枚。',
  'アート': 'アートに触れたくなる感性の時間。',
  'ゲーム': 'ゲーム好きが語り合う熱狂の一枚。',
  '子育て': '子育ての肩の力がすっと抜ける一枚。',
}

interface Props {
  show: UIShow
  keyword: string
}

export default function HeroShow({ show, keyword }: Props) {
  const comment = CATEGORY_COMMENTS[keyword] ?? 'mimi編集部の今日の推し。'
  return (
    <section className="relative overflow-hidden py-16 px-6">
      {/* Blurred background image (z-0) */}
      {show.imageUrl && (
        <div
          className="absolute inset-0 z-[0] scale-[1.15]"
          style={{
            backgroundImage: `url(${show.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px)',
            opacity: 0.6,
          }}
        />
      )}
      {/* Dark overlay — Vinyl (z-1) */}
      <div className="absolute inset-0 z-[1]" style={{ background: '#2a2520', opacity: 0.55 }} />

      {/* Foreground content */}
      <div className="relative z-[2]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-3xl italic text-cream">今日の1枚</h2>
            <span className="font-mono text-base text-rust mt-0.5 block">#{keyword}</span>
          </div>
          <Link
            href="/gallery"
            className="font-sans text-xs text-cream/70 hover:text-rust transition-colors"
          >
            棚を見る →
          </Link>
        </div>

        <Link
          href={`/shows/${show.id}`}
          className="flex flex-col md:flex-row gap-6 md:gap-10 group"
        >
          {/* Cover — PC 360px+ */}
          <div className="flex-shrink-0 w-full md:w-[400px] aspect-square rounded-mimi overflow-hidden border border-tan shadow-lg transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-xl">
            {show.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={show.imageUrl}
                alt={show.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-tan/30 flex items-center justify-center">
                <span className="font-serif text-8xl font-bold text-cream/20 select-none">
                  {show.title.slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-4 md:max-w-sm">
            <h3 className="font-serif text-3xl italic leading-tight text-cream group-hover:text-rust transition-colors">
              {show.title}
            </h3>
            {show.host && (
              <p className="font-sans text-sm text-cream/70">{show.host}</p>
            )}
            <p className="font-sans text-sm text-cream/70 leading-relaxed">
              {show.description.length > 60
                ? `${show.description.slice(0, 60)}...`
                : show.description}
            </p>
            <p className="font-sans italic text-[14px] text-cream/70 leading-relaxed">
              — {comment}
            </p>
            <span className="inline-flex items-center gap-2 bg-rust text-cream rounded-pill px-5 py-2 font-sans text-sm w-fit">
              Spotifyで聴く →
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
