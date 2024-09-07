---
title: Web Components 周辺の仕様とか 2017年秋
date: 2017-09-12
---

二週間後の素振り入ってます、連投ですが悪しからず。Web Components v0 から Web Components v1 へのアップデートに関しては、去年の [DevFest Tokyo 2016](https://gdg-tokyo.connpass.com/event/38927/) で発表した [Web Components 2016 & Polymer v2](https://1000ch.github.io/slide/webcomponents-2016/) にまとめてあるが、それを改めて見直している。

## HTML Templates

HTML Templates は HTML ドキュメントに埋め込まれてもコピーして使うまで非活性であるような、本来的な雛形の機能を実現する `<template>` 要素の仕様である。 `<script type="text/template">...</script>` やら `<div style="display: none">...</div>` やらの、ハックを使わずに済む。

```html
<template>
  <!-- 非活性なので bar.jpg へのリクエストが発生しない -->
  <div class="foo">
    <img src="bar.jpg">
  </div>
</template>

<script>
  const template = document.querySelector('template');
  const clone = template.content.cloneNode(true);

  document.body.appendChild(clone);
</script>
```

Web Components に分類される他の仕様に比べて、与えられている役割が単純なので、仕様が大きく変更されることは想像しにくい。IE11 を除いて[ブラウザの対応状況は良い](http://caniuse.com/#search=templates) し、ポリフィルである [webcomponents/template](https://github.com/webcomponents/template) のファイルサイズも小さい。

ポリフィルでは、 `HTMLTemplateElement` が未定義の場合に

1. `<head>` 要素に `<style>template{display:none;}</style>` を埋め込んで `<template>` 要素を非表示にする
2. `HTMLTemplateElement.prototype` を `HTMLElement.prototype` から作成する
3. `<template>` 要素で囲った子要素を `content` プロパティに埋め込む `decorate()` 関数を `HTMLTemplateElement` に生やす
4. `innerHTML` プロパティを `HTMLTemplateElement.prototype` に生やす
5. HTML に存在する `<template>` 要素を参照し、 `HTMLTemplateElement.decorate()` 関数を実行する `bootstrap()` 関数を `HTMLTemplateElement` に生やす
6. `DOMContentLoaded` イベントで `HTMLTemplateElement.decorate()` 関数を実行する
7. ネイティブの `document.createElement()` 関数、 `Node.prototype.cloneNode()` 関数、`document.importNode()` 関数をフックし、 `<template>` 要素が対象の場合に `HTMLTemplateElement.decorate()` を適用する

のようなことをしている。

## Shadow DOM v1

Shadow DOM （と、Custom Elements）については、v0 のことは忘れて、ブラウザの足並みが揃っている v1 のことだけ書く。

Shadow DOM は DOM に Shadow DOM と呼ばれるその DOM にだけ影響するスコープを作る仕様である。Shadow DOM の世界で発生することは、基本的に外へ漏れないし、外からも入り込まない。

Shadow DOM には外部からの各種アクセスを許容する `open` モードと、完全に遮断する `closed` モードがあるが、外部へ影響を及ぼすことはないので Web の弱点であったスコープ問題は根本的に解決される。

```html
<div>あいうえお</div>
<script>
  const div = document.querySelector('div');

  // div 要素に Shadow DOM を生成する
  div.attachShadow({
    mode: 'open'
  });

  // shadowRoot は読み取り専用のプロパティ
  div.shadowRoot.innerHTML = `
    <style>div { color: tomato; }</style>
    <div>
      <slot></slot>
    </div>
  `;
</script>
```

Shadow DOM が作成されると、そのホストとなる要素は Shadow DOM のコンテンツを表示するようになる。ここでは `<style>` 要素でスタイルを定義したり、ホストのコンテンツの挿入先となる `<slot>` 要素を `shadowRoot.innerHTML` に適用している。これによって Shadow DOM のホスト要素である `<div>` に囲まれていた「あいうえお」に `div { color: tomato; }` が適用されて表示される。

こうした振る舞いをポリフィルで実現するのは難しい。Shadow DOM v0 の頃は [webcomponents/webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) によって少し凝った実装がされていたが、実行コストが問題視されていた。これは Polymer v2 がリリースされるあたりで軽量な互換実装である [webcomponents/ShadyDOM](https://github.com/webcomponents/shadydom) が発表され、webcomponentsjs にバンドルするポリフィルも ShadyDOM に移行した。Shadow DOM の複雑な振る舞いを JavaScript + DOM でポリフィルするには無理があった。

[ブラウザのサポート状況](http://caniuse.com/#feat=shadowdomv1) を見てみると、Chrome と Safari は既に実装済、Firefox は開発中、Edge は Under Consideration となっている。[Edge も Roadmap Priority: High — We intend to begin development soon. となっている](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/)し、主要ブラウザの実装が揃う日も遠くないだろう。むしろ IE11 の昇天のほうが問題になってくる。

## Custom Elements v1

HTML の各要素の振る舞いは `<div>` 要素であれば [`HTMLDivElement`](https://developer.mozilla.org/ja/docs/Web/API/HTMLDivElement) 、 `<input>` 要素であれば [`HTMLInputElement`](https://developer.mozilla.org/ja/docs/Web/API/HTMLInputElement) といったように、それぞれ `HTML***Element` クラスで定義されている。これを拡張して開発者が自由にカスタム要素を定義できるようにするのが Custom Elements の機能である。

カスタム要素を使うのも HTML ドキュメント上なので、基本的な DOM の振る舞いを備えていて欲しい。だから、HTMLElement を継承したクラスで定義していく。作成したカスタム要素のクラスは、グローバルスコープにある `customElements` オブジェクトを通して登録する。

```javascript
class FooElement extends HTMLElement {
  static get observedAttributes() { ... }
  constructor() { ... }
  connectedCallback() { ... }
  disconnectedCallback() { ... }
  attributeChangedCallback() { ... }
  adoptedCallback() { ... }
}

customElements.define('foo-element', FooElement);
```

これを実行したあとは `<foo-element>` 要素が使えるようになる。登録前に `<foo-element>` 要素があっても、走査されて `FooElement` として再解決される。カスタム要素を定義する `customElements.define()` の実行タイミングによっては、 `<foo-element>` は `HTMLUnknownElement` として解決され続けてしまう。このあたりの話は HTML5 conference で話したい。

[ブラウザのサポート状況](http://caniuse.com/#feat=custom-elementsv1) を見てみると Shadow DOM v1 と同様に、Chrome と Safari は既に実装済、Firefox は開発中、Edge は Under Consideration となっている。Shadow DOM v1 の状況と合わせて、モバイル Web であれば使って良さそうだ。

customElements といえば雲行きが怪しくなった `is` 属性によるネイティブ要素の拡張機能だが、こちらも新たな議論が進んでいる。これも HTML5 conference まで取っておこう。　

## ES Modules

HTML Imports は ES Modules を見越して見送られていたが、ブラウザでの ES Modules が無事着地したことでお蔵入りになった。

- [Mozilla and Web Components: Update ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/)
- [The state of Web Components ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2015/06/the-state-of-web-components/)

それに合わせて Polymer も v3 から、ES Modules に沿った実装にしていくことを [Polymer Summit 2017](https://summit.polymer-project.org/) で発表している。

<iframe loading="lazy" src="https://www.youtube.com/embed/JH6jEcLxJEI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

先程の `FooElement` を `foo-element.js` で `export default` しているとすると、次のようなイメージになる。

```html
<script type="module">
  import FooElement from 'foo-element.js';

  customElements.define('foo-element', FooElement);
</script>
```

ES2015 の `import/export` の文法は既に真新しいものではないが、ブラウザでどう使うかであったり、Node.js を意識した Isomorphic なアーキテクチャで使うには少し注意が必要である。

- [ECMAScript modules in browsers - JakeArchibald.com](https://jakearchibald.com/2017/es-modules-in-browsers/)
- [ES Modules への橋渡しとしての nomodule 属性 | blog.jxck.io](https://blog.jxck.io/entries/2017-06-21/nomodule-attribute.html)
- [Node.jsのES Modulesサポートの現状確認と備え - teppeis blog](http://teppeis.hatenablog.com/entry/2017/08/es-modules-in-nodejs)
