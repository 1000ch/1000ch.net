---
layout: post
title: DOMイベントのバブリングについて
date: 2013-5-7
---

# DOMイベントのバブリングについて

ご無沙汰しています。  
最近はプロジェクトの異動やらなんやらで非常にドタバタしてまして、  
中々調べものとかに没頭出来ていません。  
そんな異動先のプロジェクトでイベントのバブリングについて再考したので覚書。  

## イベントのバブリング?

イベントは発火元のノードから、親のノードにどんどん伝播していきます。  
親のノードで発火元のイベントを拾う事が出来るのです。  

+ [例 5: イベント伝播 (propagation)](https://developer.mozilla.org/ja/docs/DOM/DOM_Reference/Examples#Example_5.3A_Event_Propagation)

## バインドのターゲットと発火順

以下のような記述を見つけました。  

```js
window.addEventListener("DOMContentLoaded", function() {
    console.log("document is ready.");
});
```

おお、`window`にバインドされてる。  
バブリングすることを考えれば納得出来るのですが、なんでだろう…。  

```js
window.addEventListener("load", function(e) {
    console.log("window:load");
});

window.addEventListener("DOMContentLoaded", function(e) {
    console.log("window:DOMContentLoaded");
});

document.addEventListener("DOMContentLoaded", function(e) {
    console.log("document:DOMContentLoaded");
});
```

実行してみると、  

```
document:DOMContentLoaded
window:DOMContentLoaded
window:load
```

という順で出力されています。  

## イベントの正体

次のイベントオブジェクトの中身を見てみる。  

```js
var windowDomReady = null;
var documentDomReady = null;

window.addEventListener("load", function(e) {
    console.log(windowDomReady === documentDomReady);
});

window.addEventListener("DOMContentLoaded", function(e) {
    windowDomReady = e;
});

document.addEventListener("DOMContentLoaded", function(e) {
    documentDomReady = e;
});
```

実行してみると、  

    true

と。イベントのtypeも`DOMContentLoaded`だし、
targetも`document`でした。ということは、  

```js
window.addEventListener("DOMContentLoaded", function(e) {
    console.log("window:DOMContentLoaded");
});

document.addEventListener("DOMContentLoaded", function(e) {
    console.log("window:DOMContentLoaded");
    e.stopPropagation();
});
```

window:DOMContentLoadedは出力されませんでした。  
イベントの伝播は`e.stopPropagation()`で止める事が出来ます。  
cancelBubbleっていうプロパティにtrueを与えても伝播を止める事が出来ますが、  
こちらは非標準ですので、`stopPropagation()`を使うのが適切と言えます。  

- [event.stopPropagation](https://developer.mozilla.org/ja/docs/DOM/event.stopPropagation)
- [event.cancelBubble](https://developer.mozilla.org/ja/docs/DOM/event.cancelBubble)

## もちろん他のイベントでも

```js
window.addEventListener("DOMNodeInserted", function(e) {
    console.log("window:DOMNodeInserted");
});

document.addEventListener("DOMNodeInserted", function(e) {
    console.log("document:DOMNodeInserted");
});

window.addEventListener("load", function(e) {
    var element = document.createElement("div");
    element.innerHTML = "ほげ";
    document.body.appendChild(element);
});
```

実行すると、  

    document:DOMNodeInserted
    window:DOMNodeInserted 

伝播していますね。  
jQueryなどで実装されているイベントのdelegateは、  
このイベントの伝播する性質を利用して実装されています。  

+ [jQueryにおけるbindとdelegateの違い](http://1000ch.net/2012/12/12/DifferenceBetweenBindAndDelegate/)

## でも結局・・・

なんでwindowで拾っているのかはわかりませんでした！  