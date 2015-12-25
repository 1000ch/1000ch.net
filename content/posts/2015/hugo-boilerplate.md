---
layout: post
title: Hugo Boilerplate
date: 2015-03-22
---

# Hugo Boilerplate

[Hugo](http://gohugo.io/)の[ドキュメンテーション](http://gohugo.io/overview/introduction/)はとても充実していて良いのだが、最小構成がそもそも小さいのでコードレベルで把握してしまったほうがわかりやすい可能性がある。

[1000ch/hugo-boilerplate](https://github.com/1000ch/hugo-boilerplate)は、Hugoの主な機能を最小限の形にまとめたリポジトリ。

## HugoのインストールとHugo Boilerplateの利用

HugoはHomebrewでインストール。既にインストールしてある場合はアップデートすること。

```bash
$ brew install hugo
$ brew update
```

インストールしたらリポジトリをクローンして、`npm start`するだけ。

```bash
$ git clone git@github.com:1000ch/hugo-boilerplate.git
$ cd hugo-boilerplate
$ npm start
```

`npm start`は`hugo server --watch`のエイリアスで、実行されると[localhost:1313](http://localhost:1313)で表示できる。`--watch`オプションでファイルを監視しているので、更新があるとリアルタイムにビルドが実行される。

## ファイル構成

Hugo Boilerplateのファイル構成は以下のようになっている。[Source Organization](http://gohugo.io/overview/source-directory/)に詳細がのっている。

### content・layouts・staticフォルダ

contentとlayoutsはその名の通りコンテンツとそれをレイアウトするファイルを配置するフォルダ。

content配下にサンプルのMarkdownをいくつか置いてあるが、`content/archives/sample-post.md`であれば `[DocumentRoot]/archives/sample-post.html` に変換される。

layoutsにはarchives・indexes・partialsフォルダがあるが、大枠を構成しているのは`archives/single.html`というファイルで、先ほどのcontent/archives配下のMarkdownファイルはこちらをレイアウトとして利用する。また、_defaultフォルダに同じく`single.html`を作れば、明示的にレイアウトファイルを用意しない場合に参照される。

partialsフォルダには共通となるHTMLを切り出して、`archives/single.html`からインクルードしている。indexesフォルダには`archives.html`があるが、これは`content/archives`配下のコンテンツを列挙する命名規則。

staticフォルダにはCSSやJSのような静的ファイルを配置する。

### 各種設定ファイル

- `.editorconfig`
- `.gitignore`
- `config.yml` Hugoの設定ファイル。設定すべき項目はおおよそ指定してあるけど、さらなる詳細は[Configuring Hugo](http://gohugo.io/overview/configuration/)
- `readme.md` リポジトリのREADME
- `wercker.yml` [Wercker](http://wercker.com/)の設定ファイル。

この辺は好みに応じて編集すべきファイル。`.editorconfig`がわからない人は[EditorConfigで文字コード設定を共有して喧嘩しなくなる話 | Ginpen.com](http://ginpen.com/2014/12/14/editorconfig/)を見ると良い。

- `package.json`
- `bower.json`
- `gulpfile.js`

Gulpで静的ファイルをビルドし、staticフォルダに配置するようにしている。Hugoの`--watch`もあるので、ターミナルの別タブで`gulp watch`をすると静的ファイル群の監視ができるので、プロジェクトのレイアウトやJSでの構築といった段階では必須になるかも。

## Werckerによる自動デプロイ

Hugoの成果物（ビルド結果）は`_public`フォルダに出力されるので、ホストサーバーにはそれを配置すれば良い。が、GitHub Pagesで運用している場合は[Wercker](http://wercker.com/)を使った運用をオススメしたい。

[Automated deployments with Wercker](http://gohugo.io/tutorials/automated-deployments/)に完璧なドキュメントがあるので割愛するが、`wercker.yml`は作ってあるのでWerckerからGitHubのリポジトリにアクセスするためにGitHubのトークンを作ってジョブに登録するだけ。

これで、masterブランチにpushするとビルド結果が_publicフォルダ配下がgh-pagesブランチにpushされる。
