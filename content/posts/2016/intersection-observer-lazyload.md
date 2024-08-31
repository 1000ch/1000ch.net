---
title: IntersectionObserverを使ってlazyload-imageを書き直した
date: 2016-05-15
image: /img/posts/2016/intersection-observer-lazyload/demo.gif
---

# IntersectionObserverを使ってlazyload-imageを書き直した

画像をスクロール同期でロードする[`<lazyload-image>`](https://1000ch.github.io/lazyload-image/)というWeb Componentsの内部処理を、[`IntersectionObserver`](https://github.com/WICG/IntersectionObserver)で書き直した。

## 可視領域に要素が入っているかどうかの判定

リライトする前までは、要素それぞれに`scroll`イベントのリスナを発行して、その中で画面内に要素が表れているかを判定していた。throttleしているとはいえ、それぞれのリスナで以下の処理を行っていたのでややパフォーマンスが気になっていた。

1. `getBoundingClientRect()`で要素の矩形を取得する
2. `document.documentElement.scrollTop`と`document.documentElement.clientHeight`で画面の上下端を取得する
3. 要素が可視領域と交差しているかどうかを判定し、交差していたらオリジナルの画像パスを`src`に指定する

気になるとは言え、こんな感じの判定処理をどこかしらでやらざるを得ないはずで、ネイティブで実装された`IntersectionObserver`もブラウザの内部処理は近いことをやっているのではとは思う。

## IntersectionObserverとは

`IntersectionObserver`は要素同士の交差状態の監視を可能にするAPI draftである。

```javascript
function intersectionChanged(changes) {
  for (let change of changes) {
    console.log(change.time);               // 変更が起こったタイムスタンプ
    console.log(change.rootBounds);         // ルートとなる領域
    console.log(change.boundingClientRect); // ターゲットの矩形
    console.log(change.intersectionRect);   // ルートとガーゲットの交差町域
    console.log(change.intersectionRatio);  // 交差領域がターゲットの矩形に占める割合
    console.log(change.target);             // ターゲットとなるウピsp
  }
}

let observer = new IntersectionObserver(intersectionChanged);
observer.observe(document.querySelector('#target'));
```

ルートは`IntersectionObserver`のコンストラクタの第二引数のオプションの`root`属性で指定可能で、省略するとブラウザのビューポートとの交差判定が行われる。これがあれば、`scroll`イベントを監視して要素同士の重なり具合を地道に判定して…ということがなくなる。やったね！

パフォーマンスに関して言えば、スクロールイベントの大量発行以上に`getBoundingClientRect()`の実行や`document.documentElement.scrollTop`と`document.documentElement.clientHeight`へのアクセスのほうが気になっていたので、これがなくなるのは大変良い。

## `<lazyload-image>`のブラウザ互換性

IntersectionObserverは現時点でChromeにしか実装されていない。リリースノート的にはChromeは51かららしいけど、手元のv50.0.2661.102には入ってるように見える。Operaはバージョン38からだそう。

`<lazyload-image>`ではこれに加えて、Web Components関連のAPIを使いまくっているので、動作保証範囲は広くない。が、それはスクロール同期で画像を読み込む機能に関しての話で、未実装ブラウザに関しては通常通り画像を読み込むようにフォールバックするので、それなりに動くのではと思われる。

実際の動作状態は[デモページ](https://1000ch.github.io/lazyload-image/)で確認できる。普通にスクロールすると画像のロードが高速なときにスクロール同期でロードしているかどうかがわかりにくいので、DevToolsを開いた状態で見てもらえるとわかりやすい。

![lazy load DEMO](/img/posts/2016/intersection-observer-lazyload/demo.gif)
