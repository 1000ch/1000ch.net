---
layout: post
title: cgoでGoのコードからCの関数を利用する
date: 2014-10-09
---

# cgoでGoのコードからCの関数を利用する

Goの練習がてらコマンドラインツールを書いている最中に詰まったので作業ログとして残す。

Goでコマンドラインのインターフェースを実装するには、`os`や`flag`等のデフォルトライブラリ群でそこそこ簡単に作れるけど、今回やりたいことに「Cで書かれたバイナリをGoから利用したい」というものがあった。
同じことをNode.jsでやろうとするなら、スクリプトを含めたパッケージ群としてnpmで配布することが可能なので、`postinstall`あたりで **都度ソースコードをダウンロードしコンパイル** 、あるいは **コンパイル済みバイナリをダウンロード** くらいで良かった。以下Node.jsの例。

- https://github.com/imagemin/pngcrush-bin
- https://github.com/imagemin/jpegoptim-bin

Goの場合はどうだろう。

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/1000ch">@1000ch</a> linkすればいいんじゃないかな。Cのライブラリみたいに</p>&mdash; すぎもと@ (@sugimoto1981) <a href="https://twitter.com/sugimoto1981/status/517631315563122688">2014, 10月 2</a></blockquote>

色々ググっててもcgoというワードが出てくるけど、これはgoのコンパイラでcのプログラムも一緒にコンパイルするみたい。詳しい内部処理わからないけど、GoからコンパイルされたバイナリとCからコンパイルされたバイナリをリンクという処理は見えない。表面上は。

