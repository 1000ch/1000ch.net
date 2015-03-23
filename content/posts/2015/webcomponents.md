---
layout: post
title: Web Componentsに対する問題提起
date: 2015-03-23
---

# Web Componentsに対する問題提起

銀の弾丸のごとく現れたWeb Components。暫く理想を語ってきたけど、正直そうは上手くいかないと思っている。

- [Web Componentsが変えるWeb開発の未来](https://html5experts.jp/1000ch/8906/)
- [Web Componentsを構成する4つの仕様 ー Web Components基礎編](https://html5experts.jp/1000ch/11142/)
- [Web Componentsでカルーセルギャラリーを作る─Web Components実践編](https://html5experts.jp/1000ch/11626/)
- [Web Componentsを簡単・便利にするライブラリ「Polymer」を使いこなそう](https://html5experts.jp/1000ch/11905/)
- [基本的な要素・機能を提供するCore ElementsとMaterial Designを実現するPaper Elements](https://html5experts.jp/1000ch/12477/)

Web Componentsを司る4つの仕様、Custom Elements・Template・Shadow DOM・HTML Importsはとても練られている（現在進行形）と思うし、確かにCSSの弱点を解決してくれる。

しかし、作られたWeb Components使う側はともかく、これらの仕様を抑えてWeb Componentsを構築していくのは、プレーンなHTMLにCSSでスタイリングをしていくことに比べて圧倒的に敷居が高いように感じる。このCSSの言語としての簡易さと引き換えに顕在化してきた弱点にフォーカスされているからShadow DOMのありがたみがあるけど、一般化するかどうかを想像するといささか疑問符が残る。

CSSの設計に悩まなくなるだけで、コンポーネント化する単位といったようなWeb Componentsを使っていく難しさに問題がシフトするだけなんじゃないかって。

## Web Componentsの技術そのものへの敷居

CSSの問題を取り払いたいだけのはずなのに、Shadow DOMを使う敷居が高い（と、思う）。もっと言えばDeclarative（宣言的）からImperative（命令的）への思想の移行はプログラマでない人にとっては辛いところなんじゃないかと。

```html
<template>
  <style>
    input {}
    button {}
  </style>
  <input type="text">
  <button>Button</button>
</template>
<script>
  var ownerDocument = document.currentScript.ownerDocument;
  var SampleElementPrototype = Object.create(HTMLElement.prototype);

  SampleElementPrototype.createdCallback = function () {

    var template = ownerDocument.querySelector('template');
    var clone    = document.importNode(template.content, true);

    this.shadowRoot = this.createShadowRoot();
    this.shadowRoot.appendChild(clone);
  };

  document.registerElement('sample-element', {
    prototype: SampleElementPrototype
  });
</script>
```
この辺りの問題をPolymerは取り除こうとしている。以下はPolymer v0.8系ではなくv0.5現行の宣言スタイルだが、JavaScriptによるShadow DOMの生成プロセスはPolymerのお作法とともに自動化されている。

```html
<polymer-element name="sample-element" noscript>
  <template>
    <style>
      input {}
      button {}
    </style>
    <input type="text">
    <button>Button</button>
  </template>
</polymer-element>
```

このPolymerのお作法は[Polymerについての所感](/posts/2015/polymer-is.html)ではPolymerのアレなところっていう話をしたけど、Web Componentsの簡略化アプローチって大事だなと思った。

この敷居を取り払うために、仕様が開発者に優しくなるか、またはPolymerのようなライブラリで解決するのか、どちらが正しいのかはわからない。仕様が開発者に優しくなるのはExtensive Webの考えに反するようで気が進まない節もあるが、SizzleからのquerySelectorAllの例もあるので、両者の溝が時間とともに勝手に埋まるのかもしれない。

てんこ盛りで重いなーと思っていたPolymerの機能も、v0.8以降はプラガブルになるっぽいし着々と普及に向けて準備が進んでいる。jQueryほと爆発的に流行るかどうかはわからないけど、流れがよく似ていると思う。

## コンポーネント化の難しさ

どこからどこまでをコンポーネントとするかはノウハウがないし、そもそも時と場合によるける部分が大きいので、実装者の経験則によって良い悪いが決まってくる。

- ひとつのコンポーネントに何の要素を含めるのか
- どういった機能を公開属性とするのか
- 抽象化の難しさ・汎用性の持たせ方
- ドキュメントを今まで以上に整備しないとダメだろうな
- 他のコンポーネントとの一貫性

デザイナーとかにコンポーネント化のリテラシーを伝える良いきっかけではあると思う。

Shadow DOMに入れたスタイルが外に漏れないのはとても素晴らしいけど、外部から完璧に守られるわけではないのを忘れてはいけない。Shadow DOMのスタイリングは`/deep/`やら`::shadow`やらで可能になっている。外部からのスタイリングを完璧に遮断してしまってはコンポーネントの汎用性を著しく失うことになるからだ。

一時的な修正にそういったセレクタの追加を繰り返していれば今までの二の舞だ。結局のところはリファクタリングの繰り返しと、コンポーネント開発者と利用者のリテラシーに委ねられることに変わりない。