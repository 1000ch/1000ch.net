---
layout: post
title: cgoでgoのコードからCの関数を利用する
date: 2014-10-05
description: 
---

# cgoでgoのコードからCの関数を利用する

Goの練習がてらコマンドラインツールを書いている最中に詰まったのでメモ。

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

## 余談

関係ないけど、Gopherって架空マスコットかと思ったら[実在する動物](http://ejje.weblio.jp/content/Gopher)なのね…知らなかった_:(´ཀ`」 ∠):

<img src='/img/posts/c-in-golang-with-cgo/gopher.jpg'>

> via https://www.flickr.com/photos/103509254@N05/14859452109
