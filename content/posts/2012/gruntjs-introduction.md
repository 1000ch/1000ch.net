---
title: Gruntの概要と導入手順とメリット
date: 2012-12-08
---

# Gruntの概要と導入手順とメリット

もはや説明不要の可能性もあるけど、[grunt](http://gruntjs.com/)がコマンドラインのインターフェースを分離して`grunt-cli`への移行をしたこともあり、まとめてみた。

GruntはNode.js製のタスクランナー。JavaScriptで記述する設定ファイルに、ファイルの結合（concat）や最小化minifyといったようなタスクを定義し、コマンドラインから実行する。

言葉だけだとイメージ湧きにくいと思うので、使ってもらうのが一番と言い張って導入手順の説明をする。

## Node.js+npmをインストールする

- インストーラからダウンロードするなら[Node.js](http://nodejs.org)
- Node.jsのバージョンマネージャを使う場合は[creationix/nvm](https://github.com/creationix/nvm)とか[hokaccha/nodebrew](https://github.com/hokaccha/nodebrew)

0.8.17で動作確認済み。安定版なら問題ないと思われる。

## npmからgrunt-cliをインストールする

```bash
$ npm install -g grunt-cli
```

これで核となるCLIモジュールのインストールは完了。ターミナルで`grunt`というコマンドが実行できるようになっている。ただ、設定ファイルがないためこのままだと実行できない。

## gruntコアをインストールする

ここから先はローカルインストールするので、プロジェクトディレクトリに移動。gruntのコアモジュールをインストールする。

```bash
$ cd /Users/[UserName]/workspace/[ProjectName]
# 以降ここをカレントディレクトリとして作業

# gruntのコアモジュールをインストールする
$ npm install grunt
```

## gruntで使うモジュールをインストールする

このままだと何も出来ないので、その他モジュールもインストールする。今回は **「複数cssファイルを1枚のcssファイルに結合し、最小化を自動で行う。」** ということをしてみる。

```bash
$ cd /Users/[UserName]/workspace/[ProjectName]
# [Project]ディレクトリ下にcssフォルダがある想定

# ファイルの変更を監視するwatchモジュールをインストールする
$ npm install grunt-contrib-watch

# ファイルを結合するconcatモジュールをインストールする
$ npm install grunt-contrib-concat

# cssファイルを最小化するmincssモジュールをインストールする
$ npm install grunt-contrib-mincss
```

[ProjectName]フォルダにnode_modulesというフォルダが作成されて、その中にインストールしたモジュールのフォルダがあればOKです。

## `gruntfile.js`に設定を記述する

gruntが認識する設定ファイルは **gruntfile.js** という制約がある。`v0.3`以前は`grunt.js`だったけど、これは前からアナウンスがあって命名制約が変更になった。

以下設定ファイルのサンプル。CoffeeScriptで書いて`gruntfile.coffee`でも大丈夫。

```js
module.exports = function (grunt) {
  // ターゲットとするcssファイルを定義する
  // ['css/hoge1.css', 'css/hoge2.css']のように個別指定でもOK。
  var cssFiles = ['css/*.css'];

  // タスクを初期化する
  grunt.initConfig({

    // grunt-contrib-concatに関する設定
    // ↑で定義したcssFilesのファイルを結合し
    // cssフォルダ下にall.cssとして出力する
    concat: {
      css: {
        src: cssFiles,
        dest: './css/all.css'
      }
    },

    // grunt-contrib-mincssに関する設定
    // cssフォルダ下のall.cssをcompressし、all.min.cssとして出力する
    mincss: {
      compress: {
        files: {
          './css/all.min.css': ['./css/all.css']
        }
      }
    },

    // grunt-contrib-watchに関する設定
    // ↑で定義したcssFilesのファイルを監視し、
    // 変更があった場合にtasksに定義されるタスクが実行される
    watch: {
      files: cssFiles,
      tasks: ['concat', 'mincss']
    }
  });

  // インストールしたモジュールをロードする
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // コマンドラインでgruntだけ入力し実行した場合に
  // ここでは↑で定義したwatchタスクを実行するという設定
  grunt.registerTask('default', 'watch');
};
```

## gruntを実行してみる

watchタスクを実行したいので、この設定だとデフォルトでOK。`grunt`とだけ入力し、実行。 **Waiting...** と表示されると監視状態になる。

この状態でcssフォルダ下のcssに変更をかけて保存したときに、cssフォルダ下に`all.css`と`all.min.css`が出力されれば成功。

## gruntを使うメリット

- cssやjsなどのconcatとminifyといった作業を自動で出来る
- 手作業によるヒューマンエラーを減らすことが出来る
- サードパーティ製のものを含めて、たくさんのモジュールが公開されている
- 設定ファイルが簡易。jsファイルだけなので環境の共有が容易

などなど。

## まとめ

以前まではgruntをインストールするだけで、ビルドインタスクとしてconcatやらminifyやらがデフォルトで使える状態だったけど、今後はgrunt-cliをコマンドラインのインターフェースとして（名前のままだけど）タスクをgrunt-contrib-xxxといった形で配布し、必要に応じてインストールしてもらうといったスタンスっぽい。

JavaScriptやCSSファイルのminifyだけではなく、今流行っているlessやらsassといったCSSプリプロセッサや、StyleDoccoのようなスタイルガイドジェネレータもgrunt向けのモジュールが既にある。つまり、 **「grunt通せば様々な作業をまとめたり、自動化出来る可能性がある。」** ということ。面倒な作業はgruntに任せるべき。

とても便利なので、面倒くさがらず導入すると幸せになれるかも。
