---
title: Web Components に対する問題提起
date: 2015-03-23
---

Web Components については暫く理想を語ってきたが、正直そうは上手くいかないと思っている。

- [Web Componentsが変えるWeb開発の未来](https://html5experts.jp/1000ch/8906/)
- [Web Componentsを構成する4つの仕様 ー Web Components基礎編](https://html5experts.jp/1000ch/11142/)
- [Web Componentsでカルーセルギャラリーを作る ー Web Components実践編](https://html5experts.jp/1000ch/11626/)
- [Web Componentsを簡単・便利にするライブラリ「Polymer」を使いこなそう](https://html5experts.jp/1000ch/11905/)
- [基本的な要素・機能を提供するCore ElementsとMaterial Designを実現するPaper Elements](https://html5experts.jp/1000ch/12477/)

Web Components を司る4つの仕様、Custom Elements・Template・Shadow DOM・HTML Importsは、確かに HTML/CSS の弱点を解決してくれる。

しかし、作られた・配布されているコンポーネントを使う側はともかく、Web Components の仕様を抑えてコンポーネントを構築していくのは、HTMLにCSSでスタイリングをしていく従来のやり方に比べていささか敷居が高い。CSS の言語としての簡易さと引き換えに顕在化してきた弱点にフォーカスされているから Shadow DOM のありがたみがあるものの、Web Components によるコンポーネント実装と配布が一般化するかについては、いささか疑問符が残る。

CSS の設計に悩まなくなる点は前進しつつ、コンポーネント化する単位といったような Web Components を使っていく難しさに問題は引き続きあるだろう。

## Web Componentsの技術そのものへの敷居

CSS の問題を取り払いたいだけのはずなのに、Shadow DOM を使う敷居が高い。もっと言えば宣言的 (Declarative) から命令的 (Imperative) への思想の移行はプログラマでない人にとっては辛いかもしれない。

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

この辺りの問題を Polymer は取り除こうとしている。以下は Polymer v0.8 系ではなく v0.5 現行の宣言スタイルだが、JavaScript による Shadow DOM の生成プロセスは Polymer のお作法とともに自動化されている。

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

この Polymer のお作法は[Polymerについての所感](/posts/2015/polymer-is/)では Polymer のアレなところっていう話をしたが、Web Components の敷居を下げること必要だろう。

この敷居を取り払うために、仕様が開発者に優しくなるか、または Polymer のようなライブラリで解決するのかは、Extensible Web に沿って API を低水準に維持することが望ましい。一方で Sizzle で実装されたクエリ表現からの `.querySelectorAll()` の例もあるので、どちらが正解かは何とも言い難い。両者の溝が時間とともに自然と埋まる可能性はある。

てんこ盛りで重いと思っていた Polymer の機能も、v0.8 以降はプラガブル（カスタムビルド？）になるようだし、着々と準備が進んでいる。jQuery のように爆発的に流行るかどうかはわからないけど、流れがよく似ていると思う。

## コンポーネント化の難しさ

どこからどこまでをコンポーネントとするかはノウハウが少なく、時と場合によるける部分が大きいので、実装者の経験則によって良し悪しが左右される。

- ひとつのコンポーネントに何の要素を含めるのか
- どういった機能を公開属性とするのか
- 抽象化の難しさ・汎用性の持たせ方
- ドキュメントを今まで以上に整備しないとダメだろうな
- 他のコンポーネントとの一貫性

Shadow DOM に入れたスタイルが外に漏れないのは素晴らしいが、それでも完璧ではないことは覚えておく必要がある。Shadow DOM は `/deep/` やら `::shadow` などの専用のセレクタを通じてスタイリング可能になっている。外部からのスタイリングを完璧に遮断してしまってはコンポーネントの汎用性を著しく失うことになるからだ。

一時的な修正にそういったセレクタの追加を繰り返していれば今までの二の舞だ。結局のところはリファクタリングの繰り返しと、コンポーネント開発者と利用者のリテラシーに委ねられることに変わりない。
