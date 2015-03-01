---
layout: post
title: MiddlemanとTravis CIでgh-pagesを運用したら身長が伸びた
date: 2013-08-30
---

# MiddlemanとTravis CIでgh-pagesを運用したら身長が伸びた

`gh-pages`ブランチの更新自動化がゴール。`master`ブランチにpushするだけで内容を動的に取得して`gh-pages`ブランチにpushする。今回もTravisの力を借りる。以下がポイント。

- `gh-pages`ブランチの内容はmiddlemanによる出力
- masterブランチにコミットしたあと、Travisからmiddlemanのビルドを実行
- 生成された内容を`gh-pages`ブランチへpush

## middlemanのインストール

middlemanはrubyで動く静的サイトジェネジェネレータ。テンプレートをほぼhtmlで記述することが出来て、ブログ等の管理を非常に簡単にすることが可能。jekyll使ったことのある人なら学習コストはさらに低め。詳しくはこの辺りが参考になる。

- [middleman - web サイトの開発をシンプルに](http://middleman-guides.e2esound.com/)

まずはmiddlemanのインストールから。

```bash
$ gem install middleman
```

プロジェクト名を指定し、`middleman init`。

```bash
$ middleman init middleman-playground
```

カレントディレクトリに`middleman-playground`というディレクトリが作成され、その配下に色々とファイルが生成されている。

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

`middleman build`を実行すると`source`フォルダ下を出力のリソースとし、`build`フォルダに静的ファイルが生成される。この`build`配下をデプロイすることになる。

## config.rb

ルートディレクトリに、`config.rb`という設定ファイルがあるので、設定を自分好みに変えてみる。

```ruby
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
```

お分かりの通り、何をCSSディレクトリとして扱うかの設定。ただし、source配下のディレクトリはそのままbuildに出力されるだけで、システム内部で扱う変数に過ぎない。ということで、source配下のディレクトリ名と`config.rb`をそれぞれ以下のように編集。

```ruby
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'img'
```

コメントアウトすればjsやcssの圧縮もしてくれそうな行もチラホラ。  

## middleman server

`soruce`配下の変更を監視して、適時ビルドしてくれる。このあたりもjekyllと似てる。サイトの構築デバッグ時に使うことになりそうな感じ。

## Travis側の設定

Travisからgithubにコミットするには、GitHubにOAuthトークンを利用しTravisのセキュアキーを使用する必要がある。GitHubのトークンを設定ファイルに記述するのは良くないので、travisコマンドラインから暗号化する。

まずはGitHubのトークンを[Applications](https://github.com/settings/applications)から、Personal Access TokensのCreateで作成。次にtravisのコマンドラインツールからsecureキーを取得。

```bash
$ gem install travis
$ travis encrypt -r 1000ch/middleman-playground "GH_TOKEN=<生成したGitHubトークン>"
```

生成されたキーを`.travis.yml`に追記。

```
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

`git push`時に`--quiet`をつけないと、トークンが表示されてしまうので注意。

## 以上を踏まえたサンプル

- [middleman-playground](https://github.com/1000ch/middleman-playground)

gruntでsassファイルをコンパイルするというのを追加している。travis上でcloneしてきたmasterブランチで、grunt周りをひと通りインストールして（rakeでいいじゃんというツッコミは一旦なしで）、grunt-contrib-sassでコンパイルされたcssをgh-pagesにコミットするという手順になってる。

が、このままだとrubyプロジェクトなので、Travis上で`bundle install --deployment`した場合に、Sassが`vendor/bundle`配下にインストールされて、gruntから参照出来ずにビルドがこける。最初、`--binstub`をつけて解決したかと思ったが、これを付けて解決したというよりは、`--deployment`が外れたせいだった。

## 所感

今回やったgruntによるsassのコンパイルは正直な所微妙なやり方で、middlemanはcompassの機能を含んでいるので、middleman + gruntの組み合わせがそもそも。Sassのコンパイルをするだけならmiddleman + rakeのほうが自然ぽい。

ジェネレータとしてのmiddlemanはjekyllと似ているなと思った。ブログモードとかもあったり、初期設定がjekyllより気が利いているかも。あと、本来の目的であるTravisからのgh-pagesブランチへの`git push`は、middlemanなしでももちろん出来る。

身長が伸びるかどうかは個人差がありますので、ご了承ください。

## 参考

- [Creating an access token for command-line use](https://help.github.com/articles/creating-an-access-token-for-command-line-use)
- [Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する](http://tricknotes.hateblo.jp/entry/2013/06/17/020229)
- [http://middleman-guides.e2esound.com/](http://middleman-guides.e2esound.com/)