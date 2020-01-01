---
layout: post
title: WEB+DB PRESS Vol.84 Webフロントエンド最前線「Webフロントエンドのモジュール管理」
date: 2014-12-15
image: /img/posts/2014/wdpress-frontend-series-modulesystem/cover.jpg
---

# WEB+DB PRESS Vol.84 Webフロントエンド最前線「Webフロントエンドのモジュール管理」

「Webフロントエンド最前線」という連載を担当させてもらっている[WEB+DB PRESS Vol.84](http://gihyo.jp/magazine/wdpress/archive/2014/vol84)が12月23日に発売されます。

![](/img/posts/2014/wdpress-frontend-series-modulesystem/cover.jpg)

今回も[@ahomu](http://twitter.com/ahomu)氏と書きました。2人で書くと分量が減る以外にも色々と捗る。

## モジュール管理の理想と現実解

今回はWebフロントエンドのモジュール管理ということで、`npm`や`bower`といったパッケージマネージャと、CommonJSスタイルの依存管理をブラウザで実現する[Browserify](http://browserify.org/)に主眼を置きつつ、[RequireJS](http://requirejs.org/)・[webpack](http://webpack.github.io/)・[duo](http://duojs.org/)を併せて考察しています。

フロントエンドJavaScriptに仕事が寄ってきたのは今に始まった話ではありませんが、それに伴いモジュール管理が求められるようになりました。が、JavaScriptにはモジュール管理の仕組みが言語的に備わっておらず、次期仕様であるECMAScript6にようやく`module` / `export`を使ったモジュールシンタックスが加わります。シンタックスの追加になると当然後方互換性はないので、暫くはES5へのトランスパイル前提で書かざるを得なかったり。Node.jsの`require()`に統一をひとまず求めたり。その辺の話です。

僕は基本的には「concatでええやん」派なんですが、使ってみるとBrowserifyはやっぱり便利です。

## 興味がある方は是非

宜しくお願い致しますm(_ _)m

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/61GuZ%2B7U5IL._SX352_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/4774169552/"
  tag="1000ch-22"
  title="WEB+DB PRESS Vol.84">
  藤 吾郎 (著), 桑野 章弘  (著), 福永 亘 (著), 谷井 靖史 (著), 野村 晋之介 (著), 蛭川 皓平 (著), 岡田 友輔 (著), 藤本 真樹 (著), 伊藤 直也 (著), 宮崎 靖彦 (著), 佐藤 健太 (著), 高橋 俊幸 (著), 佐藤 太一 (著), 海野 弘成 (著), 佐藤 歩  (著), 泉水 翔吾  (著), 渡邊 恵太 (著), 舘野 祐一 (著), 中島 聡 (著), 橋本 翔 (著), はまちや2 (著), 竹原 (著), 伊賀敏樹 (著), WEB+DB PRESS編集部 (編集)
</affiliate-link>
