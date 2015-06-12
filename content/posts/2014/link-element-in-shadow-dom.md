---
layout: post
title: Shadow DOMにおけるlink要素の扱い
date: 2014-08-27
---

# Shadow DOMにおけるlink要素の扱い

[@nakajmg](http://twitter.com/nakajmg) 氏が[Web Components使うときにハマったポイント3つ](http://nakajmg.github.io/blog/2014-08-25/start-webcomponents.html)という記事を書いてて気になったので調べてたメモ。

Web Componentsを構成する中でコンポーネントのスタイリングをするのは往々にしてあるけど、それに`<link>`は使えないので`<style>`にCSSを書くしかなさ気な話。

## Shadow DOMに`<link>`が入っているNGケース

```html
<template id="tmpl">
  <link rel="stylesheet" href="x-element.css">
  <div>This is x-element!</div>
</template>
<script>
  window.XElement = (function () {
    var doc = document.currentScript.ownerDocument;
    var XElementPrototype = Object.create(HTMLElement.prototype);

    XElementPrototype.createdCallback = function () {
      this.shadowRoot = this.createShadowRoot();
      var template = doc.querySelector('#tmpl');
      var clone = document.importNode(template.content, true);
      this.shadowRoot.appendChild(clone);
    };

    return document.registerElement('x-element', {
      prototype: XElementPrototype
    });
  })();
</script>
```

CSSをカプセル化したい気持ちを考えれば誰しもがこういうことをするんじゃないかと思ったりするけど、結論から言うと、ShadowDOMに埋め込まれる`<link>`は無効だそう。何故かは http://www.w3.org/TR/shadow-dom/#inert-html-elements を眺めてみると良い。以下引用。

>7.1 Inert HTML Elements
>A subset of HTML elements must behave as inert, or not part of the document tree. This is consistent how the HTML elements would behave in a document fragment. These elements are:
>
>- base
>- link
>
>All other HTML elements in the shadow trees must behave as if they were part of the document tree.

ざっくり、以下の様なことを言っていると思われ。

>一部のHTML要素は、Shadow DOMに埋め込まれるドキュメントツリーの一部であってはならず、不活性である必要がある。これは一貫してdocument fragmentとしての振る舞うようにするため。それらは（その一部のHTML要素とは）
>
>- base
>- link
>
>である。Shadowツリーに属する他の全てのHTML要素はドキュメントツリーの一部であるかのように振る舞わなくてはならない。

`<link>`にしても`<base>`にしても、パースされたあと`document`下にぶら下がるので、コンテキストとの兼ね合いもあるかもしれない。

## Shadow DOMに`<style>`を使ったOKケース

`<link>`でダメなら`<style>`でやるしかないね。

```html
<template id="tmpl">
  <style>
    // x-elementのCSS
  </style>
  <div>This is x-element!</div>
</template>
<script>
  window.XElement = (function () {
    var doc = document.currentScript.ownerDocument;
    var XElementPrototype = Object.create(HTMLElement.prototype);

    XElementPrototype.createdCallback = function () {
      this.shadowRoot = this.createShadowRoot();
      var template = doc.querySelector('#tmpl');
      var clone = document.importNode(template.content, true);
      this.shadowRoot.appendChild(clone);
    };

    return document.registerElement('x-element', {
      prototype: XElementPrototype
    });
  })();
</script>
```

## Polymerだとどうなるのか

[Polymer と Web Components の違い9選（もとい Polymer の便利機能）](http://havelog.ayumusato.com/develop/webcomponents/e603-diff_of_polymer_and_webcomponents.html) で言及されている通り、実はPolymerだと、`<template>`にいれた`<link>`は、あたかも機能しているかのように振る舞う。これもPolymerだけ使ってるとハマってしまうかもしれないポイントのひとつかもしれない。

```html
<polymer-element name="x-element">
  <template>
    <link rel="stylesheet" href="x-element.css">
    <div>This is x-element!</div>
  </template>
  <script>
  Polymer({
    ready: function (){
      console.log('x-element is ready!');
    }
  });
  </script>
</polymer-element>
```

Polymerは、これをパースしている最中に

```js
var styles = {
  // returns true if resources are loading
  loadStyles: function(callback) {
    var template = this.fetchTemplate();
    var content = template && this.templateContent();
    if (content) {
      this.convertSheetsToStyles(content);
      var styles = this.findLoadableStyles(content);
      if (styles.length) {
        var templateUrl = template.ownerDocument.baseURI;
        return Polymer.styleResolver.loadStyles(styles, templateUrl, callback);
      }
    }
    if (callback) {
      callback();
    }
  },
  // ...
  findLoadableStyles: function(root) {
    var loadables = [];
    if (root) {
      var s$ = root.querySelectorAll(STYLE_SELECTOR);
      for (var i=0, l=s$.length, s; (i<l) && (s=s$[i]); i++) {
        if (s.textContent.match(STYLE_LOADABLE_MATCH)) {
          loadables.push(s);
        }
      }
    }
    return loadables;
  },
  // ...
```

な感じで

1. `<link rel="stylesheet">`を列挙
2. `<linl rel="stylesheet" href="style.css">`を`<style>@import "style.css";</style>に置き換える
3. `style.css`がダウンロード可能ならば、`Polymer.styleResolver.loadStyles()`でCSSの文字列
4. 取得したCSSの文字列を`<style>`の中身とする

ってことをしている。`Polymer.styleResolver.loadStyles()`は深いけど、掘っていくと`XMLHttpRequest`でリクエストしている。あと、もうひとつの`<base>`についてはアレコレしている様子がなかった気がする。どうこうしたい場合は`document.baseURI`で、ということなんだろうか。

## 実際のPolymerの例

http://hiloki.github.io/su-shi/ あたりを見てみよう。こちらはPolymerで作られている寿司のコンポーネント。

[su-shi.html](https://github.com/hiloki/su-shi/blob/master/su-shi.html#l19)を見るとわかるように、`<template>`の中で`<link>`でCSSファイルを参照しているが、DevToolsでShadowDOMを見てみると、ご覧のようにCSSが`<style>`に展開されている。

![](/img/posts/2014/link-rel-stylesheet-in-shadow-dom/su-shi.png)
