---
layout: post
title: Backbone.jsのAjaxについて
date: 2012-12-18
---

# Backbone.jsのAjaxについて

## この記事は、Backbone.js Advent Calendar 18日目の記事です

Backbone.js Advent Calendarに参加させて頂きました。2012/12/18担当。
JavaScriptにMVCの波を巻き起こしているBackbone.jsのAjax周りについて。
想像していたより、皆さん突っ込んだこと書いてて、どうしようと思いましたが。まぁいっか。

- [Backbone.js Advent Calendar 2012](http://www.adventar.org/calendars/15)

## Backbone.jsのAjax

Backbone.jsのMVCは、ModelとCollectionにサーバーとの非同期通信関数を備えています。
依存しているUnderscore.jsは配列操作などのUtility関数を提供していますが、Ajaxそのものの処理は備えていません。
そこで出てくるのが、Backbone.jsはサーバーとの非同期通信をどのように行っているのかという疑問。

## jQueryなどのライブラリのajax関数を使っている

10日目のエントリー[Backbone.js1.0に向けての変更点 - NAVER Engineers' Blog](http://tech.naver.jp/blog/?p=2342)で紹介されていますが、Backbone.jsはロード時にグローバルのjQuery / Zepto / enderのいずれかを格納します。

```js
var $ = root.jQuery || root.Zepto || root.ender;
```

BackboneではBackbone.syncメソッドが通信の接点になっており、あれこれしたあと最後で`$.ajax()`をコールして非同期通信を行います（もちろん`$.ajax()`以外も使用されていますが）。
`Backbone.sync`は`Backbone.Model`(or Backbone.Collection)で提供される`fetch()` / `save()` / `destroy()`の中で通信する際に使用されます。
各ライブラリの`$.ajax()`のパラメータインターフェースが共通なのでこのような受け方が可能になっている。

fetchなどで渡すパラメータのsuccessとerrorは、`$.ajax()`のsuccessとerrorに渡される形になるようです。

## [Model.fetch() | Collection.fetch()](https://github.com/enja-oss/Backbone/blob/master/docs/Model.md#fetch-modelfetchoptions-)

データの取得系の処理はこのメソッドを通して行いましょう。

## [Model.save()](https://github.com/enja-oss/Backbone/blob/master/docs/Model.md#save-modelsaveattributes-options-)

データの保存または更新の処理はこのメソッドを通して行いましょう。Backbone.Collectionのcreate()はここを内部的に通ります。

## [Model.destroy()](https://github.com/enja-oss/Backbone/blob/master/docs/Model.md#validate-modelvalidateattributes-)

データの削除系の処理はこのメソッドを通して行いましょう。

## emulateHTTPとemulateJSON

リクエストヘッダのapplication/jsonは、古いサーバーだと対応できません。
その場合`emulateJSON`を`true`にすることで、リクエストヘッダのcontentType、`application/json`を`application/x-www-form-urlencoded`に書き換えます。
また、古いサーバーだとPUT、DELETE、PATCHリクエストに対応していない場合があります。`emulateHTTP`を`true`にすることでリクエストヘッダを上書き、POSTリクエストします。
その際、`emulateJSON`が`true`の場合_methodのパラメータに元のリクエストメソッドを保持します。

レガシーサーバー用なので、古いサーバーに対応する必要がない場合は、どちらも`true`にする必要はないでしょう。

## まとめ

明確なAPIラップ関数の用意と、それ以上にchange / destroy / syncとイベントの発行に関わっています。  
また、underscore依存といいつつ、事実上のjQuery依存ですね。

以上、簡単ではありますがBackbone.js Advent Calendar 18日目の記事でした！

## 追記でお詫び

書ききったあとに気づいたんですが、[2日目の記事](http://blog.mitsuruog.info/2012/12/backbonelocalstoragejsbackbonesync.html)で似たような内容ちょっと言及されていました。被ってごめんなさい。(2012/12/17 22:22:22)