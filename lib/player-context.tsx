'use client'

import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import type { UIShow, UIEpisode } from './types'

interface PlayerState {
  currentShow: UIShow | null
  currentEpisode: UIEpisode | null
  isPlaying: boolean
  currentTime: number
  duration: number
  ended: boolean
  play: (show: UIShow, episode: UIEpisode) => void
  pause: () => void
  toggle: () => void
  seek: (ratio: number) => void
}

const PlayerContext = createContext<PlayerState | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentShow, setCurrentShow] = useState<UIShow | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<UIEpisode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ended, setEnded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio()
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('durationchange', () => setDuration(isNaN(audio.duration) ? 0 : audio.duration))
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setEnded(true)
    })
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const play = useCallback((show: UIShow, episode: UIEpisode) => {
    const audio = audioRef.current
    setCurrentShow(show)
    setCurrentEpisode(episode)
    setEnded(false)
    setCurrentTime(0)
    setDuration(0)

    if (!episode.audioUrl) {
      // No preview available — show Spotify CTA immediately
      setIsPlaying(false)
      setEnded(true)
      return
    }

    if (!audio) return
    audio.pause()
    audio.src = episode.audioUrl
    audio.load()
    audio.play().catch(() => {})
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audio.src) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [])

  const seek = useCallback((ratio: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = ratio * audio.duration
    setCurrentTime(audio.currentTime)
  }, [])

  return (
    <PlayerContext.Provider
      value={{ currentShow, currentEpisode, isPlaying, currentTime, duration, ended, play, pause, toggle, seek }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
