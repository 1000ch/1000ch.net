---
title: Chromiumをインストールする手間を減らしたい
date: 2016-10-12
image: /img/posts/2016/chromiup/chromiup.gif
---

通常 Chromium をインストールするには [Download Chromium](https://download-chromium.appspot.com/) からアーカイブをダウンロードして解凍し、アプリケーションフォルダにコピーという手順だが、この手間をどうにか簡略化できないか考えていた。シェルスクリプトでもできるけど `npm` でインストール出来ても良かろうと、 [1000ch/chromiup](https://github.com/1000ch/chromiup) という Node.js 製のコマンドラインツールを作った。

## インストールと使い方

README に書いてある通りだが、 `npm` でグローバルにインストールして、 `chromiup` を実行するだけ。

```bash
$ npm install -g chromiup
$ chromiup
```

すると次のようにインジケータが表示され、ダウンロード→インストールが行われる。

![chromiup で Chromium をインストールする](/img/posts/2016/chromiup/chromiup.gif)

## Chromum に自動アップデートがないのは何故？

Chrome や Chrome Canary については自動アップデートの機能があるが Chromium にはない。正確な情報か不明だが、[Why is Chromium not updated automatically as Firefox is?](http://askubuntu.com/questions/166931/why-is-chromium-not-updated-automatically-as-firefox-is) にかかれているような Multi Distribution も関係していそうではある。まぁ大抵の場合は Canary で事が足りるのでここまでして Chromium を最新に保つ必要はない気がする。
