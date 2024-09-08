---
title: Service Workerを使った消極的なキャッシュ
date: 2015-02-27
---

前略（Service Workerとはなんぞやという方は[こちら](/posts/2014/service-worker-internals/)）、キャッシュさせたいリソースをService Workerのインストール中に全てインストールさせている例が多いが、そのリソース全てをキャッシュさせることを保証しなくても良いケースが大半だと思う（オフライン化ではなくパフォーマンス向上という観点だと特に）。

## 優先度を付ける

以下、Service Worker内の処理（[The offline cookbook](http://jakearchibald.com/2014/offline-cookbook/)から拝借）。`event.waitUntil()`及びその中の処理はPromiseでチェーンされているので、Promiseを返却している`cache.addAll()`はキャッシュが確実に行われるが、チェーンさせていない`cache.addAll()`はキャッシュ作業が実施されるものの保証はされない。

```js
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mygame-core-v1').then(function(cache) {
      cache.addAll(
        // キャッシュ作業が実施されるけど保証されない
      );
      return cache.addAll(
        // 保証される（失敗しなければ）
      );
    })
  );
});
```

優先度の高いリソースだけ保証させるとか、リクエスト数とのバランスも含めて設定すると良さそう。仮に、キャッシュリソースを100個設定して、何らかの理由でダウンロードが1つでも失敗すると、そのService Workerにインストールは失敗したことになるので、`fetch`イベントで行うはずのプロキシも適用できなくなってしまう。

## 消極的にキャッシュする

もっと言えば`install`中にキャッシュをせずとも、`fetch`イベントでキャッシュをチェックし、見つからずに`fetch()`してきたリソースをキャッシュのように、消極的なキャッシュでも良い気がしている。

```js
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.open(CACHE_KEY).then(function (cache) {
      return cache.match(e.request).then(function (response) {
        if (response) {
          // e.requestに対するキャッシュが見つかったのでそれを返却
          return response;
        } else {
          // キャッシュが見つからなかったので取得
          return fetch(e.request.clone()).then(function (response) {
            // 取得したリソースをキャッシュに登録
            cache.put(e.request, response.clone());
            // 取得したリソースを返却
            return response;
          });
        }
      });
    })
  );
});
```

インストール時にキャッシュするのかどうかの差であって、発生するリクエスト数は同じだし、インストールの失敗リスクを避ける意味でも選択肢として有りかとは思う。このコード例だと発生しているリクエストを全てキャッシュしてしまっているので、`e.request`の内容を見て処理を分岐させる必要があるが。
