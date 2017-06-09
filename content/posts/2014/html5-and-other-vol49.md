---
layout: post
title: HTML5とか勉強会でWeb ComponentsとPolymerについて話してきた
date: 2014-07-31
---

# HTML5とか勉強会でWeb ComponentsとPolymerについて話してきた

[第49回 HTML5とか勉強会 -HTML5最新情報 @Google I/O-](https://atnd.org/events/53826) でWeb ComponentsとPolymerについてお話してきました。
[Google I/O 2014に参加した](/posts/2014/google-io-2014.html)ことは前段の通りで、
今回はEric Bidelmanによる、 [**Polymer and Web Components change everything you know about Web development**](http://youtu.be/8OJ7ih8EE7s) のフィードバックという形でセッションしました。
会場はグリー@六本木ヒルズで開催されましたが、そのセミナールームをほぼ埋める300人超の参加者がいまして戦々恐々としてました。

## 当日の資料等

諸事情でスライドに十分な時間を割くことが出来ず、当日時点ではシンプルなスライドになっていたのですが
それを参加者の人に指摘されました。手を抜いたつもりは更々ありません（確かに簡素ではあったけど！）。
というわけで、Speakerdeckに事後装飾済みの資料をアップしてあります。

<script async class="speakerdeck-embed" data-id="68ef20c0f9bf013175412a749889ce68" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Google I/O 2014でのWeb Components/Polymerに関する新ネタとしては、やはりMaterial DesignからのPaper Elementsが色濃かったような印象で、その他は2014年の状況に合わせてアップデートされた内容でした。

フォローアップも兼ねてHTML5 Experts.jpに [**Web Componentsが変えるWeb開発の未来**](http://html5experts.jp/1000ch/8906/) という記事も書いていますので、宜しければどうぞ。

## Web Components ∈ Polymer

発表中に話しましたが、私個人の意見としては

1. Web Componentsの各種仕様を理解し、ネイティブAPIを触ってみる
2. それを踏まえてPolymerが何をしているかを学習し、利用する

という流れをオススメします。Polymerは便利でWeb Componentsの普及に欠かせない存在であることについては疑う余地がありませんが、故にWeb ComponentsとPolymerがやや混同されているような印象を受けるので、それを拭いたい気持ちがぼんやりと。

jQueryが流行り過ぎて、あたかも **JavaScript = jQuery** のような誤解が一時期溢れていたことに非常に違和感を感じていたので、同じ道は辿ってほしくないなぁ…。

あくまで、 **JavaScript ∋ jQuery** であり、 **Web Components ∋ Polymer** です。jQueryやらPolymerから学習することを止める気は更々ありませんが、jQueryをやってみたい人にはJavaScriptを勉強することをオススメするように、今からWeb Componentsをやってみたいと考えている人には、まずWeb Componentsの基礎からやってみるといいですよ！と言うでしょう。

Let's Web Components!
