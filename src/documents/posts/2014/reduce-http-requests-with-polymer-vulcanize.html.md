---
layout: post
title: Vulcanizeで減らすHTML ImportsのHTTPリクエスト
date: 2014-09-05
description: Web Componentsの旨味はコンポーネントの再利用が出来る所にあるので、そのためにはそのリソースは断片化は避けられない。
---

# Vulcanizeで減らすHTML ImportsのHTTPリクエスト

Web Componentsの旨味はコンポーネントの再利用が出来る所にあるので、そのためにはそのリソースは断片化は避けられない。
`<x-element>`を構成するリソースは`x-element.html`に集約し、使うときにはHTML Importsでロードする。
実際には複数のWeb Componentsを利用したいケースは当たり前にあることなので、素直にやろうとすると以下のように。

```html
<link rel='import' href='x-element.html'>
<link rel='import' href='y-element.html'>
<link rel='import' href='z-element.html'>
```

**このHTMLではこのWeb Componentsをロードしている** というのが明確ではあるけど、インポートには当然HTTPリクエストを伴うので、パフォーマンスの観点からはあまりよろしくない。
今回はPolymerチームが提供しているVulcanizeを使ってこの辺りを最適化してみる。

- [Concatenating Web Components with Vulcanize](http://www.polymer-project.org/articles/concatenating-web-components.html)
- [Polymer/vulcanize](https://github.com/Polymer/vulcanize)

VulcanizeはインポートしているHTMLを、インポート先に書き出して`<link rel='import'>`を除くような処理をする。

## インストールと使い方

npmからインストール出来るので早速インストール。

```bash
# vulcanizeのインストール
$ npm install -g vulcanize
```

vulcanizeコマンドを使って、インポートを行っているHTMLを指定する。

```bash
# index.html内のHTMLImportsをアレコレしてbuild.htmlとして出力
$ vulcanize -o build.html index.html
```

実際に結合されたリソースは`<div hidden></div>`で挟んである以外は、結合だけされているような感じ。
HTML Importsの仕組みを考えれば、実行時に問題が起きたりしなそうなのも納得できる。
以下は、とある`<y-elements>`に依存している`<x-element>`のイメージ。

```html
<link rel='import' href='y-element.html'>
<template id='x-element-template'>
  <x-element>
    <content></content>
  </x-element>
</template>
<script>
  //...
</script>
```

これをVulcanizeしてみると

```html
<div hidden>
  <template id='y-element-template'>
    <div>
      <content></content>
    </div>
  </template>
  <script>
    //...
  </script>
</div>
<template id='x-element-template'>
  <x-element>
    <content></content>
  </x-element>
</template>
<script>
  //...
</script>
```

のように展開される。

## ビルドフローに組み込んでみる

- ロードしているコンポーネント群を全て結合したい
- あくまで`<link rel='import'>`ベースで結合するので、Vulcanizeの対象は単一のHTML

という前提があるので、Web Componentsをロードしてる`<link>`だけを抜き出して別ファイルに用意。

```html
<link rel='import' href='x-element.html'>
<link rel='import' href='y-element.html'>
<link rel='import' href='z-element.html'>
<link rel='import' href='twitter-button/twitter-button.html'>
<link rel='import' href='facebook-butotn/facebook-button.html'>
```

デバッグ時にはこのHTMLをインポートし、デプロイ時にはこのHTMLをVulcanizeでビルドしたものをロードすれば良い。
インポートをしているHTML（実際にカスタム要素を使っているHTML）そのもののビルドも出来るわけで、HTTPリクエストだけを考えればそれが一番良いかもしれない。
でも、テンプレートエンジンを使ってたり、他のページに展開されたりすることを考えてみると、Web Componentsだけをまとめておくのがバランス良さそう。発想は外部CSSファイルの扱いと同じ。

ビルドして展開されたHTMLも圧縮したらいいんじゃねと思って今回はそれもやった。

- https://github.com/Polymer/grunt-vulcanize
- https://github.com/gruntjs/grunt-contrib-htmlmin
    - https://github.com/kangax/html-minifier
    
## 最適化前後の例

### Before

<img src='/img/posts/reduce-http-requests-with-polymer-vulcanize/before.png' width='100%'>

### After

<img src='/img/posts/reduce-http-requests-with-polymer-vulcanize/after.png' width='100%'>

## 所感

リソースの断片化によるHTTPリクエストの増加はVulcanizeで解決出来る。でも事前にビルドするということが前提になる。
Web Componentsの謳い文句である **「再利用」** を考えればbowerとかnpmだけじゃなく、ネットワークからダイレクトにコンポーネントをロードしたいケースも多々ある。
それがorigamiのようなCDNで配信側でビルドされて返却されるようになるのか、はたまたHTTP2の普及で気にしなくなる時が来るのかわからないけど、それまではVulcanize使うと良さそう。