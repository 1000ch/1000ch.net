---
title: Webにおける画像の最適化
date: 2013-09-18
---

デリケートと言っても常に最高画質でやるべきなんてことを言うわけではなくて、『こういう場合にはこういう画像』ということをしていくことが必要になってきている。

## ファイルサイズとリクエストの天秤

Webのパフォーマンスにおいて、コスパが高いのはネットワーク部分。

- リクエスト数の削減
  - CSSとJSの結合
  - 画像のCSSスプライト化
  - Keep-Aliveのon
  - ローカルキャッシュ効かせる
- レスポンスサイズの削減
  - CSSとJSの圧縮
  - 画像の圧縮・最適化
  - サーバーから返すリソースのgzip化

これらは比較的簡単に行うことが出来る上に、効果も大きい。しかし、CSSとJSの結合やら圧縮やらを行っても、画像が1ファイル300KBあったり、更にそれが何ファイルもあったりしたらCSSやJSの最適化も効果が小さいものになってしまうわけで、漏れ無く実施することが重要と言える。中でも、画像はテキストファイルに比べて、少し手を加えればファイルサイズが大幅に減らせるので、今回はそちらにフォーカスしてみる。

## [PNG](http://ja.wikipedia.org/wiki/Portable_Network_Graphics)と[JPG](http://ja.wikipedia.org/wiki/JPEG)

PNGは現代のWebにおけるグラフィックの主流フォーマットと言って良い。透過できるし、JPGよりジャギらないし、圧縮率もGIFより高いケースがほとんど。拡張データ等は多いのでGIFよりファイルサイズは大きくなりがちだが）。

## 圧縮率をどうするか

PNG24は非圧縮だとファイルサイズが大変なことになるので、まず、PNGはPNG24ではなくPNG8で保存することを検討する。PNG24は、1677万色という膨大な色（JPGと同じ）を表現できるが、当然その分情報量は大きい。8bitは256色+アルファチャネルなので24bitに比べてかなり小さい情報量になる。

PNGとJPGの圧縮レベルを比較したものを用意したので以下参考。

- [1000ch/compress-image/compress-png](https://github.com/1000ch/compress-image/tree/master/compress-png)
- [1000ch/compress-image/compress-jpg](https://github.com/1000ch/compress-image/tree/master/compress-jpg)

PNGについては、PNG24bitからPNG8bitに変えただけで58KB→14KBと、ファイルサイズが四分の一程になっている。表現できる色が少なくなっているので、若干の劣化はもちろん見られるが、許容できる場合も多々あるはずだ。

JPGについてはPhotoshopの圧縮レベルを10~100で用意した。こちらも100→90にするだけでファイルサイズが大幅にダイエットされていることがわかる。画像のそのものの重要度によるけど、表示サイズが小さかったり、jpg10でも劣化が目立たなければ差し支えないケースもあるはず。

### ユーザーが本当にその画質を求めているか

を考えるべき。iPhone4S以降のためにRetina用の画像を用意すれば、大きさは4倍で、ファイルサイズもそれ相応に肥大化する。しかし、それは本当にユーザーにとって大事な画像なのか。闇雲にRetina対応をすればいいということも念頭に入れなければならない。

## ImageAlphaとImageOptim

24bitで保存されたPNGの8bit化は[ImageAlpha](http://pngmini.com/)というツールが有名で優秀。また[ImageOptim](http://imageoptim.com/)という、こちらも様々な最適化機能を備えたツールがあるが、併用すると更に効果的。ちなみに作者は同じ。

ImageAlphaは[pngquant](http://pngquant.org/)という24bitのPNGに8bitコンバートを行ってくれるライブラリのGUIラッパー。ImageOptimも画像の様々な最適化を行ってくれるアプリケーション。画像には撮影日時やた場所やら、表示には関係のない情報が付与されているが、ImageOptimはそういったメタ情報を削除してファイルサイズを削減してくれる。

## 例によって自動化

こちらもGUIということでファイルを選んでいちいちやってられねーよということで、自動化する。

- [JamieMason/grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim)

こちらはImageAlphaとImageOptimとJPEGmini for Macを実行するgruntのモジュール。ただ、内包するライブラリを叩くわけではなく、アプリケーションをCUIから実行するようなイメージなので、ImageAlphaとImageOptimがインストールされていないと実行することはできない。

## プログレッシブとベースライン

JPEG形式にはプログレッシブとベースラインという2種類の保存形式が存在する。ベースラインで保存されたJPGは、画像の上から段階的に表示されるが、プログレッシブだと最初ぼんやりした画像が現れて、徐々に鮮明に表示されていく。

- [Progressive Image Rendering](http://www.codinghorror.com/blog/2005/12/progressive-image-rendering.html)
- [Progressive JPEGs FTW!](http://blog.patrickmeenan.com/2013/06/progressive-jpegs-ftw.html)
- [Optimizing web graphics](https://developers.google.com/speed/articles/optimizing-images)

プログレッシブは低解像度の状態を含めるいくつかの段階の画像情報を保持するため、ファイルサイズが若干大きくなる傾向にある。こちらも好みによりける部分があるが、低解像度でも先に表示をすることで体感表示速度の向上が見込める可能性が高い。PNGについては同様にインターレースというオプションがある。

## dataURIはどうなのか

結論から言うと自分は推奨しない。バイナリデータに比べてサイズが1.3倍とかそのくらい大きくなる。あと、HTMLやらCSSに含めることになるので可視化されず、わかりにくい。そして管理しにくい。

さらに、dataURI使いまくってHTMLやCSSファイルが膨らむと、[もっと根本的なレンダリングブロックに繋がる](http://t32k.me/mol/log/sprite-image-vs-inline-image/)傾向にある。あとは、[CSSのキャッシュは効いても、毎回デコードしなきゃいけない](http://t32k.me/mol/log/reduce-http-requests-datauri/)よね、とかとか。

DataURI化する目的としてはリクエストを減らすことがゴールだけど、それと引き換えになるデメリットが大きく映ることが多いうことで非推奨。

### ※追記

<blockquote class="twitter-tweet"><p>|-`) 隅だけどDataURIはgzip効くから1.3倍まるまる大きくはならないよーな / Webにおける画像の最適化について考える | <a href="http://t.co/aeV3vAZQzF">http://t.co/aeV3vAZQzF</a> <a href="http://t.co/1y49VC9bd4">http://t.co/1y49VC9bd4</a></p>&mdash; あほむ (@ahomu) <a href="https://twitter.com/ahomu/statuses/380482694032785408">September 19, 2013</a></blockquote>

gzipの言及足りていなかった。一応全部画像サイズ検証して[リポジトリに追記したが](https://github.com/1000ch/compress-image/tree/master/compress-png)、まるまる大きくならないどころかgzipしたdataURIとPNGデータはほとんどサイズが変わらなかった。デコードの実施コストはあることは変わらない。

## 所感

長々と書いたが、その手法もその時その場合に応じて適切な方法を選べることが重要。メタ情報の削除は最低限、PNGの減色(8bitコンバート)およびJPGの減色も可能な限り実施したいところ。

その画質が必要なのか。その画像にRetina対応が要るのか。頻繁に更新される画像なのにスプライト化しなければいけないのか。みなさんも再考してみてください。
