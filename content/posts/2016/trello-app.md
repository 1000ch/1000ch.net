---
layout: post
title: TrelloをElectronでラップしてアプリにした
date: 2016-11-15
image: /img/posts/2016/trello-app/demo.png
---

# TrelloをElectronでラップしてアプリにした

[Trello](https://trello.com/) を Electron でラップしただけの単純なアプリケーション、[Whale](https://github.com/1000ch/whale) をリリースした。 Trello という名前が付けられないので色から安直に連想して Whale とした。こちらは Mac で起動している様子。

![Whale](/img/posts/2016/trello-app/demo.png)

インストールするには [1000ch/whale/releases](https://github.com/1000ch/whale/releases) からアーカイブファイルをダウンロードして、アプリケーションファイルを任意の場所に配置してもらうだけ。

## Electronでラップする理由

Web 版の Trello はよくできていて、 Electron でラップしないと実現できない機能は思い当たらない。

Slack のアプリも Electron でラップしているが、 Slack のチームを左カラムにまとめるという目的がある。これはチーム単位でユニークな URL が存在しているため、ブラウザでは難しい。ブラウザで複数チームを使うにはタブを個別に開いておく必要がある。

また、アプリケーションにする理由としてコンテキストの区別がある。「ブラウザは●●を閲覧するため、 Atom は◯◯を編集するため、…」のように、アプリケーション単位で用途を分けることもあるので、もし Trello を別コンテキストにしたい需要があれば、便利かもしれない。
