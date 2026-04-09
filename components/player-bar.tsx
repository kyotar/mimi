'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { usePlayer } from '@/lib/player-context'

const WAVE_DELAYS = ['0s', '0.15s', '0.3s', '0.15s', '0s']

export default function PlayerBar() {
  const { currentShow, currentEpisode, isPlaying, ended, toggle } = usePlayer()
  const titleRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [needsMarquee, setNeedsMarquee] = useState(false)

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return
    setNeedsMarquee(titleRef.current.scrollWidth > containerRef.current.clientWidth)
  }, [currentEpisode?.title])

  if (!currentShow || !currentEpisode) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-vinyl border-t border-tan/20 h-[72px] flex items-center px-6 gap-4">
      {/* Left: Cover + info */}
      <Link href={`/shows/${currentShow.id}`} className="flex items-center gap-3 flex-1 min-w-0">
        {/* Artwork 48px */}
        <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden">
          {currentShow.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentShow.imageUrl} alt={currentShow.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-cream/10" />
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 max-w-[280px]">
          <p className="font-mono text-[11px] text-cream/50 truncate">{currentShow.title}</p>
          <div ref={containerRef} className="overflow-hidden">
            {needsMarquee ? (
              <div
                className="whitespace-nowrap"
                style={{ animation: 'marquee 12s linear infinite' }}
              >
                <span className="font-sans text-[13px] text-cream">{currentEpisode.title}</span>
                <span className="font-sans text-[13px] text-cream mx-8">{currentEpisode.title}</span>
              </div>
            ) : (
              <span ref={titleRef} className="font-sans text-[13px] text-cream truncate block">
                {currentEpisode.title}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Center: Controls */}
      <div className="flex flex-col items-center flex-shrink-0">
        {!ended ? (
          <>
            <button
              onClick={toggle}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-cream/90 transition-colors"
              aria-label={isPlaying ? '一時停止' : '再生'}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="2" width="4" height="12" rx="1" fill="#1c1a17" />
                  <rect x="9" y="2" width="4" height="12" rx="1" fill="#1c1a17" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 2l10 6-10 6V2z" fill="#1c1a17" />
                </svg>
              )}
            </button>
            <span className="font-mono text-[10px] text-cream/40 mt-0.5 hidden sm:block">30sec preview</span>
          </>
        ) : (
          <a
            href={currentShow.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rust text-cream rounded-pill px-4 py-2 font-sans text-xs hover:opacity-90 transition-opacity"
          >
            Spotifyで全編を聴く →
          </a>
        )}
      </div>

      {/* Right: Waveform */}
      <div className="flex items-end gap-[3px] h-6 flex-shrink-0">
        {WAVE_DELAYS.map((delay, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: '3px',
              background: '#b84c2a',
              borderRadius: '2px',
              height: isPlaying ? undefined : '4px',
              animation: isPlaying ? `wave 0.8s ease-in-out infinite ${delay}` : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}
