import { notFound } from 'next/navigation'
import Link from 'next/link'
import EpisodeList from '@/components/episode-list'
import ShareButton from '@/components/share-button'
import DescriptionExpand from '@/components/description-expand'
import { getShow, getShowEpisodes } from '@/lib/spotify'

interface Props {
  params: { id: string }
}

export default async function ShowDetailPage({ params }: Props) {
  const [show, episodes] = await Promise.all([
    getShow(params.id),
    getShowEpisodes(params.id),
  ])

  if (!show) notFound()

  return (
    <main className="pt-14 pb-16">
      {/* Back button at top */}
      <div className="px-6 py-3">
        <Link href="/" className="font-sans text-xs text-ink/40 hover:text-rust transition-colors">
          ← 戻る
        </Link>
      </div>

      {/* Hero with blurred background */}
      <div className="relative overflow-hidden">
        {/* Blurred background image */}
        {show.imageUrl && (
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${show.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px)',
              opacity: 0.5,
            }}
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-vinyl/60" />

        {/* Content */}
        <div className="relative flex flex-col md:flex-row items-start gap-8 px-6 py-10">
          {/* Cover art */}
          <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-mimi overflow-hidden border border-tan/30 shadow-lg">
            {show.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={show.imageUrl} alt={show.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-vinyl flex items-center justify-center">
                <span className="font-serif text-6xl font-bold text-cream/20 select-none">
                  {show.title.slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-end pb-2">
            <h1 className="font-serif text-4xl md:text-5xl italic leading-tight mb-3 text-cream">
              {show.title}
            </h1>
            <p className="font-sans text-sm text-cream/70 mb-1">
              {show.host}
            </p>
            <p className="font-mono text-xs text-cream/40">
              {show.episodeCount} エピソード
            </p>
            <DescriptionExpand text={show.description} color="#f5f0e8" />
            <div className="mt-6 flex items-center gap-3">
              <a
                href={show.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rust text-cream rounded-pill px-5 py-2 font-sans text-sm hover:opacity-90 transition-opacity"
              >
                Spotifyで聴く
              </a>
              <ShareButton show={show} />
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="px-6 py-8">
        <h2 className="font-serif text-3xl italic text-ink mb-6">エピソード</h2>
        <EpisodeList show={show} episodes={episodes} />
      </div>
    </main>
  )
}
