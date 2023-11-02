# プロジェクトのセットアップガイド

このドキュメントでは、プロジェクト「SecretMemory」のセットアップ手順について説明します。プロジェクトに参加する前に、以下の手順に従って環境をセットアップしてください。


# 1. リポジトリのクローン
```bash
git clone https://github.com/diary-hackathon/SecretMemory.git
```

# 2. Node.jsおよびnpmのバージョン確認
```bash
node -v
npm -v
```

# 3. Node.jsおよびnpmのインストール
# Node.jsの公式ウェブサイトから最新の安定版をダウンロードしてインストールしてください.

nodeに関しても、バージョン管理するアプリケーションがあるので、個人的にfnmがおすすめです。

# 4. Supabaseのローカル環境セットアップ

## docker descktopがなければインストールが必要になります。
dockerコンテナを11個も立ち上げることになり、非常にメモリーを食います。PCのメモリーが16GB以下であれば、やめておきましょう。PCが動かなくなります。

## 依存関係をインストールします.
```bash
cd SecretMemory
npm install
npx supabase start

以下のような画面が表示されれば、OK！
jinyang@youtakashinoMacBook-Pro SecretMemory % npx supabase start
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

次に環境変数のセットアップを始めます。
touch .env.local

.env.local.exsampleに倣って、必要なものをコピペしてください。
```

# 5. プロジェクトの実行

```bash
npm run dev
```
localhost:3000で開発環境が立ち上がり、画面が表示されれば成功です。

# 6. prettierとeslintの拡張機能
vscodeの拡張機能を入れておいてください。prettierは自動整形ツール、eslintは静的解析ツールです。