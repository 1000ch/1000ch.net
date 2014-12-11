---
layout: post
title: Sublime Textの後継を目指すオープンソースのテキストエディタLime Textを使った感想
date: 2014-12-11
description: 
---

[Lime Text](http://limetext.org/)はSublime Textの後継を目指したオープンソースのテキストエディタ。Goで書かれており、インターフェースはSublime Textとよく似ている。

>Lime Text is a powerful and elegant text editor primarily developed in Go that aims to be a Free and open-source software successor to Sublime Text.

何はともあれ、使ってみる。Sublime Textの開発あんまり活発じゃ無さそうだし…。

## limetextのビルド

バイナリ配布してないので、使うためにはソースコードを入手して、自分でビルドする必要がある。[この辺はWikiに書いてある通り](https://github.com/limetext/lime/wiki/Building)にやっているだけです。

### ビルド時に必要になるライブラリとかのインストール

- [Python 3.4](https://www.python.org/download/releases/3.4.0/)
- [Oniguruma](http://www.geocities.jp/kosako3/oniguruma/index_ja.html)
- Git
- Mercurial
- Go 1.3.3 installed and some familiarity with writing code in Go.

鬼車を久々に目にしたのはさておき、これらをインストールしておく必要がある。MacであればHomebrewあたりが楽。

```bash
$ brew install pkg-config go mercurial oniguruma python3
```

僕の場合[Pythonは`pyenv`で管理している](http://qiita.com/1000ch/items/93841f76ea52551b6a97)ので`brew`ではインストールしていない。が、`pyenv`では、今のところ`3.4.1`をダウンロード出来ないので、仕方なく`3.4-dev`を選択している。

### ソースコードのダウンロード

`$GOPATH`配下で、ソース(`limetext/lime/frontend` / `limetext/lime/backend`)からGoのCLI経由でダウンロード。

```bash
$ go get github.com/limetext/lime/frontend/
$ go get github.com/limetext/lime/backend/
```

サブモジュール群を準備する。このステップちょっと時間かかる。

```bash
$ cd $GOPATH/src/github.com/limetext/lime
$ git submodule update --init
```