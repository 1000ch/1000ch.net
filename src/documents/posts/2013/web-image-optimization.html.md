---
layout: post
title: Webにおける画像の最適化について考える
date: 2013-9-18
---

# Webにおける画像の最適化について考える

デリケートと言っても常に最高画質でやるべきなんてことを言うわけではなくて、
『こういう場合にはこういう画像』ということをしていくことが必要になると思います。
その引き出しをなるべく多く用意しておきましょう。

## ファイルサイズとリクエストの天秤

Webのパフォーマンスにおいて、コスパが高いのはネットワーク部分です。

- リクエスト数の削減
    - CSSとJSの結合
    - 画像のCSSスプライト化
    - Keep-Aliveのon
    - ローカルキャッシュ効かせる
- レスポンスサイズの削減
    - CSSとJSの圧縮
    - 画像の圧縮・最適化
    - サーバーから返すリソースのgzip化

これらは比較的簡単に行うことが出来る上に、効果も大きいです。  
しかしCSSとJSの結合と圧縮を行っても、画像が1ファイル300KBあったり、
更にそれが何ファイルもあったりしたらCSSやJSの最適化も効果が小さいものになってしまうわけです。
画像はテキストファイルに比べて、少し手を加えればファイルサイズが大幅に減らせるので、今回はそちらにフォーカスしてみます。

## PNGとJPG

