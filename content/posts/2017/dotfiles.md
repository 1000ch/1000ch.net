---
title: ghqとpecoを使ったリポジトリの管理またはコマンドラインの話
date: 2017-05-23
image: /img/posts/2017/dotfiles/ghq-peco.gif
---

# ghqとpecoを使ったリポジトリの管理またはコマンドラインの話

ghqとpecoを使ったプロジェクト管理が便利なのは真新しくないが、コマンドラインを見られて質問されたこともあり、自分の運用方法などを記しておく。

- [ghq: リモートリポジトリのローカルクローンをシンプルに管理する - 詩と創作・思索のひろば](http://motemen.hatenablog.com/entry/2014/06/01/introducing-ghq)
- [peco、ghq、gh-openの組み合わせが捗る - Webtech Walker](http://webtech-walker.com/archive/2014/06/peco-ghq-gh-open.html)

## ghqを使ってgitプロジェクトを管理する

[motemen/ghq](https://github.com/motemen/ghq) はクローンした git リポジトリを管理する Go 製のコマンドラインツール。

```bash
# Homebrewでghqをインストールする
$ brew install ghq

# リポジトリをクローン
$ ghq get git@github.com:1000ch/grd.git
$ ghq get 1000ch/grd

# ghqでクローンしたリポジトリのリスト表示
$ ghq list -p
```

他にも機能はあるが、リポジトリのクローンやリスト表示を、カレントディレクトリを選ばずに実行できるだけでもありがたいツール。

クローン先はデフォルトで `~/.ghq` だが、 `.gitconfig` の `[ghq]` で指定できる。なので、 `~/dev` にリポジトリをクローンしているのであれば `git config --global ghq.root ~/dev` を実行すればそのまま移行できるし、今の Go 環境をシームレスに使いたければ `$GOPATH/src` でも良さそう。

```ini
[ghq]
  root = ~/dev
```

## ghqをpecoと連携する

[peco/peco](https://github.com/peco/peco) は入力をインタラクティブにフィルタリングするツール。同種のツールで Python 製の [mooz/percol](https://github.com/mooz/percol) があるが、peco は Go 製なので単一バイナリで動いてくれるのがありがたい。

```bash
# Homebrewでpecoをインストールする
$ brew install peco
```

`ghq list -p` で ghq で管理している git リポジトリのパスがリスト化されるが、 これを peco に `ghq list -p | peco` のようにパイプ渡せば入力値に応じてリポジトリを雑に絞れる。

![](/img/posts/2017/dotfiles/ghq-peco.gif)

これを利用して `cd $(ghq list -p | peco)` のようにすれば、ghq で管理している git リポジトリへ、カレントディレクトリに関わらず移動できる。

peco は超汎用的なツールで、ghq との連携以外にも便利な場面が山ほどあるので、[その他の活用方法](http://b.hatena.ne.jp/lestrrat/peco/)もどうぞ。

## aliasやfunctionで更に便利に

毎回 `ghq list -p | peco` を打つのは面倒なので、当然エイリアスを作成する。ここまでを応用し、更に git リポジトリの Web ページを開く [`typester/gh-open`](https://github.com/typester/gh-open) と連携すると次のようになる。

```bash
alias repos='ghq list -p | peco'
alias repo='cd $(repos)'
alias github='gh-open $(repos)'
```

また、各種エディタの起動もコマンドラインからやりたい。自分の場合は `sublime` コマンドで、[Sublime Text](https://www.sublimetext.com/) を起動する設定をしている。

```bash
function get_target_repo() {
  if [ $# -eq 1 ]; then
    echo $1
  else
    echo $(repos)
  fi
}

function sublime() {
  open -a Sublime\ Text $(get_target_repo $1)
}
```

これで `sublime` だけを打ち込めば、ghq で一覧されるリポジトリを peco で絞りつつ、選択したリポジトリを Sublime Text で開くし、 `sublime .` を実行すればカレントディレクトリを Sublime Text で開く。

捗る。
