# 課題：

1. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup（動作確認方法）

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


2. 主な機能

**画像の登録:** フォームから画像を選択・アップロードする機能。（複数登録可）

**画像リスト:** 登録された画像のリスト表示。

**表示順の設定:** 画像の表示順序を変更する機能。

**アクション処理:** 編集、削除、保存、閉じるボタンのアクション処理。


3. 以下の技術を使用しております。

**Vue.js 3:** Vue.js 3を使用して、アプリケーションのUIを実装しています。

**TypeScript:** JavaScriptの拡張言語であり、静的型付けに使用。

**Pinia:** Vue.jsの状態管理ライブラリ。

**Vue Router:** アプリケーションのルーティングを実装。