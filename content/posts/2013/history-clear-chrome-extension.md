---
layout: post
title: 閲覧履歴を簡単に消せるGoogleChromeの拡張機能を作った
date: 2013-03-09
---

# 閲覧履歴を簡単に消せるGoogleChromeの拡張機能を作った

[@t32k](https://twitter.com/t32k/)氏に影響されてGoogleChromeの拡張機能を作ってみた。アイコンのクリックで全履歴を消すという非常にシンプルな機能。ソースも非常に小さい構成になっています。何か参考になれば。機能・実装がブラッシュアップされてきたらウェブストアへの登録もしてみようかな、と。

- [1000ch / OneClickClear - GitHub](https://github.com/1000ch/OneClickClear)

以下の手順でも使える。

- GitHubからソースをクローン
- アドレスバーに`chrome://settings/`と入力し左の「拡張機能」を選択
- 「ディベロッパーモード」にチェックを入れる
- 「パッケージ化されていない拡張機能を読み込む」でクローンしたフォルダを選択

## Extensionの構成

ChromeのExtensionは大まかに言って、`html` / `css` / `js` / `manifest.json`の4つから構成されている。

つまり、 **拡張機能といってもc++を書く訳ではない** 。基本的にhtml/cssで描画されており、JSでChromeのAPIにアクセスしたり、という単純なもので、想定しているよりもずっと敷居が低い。

## 肝となるのはmanifestファイル

Extensionにも実行されるタイミングが色々あります。特定のURLを開いたときとか、その拡張機能のアイコンをクリックした時とか。そのコントロールをしているのが`manifest.json`。ファイルのロードされる瞬間とかもこれ次第なので、これがわからないとJSのデバッグまで辿り着けない。 **逆に、これがわかれば`console.log`を駆使して何でもできる** 。

## `manifest.json`のサンプル

後述の公式ドキュメントに詳しく載っているが、以下は今回作った拡張機能の例。

```json
{
  "name": "OneClickClear",			//拡張機能の名前（必須）
  "version": "0.0.1",						//拡張機能のバージョン（必須）
  "manifest_version": 2,				//マニフェストファイルのバージョン（必須）
  "description": "",						//拡張機能の説明（推奨）
  "permissions": ["history"],		//historyオブジェクトにアクセスするための許可
  "background": {
    "scripts": ["js/main.js"]		//バックグラウンドで実行するjsファイル
  },
  "browser_action": {						//アイコンをGoogleChromeのツールバーに置くのでその設定
    "default_icon": "img/trash.ico",	//配置されるアイコン
    "default_title": "OneClickClear"	//タイトル
  }
}
```

実行される`main.js`の中でツールバーのアイコンがクリックされる瞬間をハンドリングし、履歴オブジェクトにアクセスして削除するという単純な造り。でもその指定を、`"background":...`に指定しなければならなかったり、履歴オブジェクトを操作するので、`"permissions": ["history"]`と記述しなければならなかったり。やはり`manifest.json`が肝な感じ。 **`manifest.json`を制する者がchrome extensionを制する** 。

## デバッグの取っ掛かり

使う手順の話で出たが、拡張機能の実装が配置された`manifest.json`があるディレクトリを、ディベロッパーモードにしてロードするだけ。実に簡単。`console.log`の出力もディベロッパーツールで確認することができる。

ただし、今回のような出力先のビューレイヤーがないbackgroundでの実行は、`chrome://extensions/`の、ロードした拡張機能のビューを調査で生成されている`background.html`で確認が可能。事前に作っておいても大丈夫。

## 言いたいことは難しくないということ

HTML、CSS、JSの知識があれば誰でも作れる。お遊び半分で作っているうちに高度なものが作れるようになるはず。

## 参考URL

- [Google Chrome拡張機能とはなにか？ - ドットインストール](http://dotinstall.com/lessons/basic_chrome_v2/14001)
- [Formats: Manifest Files - chrome extensions](http://developer.chrome.com/extensions/manifest.html)
- [chrome.*APIs - chrome extensions](http://developer.chrome.com/extensions/api_index.html)