---
layout: post
title: jQueryにおけるbindとdelegateの違い
date: 2012-12-12
---

# jQueryにおけるbindとdelegateの違い

この記事は、[軽めのjQuery Advent Calendar](http://www.adventar.org/calendars/29) 12日目の記事です。

曖昧な認識のまま進みがちなjQueryのイベントハンドリングについて書きます。軽めということですが、あまり簡潔にまとまっていないかも。

## jQueryのbindとdelegate

現在は2つともonによってカバーされているイベントバインドだが、敢えてこの2つのメソッドで説明。どちらも要素に対するイベントの定義に使用するメソッドだが性質が異なる。

bindは要素に対して直接イベントハンドラの登録をし（いわゆる`addEventListener`とか`attachEvent`で）、delegateは親要素に対しイベントハンドラを登録しバブリングで呼び出し元の要素を判定する間接的な方法。

## `$element.bind(type, callback)`

イベントハンドラはその要素に対して紐付き、保持される。

```html
<body>
  <button id="foo">ボタン</button>
</body>
```

```js
// 要素押下時のイベントを定義する
$("#foo").bind("click", function() {
  console.log("#fooがクリックされました");
});
```

## `$element.delegate(selector, type, callback)`

引数には、イベントの種類とセレクタとイベントハンドラを渡す。上の例と同様に`#foo`の要素押下時のイベントを定義するには、`#foo`の要素を内包する要素に対してdelegateを定義する。

```html
<body>
  <button id="foo">ボタン</button>
</body>
```

```js
// bodyがid=fooの要素を内包するため、bodyからdelegateを実行する。documentなどでもOK
$("body").delegate("#foo", "click", function() {
  console.log("#fooがクリックされました");
});
```

イベントハンドラはbodyに対してバインドされる。つまりbodyの押下時に毎回コールされることになり、発生するイベント（この場合は`click`）が、bodyが内包する要素から伝播（バブリング）する。

jQueryのdelegateは、呼び出し元の要素をチェック（ここでは`#foo`が呼び出しものかどうか）し、一致する場合にイベントハンドラが実行される、といった流れになる。

## 両者の特徴と`$element.on()`

bindは要素に直接登録するため、イベントハンドラの実行が即座に行われる。それに対し、delegateは指定されたCSSセレクタとの一致検索を都度行うため、追加された要素に対してもCSSセレクタが一致すれば適用される。

`$element.on()`は引数のによってどのようにハンドルするかを振り分けており、引数の与え方によってbindあるいはdelegateとして振る舞う。尚、jQueryはonを推奨しており、Zeptoもこの流れを踏襲している。

## 非推奨なやつら

- `$element.bind()`
- `$element.unbind()`
- `$element.live()`
- `$element.die()`
- `$element.delegate()`
- `$element.undelegate()`

bindとdelegateの方がわかりやすいのに、と思ったりもする。`$element.live()`はdocumentからのdelegateになる。ちなみにどれも内部でonを通る。

## まとめ

`delegate`するためにセレクタのマッチング処理と`undelegate`のためにクロージャを内部的に保持するので、処理は増加する。それでも、Ajaxなどで動的に生成するコンテンツに対してイベントを定義する場合は、都度bindするよりdelegateを1つ貼っておく方がブラウザに優しいと言える。

[@hiloki](http://twitter.com/hiloki)さんバトンタッチ。
