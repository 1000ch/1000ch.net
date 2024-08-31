---
title: gitbook で Markdown から PDF を生成する
date: 2018-05-13
---

# gitbook で Markdown から PDF を生成する

[技術書典５](https://techbookfest.org/event/tbf05) への参加を目指して、執筆環境をセットアップしたのでそのメモ。今回は GitBook を使って Markdown から PDF を生成する。選択肢としては更に高機能な [Re:VIEW](https://github.com/kmuto/review) もあるが、筆が進みやすいようにとりあえず使い慣れている Markdown を選んだ。足りない機能があったり余力があれば、Re:VIEW のセットアップもしてみるつもり。

## プロジェクトの作成

プロジェクトのフォルダに移動したあと、gitbook の npm モジュールをプロジェクトローカルにインストールする。インストールすると `gitbook` コマンドが使えるようになるので、プロジェクトを初期化する。

```sh
$ npm init
$ npm install --save-dev gitbook-cli
$ ./node_modules/.bin/gitbook init .

warn: no summary file in this book
info: create README.md
info: create SUMMARY.md
info: initialization is finished
```

すると、 `README.md` と `SUMMARY.md` が作成される。あとは原稿を Markdown 形式で用意し `SUMMARY.md` から参照していくだけで良い。 `README.md` は特別なファイルで `SUMMARY.md` から参照しなくても自動で挿入される。

```markdown
# Summary

- [Foo](foo.md)
- [Bar](docs/bar.md)
...
```

## HTML と PDF の生成

`gitbook build` で静的な HTML ファイルが `_book` フォルダ配下に生成される。`gitbook serve` で生成される HTML を `localhost:4000` にホストしつつ、原稿の変更を検知してライブリロードしてくれる。

`gitbook pdf` で静的な PDF ファイル `book.pdf` が生成される。PDF の生成には Calibre が必要なので `brew cask install Calibre` でインストールしておく。

それぞれ、`npm run` から実行できるように、`package.json` に以下を記述しておく。

```json
{
  "scripts": {
    "build": "gitbook build",
    "pdf": "gitbook pdf",
    "dev": "gitbook serve"
  }
}
```

## 表紙の挿入

プロジェクトルートに以下の2ファイルを配置すると、自動で挿入される。

- `cover.jpg`: 1800x2360
- `cover_small.jpg`: 200x262
