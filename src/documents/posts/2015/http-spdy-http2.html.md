---
layout: post
title: HTTP1.1とSPDYとHTTP2
date: 2015-01-29
---

# HTTP1.1とSPDYとHTTP2

Webの通信プロトコルとして普及するHTTPも、HTTP2に向かって大きな変貌を遂げようとしている。最初期のHTTP0.9からどういう変化をたどってきたのか気になったので、調べたメモ。

## 各プロトコルの特徴

HTTP0.9からHTTP1.0になった辺は割愛。ログイン状態みたいに状態を保持する機構のためにCookieが登場したり、80番ポートがデフォルトになったりしたのはこの辺りらしい。

HTTP1.0からHTTP1.1にかけてとそれ以降は、急速に進化し肥大化してきたWebコンテンツを支えるための変遷。データは大きくなるし、リクエストも増加の一途を辿ってきたのでネットワークにも進化が要求されている。

### HTTP1.1

- IPアドレスだけでなくホスト名で通信相手を特定できるようになった（HOSTヘッダのサポート）
- TCP接続を維持する機能が追加された（Keep-Alive）
- リクエストヘッダー・レスポンスヘッダーがテキストフォーマット
- ひとつのTCPコネクションにつき、ひとつのリクエストとレスポンス
- それぞれのTCP接続が独立して[輻輳制御](http://ja.wikipedia.org/wiki/%E8%BC%BB%E8%BC%B3%E5%88%B6%E5%BE%A1)を行っている

### SPDY

- HTTPをベースに高速化が図られた、Googleが開発するプロトコル
- HTTP1.1の作法は変わらないので互換性があり、既存環境とも共存できる
- 接続手順やセッション管理といった部分の効率化がなされた
- セッション層を使うためTLSが必須、つまりHTTPS環境において利用可能
- TLS連携からのプロトコル自動選択や、HTTPヘッダの圧縮
- HTTP2に継承された通信の優先度付多重化とサーバープッシュ

### HTTP2

- SPDYをベースに考案されたプロトコル
- リクエストヘッダー・レスポンスヘッダーがバイナリフォーマット
- ひとつのTCPコネクションにつき、複数のリクエストとレスポンスが可能（仮想ストリームチャネルによる多重化）
- クライアントからのリクエストがなくともレスポンスをプッシュできる（サーバープッシュ）
- ストリームに優先度を指定可能で、後方のリクエストでも前方のリクエストより優先度が高ければそちらを優先して返却する（HTTP2プライオリティ）
- ブラウザでは最新のChromeとFirefoxで有効であり、IEではテクニカルプレビュー
- HTTP・HTTPS（平文でもOK）を問わず、TLS利用は必須ではない
- chrome://net-internals/#spdy

Service Workerとサーバープッシュの組み合わせ

## HTTP2の仕様策定状況

IETEのHTTPワーキンググループがメンテナンスしている[HTTP2の公式サイト](http://http2.github.io/)にも、デカデカと書かれている。RFC標準化も目前ぽい。

>## IETF Last Call
>HTTP/2 and HPACK are currently in IETF Last Call.

## パフォーマンスの比較

## 参考資料

- [SPDY - The Chromium Projects](http://www.chromium.org/spdy)
- [HTTP/2の現状とこれから](http://www.slideshare.net/shigeki_ohtsu/http2-ohtsu-html5conf2015) - SlideShare 2015年1月25日
- [A Simple Performance Comparison of HTTPS, SPDY and HTTP/2](https://blog.httpwatch.com/2015/01/16/a-simple-performance-comparison-of-https-spdy-and-http2/) - HttpWatch 2015年1月16日
- [HTTP/2 を追いかけて](http://blog.summerwind.jp/archives/2566) - SummerWind 2014年12月25日
- [Service WorkerとHTTP/2が切り開く新しいWeb Pushの世界](http://d.hatena.ne.jp/jovi0608/20141204/1417697480) - 2014年12月4日
- [HTTP/2 入門](http://techblog.yahoo.co.jp/infrastructure/http2/introduction_to_http2/) - Yahoo Developer Network 2014年6月19日
- [Web表示の高速化を実現するSPDYとHTTP/2.0の標準化](http://www.iij.ad.jp/company/development/tech/activities/spdy/index.html) - IIJ 2013年8月6日
- [変わるWebプロトコルの常識（SPDY, HTTP2.0編）](http://html5experts.jp/komasshu/404/) - HTML5Experts.jp 2013年7月9日
