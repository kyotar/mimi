# DESIGN.md — mimi Design System

> このファイルはGoogle Stitchへの指示テンプレート集。
> Claude Codeから「Stitchを使って〜」と指示するとき、このデザイントークンと指示文をそのまま使う。

---

## Design Tokens

Stitchへの指示に**必ず含めるブロック**。コピペしてそのまま使う。

```
【デザイントークン】
カラー：
  背景メイン        : #f5f0e8  (Cream)
  テキスト/ベース   : #1c1a17  (Ink)
  アクセント/CTA    : #b84c2a  (Rust)
  ボーダー/サーフェス: #d4c4a8  (Tan)
  ダークセクション  : #2a2520  (Vinyl)

フォント：
  見出し・ロゴ : Playfair Display（セリフ、イタリック可）
  本文・UI    : DM Sans
  ラベル・タグ : DM Mono

スタイル原則：
  - レコードショップ世界観 × モダンエディトリアル
  - ボーダーラジアス：最小限（2px または 4px）。丸くしすぎない
  - ボーダー太さ：0.5px〜1px。カラーはTan（#d4c4a8）
  - ナビゲーション背景：Ink（#1c1a17）
  - CTAボタン：Rust（#b84c2a）、pill形状（border-radius: 99px）
  - タグ：デフォルトは透明背景+Tanボーダー。アクティブはInk塗り
  - ホバー時：薄いオーバーレイ（rgba(28,26,23,0.7)）+フェードイン
```

---

## 画面別 Stitch 指示テンプレート

---

### 1. ナビゲーション

```
Stitchを使って、mimiのナビゲーションバーを作って。

【デザイントークン】
（↑上記トークンをここに貼る）

【仕様】
- 横幅フル、上部固定
- 背景：Ink（#1c1a17）
- 左端：ロゴ「mimi」Playfair Display、Rustカラー（#b84c2a）でイタリック
- 中央：ナビリンク「Discover」「Ranking」「My Rack」DM Sans、色はCream 50%透明。アクティブ時はCream
- 右端：「Spotifyでログイン」ボタン。Rust背景、Cream文字、pill形状
- パディング：上下16px、左右24px
```

---

### 2. ジャケットギャラリー（メインページ）

```
Stitchを使って、mimiのポッドキャストジャケットギャラリーを作って。

【デザイントークン】
（↑上記トークンをここに貼る）

【仕様】
- 背景：Cream（#f5f0e8）
- ページ上部にフィルタータグを横並び（pill形状）
  タグ例：すべて / デザイン / テック / ビジネス / ライフ / ながら聴き
  デフォルト：透明背景+Tanボーダー、DM Mono、文字Ink
  アクティブ：Ink背景、Cream文字
- メインエリア：ジャケット画像を4列グリッド、ギャップ16px
- 各ジャケットカード：
  - 正方形の画像（aspect-ratio: 1）
  - 画像下に番組名（DM Sans 13px、Ink）
  - 画像下にカテゴリ（DM Mono 11px、Ink 50%透明）
  - ホバー時：画像上に薄いInkオーバーレイ＋中央に再生ボタン（円形、Cream枠線）がフェードイン（0.2s）
- スクロールで次ページ読み込み
```

---

### 3. 今日の気分レコメンド

```
Stitchを使って、mimiの「今日の気分」選択UIを作って。

【デザイントークン】
（↑上記トークンをここに貼る）

【仕様】
- 背景：Cream（#f5f0e8）
- 中央寄せレイアウト、最大幅600px
- 見出し：「今日の気分は？」Playfair Display 32px、Ink
- サブテキスト：「気分を選ぶとAIがぴったりの番組を提案します」DM Sans 14px、Ink 60%透明
- 気分タグを2行×5列のグリッドで表示
  タグ例：🧘 ぼーっとしたい / 🔥 テンション上げたい / 🤔 深く考えたい
         😂 笑いたい / 📚 学びたい / 🎵 音楽聴きたい
         🏃 作業中に / 😴 寝る前に / ☕ 朝のルーティン / 💼 通勤中に
  各タグ：カード形式（Cream背景+Tanボーダー+4px radius）
  絵文字 + テキスト（DM Sans 12px）
  選択時：Ink背景+Cream文字
- 「この気分で探す」ボタン：Rust背景、pill形状、幅200px
```

---

### 4. 番組詳細ページ

