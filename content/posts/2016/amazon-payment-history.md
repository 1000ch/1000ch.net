---
title: Amazonに費やした金額を年毎に集計して表示するChromeの拡張機能
date: 2016-08-20
image: /img/posts/2016/amazon-payment-history/capture.png
---

ブックマークレットが流行ったが、拡張機能として作りなおした。[APH - Chrome Web Store](https://chrome.google.com/webstore/detail/pgccjlmicdpgkbllgiafapgbnciodipb/related)からダウンロードできる。

![](/img/posts/2016/amazon-payment-history/capture.png)

## モチベーション

日常的に使うものではないので拡張機能である必要がないが、以下の理由で都合が良い。

- インストール
- 任意のページへの誘導（[注文履歴](https://www.amazon.co.jp/gp/css/order-history)で JavaScript を実行する必要有り）
- 去年以前の結果のキャッシュ
- ポップアップでの結果表示

## 使い方

内部で認証つき HTTP リクエストをする必要があるので、[注文履歴](https://www.amazon.co.jp/gp/css/order-history)を開いていない場合は開き、開いている場合はポップアップを表示して集計を開始する。この手順を拡張機能内でシームレスにできれば良いのだが、 **新しいタブを開きつつその後に拡張機能のポップアップを表示する** ことが可能なのか不明。
