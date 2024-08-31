---
title: カスタム要素の状態を定義する CustomStateSet と参照する擬似クラス :state()
date: 2024-04-07
---

# カスタム要素の状態を定義する `CustomStateSet` と参照する擬似クラス `:state()`

[Safari 17.4 で CustomStateSet がサポートされた](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/)。[`CustomStateSet`](https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet) は Web Components のカスタム要素の状態を管理する API で、[Element Internals](https://developer.mozilla.org/docs/Web/API/ElementInternals) の `states` プロパティに含まれる。Element Internals はカスタム要素の振る舞いを HTML のフォームと連動させるための仕様だ。

CustomStateSet は [JavaScript のグローバルオブジェクトである `Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) と同様のインターフェースで、CustomStateSet に追加された文字列がカスタム要素の「状態」を定義する。

次のデモは HTML の [`minlength` 属性](https://developer.mozilla.org/docs/Web/HTML/Attributes/minlength)を `<input type="number">` で動的に設定し振る舞う Web Components である[^1]。`<input type="text">` や `<input type="number">` の値を変更すると、`validate()` メソッドで入力値のバリデーションを行い、その結果を Element Internals オブジェクトの [`setValidity()`](https://developer.mozilla.org/ja/docs/Web/API/ElementInternals/setValidity) メソッドで設定するとともに、`states` プロパティで状態を指定している。

[^1]: 参考: [Custom pseudo-classes for web components with the CustomStateSet API](https://fullystacked.net/custom-pseudo-classes/)

<iframe loading="lazy" scrolling="no" title="Custom pseudo-classes with CustomStateSet API of Element Internals" src="https://codepen.io/1000ch/embed/YzMazyj?default-tab=js%2Cresult" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/1000ch/pen/YzMazyj">
  Custom pseudo-classes with CustomStateSet API of Element Internals</a> by 1000ch (<a href="https://codepen.io/1000ch">@1000ch</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

ここでは、入力値の長さが `minlength` の値より小さい場合にエラーを報告しつつ、`error` という値を保存している。これによって、この HTMLElement は Element Internals の `states` プロパティによって状態が宣言されることになる。[`:state()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:state) 擬似クラスは、`CustomStateSet` オブジェクトで定義される状態を参照し、任意の識別子として参照できる。ここでは `error` という状態を `:state(error)` のように参照し、スタイリングしている。
