---
layout: post
title: DOMContentLoaded イベントや load イベントを約束する Promise オブジェクト
date: 2020-08-04
---

# DOMContentLoaded イベントや load イベントを約束する Promise オブジェクト

[`document` の `DOMContentLoaded` イベント](https://developer.mozilla.org/ja/docs/Web/API/Document/DOMContentLoaded_event) や [`window` の `load` イベント](https://developer.mozilla.org/ja/docs/Web/API/Window/load_event) は Web 開発者にとってお馴染みのブラウザライフサイクルである。

結論から言うと、これらを簡単にハンドリングするための [html-ready](https://github.com/1000ch/html-ready) という小さなライブラリを作ったという話。実装自体はとても簡単で、ここで改めて説明するほどのものではない。ただ、同じことを色んな場面で何度も何度も書いている実感があり、巷にも期待する機能を持ったライブラリがなかったので作った。

## イベントのタイミングとハンドリング方法

簡単におさらいすると、それぞれ以下のような条件で発火する。

- `document` の `DOMContentLoaded` イベント: HTML ドキュメントのロードが完了したタイミング
- `window` の `load` イベント: ページが参照する CSS や画像などのサブリソースのロードが完了したタイミング

これらのタイミングを取得するためには、以下のように `addEventListener` を使ってコールバック内に任意の処理を記述すれば良い。

```javascript
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded is fired');
});

window.addEventListener('load', () => {
  console.log('load is fired');
});
```

ただし、これらはイベントが発火されたあとに実行されるとコールバックが実行されないので、より丁寧にハンドリングしようとすると [`document.readyState`](https://developer.mozilla.org/ja/docs/Web/API/Document/readyState) を参照して HTML ドキュメントの読み込み状態をチェックしなくてはならない。

```javascript
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  console.log('DOMContentLoaded is already fired');
} else {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded is fired');
  });
}

if (document.readyState === 'complete') {
  console.log('load is already fired');
} else {
  window.addEventListener('load', () => {
    console.log('load is fired');
  });
}
```

## html-ready を使って Promise で待機する方法

[html-ready](https://github.com/1000ch/html-ready) に `documentReady` オブジェクトと `windowReady` オブジェクトが含まれており、これらを使うと以下のように記述できる。

```javascript
import { documentReady, windowReady } from 'https://unpkg.com/html-ready';

documentReady.then(() => {
  console.log('DOMContentLoaded is fired');
});

windowReady.then(() => {
  console.log('load is fired');
});
```

これは unpkg を直接参照して [ESM でロードしている](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)例だが、もちろん `npm install html-ready` を実行してモジュールバンドラに依存関係を解決させることも可能である。
