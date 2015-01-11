---
layout: post
title: GitHub Pagesに設定しているカスタムドメインをHTTPS対応させる
date: 2015-1-13
---

# GitHub Pagesに設定しているカスタムドメインをHTTPS対応させる

このブログはGitHub Pagesで運用している。ホスト名を書いた`CNAME`ファイルをドキュメントルートに配置してドメインを1000ch.netとしているが、これだと証明書がないせい(?)でGitHub Pagesが対応しているHTTPSを利用できない。つまり、

- http://1000ch.github.io → http://1000ch.net
- https://1000ch.github.io → http://1000ch.net

となり、

- (http://1000ch.github.io → https://1000ch.net)
- https://1000ch.github.io → https://1000ch.net

とならない。

## なぜHTTPSにしたいか

話はGoogle I/O 2014の参加した時に見たHTTPS Everywhereというセッションに遡る。

<iframe width="100%" height="338" src="//www.youtube.com/embed/cBhZ6S0PFCY" frameborder="0" allowfullscreen></iframe>

- [HTTP vs HTTPS Test](http://www.httpvshttps.com/)

探していると、それらしき情報があったのでやってみる。

- [GitHub Pages Now Supports HTTPS, So Use It](https://konklone.com/post/github-pages-now-supports-https-so-use-it)
- [CloudFlare](https://www.cloudflare.com/)
