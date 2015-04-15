---
layout: post
title: WEB+DB PRESS Vol.86 Webフロントエンド最前線「Service Workerで実現するオフラインWebアプリケーション」
date: 2015-04-15
---

# WEB+DB PRESS Vol.86 Webフロントエンド最前線「Service Workerで実現するオフラインWebアプリケーション」

「Webフロントエンド最前線」という連載を担当させてもらっている[WEB+DB PRESS Vol.86](http://gihyo.jp/magazine/wdpress/archive/2015/vol86)が4月23日に発売されます！連載6回目は、HTTPリクエストの操作・サーバープッシュの受信・バックグラウンドスケジューラといった、Webに長らく求められてきた機能の基盤となるService Workerについて。

![](/img/posts/wdpress-frontend-series-serviceworker/cover.jpg)

## Service Workerで変わるWebアプリの常識

Service Workerで実現されるのWebページのオフライン化に限りません。これは[Frontrend Conference](https://1000ch.net/posts/2015/frontrend-conference.html)のときに話した通り。

- ブラウザスレッドのリクエスト検知と操作
- プッシュサーバからのプッシュデータの受信
- バックグラウンドで実行されるスケジューラ

どの機能もネイティブのプラットフォームにはあったもののブラウザにはなく、そしてアプリにとっては重要なものであったので、これらの差でネイティブアプリという選択が数多くされてきた。Service Workerによってこれらが実現することは、Webにとって追い風になるのは間違いない。

- [ネイティブアプリ活況下でのWeb](http://takoratta.hatenablog.com/entry/2015/01/08/014826) - Nothing ventured, nothing gained.
- [ウェブのプッシュ通知、何がそんなにすごいのか？](https://blog.agektmr.com/2015/03/mobile-web-app.html) - Tender Surrender
- [モバイルの未来はアプリベースではなくなる？](http://readwrite.jp/archives/21714) - readwrite.jp

パフォーマンスの差も確実に埋まるし（追い付く・追い越すというのは有り得ない話ではあるが、人が気づかないレベルにはいつか到達する。はず）、パフォーマンス以上に決定的な差であったプッシュ通知やバックグラウンドスケジューラも実現する。

ただ、 **Google PlayやApp Storeからダウンロードしてスマートフォンのデスクトップに配置する** ということが一般化しているので、ブックマークをホームに置くことをどこまで浸透させれるかがポイントかなと思っている。が、これも[Increasing engagement with Web App install banners](http://updates.html5rocks.com/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android)のようなブラウザの機能によって、案外あっさり定着するのかも。

![](http://updates.html5rocks.com/assets/2015-03-03/add-to-home-screen-9f848df296e9e17100d68ef9aea43d69.gif)

※画像はHTML5Rocksより引用

## 宜しくお願いします(´・ω・`)

Service Workerはオプトインの機能として取り入れやすい技術でもあります。今から積極的に試しておきたいところです。