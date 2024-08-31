---
title: Open Graphのデータをカードでプレビューする
date: 2016-01-29
---

# Open Graphのデータをカードでプレビューする

オープングラフのデータを取得して表示する機能は、FacebookやらTwitter、Google+では当たり前のようにある機能だが、業務上必要になったので調査して、ツールを作った話。

文字列や画像のURLといった表示させたいデータを`<meta>`や`<link>`で記述するのは御存知の通りだが、HTMLにどのように記述するかは各プラットフォーム毎に定義がなされている。Facebookであれば[Open Graph](http://ogp.me/)、Twitterであれば[Twitter Cards](https://dev.twitter.com/cards/markup)といった名前が付いている。

```html
<!-- Open Graph -->
<meta property="og:title" content="The Rock">
<meta property="og:type" content="video.movie">
<meta property="og:url" content="http://www.imdb.com/title/tt0117500/">
<meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg">

<!-- Twitter Cards -->
<meta name="twitter:card" content="">
<meta name="twitter:site" content="">
<meta name="twitter:url" content="">
<meta name="twitter:title" content="">
<meta name="twitter:description" content="">
<meta name="twitter:image" content="">
```

これだけではなく、Googleの検索結果からネイティブアプリを起動させたい場合はApp Indexingの対応が必要だったり、iOSはカスタムのURLスキーマを使う必要があったりと、かなり複雑で様々な対応が必要になる。これについては[ネイティブ・ソーシャル時代にWeb・アプリでやっておくべきことまとめ (ネイティブSEO)](http://qiita.com/herablog/items/ce9ceaccb13c304855f4)に詳しくまとまっているので読んでもらうとして、今回はOpen GraphやTwitter Cardsに記述されているデータを取得してカードに表示する実装をした。

## ブラウザからはcors制限で取得できない

特定のURLのHTMLを閲覧しているページコンテキストから取得できれば、Open Graphのタグなどを参照できるが、corsの制限でHTMLを得ることが出来ないことが多い（ほとんど？）。なのでまずは、Node.jsのプログラムからリクエストしてHTMLを取得してくることを試みる。

プログラム自体は難しいものではなく、[1000/rog](https://github.com/1000ch/rog)のような実装になった。

```javascript
const rog = require('rog');

rog('http://google.com').then(data => {
  console.log(data.title);
  console.log(data.type);
  console.log(data.url);
  console.log(data.image);
  console.log(data.site);
  console.log(data.description);
  console.log(data.locale);
}).catch(error => {
  console.error(error);
});
```

この例でいう`data.title`は内部的に`meta[property="og:title"]`または`meta[name="twitter:title"]`または`meta[name="title"]`を参照している。正確に言えば異なるデータを指定するケースがあるのかもしれないが、大抵の場合は同じだろうと括ってこのようにした。

## プロキシ的に簡易サーバーを立てる

[1000ch/og-card-simulator](https://github.com/1000ch/og-card-simulator)はテキストエリアに入力されたURLのOpen Graphデータを取得してカードとして表示するサンプル。

1. テキストエリアに入力された文字列からURLを判別
2. そのURLをパラメータとしてサーバーにリクエスト
3. 指定されたURLにNode.jsから再度リクエストしJSONデータを取得
4. 取得したJSONデータをクライアントに返却
5. 返却されたJSONデータに応じてカードを表示

cors問題がある限りプロキシ的なものを挟まないとデータを取れない気はしてるが、これが正攻法なのかわからない。ネイティブアプリからならこういった中継をせずとも、HTTPクライアントからリクエストしてHTMLを検証するということを直接できるんだろうか。
