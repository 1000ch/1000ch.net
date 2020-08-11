---
layout: post
title: デザイナーさん向け開発環境セットアップガイド
date: 2019-01-31
---

# デザイナーさん向け開発環境セットアップガイド

社内のデザイナーさん向けに書いた資料があったが、読み返していたら特に社内専用という内容でもなかったので、社外向けに公開してみる。やや opinionated な部分があるのはご了承ください。

## 1. macOS のアプリ

紹介するのは iTerm と Visual Studio Code です。

### 1.1. [iTerm 2](https://www.iterm2.com/)

標準のターミナルアプリも良いんですが、色々痒いところに手が届く機能が備わっているので、こちらがオススメです。

#### 1.1.1. フォントを変えたい

ダサくてテンションが上がらない人は、まず iTerm のフォントを変えることをオススメします。好みの等幅フォントを **Profiles** > **Text** > **Change Font** から変えてください。macOS にプリインストールされているものだと、 `menlo` あたりが良いかもしれません。

#### 1.1.2. カラースキーマを変えたい

ダサくてテンションが上がらない人は、カラースキーマも変えると良いかもしれません。

- [MartinSeeler/iterm2-material-design](https://github.com/MartinSeeler/iterm2-material-design)

#### 1.1.3. もうちょっとオシャレにしたい

ダサくてテンションが上がらない人は、テーマも変えてみると良いです。わからなければエンジニアを捕まえてインストールしましょう。

- [robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
- [sorin-ionescu/prezto](https://github.com/sorin-ionescu/prezto)
- [sindresorhus/pure](https://github.com/sindresorhus/pure)

### 1.2. [Visual Studio Code](https://code.visualstudio.com/)

どんなエディタでも構いませんが、「まだエディタをインストールしてない…」ということであれば、これが良いと思います。

## 2. ターミナルで使うもの

iTerm を起動して、色々なツールをインストールしていきます。Homebrew をインストールして、Git や Node.js を使っていくための nodenv のインストール方法を含んでいます。

### 2.1. [Homebrew](https://brew.sh/index_ja)

macOS のアプリケーションマネージャです。Sketch でいう Sketchpacks みたいなやつです。

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Homebrew をインストールすると、 `brew` コマンドが使えるようになります。

### 2.2. Git

システム標準の Git じゃないほうが良さげ。

```sh
brew install git
```

Git をインストールすると、 `git` コマンドが使えるようになります。

### 2.3. nodenv

Node.js のバージョンマネージャ、つまり Node.js をインストールするためのツールです。Sketch でいう Sketchpacks みたいなやつです。

```sh
brew install nodenv
```

bash の人は `~/.bash_profile` に、zsh の人は `~/.zprofile` に以下を追加します。

```sh
eval "$(nodenv init -)"
export PATH="$HOME/.nodenv/bin:$PATH"
```

nodenv をインストールすると、 `nodenv` コマンドが使えるようになります。

### 2.4. Node.js

ファイルシステムを使える JavaScript の実行環境です。色んな所で使います。先程インストールした `nodenv` を使ってインストールします。

```sh
nodenv install 14.7.0
nodenv global 14.7.0
```

Node.js をインストールすると、 `node` コマンドと `npm` コマンドが使えるようになります。

```sh
node -v
npm -v
```

でバージョンが表示されたらバッチリです。 `console.log('hello');` と書いて `foo.js` で保存して、 `node foo.js` で実行すれば、 `hello` が出力されます。

## 3. GitHub にある Git リポジトリをクローンする

GitHub にある Git リポジトリとの対話に必要な認証を、SSH キーを使って認証します。 `https` で ID/PW を使って認証することもできますが、都度認証を必要とすることや、アプリケーションへの保存を要求されることもあり、個人的にはオススメしません。

### 3.1. SSH キーを生成する

以下のコマンドを実行すると、SSH キーの生成が始まります。メールアドレスは自分のものに変更してください。

```sh
ssh-keygen -t rsa -b 4096 -C "shogosensui@gmail.com"
```

実行後、以下のように保存先を聞かれます。

```sh
Enter a file in which to save the key (/Users/1000ch/.ssh/id_rsa): [Press enter]
```

今から生成しようとしている SSH キーは GitHub とやりとりするものなので、デフォルトの `id_rsa` ではなく、 `github_rsa` としておくことをオススメします。つまり `/Users/1000ch/.ssh/github_rsa` を入力して、実行します。

実行すると、 `/Users/1000ch/.ssh/` フォルダに `github_rsa` と `github_rsa.pub` というファイルｆが生成されます。　`ls ~/.ssh/` 等で確認してみてください。

### 3.2. SSH キーの公開鍵を GitHub に登録する

生成した鍵ペアのうち、 `github_rsa.pub` の内容を GitHub に登録します。[SSH and GPG keys](https://github.com/settings/keys) から **New SSH key** をクリックすると、入力フォームが表示されます。 `cat ~/.ssh/github_rsa.pub` の結果をコピーするか、以下のコマンドでコピーできます。

```sh
pbcopy < ~/.ssh/github_rsa.pub
```

**Title** には、どの公開鍵を登録したかわかる名前を入れておくと良いです。例えば **Personal MacBook Pro** とかだとわかりやすいですが、お好きな名前を。

### 3.3. `github.com` とのやりとりに SSH キーを指定する

`github.com` との SSH 時に生成した SSH キーを使うように指定します。 `~/.ssh/config` というファイルにその指定を書きますが、ない場合は `touch ~/.ssh/config` を実行してファイルを作ってください。 `~/.ssh/config` には以下の内容を保存します。

```sh
Host github.com
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/github_rsa
```

### 3.4. Git リポジトリをクローンする

`git clone [Git リポジトリの url]` でクローンできます。

```sh
git clone git@github.com:user-name/repo-name.git
```

## 5. プロジェクトを起動する

### 5.1. クローンして移動する

プロジェクトが [github.com/user-name/repo-name](https://github.com/user-name/repo-name) で管理している場合、この Git リポジトリをクローンして、iTerm2 でリポジトリ配下に移動してください。

```sh
cd user-name/repo-name
```

### 5.2. 依存パッケージをインストールする

このプロジェクトに限りませんが、昨今の Web アプリケーションは Node.js を使ってビルドしたり実行したりすることが多いです。こうしたプロジェクトには `package.json` という設定ファイルがあり、そのファイルがある場所で `npm install` を実行すると、そのプロジェクトで依存しているパッケージを `node_modules` フォルダにダウンロードします。 `node_modules` フォルダを削除しても、 `npm install` を実行すればまたダウンロードできます。

```sh
npm install
```

### 5.3. プロジェクトを起動する

`npm install` したあとであれば、 `npm run dev` コマンドを実行するだけでローカル環境を起動できます。その他に細かな設定が必要な場合もありますが、例えば Vue.js + Nuxt のプロジェクトであれば、 `package.json` の scripts に `npm run dev` コマンドが定義されているはずなので、実行すれば起動できるはずです。

```sh
npm run dev
```
