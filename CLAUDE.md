# mimi プロジェクト設定

## 自動承認ルール
- ファイルの作成・編集・削除はすべて自動で実行
- npm install などのパッケージ追加も自動で実行
- curl・テストコマンドも自動で実行
- git add / commit / push を含むすべての操作を自動で実行

## プロジェクト概要
- サービス名：mimi（ポッドキャスト発見サービス）
- 技術スタック：Next.js 14（App Router）/ Tailwind CSS / Spotify Web API
- PRDと設計書：https://www.notion.so/kyotakonno/mimi-32a2a2227f8580218d39f187320c4723

## 開発ルール
- TypeScript厳守。any型は使わない
- APIキーはサーバー側（API Route）のみで使用。フロントに露出しない
- エラーハンドリングを必ず実装する
- 環境変数は .env.local から読み込む
