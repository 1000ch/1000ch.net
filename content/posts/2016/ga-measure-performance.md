---
title: Google AnalyticsとTiming APIでブログのサードパーティスクリプトのパフォーマンス計測
date: 2016-12-24
image: /img/posts/2016/ga-measure-performance/custom-speed.png
---

[Performance Calendar &raquo; Prefer DEFER Over ASYNC](http://calendar.perfplanet.com/2016/prefer-defer-over-async/) を見たのがきっかけ。

このブログでもサードパーティのスクリプトをいくつかロードしているが、言及されているように `<script async>` と `<script defer>` でパフォーマンスを比較計測してみる。

## Google Analyticsで計測

まずはパフォーマンスを計測しなければということで、[カスタム速度 | ウェブ向けアナリティクス（analytics.js）](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings?hl=ja)を参考に以下のスクリプトをブログに仕込んだ。今回は Navigation Timing API の `navigationStart` と`domInteractive` の差分を集計する。

```javascript
window.addEventListener('load', () => {
  if (window.performance) {
    ga('send', {
      hitType: 'timing',
      timingCategory: 'Navigation',
      timingVar: 'domInteractive',
      timingValue: performance.timing.domInteractive - performance.timing.navigationStart
    });
  }
});
```

GA にはページトラッキングやイベントトラッキングの他に、パフォーマンスの任意のメトリクスを集計するインターフェースがある。まじまじと触ることは少ないが、眺めるほど多機能で面白い。値は、 **行動 > サイト速度 > カスタム速度** 以下に集計される。

![](/img/posts/2016/ga-measure-performance/custom-speed.png)

## サードパーティスクリプトをdeferで読み込む

Prefer DEFER Over ASYNC で言われているのは、 `<script async>` も `<script defer>` も HTML のパースはブロックしないが、 `<script async>` はスクリプトの実行が非同期でされるため UI スレッドを抑止する、つまり描画は遅れるという話。雑に言えば左右するのは `DOMContentLoaded` のタイミングということになりそうだが、 `DOMContentLoaded` を早めたいかどうかは Web ページの作りに大きく依存するので例によって「時と場合に依る」ということ。このブログに関して言えば、静的な HTML を配信しているのみでロードしているサードパーティスクリプトがページに作用する割合も大きくないので `<script defer>` が効果的に思える。

なので、

```html
<script async src="//apis.google.com/js/plusone.js"></script>
<script async src="//platform.twitter.com/widgets.js"></script>
<script async src="//platform.instagram.com/en_US/embeds.js"></script>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
```

のように `async` でロードしているサードパーティのスクリプトを次のように修正。

```html
<script defer src="//apis.google.com/js/plusone.js"></script>
<script defer src="//platform.twitter.com/widgets.js"></script>
<script defer src="//platform.instagram.com/en_US/embeds.js"></script>
<script defer src="//assets.codepen.io/assets/embed/ei.js"></script>
```

## 計測結果の前後比

`<script async>` でロードしていたサードパーティのスクリプトも `</body>` の直上にあったので、 `<script defer>` にしたところで大差はないことが予想できたが、案の定大差はなかった（複雑なことをしていないので元からそこそこ速いのと、ページビュー数が多くないのでサンプリングとしても微妙）。

- `<script async>`: 1.68s ~ 2.65s
- `<script defer>`: 1.65s ~ 1.75s

![計測結果の前後比](/img/posts/2016/ga-measure-performance/result.png)

 `DOMContentLoaded` 発火までに関わるリソース（読み込む CSS ファイル数や画像ファイル）が多ければ多いほど、そしてサードパーティスクリプトが
多く処理が重いほど `<script defer>` の効能が期待できる。
