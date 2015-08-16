---
layout: post
title: Service WorkerでブラウザにPush通知をする
date: 2015-08-18
draft: true
---

# Service WorkerでブラウザにPush通知をする

Service WorkerでブラウザにPush通知をする方法については、既に解説記事が幾つかあるが、もう少しだけ掘り下げてみる。

## 前提と大まかな手順

例によってService Worker周りの実装が進んでいるChromeのCanary Channelで試す。また、配信元はHTTPS環境でないとService Workerをインストール出来ないので、GitHub Pagesでホストする。サーバーからのPushは、今のところGCM（Google Cloud Messaging）のみの様子なので、そのあたりの準備もすることになる。

1. GCMにPushデータ配信を行うサーバーのプロジェクトを用意する
2. 1.で作成したプロジェクトIDをWeb App Manifestの`gcm_sender_id`に指定する
3. HTMLページ及びサーバーPushを受ける準備をしたService Workerを用意する
4. 3.をHTTPS環境下で配信する（今回はGitHub Pages）
5. 4.で用意したページにChrome Canaryでアクセスし、Service Workerをブラウザにインストールする
6. 1.で作成したサーバーにPushの配信リクエストを行う

## GCMにプロジェクトを作成

## Pushを受け取るWebアプリ側の準備

## Pushサーバーに配信リクエスト