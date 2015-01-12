---
layout: post
title: GitHub Pagesに設定しているカスタムドメインをHTTPS対応させる
date: 2015-1-12
---

# GitHub Pagesに設定しているカスタムドメインをHTTPS対応させる

このブログはGitHub Pagesで運用している。ホスト名を書いた`CNAME`ファイルをドキュメントルートに配置してドメインを1000ch.netとしているが、これだと証明書がないせいでGitHub Pagesが対応しているHTTPSを利用できない。つまり、

- http://1000ch.github.io → http://1000ch.net
- https://1000ch.github.io → http://1000ch.net

となり、

- (http://1000ch.github.io → https://1000ch.net)
- https://1000ch.github.io → https://1000ch.net

とならない。

## なぜHTTPSにしたいか

話はGoogle I/O 2014の参加した時に見たHTTPS Everywhereというセッションに遡る。

<iframe width="100%" height="338" src="//www.youtube.com/embed/cBhZ6S0PFCY" frameborder="0" allowfullscreen></iframe>

ネットワークレイヤ疎い自分は、SSLのオーバーヘッドの方が大きいんジャマイカと薄っすら妄想してしまったけど、ことはそう簡単ではないらしい。

- [HTTP vs HTTPS Test](http://www.httpvshttps.com/)

これはHTTPとHTTPS通信化において、Webサイトのパフォーマンスがどうなるかを検証するサイトだけど、見ての通りHTTPSの方が高速という驚くべき結果になっている。

このカラクリは[@kazuho](http://twitter.com/kazuho)さんの考察を見てもらうとわかる。

- [なぜHTTPSはHTTPより速いのか](http://blog.kazuhooku.com/2014/12/httpshttp.html)

今話題の[Service Worker](/posts/2014/service-worker-internals.html)もセキュアな環境じゃないと無効だし、パフォーマンスの観点からも2015年はHTTP→HTTPSという潮流が生まれる予感。これについては[HTTPからHTTPSへ - Hail2u.net](http://hail2u.net/blog/internet/http-to-https.html)という記事も見て欲しい。

## CloudFlareをDNSサーバーとして利用する

GitHub PagesにCNAMEで設定しているカスタムドメインでHTTPSを使えないか探していると、それらしき情報があった。

- [GitHub Pages Now Supports HTTPS, So Use It](https://konklone.com/post/github-pages-now-supports-https-so-use-it)
- [Configuring CloudFlare’s Universal SSL](https://www.benburwell.com/posts/configuring-cloudflare-universal-ssl/)

[CloudFlare](https://www.cloudflare.com/)がユニーバサルSSLを提供しているのでそれを使うことで実現可能ということらしい。有料プランでなくとも良いとのこと。

### 指定ドメインのDNSサーバーをCloudFlareに向ける

ドメインプロバイダだと、プロバイダ側でDNSサーバーを用意してくれていたりするが、CloudFlareの用意するDNSサーバーに向くようにする。

- `clint.ns.cloudflare.com`
- `nia.ns.cloudflare.com`

変更後に[My Websites](https://www.cloudflare.com/my-websites)で、ドメインプロバイダ側でDNSサーバーのアドレスを更新したドメインの、 **Re-Test** を実行すると、裏で再テストが実行される。ドメインがCloudFlareに向いて疎通が確認出来た。めでたい。

![](/img/posts/github-pages-custom-domain-in-https/ns-changed.png)

### 常にHTTPSになるように

ドメインの右の方にあるギアのアイコンをクリックすると、ドロップダウンメニューの中に **Page rules** という項目があるのでクリックする。

![](/img/posts/github-pages-custom-domain-in-https/page-rules.png)

ここでは指定のURLパターンに対して挙動を設定可能。ドメイン全てのURLに対してHTTPSが有効になるようにしたいので、`1000ch.net/*`というパターンに対し **Always use https** をonにする。

上手く動いた(*'-')

## 結論

GitHub Pagesにカスタムドメインをあてて、それをHTTPS化は可能であることがわかった。もうちょっと手が込んだことが必要なのかと思っていたところ、いとも簡単に出来てしまったので、詰まったログ等も残せずに終わってしまった…。

興味がある人は試してみては如何でしょう。