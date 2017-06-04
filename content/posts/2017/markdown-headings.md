---
layout: post
title: Markdownの見出しを抽出するツールを作った
date: 2017-06-05
---

# Markdownの見出しを抽出するツールを作った

Markdown の見出しだけを抽出したい欲求が高まり [`1000ch/markdown-headings`](https://github.com/1000ch/markdown-headings) というツールを作った。単純な文法なので正規表現だけでも充分抜いてこれるが、今回は [`markdown-it/markdown-it`](https://markdown-it/markdown-it) の AST を使うことにした。

## コマンドラインで使う

自分が欲しかったのはコマンドラインのインターフェース。

```bash
$ npm install --global markdown-headings
```

引数にファイルパスか glob を指定すると、対象の Markdown の見出しをまとめて出力する。

```bash
$ markdown-headings ./**/*.md > outlines.txt
```

標準入力も `--stdin` オプションで受け付けている。

```bash
$ cat readme.md | markdown-headings --stdin > outlines.txt
```

## `require()`して使う

プロジェクトローカルにインストールして `require('markdown-headings')` しても使える。

```javascript
const assert = require('assert');
const markdownHeadings = require('markdown-headings');
const markdown = `
# h1

あいうえお

## h2

かきくけこ`;

assert.deepEqual(markdownHeadings(markdown), [
  '# h1',
  '## h2'
]);
```