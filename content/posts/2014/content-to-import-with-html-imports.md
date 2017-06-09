---
layout: post
title: HTML Importsでインポート先に引き継がれる内容
date: 2014-10-07
---

# HTML Importsでインポート先に引き継がれる内容

> https://github.com/pazguille/github-card/blob/master/webcomponent/github-card.html
> これってなんで`doc.registerElement`になってるんだろう・・

っていう質問をされたので調べたメモ。内容的には[HTML ImportsするHTMLのコンテキストになるdocument](/posts/2014/html-imports-context.html)の続きにあたるかも。

## registerElementの実行者とカスタム要素の登録先

以下の様なカスタム要素を作成し、ロードする場合を考える。

### `sample-element.html`

```html
<script>
  var doc = document.currentScript.ownerDocument;
  doc.variable = 'this is the variable in sample-element.html';
  window.SampleElement = document.registerElement('sample-element', {
    prototype: Object.create(HTMLElement.prototype)
  });
</script>
```

### `loader.html`

```html
<html>
  <head>
    <meta charset="utf-8">
    <link rel="import" href="sample-element.html">
  </head>
  <body>
    <sample-element>Sample</sample-element>
  </body>
</html>
```

`document.currentScript.ownerDocument`を`doc`にキャッシュしないと、`sample-element.html`内に書いた要素を取得する時に困る話は前述のエントリでしてある。
`document.registerElement('sample-element', {});`しているのは、`sample-element.html`をインポートするHTMLの`document`になる。

でも`<github-card>`ではこの例で言うところの`sample-element.html`の`document`で`registerElement()`を実行している。
感覚的に言えばインポートする側の`document`で登録を実行するほうがしっくりくるんだけどそうでもないんだろうか。

## HTML Importsでカスタム要素の定義もインポートされる

感覚の話はさておき、`<github-card>`を見る限り`registerElement()`したカスタム要素は引き継がれるよう。
`sample-element.html`でわざとらしく宣言した`variable`という変数も見てみる。引き継がれないだろうけど、一応。

![](/img/posts/2014/content-to-import-with-html-imports/console.png)

当然のごとく`variable`は`doc`にしかない。が、`document.createElement('sample-element')`は両方とも成功している。

Firefox Nightly 35.0a1でも試してみた。

![](/img/posts/2014/content-to-import-with-html-imports/scratchpad.png)

インポートしている`sample-element.html`内で宣言している`doc`が`undefined`になってしまっているんだけど、`doc`に登録している`<sample-element>`はちゃんとインポート先の`document`に登録されていた。

## スタイルシートも引き継がれる

`sample-element.html`内で`sample-element.css`をロードし、その`sample-element.html`をインポートするとインポート先で`sample-element.css`で定義しているクラスは利用出来る。

![](/img/posts/2014/content-to-import-with-html-imports/stylesheet.png)

このとき、`sample-element.css`は`doc.styleSheets`にぶら下がっているけど、当然`document.styleSheets`には属さない。

## HTML ImportsとCustom Elementsの仕様を見てみる

- http://www.w3.org/TR/html-imports/#loading-imports

<img src='http://www.w3.org/TR/html-imports/import-link-list.png'>

HTML Importはこんな感じでlink関係をツリー上に持つらしい。で、このHTML Importsのツリーは

>The import tree order of a given custom element of an import tree is determined by tree order in an import tree that was flattened by replacing every import link with the content of its imported document.

インポートしてくるドキュメントでリプレイスされ、ドキュメント達は構造上並列になる（と書いてあるように見える）。

- http://w3c.github.io/webcomponents/spec/custom/#dfn-element-registration

>Element registration is a process of adding an element definition to a registry. One element definition can only be registered with one registry.

ひとつのドキュメントにつき、ひとつのレジストリが存在し、要素の定義はそのレジストリに定義される。

- http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries

色々読み漁ったけど、英語力足りなすぎて直接言及している場所がどこかわからなかった。かろうじて、

>When creating an import, use the registry of the master document.

先程のスタイルシートの挙動から察するに、 **HTML Importsのツリー上の子孫にいるカスタム要素のレジストリは親から参照出来る** ってことなんだと思うが、HTML Importが発生した時点でインポート先のドキュメントにカスタム要素の宣言がマージされることを意味しているような気も。

詳しい人おしえて下さい。
