import type { UIShow, UIEpisode } from '@/lib/types'

function formatDateJa(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  if (!y || !m || !d) return dateStr
  return `${y}年${Number(m)}月${Number(d)}日`
}

interface EpisodeListProps {
  show: UIShow
  episodes: UIEpisode[]
}

export default function EpisodeList({ show, episodes }: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <p className="font-sans text-sm text-ink/40 py-8">エピソードはまだありません</p>
    )
  }

  return (
    <ol className="divide-y divide-tan/40">
      {episodes.map((ep, i) => (
        <li key={ep.id} className="flex items-center gap-4 py-4 group">
          <span className="flex-shrink-0 font-mono text-xs text-rust w-8 text-right">
            {show.episodeCount - i}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-sm text-ink font-medium leading-snug">
              {ep.title}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono text-xs text-ink/40">{formatDateJa(ep.publishedAt)}</span>
              <span className="font-mono text-xs text-ink/40">{ep.duration}</span>
            </div>
          </div>
          <a
            href={show.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-8 h-8 rounded-full border border-tan text-ink hover:bg-rust hover:border-rust hover:text-cream flex items-center justify-center transition-colors"
            aria-label={`${ep.title}をSpotifyで聴く`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" fill="currentColor" />
            </svg>
          </a>
        </li>
      ))}
    </ol>
  )
}
