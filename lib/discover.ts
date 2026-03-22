// Server-side keyword rotation for 今週のピックアップ
// Rotates daily based on UTC date index

export const PICKUP_KEYWORDS = [
  'ビジネス',
  'スタートアップ',
  'デザイン',
  'テクノロジー',
  '雑談',
  'ライフスタイル',
  'マーケティング',
  'キャリア',
  '投資',
  '健康',
  '旅行',
  '映画',
  '読書',
  '料理',
  '音楽',
  'コミュニケーション',
  'メンタルヘルス',
  '社会',
  '経済',
  '科学',
  '歴史',
  'アート',
  'ゲーム',
  '英語学習',
  '子育て',
] as const

export function getPickupKeyword(): string {
  const dayIndex = Math.floor(Date.now() / 86400000)
  return PICKUP_KEYWORDS[dayIndex % PICKUP_KEYWORDS.length]
}

// Queries for 新着・注目 section
export const NEW_QUERIES = [
  '日本語 podcast',
  'japan podcast おすすめ',
  '人気 ポッドキャスト',
]
