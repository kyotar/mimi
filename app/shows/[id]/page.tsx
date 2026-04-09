import { notFound } from 'next/navigation'
import EpisodeList from '@/components/episode-list'
import RelatedShows from '@/components/related-shows'
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
      {/* Hero with blurred background */}
      <section className="relative overflow-hidden">
        {/* Blurred background */}
        {show.imageUrl && (
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${show.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(60px)',
              transform: 'scale(1.15)',
              opacity: 0.6,
            }}
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: '#2a2520', opacity: 0.55 }} />

        {/* Foreground content */}
        <div className="relative z-20 flex flex-col md:flex-row items-start gap-8 px-6 py-16">
          {/* Cover art */}
          <div className="flex-shrink-0 w-56 md:w-60 aspect-square rounded-mimi overflow-hidden border border-tan shadow-lg">
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
            {show.host && (
              <p className="font-sans text-sm text-cream/70 mb-1">{show.host}</p>
            )}
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
      </section>

      {/* Episodes */}
      <div className="px-6 py-8">
        <h2 className="font-serif text-3xl italic text-ink mb-6">エピソード</h2>
        <EpisodeList show={show} episodes={episodes} />
      </div>

      {/* Related shows */}
      <RelatedShows show={show} />
    </main>
  )
}
