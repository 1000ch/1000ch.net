---
layout: post
title: Enderの使い方のまとめ 〜必要なライブラリを必要な分だけ〜
date: 2012-12-27
---

## Enderってなんですか

この世の中にたくさん存在するJavaScriptのライブラリを複数使いたいケースはたくさん有ると思います。  
まとめて使うときに欲しいものをダウンロードして、使いたいライブラリが増えたらまたビルドして…。  
Enderはnode.jsで動くJavaScriptのパッケージビルド管理システムです。  
こういった問題の解決をしてくれるでしょう。  

- [Ender - the no-library JavaScript library](http://ender.jit.su/)

## Ender.jsの薦め

[@cssradar](http://twitter.com/cssradar)氏と話したときに紹介してもらったのがきっかけです。  
闇雲にjQueryを使うのはもはやベストとは言えず、必要な機能を必要な分だけ用意しなければなりません。  
（jQueryは非常に優秀なライブラリではありますが、モバイル端末＋3G回線にはやや負担が大きい。）  
軽さを求めたZeptoを始め、最近ではBackbone.jsやUnderscore.jsといった様々なライブラリがあります。  
ライブラリを選定して使う際に、結合と最小化などを行いますが、  
例えば後々ライブラリを追加したりするときに面倒なこともあるでしょう。  
Enderはこうしたライブラリ達の依存関係の解決や結合と最小化をやってくれます。  
やっぱ手でいちいちやるより楽だし、安心できます。  

## 具体的な導入方法

- [ender-js/Ender Github](https://github.com/ender-js/Ender)

リンク先チラッと見てもらえるとわかりますが、node.jsということでCUIからの操作になります。  
あまり抵抗を持たずにやってみてください。難しくないので。  

## enderのインストール

```bash
$ npm install -g ender
```

これでインストール完了です。必要に応じてsudoで。  
試しにenderと入力し、実行出来るかどうか試してみて下さい。  

## 試しにbuildしてみる

Backboneをビルドしてみます。  

```bash
$ ender build backbone
# ender.js successfully built!
# ender.min.js successfully built!
```

このパッケージに何のライブラリが含まれているかを確認します。  

```bash
$ ender info
# Active packages:
# └─┬ backbone@0.9.2 - ...
#   └── underscore@1.4.2 - ...
```

ここで注目したいのが、依存しているUnderscoreも一緒に含まれていること。  
あくまでBackboneと一括管理になるので、削除も出来ません。  
もちろん追加しようとしても既にあると言われます。  
パッケージにライブラリを追加する場合はadd、削除する場合はremoveで。  
Zeptoを追加してみます。  

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

Zeptoもカスタムビルド出来ますが、ここでインストールされるのはデフォルトパッケージのようです。  
(polyfill zepto event detect fx ajax form touch)  
Backboneはver0.9.2がダウンロードされましたが、0.9.9もインストール出来るのか確認。  

```bash
$ ender add backbone@0.9.9
# @の後にバージョン番号を付けることで指定出来る

$ ender info
# ├── zepto@0.0.3 - ...
# └─┬ backbone@0.9.9 - ...
#   └── underscore@1.4.2 - ...
```

おお、ちゃんと出来ました。生成されるender.jsファイルにも  
0.9.9で新しく追加された`listenTo()`や`stopListening()`があったので問題なさそうです。  
今回は最近流行の3点セットでビルドしてみましたが、  
Enderが公式で紹介しているスターターパッケージの4点セットも紹介。  

### [the jeesh](http://ender.jit.su/#jeesh)

- » [domReady](https://github.com/ded/domready) - a cross-browser domReady
- » [Qwery](https://github.com/ded/qwery) - a fast light-weight selector engine
- » [Bonzo](https://github.com/ded/bonzo) - a bullet-proof DOM utility
- » [Bean](https://github.com/fat/bean) - a multi-platform event manager

その他のパッケージ。  

### [beyond the jeesh—additional packages](http://ender.jit.su/#additionalpackages)

## まとめ

必要なものを選んで組み合わせて使ったら、良いと思います。  
そういうニーズがある中の便利ツールとしてのEnderの紹介でした。  