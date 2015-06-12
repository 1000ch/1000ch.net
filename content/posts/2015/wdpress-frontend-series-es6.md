---
layout: post
title: WEB+DB PRESS Vol.85 Webフロントエンド最前線「ECMAScript 6とJavaScriptの未来」
date: 2015-02-23
---

# WEB+DB PRESS Vol.85 Webフロントエンド最前線「ECMAScript 6とJavaScriptの未来」

「Webフロントエンド最前線」という連載を担当させてもらっている[WEB+DB PRESS Vol.85](http://gihyo.jp/magazine/wdpress/archive/2015/vol85)が2月24日に発売されます！連載5回目はECMAScript 6の概要・歴史、主要な追加機能、ブラウザサポートが不完全な今どのように取り入れるか等等を書いています。

![](/img/posts/2015/wdpress-frontend-series-es6/cover.jpg)

## はじめようトランスパイラ生活

JSerならES6を聞いたこと無いっていう人は流石にいないと思うが、もう「まだ先だからいいでしょ」って言ってられる段階ではなくなってきてると思う。

現状ブラウザサポートは弱いけど、今から使っていくために出来る工夫はいくらでもあって、Chrome ExtensionsやFirefox Add-onのように実行環境が限定されるツールを作る時に書いてみるとか。比較的大きめプロダクトだとしても、トランスパイラが賢くやってくれるのでビルド前提でコード書いていくのもコスパの良い投資。

iojsも[`--harmony`フラグなしでES6のシンタックスが使える](https://iojs.org/en/es6.html)し、 Node.js 0.12向けでもブラウザ向けでもトランスパイル前提で書いていくとか、いくらでもやりようはある。

- [画像をdataURIに変換するライブラリをES6で書きなおす](https://1000ch.net/posts/2015/image-encoder-es6.html)
- [もうES6 (ES2015) でいいんじゃないか](http://havelog.ayumusato.com/develop/javascript/e651-es2015.html)

## 6to5がbabelに

記事内で紹介しているES6→ES5のトランスパイラである6to5が、原稿が入稿された後に[babel](https://github.com/babel/babel)に名前が変わるという悲劇が起こってしまったのでご注意ください。こちらは別途アナウンスがあると思います。どこかから。

<iframe src="https://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4774171417&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

よろしくお願いします(´・ω・`)
