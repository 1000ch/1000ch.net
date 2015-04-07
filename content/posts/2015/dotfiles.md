---
layout: post
title: dotfilesを整理した
date: 2015-04-05
---

# dotfilesを整理した

久々にdotfilesを整理した。黒い画面に長けているわけではないので、然程モリモリしているというわけではないけど、だいぶダイエットできた。

## Dropbox管理をやめてGitHubのリポジトリに

Dropboxにdotfilesを配置して、それらに対してシンボリックリンクを貼ることで設定を共有していたが、gitのリポジトリにした。これで、設定をGitHubで見れるし、変遷もコミット履歴を辿ればOK。

- [1000ch/dotfiles](https://github.com/1000ch/dotfiles)

dotfilesリポジトリをユーザールート（`~/dotfiles`）に置くことにして、次のような感じでシンボリックリンクを貼るのは同じ要領。これは`setup.sh`に書いておく。

```bash
$ ln -s ~/dotfiles/.vimrc ~/.vimrc
$ ln -s ~/dotfiles/.zshrc ~/.zshrc
$ ln -s ~/dotfiles/.zprofile ~/.zprofile
$ ln -s ~/dotfiles/.gitconfig ~/.gitconfig
$ ln -s ~/dotfiles/.gemrc ~/.gemrc
```

実際にこの設定を使うには、リポジトリを`~/dotfiles`にクローンして、`setup.sh`を実行するだけ。

```bash
$ git clone git@github.com:1000ch/dotfiles.git ~/dotfiles --recursive
$ sh ~/dotfiles/setup.sh
```

## oh-my-zshをサブモジュール化

[oh-my-zsh](http://github.com/robbyrussell/oh-my-zsh) + [oh-my-zsh-powerline-theme](http://github.com/jeremyFreeAgent/oh-my-zsh-powerline-theme)ユーザーなので、それらのリポジトリを適当な場所にクローン・インストールしていたが、git管理に伴いサブモジュール化した。場所が`~/dotfiles/oh-my-zsh`といったように決まることで迷わないし、更新も自動で出来る。

```bash
$ git submodule add git@github.com:robbyrussell/oh-my-zsh.git
$ git submodule add git@github.com:jeremyFreeAgent/oh-my-zsh-powerline-theme.git
```

dotfilesリポジトリの`git clone`時はサブモジュールもダウンロードさせるために`--recursive`もつけること。

`setup.sh`にサブモジュール化したoh-my-zshとpowerlineテーマを有効化させるために以下のコマンドを`setup.sh`に書いておく。

```bash
# set up oh-my-zsh
~/dotfiles/oh-my-zsh/tools/install.sh | ZSH=~/dotfiles/oh-my-zsh sh

# create hard-link to oh-my-zsh-powerline-theme from oh-my-zsh/themes
ln -f ~/dotfiles/oh-my-zsh-powerline-theme/powerline.zsh-theme ~/dotfiles/oh-my-zsh/themes/powerline.zsh-theme
```

## ドットファイルの更新

クローンしてきた`~/dotfiles`リポジトリ内にあるファイルを更新して、そのまま変更をコミットすればOK。設定を共有している他の環境で`git pull`することでそのまま適用できる。

## 各種バージョンマネージャ

Node.jsはnvm、Rubyはrbenv+ruby-build、Pythonはpyenvを使っているので、以下を`setup.sh`に追加。

```bash
# install nvm
git clone https://github.com/creationix/nvm.git ~/.nvm

# install rbenv & ruby-build
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

# install pyenv
git clone https://github.com/yyuu/pyenv.git ~/.pyenv
```

`.zprofile`に以下を追加し、パスを通す。

```sh
# nvm
[ -s $HOME/.nvm/nvm.sh ] && . $HOME/.nvm/nvm.sh

# rbenv
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# pyenv
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

## エイリアスとかファンクション

[mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles)を参考に使いそうなものを置いてあったんだけど、常用していないしので、一旦全部消した。gitもエイリアス使わずにやってる。よほど使用頻度が高いモノが出てきたら、それはまたその時に。