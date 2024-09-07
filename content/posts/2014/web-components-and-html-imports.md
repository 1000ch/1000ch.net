---
title: Web ComponentsをHTML Importsでロードする必要性
date: 2014-08-30
---

慣例的に`<link rel='import' href='x-element.html'>`な感じでロードされているけど、前提として、 **HTMLImportsである必要はない** 。何故ならば、Web Componentsを構成する4つの仕様はそれぞれ独立しているからである。だから、インポートを使わなくても`document.registerElement()`でカスタム要素の定義は出来るし、HTMLのひな形を使いたい場合に`<template>`タグを使っても良い。

## HTMLを部品として含む場合

HTMLやCSSを部品として含む場合は、`<template>`タグや、ShadowDOMを駆使しながらパーツを構成していくので、HTMLファイルに書かざるを得ない。もちろん、JavaScriptだけで書けないこともないんだけど、本質ではない。

先日画像をスクロール同期的にロードする要素、 [1000ch/lazyload-image](https://github.com/1000ch/lazyload-image) を作ったけど、こちらはHTMLファイルではなく、単一のJSファイル。GitHubが作っている [github/time-elements](https://github.com/github/time-elements) なんかも、[time-elements.js](https://github.com/github/time-elements/blob/master/time-elements.js)だけで構成されているけど、こういう場合は`<link rel='import' href='x-element.html'>`ではなく、`<script src='x-element.js'></script>`で事が足りる。

## 他のWeb Componentsに依存している場合

`<x-element>`が`<y-element>`に依存している場合は以下のように、`x-element.html`内で`y-element.html`をインポートする。

```html
<link rel='import' href='y-element'>
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

## そのコンポーネントからの相対パスを得たい

これは @hokaccha 氏が詳しく書いているが、Web Componentsとして配布するときに、画像等のサブリソースを含む場合は一工夫が必要になる。

- [HTML Importsで読み込まれたドキュメントからの相対パスを得る - Webtech Walker ](http://webtech-walker.com/archive/2014/07/html-import-relative-path.html)

例えば`<x-element>`というカスタムエレメントが以下のように、`img`フォルダの配下に`foo.png`と`bar.png`を含んだ構成とする。

- `x-element`
  - `x-element.html`
  - `img`
    - `foo.png`
    - `bar.png`


`bower`なんかでインストールされれば`x-element`というフォルダごとダウンロードされて、いざインポートするときには`<link rel='import' href='bower_components/x-element/x-element.html'>`のようになる。

このとき、`foo.png`と`bar.png`を含むフォルダは`bower_components/x-element/img`というパスになるけど、`x-element.html`側で素直に`img/foo.png`と参照していると、インポート元のドキュメントルートからそのパスを辿ることになるので、上手く参照出来ない。

だから`document.baseURI`を使って相対パスを得たいということになるが、この場合に、HTMLファイルでないと`document.currentScript.ownerDocument.baseURI`と、`x-element.html`からみたベースのURLを辿れない。`URL`オブジェクトと組み合わせるとアレコレするときに幾分スマートかも。

```html
<script>
  var doc = document.currentScript.ownerDocument;
  var imgRoot = new URL('img', doc.baseURI);

  console.log(imgRoot.href);
  // => bower_components/x-element/img
</script>
```

ネタに走った感あるけど、 https://github.com/1000ch/x-zangief は上記のようなパス解決をしている。
