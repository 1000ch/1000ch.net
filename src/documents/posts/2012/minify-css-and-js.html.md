---
layout: post
title: cssファイルとjsファイルを最小化してパフォーマンスを向上させる
date: 2012-11-28
---

## 転送量の削減

転送量削減のためのアプローチについてはgzipの他に  
テキストファイル（.html/.css/.js）のoptimize（最適化）とminify（最小化）があります。  
htmlファイルに関してはスペースの都合上、注意しないとレイアウトが崩れますが。  
これを行うと転送にかかる時間が短くなるだけでなく、  
ブラウザがjsを評価する時間や、実際にjsが実行される時間、  
キャッシュされたときのメモリの削減にも繋がりますので是非行いましょう。  

## 最適化ってなんですか

ソースコードを見直して、より簡潔な状態にすることです。  
使っていない関数や余分な変数宣言を削除したり、  
共通化をしっかり行い、冗長なコードを除きましょう。  
cssに関しては構造の最適化までしてくれるcssoというツールがあります。  

ショートハンドで書けるところをショートハンドに自動で直したり、  
プロパティをソートしてgzipの圧縮効率を上げたりしてくれます。素晴らしい。  

- [csso](https://github.com/css/csso) - csso@github
- [CSSOとgrunt-csso](http://t32k.me/mol/log/csso-and-grunt-csso/) - cssoの解説とgruntツール（後述）との連携について

## 最小化ってなんですか

コメントの削除や、ブラウザが認識出来る範囲で  
スペースや改行が取り除かれた状態にすることです。  
開発中はコメントを適切に書いて、見通しの良いコードを書くべきですが、  
ブラウザに認識させる段階ではその必要がありません。  
改行コードが取り払われて一行になっていたとしても認識してくれます。  
除かれた余分な文字の分、ユーザーの待ち時間は短くなります。  
なので、実際にサーバーに置くファイルはminifyしましょう。  

## ローカル環境でminifyする

ここでは代表的なGoogle Closure CompilerとYUI CompressorとUglifyJSの3つを紹介。  
Google Closure CompilerとYUI CompressorはともにJavaで書かれており、  
jarファイルをダウンロードしJVMを通して実行する必要があります。  
UglifyJSはnode.js用なので、npm経由でインストールします。  

## Google Closure Compilerの場合

「--js=」で入力ファイルを、「--js_output_file」で出力ファイルを指定。  
入力順にjsファイルが結合されて、minifyされます。  

```sh
$ java -jar compiler.jar --js=input1.js --js=input2.js --js_output_file=out.js
```

## YUIの場合

こちらも入力ファイルと出力ファイルを指定して実行するだけ。

```sh
$ java -jar yuicompressor-x.x.x.jar /path/jsfile.js -o /path/jsfile.min.js
```

##UglifyJSの場合

UglifyJSをインストール。

```sh
$ npm install uglify-js
```

入力ファイルと出力ファイルを指定して実行。

```sh
$ ~/UglifyJS/binuglifyjs /path/jsfile.js /path/jsfile.min.js
```

- [Google Closure Compiler](https://developers.google.com/closure/compiler/?hl=ja) - Google提供のツール
- [YUI Compressor](http://developer.yahoo.com/yui/compressor/) - Yahoo提供のツール
- [UglifyJS](https://github.com/mishoo/UglifyJS) - node.js用のツール

## オンラインツールでminifyする

もっと手軽にやりたい方はオンラインツールを使用するのも良いです。

- [Closure Compiler](http://closure-compiler.appspot.com/) - Google Closure Compilerのオンライン版
- [Online JavaScript/CSS Compression Using YUI Compressor](http://refresh-sf.com/yui/) - YUI Compressorのオンライン版

## もっとラクにやりたい…

がっちり開発していくという場合には、いちいち手作業ではやっていられないと思います。  
そういった場合はmavenを使ったり、jenkinsのプロセスに突っ込んだり。  
html/css中心で、もっと手軽なツールで自動化したい場合は[grunt.js](http://gruntjs.com/)が良いでしょう。  
こちらもnode.jsのツールですが、バックグラウンドでファイルの更新を検知して  
自動でminifyを実行などしてくれます。拡張が非常に容易で、js+jsonファイルの変更のみで、  
他のnodeツールを実行するなどの設定が可能です。  
インターネットには優秀なリソースがたくさんありますので使わない手はありません。  
grunt.jsについては[@ahomu](http://twitter.com/ahomu)氏が詳しく解説しているので  
そちらを見て頂けると参考になるかと思います。  

- [havelog - grunt](http://havelog.ayumusato.com/tag/Grunt/) - havelogのgruntタグ
- [gruntをインストールする - jekylog](http://fingaholic.github.com/posts/2012-05-01-grunt.html)

## 関連リンク

- [CSSO](https://github.com/css/csso) - cssの構造の最適化
- [YUI Compressor](http://developer.yahoo.com/yui/compressor/)
- [Google Closure Compiler](http://code.google.com/p/closure-compiler/)
- [UglifyJS](http://github.com/mishoo/UglifyJS)
- [GruntJS](http://github.com/gruntjs)
