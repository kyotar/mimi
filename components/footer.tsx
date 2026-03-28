import { getShow } from '@/lib/spotify'

const CREATOR_SHOW_ID = '31AMYhoWfhwIffyQDBBbJD'
const CREATOR_SHOW_URL = `https://open.spotify.com/show/${CREATOR_SHOW_ID}`
const CREATOR_SHOW_DESCRIPTION =
  'AIやデザイン、キャリアの考え途中をそのまま言葉にするPodcast'

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
    <footer className="bg-vinyl px-6 py-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Logo + tagline */}
        <div>
          <span className="font-serif text-2xl italic text-rust">mimi</span>
          <p className="font-sans text-sm text-cream/50 mt-2">
            ジャケットで、推しの番組と出会う。
          </p>
        </div>

        {/* Center: Podcast by the creator */}
        <div>
          <p className="font-mono text-[11px] text-cream/40 mb-3">
            Podcast by the creator
          </p>
          <a
            href={CREATOR_SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group"
          >
            {/* Artwork */}
            <div className="flex-shrink-0 w-12 h-12 rounded border border-tan overflow-hidden">
              {artworkUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={artworkUrl}
                  alt={showName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-cream/10" />
              )}
            </div>
            {/* Info */}
            <div className="min-w-0">
              <p className="font-sans text-[13px] text-cream group-hover:underline">
                {showName}
              </p>
              <p className="font-sans text-[11px] text-cream/50 mt-1 line-clamp-2">
                {CREATOR_SHOW_DESCRIPTION}
              </p>
            </div>
          </a>
        </div>

        {/* Right: SNS links */}
        <div>
          <p className="font-mono text-[11px] text-cream/40 mb-3">Follow</p>
          <a
            href="https://x.com/kyota"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-cream/70 hover:text-cream transition-colors"
          >
            𝕏 @kyota
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-6xl border-t border-cream/10 mt-8 pt-6 text-center">
        <p className="font-mono text-xs text-cream/30">&copy; 2026 mimi</p>
      </div>
    </footer>
  )
}
