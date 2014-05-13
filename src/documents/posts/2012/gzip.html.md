---
layout: post
title: Gzipを有効にしてサイト表示速度を向上させる
date: 2012-12-6
---

## そもそもGzipって？

- [gzip - Wikipedia](http://ja.wikipedia.org/wiki/Gzip)

ファイル圧縮の形式の1つで、ほぼ全てのUNIXに搭載されています。  
拡張子は.gzで、MIME-Typeはapplication/x-gzip。  
標準入力から受け取ったデータを圧縮し、標準出力から取り出す事が出来ます。  
当然、コマンドで使用する事が出来ますがここでは割愛します。  

## httpサーバーのgzipを有効にしてサイト表示速度を向上させる

Webサイトの表示は、ブラウザがhtml形式のデータをサーバーから受け取り、  
ブラウザが受け取ったhtmlを解釈し、画面に描画する事で成立します。  
つまり受け取るhtmlのサイズが大きければ大きい程、  
転送する量が増加し、必然的にロード時間が長くなります。  
このロード時間を短くしよう！という話。  

## Google ChromeのPageSpeed

自分のサーバーの設定がどうなっているのかわからないという方は  
Google Chromeの[PageSpeed](https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli?utm_source=chrome-ntp-icon)で調べると良いかも。  
のAnalyzeでGzipを有効にしましょうといわれる場合は、Gzipが効いていないということです。  
Gzip以外でもパフォーマンスの改善案を挙げてくれる非常に良く出来たツールです。  
PageSpeed周りの詳しい使い方は以下が参考になります。

- [ついに出た！Chrome版「Page Speed」の使い方 - Stocker.jp](http://stocker.jp/diary/chrome_page_speed/)
- [Google PageSpeed Insights でパフォーマンスチューニング](http://blog.webcreativepark.net/2012/06/20-154132.html)

## もう少し詳しい仕組み

サーバーがgzipしてデータを転送する前に、  
*「クライアントがgzipを解凍することが出来る」*  
という点が保証されなければいけない訳ですが、  
ブラウザがgzipの解凍が出来る場合はHttpRequestの際、  
自動的にヘッダに*Accept-Encoding:gzip, deflate*を付与し  
「gzipで送ってもらっても大丈夫ですよ」という情報をサーバーに送ります。  
なので、このヘッダが付与されたリクエストに対して  
gzipしてデータを返してあげる準備をしてあげれば大丈夫という事になります。  

## 処理フロー

ざっくり以下のような感じ。  

- クライアントがサーバーにデータを要求する。クライアントがgzipに対応している場合はその情報をリクエストヘッダに付与する。
- サーバーが転送する前に、データをgzipで圧縮する。リクエストヘッダに*Accept-Encoding:gzip*が含まれている場合はgzipする。このときレスポンスヘッダに*Content-Encoding:gzip*を付与する。
- サーバーがクライアントにデータを転送する。
- クライアントがデータを受け取る。レスポンスヘッダに*Content-Encoding:gzip*がある場合、解凍する。

## Apacheの場合

Apache2系はmod_deflateモジュールを使用してgzipします。  
httpd.confを以下のように編集。

```
#/etc/httpd/conf/httpd.conf
#以下のコメントアウトを外しdeflateモジュールをロードする
LoadModule deflate_module modules/mod_deflate.so

#以下を適当な箇所に記述
<Location />
    SetOutputFilter DEFLATE
    BrowserMatch ^Mozilla/4 gzip-only-text/html
    BrowserMatch ^Mozilla/4\.0[678] no-gzip
    BrowserMatch \bMSI[E] !no-gzip !gzip-only-text/html
    SetEnvIfNoCase Request_URI\.(?:gif|jpe?g|png)$ no-gzip dont-vary
    Header append Vary User-Agent env=!dont-vary
</Location>

#対象とするMIME Typeを指定する場合は
#以下のコメントアウトを外しfilter_moduleモジュールをロードする
LoadModule filter_module modules/mod_filter.so

#先程の<Location>タグの中に以下のようにMIME Typeを指定する
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE text/javascript
```

あとはサーバーを再起動します。

```sh
$ /etc/init.d/httpd restart
```

## まとめ

gzipの設定を施すことで転送量が減るため転送にかかる時間は短くなります。  
ただし、転送するファイルに対しgzipを行うサーバー側の負荷と  
転送先がgunzipを行うクライアント側の負荷が少なからず上がるということを念頭に置いて下さい。  
特にサーバー側に関してはリクエストが非常に多かったりすると  
cpuが上がりっぱなしという状態もあり得ますので、  
そこは運用をしながら様子見が必要な部分だと思います。  

## 関連リンク

- [gzip圧縮のしくみ - LPWS](http://t32k.github.com/speed/articles/gzip.html)
- [Web高速化のために圧縮しよう - LPWS](http://t32k.github.com/speed/articles/use-compression.html)