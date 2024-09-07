---
title: lit-html を調べたメモと考えたこと
date: 2017-09-13
---

[PolymerLabs/lit-html](https://github.com/PolymerLabs/lit-html) という Polymer チームによる実験的プロジェクトがある。JavaScript のテンプレートリテラルを通して、`<template>` 要素を使いつつテンプレートの機能を実現するライブラリで、API ドキュメントを見たのでそのメモ。

## Tagged template literals のおさらい

ES2015 の [Tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) が前提になるので、機能を振り返っておく。

```javascript
function tag(strings, ...values) {
  const str1 = strings[0];
  const str2 = strings[1];
  const val1 = values[0];

  return str1 + val1 + str2;
}

const foo = '括弧内の文字列';
console.log(tag`「${foo}」`);
```

Tagged template literals として使いたい関数を定義すると、関数の第一引数にはテンプレートリテラルで渡した文字列の配列が渡ってくる。第二引数以降は可変長で、テンプレートリテラル内で埋め込んだ変数が配列で渡され、それに分割された文字列が第一引数の配列になる。

## `html()` と `render()`

lit-html は大きく分けて [`html()`](https://github.com/PolymerLabs/lit-html/blob/master/api.md#function-html) と [`render()`](https://github.com/PolymerLabs/lit-html/blob/master/api.md#function-renderresult-templateresult-container-element-void) という2つのパートに分かれている。

`html()` は Tagged template literals として使う関数で、実行すると [`TemplateResult`](https://github.com/PolymerLabs/lit-html/blob/master/api.md#class-templateresult) というオブジェクトを返す。

```javascript
import { html } from './node_modules/lit-html/lit-html.js';

// 引数をテンプレートリテラルに渡す関数を定義する
const fn = value => html`<div>${value}</div>`;

// TemplateResult を返す
const result1 = html`<div>直接実行</div>`;
const result2 = fn('valueに入る文字列');
```

`render()` は、生成した関数が返す `TemplateResult` と挿入先の要素を渡して、HTML に反映する。

```javascript
import { html, render } from './node_modules/lit-html/lit-html.js';

render(html`<input type="text">`, document.body);
```

## HTML in JavaScript、Web Components

lit-html の良いところは、

- `TemplateResult` を通して vdom のような差分描画をしてくれる
- JavaScript から HTML のテンプレート機能（つまり `<template>` 要素）を使いやすい
- フットプリントが小さい

である。これは Polymer チームが開発していることからお察しのように、Custom Elements で使うことを意識していると推測している。

[Polymer Summit 2017](https://summit.polymer-project.org/) で発表された通り、Polymer では ES2015 の `class` によるカスタム要素の宣言と、ES Modules によるモジュール管理をしていくに伴い、モジュール化されたファイルが HTML でなはなくなる。つまり JavaScript 中で HTML の雛形を書いていくことになる（インポート先で `<template>` 要素を書いておいて使うこともできるが、モジュール内に寄せておきたいところ）。

lit-html を使ってカスタム要素を宣言すると次のように（抜粋）なる、はず。

```javascript
import { html, render } from './node_modules/lit-html/lit-html.js';

export default class MyName extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });

    render(this.template, this.shadowRoot);
  }

  get template() {
    return html`
      <style>span { color: tomato; }</style>
      <p>My name is <slot></slot>${this.suffix}</p>
    `;
  }

  get suffix() { return this.getAttribute('suffix'); }
  set suffix(value) { this.setAttribute('suffix', value); }
};
```
