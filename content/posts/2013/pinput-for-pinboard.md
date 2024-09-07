---
title: Pinput ~PinboardユーザーのためのChrome Extension~
date: 2013-11-13
---

- [Pinboard](http://pinboard.in/) - 雑音の少ないブックマークサイト
- [Pinput](https://chrome.google.com/webstore/detail/pinput/mbpijfbpahfjnlibcnikfkekdieojkcf) - Chromeストア
- [1000ch/Pinput](https://github.com/1000ch/Pinput) -リポジトリ

なんか、周りのPinboardユーザーに使ってもらったら思った以上に好評だった。[@t32k](http://twitter.com/t32k)氏と『既存だといいのがないですね』という話をしていたら、いつの間にかプロトタイプが出来てた。

最初は他のExtensionみたいに`iframe`でやっていたんだけど、やっぱ`iframe`だと重いうえに、iframe内のイベントを拾えないのでポップアップウィンドウを閉じれない。使い心地で1番ネックだったのはここなので、[PinboardのAPI](http://pinboard.in/api)を使って1から画面を作った。ら、結果的にかなり軽快に動作した。

## Simple is BEST!

Bookmarkするだけの、単純なものです。削除くらいはあってもいいかなと思ったりもするが、様子で。

![](https://raw.github.com/1000ch/Pinput/master/screenshot/pinput.png)

`iframe`をなくしたのでPinboardに対する認証が必要になる。HTTP AuthとAPI tokenがありますが、このExtensionではAPI tokenを入力してもらうことで実現している。アイコンを右クリックか、拡張機能ページからオプションページを開くことが出来るので、そこから設定してください。PinboardのAPIトークンは、特別な設定もなく、[Setting > Password](https://pinboard.in/settings/password)から入手可能。

![](https://raw.github.com/1000ch/Pinput/master/screenshot/settings.png)

## タイプしてる最中のサジェスト

`iframe`実装をやめたことによる唯一の弊害がこれ。公式の[Pinboard - Save a Bookmark](https://pinboard.in/add)だと **tags** の場所には文字列のサジェストが出る。どうしようと思った矢先に頭をよぎったのが[typeahead.js](http://twitter.github.io/typeahead.js/)。これがまーよく出来てる。

ちょうどjQueryも使ってることだし、やってみたらかなり簡単に使えた。サジェストするキーワードは、そのユーザーが使っているタグをローカルにキャッシュしたけど、リモートにクエリ投げて動的に取得することも出来るっぽい。