```
Stitchを使って、mimiのポッドキャスト番組詳細ページを作って。

【デザイントークン】
（↑上記トークンをここに貼る）

【仕様】
- 背景：Cream（#f5f0e8）
- ヒーローエリア（横2分割）：
  左：ジャケット画像 正方形、幅240px、radius 4px
  右：
    番組名（Playfair Display 28px、Ink）
    パブリッシャー名（DM Mono 12px、Ink 50%透明）
    番組説明（DM Sans 14px、Ink 70%透明、最大3行）
    「Spotifyで聴く」ボタン（Rust背景、pill、アイコン付き）
    エピソード数・更新頻度（DM Mono 11px）
- エピソードリスト：
  各エピソード行：
    左端：エピソード番号（DM Mono 11px、Rust）
    中央：タイトル（DM Sans 14px、Ink）
    右端：尺（DM Mono 11px、Ink 50%透明）＋30秒プレビューボタン
  行間にTanの0.5pxボーダー
  プレビューボタン：小さい再生アイコン、ホバーでRustに変色
```

---

### 5. 検索結果ページ

```
Stitchを使って、mimiの検索結果ページを作って。

【デザイントークン】
（↑上記トークンをここに貼る）

【仕様】
- 背景：Cream（#f5f0e8）
- 上部に検索ボックス：
  背景Cream、Tanボーダー 1px、radius 2px、幅フル
  フォーカス時ボーダーがInkに
  左端に🔍アイコン
- 検索結果を2列グリッド表示
- 各結果カード（横並び）：
  左：ジャケット画像 正方形 64px
  右：番組名（DM Sans 14px、Ink）
       カテゴリ（DM Mono 11px、Rust）
       説明の冒頭2行（DM Sans 12px、Ink 60%透明）
  カード全体：背景Cream、下部Tanボーダー 0.5px
  ホバー時：背景が #f0ebd8 に変化
- 「もっと見る」ボタン：Ink背景なし、Tanボーダー、pill形状
```

---

### 6. ローディング・スケルトンUI

```
Stitchを使って、mimiのローディング中に表示するスケルトンUIを作って。

【デザイントークン】
（↑上記トークンをここに貼る）

【仕様】
- ジャケットギャラリーのスケルトン版
- 4列グリッド、8枚分
- 各カード：
  正方形のグレーブロック（#e8e4dc）
  下に2本のグレーライン（幅80%と50%）
- shimmerアニメーション：左から右へ光が流れる（1.5s loop）
- アニメーション色：#f5f0e8 → #e0dbd2 → #f5f0e8
```

---

## Claude Codeへの指示パターン

### パターンA：新規画面を作る

```
Stitchを使って、[画面名]を作って。
上記DESIGN.mdのDesign Tokensを必ず適用して。
生成されたHTMLをNext.jsのコンポーネント（/components/[ComponentName].tsx）として実装して。
Tailwindクラスに置き換えて、デザイントークンはtailwind.config.tsに定義して。
```

### パターンB：既存コンポーネントを修正する

```
Stitchを使って、現在の[コンポーネント名]のデザインを改善して。
現状の問題点：[問題を記述]
DESIGN.mdのトークンに合わせて修正して。
HTMLを取得してコンポーネントを更新して。
```

### パターンC：複数バリアントを比較する

```
Stitchを使って、[コンポーネント名]を2パターン作って。
A案：[説明]
B案：[説明]
DESIGN.mdのトークンを適用。
両方のHTMLを取得してスクリーンショットも見せて。
```

---

## Tailwind Config（コピペ用）

`tailwind.config.ts` に追加するカラー設定：

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:   '#1c1a17',
        rust:  '#b84c2a',
        cream: '#f5f0e8',
        tan:   '#d4c4a8',
        vinyl: '#2a2520',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans:  ['var(--font-dm-sans)', 'sans-serif'],
        mono:  ['var(--font-dm-mono)', 'monospace'],
      },
      borderRadius: {
        'mimi': '4px',
        'pill': '99px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## よく使うTailwindクラス

| 用途 | クラス |
|------|--------|
| ページ背景 | `bg-cream` |
| テキスト（メイン） | `text-ink` |
| テキスト（サブ） | `text-ink/70` |
| テキスト（ヒント） | `text-ink/50` |
| アクセントカラー | `text-rust` / `bg-rust` |
| ボーダー | `border border-tan` |
| CTAボタン | `bg-rust text-cream rounded-pill px-5 py-2 font-sans text-sm` |
| アクティブタグ | `bg-ink text-cream rounded-pill px-4 py-1.5 font-mono text-xs` |
| 非アクティブタグ | `border border-tan rounded-pill px-4 py-1.5 font-mono text-xs text-ink/70` |
| ナビ背景 | `bg-vinyl` または `bg-ink` |
| 見出し | `font-serif text-2xl text-ink` |
| ラベル | `font-mono text-xs text-rust` |
| カードホバー | `hover:bg-[#f0ebd8] transition-colors duration-150` |
