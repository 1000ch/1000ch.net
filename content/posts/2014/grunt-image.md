---
layout: post
title: 画像の最適化をCLIだけで行うgrunt-imageを作った
date: 2014-02-03
---

# 画像の最適化をCLIだけで行うgrunt-imageを作った

Webにおける画像については[以前記事にした](/posts/2013/web-image-optimization.html)が、
そのフローをより良くするべく最近gruntのモジュールを作ったのでその話を。

## 前置き

私の業務は弊社サービスのパフォーマンス改善を業務。何がボトルネックになっているかは各プロジェクトでまちまちだが、共通しているのが **「とにかく画像が多い」** というところ。どのサービスもペイロードサイズの80%程を画像が占めている。

画像の最適化を忘れるだけで（例えば）100KBとか平気で増えるので、これではCSSやJavaScriptのファイルサイズを減らしても本末転倒である（もちろんCSSもJavaScriptも結合と圧縮は非常に重要だけど！）。

## 各種最適化ツール

ではどうやって画像を最適化するのか、という話になるが、GUIだと以下の3つが有名で優秀。

- [ImageAlpha](http://pngmini.com/): フリーソフト。24bitのPNGの8bitコンバートを行う。256色~2色までパレットのカラー数もコントロールすることが可能で減色後の状態も視認出来る。
- [ImageOptim](http://imageoptim.com/): フリーソフト。画像の最適化ライブラリを各種内包している。PNG、JPG、GIFのメタ情報周りを主にダイエットしてくれる。
- [JPEGmini](http://www.jpegmini.com/): 有料ソフト。JPG画像を劣化の少ない状態でダイエットしてくれる。

GUIを使った開発フローがあっても、最適化し忘れというのが必ず起こる。人間だし。これを突き詰めていくと、自然と自動化という発想に至る。

- [gruntjs/grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin): gruntモジュール。内包ライブラリがちょっと少ない。
- [JamieMason / ImageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI): ImageOptimとImageAlphaをCLIから実行するgruntモジュール。自動化出来るが、GUIをキックしているだけなのでLinux等で実行出来ない。
- [JamieMason/grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim): ImageOptim-CLIのgruntモジュール。

Jenkins等のCIツールで使うことを考えるとLinux環境で実行できることが条件になる。`gruntjs/grunt-contrib-imagemin`はLinuxでもMacでも実行出来るけど内包ライブラリが不十分だし、`grunt-imageoptim`はImageOptimとImageAlphaを使うだけあってほぼ完璧な最適化をしてくれるけどMac環境が必須…。

というわけで、作った。

## [grunt-image](https://github.com/1000ch/grunt-image)

ImageAlphaとImageOptimで使っているライブラリ群を内包している他、追加で[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive#jpeg-recompress)というライブラリも含んでいる。

CLIで完結しているものは[rubyでは既にあったり](https://github.com/toy/image_optim)するが、Node.jsのほうが便利な気がしている。これでローカル環境での実行はもちろん、CIツールとの連携も楽になるはず。

いつも通り`npm install --save-dev grunt-image`でインストール可能。`gruntfile.js`の設定は[README](https://github.com/1000ch/grunt-image#usage)を参考にどうぞ。他にも設定したい項目があったり、この圧縮オプションも使うと良いですよ等あれば、[issues](https://github.com/1000ch/grunt-image/issues)から一報ください。

## Node.jsのモジュールも幾つか作った

余談だが、ライブラリの依存関係をnpmで解決したかったのでNode.jsでラップされていないモジュールは自分で作った。

- [1000ch/node-zopflipng-bin](https://github.com/1000ch/node-zopflipng-bin)
- [1000ch/node-pngcrush-bin](https://github.com/1000ch/node-pngcrush-bin)
- [1000ch/node-jpeg-recompress-bin](https://github.com/1000ch/node-jpeg-recompress-bin)

ライブラリ単独で使う要件があればどうぞ。

## ぼやき

画像が増えてしまうことはある種宿命だとは思っているものの、デザイナーとその辺の意識を分かち合えないと最高のWebパフォーマンスは出ない。かと言ってデザイナーがクリエイティビティを失う結果になってもまずいし。

でもWebパフォーマンスが重要なのは事実だし、画像を使えば少なからずコストがかかる（モバイルWebに於いては特に）のも事実。バランスを取りながらやっていかないといけない。
