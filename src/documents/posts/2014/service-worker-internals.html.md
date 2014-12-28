---
layout: post
title: Service Workerに関する仕様とか機能とか
date: 2014-12-28
description: 今巷で流行りのService Workerについて調べ物してたので、まとめたメモ。
---

# Service Workerに関する仕様とか機能とか

今巷で流行りのService Workerについて調べ物してたので、まとめたメモ。

## Service Workerが解決してくれること

Service WorkerはHTML・CSS・JS・画像等などのリソースを、JavaScriptのAPIから命令的にコントロールすることを実現します。Webページのパフォーマンスに関する指標としてネットワークを介して得るリソースをキャッシュさせたりすることが効果的であることは今更改めて挙げませんが、Service Workerによって保持されたリソースは、オフライン状態でも返却することが可能という凄さを持っています。つまり、更新性の低いコンテンツであればオフラインでも閲覧させることが可能ということです。

更新性のあるコンテンツでも、回線が不安定な時はローカルに変更を保持して、サーバーに対してデータを遅延で同期するみたいなテクニックは既に存在しています。なので、こういったテクニックと組み合わせて、よりクライアントの画面がホワイトアウトすることを減らしていける。はず。

ブラウザキャッシュと言えば、[Nicholas Zakas](https://twitter.com/slicknet)氏による[The changing role of the browser cache](http://calendar.perfplanet.com/2014/the-changing-role-of-the-browser-cache/)という記事も興味深いので、興味ある方は一読を。

## Service WorkerのAPIと挙動

Service WorkerはWeb Workerなんかと同じように（Web Workerの一種と言ったほうが正確なのかも）、ブラウザの表示とは別スレッドで実行されます（だから、DOMのAPIとかを叩いたりすることは出来ません）。Service Workerでは、ページから行われるリソースの要求等に対し、独自の処理を挟むことが出来ます。 **プロキシを自前で用意出来る** と言ったほうがイメージしやすいでしょうか。

APIはPromise設計なので、もしかすると慣れていない人は辛いかもだけど。

しれっとCache APIなんて言いましたが、これも

あと、セキュアな通信を必須とするので、HTTPS環境かローカルホストである必要あり。

### もうちょっと実際の処理に近い説明

1. リクエストされたリソースをキャッシュさせたり、リクエストに割り込んでキャッシュされたリソース等を返却するような処理が記述されている`service-worker.js`を用意
2. `index.html`で`service-worker.js`をService Workerとして登録する（この時、`index.html`内の評価は行われていない）。
3. 



## 画像をService Workerでcachesにキャッシュさせるサンプル

### ブラウザの準備

[Google Chrome Canary](https://www.google.co.jp/chrome/browser/canary.html)の **Version 41.0.2259.0 canary (64-bit)** で動作確認済。フラグをonにしないと動かないので[`chrome://flags`](chrome://flags/)で、[**Enable experimental Web Platform features.**](chrome://flags/#enable-experimental-web-platform-features)と[**Enable support for ServiceWorker background sync event.**](chrome://flags/#enable-service-worker-sync)を有効にしておく。

URLに対し登録されたService Workerは、[`chrome://serviceworker-internals`](chrome://serviceworker-internals)でどういう状態かを確認することが出来る。 **Opens the DevTools window for ServiceWorker on start for debugging.** のチェックをオンにしておくと、Service Workerが登録された時にワーカースレッドに対するDevToolsが自動で開くのでデバッグ時はオンにしておくと良いです。

### `index.html`

5枚の画像を表示するだけの、とてもシンプルなHTML。

ブラウザキャッシュだと、URLにアクセスした時に真っ白になってしまうけど、今回はURLに対して、画像5枚とHTMLをService Workerで丸ごとキャッシュさせてインターネットに接続されていない状態でも表示させることを目指す。

```html
<html>
  <head>
    <meta charset="utf-8">
    <title>Service Worker Playground</title>
    <script>
      // navigator.serviceWorkerがある場合
      if (navigator.serviceWorker) {
        // service-worker.jsをService Workerとして登録する
        navigator.serviceWorker.register('service-worker.js', {
          scope: '.'
        }).then(function onFulfilled () {
          // service-worker.jsがひと通り評価され、インストールが成功した場合
          console.log('Service Worker was installed.');
        }, function onRejected () {
          // service-worker.jsのインストールが失敗した場合
          console.log('Service Worker was not installed.');
        });
      }
    </script>
  </head>
  <body>
    <div><img src="img/1.jpg"></div>
    <div><img src="img/2.jpg"></div>
    <div><img src="img/3.jpg"></div>
    <div><img src="img/4.jpg"></div>
    <div><img src="img/5.jpg"></div>
  </body>
</html>
```

### `service-worker.js`

先程の`index.html`からService Workerとして登録している`service-worker.js`の中身。

```js
var CACHE_KEY = 'service-worker-playground-v1';

self.addEventListener('install', function (e) {

  console.log('ServiceWorker.oninstall: ', e);

  e.waitUntil(
    caches.open(CACHE_KEY).then(function (cache) {
      cache.keys().then(function (keys) {
        return cache.addAll([
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg'
        ]);
      })
    })
  );
});

self.addEventListener('fetch', function (e) {

  console.log('ServiceWorker.onfetch: ', e);

  e.respondWith(
    caches.open(CACHE_KEY).then(function (cache) {
      return cache.match(e.request).then(function (response) {
        return response || fetch(e.request.clone()).then(function (response) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('ServiceWorker.onactivate: ', e);
});
```

## 参考リソース

Jake Archibald氏とAlex Russell氏によるGoogle I/O 2014でのセッション「Appy Times with ServiceWorker – Bridging the gap between the web and apps」をどうぞ。[@myakura](http://html5experts.jp/myakura/8365/)氏の解説記事もあります。

<iframe width="640" height="360" src="//www.youtube.com/embed/_yy0CDLnhMA" frameborder="0" allowfullscreen></iframe>

以下、Jake率高めなService Workerに関する記事とか。

- [Service Workers - W3C](http://www.w3.org/TR/service-workers/)
- [ServiceWorker API - MDN](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API)
- [Service Worker - first draft published - JakeArchibald.com](http://jakearchibald.com/2014/service-worker-first-draft/)
- [Using ServiceWorker in Chrome today - JakeArchibald.com](http://jakearchibald.com/2014/using-serviceworker-today/)
- [Launching ServiceWorker without breaking the web - JakeArchibald.com](http://jakearchibald.com/2014/launching-sw-without-breaking-the-web/)
- [The offline cookbook - JakeArchibald.com](http://jakearchibald.com/2014/offline-cookbook/)
- [Capability Reporting with Service Worker - igvita.com](https://www.igvita.com/2014/12/15/capability-reporting-with-service-worker/)
- [PSA: Service Workers are Coming - Infrequently Noted](https://infrequently.org/2014/12/psa-service-workers-are-coming/)
- [Introduction to Service Worker - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)