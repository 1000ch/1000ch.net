---
layout: post
title: ES2015のclass構文で書くWeb Components
date: 2016-02-28
---

# ES2015のclass構文で書くWeb Components

## これまでのボイラープレート

指定したオブジェクトのプロパティを持たせるべく、`Object.create()`でオブジェクトで生成し、そこにCustom Elementsのライフサイクル関数（`createdCallback`・`attachedCallback`・`detachedCallback`・`attributeChangedCallback`）を生やしたり、永続的なプロパティを定義したりしている。

```html
<template>
  ...
</template>
<script>
window.SampleComponent = (function () {
  'use strict';
  let ownerDocument = document.currentScript.ownerDocument;
  let SampleComponentPrototype = Object.create(HTMLElement.prototype);

  Object.defineProperty(SampleComponentPrototype, 'attr', {
    configurable: true,
    enumerable: true,
    get: function () {
      return this.getAttribute('attr');
    },
    set: function(value) {
      this.setAttribute('attr', value);
    }
  });

  SampleComponentPrototype.createdCallback = function () {
    let template = ownerDocument.querySelector('template');
    let clone = document.importNode(template.content, true);
    this.createShadowRoot();
    this.shadowRoot.appendChild(clone);
  };

  return document.registerElement('sample-component', {
    prototype: SampleComponentPrototype
  });
})();
</script>
```

## これからのボイラープレート

`class`構文を使ってよりわかりやすくしたのがこちら。プロトタイプになるオブジェクトにライフサイクル関数を都度生やすよりスマートに見える。

```html
<template>
  ...
</template>
<script>
window.SampleComponent = (function () {
  'use strict';
  let ownerDocument = document.currentScript.ownerDocument;

  class SampleComponent extends HTMLElement {
    get attr() {
      return this.getAttribute('attr');
    }
    set attr(value) {
      this.setAttribute('attr', value);
    }

    createdCallback() {
      let template = ownerDocument.querySelector('template');
      let clone = document.importNode(template.content, true);
      this.createShadowRoot();
      this.shadowRoot.appendChild(clone);
    }
  }

  return document.registerElement('sample-component', SampleComponent);
})();
</script>
```
