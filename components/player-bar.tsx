'use client'

import Link from 'next/link'
import { usePlayer } from '@/lib/player-context'
import { getPalette } from '@/lib/types'

const WAVE_DELAYS = ['0ms', '120ms', '240ms', '360ms', '480ms']

function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const { currentShow, currentEpisode, isPlaying, currentTime, duration, ended, toggle, seek } = usePlayer()

  if (!currentShow || !currentEpisode) return null

  const palette = getPalette(currentShow.id)
  const progress = duration > 0 ? currentTime / duration : 0

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    seek((e.clientX - rect.left) / rect.width)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-vinyl border-t border-white/10">
      {/* Ended CTA */}
      {ended && (
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-vinyl">
          <p className="font-sans text-xs text-cream/50">
            {currentEpisode.audioUrl ? 'プレビュー終了' : 'プレビュー非対応'}
          </p>
          <a
            href={currentShow.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rust text-cream rounded-pill px-4 py-1.5 font-sans text-xs hover:opacity-90 transition-opacity"
          >
            Spotifyで全編を聴く →
          </a>
        </div>
      )}

      {/* Progress bar */}
      {!ended && (
        <div
          className="h-1 w-full bg-white/10 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-rust transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Main row */}
      <div className="flex items-center gap-4 px-6 h-14">
        {/* Cover */}
        <Link href={`/shows/${currentShow.id}`} className="flex-shrink-0">
          <div
            className="w-9 h-9 rounded-mimi overflow-hidden"
            style={{ backgroundColor: palette.bg }}
          >
            {currentShow.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={currentShow.imageUrl} alt={currentShow.title} className="w-full h-full object-cover" />
            ) : (
              <span
                className="w-full h-full flex items-center justify-center font-serif text-xs font-bold opacity-40"
                style={{ color: palette.fg }}
              >
                {currentShow.title.slice(0, 2)}
              </span>
            )}
          </div>
        </Link>

        {/* Show + episode info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs text-cream/90 font-medium truncate">{currentEpisode.title}</p>
          <p className="font-mono text-xs text-cream/40 truncate">{currentShow.title}</p>
        </div>

        {/* Waveform (visible when playing) */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
            {WAVE_DELAYS.map((delay, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-rust"
                style={{
                  animation: `wave 0.7s ease-in-out infinite`,
                  animationDelay: delay,
                  height: '3px',
                }}
              />
            ))}
          </div>
        )}

        {/* Time */}
        {!ended && duration > 0 && (
          <span className="font-mono text-xs text-cream/40 flex-shrink-0 tabular-nums">
            {formatTime(currentTime)}&nbsp;/&nbsp;{formatTime(duration)}
          </span>
        )}

        {/* Play / pause button */}
        {!ended && (
          <button
            onClick={toggle}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
            aria-label={isPlaying ? '一時停止' : '再生'}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="2" width="3.5" height="10" rx="1" fill="#f5f0e8" />
                <rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="#f5f0e8" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2l9 5-9 5V2z" fill="#f5f0e8" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
