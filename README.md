# React Firebase Template
高速でReactとFirebaseのプロジェクトを開発するためのテンプレート

## Setup
- `./firebase`ディレクトリと`./react`ディレクトリの`.firebaserc.sample`をコピーして`.firebaserc`を作成、プロジェクト名を記入
- `./react`ディレクトリの`.env.sample`をコピーして`.env`を作成、環境変数を定義
- Docker Compose をビルド
    ```
    docker compose build
    ```
- GCPへログイン：以下コマンドを実行し、Googleアカウントでログイン
    ```
    docker compose run --rm firebase firebase login --no-localhost
    ```

## Setup（プロジェクト管理者）
- GitHub Actionの環境変数を設定