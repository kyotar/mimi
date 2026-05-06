# mimi Design System

## コンセプト

レコードショップの世界観 × モダンエディトリアル。
「1枚1枚を大事に飾っている」感と「棚を埋め尽くす圧倒感」を両立する。

## カラーパレット

| 名前 | HEX | 用途 |
|---|---|---|
| Ink | `#1c1a17` | テキスト・ナビ背景・ベース |
| Rust | `#b84c2a` | アクセント・CTA・ラベル |
| Cream | `#f5f0e8` | 背景メイン・紙の質感 |
| Tan | `#d4c4a8` | ボーダー・サーフェス |
| Vinyl | `#2a2520` | ダークセクション・フッター |

Tailwind設定（ダークモード）:
```typescript
colors: {
  ink:     '#0a0a0a',  // ページ背景・グリッド背景
  rust:    '#b84c2a',  // アクセント・CTA
  cream:   '#ffffff',  // メインテキスト
  tan:     '#1f1f1f',  // ボーダー・サーフェス（暗）
  vinyl:   '#0a0a0a',  // フッター背景
  surface: '#141414',  // ハーフモーダル背景
}
```

Dark Mode tokens:
- background: `#0a0a0a`
- surface: `#141414`
- border: rgba(255,255,255,0.1)
- text-primary: `#ffffff`
- text-secondary: rgba(255,255,255,0.6)

## タイポグラフィ

| 用途 | フォント | クラス例 |
|---|---|---|
| 見出し・ロゴ | Playfair Display | `font-serif italic text-3xl` |
| 本文・UI | DM Sans | `font-sans text-sm` |
| ラベル・タグ | DM Mono | `font-mono text-xs` |

## スタイル原則

- ボーダーラジアス: 最小限（2px〜4px）。丸くしすぎない
- ボーダー: 0.5px〜1px、Tan（#d4c4a8）
- ナビ背景: Ink（#1c1a17）
- CTAボタン: Rust背景・Cream文字・pill形状（rounded-full）
- タグ: デフォルトは透明背景+Tanボーダー。アクティブはInk塗り

## ジャケット表示の原則（最重要）

- gap: 24px（PC）/ 16px（SP）。余白が価値を生む
- Tanボーダー 1px を必ず付ける（額縁効果）
- ホバー時: `scale(1.02)` + `shadow-md`（transition 0.2s）
- グリッド: PC 4列固定。壁一面のレコード棚感を演出
- カテゴリラベル: DM Mono・Rust色
- 番組名: DM Sans 13px・line-height 1.6

## よく使うTailwindクラス

| 用途 | クラス |
|---|---|
| ページ背景 | `bg-cream` |
| テキスト（メイン） | `text-ink` |
| テキスト（サブ） | `text-ink/70` |
| テキスト（ヒント） | `text-ink/50` |
| アクセント | `text-rust` / `bg-rust` |
| ボーダー | `border border-tan` |
| CTAボタン | `bg-rust text-cream rounded-full px-5 py-2 font-sans text-sm` |
| アクティブタグ | `bg-ink text-cream rounded-full px-4 py-1.5 font-mono text-xs` |
| 非アクティブタグ | `border border-tan rounded-full px-4 py-1.5 font-mono text-xs text-ink/70` |
| セクション見出し | `font-serif italic text-3xl text-ink` |
| カードホバー | `hover:scale-[1.02] hover:shadow-md transition-all duration-200` |

## コンポーネント仕様

### PodcastCard（ジャケットカード）
- 正方形（aspect-ratio: 1/1）
- Tanボーダー 1px
- ホバー: scale(1.02) + shadow-md
- ホバー時オーバーレイ: rgba(28,26,23,0.7) + 中央に再生アイコン（Cream）

### ミニプレイヤー（固定フッター）
- position: fixed / bottom: 0
- 背景: Vinyl（#2a2520）
- border-top: 1px solid rgba(212,196,168,0.2)
- 波形アニメーション: Rust色・5本バー

### ヒーローエリア（番組詳細・今日の1枚）
- ジャケット画像をbackground-imageに設定
- filter: blur(60px) + scale(1.15)
- opacity: 0.6
- オーバーレイ: Vinyl + opacity 0.55
- 前面テキスト: Cream

## 画面構成

### トップページ（Discover）
1. 今日の1枚（ヒーロー・アートワークぼかし背景）
2. 気分で掘る（カテゴリー8種）
3. いま熱い番組（グリッド・24件）

### Galleryページ
- カテゴリータブ + ジャケットグリッド
- もっと見る: 24件ずつ追加（6の倍数）

### 番組詳細ページ
- ヒーロー: アートワークぼかし背景 + 番組情報
- description: 3行折りたたみ
- エピソードリスト: 降順番号・30秒プレビュー再生
- 固定ミニプレイヤー: 再生中に表示

### カテゴリー一覧
| 表示名 | 検索キーワード |
|---|---|
| ビジネス | ビジネス |
| テック | テクノロジー |
| デザイン | デザイン |
| キャリア | キャリア 仕事 |
| 雑談 | 雑談 トーク |
| 健康 | 健康 ウェルネス |
| カルチャー | 映画 音楽 カルチャー |
| 学び | 学び 教育 |
