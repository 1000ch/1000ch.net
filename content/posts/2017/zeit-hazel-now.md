---
title: Electronアプリの自動アップデートサーバーをhazelとnowで作る
date: 2017-08-05
---

Trello のデスクトップアプリ [1000ch/whale](https://github.com/1000ch/whale) や [esa.io](https://esa.io/) のデスクトップアプリ [1000ch/quail](https://github.com/1000ch/quail) は Electron 製だが、この macOS バージョンに、重い腰を上げて自動アップデート機能を実装した。

## Electronの自動アップデート機能

Electron には [`autoUpdater`](https://electron.atom.io/docs/api/auto-updater/) という自動アップデートを提供するクラスが備わっている。これは [Squirrel/Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) というフレームワークの機能で、Electron 側についてはそれをラップした `autoUpdater` を通して簡単に実装できる。

```javascript
const { autoUpdater } = require('electron');

autoUpdater.on('checking-for-update', () => console.log('アップデートの有無をチェック中'));
autoUpdater.on('update-available', () => console.log('アップデートを利用可能'));
autoUpdater.on('update-not-available', () => console.log('アップデートを利用不可能'));
autoUpdater.on('update-downloaded', () => console.log('アップデートをダウンロード済'));

autoUpdater.setFeedURL('...');
autoUpdater.checkForUpdates();
```

`autoUpdater.checkForUpdates()` を使うと `autoUpdater.setFeedURL()` で設定したサーバーにアップデートの有無を問い合わせて、アップデートがあるとダウンロードを行いつつ、各種イベントを発火する。ダウンロードしたアップデートは `autoUpdater.quitAndInstall()` を実行すれば再起動してアップデートが適用される他、次回起動時に自動で適用される。whale と quail の場合は後者を選んだが、UI 上で再起動を促したい場合は前者を使うことになる。

## autoUpdater(Squirrel.Mac)のサーバー側の実装

Electron 側の実装は簡単だが、サーバーは仕様も実装もなかなか面倒臭い。サーバー側の仕様は [Squirrel.Mac#Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support) にあり、`autoUpdater.setFeedURL()` に指定した URL へのリクエストで規定通りのレスポンスが返ると初めて自動アップデートが機能する。

この仕様通りのサーバー実装は、オープンソースに既にいくつもある。

> - [nuts](https://github.com/GitbookIO/nuts): *A smart release server for your applications, using GitHub as a backend. Auto-updates with Squirrel (Mac & Windows)*
>- [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *A fully featured, self-hosted release server for electron applications, compatible with auto-updater*
>- [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *A simple node.js server for Squirrel.Mac and Squirrel.Windows which uses GitHub releases*
> - [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *A simple PHP application for Squirrel.Windows which reads updates from a folder. Supports delta updates.*

GitHub のリリースにアップデートのアーカイブをアップロードしておき、Electron アプリからリクエストされるとバージョンを突き合わせて、新しいアーカイブがあればそのダウンロード URL を JSON で返し、既に最新を使っているようなら `204` を返すというような実装である。

また、この他にも [electron-userland/electron-builder](https://github.com/electron-userland/electron-builder) では Electron アプリのパッケージングと共に、自動アップデートのインテグレーションを用意している。

## zeit/hazelとzeit/now

ここまで紹介したソリューションを知りつつも重い腰が上がらなかったが、最近 [`zeit/hazel`](https://github.com/zeit/hazel) を見つけた。

zeit 製の安心感だけでなく、コマンドラインでアプリケーションを即座にデプロイする PaaS  [`zeit/now`](https://github.com/zeit/now) を使えば、すぐに Electron のアップデートサーバーを用意できるとのことで、試したところどこにも詰まることなく用意できてしまった。

```bash
# now をインストールする
$ npm install -g now

# now で now にデプロイする
$ now -e NODE_ENV="production" zeit/hazel

# ACCOUNT
1000ch

# REPOSITORY
whale
```

これでアップデートサーバー https://hazel-mdyjxpqlnl.now.sh ができてしまった。このサーバーに対して [zeit/hazel#routes](https://github.com/zeit/hazel#routes) の通りにリクエストすれば良い。

now は[無料の OSS プランで 3 インスタンスまで使える](https://zeit.co/account/plan)。ことごとく終了している PaaS が多くて、now もいつまで(無料で)使えるか心配だが、しばらくこれで運用してみる。
