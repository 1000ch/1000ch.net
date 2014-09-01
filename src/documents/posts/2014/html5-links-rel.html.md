---
layout: post
title: linkのrelの種類と効能等
date: 2014-09-01
description: Web Componentsの流れでHTMLImportsをよく見るようになったり、パフォーマンス周りでプリフェッチ系の属性がlinkで指定するようになったりしている今日この頃。
---

# `<link>`のrelの種類と効能等

Web Componentsの流れでHTMLImportsをよく見るようになったり、パフォーマンス周りでプリフェッチ系の属性が`<link>`で指定するようになったりしている今日この頃。気になったのでW3Cの **Links in HTML documents** を眺めたメモ。

- [Links in HTML documents](http://www.w3.org/TR/html401/struct/links.html)

## そもそもリンクとは一体何なのか？

Webにおけるリンクは、`<a>`と`<link>`の2種類がある。それらには、 **Webのあらゆるリソースの場所** を示す役割が与えられている。つまり、`href`で指定しているURLがそれにあたる。そのURLの振る舞いの種類については、`rel`や`rev`で記述する、と。`rev`って削除されるんだっけ？

`<img>`や`<form>`といったように、リソースへのリンクはその他のHTML要素でも行う。が、`<link>`についてはドキュメントの`<head>`にだけ記述し描画されず、`<a>`はドキュメントの`<body>`にのみ現れる。

## 気になる`rel`の種類

`rel`に指定するのは **リンク元から見たリンク先の種別** 。だから、利用シーンをあまり見ないけど、`<a>`でも`rel`は指定可能である。

- [6.12 Link types](http://www.w3.org/TR/html401/types.html#type-links) HTML4.01のRecommendation
- [4.8 Links — HTML5](http://www.w3.org/TR/html5/links.html) HTML5のCandidate Recommendation

HTML5の方を列挙してみる。

| 種類 | [`<link>`](http://www.w3.org/TR/html5/document-metadata.html#the-link-element) | [`<a>`](http://www.w3.org/TR/html5/text-level-semantics.html#the-a-element) & [`<area>`](http://www.w3.org/TR/html5/embedded-content-0.html#the-area-element) | 説明 |
| --- | --- | --- | --- |
| [alternate](http://www.w3.org/TR/html5/links.html#rel-alternate) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | 代替となるドキュメントを指定する。 |
| [author](http://www.w3.org/TR/html5/links.html#link-type-author) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | ドキュメントや記事の著者へのリンクを指定する。 |
| [bookmark](http://www.w3.org/TR/html5/links.html#link-type-bookmark) | _not allowed_ | Hyperlink | 最も近い先祖セクションへのパーマリンクを指定する。 |
| [help](http://www.w3.org/TR/html5/links.html#link-type-help) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | ドキュメントに対するヘルプへのリンクを指定する。 |
| [icon](http://www.w3.org/TR/html5/links.html#rel-icon) | [External Resource](http://www.w3.org/TR/html5/links.html#external-resource-link) | _not allowed_ | 現在のドキュメントを代理するアイコンをインポートする。 |
| [license](http://www.w3.org/TR/html5/links.html#link-type-license) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | 現在のドキュメントのライセンスを説明するドキュメントを指定する。 |
| [next](http://www.w3.org/TR/html5/links.html#link-type-next) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | 現在のドキュメントはシリーズの一部であることを示し、連続する次のドキュメントを指定する。 |
| [nofollow](http://www.w3.org/TR/html5/links.html#link-type-nofollow) | _not allowed_ | [Annotation](http://www.w3.org/TR/html5/links.html#hyperlink-annotation) | 現在のドキュメントのオリジナルの著者や発行者が参照されたドキュメントを支持しないことを示す。 |
| [noreferrer](http://www.w3.org/TR/html5/links.html#link-type-noreferrer) | _not allowed_ | [Annotation](http://www.w3.org/TR/html5/links.html#hyperlink-annotation) | ハイパーリンクに飛ぶ際、HTTPリファラを送信しないことを要求する。 |
| [prefetch](http://www.w3.org/TR/html5/links.html#link-type-prefetch) | [External Resource](http://www.w3.org/TR/html5/links.html#external-resource-link) | [External Resource](http://www.w3.org/TR/html5/links.html#external-resource-link) | 先行してキャッシュされるべきリソースを指定する。 |
| [prev](http://www.w3.org/TR/html5/links.html#link-type-prev) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | 現在のドキュメントはシリーズの一部であることを示し、連続する前のドキュメントを指定する。 |
| [search](http://www.w3.org/TR/html5/links.html#link-type-search) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | 現在のドキュメントや関連するページを探すためのリソースへのリンクを指定する。 |
| [stylesheet](http://www.w3.org/TR/html5/links.html#link-type-stylesheet) | [External Resource](http://www.w3.org/TR/html5/links.html#external-resource-link) | _not allowed_ | スタイルシートのインポート。 |
| [tag](http://www.w3.org/TR/html5/links.html#link-type-tag) | _not allowed_ | [Hyperlink](http://www.w3.org/TR/html5/links.html#hyperlink) | 与えられたアドレスで特定されるタグを付与する。 |

`<link rel='dns-prefetch' href='[URL]'`とかも対応ブラウザでは動くけど、ドラフトにもない。

## HTML Imports

先程の表には`<link rel='import'>`も含まれていない。これはまだワーキングドラフトだからだと思うけど、せっかくなので紹介。

- [HTML Imports](http://www.w3.org/TR/html-imports/)

>To enable declaring imports in HTML, a new link type is added to HTML link types:
>The import keyword may be used with link elements. This keyword creates an external resource link to an import.
>The default type for resources given by the import keyword is text/html.
>The link element may have an async attribute. The async attribute is a boolean attribute.
>The appropriate time to obtain the resource is when the external resource link is created or when its element is inserted into a document, whichever happens last.

ざっくり翻訳。

>HTMLにおける宣言的なインポートを可能にし、新たなリンクタイプとして追加される。
>importキーワードはlink要素に使われる。importキーワードによって外部リソースをインポートするリンクを作成する。
>importによって与えられるリソースのデフォルトの種別はtext/htmlである。
>link要素にはasync属性がある。async属性は真偽値である。
>指定されたリソースの獲得は、リンクが作成されたときかlink要素がドキュメントに追加されたタイミングで、いずれも最後に実行される。

オチも見つからなかったわけだけど、せっかく一覧表まで組んだので記事にしてしまった。