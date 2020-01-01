---
layout: post
title: ハイパフォーマンスJavaScript
date: 2015-01-24
---

# ハイパフォーマンスJavaScript

昔買ったN.Zakasの本を掘り当てたので読みなおした。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/yN2w5Shp7s/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">2年前に買った本を掘り当てたので読み返してみる</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by 1000ch (@1000ch) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2015-01-24T00:25:23+00:00">Jan 23, 2015 at 4:25pm PST</time></p></div></blockquote>

## ハイパフォーマンスなJavaScriptとは

今やJavaScriptはブラウザに留まらないので、一口にハイパフォーマンスなJavaScriptを括るのは難しい。この本に関しては **Build Faster Web Application Interfaces** とあるようにブラウザ環境におけるJavaScriptにフォーカスしている。

ブラウザのJavaScriptと言っても、Webアプリケーションの形態も多種多様になってので、最適化の形もケースバイケースとしか言えない。最適化アプローチの選択肢を増やすための本と言える。アプリケーションが複雑化してもブラウザで何が起こっているかわかれば、自ずとすべきことが見えてくる。この本にはそういうことが書かれている。

## Nicholas C. Zakas氏 ([@slicknet](https://twitter.com/slicknet/)) について

JavaScript界隈では有名な人なので、前のめりな人なら知っている人も多いと思う。Yahoo!のリードディベロッパーであり、YUIのコントリビュータも務めていた人。今は[Box](https://www.box.com/)で働いているそうで、最近はES6/ES7の仕様に口出ししたり、[ESLint](https://github.com/eslint)にコミットしてる様子。この本以外だと[メンテナブルJavaScript](http://www.amazon.co.jp/gp/product/4873116104/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4873116104&linkCode=as2&tag=1000ch-22)が有名。

[ブログ](http://www.nczonline.net/blog/)も濃い記事ばかりなので、英語が苦手じゃなかったら読んでみて欲しい。英語が苦手でも読んでみて欲しい。

## ブラウザJavaScriptの最適化に向けて

前述の通り、プログラムのアルゴリズム的な部分だけを取り扱っているわけではなく、ブラウザの描画をブロッキングしないために`<script>`をどう考えれば良いかであったり、DOMスクリプティングを効率的に実行するにはどうすればいいかなど、JavaScriptから作用しうるパフォーマンスのファクターについて網羅的に書かれている。

### 目次

1. **読み込みと実行** - JSファイルロードの妙技
2. **データアクセス** - グローバルへのアクセスコストやスコープの話
3. **DOMスクリプティング** - 効率的なDOM操作・イベントのハンドリングについて
4. **アルゴリズムと処理の制御** - ifや再帰等のアルゴリズムの最適化
5. **文字列と正規表現** - 文字列処理と正規表現、及びそれらの連携
6. **反応性のよいインターフェイス** - ブラウザスレッドを邪魔しないために
7. **Ajax** - XMLHttpRequestのイロハと使いどころ
8. **プログラミングの実践的手法** - 4章を発展させた話
9. **高パフォーマンスなJavaScriptアプリケーションのビルドと配置** - デプロイする前にやっておくべき、結合・圧縮・キャッシュ等について
10. **ツール** - 各ブラウザベンダーのデバッグツールについて

実行上の最適化についてはV8をはじめとしたJavaScriptエンジンの進化が進みすぎて、何もせずともブラウザが気を利かせてしまう可能性もあるけど、知っておくに越したことはない。Tipを集めることより、ブラウザで何が行われるかを理解するほうが本質である。

JavaScriptのMVCがどうとか、流行り廃りのあるライブラリや思想より、Webを作っていく上で大事で必要な知識だと思う。逆にこの本をおさえておけば、いま巷で話題の技術にも、これから現れるであろう新たな流行にも応用が効く。2011年刊行ということで、10章のツール部分は流石に古さがあるけど、駆け出しWebエンジニアが読むべき内容が詰まっている。

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/51tXtsUtw0L._SX389_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/487311490X/"
  tag="1000ch-22"
  title="ハイパフォーマンスJavaScript">
  Nicholas C. Zakas  (著), 水野 貴明 (翻訳)
</affiliate-link>
