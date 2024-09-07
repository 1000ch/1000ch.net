---
title: WEB+DB PRESS Vol.85 Webフロントエンド最前線「ECMAScript 6とJavaScriptの未来」
date: 2015-02-23
image: /img/posts/2015/wdpress-frontend-series-es6/cover.jpg
---

「Webフロントエンド最前線」という連載を担当させてもらっている[WEB+DB PRESS Vol.85](http://gihyo.jp/magazine/wdpress/archive/2015/vol85)が2月24日に発売されます！連載5回目はECMAScript 6の概要・歴史、主要な追加機能、ブラウザサポートが不完全な今どのように取り入れるか等等を書いています。

![](/img/posts/2015/wdpress-frontend-series-es6/cover.jpg)

## はじめようトランスパイラ生活

JSerならES6を聞いたこと無いっていう人は流石にいないと思うが、もう「まだ先だからいいでしょ」って言ってられる段階ではなくなってきてると思う。

現状ブラウザサポートは弱いけど、今から使っていくために出来る工夫はいくらでもあって、Chrome ExtensionsやFirefox Add-onのように実行環境が限定されるツールを作る時に書いてみるとか。比較的大きめプロダクトだとしても、トランスパイラが賢くやってくれるのでビルド前提でコード書いていくのもコスパの良い投資。

iojsも[`--harmony`フラグなしでES6のシンタックスが使える](https://iojs.org/en/es6.html)し、 Node.js 0.12向けでもブラウザ向けでもトランスパイル前提で書いていくとか、いくらでもやりようはある。

- [画像をdataURIに変換するライブラリをES6で書きなおす](/posts/2015/image-encoder-es6.html)
- [もうES6 (ES2015) でいいんじゃないか](http://havelog.ayumusato.com/develop/javascript/e651-es2015.html)

## 6to5がbabelに

記事内で紹介しているES6→ES5のトランスパイラである6to5が、原稿が入稿された後に[babel](https://github.com/babel/babel)に名前が変わるという悲劇が起こってしまったのでご注意ください。こちらは別途アナウンスがあると思います。どこかから。

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/611JK2E4TZL._SX352_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/4774171417/"
  tag="1000ch-22"
  title="WEB+DB PRESS Vol.85">
  菅原 元気 (著), 磯辺 和彦 (著), 山口 与力 (著), 澤登 亨彦 (著), 濱田 章吾 (著), 宮田 淳平 (著), 松本 亮介 (著), 海野 弘成 (著), 佐藤 歩  (著), 泉水 翔吾  (著), 佐藤 太一 (著), hide_o_55 (著), 青木 良樹 (著), 武本 将英 (著), 道井 俊介  (著), 伊藤 直也 (著), 橋本 翔 (著), 渡邊 恵太 (著), 舘野 祐一 (著), 中島 聡 (著), はまちや2 (著), 竹原 (著), 牧 大輔 (著), 工藤 春奈 (著), WEB+DB PRESS編集部 (編集)
</affiliate-link>

よろしくお願いします(´・ω・`)
