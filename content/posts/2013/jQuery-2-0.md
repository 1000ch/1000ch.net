---
layout: post
title: jQuery 2.0がリリースされた
date: 2013-04-19
---

# jQuery 2.0がリリースされた

- [jQuery 2.0 Released](http://blog.jquery.com/2013/04/18/jquery-2-0-released/)

IE6~8のサポートを切って、再設計されたjQuery 2.0がリリースされた。開発には10ヶ月程かかったそう。

## ファイルサイズ

Uncompressedで1.9と比較してみると…

- jQuery 1.9のデフォルトパッケージ→9597行
- jQuery 2.0のデフォルトパッケージ→8755行

### ファイルサイズはあまり軽量化されていない。

IE対応を削ったところでそこまで軽くならないっていう。12%程軽量化されていると共に、パフォーマンスが良くなったそう。

## 対応ブラウザ

Webkit(もとい、Blink)とGeckoは良いとして、IEは9から動く様子。あとはこのあたり。引用します。

- Google Chrome add-ons
- Mozilla XUL apps and Firefox extensions
- Firefox OS apps
- Chrome OS apps
- Windows 8 Store (“Modern/Metro UI”) apps
- BlackBerry 10 WebWorks apps
- PhoneGap/Cordova apps
- Apple UIWebView class
- Microsoft WebBrowser control
- node.js (combined with jsdom or similar)

## APIとか

jQuery1.9と互換性がある。1.9以前との互換性については[MigratePlugin](https://github.com/jquery/jquery-migrate/#readme)を導入することで対応出来るが、個人的には頼らず、2.0のAPIでリファクタリングすることをオススメしたい。それは削除されたAPIなのだから。

## [カスタムビルド](https://github.com/jquery/jquery/#how-to-build-your-own-jquery)

もはや当たり前(?)になってきているカスタムビルド。jQueryもgruntを使ったカスタムビルドを提供しているので、要らない機能は省いた構成に。

- ajax - ajax周りの関数諸々。
- ajax/xhr - XMLHttpRequestのシンプルな実装。
- ajax/script - scriptの非同期ダウンロードメソッドの提供。
- ajax/jsonp - クロスドメイン用。当然、要らないなら入れない。
- css - `.css()`と、`.show()` / `.hide()` / `.toggle()`の提供。個人的には`.addClass()` / `.removeClass()`でやるので、使わないかも。
- deprecated - 非推奨関数。今のところ`.andSelf()`だけっぽい。
- dimensions - 高さと幅を取得する`.width()`と`.height()`の提供。
- effects - アニメーションを実現する`.animate()`。$.Animationオブジェクト周り。あとはショートハンドとして、`.slideUp()` / `.slideToggle()` / `.slideDown()` / `.fadeIn()` / `.fadeToggle()` / `.fadeOut()`。
- event-alias - `.on("click", fn)`じゃなくて`.click(fn)`と記述出来るようにするエイリアスを提供。onで良いのではと思ってる。
- offset - `.offset()` / `.position()` / `.offsetParent()` / `.scrollLeft()` / `.scrollTop()`の提供。これも要件によっては使わない。
- wrap - `.wrap()` / `.wrapAll()` / `.wrapInner()` / `.unwrap()`の提供。便利はさておき、実装が好きじゃないので僕は入れない。ユースケースも少ないような…。
- sizzle - セレクタエンジン。これを省くとブラウザのquerySelectorAllを主に使用した要素選択になる。

## まとめ

あとはユニットテストとか出来るけど、それはまぁいいか。「再設計して軽量化・高速化」というjQuery2.0のロードマップについて、特に軽量化については淡い期待を抱いていたが、あんまり軽くならなかった。これについては、「jQueryさえあれば他は要らない」という状態にするためのライブラリとしてのスタンスもあるので、仕方ないかな。