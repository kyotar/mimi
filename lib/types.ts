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
