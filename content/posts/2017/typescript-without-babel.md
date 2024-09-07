---
title: Babelとの併用を止めてTypeScriptビルド一本化へ
date: 2017-05-01
---

最近は社内で Web おじさん業をやる傍ら、プロジェクトコードなども少し触っている。最近では FRESH! でアレコレしていて、クライアントサイドとサーバーサイドの改善もやったり。

- [FRESH! Web パフォーマンス改善 〜クライアントサイド編〜 | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/6057/)
- [FRESH! Web パフォーマンス改善 〜サーバサイド編〜 | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/5975/)

ふたつ👆ともよくまとまっているので、未読の人は是非読んでください。

あとは開発環境周りもコツコツ直していたりする。[Web クライアントの構成要素 - Client Side of █████fresh.tv](http://s.aho.mu/160405-node_school/#8) で触れられている通り、TypeScript と Babel の多段ビルドで運用していた。型を使いたいモチベーションと JSX をコンパイルする事情が合わさってのことだが、最近では [TypeScript が JSX に対応している](https://www.typescriptlang.org/docs/handbook/jsx.html)ので、TypeScript ビルドへの統一に踏み切った。

## JavaScriptをTypeScriptでビルドする

TypeScript と JSX それぞれの JavaScript へのコンパイルに分かれていて、設定が2箇所に分かれている気持ち悪さと、ビルド結果を Browserify でバンドルする都合で双方の待ち合わせがあったりなどの、ビルド処理の複雑化を招いていた。TypeScript ビルドへ統一することでそれらが一気に解消された上に、ビルド時間への短縮にも繋がった。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ひとまず allowJs を駆使しながら TypeScript への一本化を果たして、ビルド時間が 90s から 70s 程になった。exports.__esModule = true; の優しさ。<a href="https://t.co/1nBGdZNcJ0">https://t.co/1nBGdZNcJ0</a></p>&mdash; 煎茶 🍵 (@1000ch) <a href="https://twitter.com/1000ch/status/857766566775070722">2017年4月28日</a></blockquote>

対応内容としては単純で、`babel` でビルドしていた `.js` ファイルを代わりに `tsc` でビルドするだけ。ここで JavaScript ファイルのコンパイルを有効にするため `tsconfig.json` に `"allowJs": true` を入れる。JSX が記述されている `.js` は順に `.tsx` に変更していかなければならないが、ほとんど何も変更せずに今まで動作しまっている。

JavaScript のスーパーセットというのと、JSX サポートが最高ということに尽きそう。

## eslint/typescript-eslint-parser

FRESH! では ESLint を採用しており、自家製の [`openfresh/eslint-config-fresh`](https://github.com/openfresh/eslint-config-fresh) と [`openfresh/eslint-config-fresh-react`](https://github.com/openfresh/eslint-config-fresh-react) をルールにしている（ほとんど [`xo`](https://github.com/sindresorhus/xo) ベースだけど）。`tslint` も2分くらい検討したが
、公式の [`eslint/typescript-eslint-parser`](https://github.com/eslint/typescript-eslint-parser) が動いてくれたのでこちらを使うことにした。

`eslint-config-fresh` で `parser` に `babel-eslint` を指定していたところ、プロジェクトの `.eslintrc` で `typescript-eslint-parser` を指定しても先に `babel-eslint` が参照されてしまうようでうまく ESLint が動作しなかった（これが仕様なのかどうかはちゃんとに調べていない…）。これは [`eslint-config-fresh` 側で `parser` を指定しない方向で対処した](https://github.com/openfresh/eslint-config-fresh/pull/5)。
