---
title: Go で Node.js のバージョンマネージャを自作した
date: 2018-10-16
---

[1000ch/nd](https://github.com/1000ch/nd) という Node.js のバージョンマネージャを Go で書いた。車輪の再発明もいいところで、特に今使っているバージョンマネージャから切り替えるメリットは今の所ない。ただの作業ログです、悪しからず。

## それっぽいモチベーション

Go は Windows、macOS、Linux といった環境へのクロスコンパイルができることと、実行できるシングルバイナリを配布するだけでランタイムへ依存しなくて済む、この2点で選んだ。

作ったあとに [@hokaccha](https://twitter.com/hokaccha) とした答え合わせで、`PATH` の通し方については少々議論になった。今回作ったツールは Node.js のアーカイブファイルをダウンロードして展開し、あらかじめ通しておいたパスから `node` にシンボリックリンクを作るだけの単純な実装である。

代表的な既存ツールは以下のような実装になっている。

- [nodenv/nodenv](https://github.com/nodenv/nodenv): `~/.nodenv/shim/node` を起点に実行する Node.js を探索する
- [hokaccha/nodebrew](https://github.com/hokaccha/nodebrew): パスが通った場所から、対象の Node.js へシンボリックリンクを作成する
- [creationix/nvm](https://github.com/creationix/nvm): `PATH` を変更して対象の Node.js へパスを通す

`nodenv` は `rbenv` のフォークで、グローバルの `node` のパスを変更できるだけでなく、カレントディレクトリの `.node-version` を参照して実行する Node.js を切り替えできる。高機能で良いが、 `.node-version` でバージョンを固定して運用するには関わる人全てのバージョンマネージャを揃える必要があったりして、中々難しい部分もある。

`nvm` の `PATH` を変更する方式は、なかなか痒い部分があるのと、[欲しい機能があるならフォークして使ってくれというスタンス](https://github.com/creationix/nvm/wiki/NVM-Forks)なので、ツールとして微妙さを感じている。

思想や作りは `nodebrew` と最も似ていて、記述言語が違うくらい。

## クロスコンパイルについて

Go を選んだ割に、Windows や Linux でのテストをどうしようか考え中なので、まだクロスコンパイル環境は整えている最中である。経緯や概要は [Go のクロスコンパイル環境構築](https://qiita.com/Jxck_/items/02185f51162e92759ebe)で抑えたが、状況は改善されているようで、go のインストール時に `--with-cc-all` オプションが不要になっていたり、クロスコンパイルに追加で必要だったツールが不要になっている。

引き続きポイントになるのは [`GOOS` と `GOARCH` という2つの環境変数](https://golang.org/doc/install/source#environment)で、 `go build` 時にこれらが参照されることで各種環境向けのバイナリが出力される。これを踏まえて、クロスコンパイルにはいくつか方法がある。

- [nikuyoshi/build-crosscompile-env.sh](https://gist.github.com/nikuyoshi/a6c92119c59144d472ef): `GOOS` と `GOARCH` を切り替えながら `go build` するシェルスクリプト
- [mitchellh/gox](https://github.com/mitchellh/gox): `gox` コマンドだけでクロスコンパイルしてくれるコマンドラインツール
- [laher/goxc](https://github.com/laher/goxc): `goxc` コマンドでクロスコンパイルするだけでなく、zip アーカイブやバージョンニングなどもサポートしている高機能なコマンドラインツール

よくできていて使いやすいが、先の通り Windows や Linux 向けビルドは検討中なので、結局 `Makefile` で最小限のビルドをするに留めた。

```makefile
.PHONY: prepare build zip clean
all: prepare build zip clean

prepare:
	mkdir nd_darwin_amd64

build:
	env GOOS=darwin GOARCH=amd64 go build -ldflags="-X main.version=$(shell gov)" -o nd_darwin_amd64/nd

zip:
	zip nd_darwin_amd64.zip -r nd_darwin_amd64

clean:
	rm -rf nd_darwin_amd64
```

## nd のインストールと使い方

```bash
# nd をインストールする
$ go get github.com/1000ch/nd

# $HOME/.nd/bin にパスを通す
export PATH=$HOME/.nd/bin:$PATH

# 対象の Node.js をインストールする
$ nd install <version>

# 対象の Node.js をアンインストールする
$ nd uninstall <version>

# 対象の Node.js を有効化する
$ nd use <version>

# インストールされている Node.js を表示する
$ nd list
```

## バージョニングについて

[ysugimoto/gov](https://github.com/ysugimoto/gov) というツールで管理している。

1. `gov init` を実行すると `.versions` という管理ファイルが生成される
2. `gov patch|minor|major` を実行するとバージョンが上がり `git` のタグが作られる
3. `gov` を実行すると最新バージョンを出力する

という、 `npm` と同じような機能を持っている。これを使って `gov` で出力されるバージョンを `-ldflags="-X main.version=$(shell gov)"` という形でビルド時に埋め込んでいる。

## 参考文献

- [proposal: spec: Default / Optional function parameters](https://github.com/golang/go/issues/21909)
- [Goのpathとfilepathでは動作が異なる　Windowsでも正しくパスを扱う](https://qiita.com/kamijin_fanta/items/f66724091b699ee71b08)
- [Big Sky :: バイナリ一つで zip, tar.gz, tar.bz2, tar.xz が開けるコマンド「archiver」(と go1.8 への対応方法)](https://mattn.kaoriya.net/software/lang/go/20161202095532.htm)
- [Big Sky :: ダウンロードの進捗プログレスバー実装は可能か](https://mattn.kaoriya.net/software/lang/go/20170622160723.htm)
- [tcnksm/ghr - Upload multiple artifacts to GitHub Release in parallel](https://github.com/tcnksm/ghr)
- [Go のクロスコンパイル環境構築](https://qiita.com/Jxck_/items/02185f51162e92759ebe)
- [init関数のふしぎ #golang](https://qiita.com/tenntenn/items/7c70e3451ac783999b4f)
