---
layout: post
title: Gruntの概要と導入手順とメリット
date: 2012-12-8
---

# Gruntの概要と導入手順とメリット

- [grunt: a task-based command line build tool for JavaScript projects](http://gruntjs.com/)

もはや説明不要の可能性もありますが、gruntがコマンドラインを分離して`grunt-cli`への移行をしたこともあり、まとめてみました。
Gruntはコマンドラインで使用するビルドタスクのツールです。
JavaScriptで記述する設定ファイルに、concatやminifyといったようなタスクを定義し、コマンドラインから実行します。
言葉だけだとイメージ湧きにくいと思いますので、使ってもらうのが一番と言い張って導入手順の説明に入ります。

## node.js+npmをインストールする

インストールしてある人は読み飛ばして下さい。

- [node.js](http://nodejs.org)

0.8.17で動作確認済みです。安定版なら問題ないと思います。

## npmからgrunt-cliをインストールする

```bash
$ npm install -g grunt-cli
```

これで核となるCLIモジュールのインストールは完了です。ターミナルで`grunt`とたたけば実行できるようになっています。
ただ、設定ファイルがないためこのままだと実行できません。

## gruntコアをインストールする

ここから先はローカルインストールして欲しいので、プロジェクトディレクトリに移動してください。
gruntのコアモジュールをインストールします。

```bash
$ cd /Users/[UserName]/workspace/[ProjectName]
# 以降ここをカレントディレクトリとして作業して下さい。

# gruntのコアモジュールをインストールする
$ npm install grunt
```

## gruntで使うモジュールをインストールする

このままだと何も出来ないので、その他モジュールも試しにインストールします。
**「複数cssファイルを1枚のcssファイルに結合し、最小化を自動で行う。」** ということをしてみます。

```bash
$ cd /Users/[UserName]/workspace/[ProjectName]
# [Project]ディレクトリ下にcssフォルダがある想定です。

# ファイルの変更を監視するwatchモジュールをインストールする
$ npm install grunt-contrib-watch

# ファイルを結合するconcatモジュールをインストールする
$ npm install grunt-contrib-concat

# cssファイルを最小化するmincssモジュールをインストールする
$ npm install grunt-contrib-mincss
```

[ProjectName]フォルダにnode_modulesというフォルダが作成されて、その中にインストールしたモジュールのフォルダがあればOKです。

## gruntfile.jsに設定を記述する

gruntが認識する設定ファイルは **gruntfile.js** という制約があります。`v0.3`以前はgrunt.jsだったんですが、これは前からアナウンスがありましたね。
以下設定ファイルのサンプルです。CoffeeScriptで書いて`.coffee`でも大丈夫。

```js
module.exports = function(grunt) {
    // ターゲットとするcssファイルを定義する
    // ["css/hoge1.css", "css/hoge2.css"]のように個別指定でもOK。
    var cssFiles = ["css/*.css"];

    // タスクを初期化する
    grunt.initConfig({

        // grunt-contrib-concatに関する設定
        // ↑で定義したcssFilesのファイルを結合し
        // cssフォルダ下にall.cssとして出力する
        concat: {
            css: {
                src: cssFiles,
                dest: "./css/all.css"
            }
        },

        // grunt-contrib-mincssに関する設定
        // cssフォルダ下のall.cssをcompressし、all.min.cssとして出力する。  
        mincss: {
            compress: {
                files: {
                    "./css/all.min.css": ["./css/all.css"]
                }
            }
        },
        
        // grunt-contrib-watchに関する設定
        // ↑で定義したcssFilesのファイルを監視し、
        // 変更があった場合にtasksに定義されるタスクが実行される
        watch: {
            files: cssFiles,
            tasks: ["concat", "mincss"]
        }
    });

    // インストールしたモジュールをロードする
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // コマンドラインでgruntだけ入力し実行した場合に
    // ここでは↑で定義したwatchタスクを実行するという設定
    // カスタムで定義できます。
    grunt.registerTask("default", "watch");
};
```

## gruntを実行してみる

watchタスクを実行したいので、この設定だとデフォルトでOK。
`grunt`とだけ入力し、実行。 **Waiting...** と表示されると監視状態になります。
この状態でcssフォルダ下のcssに変更をかけて保存したときに、cssフォルダ下に`all.css`と`all.min.css`が出力されれば成功です。

## gruntを使うメリット

- cssやjsなどのconcatとminifyといった作業を自動で出来る
- 手作業によるヒューマンエラーを減らすことが出来る
- サードパーティ製のものを含めて、たくさんのモジュールが公開されている
- 設定ファイルが簡易。jsファイルだけなので環境の共有が容易

ざっくりこの辺りでしょうか。
JavaScriptやCSSファイルのminifyだけではなく、今流行っているlessやらsassといったCSSプリプロセッサや、StyleDoccoのようなスタイルガイドジェネレータもgrunt向けのモジュールが既にあります。
つまり、 **「grunt通せば様々な作業をまとめたり、自動化出来る可能性がある。」** ということです。面倒な作業はgruntに任せてしまいましょう。

## gruntからgrunt-cliへの移行について

以前まではgruntをインストールするだけで、ビルドインタスクとしてconcatやらminifyやらがデフォルトで使える状態でしたが、
今後はgrunt-cliをコマンドラインのインターフェースとして（名前のままだけど）タスクをgrunt-contrib-xxxとして配布し、必要に応じてインストールしてもらうといったスタンスのようです。

## まとめ

なかなか便利です。面倒くさがらず導入すると幸せになれるかもしれません。

## 関連リンク

- [gruntjs - github](http://github.com/gruntjs/)
- [タグ"grunt" :: ハブろぐ](http://havelog.ayumusato.com/tag/Grunt/)