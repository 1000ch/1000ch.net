---
layout: post
title: position-stickyについて調べたメモ
date: 2015-03-31
---

# position-stickyについて調べたメモ

業務中に`position: sticky;`的な表現をする必要があって、JavaScriptで実装したり、その辺の仕様がどうなってるのか調べたメモ。スティッキーの挙動を言葉で説明するのは難しいので、デモを見てもらったほうが話が早い。

- [Fixed-sticky - filamentgroup](http://filamentgroup.github.io/fixed-sticky/demos/demo.html)
- [Demo: Position Sticky](http://philipwalton.github.io/polyfill/demos/position-sticky/)

広告をスクロールに応じて一定位置まで追従させたいシーン等によく利用されているイメージ。範囲が限定されている`position: fixed;`と言えばいいんだろうか。

## スペックなど

- [Sticky Positioning from Edward O'Connor on 2012-06-26 (www-style@w3.org from June 2012)](https://lists.w3.org/Archives/Public/www-style/2012Jun/0627.html)
- [6.2. Sticky positioning](http://dev.w3.org/csswg/css-position/#sticky-pos) - W3C Editor's Draft - CSS Positioned Layout Module
- [6.7. Choosing a positioning scheme: position property](http://dev.w3.org/csswg/css-position/#position-property) - W3C Editor's Draft - CSS Positioned Layout Module

仕様は生きているようだけど、Chromeで使えない。と、いうか、途中まで（35くらいまで？）はフラグ付きで使えたような気がしてたけど、使えなくなってた。各種ログを追ってみると実装が途中で削除された形跡がある。

- [Why doesn't position: sticky work in Chrome?](http://stackoverflow.com/questions/15646747/why-doesnt-position-sticky-work-in-chrome) - Stack Overflow
- [Issue 231752: Meta bug for position:sticky](https://code.google.com/p/chromium/issues/detail?id=231752) - Chromium Dashboard

> Remove position: sticky
>
> We would eventually like to implement position: sticky, but the current implementation isn't designed in a way that integrates well with the existing scrolling and compositing system. For example, position: sticky relies upon `updateLayerPositionsAfterDocumentScroll` to function correctly, but that function has no other purpose and can otherwise be removed. Similarly, `position: sticky` doesn't work at all with composited overflow scrolling, which is now the default mechanism for driving scrolling in the engine.
>
> Once we've got our scrolling and compositing house in order, we should return to position: sticky and implement the feature in a way that integrates well with the rest of the engine. For now, however, this CL removes our current implementation so we can focus on improving our implementation of the scrolling
features we've already shipped.

だそうです。待ちましょう。

### Feature Detectionの方法

スニペット的な。

```js
var div = document.createElement("div");
div.style.position = "sticky";
console.log(div.style.position.indexOf("sticky") !== -1);
```

## JavaScriptでエミュレーション

結論、2015年3月末の段階では[ブラウザ対応がイマイチ](http://caniuse.com/#search=sticky)なのでJavaScriptでアレコレする必要がある。以下は有名処の実装。いずれもjQueryのプラグイン。

- [filamentgroup/fixed-sticky](https://github.com/filamentgroup/fixed-sticky) filament groupによる実装
- [philipwalton/polyfill](https://github.com/philipwalton/polyfill/tree/master/demos/position-sticky) Philip Waltonによる実装

jQuery非依存が良かったので自分で書き直した。

- [1000ch/position-sticky](https://github.com/1000ch/position-sticky)

自分の実装も、はじめはPhilip Waltonの実装と同じように、stickyとしたい要素をクローン→クローンした要素に`position: fixed;`を適用→クローン元を`visiblity: hidden;`のような処理をしていたけど、対象要素に自動再生される`<video autoplay>`があったりすると、もろともクローンされてしまい動画が2つ再生されてしまうといったような不都合があったので、クローンしないように実装を直してある。

工夫を凝らしている最中だが、こういうレイアウトに関する記述はCSSにある方が精神衛生的に良いし、メディアクエリと連携させる場合の面倒臭さはどうしてもあるので、やはりブラウザネイティブの欲しいなと思ったのでした。普通だ。

そんだけ。