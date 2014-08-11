---
layout: post
title: Android Studio+GenymotionではじめるAndroid開発
date: 2014-08-08
description: Androidはじめました。
---

# Android Studio+GenymotionではじめるAndroid開発

クライアントサイドのネイティブアプリを作れればiOSでもAndroidでも良かったのだけど、プラットフォームへの興味もあるし、Javaのリハビリもしたかったし、そんなこんなでAndroidをはじめた。

今回はAndroidの開発を始めるにあたり、どんな環境を構築したかのお話。

## [Android Studio](https://developer.android.com/sdk/installing/studio.html) or [Eclipse](https://developer.android.com/sdk/index.html)

まだAndroid StudioがBeta版なせいか、トップにはEclipseのダウンロードリンクが貼られていたりするけど、Android Studioを選んだ。Android Studioを推奨している雰囲気をひしひしと感じるのと、私は **『IDEといえばIntelliJかWebStormでしょ』** という属性の人間なので、IntelliJ Platformなら間違いないだろ！という偏った視点もありつつ。

古いデバイスを考慮するにしても、SDKがあれば後方互換性については特に気にすることなく開発が出来るはずなので、Eclipseはアプリ開発の互換性というよりプロジェクトの開発互換性のために残されているのでは。

## Android StudioもCanary Buildを使う

もはや気持ちの問題かと思いますが、新しいビルドのものを使っておこうということで設定をする。

**Preferences** (`cmd + ,`)を開いて、 **Updates** を選択すると、更新チェックするチャネルを選べるので、 **Canary Channel** を選択。

<img src='/img/posts/android-development-with-genymotion/android-studio-preferences-updates.png' width='100%'>

## スタンドアロンなSDKを用意する

EclipseにもAndroid StudioにもSDKは同梱されているんだけど、別途用意して指定した。以下からダウンロードし、適当な場所に配置。

- [Installing the Stand-alone SDK Tools](https://developer.android.com/sdk/installing/index.html?pkg=tools)

IDEにバンドルされているSDKでも基本的に問題は無さそうだが、気分的に別途管理したかったのと、詳しい人に聞いてみると、Eclipseからも同じSDKを参照したい場合等にスタンドアロンにしておかないと面倒と言っていた。なるほど。

Android StudioからスタンドアロンなSDKを参照するので、 **Project Structure** (`cmd + ;`)を開いて、 **SDK Location > Android SDK Location** にダウンロードして解凍したディレクトリルートを指定する。

<img src='/img/posts/android-development-with-genymotion/android-studio-project-structure.png' width='100%'>

## エミュレータの設定

ここまで設定して、ようやくコードを書いていけるようになる。チュートリアルに沿ってプロジェクトを作成すると、いわゆる Hello World! が用意された空プロジェクトが出来上がる（このプロセスは割愛）。

自動作成されたプロジェクトは既にコンパイルして実行することが可能になっているが、 **Run** から実行しようとすると **Choose Device** という画面が表示され、どの環境で実行するかを聞かれる。最初はここが空の状態のはず。

1. **Launch Emulator** - Android Studio上で仮想のAndroid環境を作ってそれを指定することが出来る。その仮想環境は **Android Virtual Device** の頭文字を取って **AVD** と呼ぶみたい。 **AVD Manager** からデバイスの種類やターゲットになるAndroidのバージョン等を細かく指定してイメージを作ることが出来る。
2. **Choose a running device** こっちは接続中のデバイスを使ってアプリケーションを起動する。たぶん、コードをビルドして`.apk`をアップロードしてるんだと思われる。実機でやる場合はUSBで繋げる他、USBデバッグをオンするとOK。

## [Genymotion](http://www.genymotion.com/)

実機でのテストは必要になるものの、AVDを使って基本的な開発を行っていくことを考えると、Android StudioのAVDは設定が如何せん面倒な上に起動が遅い。

そこで、[Genymotion](http://www.genymotion.com/)というものを勧めてもらった。サードパーティのAndroidエミュレータだが、本家より起動が速く、軽快に動作するという特徴がある。

[ココ](https://cloud.genymotion.com/page/customer/login/)からサインアップすると、[ダウンロード画面](https://cloud.genymotion.com/page/launchpad/download/)からGenymotionアプリを入手することが出来る。アプリからは予め用意されたAndroidイメージを選択して入手することが可能で、セットアップが非常に簡単なうえ、 **Play** での起動も比較的軽快である。

<img src='/img/posts/android-development-with-genymotion/genymotion.png' width='100%'>

GenymotionはVirtualBoxに依存しており、予めVirtualBoxをインストールしておく必要がある。Androidの仮想環境を用意するという意味では、改めて疑問を抱く余地はない。

### Genymotionから起動したAndroidでアプリをデバッグ

Genymotionで仮想デバイスを起動したあとは、 **Choose a running device** の一覧にその端末が追加されているはずなので、それを選ぶだけ。

<img src='/img/posts/android-development-with-genymotion/android-studio-choose-device.png' width='100%'>

つまり、Android StudioのAVDと同じように仮想デバイスを作るけど、動作としてはリモートデバッギングしているような感じになる。

<img src='/img/posts/android-development-with-genymotion/genymotion-nexus5.png' width='100%'>

以上、備忘録でした。