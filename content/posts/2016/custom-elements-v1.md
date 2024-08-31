---
title: Custom Elements v1
date: 2016-09-16
---

# Custom Elements v1

Custom Elements v1 が [Chrome の 54 からサポートされた](https://www.chromestatus.com/features/4696261944934400)。

これまでの `document.registerElement('custom-element')` によるカスタム要素の定義は v0 にあたり、 v1 は様々な見直しがなされた Custom Elements の新しいバージョンである。

## 定義方法の変更

### v0

`document` にぶら下がる `registerElement()` で要素を定義してきた。 `registerElement()` は定義されたカスタム要素のコンストラクタを返す。

```javascript
// カスタム要素の定義
const FooElement = document.registerElement('foo-element', {
  prototype: FooElementPrototype
});

// <button is="bar-button"></button>
const BarButton = document.registerElement('bar-button', {
  prototype: FooElementPrototype,
  extends: 'button'
});
```

### v1

`window` に `customElements` というオブジェクトが追加される。 `customElements` は [`CustomElementRegistory`](https://www.w3.org/TR/custom-elements/#dom-customelementregistry) という IDL である。

カスタム要素に関する操作はこの `customElements` を通して行われ、`customElements.define('element-name')` でカスタム要素を定義し、 `customElements.get('element-name')` でカスタム要素を参照し、 `customElements.whenDefined('element-name')` でカスタム要素が定義されるタイミングを取得する。 `whenDefined()` の返り値は `Promise` である。

```javascript
// カスタム要素の定義
customElements.define('foo-element', FooElement);

// <button is="bar-button"></button>
customElements.define('bar-button', BarButton, {
  extends: 'button'
});

// コンストラクタの参照
const FooElement = customElements.get('foo-element');

// 要素が定義されたタイミングの取得
customElements.whenDefined('baz-element')
  .then(() => console.log('baz-element is defined'));
```

`<button is="app-button"></button>` のように、ネイティブのHTML要素の拡張として機能させることも、従来のように可能。 `customElements.define()` の第三引数に `{ extends: 'button' }` のようなオプションを渡す。

カスタム要素の名前にはハイフンを含む必要があるとか、同じ名前のカスタム要素を再定義はできないといった基本的なルールは v0 から変化なし。

## ライフサイクルの変更

### v0

1. `createdCallback()`: 要素が生成された時
2. `attachedCallback()`: 要素がHTMLに追加された時
3. `detachedCallback()`: HTMLから要素が除かれた時
4. `attributeChangedCallback()`: 要素の属性が変更された時

### v1

1. `constructor()`: 要素が生成または更新された時
2. `connectedCallback()`: 要素がHTMLに追加された時
3. `disconnectedCallback()`: HTMLから要素が除かれた時
4. `attributeChangedCallback()`: 要素の属性が変更された時
5. `adoptedCallback()`: 要素が新たなドキュメントに移動した時

`adoptedCallback()` は **要素が新たなドキュメントに移動した時** とあるが、 `document.adoptNode()` などを通して元のツリーから削除し、実行者の `document` に追加されたタイミングで、つまり `ownerDocument` が変更されたタイミングと言い換えられる。

## class ベースの要素定義

v0 から [ES2015 の `class` で定義可能だった](/posts/2016/web-components-es2015-class.html)が、 先のように `constructor` がライフサイクルに含むこともあり、改めて次のようになる。

```javascript
customElements.define('header-tab', class HeaderTab extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  get selected() {
    return this.hasAttribute('selected');
  }

  set selected(value) {
    if (value) {
      this.setAttribute('selected', value);
    } else {
      this.removeAttribute('selected');
    }
  }

  constructor() {
    // HTMLElement の constructor を呼び出す
    super();
  }

  connectedCallback() { ... }

  disconnectedCallback() { ... }

  attributeChangedCallback(name, oldValue, newValue) { ... }

  adoptedCallback() { ... }
});
```

ライフサイクルの他に追加されているのがクラスプロパティとして定義している `observedAttributes` だが、ここで指定された属性のみが値変更の監視対象となる。そのため、ここで指定していない属性が変更されても `attributeChangedCallback()` には通知されない。

## lazyload-image に見るワークアラウンド

画像をスクロール同期でロードさせる [1000ch/lazyload-image](https://github.com/1000ch/lazyload-image) を Custom Elements v1 で再実装したのが [efine with customElements.define() #9](https://github.com/1000ch/lazyload-image/pull/9/files?diff=split) だが、想定通り動かない（ `HTMLImageElement` を `Image` に変えてもダメだった）。

## 参考

- [4.13 Custom elements - HTML Standard](https://html.spec.whatwg.org/multipage/scripting.html#custom-elements)
- [Custom elements v1: reusable web components | Web Fundamentals - Google Developers](https://developers.google.com/web/fundamentals/primers/customelements/)
