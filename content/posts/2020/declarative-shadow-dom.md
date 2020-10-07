---
layout: post
title: template 要素の shadowroot 属性による宣言的な Shadow DOM
date: 2020-10-07
---

# template 要素の shadowroot 属性による宣言的な Shadow DOM

Shadow DOM は、代替要素を除いた任意の HTML 要素を DOM API で参照して `attachShadow({ ... })` メソッドを呼び出すことで命令的に生成できる。これを新たに `<template>` 要素の `shadowroot` 属性によって、対象の HTML 要素の Shadow DOM を宣言的に生やせるようになる仕様が提案されている。既に [Chrome 85 で試験的に実装されており](https://www.chromestatus.com/feature/5191745052606464)、フラグ付きで利用できるようになっている。この記事は自分用にまとめたメモ。

- [Add declarative Shadow DOM features by mfreed7 · Pull Request #892 · whatwg/dom](https://github.com/whatwg/dom/pull/892)
- [Add declarative Shadow DOM features by mfreed7 · Pull Request #5465 · whatwg/html](https://github.com/whatwg/html/pull/5465)
- [declarative-shadow-dom/README.md at master · mfreed7/declarative-shadow-dom](https://github.com/mfreed7/declarative-shadow-dom/blob/master/README.md)

Chrome 85 以降のオムニボックスに `chrome://flags/#enable-experimental-web-platform-features` を入力し、 **Experimental Web Platform Features flag** を Enabled にして Chrome を再起動すると、有効化される。

## template 要素の shadowroot 属性 でホスト要素に Shadow Root を生やす

代替要素を除いた任意の要素の子要素に `<template shadowroot>` を配置することで、Shadow Root を生やせる。 `shadowroot` 属性の値は `attachShadow()` メソッドの `mode` オプションと同様に `open` と `closed` を指定できる。

```html
<h2>outside host element without Shadow DOM</h2>
<div>
  <template shadowroot="open">
    <style>
      ::slotted(h2) { color: skyblue; }
    </style>
    <slot></slot>
  </template>
  <h2>inside host element with Shadow DOM</h2>
</div>
```

先の例では通常の HTML 要素に対して Shadow Root を生やしているが、もちろんカスタム要素に対しても生成できる。カスタム要素の場合は `customElements.define()` で登録したクラスのコンストラクタが実行されるので、既にホスト要素に `shadowRoot` プロパティが生えているかどうかをチェックしておく必要がある。

```html
<h2>outside host custom element without Shadow DOM</h2>
<host-element>
  <template shadowroot="open">
    <style>
      ::slotted(h2) { color: skyblue; }
    </style>
    <slot></slot>
  </template>
  <h2>inside host custom element with Shadow DOM</h2>
</host-element>

<script>
class HostElement extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: 'open'
      }).innerHTML = `<style>::slotted(h2) { color: skyblue; }</style>`;

      const slot = document.createElement('slot');
      this.shadowRoot.appendChild(slot);
    }
  }
}

customElements.define('host-element', HostElement);
</script>
```

既に `attachShadow()` メソッドで生やした `shadowRoot` プロパティがある状態で `attachShadow()` メソッドを実行すると `DOMException` が発生するが、`<template shadowroot>` で生やした `shadowRoot` プロパティの場合、**例外は発生しない** 。いずれにせよ、`shadowRoot` プロパティが `null` かどうかのチェックは必要になってくる。

その他の関連する API については [web.dev で公開されている Declarative Shadow DOM](https://web.dev/declarative-shadow-dom/) という記事を参照してもらうとして、宣言的に Shadow DOM を使えると何が良いのかを説明してみる。

## カスタム要素のライフサイクルの実行を待たずに評価される

Shadow DOM の生成をカスタム要素のライフサイクルで実行する、いわゆる Web Components 的なユースケースを想定する。これまでは、カスタム要素の振る舞いとなる JavaScript ファイルをカスタム要素として登録し、それが HTML から参照されて初めて Shadow DOM が生成されるのが普通だった。

通常、JavaScript の実行はメインスレッドをブロックするので、初期描画を抑止しないように `<script defer>` などを用いてロード処理上の後ろに持ってくることが多い。そのため、カスタム要素で提供しているスタイルは遅れて評価されてしまう。これは、ファーストビュー内の重要なコンテンツがカスタム要素であれば [Largest Contentful Paint](https://web.dev/lcp/) を遅延させるし、ページコンテンツとして利用されていれば [Cumulative Layout Shift](https://web.dev/cls/) の悪化を招く要因になる。これに対して `<template shadowroot>` で宣言的に宣言できると、HTML を評価する段階で Shadow DOM が生成されるのでパフォーマンス上の懸念が減る。

## Server-Side Rendering と Declarative Shadow DOM

Web Components を使う上で最も弊害があったのが、Server-Side Rendering との相性の悪さだろう。旧来の Web Components を表示するためには、カスタム要素のクラスとなる JavaScript のロードと、アップグレードによるライフサイクルの実行が必要になる。そのため、初期レスポンスに含まれる HTML だけではカスタム要素で表現される UI を描画できなかった。

ところが `<template shadowroot>` は HTML であり、HTML パーサーに評価されることで即座に Shadow DOM を生成するので、JavaScript の実行を待たずに表示される。つまり、Server-Side Rendering による恩恵を受けることができる。何をどこまでコンポーネントの責務とするかは実装に依るが、ここでは `<style>` や `<link rel="stylesheet">` によるスタイリングのみをカプセル化した Web Components をイメージしてみる。

```js
// fancy-button.js
export default class FancyButton extends HTMLElement {
  constructor() {
    super();

    if (!this.shadowRoot) {
      this.attachShadow({
        mode: 'open'
      }).innerHTML = `
        <style>
          button { color: skyblue; }
        </style>
        <button>
          <slot />
        </button>
      `;
    }
  }
}
```

```html
<!-- Server-Side Rendering で返す HTML -->
<fancy-button>
  <template shadowroot="open">
    <style>
      button { color: skyblue; }
    </style>
    <button>
      <slot />
    </button>
  </template>
  Click me!
</fancy-button>

<script type="module">
import FancyButton from './fancy-button.js';

customElements.define('fancy-button', FancyButton);
</script>
```

これで Server-Side Rendering でも初期表示のパフォーマンスを損なわずに Web Components を実現できることになる。しかし見ての通り、実現のために埋め込んだ `<template shadowroot>` の HTML は `fancy-button.js` で生成している Shadow Root の `.innerHTML` と同じ値を与えており、このためにビルドの仕組みを用意していくのが現実的になるだろう。`<template shadowroot="open">` の部分を別の HTML ファイルとして管理して、Server-Side Rendering と Web Components の両方から参照してビルドする…のは煩雑そうだが、既にある技術 (Webpack 等) でも実現できそうだし、専用のツールキットを [Polymer](https://www.polymer-project.org/) なり [Stencil](https://stenciljs.com/) なりが提供してくれるかもしれない。

この例では同じ値を用意しているが、もちろんそういう決まりがあるわけではない。JAMStack のように、骨組みとなる HTML はビルド時に生成して初期レスポンスとして返却し、動的なデータはクライアントサイド側から非同期で取得して描画するような実装であれば、宣言的に埋め込んでおく `<template shadowroot>` はカスタム要素のスタイルをそのままコピーせず、代替となる UI プレースホルダーを埋め込んでおくような形でも良いように思う。

SEO のためのデータを初期レスポンスに含めたいという目的であれば、旧来の Web Components 実装でも `<slot>` から参照される部分に必要なデータを埋め込んでおけば、理論上はカバーできたと思っている。が、パフォーマンス評価もページランクに含まれることが明言されているので、SEO としても、もちろん実際にアクセスするユーザーにとってのパフォーマンスも維持した形で Web Components を使っていけるようになる。…かもしれない。