- [Command cgo - The Go Programming Language](http://golang.org/cmd/cgo/)
- [C? Go? Cgo! - The Go Blog](http://blog.golang.org/c-go-cgo)

## cgoを使ったミニマルな例

`main.c`と`main.go`というファイル名で用意。

```c
#include <stdio.h>

void
func_to_export(const char* message) {
  printf("(✌՞ټ՞)✌ %s!!!\n", message);
}
```

```go
package main

/*
#include <stdlib.h>
extern void func_to_export(const char*);
*/
import "C"
import "unsafe"

func main() {
  p := C.CString("lorem ipsum")
  defer C.free(unsafe.Pointer(p))
  C.func_to_export(p)
}
```

このくらい単純なら僕でもわかるんだけど、やりたいのは既存のcで書かれたライブラリを`go build`でコンパイル。

## jpegoptimをGoでラップしたい

- https://github.com/tjko/jpegoptim

本当は画像をアレするライブラリを全てまとめたものを作るという大いなる野望を持っているけど、いきなりは無理なのでまずは単一ライブラリをラップするところから。
CとMakefileのお作法が絡みまくっており、このラップ作業ですらさっぱりわからなくて、多方面にご教授頂きました（特に[@vitaminless](https://twitter.com/vitaminless)氏には大部分のデバッグを助けていただきましたorz）。

### アーカイブファイルを作る

jpegoptimそのものはもちろんそれだけで実行可能形式にコンパイル可能だが、`.o`ファイルをくっつけた`.a`ファイルを出力するビルドが用意されていない。
なので`libjpegoptim.a`というアーカイブファイルを生成するビルドをMakefile中に追加したい。具体的には以下の3行を然るべきところに追加するパッチファイルを作る。

```
PKGLIB = libjpegoptim.a
$(PKGLIB): $(OBJS)
  ar crsv $(PKGLIB) $(OBJS)
```

```bash
$ diff -u jpegoptim/Makefile Makefile-updated > Makefile.patch
```

で、このパッチを適用する処理をGoラッパー側のMakefileに追加した。

```bash
$ patch -u jpegoptim/Makefile < Makefile.patch
```

### `jpegoptim.c`のmain関数の削除

また、今回はGoラッパーを作るので、Go側にmain関数が必要だが、そのままだとjpegoptim側のmain関数とバッティングしてコンパイルができなくなる。
そのため、`jpegoptim.c`のmain関数を削除する処理が必要になるが、こちらもGoラッパー側のMakefileに追加しておく。

```bash
$ sed -e "287,854d" jpegoptim/jpegoptim.c
```

っていう雑なことをしていたら精神衛生的に汚されてきたので、こちらもパッチを作った。

```bash
$ patch -u jpegoptim/jpegoptim.c < jpegoptim.c.patch
```

### 出来上がったMakefile

このGo側のmain関数に何も処理を書いていない時点で、ひとまずコンパイルまでは通せるようになった。

```
GO=go
REPO=git@github.com:tjko/jpegoptim.git
SRC=jpegoptim-src

default: patch build

$(SRC):
  # prepare source
  @mkdir $(SRC)
  @git clone $(REPO) $(SRC)

build: $(SRC) jpegoptim.go
  # make
  @cd $(SRC);make libjpegoptim.a

  # build
  @$(GO) build jpegoptim.go

patch: $(SRC)
  # configure
  @cd $(SRC);./configure --prefix=`pwd`/local

  # apply patch to jpegoptim/Makefile
  @patch -u $(SRC)/Makefile < Makefile.patch

  # apply patch to jpegoptim/jpegoptim.c
  @patch -u $(SRC)/jpegoptim.c < jpegoptim.c.patch

.PHONY: patch build
```

## 削除したC側のmain関数

コマンドラインのインターフェースと最適化実行部分がmain関数内にがっちり書かれていたので、今度はこれをどうにかしなければならならず、しばし考える。
jpegoptimのmain関数で行っている処理をGoで再実装しようとも考えたけど、長いし、一部だけexternするというのも微妙かと考え、main関数をリネームしGo側のmain関数からコールすることに。
それに応じて、`jpegoptim.c.patch`も、`main()`の削除ではなく`jpegoptim_main()`とリネームするように作りなおす。

`jpegoptim_main()`とリネームしたCのmain関数を、`jpegoptim.go`内でexternする。
その上で、Goで受け取るコマンドライン引数を`jpegoptim_main()`にそのまま受け渡すことに。

```go
func main() {
  var argc C.int
  var argv []*C.char

  argc = C.int(len(os.Args))
  argv = make([]*C.char, argc)
  for i, arg := range os.Args {
    argv[i] = C.CString(arg)
  }

  C.jpegoptim_main(argc, (**C.char)(&argv[0]))
}
```

そのままだと渡せないので、Goの型をCの型に変換している。Goの`os.Args`のそれぞれを`*C.char`にするのは正攻法で良さそうだけど、
ポインタのポインタに変換どうすればいいのこれというところで、[Cgo の基本的な使い方とポインタ周りのTips (Go v1.2)](http://r9y9.github.io/blog/2014/03/22/cgo-tips/)というエントリに助けてもらった。
ここでやりたい、「`[]*C.type`から`**type`へのキャストができる」ということがずばり書いてある。先人の力は偉大だ。

## go-jpegoptim

一応動く形になったものがこちら。

- https://github.com/1000ch/go-jpegoptim

ビルドはリポジトリをクローンして、`make`すれば実行可能バイナリ作成までされる。Goのv1.3.2で確認済み。

## 所感

終わってみればGoのコードは殆どなくなってしまったわけだけど、何かの足しになればと思って記事として残す。
今のところはCLIツールを書くにもNode.jsのほうがお手軽感あるし、漠然とバイナリのほうが速いだろうと思っている実行速度もどこまで差が出るのかわからない。
お手軽云々に関しては慣れの問題もあるだろうから、コレを期に、今までNode.jsで書いていたようなWebアプリもGoで書くようにしようかな。実行速度に関してはまた今度。

以下お世話になった資料です。

Cのmain関数をGo側に移植しようと頑張ってた最中

- [Go言語でコマンドラインオプションを扱う](http://tdoc.info/blog/2013/04/11/go_flag.html)
- [Go言語でコマンドライン引数を取り扱う](http://uokada.hatenablog.jp/entry/2013/08/13/011203)
- [ʕ　 ﾟ皿ﾟ ʔ Golangからv8を使う](http://yuroyoro.hatenablog.com/entry/2014/06/11/180801)
- [Package filepath - The Go Programming Language](http://golang.org/pkg/path/filepath/)

諦めた辺あたりから

- [Cgo の基本的な使い方とポインタ周りのTips (Go v1.2)](http://r9y9.github.io/blog/2014/03/22/cgo-tips/)

## 余談

関係ないけど、Gopherって架空マスコットかと思ったら[実在する動物](http://ejje.weblio.jp/content/Gopher)なのね…知らなかった_:(´ཀ`」 ∠):

<img src='/img/posts/c-in-golang-with-cgo/gopher.jpg'>

> via https://www.flickr.com/photos/103509254@N05/14859452109