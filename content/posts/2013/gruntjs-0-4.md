---
title: Grunt ver0.4に向けての環境の再構築
date: 2013-01-22
---

# Grunt ver0.4に向けての環境の再構築

[以前の記事](/posts/2012/gruntjs-introduction.html)が説明足らずだったので補足記事。今npmからgrunt周りのモジュールを素直にインストールすると0.3系stableが落ちてくるので、0.4系と混在すると、うまく動かない。0.4系で整備していく方が今後のために良いと思うのでその説明。**rcなので、あまり文句は言えない。** ということだけあらかじめ断っておくとして。

- **grunt-cliをグローバルインストール**
- **gruntコアをローカルインストール**
- **モジュールをローカルインストール**
- **gruntfile.jsに設定を記述する**

という流れはそのまま。モジュールをローカルインストールの辺りを詳しく説明。`package.json`も修正するなり、作り直すなり。

## grunt-contrib-xxx

[公式](http://github.com/gruntjs)で配布しているモジュール群は

- **grunt-contrib-xxx/master**
- **grunt-contrib-xxx/grunt-3.0-stable**

というように安定版ブランチと開発ブランチが切られている。開発ブランチは0.4系に向けた開発が行われているので、この開発ブランチを手に入れる。登録されていればnpm経由でもインストールできるが、GitHubのリポジトリからであれば、常に最新のものを入手できる。

## grunt-contrib-watchのgitリポジトリをクローンする

```bash
# 作業ディレクトリに移動
$ cd /Users/[UserName]/workspace/[ProjectName]/

# gruntfile.jsがあるディレクトリ
$ ls -la

# grunt-contrib-watchを配置するディレクトリに
$ cd ./node_modules/

# リポジトリをクローン
$ git clone https://github.com/gruntjs/grunt-contrib-watch.git
```

npm経由でインストールされるリソースはnode_modulesに配置されるので、その場所にクローンしてgruntに参照してもらう。私の場合はconcat/mincss/uglify/watchの5つを使用しているが、問題なく動いている。[package.json](http://github.com/1000ch/playground/blob/master/package.json)も作り直したけど、前述の通りlink出来ないものもアリ。

## grunt@0.4でstylusのコンパイルを自動化してみよう

stylusのファイルに変更がかかった場合に自動でコンパイルされるタスクを作ってみる。**animate.css** をフォークしてstylusから生成するという無駄なことをしながら実践したので、サンプルとしてgithubに置いておく。

+ [1000ch / animate.css](http://github.com/1000ch/animate.css)

## 必要なモジュールとgruntfile.js

- **grunt@0.4.0rc7**
- **grunt-contrib-watch@0.4.0rc5**
- **grunt-contrib-stylus0.2.0rc5**

```js
module.exports = function(grunt) {
  grunt.initConfig({
    stylus: {
      compile: {
        files: {
          "animate.css": "animate.styl"
        }
      }
    },
    watch: {
      files: ["animate.styl"],
      tasks: ["stylus"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", "watch");
};
```

## stylusはnpmから落としてみる

このままだとstylusがないのでstylusだけはnpmから@0.4を付与して、`grunt-contrib-stylus/node_modules/`にローカルインストールした。

```bash
# インストールするgrunt-contrib-stylusフォルダに移動
$ cd ./grunt-contrib-stylus

# grunt-contrib-stylus@0.4を使用するのでstylus@0.4をインストール
$ npm install stylus@0.4

# gruntfile.jsがある作業フォルダに移動
$ cd ../../

# watchを実行しstylファイルを編集する
$ grunt watch
```

で、コンパイルしてみると以下の2ファイルがエラーになるので手直し。importが引っかかっている。予約語っぽい。

- **grunt-contrib-stylus/node_modules/stylus/lib/visitor/compiler.js**
- **grunt-contrib-stylus/node_modules/stylus/lib/visitor/evaluater.js**

再度試す。

```bash
Waiting...OK
>> File "animate.styl" changed.
Running "stylus:compile" (stylus) task
>> TypeError: animate.styl:70
>>    66|
>>    67| .animated.delay
>>    68|   animation-delay(1s)
>>    69|
>>  > 70| @keyframes flash
>>    71|   0%, 50%, 100%
>>    72|     opacity: 1
>>    73|   25%, 75%
>>
>> Cannot read property 'nodes' of undefined
Warning: Stylus failed to compile. Use --force to continue.

Aborted due to warnings.
```

うーん、動かない。stylファイルが変ですか？

## npmではなくgitからcloneしてみる

- [LearnBoost/stylus](https://github.com/learnboost/stylus)

試しにgithubリポジトリからstylusを入手。

```bash
# インストールしたディレクトリに移動する
$ cd ./node_modules/grunt-contrib-stylus

# stylusをアンインストールする
$ npm uninstall stylus

# インストールするディレクトリに移動する
$ cd ./node_modules

# gitリポジトリからedgeバージョンをcloneする
$ git clone https://github.com/LearnBoost/stylus.git

# gruntfile.jsがある作業フォルダに移動
$ cd ../../../

# watchを実行しstylファイルを編集する
$ grunt watch
```

色々依存関係を解決後も、相変わらず同じエラーが出る。

## stylusのcompile出来なかった

stylファイルが間違っているのか、stylusがedgeであるからなのか、はたまた`grunt-contrib-stylus`がedgeであるからなのか。わからない。
