---
layout: post
title: Gzipを有効にしてサイト表示速度を向上させる
date: 2012-12-06
---

# Gzipを有効にしてサイト表示速度を向上させる

[Gzip](http://ja.wikipedia.org/wiki/Gzip)はファイル圧縮の形式の1つで、ほぼ全てのUNIXに搭載されている。拡張子は`.gz`で、MIME-Typeは`application/x-gzip`。標準入力から受け取ったデータを圧縮し、標準出力から取り出す事が可能。当然、コマンドで使用する事が出来るがここでは割愛。

## httpサーバーのgzipを有効にしてサイト表示速度を向上させる

Webサイトの表示は、ブラウザがHTMLドキュメントをサーバーから受け取り、受け取ったHTMLを解釈し、画面に描画する事で成立する。つまり受け取るHTMLのサイズが大きければ大きい程、転送する量が増加し、必然的にロード時間が長くなる。このロード時間を短くするためにGzipでデータを圧縮しよう！という話。

## Google ChromeのPageSpeed

自分のサーバーの設定がどうなっているのかわからないという人は、[PageSpeed](https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli?utm_source=chrome-ntp-icon)で調べるのがお手軽。例えば、解析結果でGzipを有効にしましょうと言われる場合は、Gzipが効いていないということになる。

PageSpeedはGzipが有効になっているかどうかをチェックする他にも、様々なパフォーマンスの改善案を挙げてくれる非常に良く出来たツール。PageSpeed周りの詳しい使い方は以下が参考になる。

- [ついに出た！Chrome版「Page Speed」の使い方 - Stocker.jp](http://stocker.jp/diary/chrome_page_speed/)
- [Google PageSpeed Insights でパフォーマンスチューニング](http://blog.webcreativepark.net/2012/06/20-154132.html)

## もう少し詳しい仕組み

サーバーがGzipしてデータを転送する前に、 **「クライアントがgzipを解凍することが出来る」** という点が保証されなければいけないが、ブラウザがGzipをサポートしている（Gzipされたデータの解凍ができる）場合は、サーバーにリクエストするときにリクエストヘッダに自動的で **Accept-Encoding:gzip, deflate** を付与し「Gzipで送ってもらっても大丈夫ですよ」という情報をサーバーに送る。なので、このヘッダが付与されたリクエストに対して、Gzipしてデータを返してあげる準備をしてあげれば良い。

ざっくり以下のような処理の流れになる。

- クライアントがサーバーにデータを要求する。クライアントがgzipに対応している場合はその情報をリクエストヘッダに付与する
- サーバーが転送する前に、データをgzipで圧縮する。リクエストヘッダに*Accept-Encoding:gzip*が含まれている場合はGzipする。このときレスポンスヘッダに **Content-Encoding:gzip** を付与する
- サーバーがクライアントにデータを転送する
- クライアントがデータを受け取る。レスポンスヘッダに **Content-Encoding:gzip** がある場合、解凍する

## Apacheの場合

Apache2系は **mod_deflateモジュール** を使用してGzipする。`httpd.conf`を以下のように編集。

```
# /etc/httpd/conf/httpd.conf
# 以下のコメントアウトを外しdeflateモジュールをロードする
LoadModule deflate_module modules/mod_deflate.so

# 以下を適当な箇所に記述
<Location />
    SetOutputFilter DEFLATE
    BrowserMatch ^Mozilla/4 gzip-only-text/html
    BrowserMatch ^Mozilla/4\.0[678] no-gzip
    BrowserMatch \bMSI[E] !no-gzip !gzip-only-text/html
    SetEnvIfNoCase Request_URI\.(?:gif|jpe?g|png)$ no-gzip dont-vary
    Header append Vary User-Agent env=!dont-vary
</Location>

# 対象とするMIME Typeを指定する場合は
# 以下のコメントアウトを外しfilter_moduleモジュールをロードする
LoadModule filter_module modules/mod_filter.so

# 先程の<Location>タグの中に以下のようにMIME Typeを指定する
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE text/javascript
```

あとはサーバーを再起動する。

```bash
$ /etc/init.d/httpd restart
```

## まとめ

gzipの設定を施すことで転送量が減るため転送にかかる時間は短くなる。一方で、転送するデータに対しGzipを行うサーバー側の負荷と、転送先がGunzipで解凍するクライアント側の負荷が少なからず増えるが、殆どの場合Gzip実施によって実現する転送コストの削減のほうが得られる対価が大きい。テキストデータに対しては漏れ無く実践していくべき。

- [gzip圧縮のしくみ - LPWS](http://t32k.github.com/speed/articles/gzip.html)
- [Web高速化のために圧縮しよう - LPWS](http://t32k.github.com/speed/articles/use-compression.html)
