---
title: img要素とiframe要素のlazyload属性
date: 2018-08-18
---

# img要素とiframe要素のlazyload属性

`<img>` 要素と `<iframe>` 要素に `lazyload` 属性を定義する Pull Request が [`whatwg/html`](https://github.com/whatwg/html) に出されている。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">&lt;img&gt; 要素と &lt;iframe&gt; 要素の lazyload 属性 / &quot;Lazyload images and iframes by bengreenstein · Pull Request #3752 · whatwg/html&quot; <a href="https://t.co/3gJ9BVNRJc">https://t.co/3gJ9BVNRJc</a></p>&mdash; Shogo 🍵 (@1000ch) <a href="https://twitter.com/1000ch/status/1030832747114192898?ref_src=twsrc%5Etfw">2018年8月18日</a></blockquote>

## Web における画像の遅延ロード

Web でロードするリソースは増える一方で、中でも画像が占める割合は大きい。ロードした HTML ドキュメントに `<img>` 要素があれば、ブラウザは即座に画像をダウンロードしようとする。これらの画像が大きければ大きいほど、初期ロードにおけるネットワークのコストと占めるメモリの割合が大きくなる。こうした問題を背景に、画像を遅延ロードする様々なアプローチが取られてきた。

- [aFarkas/lazysizes](https://github.com/aFarkas/lazysizes): is a fast (jank-free), SEO-friendly and self-initializing lazyloader for images (including responsive images picture/srcset), iframes, scripts/widgets and much more
- [1000ch/lazyload-image](https://github.com/1000ch/lazyload-image): 
HTMLImageElement extension for lazy loading. (プリロードスキャナのせいでうまく動かない)

今回追加されようとしている `lazyload` 属性はこうした処理をブラウザネイティブで出来るようにする提案である。この属性は `<img>` 要素だけでなく `<iframe>` 要素でも有効化され、Above The Fold にないこれらの要素が参照するリソースをむやみにロードせずに済む。

## Blink LazyLoad

Chromium ではそれぞれ実装が進められており、`<iframe lazyload="on">` と `<img lazyload="on">` は Chrome 70 以降で、それぞれ以下のフラグをオンにすると機能を有効化できる（前者は Chrome 68 から、らしい）。

- `chrome://flags/#enable-lazy-frame-loading`: Enable lazy image loading
- `chrome://flags/#enable-lazy-image-loading`: Enable lazy frame loading

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">対象のリソースを、スクロールに応じて遅延ロードする Blink LazyLoad のデザイン / &quot;Blink LazyLoad Design Doc (public) - Google ドキュメント&quot; <a href="https://t.co/BpIfD8ZZjy">https://t.co/BpIfD8ZZjy</a></p>&mdash; Shogo 🍵 (@1000ch) <a href="https://twitter.com/1000ch/status/1030832768039538688?ref_src=twsrc%5Etfw">2018年8月18日</a></blockquote>

「その要素がビューポートに入ったらロードする」という機能は、Blink LazyLoad Design Doc というドキュメントで説明されており、さらに `<iframe>` 要素と `<img>` 要素それぞれのメカニズムは LazyFrames と LazyImages に細分化されている。内部デザインが気になる人はそちらを参照して欲しい。

- [Blink LazyFrames (public) - Google ドキュメント](https://docs.google.com/document/d/1ITh7UqhmfirprVtjEtpfhga5Qyfoh78UkRmW8r3CntM/edit#heading=h.c7mc4hh4xdhq)
- [Blink LazyImages (public) - Google ドキュメント](https://docs.google.com/document/d/1jF1eSOhqTEt0L1WBCccGwH9chxLd9d1Ez0zo11obj14/edit)
