'use client'

import { createContext, useContext, useState } from 'react'
import type { UIShow } from './types'

interface PlayerState {
  currentShow: UIShow | null
  isPlaying: boolean
  play: (show: UIShow) => void
  pause: () => void
  toggle: () => void
}

const PlayerContext = createContext<PlayerState | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentShow, setCurrentShow] = useState<UIShow | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <PlayerContext.Provider
      value={{
        currentShow,
        isPlaying,
        play: (show) => {
          setCurrentShow(show)
          setIsPlaying(true)
        },
        pause: () => setIsPlaying(false),
        toggle: () => setIsPlaying((p) => !p),
      }}
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
