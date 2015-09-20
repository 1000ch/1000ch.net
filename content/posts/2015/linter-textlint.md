---
layout: post
title: TextLintのAtomプラグイン
date: 2015-09-20
---

# TextLintのAtomプラグイン

[azu/textlint](https://github.com/azu/textlint)というテキストのlintエンジンがある。Node.js製なのでCLI周りは既にあるが、エディタでもできたら良いなと思ってAtomのプラグインを作ってみた。TextLintについては「[textlintで日本語の文章をチェックする](http://efcl.info/2015/09/10/introduce-textlint/)」という記事を見てもらえると良い。

## 使い方

Atomで開くプロジェクトに`.textlintrc`を配置し、プラグインやらオリジナルのルールを配置するだけ。

![](/img/posts/2015/linter-textlint/atom.png)

このようにチェックしてくれる。

## Atomで開いているワークスペースのプラグインをロードする

TextLintの基本的な作りとして、

1. TextLintが配置されているパスにあるプラグインを自動でロードする
2. TextLintコマンドを実行しているパスの`.textlintrc`を読み込んで実施するLintを選ぶ

のようになっている。プロジェクトディレクトリで各種コマンドを実行したり[Gulpのプラグイン](http://github.com/nakajmg/gulp-textlint)を使う場合は、これで何の問題も無いがAtomのプラグインを作ろうとすると

- AtomがバンドルしているNode.jsの実行パス（`/Applications/Atom.app/Contents/Resources/app.asar`）にTextLintを配置する
- Atomで開いているディレクトリにあるプラグインを自動でロードする
- Atomで開いているディレクトリにある`.textlintrc`を自動でロードする

という振る舞いを実装しなければならなそう。issue立てたらazuさんが光速で対応してくれた。

- [feat(engine): add `TextLintEngine#loadRule` · azu/textlint@b23a91e](https://github.com/azu/textlint/commit/b23a91e8aca3b2caf085faefbf1bd90d22d2f4fe)
- [resolve path with context if passed · azu/textlint@901fabe](https://github.com/azu/textlint/commit/901fabe26158f0ca1fae53d01a8a3695a4a1e68e)

実行コンテキストと違うモジュールをロードさせるというのが些か気持ち悪かったし、投げたPRのコードもあまりスマートな解決策ではなかったが、ひとまずこれで。
