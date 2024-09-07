---
title: WEB+DB PRESS Vol.90 Webフロントエンド最前線「SVG … マルチデバイスに強く、アニメーションもできる画像フォーマット」
date: 2015-12-23
image: /img/posts/2015/wdpress-frontend-series-svg/cover.jpg
---

「Webフロントエンド最前線」という連載を担当させてもらっている[WEB+DB PRESS Vol.90](http://gihyo.jp/magazine/wdpress/archive/2015/vol90)が12月23日に発売されます。今回は、ベクター形式の画像フォーマットとして良さが見直されてきているSVGについてです。

<blockquote class="twitter-tweet" lang="ja"><p lang="ja" dir="ltr">お次は<a href="https://twitter.com/ahomu">@ahomu</a>さん、<a href="https://twitter.com/1000ch">@1000ch</a>さんによる連載「Webフロントエンド最前線」のご紹介。今回は、古参ながらも最近ついに（？）注目を集めるようになってきた画像形式、SVGについて解説いただきました！ アニメーションもできるというのは強いですね…… <a href="https://twitter.com/hashtag/wdpress?src=hash">#wdpress</a></p>&mdash; WEB+DB PRESS編集部 (@wdpress) <a href="https://twitter.com/wdpress/status/679862792954851329">2015, 12月 24</a></blockquote>

![](/img/posts/2015/wdpress-frontend-series-svg/cover.jpg)

## イマドキのWebとSVG

SVGそのものは真新しい技術ではありません。現在最も普及しているSVG 1.1は2003年にW3Cによって勧告されており、[ブラウザの普及も進んでいます](http://caniuse.com/#search=SVG)。この古くからあるSVGが昨今になり良さが見直されていることにはいくつか理由があります。

### マルチデバイスとベクター形式

SVGと聞いて真っ先に思い浮かぶのは **ベクター形式** という特徴でしょう。PNG、JPG、GIFのようなドットの集合で表現されるラスター形式の画像とは異なり、ベクター形式は座標とそれらを結ぶ線や図形で画像を表現するので、配置される領域の大きさに左右されません。端的に言えば、縮尺に強いということであり、Retinaディスプレイのような高解像度端末やタブレット端末のために、同じ画像をサイズ違いで用意する手間が省けることになります。レスポンシブウェブデザインの強い味方と言ってよいでしょう。

### Web技術との相性

他のWeb技術と相性が良いのも特徴です。CSSで装飾が可能であったり（もちろんCSSアニメーションも）、HTMLと同様にDOMインターフェースが利用できたりと、とても柔軟な技術と言えます。外部SVGとして利用するもよし、複数のSVGを組み合わせてスプライトシートとして利用するもよし。また、SVGはHTMLに直接埋め込むことで本領を発揮しますが、ここから先は本誌を手にとってご覧いただけると嬉しいです。

## ディベロッパーもデザイナーも

ディベロッパーはもちろんのこと、デザインに関わる人も抑えておくべき技術です。

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/61Yy-mVlHdL._SX352_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/4774177873/"
  tag="1000ch-22"
  title="WEB+DB PRESS Vol.90">
  江口 和宏 (著), 吉田 太一郎 (著), 内田 優一 (著), 青山 公士 (著), 石本 光司  (著), まつもと ゆきひろ (著), おにたま (著), 田籠 聡 (著), 竹内 郁雄 (著), 南川 毅文 (著), 伊藤 直也 (著), 佐藤 太一 (著), 髙橋 侑久 (著), Magnolia.K (著), 佐藤 歩 (著), 泉水 翔吾  (著), 西尾 泰和 (著), 中島 聡 (著), はまちや2 (著), 竹原 (著), 宮崎 亮輔 (著), 安藤 祐介 (著), WEB+DB PRESS編集部 (編集)
</affiliate-link>
