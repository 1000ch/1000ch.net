---
title: GitHub Pagesに設定しているカスタムドメインをHTTPS対応させる
date: 2015-01-12
---

このブログはGitHub Pagesで運用している。ホスト名を書いた`CNAME`ファイルをドキュメントルートに配置してドメインを1000ch.netとしているが、これだと証明書がないせいでGitHub Pagesが対応しているHTTPSを利用できない。つまり、

- http://1000ch.github.io → http://1000ch.net
- https://1000ch.github.io → http://1000ch.net

となり、

- (http://1000ch.github.io → https://1000ch.net)
- https://1000ch.github.io → https://1000ch.net

とならない。

## なぜHTTPSにしたいか

話はGoogle I/O 2014に参加した時に見たHTTPS Everywhereというセッションに遡る。

<iframe loading="lazy" src="https://www.youtube.com/embed/cBhZ6S0PFCY?si=9hG4T9WLUelnAFB_" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="aspect-ratio: 16/9;"></iframe>

ネットワークレイヤ疎い自分は、SSLのオーバーヘッドの方が大きいのではと薄っすら妄想してしまったけど、事はそう簡単ではないらしい。

[HTTP vs HTTPS Test](http://www.httpvshttps.com/)はHTTPとHTTPS通信化において、Webサイトのパフォーマンスがどうなるかを検証するサイトだが、見ての通りHTTPSの方が高速という驚くべき結果になっている。

このカラクリは、[@kazuho](http://twitter.com/kazuho)さんの[なぜHTTPSはHTTPより速いのか - Kazuho's Weblog](http://blog.kazuhooku.com/2014/12/httpshttp.html)という記事にある考察を見てもらうとわかる。

話題の[Service Worker](/posts/2014/service-worker-internals.html)もセキュアな環境じゃないと無効だし、パフォーマンスの観点からも2015年はHTTP→HTTPSという潮流が生まれる予感。これについては[HTTPからHTTPSへ - Hail2u.net](http://hail2u.net/blog/internet/http-to-https.html)という記事も見て欲しい。

## CloudFlareをDNSサーバーとして利用する

GitHub PagesにCNAMEで設定しているカスタムドメインでHTTPSを使えないか探していると、それらしき情報が[GitHub Pages Now Supports HTTPS, So Use It](https://konklone.com/post/github-pages-now-supports-https-so-use-it)という記事にあった。CloudFlareが[ユニーバサルSSLを提供している](https://www.benburwell.com/posts/configuring-cloudflare-universal-ssl/)のでそれを使うことで実現可能ということらしい。有料プランでなくとも良いとのこと。

### 指定ドメインのDNSサーバーをCloudFlareに向ける

ドメインプロバイダだと、プロバイダ側でDNSサーバーを用意してくれていたりするが、CloudFlareの用意するDNSサーバーに向くようにする。DNSサーバーは`xxx.ns.cloudflare.com`みたいなやつが2つ。

変更後に[My Websites](https://www.cloudflare.com/my-websites)で、ドメインプロバイダ側でDNSサーバーのアドレスを更新したドメインの、 **Re-Test** を実行すると、裏で再テストが実行される。ドメインがCloudFlareに向いて疎通が確認出来た。めでたい。

![](/img/posts/2015/github-pages-custom-domain-in-https/ns-changed.png)

### 常にHTTPSになるように

ドメインの右の方にあるギアのアイコンをクリックすると、ドロップダウンメニューの中に **Page rules** という項目があるのでクリックする。

![](/img/posts/2015/github-pages-custom-domain-in-https/page-rules.png)

ここでは指定のURLパターンに対して挙動を設定可能。ドメイン全てのURLに対してHTTPSが有効になるようにしたいので、`1000ch.net/*`というパターンに対し **Always use https** をonにする。

上手く動いた👌

## 結論

GitHub Pagesにカスタムドメインをあてて、それをHTTPS化は可能であることがわかった。もうちょっと手が込んだことが必要なのかと思っていたところ、いとも簡単に出来てしまったので、詰まったログ等も残せずに終わってしまった…。
