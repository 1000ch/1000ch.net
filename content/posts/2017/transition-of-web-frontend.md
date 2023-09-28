---
layout: post
title: Webフロントエンドの変遷とこれから at デブサミ2017
date: 2017-02-21
---

# Webフロントエンドの変遷とこれから at デブサミ2017

[Developer Summit 2017](http://event.shoeisha.jp/devsumi/20170216/) にて [Web フロントエンドの変遷とこれから](http://event.shoeisha.jp/devsumi/20170216/session/1270/) というタイトルで講演した。

## 前後半のスライド

インターネット黎明期から昨今にかけて Web がどのように変遷してきたかを振り返りつつ、この進化の早い Web の世界で私達開発者はどのように向き合っていけばよいのかという内容でした。

<iframe loading="lazy" class="dropshadow speakerdeck-iframe" src="https://speakerdeck.com/player/e9838c769de2446aa1e3d5149d9ca46d" title="Web フロントエンドの変遷とこれから / Transition of Web Frontend" allowfullscreen="true" data-ratio="1.7777777777777777"></iframe>

<iframe loading="lazy" class="dropshadow speakerdeck-iframe" src="https://speakerdeck.com/player/7576965b3556486bbf486d5e62d5a798" title="Web フロントエンドに期待される適応と新陳代謝" allowfullscreen="true" data-ratio="1.7777777777777777"></iframe>

私が Web 業界に飛び込んだのがサイバーエージェントに転職した 2012 年で、「Web フロントエンドは技術の流行り廃りが早い」と言われ始めたのもこの頃からだろうか。これ以前の Web 業界の動向は知る良しもなかったけど、個人的には移り変わりの早さを相対的に感じることはなくて、それが当たり前だったというかなんというか。

分析するには幾つかポイントがあって、まずひとつクライアントサイドのアーキテクチャとか開発環境だとか、そもそも関心が向いてなかったところに急速発展したのが技術者にとってギャップだったせいでこういう声が出てきたのではと思っている。あとは、Web がプラットフォームとしてまだ成熟しておらず、実装にバグが多かったりブラウザ間の互換性が低かった。今でこそ溝は埋まりつつあるけど、特に当時はモバイルデバイスの普及真っ盛りで Android と iOS の動作の違い（いわばバグ対応）をクライアントサイドで期待通りに動作するように作る苦労もあった。

とは言え、 **技術の成熟と標準化の浸透を待たざるを得ない Web のプラットフォームとしての特性** を踏まえれば、これからも少なからずデバイス（OS）間のギャップはあるわけで、Web に関わる開発者として泣き言は言ってられないわけで。動向の変化に対応する地力を身に付けるのはもちろんのこと、Web がこれから更により良くなるために自分ができることも模索していかなければと、改めて考えるきっかけになった。

## デブサミと目黒雅叙園

会社の会議等でも何度か足を運んだ記憶がある目黒雅叙園だが、デブサミにスピーカーとして招かれるのは初めてで、案内された控え室が大奥（個人のイメージ）のようなやたら格式高いスペースだった。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">デブサミのスピーカー控え室凄い👀 <a href="https://t.co/K7Ho5krjq5">pic.twitter.com/K7Ho5krjq5</a></p>&mdash; 煎茶 🍵 (@1000ch) <a href="https://twitter.com/1000ch/status/832039152996610048">2017年2月16日</a></blockquote>

会場の大きさ、スタッフの多さ、綿密なメール連絡・前日リハーサル・フォローアップ等等、大きいイベントは違うなと思った（小並）。スピーカー控室から講演会場へ向かう道も、専用の裏ルートから通されて、なかなか貴重な体験だった。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BQj4zXkhsWH/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">冷し味噌卵麺で〆</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">Shogo Sensuiさん(@1000ch)がシェアした投稿 - <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2017-02-16T05:28:19+00:00">2017  2月 15 9:28午後 PST</time></p></div></blockquote>

目黒駅に程近い中本で〆のラーメンを食べた。いつもの渋谷店にはない、冷やし味噌卵麺を注文してみた。

## 観測したブログ記事など

- [Developers Summit 2017 - wolfmasa's blog](http://wolfmasa.hatenadiary.com/entry/2017/02/17/233106)
- [#devsumi 2017参加レポ (Developers Summit 2017) 初日 (2/16)](http://ryoichi0102.hatenablog.com/entry/2017/02/16/215936)
- [デブサミ2017に行ってきた（１日目）](http://naoqoo23.hatenablog.com/entry/2017/02/17/002920)
- [Developers Summit 2017 1日目 #devsumi](https://www.naney.org/diki/d/2017-02-16-Developers-Summit-2017.html)
- [【デブサミ2017】1日目E会場 #devsumiE](https://togetter.com/li/1081737)
