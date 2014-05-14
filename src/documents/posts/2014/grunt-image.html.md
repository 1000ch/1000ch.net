---
layout: post
title: 画像の最適化をCLIだけで行うgrunt-imageを作った
date: 2014-2-3
---

# 画像の最適化をCLIだけで行うgrunt-imageを作った

Webにおける画像については[以前記事にしました](http://1000ch.net/2013/09/18/WebImageOptimization/)が、
そのフローをより良くするべく最近gruntのモジュールを作ったのでその話を。

## 前置き

私は弊社サービスのパフォーマンス改善を業務としてしています。
何がボトルネックになっているかは各プロジェクトでまちまちですが、
共通しているのが **「とにかく画像が多い」** というところ。
どのサービスもペイロードサイズの80%程を画像が占めているんですね。

画像の最適化を忘れるだけで（例えば）100KBとか平気で増えるので、
これではCSSやJavaScriptのファイルサイズを減らしても本末転倒です。
（もちろんCSSもJavaScriptも結合と圧縮は非常に重要ですよ！）

## 各種最適化ツール

GUIだと以下の3つが有名で優秀です。

- [ImageAlpha](http://pngmini.com/) - フリーソフト。24bitのPNGの8bitコンバートを行う。256色~2色までパレットのカラー数もコントロールすることが可能で減色後の状態も視認出来る。
- [ImageOptim](http://imageoptim.com/) - フリーソフト。画像の最適化ライブラリを各種内包している。PNG、JPG、GIFのメタ情報周りを主にダイエットしてくれる。
- [JPEGmini](http://www.jpegmini.com/) - シェアウェア。JPG画像を劣化の少ない状態でダイエットしてくれる。

GUIを使った開発フローがあっても、最適化し忘れというのが必ず起こります。人間だし。
これを突き詰めていくと自動化という発想に至ります。

- [gruntjs/grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) - gruntモジュール。内包ライブラリがちょっと少ない。
- [JamieMason / ImageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI) - ImageOptimとImageAlphaをCLIから実行するgruntモジュール。自動化出来るが、GUIをキックしているだけなのでLinux等で実行出来ない。
- [JamieMason/grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) - ↑のgruntモジュール。

Jenkins等のCIツールで使うことを考えるとLinux環境で実行できることが条件になります。
`gruntjs/grunt-contrib-imagemin`はLinuxでもMacでも実行出来るけど内包ライブラリが不十分。
`grunt-imageoptim`はImageOptimとImageAlphaを使うだけあってほぼ完璧な最適化をしてくれるけどGUIが必須…。
というわけで、作りました。

## [grunt-image](https://github.com/1000ch/grunt-image)

- [grunt-image](https://npmjs.org/package/grunt-image) - npm
- [1000ch/grunt-image](https://github.com/1000ch/grunt-image) - GitHubリポジトリ

ImageAlphaとImageOptimで使っているライブラリ群を内包しています。
あと、[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive#jpeg-recompress)というライブラリも含んでいます。
CLIで完結しているものは[rubyでは既にあったり](https://github.com/toy/image_optim)しますが、
nodeのほうが便利な気がなんとなくしているので、後悔はしていません。
これでローカル環境での実行はもちろん、CIツールとの連携も楽になるはず。

いつも通り`npm install --save-dev grunt-image`でインストール出来ます。
gruntfile.jsの設定は[readme](https://github.com/1000ch/grunt-image#usage)からどうぞ。
他にも設定したい項目があったり、この圧縮オプションも使うと良いですよ等あれば、[リポジトリのissues](https://github.com/1000ch/grunt-image/issues)に一報頂けるとありがたいです。

## nodeのモジュールも幾つか作った

これは余談になりますが、ライブラリの依存関係をnpmで解決したかったので
nodeでラップされていないモジュールは自分で作りました。参考までに置いておきます。

- [1000ch/node-zopflipng-bin](https://github.com/1000ch/node-zopflipng-bin)
- [1000ch/node-pngcrush-bin](https://github.com/1000ch/node-pngcrush-bin)
- [1000ch/node-jpeg-recompress-bin](https://github.com/1000ch/node-jpeg-recompress-bin)

最適化も色んなライブラリの圧縮プロセスを重ねてかけることでギリギリまで削れるのですが、ライブラリ単独で使ってみたいという方はどうぞ。

## ぼやき

画像が増えてしまうことはある種宿命だとは思っているものの、
やっぱデザイナーとその辺の意識を分かち合えないと最高のWebパフォーマンスって出ないなーと。
かと言ってデザイナーがクリエイティビティを失う結果になってもまずいし。
でもWebパフォーマンスが重要なのは事実だし、画像を使えば少なからずコストがかかる（モバイルWebに於いては特に）のも事実。
バランスを取りながらやっていかないとですな。
