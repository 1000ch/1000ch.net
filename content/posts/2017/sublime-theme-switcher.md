---
title: Sublime Theme Switcherがとても便利
date: 2017-07-18
image: /img/posts/2017/sublime-theme-switcher/demo.gif
---

# Sublime Theme Switcherがとても便利

Sublime Text のテーマやカラースキーマの変更は、メニューの Preferences から Theme ないし Color Scheme を辿るか、<kbd>⌘</kbd> + <kbd>,</kbd> で開く JSON の設定ファイルを編集するか、のいずれかである。そう思っていた時期が私にもありました…。

## コマンドパレットから切り替え出来るプラグインを発見した

テーマを探しに [dreikanter/sublime-bookmarks](https://github.com/dreikanter/sublime-bookmarks) を眺めていると、 [Sublime Theme Switcher](https://github.com/chmln/sublime-text-theme-switcher-menu) というプラグインを見つけた。

メニューから辿るのも設定ファイルをいじるのもかなり煩わしいが、これを使うと <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> で開くコマンドパレットのメニューに **Select Theme** と **Select Color Theme** が追加される。これでコマンドパレット上からテーマとカラースキーマそれぞれを切り替え出来るようになる。

![sublime-theme-switcher demo](/img/posts/2017/sublime-theme-switcher/demo.gif)

## インストール

1. <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> でコマンドパレットを開く
2. **Package Control: Install Package** を選択する
3. **Themes Menu Switcher** で検索し、インストールする

パッケージ名がリポジトリ名と異なることに注意。
