---
layout: post
title: メッセージングによるService Workerのコントロール
date: 2016-05-13
---

# メッセージングによるService Workerのコントロール

Service Workerでハンドルするリソースは、Service Workerのスクリプトに静的に記述しているケースが多い。Service Workerでやっているアレコレをメッセージングで動的にできないか試行錯誤したログ。

## よくある?キャッシュパターン

チュートリアル等でもよく見かける、Service Workerのインストール時に指定のリソースをキャッシュしているパターン。

```javascript
const CACHE_KEY = 'cache-key';
const CACHE_LIST = [
  'index.html',
  'app.js',
  'app.css'
];

self.addEventListener('install', e => {
  // CACHE_KEYをキーにとるCacheオブジェクトを開いて
  // CACHE_LISTをキャッシュするPromise
  let promise = caches.open(CACHE_KEY)
    .then(cache => cache.addAll(CACHE_LIST))
    .catch(error => console.log(error));

  e.waitUntil(promise);
});
```

小さい用途であれば、これで何ら問題はない気はする。開発規模が大きくなってくるとリソースの増加やらで人力でメンテナンスするのが辛くなってくる。

[GoogleChrome/sw-precache](https://github.com/GoogleChrome/sw-precache)はService Workerのスクリプトを書き出すツールで、キャッシュしたいパスのパターン指定などが可能。これでひとまず人力で管理していくリスクは低減できるが、細かい処理を書くには不向き。なので、Service Workerの処理内容を自由に書く余地を残しつつ、何をキャッシュするかを動的にできないかを模索したところ、手段の1つとしてメッセージングを使う方法が浮かんだ。

`fetch`イベントでリクエスト内容を見て動的に判断するなどはできるが、後述の **Service Workerが最長24時間更新されない問題** などもあるので、コントロール手段のひとつとして覚えておくのは良さ気。

## メッセージングでService Workerのコントロール

Service Workerは[JavaScript Worker](http://www.html5rocks.com/ja/tutorials/workers/basics/)のひとつ。なので、ブラウザスレッドとService Workerとでメッセージのやり取りが可能。Cache APIもPromiseな設計なので、`e.waitUntil()`もあることだし処理はPromiseで書くと良さ気。

```javascript
// browser.js
function sendMessage(message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = e => {
      if (e.data.error) {
        reject(e.data.error);
      } else {
        resolve(e.data);
      }
    };

    navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
  });
}

sendMessage('A message to Service Worker!');
```

```javascript
// service-worker.js
self.addEventListener('message', e => {
  let promise = Promise.resolve()
    .then(() => {
      console.log(e.data);
      // e.dataにメッセージの内容が入ってる
    })
    .catch(error => {
      console.error(error);
    });

  e.waitUntil(promise);
});
```

例えば、ブラウザから送るメッセージを`{ command : 'add', url : 'app.css' }`なオブジェクトにすれば、`e.data.command`で`switch`するなどして、メッセージの内容に応じた処理も可能。実際にこのメッセージを元に`app.css`をキャッシュさせる実装をすると次のようになる。

```javascript
// browser.js
sendMessage({
  command : 'add',
  url     : 'app.css'
});
```

```javascript
// service-worker.js
self.addEventListener('message', e => {
  let promise = caches.open('cache-key')
    .then(() => {
      let command = e.data.command; // add
      let url = e.data.url;         // app.css
      switch (command) {
        case 'add':
          // app.css のリクエストオブジェクト
          let request = new Request(url);

          // fetch() してレスポンスをキャッシュに格納する
          return fetch(request)
            .then(response => cache.put(url, response));
        default:
          return Promise.resolve();
      }
    })
    .catch(error => {
      console.error(error);
    });

  e.waitUntil(promise);
});
```

こんな感じで、キャッシュのリソース追加だけでなくリソース削除やキャッシュそのものの削除まで出来ることを確認した。

## 使いどころ

メッセージングでリソースの追加・削除をする不都合は、 **何をキャッシュさせているか** を管理しにくくなるところか。キャッシュにヒットするかどうかだけなら`fetch`イベント内でハンドルすれば十分だが、Service Workerはブラウザが必要に応じて起動・終了するので、メッセージの内容を変数に格納して保持しておくことは出来ない。やるならIndexedDBを使うことになりそうだが、キャッシュリストの管理のために、Cache APIとIndexedDBを併用するのも微妙に思う。

Service Workerで唯一使いにくい可能性があるのは、[Service Worker自体の更新チェックが最大24時間になってしまう点](http://blog.nhiroki.jp/2015/06/22/service-worker-update)。Service Worker自体に更新があるかどうかは[`ServiceWorkerRegistration#update()`](https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method)を介してチェックが可能だが、Cache-Controlで長生き設定されていると、たとえページロードのタイミングで毎回呼んだとしてもブラウザキャッシュが効いてしまう（長生き設定しなければ良いという話でもあるんだけど）。

その点、メッセージ経由でキャッシュの全クリアとかもできるので、`purge`コマンドを用意して失敗ビルドを配信してキャッシュされてしまったような状況に備えるのは悪くないかもしれない。パージの他にも、キャッシュ追加・キャッシュ削除・キャッシュリストの取得といった処理のミニマム実装は[1000ch/sw-sandbox](https://github.com/1000ch/sw-sandbox)にあげた。

良い使い方が浮かんだら書き足す。
