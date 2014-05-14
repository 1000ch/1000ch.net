---
layout: post
title: MiddlemanとTravis CIでgh-pagesを運用したら身長が伸びた
date: 2013-8-30
---

# MiddlemanとTravis CIでgh-pagesを運用したら身長が伸びた

gh-pagesブランチの更新自動化がゴールです。
masterにpushするだけで内容を動的に取得してgh-pagesブランチにpushをします。
今回もTravisのお力を借ります。以下がポイントになります。

- `gh-pages`ブランチの内容はmiddlemanによる出力
- masterブランチにコミットしたあと、Travisからmiddlemanのビルドを実行
- 生成された内容を`gh-pages`ブランチへpush

## middlemanのインストール

middlemanはrubyで動く静的サイトジェネジェネレータです。  
テンプレートをほぼhtmlで記述することが出来て、ブログ等の管理を非常に簡単にすることが出来ます。
jekyll使ったことのある人なら学習コストはさらに低めです。詳しくはこの辺り。

- [middleman - web サイトの開発をシンプルに](http://middleman-guides.e2esound.com/)

まずはmiddlemanのインストールから。

```bash
$ gem install middleman
```

プロジェクト名を指定し、`middleman init`します。

```bash
$ middleman init middleman-playground
```

カレントディレクトリに`middleman-playground`というディレクトリが作成され、
その配下に色々とファイルが生成されています。

```
├─ source
│   ├- images
│   │   └...
│   ├- javascripts
│   │   └...
│   ├- layouts
│   │   └...
│   ├- stylesheets
│   │   └...
│   └- index.html.erb
├─ .gitignore
├─ config.rb
├─ Gemfile
└─ Gemfile.lock
```

`middleman build`を実行すると`source`フォルダ下を出力のリソースとし、
`build`フォルダに静的ファイルが生成されます。この`build`配下をデプロイするものになります。

## config.rb

ルートディレクトリに、`config.rb`という設定ファイルがありますので、
設定を自分好みに変えてみます。  

```ruby
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
```

お分かりの通り、何をCSSディレクトリとして扱うかの設定です。
ただし、source配下のディレクトリはそのままbuildに出力されるだけで、
システム内部で扱う変数に過ぎません。ということで、
source配下のディレクトリ名と`config.rb`をそれぞれ以下のように編集します。

```ruby
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'
```

コメントアウトすればjsやcssの圧縮もしてくれそうな行もチラホラ。  

## middleman server

`soruce`配下の変更を監視して、適時ビルドしてくれます。このあたりもjekyllと似てる。
サイトの構築デバッグ時に使うことになりそうな感じです。

## Travis側の設定

Travisからgithubにコミットするには、GitHubにOAuthトークンを利用しTravisのセキュアキーを使用する必要があります。
GitHubのトークンを設定ファイルに記述するのは良くないので、travisコマンドラインから暗号化したものを生成します。

まずはGitHubのトークンを[Applications](https://github.com/settings/applications)から、Personal Access TokensのCreateで作成します。
次にtravisのコマンドラインツールからsecureキーを取得します。

```bash
$ gem install travis
$ travis encrypt -r 1000ch/middleman-playground "GH_TOKEN=<生成したGitHubトークン>"
```

生成されたキーを`.travis.yml`に追記します。

```yaml
language: ruby
rvm: 2.0.0
env:
  global:
    - GIT_COMMITTER_NAME=1000ch
    - GIT_COMMITTER_EMAIL=orz1000ch@gmail.com
    - GIT_AUTHOR_NAME=1000ch
    - GIT_AUTHOR_EMAIL=orz1000ch@gmail.com
    - secure: [トークン]
before_script:
    - git clone --quiet https://github.com/1000ch/middleman-playground.git build
    - pushd build
    - git checkout -b gh-pages
    - popd
script:
    - bundle exec middleman build
after_success:
    - cd build
    - git add -A
    - git commit -m 'Update'
    - '[ "$TRAVIS_BRANCH" == "master" ] && [ $GH_TOKEN ] && git push --quiet https://$GH_TOKEN@github.com/1000ch/middleman-playground.git gh-pages 2> /dev/null'
```

`git push`時に`--quiet`をつけないと、トークンが表示されてしまうので注意してください。

## 以上を踏まえたサンプル

- [middleman-playground](https://github.com/1000ch/middleman-playground)

gruntでsassファイルをコンパイルするというのを追加しています。
travis上でcloneしてきたmasterブランチで、grunt周りをひと通りインストールして
（rakeでいいじゃんというツッコミは一旦なしでお願いします。苦笑）
grunt-contrib-sassでコンパイルされたcssをgh-pagesにコミットするという手順になっています。

が、このままだとrubyプロジェクトなので、Travis上で`bundle install --deployment`した場合に
Sassが`vendor/bundle`配下にインストールされて、gruntから参照出来ずにビルドがこけます。
この辺[@koko1000ban](http://twitter.com/koko1000ban)先生に色々と助けていただきましたorz
最初、`--binstub`をつけて解決したかと思ったんですが、
これを付けて解決したというよりは、`--deployment`が外れたせいでした。

## 所感

今回やったgruntによるsassのコンパイルは正直な所微妙なやり方で、
middlemanはcompassの機能を含んでいるので、middleman + gruntの組み合わせがそもそも。
Sassのコンパイルをするだけならmiddleman + rakeのほうが自然です。
あとジェネレータとしてのmiddlemanはjekyllと似ているなと思いました。
ブログモードとかもあったり、初期設定がjekyllより気が利いているかも。
　  
本来の目的であるTravisからのgh-pagesブランチへの`git push`は、
middlemanなしでももちろん出来ます。これはもしや色々と応用が効きそうなノウハウ…。
あと、身長が伸びるかどうかは個人差がありますので、ご了承ください。

## 参考

- [Creating an access token for command-line use](https://help.github.com/articles/creating-an-access-token-for-command-line-use)
- [Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する](http://tricknotes.hateblo.jp/entry/2013/06/17/020229)
- [http://middleman-guides.e2esound.com/](http://middleman-guides.e2esound.com/)