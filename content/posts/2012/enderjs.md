---
title: Enderの使い方のまとめ 〜必要なライブラリを必要な分だけ〜
date: 2012-12-27
---

[Ender](http://ender.jit.su/)はnode.jsで動くJavaScriptのパッケージビルド管理システム。
JavaScriptのライブラリは非常にたくさんあって、その中から複数選んで使いたいケースはたくさん有る。まとめて使うときに欲しいものをダウンロードして、使いたいライブラリが増えたらまたビルドして…というのはとても面倒な作業。Enderはこういった問題を解決してくれる。

## Ender.jsの薦め

jQueryはとても良く出来たライブラリだけど、闇雲にjQueryを使うのはベストとは言えず、必要な機能を必要な分だけ用意するという作業が求められるようになってきた。jQuery互換のAPIで軽さを求めたZeptoを始め、最近ではBackbone.jsやUnderscore.jsといった様々なライブラリがある。

ライブラリを選定して使う際に、結合と最小化などを行うが、例えば後々ライブラリを追加したりするときに面倒だったりする。Enderはこうしたライブラリ達の依存関係の解決や結合と最小化をやってくれる。手でいちいちやるより楽だし、安全である。

## 具体的な導入方法

[ender-js/Ender](https://github.com/ender-js/Ender)を見てもらえるとわかるが、コマンドラインからの操作。

## enderのインストール

```bash
$ npm install -g ender
```

これでインストール完了。試しにenderと入力し、実行出来るかどうかテスト。

## buildしてみる

Backboneをビルドしてみる。

```bash
$ ender build backbone
# ender.js successfully built!
# ender.min.js successfully built!
```

このパッケージに何のライブラリが含まれているかを確認する。

```bash
$ ender info
# Active packages:
# └─┬ backbone@0.9.2 - ...
#   └── underscore@1.4.2 - ...
```

ここで注目したいのが、依存しているUnderscoreも一緒に含まれていること。あくまでBackboneと一括管理になるので、削除も出来ない。もちろん、追加しようとしても既にあると言われる。

パッケージにライブラリを追加する場合はadd、削除する場合はremove。試しにZeptoを追加してみる。

```bash
$ ender remove underscore
# Nothing to uninstall.

$ ender add underscore
# Specified packages already installed.

$ ender add zepto
$ ender info
# Active packages:
# ├── zepto@0.0.3 - ...
# └─┬ backbone@0.9.2 - ...
#   └── underscore@1.4.2 - ...
```

Zeptoもカスタムビルド出来るが、ここでインストールされるのはデフォルトパッケージ(polyfill zepto event detect fx ajax form touch)ぽい。Backboneはver0.9.2がダウンロードされたが、0.9.9もインストール出来るのか確認。

```bash
$ ender add backbone@0.9.9
# @の後にバージョン番号を付けることで指定出来る

$ ender info
# ├── zepto@0.0.3 - ...
# └─┬ backbone@0.9.9 - ...
#   └── underscore@1.4.2 - ...
```

ちゃんと出来た。生成されるender.jsファイルにも`0.9.9`で新しく追加された`listenTo()`や`stopListening()`があったので問題なさそう。今回は最近流行の3点セットでビルドしてみたけど、Enderが公式で紹介しているスターターパッケージの4点セットも紹介。

### [the jeesh](http://ender.jit.su/#jeesh)

- » [domReady](https://github.com/ded/domready) - a cross-browser domReady
- » [Qwery](https://github.com/ded/qwery) - a fast light-weight selector engine
- » [Bonzo](https://github.com/ded/bonzo) - a bullet-proof DOM utility
- » [Bean](https://github.com/fat/bean) - a multi-platform event manager

その他のパッケージ。

### [beyond the jeesh—additional packages](http://ender.jit.su/#additionalpackages)
