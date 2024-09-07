---
title: Font Awesome の利用をやめた
date: 2016-12-26
---

このブログでは [Font Awesome](http://fontawesome.io/) を使っていたが、それをやめた。[Webフォントのロードをやめた](/posts/2016/web-font.html)ことに引き続いて、これで Web フォントの利用から脱却したことになる。

## Font Awesome を使っていた箇所の修正

今回修正したのは次のリスト。利用頻度は多くないが、ロードしているリソースサイズが大きく見合わないと感じ、今回に至る。

- ページングの `<i class="fa fa-arrow-left"></i>` を 👈　に変更
- ページングの `<i class="fa fa-arrow-right"></i>` を 👉　に変更
- RSS の `<i class="fa fa-rss"></i>` を SVG ファイルに変更
- ♡ の `<i class="fa fa-heart"></i>` を SVG ファイルに変更
- Facebook の `<i class="fa fa-facebook-square"></i>` を SVG ファイルに変更
- Twitter の `<i class="fa fa-twitter-square"></i>` を SVG ファイルに変更
- Google Plus の `<i class="fa fa-google-plus-square"></i>` を SVG ファイルに変更

それぞれの SVG ファイルは [Sketch](https://www.sketchapp.com/) でトレースしたベクターデータから出力し、[svg/svgo](https://github.com/svg/svgo) で最適化してある。また、素直(?)に `<img>` で参照したかったので、`fill` 属性にそれぞれのプラットフォームで定められた色を指定したものを用意した。

絵文字にできそうなものは絵文字にしてある。RSS も 📡 などで代替できそうだが、バランスを取ってアイコンのままにしてある。

<img src="/img/rss.svg" alt="RSS" width="20%"><img src="/img/heart.svg" alt="Heart" width="20%"><img src="/img/facebook.svg" alt="Facebook" width="20%"><img src="/img/twitter.svg" alt="Twitter" width="20%"><img src="/img/google-plus.svg" alt="Google Plus" width="20%">

## ロードしなくなったリソース

代替を用意した後は [cdnjs.com](https://cdnjs.com) から Font Awesome をロードしていた `<link rel="stylesheet">` を外すだけだった。CSS ファイルは `6.3KB` なのでまだしも、CSS からロードされるフォントファイルが `75.7KB` と重かった。代替リソースは合計で `3.6KB` なので、それなりに軽減されている。

- [`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css`](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css): 6.3KB
- [`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2`](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/fonts/fontawesome-webfont.woff2): 75.7KB
