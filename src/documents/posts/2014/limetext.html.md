---
layout: post
title: Sublime Textの後継を目指すオープンソースのテキストエディタLime Textを使った感想
date: 2014-12-12
description: Lime TextはSublime Textの後継を目指したオープンソースのテキストエディタ。
---

<blockquote class="twitter-tweet" lang="ja"><p>Lime Textのビルドをしてみた <a href="http://t.co/aKbm2dzOAM">http://t.co/aKbm2dzOAM</a> <a href="http://t.co/6U8Q253gkx">pic.twitter.com/6U8Q253gkx</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/543280276399337473">2014, 12月 12</a></blockquote>

[Lime Text](http://limetext.org/)はSublime Textの後継を目指したオープンソースのテキストエディタ。Goで書かれており、インターフェースはSublime Textとよく似ている。

>Lime Text is a powerful and elegant text editor primarily developed in Go that aims to be a Free and open-source software successor to Sublime Text.

最近はSublime Textの開発もあんまり活発じゃ無さそうだし…ということで使ってみたログ。

## limetextのビルド

バイナリ配布してないので、使うためにはソースコードを入手して、自分でビルドする必要がある。[この辺はWikiに書いてある通り](https://github.com/limetext/lime/wiki/Building)にやっているだけです。

### ビルド時に必要になるライブラリとかのインストール

- [Python 3.4](https://www.python.org/download/releases/3.4.0/)
- [Oniguruma](http://www.geocities.jp/kosako3/oniguruma/index_ja.html)
- Git
- Mercurial
- Go 1.3.3 installed and some familiarity with writing code in Go.

鬼車を久々に目にしたのはさておき、これらをインストールしておく必要がある。MacであればHomebrewあたりが楽。Goの環境については[Go事始め作業ログ](http://qiita.com/1000ch/items/e42e7c28cf7a7b798a02)にメモがあるので、もしかしたら参考になるかも。

```bash
$ brew install pkg-config go mercurial oniguruma python3
```

僕の場合[Pythonは`pyenv`で管理している](http://qiita.com/1000ch/items/93841f76ea52551b6a97)ので`brew`ではインストールしていない。が、`pyenv`では、今のところ`3.4.1`をダウンロード出来ないので、仕方なく`3.4-dev`を選択している。

あと、`PKG_CONFIG_PATH`という環境変数をエクスポートしておく必要がある。

```bash
$ export PKG_CONFIG_PATH=$(brew --prefix python3)/Frameworks/Python.framework/Versions/3.4/lib/pkgconfig
```

`bash`なり`zsh`なりの設定ファイルに追記すると良し。

### ソースコードのダウンロード

`$GOPATH`配下で、GoのCLI経由でソースコードをダウンロード。

```bash
$ go get github.com/limetext/lime/frontend/...
$ go get github.com/limetext/lime/backend/...
```

サブモジュール群を準備する。このステップちょっと時間かかる。

```bash
$ cd $GOPATH/src/github.com/limetext/lime
$ git submodule update --init
```

ひと通り終わって、以下のテストコマンドが通ればOK。

```bash
go test github.com/limetext/lime/backend/... github.com/limetext/lime/frontend/...
```

### 各インターフェースのビルドと実行

termboxの場合は`frontend/termbox`というフォルダに移動して、ビルドすると`termbox`という実行可能ファイルが生成される。これに編集したいファイル名を引数に（`./termbox main.go`のような感じで）実行すると、ターミナル内でエディタが起動する。

```
$ cd $GOPATH/src/github.com/limetext/lime/frontend/termbox
$ go build
$ ./termbox main.go
```

qmlの場合も同様にビルドするが、こちらは[Goの`qml`](https://github.com/go-qml/qml)が事前にインストールされている必要がある。

ビルド後は同様に実行可能ファイルが生成されるので、実行する（`./qml`）と新たにウィンドウが起動する。Qtをキックしているような感じっぽい。

```bash
$ cd $GOPATH/src/github.com/limetext/lime/frontend/qml
$ go build
$ ./qml
```

HTMLインターフェースもあるみたいなんだけど、`go run main.go`後に何をすればいいのかドキュメントに書いていない。`main.go`を覗いてみるとどうやら`8080`ポートにWebアプリとしてホストしている様子。

```bash
$ cd $GOPATH/src/github.com/limetext/lime/frontend/html
$ go run main.go
```

## 感想

今のところどのインターフェースも、デバッグログなのかわからんけどターミナルへの出力が多すぎるせいか、動作が重すぎて話にならなかった。ログ吐かないプロダクションビルドのようなものもあるのかわからないけど、わからなかった。

`termbox`インターフェースは比較的軽かったけど、Sublime Textに一番雰囲気が近いと言えそうな`qml`もQt経由なせいもあり、キビキビ動かない。

と、いうことで、まだ山師用ということになりそうです。100%オープンソースということでどんどん改善されて欲しいナーと希望的観測。