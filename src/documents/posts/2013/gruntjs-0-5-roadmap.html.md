---
layout: post
title: Grunt ver0.5に向けてのロードマップ
date: 2013-3-7
description: 先日Grunt0.4がstableになりましたが、早速0.5に向けてのロードマップが発表されていますね。
---

# Grunt ver0.5に向けてのロードマップ

+ [Roadmap - gruntjs/grunt/wiki](https://github.com/gruntjs/grunt/wiki/Roadmap)

先日Grunt0.4がstableになりましたが、早速0.5に向けてのロードマップが発表されていますね。
意識してないけど、アップデートの追っかけブログみたいになっているな…。
Pythonのハンズオンも消化したので後日書こうと思っています。
ロードマップもちょくちょく変わるとは思いますが、軽めになぞってみる。

## タスクは全てイベントとして実行される（ようになる）

複数タスク間のデータを繋ぎ合わせて使うことが出来らしい。
CoffeeScriptのコンパイル結果をそのままUglifyでMinifyしたり。
こんなイメージらしい。

```js
// load a set of tasks to be run in parallel
grunt.registerTask("name", ["jshint", "concat"], { parallel:true });
```

こんな感じで複数タスクを繋げてエイリアスを作成し、
並列実行が出来るようになるみたいです。
ファイルのIOなくなるからスムーズになるのかな。

## Glob展開ライブラリの更新

配列形式ので指定されるGlobを解決できるようになる。って書いてある。
参照パスの指定の仕方だと思われますが、サンプルがないのでよくわからない…。

## Gruntfileの設定がnodeのタスクの実行に準拠した形式になる

node.jsということで、`require("grunt-hoge")`のような形式になるっぽい。

## loggerがeventを拾って出力するようになる

stderr/stdout、もしくはビルドインのロガーを使うそうです。

## まとめ

0.4がどれだけ続くかもわからないし、ロードマップに書かれている0.5の仕様も
これでfixではないだろうけど、現状はこういう感じらしいです。
設定ファイルの更新は面倒ですが、仕方ないですね。Grunt便利だし。
心の準備だけしておきましょう！

## そういえば

動かないと騒いでいた[grunt-contrib-stylusの記事](http://1000ch.net/posts/2013/gruntjs-0-4.html)ですが、`grunt-contrib-stylus`の不具合だったようです。

- [Gruntによる継続的なビルド環境を求めて 〜 package.jsonと0.4.0のこと](http://havelog.ayumusato.com/develop/others/e539-manage_grunt_build_env.html)

<blockquote class="twitter-tweet" lang="ja"><p>upgrade to grunt 0.4.0rc7 generates an error · Issue #26 · gruntjs/grunt-contrib-stylus <a href="http://t.co/ISyq72wQVm" title="http://ow.ly/ieJDy">ow.ly/ieJDy</a>...</p>&mdash; mitsuruogさん (@mitsuruog) <a href="https://twitter.com/mitsuruog/status/308067525038575616">2013年3月3日</a></blockquote>
