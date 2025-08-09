
# English Study Tracker

英語学習（分・語彙数・活動・メモ）を日次で記録し、ログを一覧できる Next.js アプリ。  
**Prisma + Postgres(Neon) + NextAuth(GitHub OAuth) + MUI**。Vercelへ即デプロイ可。

## 1) ローカル実行

```bash
cp .env.example .env.local
# .env.local に各値を入れる（下参照）
npm i
npx prisma generate
npx prisma migrate dev --name init
npm run dev
# http://localhost:3000
```

### .env の必要項目
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ランダム文字列（ openssl rand -base64 32 等 ）
GITHUB_ID=GitHub OAuth App の Client ID
GITHUB_SECRET=GitHub OAuth App の Client Secret
```

## 2) Neon(Postgres) の用意
1. https://neon.tech で新規プロジェクトを作成
2. **Connection string** をコピーし、`?sslmode=require` を付けた URL を `DATABASE_URL` に設定
3. ローカルで `npx prisma migrate dev` を実行（テーブル作成）

## 3) GitHub OAuth の用意
1. https://github.com/settings/developers → **New OAuth App**
2. Homepage: デプロイ後のURL、先にローカルなら `http://localhost:3000`
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. 作成後、Client ID / Secret を `.env.local` に設定

## 4) Vercel へデプロイ
1. リポジトリを GitHub に push
2. Vercel で **Add New → Project** → リポジトリ選択
3. **Environment Variables** に以下を登録（Build と Runtime 両方に適用）
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `NEXTAUTH_URL`（例: `https://your-app.vercel.app`）
4. **Build Command** は本リポの `package.json` 既定（`prisma generate && prisma migrate deploy && next build`）でOK
5. **Deploy** すると自動でマイグレーション → ビルド → 公開
6. 公開URLにアクセス → **GitHubでログイン** → ダッシュボードで記録開始

## 5) 使い方
- `/dashboard` で「日付・分・語彙数・活動・メモ」を入力し保存
- 下に直近200件を表示（今後グラフや週次集計を追加可能）

## 今後の拡張アイデア
- 週/⽉集計、⻑期の折れ線グラフ（date-fns + chartライブラリ）
- 科目タグ付け、フィルター、CSVエクスポート
- スマホUI最適化、PWA対応
- LINE連携やWebhookでのワンクリック記録
