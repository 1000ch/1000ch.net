---
layout: post
title: ブラウザのNotification APIをWeb Components化した
date: 2014-07-15
---

# ブラウザのNotification APIをWeb Components化した

巷で話題のWeb Componentsですが、コンポーネント化していくのは所謂UIパーツだけに留まりません。
XMLHttpRequest部分を抽象化している[`core-ajax`](https://github.com/Polymer/core-ajax)とか、[`core-localstorage`](https://github.com/Polymer/core-localstorage)とか。
そんなわけで試しにNotification API周りをラップした`x-notification`を作ってみた。
これを使えば、今までJavaScriptから実行していた部分を、HTML内で宣言的に記述することが可能になる。有意義かどうかは、さておき。

## ダウンロード

`npm`か`bower`でどうぞ。もちろんリポジトリをクローンでも。

```bash
$ npm install x-notification
$ bower install x-notification
```

## 使い方

使いたいページで、`x-notification.html`をインポートする。

```html
<link rel='import' href='x-notification.html'>
```

あとは`<x-notification>`タグを記述する。

```html
<x-notification autoshow title='バルーンのタイトル'>バルーンの本文</x-notification>
```

自動で表示したい場合は`autoshow`属性を付与することで自動で表示されて、
JavaScript側でコントロールしたい場合は対象の`<x-notification>`要素を取得し、`show()`を実行する。

```js
document.querySelector('x-notification').show();
```

属性等の詳細は[リポジトリ](https://github.com/1000ch/x-notification)を参照して下さい。

## 環境とか

NotificationのAPIが実装されていないとダメなのはもちろんのこと、
HTMLImportやら`Document#registerElement()`やら、Web Components周りのAPIが無いと動きません。
ただ、Web Components側のAPI群に関しては[Polymer/platform](https://github.com/Polymer/platform)等でPolyfillすれば動きます。

<blockquote class="twitter-tweet" lang="ja"><p>Re-designed x-notification landing page with Polymer including Paper Elements. <a href="http://1000ch.github.io/x-notification">http://1000ch.github.io/x-notification</a> <a href="https://twitter.com/hashtag/Polymer?src=hash">#Polymer</a> <a href="https://twitter.com/hashtag/WebComponents?src=hash">#WebComponents</a> <a href="https://twitter.com/hashtag/PaperElements?src=hash">#PaperElements</a></p>&mdash; 1000ch (@1000ch_en) <a href="https://twitter.com/1000ch_en/statuses/484296238892720128">2014, 7月 2</a></blockquote>

`x-notification`自体はピュアなWeb Componentsだけど、デモ用に`x-notification-editor`というPolymerを使ったWeb Componentsを作った。
`x-notification-editor`内に`x-notification`を内包し、PaperElementsを駆使して動的に`x-notification`の属性値をいじれるようにしている。

- http://1000ch.github.io/x-notification/ - デモページ
- https://github.com/1000ch/x-notification/blob/master/x-notification-editor.html - x-notification-editor要素

**Customize Example** の所にソースコードを表示するようにしてあって、
そこはPolymerが提供している2-way bindingをたっぷり使っている。これは便利だと思った。

## [CustomElements.io](http://customelements.io/)

<blockquote class="twitter-tweet" lang="ja"><p>You can find x-notification on <a href="http://t.co/PbWp0Gxp0a">http://t.co/PbWp0Gxp0a</a> <a href="https://twitter.com/hashtag/WebComponents?src=hash">#WebComponents</a> <a href="https://twitter.com/hashtag/Notification?src=hash">#Notification</a> <a href="https://twitter.com/hashtag/CustomElements?src=hash">#CustomElements</a></p>&mdash; 1000ch (@1000ch_en) <a href="https://twitter.com/1000ch_en/statuses/485281852144381954">2014, 7月 5</a></blockquote>

CustomElements.ioはBowerで登録されているWeb Componentsのギャラリーサイト。
サイトの上部にあたかも登録フォームがあるのでここから申請するのかと思ったら、
`bower.json`の`keywords`に **web-components** が含まれていると自動で追加されるそう。

- https://github.com/webcomponents/customelements.io/issues/237

## 参考資料

- [Web Notifications](http://www.w3.org/TR/notifications/)
- [Notification - Web API Interfaces | MDN](https://developer.mozilla.org/ja/docs/Web/API/notification)
- [Using the Notifications API](http://www.html5rocks.com/en/tutorials/notifications/quick/)