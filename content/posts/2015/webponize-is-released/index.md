---
title: WebPonizeをリリースした
date: 2015-04-29
---

WebPonizeは[前に触れた](/posts/2015/webponize/)通り、JPEGやPNGをWebPに変換するMacのアプリケーション。App Storeに登録するために色々と試行錯誤していたんだけど、アプリの目的と反する可能性が出てきたので断念し、ダウンロード形式を取ることにした話。

## アプリに掛かる制限が色々と厳しい

App Storeで公開するためにはAppleの審査を突破する必要があるが、最初に申請したときにRejectされた理由は、ユーザーインターフェースのこと、期待する動作をしていないことの2点だった。

> From Apple
>
> - 2.3 - Apps that do not perform as advertised by the developer will be rejected
> - 6.1 - Apps must comply with all terms and conditions explained in the Apple Macintosh Human Interface Guidelines
2.3
>
> The app does not achieve the core functionality described in your marketing materials or release notes.

### ユーザーインターフェース

ユーザーインターフェースについてはFileメニュー内にOpenアイテムがなく、ドラッグアンドドロップだけでなく、Macアプリの基本的なインターフェースガイドラインとしてヘッダーメニューも整備しなさいという指摘だった。これは単純に失念していたので実装した。

### サンドボックスキー

問題は後者の期待する動作をしていないというもの。色々調査した結果から推測すると、特定の条件に該当するアプリケーションの動作を許容するアプリにはサンドボックスキーと呼ばれるフラグをオンにしないとApp Storeの公開に漕ぎ着くことができないらしい。フラグは以下の様なもの。

- **Network** Incoming/Outgoing Connectionにアクセスできるか
- **Hardware** カメラ・Microphone・USB・印刷機能へアクセスできるか
- **App Data** 連絡先・位置情報・カレンダー情報へアクセスできるか
- **File Access** ユーザー選択・ダウンロードフォルダ・ピクチャーフォルダ・ミュージックフォルダ・ムービーフォルダへアクセスできるか

こうした情報に闇雲にアクセスできてしまうと、ユーザーが意図しない事故も起きてしまうこともあるだろう。App Storeに公開されているアプリは比較的安心できるということになる。 **「このアプリはカメラ機能へのアクセスを求めています」** 的な確認ダイアログとか出るんだと思う。

WebPonizeはドラッグアンドドロップした画像ファイルに対してアクセスする必要があるが、これを許可するフラグがそもそもない。有効化する手段はあるにはありそうだが、 **「WebPonizeはドロップしたファイルへアクセスします」** のような確認を **都度** 出さないとダメっぽい。さすがにこれはイケてない。

## アーカイブファイルの配布と自動アップデート

以上のような経緯を経て、アーカイブファイルを配布することにした。ImageOptimやらImageAlphaもApp Storeで公開されていないけど、もしかしたら同じ問題に直面したんじゃないかと予想している。

App Storeで配布しないということは、アプリのアップデートにApp Storeの更新機能を使えないということになるので、アプリケーションそのものに自動更新がないと辛そう。この実装には[Sparkle Project](https://github.com/sparkle-project)のフレームワークを利用している。なんかもう、全部[Pornel](https://github.com/pornel)が踏んできた道っぽい。

## GitHubで公開した

[![](./webponize.png)](https://github.com/1000ch/webponize)

[1000ch/webponize](https://github.com/1000ch/webponize)からダウンロードできます、よろしくお願いします(´・ω・`)
