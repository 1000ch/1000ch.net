---
title: DOMイベントのバブリングについて
date: 2013-05-07
---

最近はプロジェクトの異動やらなんやらで非常にドタバタしてまして、中々調べものとかに没頭出来ていない。そんな異動先のプロジェクトでイベントのバブリングについて再考したので覚書。

## イベントのバブリング?

イベントは発火元のノードから、親のノードにどんどん伝播していく。親のノードで発火元のイベントを拾う事が出来る。

+ [例 5: イベント伝播 (propagation)](https://developer.mozilla.org/ja/docs/DOM/DOM_Reference/Examples#Example_5.3A_Event_Propagation)

## バインドのターゲットと発火順

以下のような記述を見つけた。

```js
window.addEventListener('DOMContentLoaded', function() {
  console.log('document is ready.');
});
```

`window`にバインドされてる。バブリングすることを考えれば納得出来るが、意図はわからないまま…。

```js
window.addEventListener('load', function(e) {
  console.log('window:load');
});

window.addEventListener('DOMContentLoaded', function(e) {
  console.log('window:DOMContentLoaded');
});

document.addEventListener('DOMContentLoaded', function(e) {
  console.log('document:DOMContentLoaded');
});
```

実行すると、

```
document:DOMContentLoaded
window:DOMContentLoaded
window:load
```

という順で出力される。

## イベントの正体

次のイベントオブジェクトの中身を見てみる。

```js
var windowDomReady = null;
var documentDomReady = null;

window.addEventListener('load', function(e) {
  console.log(windowDomReady === documentDomReady);
});

window.addEventListener('DOMContentLoaded', function(e) {
  windowDomReady = e;
});

document.addEventListener('DOMContentLoaded', function(e) {
  documentDomReady = e;
});
```

実行してみると、

```
true
```

と。イベントのtypeも`DOMContentLoaded`だし、targetも`document`だった。ということは、

```js
window.addEventListener('DOMContentLoaded', function(e) {
  console.log('window:DOMContentLoaded');
});

document.addEventListener('DOMContentLoaded', function(e) {
  console.log('window:DOMContentLoaded');
  e.stopPropagation();
});
```

window:DOMContentLoadedは出力されなかった。このように、イベントの伝播は`e.stopPropagation()`で止める事ができる。
`cancelBubble`プロパティにtrueを与えても伝播を止める事ができるが、こちらは非標準なので、`stopPropagation()`を使うのが適切と言える。

- [event.stopPropagation](https://developer.mozilla.org/ja/docs/DOM/event.stopPropagation)
- [event.cancelBubble](https://developer.mozilla.org/ja/docs/DOM/event.cancelBubble)

## もちろん他のイベントでも

```js
window.addEventListener('DOMNodeInserted', function(e) {
  console.log('window:DOMNodeInserted');
});

document.addEventListener('DOMNodeInserted', function(e) {
  console.log('document:DOMNodeInserted');
});

window.addEventListener('load', function(e) {
  var element = document.createElement('div');
  element.innerHTML = 'ほげ';
  document.body.appendChild(element);
});
```

実行すると、

```
document:DOMNodeInserted
window:DOMNodeInserted
```

伝播している。[jQueryなどで実装されているイベントの`delegate`](/posts/2012/bind-and-delegate.html)は、このイベントの伝播する性質を利用して実装している。

## でも結局・・・

なんでwindowで拾っているのかはわからなかった…(´・ω・｀)
