---
title: デザイナー向け開発環境セットアップガイド
date: 2019-01-31
---

# デザイナー向け開発環境セットアップガイド

社内のデザイナー向けに書いた資料があったが、読み返していたら社内専用という内容でもなかったので、社外向けに公開してみる。opinionated な部分があるのはご了承いただきたい。

## 1. macOS のアプリ

紹介するのは コマンドラインインターフェースとして iTerm と、テキストエディタとして Visual Studio Code である。より AI ファーストなエディタとして Cursor などもあるが、今回は割愛する。

### 1.1. [iTerm2](https://www.iterm2.com/)

標準のターミナルアプリも良いが、色々痒いところに手が届く機能が備わっているので、[iTerm2](https://www.iterm2.com/) を推奨する。

#### 1.1.1. フォントを変えたい

ダサくてテンションが上がらない人は、まず iTerm のフォントを **Profiles** > **Text** > **Change Font** から、好みの等幅フォントに変更して欲しい。macOS にプリインストールされているものであれば、`menlo` あたりが良い。

#### 1.1.2. カラースキーマを変えたい

ダサくてテンションが上がらない人は、カラースキーマも変えると良い。iterm2 のカラースキーマは [MartinSeeler/iterm2-material-design](https://github.com/MartinSeeler/iterm2-material-design) 等で配布されている。

#### 1.1.3. もうちょっとオシャレにしたい

ダサくてテンションが上がらない人は、テーマも変えてみると良い。

- [robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
- [sorin-ionescu/prezto](https://github.com/sorin-ionescu/prezto)
- [sindresorhus/pure](https://github.com/sindresorhus/pure)

ここでは [pure](https://github.com/sindresorhus/pure) を Homebrew 経由でインストールする。

```sh
brew install pure
```

zsh の人は `~/.zshrc` に以下を追加する。

```sh
# .zshrc
autoload -U promptinit; promptinit
prompt pure
```

### 1.2. [Visual Studio Code](https://code.visualstudio.com/)

どんなエディタでも構わないが、「まだエディタをインストールしてない…」ということであれば、[Visual Studio Code](https://code.visualstudio.com/) が良い。

## 2. ターミナルで使うもの

iTerm2 を起動して、色々なツールをインストールしていく。Homebrew をインストールして、Git や Node.js を使っていくための nodenv のインストール方法を含む。

### 2.1. [Homebrew](https://brew.sh/ja)

[Homebrew](https://brew.sh/ja) は macOS のアプリケーションマネージャである。Sketch でいう Sketchpacks のようなものだ。

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Homebrew をインストールすると、 `brew` コマンドが使えるようになる。

### 2.2. Git

システム標準の Git でも構わないが、その後のアップデートなどを考えると Homebrew で配布されている Git を推奨する。

```sh
brew install git
```

Git をインストールすると、 `git` コマンドが使えるようになる。

### 2.3. nodenv

[`nodenv`](https://github.com/nodenv/nodenv) は Node.js のバージョンマネージャ、つまり Node.js をインストールするためのツールである。Sketch でいう Sketchpacks のようなものだ。

```sh
brew install nodenv
```

bash の人は `~/.bash_profile` に、zsh の人は `~/.zprofile` に以下を追加する。

```sh
eval "$(nodenv init -)"
export PATH="$HOME/.nodenv/bin:$PATH"
```

nodenv をインストールすると、 `nodenv` コマンドが使えるようになる。

### 2.4. Node.js

Node.js はファイルシステムを使える JavaScript の実行環境である。先程インストールした `nodenv` を使ってインストールする。

```sh
nodenv install 20.11.1
nodenv global 20.11.1
```

Node.js をインストールすると、 `node` コマンドと `npm` コマンドが使えるようになる。

```sh
node -v
npm -v
```

でバージョンが表示されたら完璧だ。 `console.log('hello');` と書いて `foo.js` で保存して、 `node foo.js` で実行すれば、 `hello` が出力される。

## 3. GitHub にある Git リポジトリをクローンする

GitHub にある Git リポジトリとの対話に必要な認証を、SSH キーを使って認証する。 `https` で ID/PW を使って認証することもできるが、都度認証を必要とすることや、アプリケーションへの保存を要求されることもあり、個人的には推奨しない。

### 3.1. SSH キーを生成する

以下のコマンドを実行すると、SSH キーの生成が始まる。メールアドレスは個人のものに変更して実行する。

```sh
ssh-keygen -t ed25519 -C "shogosensui@gmail.com"
```

実行後、以下のように保存先を聞かれる。

```sh
Enter a file in which to save the key (/Users/1000ch/.ssh/id_ed25519): [Press enter]
```

今から生成しようとしている SSH キーは GitHub とやりとりするものなので、ここではデフォルトの `id_ed25519` ではなく `github_ed25519` としておくことを提案する。つまり `/Users/1000ch/.ssh/github_ed25519` を入力して、実行する。

実行すると、 `/Users/1000ch/.ssh/` フォルダに `github_ed25519` と `github_ed25519.pub` というファイルが生成される。`ls ~/.ssh/` 等を実行すると、生成されたファイルを確認できる。

### 3.2. SSH キーの公開鍵を GitHub に登録する

生成した鍵ペアのうち、 `github_ed25519.pub` の内容を GitHub に登録する。[SSH and GPG keys](https://github.com/settings/keys) から **New SSH key** をクリックすると、入力フォームが表示される。 `cat ~/.ssh/github_ed25519.pub` の結果をコピーするか、以下のコマンドでコピーできる。

```sh
pbcopy < ~/.ssh/github_ed25519.pub
```

**Title** には、どの公開鍵を登録したかわかる名前を入れておく。例えば **Personal MacBook Pro** 等だとわかりやすいが、好みの名前で良い。

### 3.3. `github.com` とのやりとりに SSH キーを指定する

`github.com` との SSH 時に生成した SSH キーを使うように指定する。 `~/.ssh/config` というファイルで指定するが、ない場合は `touch ~/.ssh/config` を実行してファイルを作ること。 `~/.ssh/config` には以下の内容を保存する。

```sh
Host github.com
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/github_ed25519
```

### 3.4. Git リポジトリをクローンする

`git clone [Git リポジトリの url]` でクローンできる。

```sh
git clone git@github.com:user-name/repo-name.git
```
