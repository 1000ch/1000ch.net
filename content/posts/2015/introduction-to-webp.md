---
layout: post
title: Introduction to WebP
date: 2015-05-22
---

# Introduction to WebP

**※この記事はMediumに投稿した[Introduction to WebP](http://bit.ly/introduction-to-webp)の日本語訳です。**

[以前述べたように](http://bit.ly/we-should-optimize-images)、画像はWebにおけるネットワーク帯域の約60%~70%を占めています。これは、画像がWebパフォーマンスにおいて最も重要な因子の1つであることを意味します。そんな画像の中でも、WebPは他のフォーマットに比べて幾つかの点において優っています。

## WebPの特徴

### 可逆圧縮と非可逆圧縮

PNGやGIFは可逆圧縮をサポートし、JPEGは非可逆圧縮をサポートしますが、WebPは可逆圧縮と非可逆圧縮の両方を利用することが出来ます。更に特筆すべきは、その圧縮率が他のどのフォーマットよりも高いということです。

> 可逆圧縮のWebPは、PNGに比べて26%程サイズが小さくなります。非可逆圧縮のWebPは、同等画質のJPEGに比べて25%~34$程サイズが小さくなります。 ※[公式サイト](https://developers.google.com/speed/webp/)より引用

### 透過（アルファチャネル）とアニメーション

WebPは可逆圧縮・非可逆圧縮を問わず、PNG同様にアルファチャネルとGIF同様にアニメーションをサポートします。

> WebPは、およそ22%程データを追加することで可逆圧縮で劣化のない透過（アルファチャネル）を利用することが出来ます。透過は非可逆圧縮においても利用可能で、透過付きのPNGに比べて3倍以上もファイルサイズを抑えられます。 ※[公式サイト](https://developers.google.com/speed/webp/)より引用

## ブラウザサポート

WebPは次のブラウザで表示することが出来ます。

- Google Chrome
- Opera
- Chrome for Android
- Chrome **for iOS**

今のところ、FirefoxとSafariはWebPをサポートしていません。しかし興味深いことにiOSのChromeではWebPの画像が表示されています（きっとWebPのデコーダを内包しているんでしょう）！

![](/img/posts/introduction-to-webp/safari-chrome.jpg)

これの意味するところは、WebPはデコーダを内包していれば、AndroidやiOSのどんなアプリケーションでもWebPを利用することが出来るということです。

## 他のフォーマットへのフォールバック

### `<picture>`要素と`<source>`要素

御存知の通り、`<picture>`要素と`<source>`要素はレスポンシブにリソースをロードする比較的新しい方法です。`<source>`要素にはリソースの **mime-type** を指定する`type`属性が存在し、それを指定することでブラウザがそれをサポートしている場合にロードさせることが出来ます。

```html
<picture>
  <source srcset="image.webp 1x" type="image/webp">
  <img src="image.jpg">
</picture>
```

この場合、ブラウザがWebPをサポートしていれば`image.webp`を、サポートしていなければ`image.jpg`がロードされます。

### WebPJS

[WebPJS](http://webpjs.appspot.com/)はJavaScriptのライブラリで、WebPの画像をdataURIの文字列にクライアントサイドで変換します。

### サーバーサイドでAcceptヘッダのチェック

ブラウザは次のように、リクエストそれぞれにAcceptヘッダを付与します。

```
Accept: image/webp, image/png, image/jpeg, image/gif, image/svg+xml, image/bitmap
```

よって、サーバーはクライアントサイドから送信されるリクエストヘッダに **Accept: image/webp**が含まれるかどうかをチェックし、ブラウザに返却する画像を選択することが出来ます。 **image/webp** を含んでいない場合は、WebPに変換する前のオリジナルであるPNGやJPEG、あるいはGIFを返せば良いでしょう。

これについては次のリソースも読むことをオススメします。

- [Deploying New Image Formats on the Web](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/) — by Ilya Grigorik
- [igrigorik/webp-detect](https://github.com/igrigorik/webp-detect) — WebP with Accept negotiation by Ilya Grigorik

## WebPのツール

### cwebp-bin

画像をWebPに変換したいときは、cwebpのNode.jsラッパーである **cwebp-bin** をnpmから手に入れることが出来ます。

```bash
$ npm install cwebp-bin
```

もちろん、[コンパイル済のバイナリ](https://developers.google.com/speed/webp/docs/precompiled)や自分でビルドする場合は[ソースコード](http://downloads.webmproject.org/releases/webp/index.html)も、[公式ウェブサイト](https://developers.google.com/speed/webp/)から手に入れることも可能です。

### GruntとGulp

GruntやGulpを使って変換したいですか？[grunt-cwebp](https://github.com/1000ch/grunt-cwebp)と[gulp-cwebp](https://github.com/1000ch/gulp-cwebp)もnpmから入手可能です。

```bash
$ npm install grunt-cwebp
$ npm install gulp-cwebp
```

### WebPonize

[WebPonize](https://webponize.github.io/)はPNGやJPEG画像をWebPへ変換するMac OS X用のアプリケーションです。もしあなたがOS X Yosemiteを使っていれば、[ダウンロード](http://bit.ly/webponize)して簡単に使うことが出来ます。ドラッグアンドドロップするだけです！

![](/img/posts/introduction-to-webp/webponize.jpg)

WebPonizeはまだ **アルファバージョン** です。皆さんの[フィードバック](https://github.com/1000ch/webponize/issues/new)をお待ちしています！
