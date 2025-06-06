---
title: Backbone.jsのAjaxについて
date: 2012-12-18
---

この記事は[Backbone.js Advent Calendar 2012](http://www.adventar.org/calendars/15) 18日目の記事です。

JavaScriptにMVCの波を巻き起こしているBackbone.js、今回はそのAjax周りについて。想像していたより、皆さん突っ込んだこと書いててどうしようと思ったけど、まぁいいや。

## Backbone.jsのAjax

Backbone.jsのMVCは、ModelとCollectionにサーバーとの非同期通信関数を備えている。依存しているUnderscore.jsは配列操作などのUtility関数を提供しているが、Ajaxそのものの処理は備えていない。そこで出てくるのが、Backbone.jsはサーバーとの非同期通信をどのように行っているのかという疑問。

## jQueryなどのライブラリのajax関数を使っている

10日目のエントリー[Backbone.js1.0に向けての変更点 - NAVER Engineers' Blog](http://tech.naver.jp/blog/?p=2342)で紹介されているが、Backbone.jsはロード時にグローバルのjQuery / Zepto / enderのいずれかを格納する。

```js
var $ = root.jQuery || root.Zepto || root.ender;
```

BackboneではBackbone.syncメソッドが通信の起点になっており、あれこれしたあと最後で`$.ajax()`をコールして非同期通信を行う（もちろん`$.ajax()`以外も使用されている）。`Backbone.sync`は`Backbone.Model`(or Backbone.Collection)で提供される`fetch()` / `save()` / `destroy()`の中で通信する際に使用される。

これは、各ライブラリの`$.ajax()`のパラメータインターフェースが共通なのでこのような受け方が可能になっている。fetchなどで渡すパラメータのsuccessとerrorは、`$.ajax()`のsuccessとerrorに渡される形になるっぽい。

## [Model.fetch() | Collection.fetch()](https://github.com/enja-oss/Backbone/blob/master/docs/Model.md#fetch-modelfetchoptions-)

データの取得系の処理はこのメソッドを通して行う。

## [Model.save()](https://github.com/enja-oss/Backbone/blob/master/docs/Model.md#save-modelsaveattributes-options-)

データの保存または更新の処理はこのメソッドを通して行う。Backbone.Collectionのcreate()はここを内部的に通る。

## [Model.destroy()](https://github.com/enja-oss/Backbone/blob/master/docs/Model.md#validate-modelvalidateattributes-)

データの削除系の処理はこのメソッドを通して行う。

## emulateHTTPとemulateJSON

リクエストヘッダの`application/json`は、古いサーバーだと対応できない。その場合`emulateJSON`を`true`にすることで、リクエストヘッダのcontentType、`application/json`を`application/x-www-form-urlencoded`に書き換える。

また、古いサーバーだとPUT、DELETE、PATCHリクエストに対応していない場合がある。`emulateHTTP`を`true`にすることでリクエストヘッダを上書き、POSTリクエストする。その際、`emulateJSON`が`true`の場合_methodのパラメータに元のリクエストメソッドを保持する。

レガシーサーバー用なので、古いサーバーに対応する必要がない場合は、どちらも`true`にする必要はない。

## まとめ

明確なAPIラップ関数の用意と、それ以上に`change` / `destroy` / `sync`とイベントの発行に関わっている。また、underscore依存といいつつ、事実上jQueryに依存している。
