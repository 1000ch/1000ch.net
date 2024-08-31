---
title: Inside Frontend vol2の感想
date: 2018-02-14
---

# Inside Frontend vol2の感想

第二回となる [Inside Frontend](https://inside-frontend.connpass.com/event/74625/) を2月11日に開催しました。今年は超速 AMA 枠で出演しつつ、スタッフ業をこなしました。

## 会場は日本経済新聞社

昨年は、紀尾井町にオフィスを構える Yahoo! Japan での開催でしたが、今年は大手町にある日本経済新聞社の[日経カンファレンスルーム](http://www.nikkei-hall.com/access/)にて。Frontend Meetup Tokyo の開催等で何回か行ったことがありましたが、大手町駅直結しています（C2b 出口）。

駅地下街も栄えていますが、日曜日ということで軒並み閉店という噂がタイムラインを賑わしていたので、急遽渋谷のモスバーガーにて朝食を取りました（超速 AMA プレゼントの超速本を取りにオフィスに行ってた）。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">公式でアナウンスしたほうがいいんじゃないかレベルの休業状況</p>&mdash; 🐕 Hiroki tani ☕ (@hiloki) <a href="https://twitter.com/hiloki/status/962498619231289344?ref_src=twsrc%5Etfw">2018年2月11日</a></blockquote>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">早めに来て珈琲でも飲もうと思ったらビルの飲食店が壊滅的に開いてない</p>&mdash; :masuP9: (@masuP9) <a href="https://twitter.com/masuP9/status/962490274822828032?ref_src=twsrc%5Etfw">2018年2月11日</a></blockquote>

## トラック

去年は3トラックでしたが、今年は2トラック構成でした。例年通り AMA の時間もありましたが、昨年の反省を活かして休憩を適度に挟んだタイムテーブルに。スタッフ労働しながら、合間時間を縫ってセッションを拝聴しました。

当日の様子は AMA と非公開セッションを除き、アーカイブされています。

- [Inside Frontend #2（Seminar A） | FRESH!（フレッシュ） - 生放送がログイン不要・高画質で見放題](https://freshlive.tv/tech-conference/189060)
- [Inside Frontend #2（Seminar B） | FRESH!（フレッシュ） - 生放送がログイン不要・高画質で見放題](https://freshlive.tv/tech-conference/189061)

### freeeのアクセシビリティ、いまとこれから

伊原さんが freee でやっているアクセシビリティの推進活動について。まさに **（いきなり全部ではなく）できる部分からやる** を体現している話でした。

組織におけるアクセシビリティの意義を、「正当性で殴るのか、はたまた KPI で納得させるのか」みたいな話がこのセッションではないどこかでありましたが、両面で訴えているのが印象的でした。「協力者が欲しい」話はｳﾝｳﾝという感じ…。

### Web Payments / Payment Request API について何でも訊いて下さい

最近立て続けに Web Payments に関わるプロジェクトをやっていたこともあり、理解が及んでいなかった部分を聞けてよかったです。Web Payments / Payment Request API そのものが決済機能を持つという誤解をしている人も多かったのではないでしょうか。

一言で説明が難しいものばかりですが、敢えて試みます。

- Web Payments: より安全で便利な決済の仕組みを目指す Open Web の仕様・エコシステムの総称
- Payment Request API: Web Payments の一部を司る、従来の入力フォームを置き換えるブラウザネイティブの UI
    - `basic-card` や各種 Payment App などの支払い方法を選択するインターフェースを含む
    - ユーザーが入力した決済に関する情報を収集するだけで、決済機能は持たない

詳細は[えーじさんのブログの Web Payments タグがついた記事](https://blog.agektmr.com/tags/#Web Payments)を読むと良いです。

### 攻めつづける FRESH! の Web ver.新春

いつも通り色々攻めてる FRESH! の話。 **攻め続ける** という言葉にピンと来ていない人がもしかしたらいるかもしれません。

FRESH! は [@stormcat24](https://twitter.com/stormcat24) を筆頭としたエンジニアが集まったチームですが、Fresh Initiative Laboratory（通称 FIL）という Google の20%ルールのような取り組みを実施しながら常に技術的な投資を行っています。で、横軸組織の私も加わりつつ Web チームと一緒に品質改善や新技術の導入を継続的に行ってきました。

ざっと思いつくところだと

- Node.js v4 -> v6 -> v8 へのアップデート
- [RUM-SpeedIndex](https://github.com/WPO-Foundation/RUM-SpeedIndex) と Paint Timing API を使ったユーザー環境のパフォーマンス計測
- 静的アセットへの `Cache-Control: Immutable` の適用
- zopfli および brotli を使ったテキストファイルの圧縮
- HTTP/2 に最適化するために SVG スプライトの撤廃
- Service Worker を使ったアセットのキャッシュ
- Flux ライブラリの移植（flummox -> Redux）
- Intersection Observer を使った画像の遅延ロード、および[汎用コンポーネント化](https://github.com/openfresh/viewport-observer)
- [Service Worker を使ったプッシュ通知の受信](https://developers.cyberagent.co.jp/blog/archives/9662/)
- [Payment Request API を使ったコイン決済機能の導入](https://www.youtube.com/n7tHYpm4Dow)

などがあります。

セッション中、[GoogleChrome/puppeteer](https://github.com/GoogleChrome/puppeteer) をスーチーはパッパティーアと読んでいたが、それが気になって集中できなかった😇私はパペッターかと思っていたがそうでもないらしい。パペティア？

### Web パフォーマンスについて何でも訊いて下さい

私と [@ahomu](https://twitter.com/ahomu) で何でも答えます、な AMA でした。裏番組が「コンポーネント座談会」と「現場の ES201x とアーキテクチャの変遷と未来」だったのですが、人を吸い取られすぎずちゃんと盛況しました。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/BfFHtU9Avhx/" data-instgrm-version="8" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/BfFHtU9Avhx/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">やたら盛況していた #insidefrontend の超速 AMA の様子</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/1000ch/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Shogo Sensui</a>さん(@1000ch)がシェアした投稿 - <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2018-02-12T02:33:01+00:00"> 2月 11, 2018 at 6:33午後 PST</time></p></div></blockquote>

### micro-benchmarking is hard

非公開セッションですが、[資料が公開されています](https://docs.google.com/presentation/d/1MXlFGqFQFJByv8k6Ege0pt0GwJQqbjoh7GdIYia9UQg/edit#slide=id.p)。とても面白かったです。
