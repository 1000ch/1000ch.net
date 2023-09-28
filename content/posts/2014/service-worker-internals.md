---
layout: post
title: Service Workerに関する仕様とか機能とか
date: 2014-12-29
---

# Service Workerに関する仕様とか機能とか

今巷で流行りのService Workerについて調べ物してたので、まとめたメモ。

## Service Workerが解決してくれること

Service WorkerはHTML・CSS・JS・画像等などのリソースを、JavaScriptのAPIから命令的にコントロールすることを実現する。Webページのパフォーマンスに関する指標としてネットワークを介して得るリソースをキャッシュさせたりすることが効果的であることは今更改めて挙げないが、Service Workerによって保持されたリソースは、オフライン状態でも返却することが可能という凄さを持っている。つまり、更新性の低いコンテンツであればオフラインでも閲覧させることが可能ということ。

更新性のあるコンテンツでも、回線が不安定な時はローカルに変更を保持して、サーバーに対してデータを遅延で同期するみたいなテクニックは既に存在している。ので、こういったテクニックと組み合わせて、よりクライアントの画面がホワイトアウトすることを減らしていける。はず。

<iframe loading="lazy" src="https://www.youtube.com/embed/_yy0CDLnhMA?si=7sVkwQU21MIHugjv" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

こちらは、Jake Archibald氏とAlex Russell氏によるGoogle I/O 2014でのセッション「Bridging the gap between the web and apps」。[@myakura](http://twitter.com/myakura)氏による[解説記事](http://html5experts.jp/myakura/8365/)もある。

### Application Cache

先程の動画でも少し触れられているように、Application Cacheとよく対比される。リソースをキャッシュする機能として現れたのがApplication Cacheだったが、キャッシュリソースのコントロールがし難かったり、動的なコンテンツを生成する際、構成がApplication Cache前提になってしまう等、いささか問題を抱えていた。それを解決してくれるのがService Workerでもある。

Application Cacheの問題点については、[@kyo_ago](https://twitter.com/kyo_ago)さんが執筆した[モバイル対応Webアプリケーションのキャッシュ戦略](http://html5experts.jp/kyo_ago/2466/)という記事にまとまっている他、TwitterでメンションしてもApplication Cacheの話題であれば何かしらレスをくれる。かもしれない。

### ブラウザキャッシュ

ブラウザキャッシュもパフォーマンスを向上させる上で非常に重要な存在であることには間違いなさそうだが、JavaScriptからコントロールすることは不能だし、ブラウザによって挙動もまちまちである。なんせ、ブラウザキャッシュはW3Cに載っているような仕様の類ではなく、ブラウザベンダーが気を利かせて実装している機能に過ぎないからである。

ブラウザキャッシュと言えば、[Nicholas Zakas](https://twitter.com/slicknet)氏による[The changing role of the browser cache](http://calendar.perfplanet.com/2014/the-changing-role-of-the-browser-cache/)というブラウザキャッシュの役目の移り変わりについての記事も興味深い。

### オフラインアプリケーションの夢

ホワイトアウトを減らすどころか、必要なリソースを全てService Workerでコントロールすればオフラインアプリケーションの作成も可能である（キャッシュするリソースを取得する最初のダウンロードは必要になるが）。

つまりService Workerは、~~Application Cacheの屍を超えて生まれた~~今までにないリソースのコントロール機構であると言える。

## Service WorkerのAPIと挙動

Service WorkerはWeb Workerなんかと同じように（Web Workerの一種と言ったほうが正確なのかも）、ブラウザの表示とは別スレッドで実行される（だから、DOMのAPIとかを叩いたりすることは出来ない）。Service Workerでは、ページから行われるリソースの要求等に対し、独自の処理を挟むことが出来る。 **プロキシを自前で用意出来る** と言ったほうがイメージしやすいかも。

リクエストをフックし、Cache APIを介してアレコレする。あるURLへのリクエストに対するレスポンスを受け取った時にそのリソースを保持したり、はたまた再度そのリクエストが発生する時にはCache APIから保持したリソースを引っ張りだしてブラウザに返却する。といったような処理をService Workerにしてもらうことになる。

しれっと[Cache API](http://www.w3.org/TR/service-workers/#cache-objects)が出てきたが、これもService WorkerのAPIの一環で、Service Workerコンテキストで利用可能なキャッシュリソースを管理するためのAPIである。

### もうちょっと実際の処理に近い説明

1. リクエストされたリソースをキャッシュさせたり、リクエストに割り込んでキャッシュされたリソース等を返却するような処理が記述されている`service-worker.js`を用意
2. `index.html`で`service-worker.js`をService Workerとして登録する（この時、`index.html`内の評価は行われていない）。
3. `service-worker.js`に定義してあるリクエストが`index.html`から行われた場合、フックする。既にキャッシュに存在している場合はそれを返却したり、キャッシュされていなければそのままサーバーへリクエストしてあげる。

## 画像をService Workerでcachesにキャッシュさせるサンプル

実際のコードを動かしてもらって、デバッグしてもらう方がイメージしやすいと思うので簡単なサンプルを作った。

### ブラウザの準備

[Google Chrome Canary](https://www.google.co.jp/chrome/browser/canary.html)の **Version 41.0.2259.0 canary (64-bit)** で動作確認済。フラグをonにしないと動かないので[`chrome://flags`](chrome://flags/)で、[**Enable experimental Web Platform features.**](chrome://flags/#enable-experimental-web-platform-features)と[**Enable support for ServiceWorker background sync event.**](chrome://flags/#enable-service-worker-sync)を有効にしておく。

Service Workerはセキュリティ上、HTTPS環境かローカルホストのみ実行可能になっている。ローカルでのデバッグは`python -m http.server`でOKだが、動くように作ったつもりでもホスト先がHTTPSじゃないと動かない。~~簡単デプロイの代名詞のGitHub Pagesもダメなので、~~お手軽に用意出来そうなHTTPS環境はDropboxのPublicっぽい。

※2014/12/29追記

>簡単デプロイの代名詞のGitHub Pagesもダメなので、

と書いてあるところに指摘を頂きまして、修正しました。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/1000ch">@1000ch</a> github pagesはhttpsも提供されてますよー。httpsでアクセスすれば表示されると思います。 <a href="http://t.co/327sxlRQ3R">http://t.co/327sxlRQ3R</a></p>&mdash; さだ (@sada_h) <a href="https://twitter.com/sada_h/status/549383897373356032">2014, 12月 29</a></blockquote>

GitHub PagesのHTTPSサポートについては、以下にも情報があった。

- [What are GitHub Pages?](https://help.github.com/articles/what-are-github-pages/)
- [GitHub Pages Now Supports HTTPS, So Use It](https://konklone.com/post/github-pages-now-supports-https-so-use-it)

### `index.html`

5枚の画像を表示するだけの、シンプルなHTML。

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
        navigator.serviceWorker.register('./service-worker.js', {
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

先程の`index.html`からService Workerとして登録している`service-worker.js`の中身。Service Workerコンテキストは`self`で参照し、各種イベントにハンドラを登録している。

また、Chrome 40ではCache APIが一部未実装なので[coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill)をロードする。

```js
// Cache APIが一部未実装なのでポリフィルをロード
importScripts('serviceworker-cache-polyfill.js');

// キャッシュのキーとなる文字列
var CACHE_KEY = 'service-worker-playground-v1';

self.addEventListener('install', function (e) {

  console.log('ServiceWorker.oninstall: ', e);

  e.waitUntil(
    caches.open(CACHE_KEY).then(function (cache) {

      // cacheさせたいリクエストのキーを追加
      return cache.addAll([
        'index.html',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {

  console.log('ServiceWorker.onfetch: ', e);

  e.respondWith(
    caches.open(CACHE_KEY).then(function (cache) {
      return cache.match(e.request).then(function (response) {
        if (response) {

          // e.requestに対するキャッシュが見つかったのでそれを返却
          return response;
        } else {

          // キャッシュが見つからなかったので取得
          fetch(e.request.clone()).then(function (response) {

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

self.addEventListener('activate', function (e) {
  console.log('ServiceWorker.onactivate: ', e);
});
```

Service Workerの登録（`navigator.serviceWorker.register`）時に発火する`install`イベントで、キャッシュさせたいリソースのパスをキーとして登録定義している。これは[`RequestInfo`](https://fetch.spec.whatwg.org/#requestinfo)という構造体の配列になる。

`fetch`はブラウザのUIスレッドからリクエストが発生したときに発火する。ここでは、キャッシュオブジェクト（`caches`）にリクエストに対するリソースが保持されている場合に、サーバーへのリクエストを実行せずキャッシュされたリソースを返却し、キャッシュに保持されていない場合はサーバーにリソースを要求しキャッシュに保持した上でブラウザにリソースを返却している。

### Service Workerのデバッグ

`index.html`と`service-worker.js`、あとは`img`フォルダに`1.jpg` ~ `5.jpg`を配置して準備は完了。あとはローカルホストを起動する。

```bash
$ python -m http.server
```

URLに対し登録されたService Workerは、[`chrome://serviceworker-internals`](chrome://serviceworker-internals)でどういう状態かを確認することが出来る。 **Opens the DevTools window for ServiceWorker on start for debugging.** のチェックをオンにしておくと、Service Workerが登録された時にワーカースレッドに対するDevToolsが自動で開くのでデバッグ時はオンにしておくと良さげ。

![Service Worker Internalsから起動するDevTools](/img/posts/2014/service-worker-internals/service-worker-devtools.png)

起動した[`localhost:8000`](http://localhost:8000)をCanaryで開くとService Workerの登録（`service-worker.js`）が`index.html`で行われる。Service WorkerのDevTools上でステップ実行をしていくと、各イベントハンドラが登録されていくのがわかる。最後まで実行されると、`index.html`に実行スレッドが戻ってくるのが確認出来る。

初回登録時にはService Workerで定義しているリソースが保持されていないのでダウンロードが必要だが、2回目以降のアクセス時には`<img src='img/1.jpg'>`によって発生するリクエストをService Workerが拾って、`fetch`イベント内でキャッシュからリソースを返却するようになる。

めでたしめでたし。

## その他

今回はService Worker内で`fetch`や`install`といった初歩的な部分しかハンドルしてないけど、バックグラウンドでデータの同期（Background Sync）を行ったり、[Push API](https://w3c.github.io/push-api/)と連携する`push`だったり、ブラウザスレッドからのメッセージ（`navigator.serviceWorker.controller.postMessage`）を`message`で受け取ることで任意のタイミングでリソースの更新を行ったり出来そう。

まだ`push`の機能はChromeにも実装されていないけど、`chrome.gcm`のインフラ使うのかなとか、SafariだったらiOSのプッシュサーバー使うのかなとか色々妄想はある。インフラさえ整えば、`push`イベント時にNotification出すとか、本当のプッシュ通知をWebで利用できる日が来そう。

何にせよ、仕様がもっと安定して、ブラウザの実装が進むのを待ちたい。

## 参考リソース

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
