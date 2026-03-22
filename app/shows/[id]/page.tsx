import { notFound } from 'next/navigation'
import Link from 'next/link'
import EpisodeList from '@/components/episode-list'
import { SHOWS, PALETTES, getEpisodes } from '@/lib/mock-data'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return SHOWS.map((s) => ({ id: s.id }))
}

export default function ShowDetailPage({ params }: Props) {
  const show = SHOWS.find((s) => s.id === params.id)
  if (!show) notFound()

  const episodes = getEpisodes(show.id)
  const palette = PALETTES[show.palette]

  return (
    <main className="pt-14 pb-16">
      {/* Hero */}
      <div
        className="flex flex-col md:flex-row items-start gap-8 px-6 py-10"
        style={{ backgroundColor: palette.bg }}
      >
        {/* Cover art */}
        <div
          className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-mimi flex items-center justify-center"
          style={{ backgroundColor: `${palette.fg}15` }}
        >
          <span
            className="font-serif text-6xl font-bold opacity-40 select-none"
            style={{ color: palette.fg }}
          >
            {show.title.slice(0, 2)}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-end pb-2">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-2 opacity-50"
            style={{ color: palette.fg }}
          >
            {show.category}
          </p>
          <h1
            className="font-serif text-4xl md:text-5xl italic leading-tight mb-3"
            style={{ color: palette.fg }}
          >
            {show.title}
          </h1>
          <p
            className="font-sans text-sm mb-1 opacity-70"
            style={{ color: palette.fg }}
          >
            {show.host}
          </p>
          <p
            className="font-mono text-xs opacity-40"
            style={{ color: palette.fg }}
          >
            {show.episodeCount} エピソード
          </p>
          <p
            className="font-sans text-sm mt-4 max-w-md leading-relaxed opacity-80"
            style={{ color: palette.fg }}
          >
            {show.description}
          </p>
        </div>
      </div>

      {/* Episodes */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl italic text-ink">エピソード</h2>
          <Link href="/" className="font-sans text-xs text-ink/40 hover:text-rust transition-colors">
            ← 戻る
          </Link>
        </div>

        {episodes.length > 0 ? (
          <EpisodeList show={show} episodes={episodes} />
        ) : (
          <div className="py-12 text-center">
            <p className="font-sans text-sm text-ink/40">エピソードデータは近日公開予定です</p>
          </div>
        )}
      </div>
    </main>
  )
}
