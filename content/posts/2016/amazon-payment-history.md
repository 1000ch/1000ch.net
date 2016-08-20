---
layout: post
title: Amazonに年間で費やした金額を表示するChromeの拡張機能
date: 2016-08-20
---

# Amazonに年間で費やした金額を表示するChromeの拡張機能

ブックマークレットが流行ったが、拡張機能として作りなおした。日常的に使うものではないので拡張機能である必要がないが、ページヘのアクセスやキャッシュなどの都合で拡張機能は中々都合が良い。

- [Amazon Payment History - Chrome Web Store](https://chrome.google.com/webstore/detail/pgccjlmicdpgkbllgiafapgbnciodipb/related)

## 使い方

内部で認証つきHTTPリクエストをする必要があるので、 https://www.amazon.co.jp/gp/css/order-history を開いていない場合は開き、開いている場合はポップアップを表示しながら集計を開始する。この手順を拡張機能内でシームレスにできれば良いのだが、 **新しいタブを開きつつその後に拡張機能のポップアップを表示する** ことが可能なのか不明。
