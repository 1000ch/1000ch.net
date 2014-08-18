---
layout: post
title: Gistを簡易スライドにするGistSlideを作った
date: 2013-7-5
description: gistslideに影響されて、もうちょっとキレイに作れないかなと思い作成しました。デザインは@hiloki氏に作って頂きました。ありがとうございます。
---

# Gistを簡易スライドにするGistSlideを作った

[gistslide](https://github.com/nzoschke/gistdeck)に影響されて、もうちょっとキレイに作れないかなと思い作成しました。
デザインは[@hiloki](https://twitter.com/hiloki)氏に作って頂きました。ありがとうございます。

- [GistSlide](http://gistslide.herokuapp.com/)
- [gistslide / 1000ch](https://github.com/1000ch/gistslide)

## 使い方

たぶん意識してないgistでもある程度見れますが、  
一応スライドで発表した前提のほうがいいのかな。  

- [GistSlide](http://gistslide.herokuapp.com/)にいく
- リンクボタンをブックマークバーにドラッグ&ドロップする
- [Gist](https://gist.github.com/)を見る
- 先程ブックマークに登録したリンクをクリックする
- 左右キーでスライド送りができます

## 作り方とか

スライドのマークアップ構造を相談の元決め、私はgistをあれこれするjsを書いて、
[@hiloki](https://twitter.com/hiloki)さんにはデザインを含めたマークアップをしてもらいました。

あとはChrome Extensionにしたらもう少しやれること広がるかなと思ったんですが、今回はherokuでホストしています。
GitHubのrawだとresponseHeaderに  `text/plain`がついてて、cssとして認識されないみたいだし。

## まとめ

ご感想等頂けると嬉しいです！