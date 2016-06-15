---
layout: post
title: パフォーマンスに関する各種ブラウザAPI
date: 2016-06-14
---

# パフォーマンスに関する各種ブラウザAPI

◯◯ Timing APIはW3CのWeb Performance Working GroupのIlya Grigorikを中心に策定が進められている、ブラウザのパフォーマンスを計測するブラウザAPIである。

- [User Timing API](http://w3c.github.io/user-timing/): 任意のラベルを用いてプログラムの実行にかかったを取得する
- [Navigation Timing API](http://w3c.github.io/navigation-timing/): ブラウザライフサイクルの発生した時間を取得する
- [Resource Timing API](http://w3c.github.io/resource-timing/): リソースのロードに際して発生した各種時間を取得する
- [Frame Timing API](http://w3c.github.io/frame-timing/): ブラウザフレームの内訳を取得する
- [Server Timing API](https://w3c.github.io/server-timing/): サーバー処理の内訳を取得する
- [High Resolution Time API](http://w3c.github.io/hr-time/): 高精度のタイムスタンプを提供する

ブラウザの`window`オブジェクトに`performance`というプロパティがあるので、DevToolsを開いてConsoleパネルで`window.performance`と入力すると、何やら見覚えのあるプロパティに数値が入っているのがわかる。

なかでもFrame TimingとServer Timingは若く、ブラウザに実験的実装はおろかスペックに関する資料も少ない。ここで記載している内容はこれから変わる可能性は高いのでご注意を。

## User Timing API

[User Timing API](https://w3c.github.io/user-timing/)は、`performance.mark()`と`performance.measure()`で任意のタイミングのパフォーマンスを計測するAPI。`performance.mark()`で任意のタイミングにマークをし、`performance.measure()`でマーク間の差分を取得するような使い方。

以下は`XMLHttpRequest`による非同期リクエストのパフォーマンスを計測する例。`performance.mark()`や`performance.measure()`したデータは、`performance.getEntriesByType('mark')`のように計測タイプを指定して取得可能になっている。

```javascript
let xhr = new XMLHttpRequest();
xhr.open('GET', '/', true);
xhr.onload = e => {
  performance.mark('mark-xhr-end');
  performance.measure('xhr-start-end', 'mark-xhr-start', 'mark-xhr-end');
  console.log(performance.getEntriesByType('mark'));
  console.log(performance.getEntriesByType('measure'));
};
performance.mark('mark-xhr-start');
xhr.send();
```

以前まではDevToolsのTimelineパネルにこのマークした情報が表示されていたが、53周辺では消えている気がする。Canaryだからかもしれないけど。

## Navigation Timing API

[Navigation Timing API](https://w3c.github.io/navigation-timing/)は、ブラウザのページロード完了までの`DOMContentLoaded`や`load`のようなライフサイクルイベントを取得するAPI。

![Processing Model](/img/posts/2016/performance-api/processing-model.svg)

`performance.timing`から以下の情報を取得できる。

```javascript
console.log(
  'Name: '       + performance.timing.name      + '\n' +
  'Entry Type: ' + performance.timing.entryType + '\n' +
  'Start Time: ' + performance.timing.startTime + '\n' +
  'Duration: '   + performance.timing.duration  + '\n' +
  'Unload: '     + (performance.timing.unloadEventEnd - performance.timing.unloadEventStart)   + 'n' +
  'Redirect: '   + (performance.timing.redirectEnd - performance.timing.redirectStart)         + 'n' +
  'App Cache: '  + (performance.timing.domainLookupStart - performance.timing.fetchStart)      + 'n' +
  'DNS: '        + (performance.timing.domainLookupEnd - performance.timing.domainLookupStart) + 'n' +
  'TCP: '        + (performance.timing.connectEnd - performance.timing.connectStart)           + 'n' +
  'Request: '    + (performance.timing.responseStart - performance.timing.requestStart)        + 'n' +
  'Response: '   + (performance.timing.responseEnd - performance.timing.responseStart)         + 'n' +
  'Processing: ' + (performance.timing.loadEventStart - performance.timing.responseEnd)        + 'n' +
  'Onload: '     + (performance.timing.loadEventEnd - performance.timing.loadEventStart)       + 'n'
);
```

ここから`PerformanceEntry`などのインターフェースに対応するNavigation Timing Level 2という仕様の策定が進んでいる。これは後述の`PerformanceObserver`に必要なインターフェースとなっている。

`DOMContentLoaded`や`load`、`document.readyState`との対応関係は次のようになりそう。

|  Browser lifecycle   | `document.readyState` | Navigation Timing API   |
|----------------------|-----------------------|-------------------------|
|                      |                       | `timing.domLoading`     |
|                      | `loading`             |                         |
|                      |                       | `timing.domInteractive` |
|                      | `interactive`         |                         |
| `DOMContentLoaded`   |                       | `timing.domContentLoadedEventStart` |
|                      |                       | `timing.domContentLoadedEventEnd` |
|                      |                       | `timing.domComplete`    |
|                      | `complete`            |                         |
| `load`               |                       | `timing.loadEvent`      |

## Resource Timing API

[Resource Timing API](https://w3c.github.io/resource-timing/)はページ内でロードされたリソースに関する情報を取得するAPI。雑に言えばNavigation Timing APIのサブリソース版。

`performance.getEntriesByType()`に`resource`を指定して取得する。

```javascript
for (let resource of performance.getEntriesByType('resource')) {
  console.log(
    'Name: '       + resource.name      + '\n' +
    'Entry Type: ' + resource.entryType + '\n' +
    'Start Time: ' + resource.startTime + '\n' +
    'Duration: '   + resource.duration  + '\n' +
    'Redirect: '   + (resource.redirectEnd - resource.redirectStart)         + 'n' +
    'App Cache: '  + (resource.domainLookupStart - resource.fetchStart)      + 'n' +
    'DNS: '        + (resource.domainLookupEnd - resource.domainLookupStart) + 'n' +
    'TCP: '        + (resource.connectEnd - resource.connectStart)           + 'n' +
    'Request: '    + (resource.responseStart - resource.requestStart)        + 'n' +
    'Response: '   + (resource.responseEnd - resource.responseStart)         + 'n' +
    'Processing: ' + (resource.loadEventStart - resource.responseEnd)        + 'n'
  );
}
```

## Frame Timing API

[Frame Timing API](https://w3c.github.io/frame-timing/)はページ描画のフレーム情報を取得するAPI。Navigation Timing APIやResource Timing APIはネットワーク処理に関するパフォーマンスの情報だが、これはレンダリングパフォーマンスの情報ということになる。

1フレームはイベントループにおける`vsync`から`vsync`までを指す。

![Frame Model](/img/posts/2016/performance-api/frame-model.png)

`performance.getEntriesByType()`に`renderer`ないし`composite`を指定して取得する。

```javascript
for (let renderer of performance.getEntriesByType('renderer')) {
  console.log(
    'Name: '       + renderer.name      + '\n' +
    'Entry Type: ' + renderer.entryType + '\n' +
    'Start Time: ' + renderer.startTime + '\n' +
    'Duration: '   + renderer.duration  + '\n'
  );
}

for (let composite of performance.getEntriesByType('composite')) {
  console.log(
    'Name: '       + composite.name      + '\n' +
    'Entry Type: ' + composite.entryType + '\n' +
    'Start Time: ' + composite.startTime + '\n' +
    'Duration: '   + composite.duration  + '\n'
  );
}
```

`renderer`はメインスレッドからCompositorへ行われるコミット、`composite`はCompositorからのドローコールに関する情報である。

これらは必ずしも対にはならず、Compositorからのドローコールはメインスレッドからのコミットに依存しない。例えばスクロールなんかの時はビットマップの再構築をせずディスプレイへのピクセルを送り直すということだと思われる。たぶん。

## Server Timing API

[Server Timing API](https://w3c.github.io/server-timing/)は、レスポンスヘッダの`Server-Timing`フィールドにサーバーの各処理にかかった時間を含めて、クライアントでそれを参照できるようにしようというAPI。IlyaのGist（[igrigorik/server-timing.md](https://gist.github.com/igrigorik/97dfe5ea9b4a85162e25)）レベルなので、まだまだ仕様の着地には遠そうだが、便利そう。

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=360, public
Transfer-Encoding: chunked
Server-Timing: db=150; cache=22
```

レスポンスヘッダの`Server-Timing`フィールドがあれば、この場合はDBアクセスに150msかかり、キャッシュの参照に22msかかったということが表せる。

`performance.getEntriesByType()`に`server`を指定して取得する。

```javascript
for (let server of performance.getEntriesByType('server')) {
  console.log(
    'Name: '        + renderer.name        + '\n' +
    'Entry Type: '  + renderer.entryType   + '\n' +
    'Start Time: '  + renderer.startTime   + '\n' +
    'Duration: '    + renderer.duration    + '\n' +
    'Metric: '      + renderer.metric      + '\n' +
    'Description: ' + renderer.description + '\n'
  );
}
```

## High Resolution Time API

[High Resolution Time API](https://www.w3.org/TR/hr-time/)はマイクロ秒単位でパフォーマンスを計測するためのAPI。`Date.now()`のミリ秒では不十分ということで、細かな計測には`performance.now()`を使うと良い。

`performance.now()`が返す`DOMHighResTimeStamp`は、ここまで紹介してきた各APIの時間に関するプロパティでも使われている。内部的にはただの`double`である。

## Performance Observer

ブラウザパフォーマンスを計測するAPIは先に挙げた、User Timing API・Navigation Timing API・Resource Timing API・Frame Timing API・Server Timing APIの5つがある。[Performance Observer](https://w3c.github.io/performance-timeline/)はこれらの変更を監視するAPIである。

`PerformanceObserver`のインスタンスを作り、監視開始には`observe()`、終了には`disconnect()`を実行する。

```javascript
const observer = new PerformanceObserver(list => {
  for (let entry of list.getEntries()) {
    console.log(
      'Name: '       + entry.name      + '\n' +
      'Entry Type: ' + entry.entryType + '\n' +
      'Start Time: ' + entry.startTime + '\n' +
      'Duration: '   + entry.duration  + '\n'
    );
  }
});

observer.observe({
  entryTypes : ['resource']
});

observer.disconnect();
```

`observe()`の引数にはどの種類のパフォーマンスのタイムスタンプを監視するかを指定してあげる。ここではResource Timing APIで取得する値を監視するべく`resource`を指定しているが、ここまで`performance.getEntriesByType()`の引数に指定してきた文字列を取りうる。

メトリクス毎に`PerformanceObserver`を分けるなどの使い方も可能だろう。
