---
layout: post
title: Chrome OSをDeveloper Modeで起動する
date: 2016-01-02
---

# Chrome OSをDeveloper Modeで起動する

Chromebookを去年の10月に購入したが、主にHulu観賞にしか使っていなかったので、もう少しアレコレカスタマイズしてみることにした。

Chrome OSはWebに特化したオペレーティング・システムで、全てのアプリケーションはChrome（Chromiumプラットフォーム）で実行される。そのため、ベースカーネルはGentoo（Linux）だが、システム部分へのアクセスが制限されている。ターミナルも`crosh`というブラウザから実行するディベロッパーシェルがあるものの、やりたいこと（いわゆるNode.jsのインストールとかそういうの）がほとんどできない。

今回はChrome OSをDeveloper Modeで起動する手順を紹介する。試してみる時は自己責任でどうぞ。

## Developer Modeの有効化

まずはシステム`bash`をフルで使うために、Chrome OSをDeveloper Modeにする必要がある。手順的には[Developer Mode - The Chromium Projects](http://www.chromium.org/chromium-os/chromiumos-design-docs/developer-mode)と[How to Enable Developer Mode on Your Chromebook - How-To Geek](http://www.howtogeek.com/210817/how-to-enable-developer-mode-on-your-chromebook)の2つが参考になるが、もっと端的に見たい人のために日本語で箇条書きにする。

1. <kbd>Escape</kbd>+<kbd>Refresh</kbd>+<kbd>Power</kbd>を押す。すると、リカバリモードで再起動する
2. "Chrome OS is missing or damaged."というメッセージが表示されるが、気にしないでOK。この画面で、<kbd>Control</kbd>+<kbd>D</kbd>を押す
3. "To turn OS Verification OFF"という確認メッセージが表示される。ディベロッパーモードが有効化されるとシステム部分を更新できてしまうので、それでもいいの？という確認だが、<kbd>Enter</kbd>を押すとそのままディベロッパーモードでの再起動が始まる。ローカルデータも消去されるが、自分の場合はGoogleアカウントベースで同期している情報がほとんどなのでそのままOKした
4. "OS verification is OFF"という表示がされ、あとは自動的にディベロッパーモードでの再起動が行われる
5. 自分のGoogleアカウントでログインする

## ターミナル

Chromeを起動して<kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>を押すと、新しいタブで`crosh`というディベロッパーシェルが起動する。ここで`shell`というコマンドを実行すると、Chrome OS内部までアクセスできる`bash`が起動する。
