---
title: GAE のプロジェクトに Firewall を設定する
date: 2018-11-12
---

GAE のプロジェクトには Console から Firewall の設定ができる。

GAE を利用している GCP のプロジェクトを [GCP Console](https://console.cloud.google.com/) から選択し、ハンバーガーメニューをクリックして表示されるドロワーメニューの、 **App Engine** → **Firewall rules** を選択する。

![""](/img/posts/2018/gae-project-firewall/gcp-console.png)

default のルールとして、全てのドメイン `*` に対して **Allow** が設定されているので、適用するルールを [Create Rule](https://console.cloud.google.com/appengine/firewall/create) から作成する。

例えば `111.111.111.111` からのアクセスのみに制限するには、以下の状態にする。

- Priority: `1`, Action: `Allow`, IP Range: `111.111.111.111`
- Priority: `default`, Action: `Deny`, IP Range: `*`
