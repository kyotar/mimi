export type Category =
  | 'すべて'
  | 'ビジネス'
  | 'テック'
  | 'デザイン'
  | 'キャリア'
  | '雑談'
  | '健康'
  | 'カルチャー'
  | '学び'

export const CATEGORIES: Category[] = [
  'すべて',
  'ビジネス',
  'テック',
  'デザイン',
  'キャリア',
  '雑談',
  '健康',
  'カルチャー',
  '学び',
]

export interface UIShow {
  id: string
  title: string
  host: string
  description: string
  episodeCount: number
  imageUrl: string | null
  spotifyUrl: string
}

export interface UIEpisode {
  id: string
  title: string
  duration: string
  publishedAt: string
  audioUrl: string | null
}

export const PALETTES = [
  { bg: '#2a2520', fg: '#d4c4a8' },
  { bg: '#1c1a17', fg: '#f5f0e8' },
  { bg: '#b84c2a', fg: '#f5f0e8' },
  { bg: '#3d2e28', fg: '#d4c4a8' },
  { bg: '#7a3520', fg: '#f5f0e8' },
  { bg: '#c4b49a', fg: '#1c1a17' },
] as const

export type Palette = (typeof PALETTES)[number]

export function getPalette(id: string): Palette {
  const hash = id.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0)
  return PALETTES[hash % PALETTES.length]
}
