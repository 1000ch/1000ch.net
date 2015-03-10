---
layout: post
title: URL Opener
date: 2015-03-10
---

# URL Opener

自分用に作ってしばらく放置していたChrome Extension「[URL Opener](http://bit.ly/url-opener
)」をアップデートした。

![](/img/posts/url-opener/url-opener.png)

## URL Openerの機能

ブラウザ常に開いておきたいページは誰しもあると思うが、毎度アドレスバーに打ち込んだりブックマークから開くのも面倒なので、ワンクリックでやろうというコンセプト。オプションページ（拡張機能のアイコンを右クリックか、`chrome://extensions`から開ける）で開いておきたいページのURLを登録する。あとはExtensionのアイコンをクリックするだけ。ついでに、そのページをピン止めして開くかどうかも指定可能。既に開かれている場合は、ピンし直すようにしている。

## ソート機能

アップデートしたきっかけは[Support](https://chrome.google.com/webstore/detail/url-opener/dkkacgbkmcbnnadidhkmngpcoccibgpm/support)に機能要望があったからなんだけど、確かにあっても良い機能だと思った。追加したURLをドラッグアンドドロップで順番を入れ替えできるようにした。タブを開く時に、ここで指定した順番通りに並び替えられるようにしている。

しかし、仕様かどうか不明だがピン止めしているタブの並びまではコントロール出来ないようなので、ちょっと中途半端になってしまった気もするがこれも仕様とすることにする。タブの順序まで気にする人が果たしてどれだけいるのかわからないけど。

この要素の並び替えの実装は[Slip](https://github.com/pornel/slip)というライブラリを使った。タッチデバイスのほうが力を発揮するライブラリなんだろうけど、機能を活かして、URL Openerでも登録したURLをスワイプで削除できるようになっている。
