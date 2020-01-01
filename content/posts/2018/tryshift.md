---
layout: post
title: 複数の Google アカウントを統合管理する Shift というアプリが良い
date: 2018-08-21
---

# 複数の Google アカウントを統合管理する Shift というアプリが良い

インターネット業界で働いている人であれば、個人・会社といったように、複数の Google アカウントを持っていることも珍しくないだろう。個人で複数の Google アカウントを持っている人もいるだろうし、副業先などで Google アカウントを発行している場合は、3つ以上持っている人もいるかと思う。

かくいう私も、個人の Google アカウントと会社の G Suite で発行される Google アカウントを所持している。個人の Gmail、会社の Gmail、個人の Google Calendar、会社の Google Calendar といったように、複数 Google アカウントの異なるアプリを開くことも多いので、管理方法に悩んでいた。

## 自作の URL opener を使った管理

昔作った Chrome の拡張機能に [URL opener](https://chrome.google.com/webstore/detail/url-opener/dkkacgbkmcbnnadidhkmngpcoccibgpm) というものがある。これは予め URL を登録しておくと、アイコンをクリックするだけで一気にブラウザで開けて、更にピン止めしておくかどうかも指定できるというもの。

先に挙げた、複数 Google アカウントの異なるアプリはそれぞれユニークな URL があるので、この拡張機能にそれらを登録しておくことで、ワンクリックで表示できていた。概ね満足していたが、Chrome のタブで開くことになるので、⌘ + Tab でスイッチできなかったり、登録する URL に `authuser=` が含まれるので Google へのログイン順序が重要、などの課題はあった。

## Shift で複数の Google/Outlook アカウント + α を管理

まずはこちらのトレーラーを見てもらうのが早い。

<responsive-iframe src="https://player.vimeo.com/video/260278352?title=0&byline=0"></responsive-iframe>

Web サイトには

> Shift - The Best Desktop Email Client for Gmail and Outlook.com

とあるが、見ておわかりの通り、Google アカウントを複数登録して切り替える他、切り替えた Google アカウントで Gmail、Calendar、Drive を使えるようになっている。無料で 2 つまで Google アカウントを追加可能で（実際、Google アカウントを 2 つを別アプリで管理できるだけでも便利である）、課金すると更にアカウントを追加できたり、他の Google App や外部サービスのアカウントまで登録して管理できるようだ。

- **Free ($0/year)**: 2つまでの Google アカウントや Outlook アカウントの管理
- **Pro ($29.99/year)**: 追加できるアカウント数の上限解放、Gmail・Calendar・Drive に加えて、Keep・Photo・Hangout などのアプリケーションの開放
- **Advanced ($99.99/year)**: Chrome Extension の有効化、統合検索の有効化、Slack・Trello などの外部アプリケーションとの統合

リファラルのボーナスがあるので、もし気になった人は是非 [**コチラのリンク**](https://tryshift.com/referral/d100/shogo.sensui/) からアプリをダウンロードしてインストールしてみて欲しい。
