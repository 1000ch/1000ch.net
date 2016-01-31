---
layout: post
title: Grunt ver0.5に向けてのロードマップ
date: 2013-03-07
---

# Grunt ver0.5に向けてのロードマップ

先日Grunt0.4がstableになったが、早速[0.5に向けてのロードマップ](https://github.com/gruntjs/grunt/wiki/Roadmap)が発表されている。ロードマップもちょくちょく変わるとは思うけど、軽めになぞってみる。

## タスクは全てイベントとして実行される（ようになる）

複数タスク間のデータを繋ぎ合わせて使うことが出来るらしい。CoffeeScriptのコンパイル結果をそのままUglifyでMinifyしたり。こんなイメージらしい。

```js
// load a set of tasks to be run in parallel
grunt.registerTask("name", ["jshint", "concat"], { parallel:true });
```

こんな感じで複数タスクを繋げてエイリアスを作成し、並列実行が出来るようになるっぽい。ファイルのIOなくなるからスムーズになりそう。

## Glob展開ライブラリの更新

配列形式ので指定されるGlobを解決できるようになる。って書いてある。参照パスの指定の仕方だと思われるが、サンプルがないのでよくわからない。

## Gruntfileの設定がnodeのタスクの実行に準拠した形式になる

node.jsということで、`require('grunt-hoge')`のような形式になるっぽい。

## loggerがeventを拾って出力するようになる

stderr/stdout、もしくはビルドインのロガーを使うそう。

## まとめ

0.4がどれだけ続くかもわからないし、ロードマップに書かれている0.5の仕様もこれでfixではないだろうけど、現状はこういう感じらしい。設定ファイルの更新は面倒だけど、Grunt便利だし、仕方ない。心の準備だけしておこう！

## そういえば

動かないと騒いでいた[grunt-contrib-stylusの記事](/posts/2013/gruntjs-0-4.html)だけど、`grunt-contrib-stylus`の不具合だったらしい。

- [Gruntによる継続的なビルド環境を求めて 〜 package.jsonと0.4.0のこと](http://havelog.ayumusato.com/develop/others/e539-manage_grunt_build_env.html)

<blockquote class="twitter-tweet" lang="ja"><p>upgrade to grunt 0.4.0rc7 generates an error · Issue #26 · gruntjs/grunt-contrib-stylus <a href="http://t.co/ISyq72wQVm" title="http://ow.ly/ieJDy">ow.ly/ieJDy</a>...</p>&mdash; mitsuruogさん (@mitsuruog) <a href="https://twitter.com/mitsuruog/status/308067525038575616">2013年3月3日</a></blockquote>
