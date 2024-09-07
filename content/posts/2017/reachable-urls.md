---
title: テキストファイル中に含まれるURLが有効かどうかチェックするツールを作った
date: 2017-02-15
image: /img/posts/2017/reachable-urls/demo.gif
---

前略、 [`1000ch/reachable-urls`](https://github.com/1000ch/reachable-urls) というテキストファイルに含まれる URL が有効かどうかチェックするツールを作った。一応程度に [@inao](https://twitter.com/inao) さんに報告したらなんと使ってくれて、案外便利だったようで色々フィードバックをもらいながらコツコツ直した。今はバグも取れてきて安定してきたので、そろそろメジャーリリースしようかと考えている。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">原稿中のURLが有効かどうかを調べてくれるツールを <a href="https://twitter.com/1000ch">@1000ch</a> さんが公開してくださった！ <a href="https://t.co/6qG3wpTJYu">https://t.co/6qG3wpTJYu</a></p>&mdash; 稲尾尚徳 (@inao) <a href="https://twitter.com/inao/status/829268297698906112">2017年2月8日</a></blockquote>

## インストールと使い方

Node.js 製なのでインストールは `npm` で。インストールすると `reachable-urls` コマンドが使えるようになる。グローバルにインストールしてもいいし、ローカルにインストールして `npm test` で実行するのも悪く無さそう。

```bash
$ npm install -g reachable-urls
```

引数にはファイルパスか glob を指定する。テキストファイルならなんでも OK なので、プレーンテキストなのかマークダウンなのかは問わない。テキストファイルから正規表現で URL を抜き出して [`sindresorhus/is-reachable`](https://github.com/sindresorhus/is-reachable) でチェックするという単純な仕組みで出来ている。

```bash
$ reachable-urls ./*.md
```

![reachable-urls demo](/img/posts/2017/reachable-urls/demo.gif)

CLI だけでなく、もちろん `require()` しても使える。

```javascript
const assert = require('assert');
const reachableUrls = require('reachable-urls');

reachableUrls('https://github.com https://foobarbaz.com').then(result => {
  assert.deepEqual(result, {
    'https://github.com': true,
    'https://foobarbaz.com': false
  });
})
```

## 実装するかもしれない機能リスト

### http / https プロトコル以外のチェック

[@Jxck](https://twitter.com/jxck_) 氏によるバグ報告で気付いたが、 `sindresorhus/is-reachable` で WebSocket のプロトコルである `ws` と `wss` をチェックできない。これは内部で使っている [`silverwind/port-numbers`](https://github.com/silverwind/port-numbers) で WebSocket が使うポート番号を引いてこれていないことが問題。

設定に、以下のような WebSocket 要の定義を追加すれば動きそうだが、[Service Name and Transport Protocol Port Number Registry](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) を元に記述しているようで WebSocket の定義追加を憚られている。

```json
"ws": {
  "ports": [
    "80/tcp"
  ]
},
"wss": {
  "ports": [
    "443/tcp"
  ]
},
```

ユースケースとしては、全プロトコル対応の URL ヘルスチェックではなく、リンク先にページがあるかどうかを想定しているので、ひとまずチェック対象を `http` と `https` に限定することにした。

### 標準入力 `--stdin` オプション

作った当初は glob で充分じゃろと思っていたが、 `--stdin` でパイプできても良さそう。

```bash
// foo.md の中身を reachable-urls へ渡す
$ cat foo.md | reachable-urls --stdin
```

### ネットワーク越しにチェックする `--url` オプション

ぶっちゃけこれは要らないかなと思っているけどメモがてら。

```bash
// https://google.com のレスポンスに含まれる URL が有効化をチェックする
$ reachable-urls --url https://google.com
```
