# React Firebase Template
高速でReactとFirebaseのプロジェクトを開発するためのテンプレート

## Setup
- `./firebase`ディレクトリの`.firebaserc-sample`をコピーして`.firebaserc`を作成、プロジェクト名を記入
- Docker Compose をビルド
    ```
    docker compose build
    ```
- GCPへログイン：以下コマンドを実行し、Googleアカウントでログイン
    ```
    docker compose run --rm firebase firebase login --no-localhost
    ```
