---
layout: post
title: jQueryにおけるbindとdelegateの違い
date: 2012-12-12
---

# jQueryにおけるbindとdelegateの違い

この記事は、[軽めのjQuery Advent Calendar](http://www.adventar.org/calendars/29) 12日目の記事です。

割と曖昧な認識のまま進みそうなjQueryのイベントハンドリング周りについて書きます。軽めということですが、あまり簡潔にまとまっていないかも。

## jQueryのbindとdelegate

現在は2つともonによってカバーされているイベントバインドですが、敢えてこの2つのメソッドで説明。

どちらも要素に対するイベントの定義に使用するメソッドですが、性質が異なる。bindは直接的なイベントの紐付けをし（いわゆる`addEventListener`とか`attachEvent`で）、delegateは親要素に対しイベントを定義しバブリングにより発火を期待する間接的なイベントの紐付けになる。

## `$().bind(type, callback)`

イベントハンドラはその要素に対して紐付き、保持される。

```html
<body>
  <button id="buttonId">ボタン</button>
</body>
```

```js
// 要素押下時のイベントを定義する
$("#buttonId").bind("click", function() {
  console.log("#buttonIdがクリックされました。");
});
```

## `$().delegate(selector, type, callback)`

引数には、イベントの種類とセレクタとイベントハンドラを渡す。上の例と同様に`#buttonId`の要素押下時のイベントを定義するには、`#buttonId`の要素を内包する要素に対してdelegateを定義する。

```html
<body>
  <button id="buttonId">ボタン</button>
</body>
```

```js
// bodyがid=buttonIdの要素を内包するため、bodyからdelegateを実行する。documentなどでもOK
$("body").delegate("#buttonId", "click", function() {
  console.log("#buttonIdがクリックされました。");
});
```

コールバック関数（第三引数）はbodyに対してバインドされる。よって、bodyの押下時に毎回コールされることになる。

発生するイベント（この場合は`click`）が、bodyが内包する要素から伝播（バブリング）する。このケースのdelegateのイメージとしては、body要素のclick時に、内包する要素に`#buttonId`があるかを検索して、バブリング中にそれと一致する要素が場合にイベントハンドラが実行される、といった流れになる。

## 両者の特徴と`$().on()`

bindは直接バインドのため、コールバックの実行が即座に行われる。それに対し、delegateは都度CSSセレクタによる検索で要素の一致を探すため、追加された要素に対してもCSSセレクタが一致すれば適用される。

`$().on()`は引数の与え方によってどのようにハンドルするかを振り分けており、引数の与え方によってbindあるいはdelegateとして振る舞う。尚、jQueryはonを推奨しており、Zeptoもこの流れを踏襲している。

## 非推奨なやつら

- `$().bind()`
- `$().unbind()`
- `$().live()`
- `$().die()`
- `$().delegate()`
- `$().undelegate()`

bindとdelegateの方がわかりやすいのに、と思ったりもする。`$().live()`はdocumentからのdelegateになる。ちなみにどれも内部でonを通る。

## まとめ

便利なdelegateだけど、複雑なセレクタだと実行までほんの僅かにタイムラグがあったり（気にならないレベルだけど）、undelegateの為にクロージャを内部的に保持しますので、bindよりはメモリを消費する。それでも、Ajaxで動的に生成するコンテンツに対してイベントを定義する場合は、都度bindするよりdelegateを1つ貼っておく方がブラウザに優しいと言える。

[@hiloki](http://twitter.com/hiloki)さんバトンタッチ。