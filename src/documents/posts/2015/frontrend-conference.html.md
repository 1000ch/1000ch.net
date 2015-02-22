---
layout: post
title: Frontrend ConferenceでService Workerの発表した
date: 2014-02-22
---

# Frontrend ConferenceでService Workerの発表した

[Frontrend Conference](http://frontrend.github.io/conference/)を以って、Frontrendが活動を休止。過去最大規模に因んで、カンファレンスという名前で開催されました。そんな中、スピーカーとして混じって参加してきました。

## Introduction to Service Worker

<script async class="speakerdeck-embed" data-id="ac1d3d87628c466a89c99e8983329fe1" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

日本語・英語を問わずService Workerに関する資料が少なくて調べるの結構大変だったけど、なんとか漕ぎ着けた。発表も45分に収まらなくて、後半の一部を端折ってしまったけど、伝えるべきは前半の「オフラインWeb」だと思っていたので、あまり後悔していない。

<blockquote class="twitter-tweet" lang="ja"><p>端折ったデモです。えーじさんのPolymerデモをService Workerでオフライン化してます <a href="https://t.co/aT8FwWwAMV">https://t.co/aT8FwWwAMV</a> <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/569040310812045312">2015, 2月 21</a></blockquote>

デモ。Service Workerで派手さ、僕には難しかった。

技術的には別途文字に起こします。

### `navigator.onLine`

<blockquote class="twitter-tweet" lang="ja"><p>navigator.onLine、Android2、PhantomJSで注意 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; 過激派 (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/569030072587280385">2015, 2月 21</a></blockquote>

これ、ブラウザサポートはおおよそ大丈夫ってセッション中に言ってしまったんですけど、PhantomJSは完全に失念してました。agoさんありがとうございます。

### Service Workerコンテキストのデバッグ

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/1000ch">@1000ch</a> ServiceWorkerについて質問めっちゃあるんですがあとで質問しにいっていいですか！</p>&mdash; 理解者 (@mizchi) <a href="https://twitter.com/mizchi/status/569037897958969344">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>「ServiceWorker 内に console.log 仕込んだのに、ログが出ない」は初心者あるある。ワーカ内のログは ServiceWorker 専用のコンソールにしか出ない。 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; Jxck (@Jxck_) <a href="https://twitter.com/Jxck_/status/569161122588160000">2015, 2月 21</a></blockquote>

みずち氏、見かけたことは何回かあったけどちゃんと話したのは初めてだった。

1点目はService Worker中に仕込んだ`console.log`はどこに吐かれるのっていう質問。Chromeだと`chrome://serviceworker-internals`にデバッグページがあるので、登録されたService Workerは列挙される+InspectをクリックでDevTools立ち上がるます。

2点目はatom-shellで作っているアプリに仕込むService Workerの話で、やや凝った話だったので意見レベルでしか言えなかった。atom-shellで作っているアプリのコードを実際に見れたらもうちょっと喋れるかも。ちょっとすると強い人達がやってきてちょっとした議論になって、こういうのいいなーと思いました（小並感）。

## ほかのセッション

### Pragmatic Front-end Developer: From Artisan to Expert

ぐっとくる話だった。やや重い。

<blockquote class="twitter-tweet" lang="ja"><p>プログラミングにおける割れ窓理論 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/568988066490089472">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>プログレッシブエンハンスメントの本質は、エレベーターとエスカレーターの違いに例えられる、エスカレーターは動かなくなっても最悪階段として機能する <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; Frank Flynn (@frankflynnfoo) <a href="https://twitter.com/frankflynnfoo/status/568983883858845696">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>プロトタイプの重要性「実際に見えるもの、動くものに対しての意見は言いやすい」 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; FLAT サトウ ハルミ (@uzu) <a href="https://twitter.com/uzu/status/568982919932477441">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>Styleguideの為に労力を使わない。これ大切よね。 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; Sakuya Sugo (@Sakunyo) <a href="https://twitter.com/Sakunyo/status/568982101644570626">2015, 2月 21</a></blockquote>

気に入ったツイートだけ引用してしまったけど、そうそうこれこれ。見逃してしまった人は後ほど公開される(?)動画で見て欲しいす。

<blockquote class="twitter-tweet" lang="ja"><p><a href="http://t.co/vUVtHPNnx6">http://t.co/vUVtHPNnx6</a> <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; さだ (@sada_h) <a href="https://twitter.com/sada_h/status/568981211646791680">2015, 2月 21</a></blockquote>

ちなみに、OSSだと`.editorconfig`で喧嘩になる。

### 箱

<blockquote class="twitter-tweet" lang="ja"><p>つらい / <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a> <a href="https://twitter.com/hashtag/frontrendCSS?src=hash">#frontrendCSS</a> <a href="http://t.co/TVhIk4Sa1x">pic.twitter.com/TVhIk4Sa1x</a></p>&mdash; 酒井優 (@glatyou) <a href="https://twitter.com/glatyou/status/568994034452025344">2015, 2月 21</a></blockquote>

わろた。Extensive Web|CSSの話だったと思うんだけど、自分のセッションの準備に追われてて見れなかった…(´・ω・`)

### Evaluating CSS

<blockquote class="twitter-tweet" lang="ja"><p>StyleStats で、どの数値を見れば問題が見つかるかっていうのが知りたい。まあ、どんな問題を知りたいかにもよるんだろうけど。 <a href="https://twitter.com/hashtag/frontrendCSS?src=hash">#frontrendCSS</a> <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; Tsutomu Ogasawara (@ogaoga) <a href="https://twitter.com/ogaoga/status/569045963135782914">2015, 2月 21</a></blockquote>

これは起こっている問題と、指標（[Metrics](https://github.com/t32k/stylestats/#metrics)）の相関性が明言されていないからな…問題によりけるといいつつ、ニュアンスわかります。

### Styling Atom (Editor)

[@simurai](http://twitter.com/simurai)のセッション。札幌で会って以来の再開。AtomでPNGやMarkdownを表示してプレゼンするという新しいスタイルだった。テーマの作成やAtomの造り、Web Componentsを使ったコンポーネント化のテクニック周りに関する、丁寧で素晴らしいセッションだった。
最終セッションの疲れ+暗闇による眠気とセッションへの興味でせめぎ合い。そして[@cssradar](http://twitter.com/cssradar)の安定の逐次翻訳。翻訳して頭を使うと後頭部が痛いらしい。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a> Atomでpngだったりテキストだったりを表示してるｗ</p>&mdash; あほむ@消費豚 (@ahomu) <a href="https://twitter.com/ahomu/status/569052667567165441">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>Atomに部屋の明るさに応じてコントラストを調整するメディアクエリーが入るとな。 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; Yosuke FURUKAWA (@yosuke_furukawa) <a href="https://twitter.com/yosuke_furukawa/status/569063910554214401">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>まー、光度取れるハードがどの程度あるのかって話ではあるけど。限定的環境でAPIとしてつかいたい。 <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; ＆（あんどー） (@ampersand_xyz) <a href="https://twitter.com/ampersand_xyz/status/569064441267924992">2015, 2月 21</a></blockquote>
<blockquote class="twitter-tweet" lang="ja"><p>光度量って多分ユーザ確認なしで使えると思うけど、これ実際にはカメラにアクセスすることになるからなんかセキュリティ的に色入りできる気がする <a href="https://twitter.com/hashtag/frontrend?src=hash">#frontrend</a></p>&mdash; 過激派 (@kyo_ago) <a href="https://twitter.com/kyo_ago/status/569065506075881472">2015, 2月 21</a></blockquote>

光のメディアクエリ、[Responsive UI with Luminosity Level](http://www.girliemac.com/blog/2014/01/12/luminosity/)で記憶にはあったけど、CSSのメディアクエリにも入るのは見逃してた。

## おつかれさまでした

参加者の皆様、スピーカーの皆様、運営に際して協力していただいたスタッフ・スポンサーの皆様お疲れ様でした＆ありがとうございましたm(__)m