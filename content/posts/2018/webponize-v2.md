---
title: WebPonize v2
date: 2018-01-03
---

# WebPonize v2

大晦日と正月で WebPonize を色々アップデートし `v2.0.0` としてリリースした。

## Swift-WebP

libwebp を自前でラップしていたが、[ainame/Swift-WebP](https://github.com/ainame/Swift-WebP) を使うようにした。ついでに CocoaPods から Carthage へ移行した。

libwebp のオプションはたくさんありラップするのも一苦労だったが、Swift-WebP はかなり丁寧にラップしてあったので、重い腰をあげて実行時オプションを設定できるようにした。

![WebPonizeの設定画面](/img/posts/2018/webponize-v2/preferences.png)

主に使うと思われる設定を General タブに、フィルタ関連は Filter タブ、アルファ関連は Alpha タブにコントロールを配置した。余程細かく設定したいときを除けば、Filter タブと Alpha タブを使う必要はない。

## webponize チームの作成

プロジェクトサイトのために [github.com/webponize](https://github.com/webponize) を作っていたが、アプリケーションのリポジトリもここで運用することにした。

## webponize.org の新設

[webponize.github.io](https://webponize.github.io) にあったプロジェクトサイトを、リニューアルがてら [webponize.org](https://webponize.org) へ引っ越した。アプリケーションの自動アップデートする Sparkle から参照するアップデート情報を記載した [`appcast.xml`](https://webponize.org/appcast.xml) も、ここから配置した。

`webponize.org` は Google Domains で取得し、静的サイトは Firebase Hosting でホストし、GitHub へのコミットで自動デプロイという組み合わせである。特別、Google Domains と Firebase Hosting の親和性が高いわけではないが、どちらもサービスとして使いやすいし、HTTPS の設定も簡単で非常に良い。
