---
layout: post
title: Web App Manifest
date: 2016-06-23
image: /img/posts/2016/web-app-manifest/devtools.png
---

# Web App Manifest

[Web App Manifest](https://developer.mozilla.org/ja/docs/Web/Manifest)は、Webページのメタ情報をJSON形式でフォーマット化したものである。

## Web App Manifestのサンプル

次のようなJSONファイルを用意して、`<link rel="manifest" href="manigest.json">`な感じでHTMLから参照する。`<link>`で指定するのでルートになくても動きそうだが、ファイルの性質的にルートに置いておきたい気持ちになる。

```json
{
  "name": "Awesome Example App",
  "short_name": "Example App",
  "start_url": "index.html",
  "icons": [ {
    "src": "images/icon-144x144.png",
    "sizes": "144x144",
    "type": "image/png",
    "density": "3.0"
  }],
  "display": "standalone"
}
```

Webページの振る舞いを直接制御する機能は持ちあわせておらず、ブラウザがロードしたときにWeb App Manifestがあるとそれに基づいて機能を補助するような位置付け。

具体的には、AndroidのChromeでWeb App Manifestが配信されているページを複数回訪問すると、バナーが表示されモバイルデスクトップへのインストールを促される。iOS Safariで実装が進んだ時にどのように機能するか不明だが、Progressive Web Appsの流れが進めば近い振る舞いが予想できる。が、Appleの場合はiOSのマーケットの事情もあると思うのでなんとも…。

## Web App Manifestに定義されている属性

- `dir`: テキストの向きを表す属性。`ltr`（左から右）・`rtl`（右から左）・`auto`（自動判定）のいずれか
- `lang`: 日本語なら`ja`、フランス語なら`fr`のようにページで使っている言語。値は[Tags for Identifying Languages](https://tools.ietf.org/html/bcp47)に準ずる
- `name`: Webアプリの名前
- `short_name`: Webアプリの名前の短縮形
- `description`: Webアプリの説明
- `scope`: アプリケーションのコンテキストとなるページのURLスコープ。サブディレクトリなどを指定したい場合など
- `icons`: WebアプリのアイコンのサイトやURL。詳細を後述
- `display`: Webアプリ起動時の表示モード。`fullscreen`・`standalone`・`minimal-ui`・`browser`のいずれか
- `orientation`: Webアプリ起動時の画面の向き。`any`・`natural`・`landscape`・`portrait`・`portrait-primary`・`portrait-secondary`・`landscape-primary`・`landscape-secondary`のいずれか
- `start_url`: Webアプリ起動時のURL
- `theme_color`: Webアプリのテーマ色。実装に依ってブラウザUIに適用され、Chromeではアドレスバーに適用される模様
- `related_applications`: 関連するアプリケーションのURL。詳細を後述
- `prefer_related_applications`: `related_applications`で指定された関連するアプリケーションを推奨するか否か。`true`・`false`のいずれか
- `background_color`: Webアプリの背景色。起動時のスプラッシュに使われたり、プレースホルダー色になったり

### `icons`

インストールバナーなどに使われるアイコンを指定する。少なくとも **144x144のPNG** がひとつ指定されている必要がある。某アプリでJPGだけを`icons`に指定したところ、インストールバナーが表示されなかった。

```json
{
  "icons": [{
    "src": "images/icon-144x144.png",
    "sizes": "144x144",
    "type": "image/png",
    "density": "3.0"
  }]
}
```

### `related_applications`

ネイティブアプリがある場合に、Google PlayやiTunesのURLを指定しておくと促されたりする。`web`を指定すると、`start_url`にもとづいてインストールが行われる。

```json
{
  "related_applications": [{
    "platform": "web"
  }, {
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=com.example.app1",
    "id": "com.example.app1"
  }, {
    "platform": "itunes",
    "url": "https://itunes.apple.com/app/example-app1/id123456789"
  }]
}
```

## Web App Manifestのデバッグ

JSONがWeb App Manifestとして妥当かどうかは[Web Manifest Validator](https://manifest-validator.appspot.com/)を使ってチェックできる。ファイルのアップロードでも、テキストのペーストでも、配信されているURLでもOK。

Webページで配信されているWeb App Manifestのデバッグには、DevToolsに搭載されているApplicationタブが便利で、ApplicationセクションのManifest項目に詳細が表示される。ホームスクリーンへの追加もここでエミュレートできる。

![](/img/posts/2016/web-app-manifest/devtools.png)

## 参考資料

最後に、Totally Tooling Tipsでの紹介動画と[Google Developersの記事](https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android)を。

<div class="YouTube">
  <iframe 
    src="https://www.youtube.com/embed/yQhFmPExcbs" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</div>
