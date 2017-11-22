---
layout: post
title: 要素のサイズ変化を監視するResizeObserver
date: 2017-11-21
---

# 要素のサイズ変化を監視するResizeObserver

便利な Observer シリーズのひとつ [ResizeObserver](https://wicg.github.io/ResizeObserver/) が Chrome 64 に ship された。Chrome 55 からフラグ付きで入っていたが、フラグなしで動作するようになっている。

## 旧来のやり方と問題

これまでの方法としては `resize` という DOM イベントを監視することで、要素の変更を検知できた。しかしサイズや位置といった変更の多寡を知るには、`Element#getBoundingClientRect()` や `window.getComputerStyle(Element)` といった関数を呼び出す必要があり、これによって強制的にレイアウト処理が実行される。そのため、対象要素の量や処理の重さによってはレンダリングパフォーマンスを大きく損なってしまう。

```javascript
document.querySelector('div').addEventListener('resize', e => {
  // レイアウト処理が強制的に実行される
  console.log(e.target.getBoundingClientRect());
});
```

ResizeObserver ではこうした問題を解決し、レイアウト処理を呼び出さずに変更を取得できるようになっている。

## ResizeObserverの使い方

ResizeObserverの簡単な説明から。

### インスタンスの生成と要素の監視

[MutationObserver](https://dom.spec.whatwg.org/#interface-mutationobserver) や [PerformanceObserver](https://www.w3.org/TR/performance-timeline-2/#the-performanceobserver-interface) と同様に `new` してインスタンスを生成後、`ResizeObserver#observe()` メソッドに監視対象の要素を引数として渡して実行する。

```javascript
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) { ... }
});

const target = document.querySelector('div');

// target の監視を開始する
resizeObserver.observe(target);

// target の監視を終了する
resizeObserver.unobserve(target);
```

### ResizeObserverEntry

ResizeObserver に渡すコールバック関数の引数には、検知した変更の構造体である [`ResizeObserverEntry`](https://wicg.github.io/ResizeObserver/#resize-observer-entry-interface) が配列で渡される。

`ResizeObserverEntry` には `target` プロパティと `contentRect` プロパティが生えており、それぞれ対象要素と矩形を参照できる。

```javascript
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    // 変更を検知した要素
    console.log(entry.target);

    // 検知した変更の矩形
    const rect = entry.contentRect;
    console.log(rect.top, rect.left);
    console.log(rect.width, rect.height);
  }
});
```

### 複数要素の監視

ResizeObserver インスタンスが監視できる要素はひとつに限らず、複数要素を監視できる。内部的には [observationtargets](https://wicg.github.io/ResizeObserver/#dom-resizeobserver-observationtargets) というスロットがあり、`observe()` メソッドが呼び出される度に監視する要素を追加している。

```javascript
// 複数の要素を監視する
resizeObserver.observe(document.querySelector('#foo'));
resizeObserver.observe(document.querySelector('#bar'));
resizeObserver.observe(document.querySelector('#baz'));
```

### 監視要素のクリア

監視を終了するには、[`ResizeObserver#disconnect()`](https://wicg.github.io/ResizeObserver/#dom-resizeobserver-disconnect) メソッドを呼び出す。内部的には observationtargets に追加されている要素をすべてクリアするという処理になっている。

```javascript
// 監視を終了する
resizeObserver.disconnect();
```
