---
layout: post
title: 閲覧履歴を簡単に消せるGoogleChromeの拡張機能を作った
date: 2013-3-9
---

# 閲覧履歴を簡単に消せるGoogleChromeの拡張機能を作った

[t32k](https://twitter.com/t32k/)氏に影響されてGoogleChromeの拡張機能を作ってみました。  
アイコンのクリックで全履歴を消すという非常にシンプルな機能です。  
ソースも非常に小さい構成になっています。何か参考になれば。  
機能・実装がブラッシュアップされてきたらウェブストアへの登録もしてみようかな、と。  

- [1000ch / OneClickClear - GitHub](https://github.com/1000ch/OneClickClear)

以下の手順でも使えます。  

- GitHubからソースをクローン
- アドレスバーに`chrome://settings/`と入力し左の「拡張機能」を選択
- 「ディベロッパーモード」にチェックを入れる
- 「パッケージ化されていない拡張機能を読み込む」でクローンしたフォルダを選択

## Extensionの構成

GoogleChromeのExtensionは大まかに言って、  
`html` / `css` / `js` / `manifest.json`の4つから構成されています。  

そう、 **拡張機能といってもc++を書く訳ではない** のです。  
基本的にhtml/cssで描画されており、jsでGoogleChromeのAPIにアクセスしたり、という単純なもの。  
（ **つまり、あの非常に優秀なディベロッパーツールもhtml/css/js。恐ろしや。** ）  
想定しているよりもずっと敷居が低いのです。  

## 肝となるのはmanifestファイル

Extensionにも実行されるタイミングが色々あります。  
特定のURLを開いたときとか、その拡張機能のアイコンをクリックした時とか。  
その辺のコントロールをしているのが`manifest.json`です。  
ファイルのロードされる瞬間とかも担っているので、  
これがわからないとjsのデバッグまで辿り着けない。  

### 逆に、これがわかれば`console.log`を駆使して何でもできる。  

## manifest.jsonのサンプル

後述で紹介するGoogleの公式ドキュメントに詳しく載っていますが、  
以下は今回作った拡張機能の例です。  

```json
{
	"name": "OneClickClear",		//拡張機能の名前（必須）
	"version": "0.0.1",				//拡張機能のバージョン（必須）
	"manifest_version": 2,			//マニフェストファイルのバージョン（必須）
	"description": "",				//拡張機能の説明（推奨）
	"permissions": ["history"],		//historyオブジェクトにアクセスするための許可
	"background": {
		"scripts": ["js/main.js"]		//バックグラウンドで実行するjsファイル
	},
	"browser_action": {				//アイコンをGoogleChromeのツールバーに置くのでその設定
		"default_icon": "img/trash.ico",	//配置されるアイコン
		"default_title": "OneClickClear"	//タイトル
	}
}
```

実行される`main.js`の中でツールバーのアイコンがクリックされる瞬間を拾って、  
履歴オブジェクトにアクセスして削除するというとっても単純な造り。  
でもその指定を、`"background":...`に指定しなければならなかったり、  
履歴オブジェクトを操作するので、`"permissions": ["history"]`と記述しなければならなかったり。  
やはりmanifest.jsonが肝ですね…。  

### manifest.jsonを制する者がchrome extensionを制する

## デバッグの取っ掛かり

最初の使う手順の話で出ましたが、拡張機能の実装が配置された  
`manifest.json`があるディレクトリを、ディベロッパーモードにしてロードするだけです。実に簡単。  
`console.log`の出力もディベロッパーツールで確認することができます。  
ただし、今回のような出力先のビューレイヤーがないbackgroundでの実行は、  
`chrome://extensions/`の、ロードした拡張機能のビューを調査で生成されている  
`background.html`で確認出来ます。事前に作っておいても大丈夫でしょう。  

## 言いたいことは難しくないということ

html/css/jsの知識があり、ビビらなければ誰でも作れます。  
お遊び半分で作っているうちに高度なものが作れるようになるはず。  
（技術的なことって大抵この流れを辿りませんか？）  

## 参考URL

- [Google Chrome拡張機能とはなにか？ - ドットインストール](http://dotinstall.com/lessons/basic_chrome_v2/14001)
- [Formats: Manifest Files - chrome extensions](http://developer.chrome.com/extensions/manifest.html)
- [chrome.*APIs - chrome extensions](http://developer.chrome.com/extensions/api_index.html)
