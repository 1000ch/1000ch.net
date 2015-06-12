---
layout: post
title: 【翻訳】We should optimize images
date: 2015-05-25
---

# 【翻訳】We should optimize images

**※この記事はMediumに投稿した[We should optimize images](http://bit.ly/we-should-optimize-images)の日本語訳です。**

[Steve Souders](http://www.stevesouders.com/)は[High Performance Web Site](http://stevesouders.com/hpws/)で、次のように述べています。

> エンドユーザーへのレスポンスに費やされる時間の80-90%はフロントエンド において発生している。まずはフロントエンドを最適化することだ。

Webサイトのパフォーマンスの多くはフロントエンドに起因するものです。つまりWebサイトを速くするためには、フロントエンドを最適化しなければなりません。例えば、最適化には次のような要因があります。

- [ラウンドトリップタイムを最小化する](https://developers.google.com/speed/docs/insights/mobile)
- [リクエストのオーバーヘッドを最小化する](https://developers.google.com/speed/docs/insights/EnableCompression)
- [ペイロードサイズを最小化する](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent)
- [ブラウザのレンダリング処理を最適化する](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent)
- その他いろいろ…

中でもペイロードサイズの最小化は、最も実施しやすいものの1つです。ペイロードサイズの最小化には、HTML、CSS、そして画像のファイルサイズを削減します。中でも特に、画像データはネットワーク帯域の多くを占めます。そこで、画像を最適化するためのツールをいくつか紹介したいと思います。

---

- [ImageOptim](http://imageoptim.com/) - 様々な最適化ライブラリ（PNGOUT・Zopfli・PNGCrush・AdvPNG・拡張したOptiPNG・JPEGOptim・JPEGReScan・JPEGTran・GifSicle）を内包し、PNG・JPEG・GIFを最適化するMacのアプリケーション
- [ImageAlpha](http://pngmini.com/) - 24bitのPNGを8bitにダウンコンバートしファイルサイズを大きく削減するMacのアプリケーション
- [JPEGmini](http://www.jpegmini.com/) - JPEGを少ない劣化で減色しファイルサイズを削減するMacのアプリケーション
- [RIOT](http://luci.criosweb.ro/riot/) - PNG・JPEG・GIFを最適化するWindowsのアプリケーション
- [pngoo](https://code.google.com/p/pngoo/) - PNGを圧縮するWindowsのアプリケーション
- [WebPonize](https://webponize.github.io) - PNG・JPEGをWebPフォーマットに変換するMacのアプリケーション

これらはGUIアプリケーションなので、簡単に利用することができます。ここにPNGを圧縮したサンプルがあります。

![未圧縮のPNG画像（71,834bytes）](/img/posts/2015/we-should-optimize-images/uncompressed.png)

これは圧縮されていないオリジナルの画像です。24bitのPNGで、位置情報・日付・時刻といった様々なメタ情報が含まれています。

![ImageAlphaとImageOptimで圧縮したPNG画像 (28,369 bytes) ](/img/posts/2015/we-should-optimize-images/compressed.png)

これはImageAlphaで8bitにダウンコンバートし、ImageOptimでメタ情報を削除するなどして最適化したPNGです。ほぼ劣化していないように見えます。

![ImageOptimでメタ情報を削除したが劣化を伴う処理はされていないJPEG画像（213,171 bytes）](/img/posts/2015/we-should-optimize-images/uncompressed.jpg)

こちらはJPEGのサンプルです。メタ情報はImageOptimで削除済ですが、劣化を伴う減色処理はされていません。

![JPEGminiで非可逆の減色処理をされたJPEG画像（71,874 bytes）](/img/posts/2015/we-should-optimize-images/compressed.jpg)

更にJPEGminiによって減色処理を施しています。劣化は目立ちませんが、ファイルサイズはオリジナルのおよそ34%程（66%も削減されています！）になっています。写真のような画像は非常に多くの色があるため、減色処理を行った後によく確認しなくてはならないでしょう。これは面倒な作業ですが、より良いことです。

---

私はコマンドラインのツールも欲しかったので、GruntとGulp用のモジュールを作りました。

- [grunt-image](https://github.com/1000ch/grunt-image) - GUIでの操作なく画像を最適化するGruntのモジュール
- [gulp-image](https://github.com/1000ch/gulp-image) - grunt-imageのGulpバージョン

これらを使ってPNG・JPEG・GIF・SVGを最適化することができます。インストール？もしGruntやGulpを使ったことがあればとても簡単です（きっと一度は使ったことがあるでしょう☺）。

```bash
# download them using npm
$ npm install —-save-dev grunt-image
$ npm install —-save-dev gulp-image
```

詳細な設定はGitHubのプロジェクトリポジトリを参照してください。

---

WebPも素晴らしいです。WebPはGoogleが開発する新しい画像フォーマットで、公式サイトで次にようにあります。

> 可逆圧縮のWebPはPNGと比較して、ファイルサイズが[26%小さくなります](https://developers.google.com/speed/webp/docs/webp_lossless_alpha_study#results)。非可逆圧縮のWebPは同等画質のJPEGと比較して、ファイルサイズが[25%-34%小さくなります](https://developers.google.com/speed/webp/docs/webp_study)。

WebPは、Chromeやその他のChrome Frameをバンドルしているブラウザがサポートしています。FirefoxとSafariはWebPをサポートしていません。しかし興味深いことに、SafariのWebKitを利用しているはずのiOSのChromeはWebPを表示することが可能です（おそらくChrome Frameを内包しているものと思われます）。

WebPは[公式サイト](https://developers.google.com/speed/webp/)から利用することができます。WebPに変換した画像をお見せしたいところですが、悲しいことにMediumではまだ使えないようです☹しかし、私が試した結果では、変換する前のPNGは **28,369 bytes** でしたが、WebPに変換したところ **17,382 bytes** になり劣化はありませんでした！

---

もし今まで画像の最適化について無関心だったのであれば、より良いWebパフォーマンスのために最適化を実施してください。最後に、画像についてもっと知るために参考になる記事を紹介します。

- [Give PNG a chance](http://www.phpied.com/give-png-a-chance/) — by [Stoyan Stefanov](http://www.phpied.com/bio/) / [日本語訳](http://article.enja.io/articles/give-png-a-chance.html)
- [Mobile ISP image recompression](http://calendar.perfplanet.com/2013/mobile-isp-image-recompression/) — by [Kornel Lesiński](http://pornel.net/)
- [PNG8 — The Clear Winner](http://www.sitepoint.com/png8-the-clear-winner/) — by [Alex Walker](http://www.sitepoint.com/author/alex-walker/)
- [PNG that works](http://calendar.perfplanet.com/2010/png-that-works/) — by [Kornel Lesiński](http://pornel.net/)
- [Image Compression for Web Developers](http://www.html5rocks.com/en/tutorials/speed/img-compression/) — by [Colt McAnlis](http://www.html5rocks.com/en/profiles/#coltmcanlis)

最後まで読んでくれて、どうもありがとうございます。

<iframe src="https://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=487311361X&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
<iframe src="https://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4873114462&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
<iframe src="https://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4873116767&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>
