import { getShow } from '@/lib/spotify'

const CREATOR_SHOW_ID = '31AMYhoWfhwIffyQDBBbJD'
const CREATOR_SHOW_URL = `https://open.spotify.com/show/${CREATOR_SHOW_ID}`

export default async function Footer() {
  let showName = 'ずっとラフ案'
  let artworkUrl: string | null = null

  try {
    const show = await getShow(CREATOR_SHOW_ID)
    if (show) {
      showName = show.title
      artworkUrl = show.imageUrl
    }
  } catch {
    // fallback to defaults
  }

  return (
    <footer className="bg-vinyl py-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <a
          href={CREATOR_SHOW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          {artworkUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={artworkUrl} alt={showName} className="w-8 h-8 rounded" />
          )}
          <span className="font-sans text-xs text-cream/50 group-hover:text-cream/80 transition-colors">
            {showName} — by mimi creator
          </span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="https://x.com/kyota"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-cream/30 hover:text-cream/60 transition-colors"
          >
            𝕏 @kyota
          </a>
          <span className="text-cream/20 text-xs">·</span>
          <span className="font-mono text-xs text-cream/30">© 2026 mimi</span>
        </div>
      </div>
    </footer>
  )
}
