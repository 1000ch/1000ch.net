---
title: iframeの高さを読み込むコンテンツに応じて変える
date: 2016-02-19
---

前提として

- `<iframe>`を記述するHTMLドキュメントは外部のモノで触ることは出来ない
- `<iframe>`でロードするリソースはこちらの支配下にある

である。[Twitterがembed機能を提供している](https://dev.twitter.com/ja/web/embedded-tweets)が、そのTwitter側を想定した話だと思ってもらえると良い。

## `<iframe>`でロードされるリソースが`<iframe>`の高さを決定出来ない

`<iframe>`の高さは`<iframe>`を埋め込んでいるHTMLドキュメント側が決定する。HTMLドキュメントの高さは`document.documentElement.scrollHeight`で取得できるが、コンテナ側から`<iframe>`の`src`に指定されたHTMLドキュメントを参照することが出来ない。HTMLドキュメントを参照する手段自体は`<iframe>`の`contentWindow`を通じて`iframe.contentWindow.document.documentElement`のようにアクセス出来るが、ロードしているリソースがドメインを跨いでいると例外が発生して出来ない。

## `postMessage()`で高さをやり取りする

色々読み漁ったが、今のところ`window`オブジェクトの`postMessage()`を使うのが正攻法っぽい。以下のように`<iframe>`でロードしているコンテンツ側からコンテナにメッセージを投げることが出来る。

```javascript
// iframeでロードされていないケースを考慮し、window.parentの存在をチェックする
if (window.parent) {
  let height = document.documentElement.scrollHeight;
  window.parent.postMessage(height);
}
```

実際には、複数の`<iframe>`がロードされている可能性があるので、どの`<iframe>`とやりとりしているかを管理する必要がある。自分の場合は、まずコンテナ側で`<iframe>`に割り当てた`#id`を`<iframe>`でロードしているHTMLドキュメントに`postMessage()`で送って、`onmessage`のハンドラ内でコンテンツの高さを送られた`#id`とともにコンテナ側に`postMessage()`で返答するというやり方をとった。

### コンテナ側のJavaScript

```javascript
window.onmessage = function(e) {
  let json = JSON.parse(e.data);
  document.querySelector(`#${json.id}`).style.height = `${json.height}px`;
};

let iframes = document.querySelectorAll('iframe');
for (let iframe of iframes) {
  iframe.contentWindow.postMessage(iframe.id);
}
```

`<iframe>`の`onload`ハンドラでメッセージを送るようにして、`src`は後程設定するような実装だと◎。

### `<iframe>`でロードされたHTMLドキュメント側のJavaScript

```javascript
window.onmessage = function(e) {
  let json = {
    id: e.data,
    height: document.documentElement.scrollHeight
  };
  window.parent.postMessage(JSON.stringify(json));
};
```

`<iframe>`でロードするページが非同期描画しているケースは、それを待たないと正確なコンテンツ高を取得出来ない。描画完了をイベントでハンドリングできればいいが、場合によってはタイマーを使うことにもなりそう…。この辺を上手くやっているライブラリとして[davidjbradshaw/iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer)というものがあるそう（自分は使ってない）。

## スペックないのか

[iframe要素には`seamless`という属性が定義されている](http://w3c.github.io/html/single-page.html#attr-iframe-seamless)が、[ブラウザのサポートが進んでいなかった](http://caniuse.com/#search=seamless)こともあり、[WHATWG側からは先日削除されている](https://github.com/whatwg/html/issues/331)。

しかし、この流れを受けてか新たな提案もなされている。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">iframe {<br> height: max-content;<br>}<br><br>The future of iframe height resizing could be that easy with this proposed change <a href="https://t.co/2V2VF1ekJi">https://t.co/2V2VF1ekJi</a></p>&mdash; Ryan Seddon (@ryanseddon) <a href="https://twitter.com/ryanseddon/status/696498269585674240">2016, 2月 8</a></blockquote>

[iFrame Height](https://github.com/craigfrancis/iframe-height)は同等のことをCSSで実現しようというものだ。以下のように`<iframe>`の`height`プロパティに`max-content`という値を指定しようと言うもの。

```html
<iframe src="https://1000ch.net"></iframe>
<style>
  iframe {
    height: max-content;
  }
</style>
```

また、`<iframe>`でロードされるコンテンツにはレスポンスヘッダに`Expose-Height-Cross-Origin: 1;`を含んでいる必要がある。[潜在的な問題を抱えている](https://github.com/craigfrancis/iframe-height/blob/master/problems/infinite-loops.md)ものの、ウィンドウ間で`postMessage()`をしないとダメというのもあまりにナンセンスだと思うので、是非実現されて欲しい。
