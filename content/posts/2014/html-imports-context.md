---
title: HTML ImportsするHTMLのコンテキストになるdocument
date: 2014-08-25
---

# HTML ImportsするHTMLのコンテキストになるdocument

Polymerに慣れたあとに、いざピュアなWeb Componentsでやろうとするとハマるかもしれないポイント。
`document.registerElement()`と`<template>`やらを使ってWeb Componentsを構成するときに、ライフサイクルコールバック中にそのテンプレートタグを当然参照すると思いますが、インポートをしているとコンテキストになる`document`がずれる話。

コードで見たほうが早いと思われるので早速例を。

## Polymerを使って`x-element`を作る場合

`x-element.html`の例。

```html:html
<link rel="import" href="lib/polymer/polymer.html">
<polymer-element name="x-element" attributes="foo bar">
  <template id="tmpl">
    <div>This is x-element!</div>
  </template>
  <script>
    Polymer('x-element', {
      ready: function () {
        // <template id="tmpl">を難なく取得出来る。
        console.log(this.$.tmpl);
      }
    });
  </script>
</polymer>
```

コメントに書いてあるけど、`x-element.html`内の要素を簡単に参照できる。なぜならばPolymerが上手いこと https://twitter.com/hokaccha/statuses/479063274881683457 みたいな仕組みを作っているからなんだけど、いざこれをピュアなWeb Componentsでやってみようとすると、どうなるか。

## Polymerを使わず`x-element`を作る場合

`x-element.html`の例。

```html
<template id="tmpl">
  <div>This is x-element!</div>
</template>
<script>
  var XElementPrototype = Object.create(HTMLElement.prototype);
  XElementPrototype.createdCallback = function () {
    console.log(document.querySelector('#tmpl'));
  };
  window.XElement = document.registerElement('x-element', {
    prototype: XElementPrototype
  });
</script>
```

実は、いざこれをインポートしようとするとエラーが起きる。具体的には`document.querySelector('#tmpl')`している箇所でエラーが起きるのだけど、なぜならばこのスクリプトを評価しているコンテキストが **`x-element.html`をインポートしているHTML** だからである。（逆に言えば、先程の`<link rel='import'>`ではなくHTMLにベタ書きすればコンテキストはそのままなのでOKではある。）

この`querySelector()`の実行ドキュメントは`x-element.html`でないと、`<template>`はパースされておらず参照不可能なので、ちょっとやり方を変える必要がある。それには`document.currentScript.ownerDocument`を使う。

- https://developer.mozilla.org/ja/docs/Web/API/document.currentScript
- https://developer.mozilla.org/ja/docs/Web/API/Node.ownerDocument

```html
<template id="tmpl">
  <div>This is x-element!</div>
</template>
<script>
  var thisDocument = document.currentScript.ownerDocument;
  var XElementPrototype = Object.create(HTMLElement.prototype);
  XElementPrototype.createdCallback = function () {
    // #tmplはthisDocument内にある
    console.log(thisDocument.querySelector('#tmpl'));
  };
  // registerElementするdocument はインポート元のdocumentのままでOK
  window.XElement = document.registerElement('x-element', {
    prototype: XElementPrototype
  });
</script>
```

実行コンテキストは各コンポーネントとして独立させているHTML（ここでいう`x-element.html`）にしつつ、変数とかはインポートした先でそのまま展開されるということが頭にあれば混乱しないと思う。つまり、ここで`document.currentScript.ownerDocument`のキャッシュで`var thisDocument`としているけど、他の`y-element.html`でもthisDocumentとかにキャッシュさせて両方共インポートしていると、変数が上書きれて上手くいかないかと思われる。
