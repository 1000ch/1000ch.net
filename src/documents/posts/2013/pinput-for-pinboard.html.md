---
layout: post
title: Pinput ~PinboardユーザーのためのChrome Extension~
date: 2013-11-13
---

# Pinput ~PinboardユーザーのためのChrome Extension~

- [Pinboard](http://pinboard.in/) - 雑音の少ないブックマークサイト
- [Pinput](https://chrome.google.com/webstore/detail/pinput/mbpijfbpahfjnlibcnikfkekdieojkcf) - Chromeストア
- [1000ch/Pinput](https://github.com/1000ch/Pinput) -リポジトリ

なんか、周りのPinboardユーザーに使ってもらったら思った以上に好評だた。
[@t32k](http://twitter.com/t32k)氏と『既存だといいのがないですね』という話をしていたら、いつの間にかプロトタイプが出来てた。

最初は他のExtensionみたいに`iframe`でやっていたんだけど、やっぱ`iframe`だと重いうえに、iframe内のイベントを拾えないので
ポップアップウィンドウを閉じれない。使い心地で1番ネックだったのはここなので、[PinboardのAPI](http://pinboard.in/api)を使って1から画面を作った。ら、結果的にかなり軽快に動作した。

## Simple is BEST!

Bookmarkするだけの、単純なものです。他の機能はあんまりブラウジング中には使わない！
削除くらいはあってもいいかなと思ったりもしますが、様子で。

<img src="https://raw.github.com/1000ch/Pinput/master/screenshot/pinput.png" width="100%" class='mv10'>

`iframe`をなくしたのでPinboardに対する認証が必要になります。
HTTP AuthとAPI tokenがありますが、このExtensionではAPI tokenを入力してもらうことで実現しています。
Pinputのアイコン（by [@t32k](http://twitter.com/t32k)）を右クリックか、拡張機能ページからオプションページを開くことが出来ますので、そこから設定してください。
PinboardのAPIトークンは特に設定等なく[Setting > Password](https://pinboard.in/settings/password)から入手可能です。

<img src="https://raw.github.com/1000ch/Pinput/master/screenshot/settings.png" width="100%" class='mv10'>

## タイプしてる最中のサジェスト

`iframe`実装をやめたことによる唯一の弊害がこれでした。公式の[Pinboard - Save a Bookmark](https://pinboard.in/add)だと **tags** の場所には文字列のサジェストが出るんです。
どうしようと思った矢先に頭をよぎったのが[typeahead.js](http://twitter.github.io/typeahead.js/)です。これがまーよく出来てる。
ちょうどjQueryも使ってることだし、やってみたらかなり簡単に使えました。サジェストするキーワードは、そのユーザーが使っているタグをローカルにキャッシュしましたが、
リモートにクエリ投げて動的に取得することも出来るっぽい。

## その他

「あーゆーの欲しい」「こーゆーの欲しい」っていうのを言われて作らせてもらってるせいで、Chrome Extension API周りのことは結構わかるようになってきた。  
またもやニッチな分野(?)ですが、Pinboardユーザーの方、使っていただけたら幸いです。

※追伸：はてぶの公式拡張と被るショートカットキー、`ctrl + b`を備えております。ｷﾘｯ  