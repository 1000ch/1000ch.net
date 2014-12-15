---
layout: post
title: WEB+DB PRESS Vol.84 Webフロントエンド最前線「Webフロントエンドのモジュール管理」
date: 2014-12-15
image: /img/posts/wdpress-frontend-series-modulesystem/cover.jpg
description: 連載を担当させてもらっているWEB+DB PRESS Vol.84が12月23日に発売されます。
---

# WEB+DB PRESS Vol.84 Webフロントエンド最前線「Webフロントエンドのモジュール管理」

「Webフロントエンド最前線」という連載を担当させてもらっている[WEB+DB PRESS Vol.84](http://gihyo.jp/magazine/wdpress/archive/2014/vol84)が12月23日に発売されます。

<img src='/img/posts/wdpress-frontend-series-modulesystem/cover.jpg'>

今回も[@ahomu](http://twitter.com/ahomu)氏と書きました。2人で書くと分量が減る以外にも色々と捗る。

## モジュール管理の理想と現実解

今回はWebフロントエンドのモジュール管理ということで、`npm`や`bower`といったパッケージマネージャと、CommonJSスタイルの依存管理をブラウザで実現する[Browserify](http://browserify.org/)に主眼を置きつつ、[RequireJS](http://requirejs.org/)・[webpack](http://webpack.github.io/)・[duo](http://duojs.org/)を併せて考察しています。

フロントエンドJavaScriptに仕事が寄ってきたのは今に始まった話ではありませんが、それに伴いモジュール管理が求められるようになりました。が、JavaScriptにはモジュール管理の仕組みが言語的に備わっておらず、次期仕様であるECMAScript6にようやく`module` / `export`を使ったモジュールシンタックスが加わります。シンタックスの追加になると当然後方互換性はないので、暫くはES5へのトランスパイル前提で書かざるを得なかったり。Node.jsの`require()`に統一をひとまず求めたり。その辺の話です。

僕は基本的には「concatでええやん」派なんですが、使ってみるとBrowserifyはやっぱり便利です。

## 興味がある方は是非

宜しくお願い致しますm(_ _)m

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4774169552&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>