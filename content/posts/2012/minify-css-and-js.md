---
layout: post
title: CSSファイルとJSファイルを最小化してパフォーマンスを向上させる
date: 2012-11-28
---

# CSSファイルとJSファイルを最小化してパフォーマンスを向上させる

転送量削減のためのアプローチについてはgzipの他に、テキストファイルそのものの圧縮がある。これを行うと転送にかかる時間が短くなるだけでなく、ブラウザがJavaScriptを評価する時間や、キャッシュされたときのメモリの削減にも繋がるので、是非実施したい。

## 最小化・最適化

使っていない関数や余分な変数宣言を削除したり、共通化をしっかり行い、冗長なコードを除くこと。cssに関しては構造の最適化までしてくれるcssoというツールがある。ホワイトスペースの除去など一般的な圧縮の他に、ショートハンドで書けるところをショートハンドに変換してくれる。素晴らしい。

- [csso](https://github.com/css/csso) - csso@github
- [CSSOとgrunt-csso](http://t32k.me/mol/log/csso-and-grunt-csso/) - cssoの解説とgruntツール（後述）との連携について

開発中はコメントを適切に書いて、見通しの良いコードを書くべきだが、ブラウザに認識させる段階ではその必要がない。改行コードが取り払われて一行になっていたとしても認識してくれる。そして除かれた余分な文字の分、ユーザーの待ち時間は短くなる。なので、実際にサーバーに置くファイルはminifyすること。

## ローカル環境でminifyする

ここでは代表的なGoogle Closure CompilerとYUI CompressorとUglifyJSの3つを紹介。Google Closure CompilerとYUI CompressorはともにJavaで書かれており、jarファイルをダウンロードしJVMを通して実行する必要がある。UglifyJSはNode.jsで実行されるので、npm経由でインストールする。

- [Google Closure Compiler](https://developers.google.com/closure/compiler/?hl=ja) - Google提供のツール
- [YUI Compressor](http://developer.yahoo.com/yui/compressor/) - Yahoo提供のツール
- [mishoo/UglifyJS](https://github.com/mishoo/UglifyJS) - node.js用のツール

### Google Closure Compilerの場合

「`--js=`」で入力ファイルを、「`--js_output_file`」で出力ファイルを指定。入力順にJSファイルが結合されて、圧縮される。

```sh
$ java -jar compiler.jar --js=input1.js --js=input2.js --js_output_file=out.js
```

### YUIの場合

こちらも入力ファイルと出力ファイルを指定して実行するだけ。

```bash
$ java -jar yuicompressor-x.x.x.jar /path/jsfile.js -o /path/jsfile.min.js
```

### UglifyJSの場合

UglifyJSを`npm`でインストール。

```bash
$ npm install --global uglify-js
```

入力ファイルと出力ファイルを指定して実行。

```bash
$ uglifyjs /path/jsfile.js /path/jsfile.min.js
```

## オンラインツールでminifyする

もっと手軽にやりたい場合は、オンラインツールを使用するのも良い。

- [Closure Compiler](http://closure-compiler.appspot.com/) - Google Closure Compilerのオンライン版
- [Online JavaScript/CSS Compression Using YUI Compressor](http://refresh-sf.com/yui/) - YUI Compressorのオンライン版

## 継続的に実施していくために

開発現場で実践していくことを考えると、いちいち手作業ではやっていられない。そういった場合はGruntのようなタスクランナーを使ったり、Jenkinsのジョブに組み込むなど何らかの方法で自動化するのが現実的。GruntはNode.js製のタスクランナーで、ファイルの変更を監視してそれをトリガーにファイルを圧縮するといったような処理が簡単な設定で自動化できる。Gruntのビルド処理をJenkinsに組み込むことも可能なので、まずはローカル開発環境で整備してみると良いだろう。

- [havelog - Grunt](http://havelog.ayumusato.com/tag/Grunt/) - havelogのGruntタグ
- [gruntをインストールする - jekylog](http://fingaholic.github.com/posts/2012-05-01-grunt.html)