- [Portable Network Graphics](http://ja.wikipedia.org/wiki/Portable_Network_Graphics)
- [JPEG](http://ja.wikipedia.org/wiki/JPEG)

PNGは現代のWebにおけるグラフィックの主流フォーマットと言って良いでしょう。
透過できるし、JPGよりジャギらないし、圧縮率もGIFより高いケースがほとんどです。
（拡張データ等は多いのでGIFよりファイルサイズは大きくなりがちですが。）

## 圧縮率をどうするか

非圧縮だとファイルサイズが大変なことになります。
まず、PNGはPNG24ではなくPNG8で保存することを検討してください。
PNG24は、1677万色という膨大な色（JPGと同じ）を表現できますが、当然その分情報量は大きいです。
8bitは256色+アルファチャネルなので24bitに比べてかなり小さい情報量になります。

PNGとJPGの圧縮レベルを比較したものを用意したので以下をご覧ください。

- [1000ch/compress-image/compress-png](https://github.com/1000ch/compress-image/tree/master/compress-png)
- [1000ch/compress-image/compress-jpg](https://github.com/1000ch/compress-image/tree/master/compress-jpg)

PNGについては、PNG24bitからPNG8bitに変えただけで58KB→14KBと、
ファイルサイズが四分の一程になっています。
表現できる色が少なくなっているので、若干の劣化はもちろん見られますが、
許容できる場合も多々あるのではないでしょうか。
JPGについてはPhotoshopの圧縮レベルを10~100で用意しました。
こちらも100→90にするだけでファイルサイズが大幅にダイエットされています。  

画像のそのものの重要度によりますが、表示サイズが小さかったり、
jpg10でも劣化が目立たなければ差し支えないケースもあるはずです。

### ユーザーが本当にその画質を求めているか

を考えるべきです。iPhone4S以降のためにRetina用の画像を用意すれば、
大きさは4倍で、ファイルサイズもそれ相応に肥大化します。  
しかし、それは本当にユーザーにとって大事な画像なのでしょうか。
闇雲にRetina対応をすればいいということも念頭に入れましょう。  

## ImageAlphaとImageOptim

PNG24bitで保存された画像のPNG8bit化はImageAlphaというツールが有名で優秀です。
またImageOptimという、こちらも様々な最適化機能を備えたツールがあるのですが、
併用すると更に効果的です。ちなみに作者は同じ。

- [ImageAlpha](http://pngmini.com/)
- [ImageOptim](http://imageoptim.com/)

ImageAlphaは[pngquant](http://pngquant.org/)というpng24bitのpng8bitコンバートを行ってくれるライブラリのラッパーGUIです。
ImageOptimも画像の様々な最適化を行ってくれるアプリケーションです。
画像には撮影日時やた場所やら、表示には関係のない情報が付与されています。
ImageOptimはそういったメタ情報を削除してファイルサイズを削減してくれます。
（両者が含むライブラリの説明は大変なのでちょっと割愛します。詳しくはGitHubのリポジトリ参照。）

- [pornel/ImageAlpha](https://github.com/pornel/ImageAlpha)
- [pornel/ImageOptim](https://github.com/pornel/ImageOptim)

## 例によって自動化

こちらもGUIということでファイルを選んでいちいちやってられねーよということで、自動化。

- [JamieMason/grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim)

こちらはImageAlphaとImageOptimとJPEGmini for Macを実行するgruntのモジュールです。素敵です。
ただ、内包するライブラリを叩くわけではなく、
アプリケーションをCUIから実行するようなイメージなので、
インストールされていないと実行することはできません。

## プログレッシブとベースライン

JPG画像にはプログレッシブとベースラインという2種類の保存形式が存在します。  
ベースラインで保存されたJPGは、画像の上から段階的に表示されますが、
プログレッシブだと最初ぼんやりした画像が現れて、徐々に鮮明に表示されます。

- [Progressive Image Rendering](http://www.codinghorror.com/blog/2005/12/progressive-image-rendering.html)
- [Progressive JPEGs FTW!](http://blog.patrickmeenan.com/2013/06/progressive-jpegs-ftw.html)
- [Optimizing web graphics](https://developers.google.com/speed/articles/optimizing-images)

プログレッシブは低解像度の状態を含めるいくつかの段階の画像情報を保持するため、
ファイルサイズが若干大きくなります。こちらも好みによりける部分があるかと思いますが、
低解像度でも先に表示をすることで体感表示速度の向上が見込める可能性が高いです。  

PNGについては同様にインターレースという保存オプションがあります。

## DataURIはどうなのか

結論から言うと自分は推奨しないです。  
バイナリデータに比べてサイズが1.3倍とかそのくらい大きくなります。
CSSに含めることになるので可視化されず、わかりにくい。つまり管理しにくいです。
（compassだと`inline-image()`とかでDataURI化してくれますが。）
DataURI使いまくってCSSファイルが膨らむと、RenderTreeが生成されず
[もっと根本的なレンダリングブロックに繋がる](http://t32k.me/mol/log/sprite-image-vs-inline-image/)可能性もあるし、
CSSのキャッシュは効いても、毎回デコードしなきゃいけないよね、とか。

- [HTTPリクエストを減らすために【DataURI編】遅延ロードでレンダリングブロックを回避](http://t32k.me/mol/log/reduce-http-requests-datauri/)

目的としてリクエストを減らすことがゴールなわけですが、
それと引き換えになるデメリットが大きいかなということで非推奨です。僕は。  

## 所感

長々と書きましたが、その手法もその時その場合に応じて適切な方法を選べることが大事です。  
PNGの8bitコンバートとjpgの圧縮、メタカットが最低限やっておきたいですね。
その画質が必要なのか。その画像にRetina対応が要るのか。
頻繁に更新される画像なのにスプライト化しなければいけないのか。  
みなさんも再考してみてはいかがでしょうか。

## 追記1

途中DataURIについての言及をしましたが以下の様なご指摘を受けました。  

<blockquote class="twitter-tweet"><p>|-`) 隅だけどDataURIはgzip効くから1.3倍まるまる大きくはならないよーな / Webにおける画像の最適化について考える | <a href="http://t.co/aeV3vAZQzF">http://t.co/aeV3vAZQzF</a> <a href="http://t.co/1y49VC9bd4">http://t.co/1y49VC9bd4</a></p>&mdash; あほむ (@ahomu) <a href="https://twitter.com/ahomu/statuses/380482694032785408">September 19, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

gzipの言及足りておりませんでした。その通りでした。  
一応全部画像サイズ検証して[リポジトリに追記しましたが](https://github.com/1000ch/compress-image/tree/master/compress-png)、
まるまる大きくならないどころかgzipしたDataURIとpngデータはほとんどサイズが変わりませんでした。  

## 追記2

各所でカラーパレットという言葉を使ってしまっていたのですが、以下の様な指摘を受けました。  
（現在は修正してあります。）  

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/1000ch">@1000ch</a> <a href="https://twitter.com/ahomu">@ahomu</a> ていうか「パレット」という用語がわかってないですよ</p>&mdash; はぇ～ (@haxe) <a href="https://twitter.com/haxe/statuses/380483481148461056">September 19, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

PNGにおいてパレットは基本チャンクに含まれるRGBの3バイトからなる1~256のエントリ。
ビットマップにおいて色はピクセルごとに指定されますが、インデックスカラーを定義し、
ピクセルからそのインデックスを参照することでデータ量が減ります。
パレットはインデックスカラーとして作用し、PNG8bitはこっちのモードになる。たぶん。
colorタイプが3の時は必須、2~6の時は任意。と書いてありましたがこの辺りはよくわかりませんでした。
うーむ、勉強足りない。  

- [4. Chunk Specifications](http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html)
- [PNG that works](http://calendar.perfplanet.com/2010/png-that-works/)

お二方ご指摘ありがとうございました。m(_ _)m
