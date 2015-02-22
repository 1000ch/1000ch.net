---
layout: post
title: jQueryにおけるbindとdelegateの違い
date: 2012-12-12
---

# jQueryにおけるbindとdelegateの違い

軽めのjQuery Advent Calendarに参加させて頂きました。この記事は、軽めのjQuery Advent Calendar 12日目の記事です。
割と曖昧な認識のまま進みそうなイベント周りについて書きます。
軽めということですが、あまり簡潔にまとまっていないかも。

- [軽めのjQuery Advent Calendar 2012](http://www.adventar.org/calendars/29)

## jQueryのbindとdelegate

現在は2つともonによってカバーされているイベントバインドですが、敢えてこの2つのメソッドで説明します。  
どちらも要素に対するイベントの定義に使用するメソッドですが、性質が異なります。
bindは直接的なイベントの紐付けをする（いわゆる`addEventListener`とか`attachEvent`で）、
delegateは親要素に対しイベントを定義しバブリングにより発火を期待する間接的なイベントの紐付けです。  
用いるケースを挙げて比較します。  

## $().bind(type, callback)

イベントハンドラはその要素に対して紐付き、保持されます。

```html
<body>
    <button id="buttonId">ボタン</button>
</body>
```

```js
// id=buttonIdの要素押下時のイベントを定義する
$("#buttonId").bind("click", function() {
    console.log("#buttonIdがクリックされました。");
});
```

## $().delegate(selector, type, callback)

イベントの種類とセレクタとイベントハンドラを渡します。
上の例と同様に`#buttonId`の要素押下時のイベントを定義するには、`#buttonId`の要素を内包する要素に対してdelegateを実行します。

```html
<body>
    <button id="buttonId">ボタン</button>
</body>
```

```js
// bodyがid=buttonIdの要素を内包するため、bodyからdelegateを実行する
// documentなどでもOK
$("body").delegate("#buttonId", "click", function() {
    console.log("#buttonIdがクリックされました。");
});
```

コールバック関数（第三引数）はbodyに対してバインドされます。
よって、bodyの押下時に毎回コールされます。  

bodyが内包する要素からclickイベントが伝播（バブリング）します。
このケースのdelegateのイメージとしては、body要素のclick時に、内包する要素にid=buttonIdがあるかを検索して、  
バブリング中にそれと一致する要素が場合にイベントハンドラが実行される。といった流れです。  

## 両者の特徴と$().on()

bindは直接バインドのため、コールバックの実行が即座に行われます。
delegateは都度CSS Selectorによる検索で要素の一致を探すため、追加された要素に対してもCSS Selectorが一致すれば適用されます。

`$().on()`は引数の与え方によってどのようにハンドルするかを振り分けており、用意されているbindとdelegateメソッドはonメソッドへのショートカットです。
尚、jQueryはonを推奨しており、Zeptoもこの流れを踏襲しているようです。

## 非推奨なやつら

- `$().bind()`
- `$().unbind()`
- `$().live()`
- `$().die()`
- `$().delegate()`
- `$().undelegate()`

bindとdelegateの方がわかりやすいのに。と思ったりします。
`$().live()`はdocumentからのdelegateになります。ちなみにどれも内部でonを通ります。  

## まとめ

便利なdelegateですが、複雑なセレクタだと実行までほんの僅かにタイムラグがあったり、undelegateの為にクロージャを内部的に保持しますので、bindよりはメモリを食います。
それでも、Ajaxで動的に生成するコンテンツに対してイベントを定義する場合は、都度bindするよりdelegateを1つ貼っておく方がブラウザに優しいでしょう。

以上、[軽めのjQuery Advent Calendar 2012](http://www.adventar.org/calendars/29)でした！

[@hiloki](http://twitter.com/hiloki)さんバトンタッチ。