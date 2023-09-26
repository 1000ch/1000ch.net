---
layout: post
title: Obsidian を使ったデバイスを問わないメモ運用
date: 2023-09-26
---

# Obsidian を使ったデバイスを問わないメモ運用

仕事用なのかプライベート用なのか、はたまた両方なのか、端末を問わずに共有されるメモを望む人は多い。こうした目的に対しては [Evernote](https://evernote.com/ja-jp) や [Day One](https://dayoneapp.com/)、[Inkdrop](https://www.inkdrop.app/) といったプロダクトがあるが、手に馴染みききらず public な [scrapbox](https://scrapbox.io/1000ch) を使っている。

scrapbox 独自の記法はあるものの、メモがてら公開したいものを管理する目的に対して scrapbox はとても良い一方で、タッチデバイスで編集するには使い心地が難しい部分があったり、Markdown で書きたいニーズを満たせていなかった。

Markdown をサポートしているプロダクトは多数ある。[Typora](https://www.typora.io/) や [Quiver](https://yliansoft.com/)、先の Day One/Inkdrop などもそうだが、Android に対応していなかったり、クラウド同期が各プロダクトに依存していたりする。特に後者は、蓄積したデータの可搬性を考えると慎重になっており、そのプロダクトが終了したときの import/export を考えると管理可能であって欲しい。

## Obsidian が良く出来ている

自分のニーズを整理すると「プライベートに管理できて」「データ同期がクロスデバイスかつ持続可能で」「デバイスを問わずにアプリが優れている」だが、現時点で最も正解に近そうなのが [Obsidian](https://obsidian.md/) である。

Obsidian は[マルチプラットフォームに対応しており](https://obsidian.md/download)、[便利なコミュニティプラグインがあり](https://obsidian.md/plugins)、課金することで[データの同期](https://obsidian.md/sync)や[ページの公開](https://obsidian.md/publish)にも対応している。アプリ自体の出来が良く、データの同期を OS のファイルシステム上に Vault を作成する。その Vault を Dropbox で同期することで、Obsidian に依存せずクロスデバイスなデータ同期を実現できる。

## Dropsync を使った Android でのデータ同期

Obsidian は Android アプリを提供しており、Dropbox の Android アプリも存在する。しかし、Dropbox がデータ同期に参照している Android のファイルシステムは隔離されているので、通常 Obsidian から参照できない。

そこで [Dropsync: Autosync for Dropbox](https://play.google.com/store/apps/details?id=com.ttxapps.dropsync) というアプリを使うことで Android 端末の任意のフォルダを Dropbox の同期対象とすることができる。同期の頻度や状況の設定なども豊富だし、苦労するポイントはない。あまりにピッタリのソリューションだったので、広告を非表示にする必要はなかったが、感謝の気持を込めて課金した。
