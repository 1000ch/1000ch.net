---
layout: post
title: CSSCombのAtomプラグイン
date: 2015-07-20
---

# CSSCombのAtomプラグイン

CSSのプロパティをソートする[CSSComb](https://github.com/csscomb/csscomb.js)というNode.jsのモジュールがある。CSSプロパティのソートは書き順が統一されてコードの可読性が上がるだけではなく、サーバーから配信されるときに実施されるであろうGzipの圧縮効率も高まるというメリットがある。そんなCSSCombを[Atomのプラグインにした](https://github.com/1000ch/atom-csscomb)。

![](/img/posts/2015/atom-csscomb/demo.gif)

…と言っても、作ったのはだいぶ前。CSSCombをかけるとインデントとかがグチャッと崩されてしまうのが気に入らなくて、
使い心地にやや不満があったんだけど、フォーマッターをかけるようにアップデートしてみた。

## インストール

Atomのアプリを開いて **Settings** → **Install** から、[**atom-csscomb**](https://atom.io/packages/atom-csscomb) で検索してもらうか、`apm`コマンドで以下を実行するとインストールできる。

```sh
$ apm install atom-csscomb
```

## 使い方

CSSファイルを開いて、またはCSSの一部分を選択した状態で

- `Control + Option + C`
- アプリケーションメニューの **Packages > CSSComb > Sort properties**
- 右クリックし、 **Sort properties**

をすることでソートが適用される。あるいは、保存時に都度実行するためのオプションも作ったので、こちらはお好みで。 **Settings > Packages > atom-csscomb** に **Execute on save** という項目があるので、チェックすると保存の度に実行されるようになる。

ソート順を自前で設定したいという人は、プロジェクトルートに`.csscomb.json`という定義ファイルを用意してもらうか、インストールされたパッケージフォルダ配下にある`~/.atom/packages/atom-csscomb/csscomb.json`を編集すればOK。
