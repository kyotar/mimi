export type Category = 'すべて' | 'デザイン' | 'テック' | 'ビジネス' | 'ライフ'
export type ShowCategory = Exclude<Category, 'すべて'>

export interface Show {
  id: string
  title: string
  host: string
  category: ShowCategory
  palette: number
  episodeCount: number
  description: string
  weeklyPlays: number
}

export interface Episode {
  id: string
  number: number
  title: string
  duration: string
  publishedAt: string
}

export const PALETTES = [
  { bg: '#2a2520', fg: '#d4c4a8' }, // 0: vinyl + tan
  { bg: '#1c1a17', fg: '#f5f0e8' }, // 1: ink + cream
  { bg: '#b84c2a', fg: '#f5f0e8' }, // 2: rust + cream
  { bg: '#3d2e28', fg: '#d4c4a8' }, // 3: warm dark + tan
  { bg: '#7a3520', fg: '#f5f0e8' }, // 4: dark rust + cream
  { bg: '#c4b49a', fg: '#1c1a17' }, // 5: tan + ink
] as const

export const CATEGORIES: Category[] = ['すべて', 'デザイン', 'テック', 'ビジネス', 'ライフ']

export const SHOWS: Show[] = [
  {
    id: 'design-talk',
    title: 'デザイントーク',
    host: '山本明',
    category: 'デザイン',
    palette: 0,
    episodeCount: 48,
    weeklyPlays: 32847,
    description: '東京のクリエイターたちがデザインプロセスと制作の裏側を語る',
  },
  {
    id: 'ui-lab',
    title: 'UIラボ',
    host: '田中さくら',
    category: 'デザイン',
    palette: 2,
    episodeCount: 31,
    weeklyPlays: 18520,
    description: 'UIデザインの最前線。プロダクトデザイナーたちのリアルな声',
  },
  {
    id: 'type-matters',
    title: 'タイプ・マターズ',
    host: '鈴木健太',
    category: 'デザイン',
    palette: 5,
    episodeCount: 22,
    weeklyPlays: 9340,
    description: 'タイポグラフィとフォントの深い世界へ',
  },
  {
    id: 'branding-lab',
    title: 'ブランディングラボ',
    host: '伊藤美咲',
    category: 'デザイン',
    palette: 3,
    episodeCount: 17,
    weeklyPlays: 7210,
    description: 'スタートアップから大企業まで、ブランド構築の現場から',
  },
  {
    id: 'motion-studio',
    title: 'モーションスタジオ',
    host: '加藤リョウ',
    category: 'デザイン',
    palette: 1,
    episodeCount: 29,
    weeklyPlays: 11080,
    description: 'モーションデザインとアニメーションの技術と哲学',
  },
  {
    id: 'dev-cast',
    title: 'デブキャスト',
    host: '木村拓也',
    category: 'テック',
    palette: 1,
    episodeCount: 67,
    weeklyPlays: 54120,
    description: '開発者たちのカジュアルな技術談義。週3回更新',
  },
  {
    id: 'ai-wave',
    title: 'AIウェーブ',
    host: '渡辺ゆか',
    category: 'テック',
    palette: 4,
    episodeCount: 38,
    weeklyPlays: 41350,
    description: 'AIの最新動向と実装の現場を第一線の研究者と語る',
  },
  {
    id: 'open-source-fm',
    title: 'オープンソースFM',
    host: '中村俊介',
    category: 'テック',
    palette: 0,
    episodeCount: 55,
    weeklyPlays: 28640,
    description: 'オープンソースコミュニティの人と文化に迫るポッドキャスト',
  },
  {
    id: 'infra-radio',
    title: 'インフララジオ',
    host: '小林悟',
    category: 'テック',
    palette: 3,
    episodeCount: 41,
    weeklyPlays: 16790,
    description: 'クラウドインフラとSREの実践知識を共有する場',
  },
  {
    id: 'product-cast',
    title: 'プロダクトキャスト',
    host: '松本あかり',
    category: 'テック',
    palette: 2,
    episodeCount: 26,
    weeklyPlays: 12430,
    description: 'プロダクトマネジメントとエンジニアリングの交差点',
  },
  {
    id: 'startup-insider',
    title: 'スタートアップインサイダー',
    host: '佐藤雄二',
    category: 'ビジネス',
    palette: 4,
    episodeCount: 44,
    weeklyPlays: 38910,
    description: '国内スタートアップ創業者たちのリアルな起業ストーリー',
  },
  {
    id: 'vc-talk',
    title: 'VCトーク',
    host: '高橋麻衣',
    category: 'ビジネス',
    palette: 0,
    episodeCount: 33,
    weeklyPlays: 22160,
    description: 'ベンチャーキャピタリストが語る投資の判断基準と市場観',
  },
  {
    id: 'global-pitch',
    title: 'グローバルピッチ',
    host: '吉田誠',
    category: 'ビジネス',
    palette: 5,
    episodeCount: 19,
    weeklyPlays: 8750,
    description: '海外進出した日本企業の挑戦と学び',
  },
  {
    id: 'remote-work-lab',
    title: 'リモートワークラボ',
    host: '山田みか',
    category: 'ビジネス',
    palette: 2,
    episodeCount: 28,
    weeklyPlays: 13680,
    description: '分散チームの作り方と非同期コラボレーションの実践',
  },
  {
    id: 'tokyo-vibes',
    title: 'トーキョーバイブス',
    host: '阿部ケンジ',
    category: 'ライフ',
    palette: 3,
    episodeCount: 72,
    weeklyPlays: 47230,
    description: '東京カルチャーの今。音楽、映画、食、アートを語る',
  },
  {
    id: 'book-club',
    title: 'ブッククラブ',
    host: '橋本律子',
    category: 'ライフ',
    palette: 1,
    episodeCount: 36,
    weeklyPlays: 19850,
    description: '毎週1冊、深読みと対話で本の世界を旅する',
  },
  {
    id: 'wellness-cast',
    title: 'ウェルネスキャスト',
    host: '藤井陽子',
    category: 'ライフ',
    palette: 5,
    episodeCount: 45,
    weeklyPlays: 25470,
    description: '心と体の健康を科学とマインドフルネスで考える',
  },
  {
    id: 'travel-notes',
    title: 'トラベルノーツ',
    host: '石田マコト',
    category: 'ライフ',
    palette: 4,
    episodeCount: 24,
    weeklyPlays: 14320,
    description: '旅先で出会った人と文化の物語。世界を音で聴く',
  },
]

