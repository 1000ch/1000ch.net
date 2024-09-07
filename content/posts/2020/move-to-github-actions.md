---
title: 静的ホスティングへのデプロイをGitHub Actionsで実行するようにした
date: 2020-07-20
---

このブログを含めてホストしている Web ページを、[GitHub Pages](https://docs.github.com/ja/github/working-with-github-pages/about-github-pages) や [Firebase Hosting](https://firebase.google.com/docs/hosting?hl=ja)、[Netlify](https://www.netlify.com/) など様々な静的ホスティングサービスを使って運用している。これらのサービスへのデプロイは、リポジトリに更新があったときに自動的にデプロイするように設定してある。

Netlify であれば GitHub リポジトリを連携することで、`master` ブランチの変更を自動的に検知し、任意のデプロイ処理を実行できる。Firebase Hosting や GitHub Pages はこうした便利な連携がないので、CI を使って自動デプロイを設定するのが一般的だろう。

これまでは、CircleCI や Travis CI、Wercker といったような CI サービスを使って GitHub リポジトリを連携し、`master` ブランチの変更を検知して、配布されている各種スクリプトを使ってデプロイしてきた。これをすべて GitHub Actions で配布されているデプロイスクリプトに移行した。

## Firebase Hostings へデプロイする

1. `package.json` に記述されているビルドスクリプトでビルドする
2. 成果物が出力されているフォルダを [GitHub Actions for Firebase](https://github.com/marketplace/actions/github-action-for-firebase) でデプロイする

```yml
name: deploy
on:
  push:
    branches:
      - master
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Archive Production Artifact
        uses: actions/upload-artifact@master
        with:
          name: public
          path: public
  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@master
      - name: Download Artifact
        uses: actions/download-artifact@master
        with:
          name: public
          path: public
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting --project project-name
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## Hugo を使ってビルドして GitHub Pages へデプロイする

1. [Hugo setup](https://github.com/marketplace/actions/hugo-setup) を使ってビルドする
2. [GitHub Pages v3](https://github.com/marketplace/actions/github-pages-v3) を使って `gh-pages` ブランチにデプロイする

```yml
name: gh-pages
on:
  push:
    branches:
      - master
jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    strategy:
      matrix:
        node-version: [12.x]
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.64.0'
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Hugo
        run: hugo --minify
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```
