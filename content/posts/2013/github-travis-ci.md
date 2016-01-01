---
layout: post
title: Travis CIを使ったGitHubプロジェクトの継続的インテグレーション
date: 2013-08-19
---

# Travis CIを使ったGitHubプロジェクトの継続的インテグレーション

今更感が否めないけど、簡単にまとめた。[Travis CI](https://travis-ci.org/)とはなんぞやという方はこちら。[継続的インテグレーション](http://ja.wikipedia.org/wiki/%E7%B6%99%E7%B6%9A%E7%9A%84%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)とはなんぞやという方はこちら。

例えばテストの自動化をして、リファクタリングのしやすい環境を作って、コードの品質向上を継続的に行っていくサイクル。というイメージ。今回はGitHubとTravis CIで自動化を測るけど、Jenkinsでビルド環境を整えて、継続的にデプロイをしていくのもひとつのCIである。

## テスト周りの環境とか

[オレオレライブラリ](https://github.com/1000ch/fluent)にCI環境整えた。mochaでBDDのテストケースを書いて、イベントのバインド周りのテストは`sinon#spy()`を。testem + PhantomJSでそのテストをで実行させるといった流れ。

- [PhantomJS](https://github.com/ariya/phantomjs/)
- [testem](https://github.com/airportyh/testem)
- [mocha](https://github.com/visionmedia/mocha)
- [sinon](http://sinonjs.org/)

mochaのサンプルは[公式ドキュメント](http://visionmedia.github.io/mocha/)がわかりやすい。イベント周りに[Sinon](https://github.com/visionmedia/mocha/wiki/Spies)を。mocha単体だと少しテストしにくいからだけど、その理由については[@hokaccha](http://twitter.com/hokaccha)さんの[スライド](http://hokaccha.github.io/slides/sinonjs/)が非常にわかりやすいのでこちらを見て欲しい。

## サンプルリポジトリと詳しい手順

- [1000ch/travis-ci-scaffold](https://github.com/1000ch/travis-ci-scaffold)

上記を踏まえて最低限のScaffoldを作成した。Travis CIではC++やらJavaやらRubyやらGoやらと、色々な言語に対応しているが、今回はnode.jsを使ったJavaScriptのテストについて。もともとはRubyのためのサービスとして始まったそう。

- [Getting started](http://about.travis-ci.org/docs/user/getting-started/)

## `.travis.yml`

Travis側に自動で認識される設定ファイル。このファイルにTravis CI側から実行される処理を定義します。今回はnode.js経由で行うJavaScriptのテストを定義する。その他のケースでどうするかは公式ドキュメントを見て欲しい。

- [Building a Node.js project](http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/)

こちらは`.travis.yml`のサンプル。

```
language: node_js
node_js:
    - "0.10"
before_script:
    - npm install bower
    - ./node_modules/bower/bin/bower install
script:
    - "npm test"
```

特に指定なくても、`npm test`がデフォルトで実行される。Gruntとかにテストタスクを書いてある場合はそれをscript:の箇所に記述すれば良い。

## `bower.json`

`before_script`はお分かりの通りscriptの前に実行されるコマンドだが、ここではテストライブラリのインストールをbower経由で行うべく、事前にbower自体のインストールと、`bower.json`に定義したテストライブラリをダウンロードしている。npm経由だとnodeとしてパックされたものが落ちてきてしまうので。

また、sinonについてはbowerでもnode用でダウンロードされてしまうようなので、直接指定している。（サンプルリポジトリの[bower.json](https://github.com/1000ch/travis-ci-scaffold/blob/master/bower.json)参照）

## `package.json`

順番が前後するが、`.travis.yml`で実行されるscriptの前に`npm install`が実行される。ここではdevDependenciesにtestemを指定し、scriptsのtestにローカルインストールされるtestemを指定した。

## testem周り

- [airportyh/testem](https://github.com/airportyh/testem)
- [require.js 環境で mocha + expect + testem を使った JavaScript テスト](http://d.hatena.ne.jp/naoya/20130509/1368085935)

`npm install`されて、`package.json`に定義されている`npm test`されて、`./node_modules/testem/testem.js -l PhantomJS ci`が実行されるところまで出来た。testemの設定は`testem.json`に指定する。

なお、testemはrunnerページを作成したりテストライブラリをダウンロードせず（今回bowerで落としてるmochaとかchaiとか）`testem.json`だけの指定でアレコレできるのだけど、sinon等のテストヘルパーが結局必要になったりするなど、カスタムで設定してしまうほうが後々楽だと思う。

```json
{
  "test_page": "./spec/runner.mustache",
  "serve_files": [
    "./src/target.js",
    "./spec/*.js"
  ],
  "launch_in_dev": ["PhantomJS"]
}
```

`test_page`はrunnerページの指定、`serve_files`はrunnerページで扱うファイルを動的に定義。[runner.mustache](https://github.com/1000ch/travis-ci-scaffold/blob/master/spec/runner.mustache)を見てもらうとわかるが、中はHTML構造で、bowerでインストールされているはずのライブラリのロードやmochaの実行を行っている。

## ローカルで実行してみる

Travisで実行されるであろう順にローカルで実行してみる。bowerとかtestemとか、ローカルのグローバルにインストールされているかもしれないが、ここでは敢えて使っていない。

```bash
# bower自体のインストール
$ npm install bower

# bowerでテストライブラリのダウンロード
$ ./node_modules/bower/bin/bower install

# package.jsonの依存関係を解決
# ここではtestemがインストールされる想定
$ npm install .

# testemを実行する
$ ./node_modules/testem/testem.js
```

実行されただろうか。localhostにもサーバーが立ち上がって、mochaの実行結果ページにアクセスできるようになるはず。一度実行されると、ファイルの変更を検知してテストの再実行も自動的に行われるようになる。

## Travis CIの設定をonにする

[ここ](https://travis-ci.org/profile)にアクセスして、travisのCI対象にしたいGitHubリポジトリを **on** にする。あとは、GitHubに対してpushするだけで、その度に`.travis.yml`の設定に沿って処理が実行される。また、Pull Requestされた場合にも自動的にテストが行われる。素晴らしい。

## 所感

今回は`npm test`経由でtestemを実行させているけど、前述のとおりGruntにテストタスクを書いてそちらを実行させても構わない。

ローカルでもテストは実行するけど、TravisみたいなCIと連携させて、漏れ無く自動的にテストできるのは良い。[Testable JavaScript](https://speakerdeck.com/studiomohawk/testable-javascript)の中で触れられていますが、リファクタリングを前提に考えることで躊躇なくソースコードを直すことが出来る。もちろん、テストが網羅されている前提の話ではあるけど。