export const EPISODES: Record<string, Episode[]> = {
  'design-talk': [
    { id: 'dt-42', number: 42, title: '2024年のデザイントレンドを振り返る', duration: '48:20', publishedAt: '2024-12-15' },
    { id: 'dt-41', number: 41, title: 'タイポグラフィとアクセシビリティ', duration: '52:10', publishedAt: '2024-12-08' },
    { id: 'dt-40', number: 40, title: '日本の伝統色とデジタルデザイン', duration: '44:35', publishedAt: '2024-12-01' },
    { id: 'dt-39', number: 39, title: 'デザインシステムの作り方', duration: '61:05', publishedAt: '2024-11-24' },
    { id: 'dt-38', number: 38, title: 'AIとデザイナーの未来', duration: '55:48', publishedAt: '2024-11-17' },
    { id: 'dt-37', number: 37, title: 'ブランドアイデンティティの本質', duration: '49:22', publishedAt: '2024-11-10' },
    { id: 'dt-36', number: 36, title: 'ゲームUIデザインの世界', duration: '58:15', publishedAt: '2024-11-03' },
  ],
  'ui-lab': [
    { id: 'ul-31', number: 31, title: 'コンポーネント設計の哲学', duration: '42:00', publishedAt: '2024-12-12' },
    { id: 'ul-30', number: 30, title: 'フォームUXの改善手法', duration: '38:45', publishedAt: '2024-12-05' },
    { id: 'ul-29', number: 29, title: 'ダークモードを正しく実装する', duration: '46:30', publishedAt: '2024-11-28' },
    { id: 'ul-28', number: 28, title: 'アニメーションとパフォーマンス', duration: '51:10', publishedAt: '2024-11-21' },
    { id: 'ul-27', number: 27, title: 'モバイルファーストの設計思想', duration: '44:20', publishedAt: '2024-11-14' },
  ],
}

export function getEpisodes(showId: string): Episode[] {
  return EPISODES[showId] ?? []
}
