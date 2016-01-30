---
layout: post
title: Polymerについての所感
date: 2015-01-30
---

# Polymerについての所感

Polymerを使ったWeb Componentsに[`<twitter-button>`](https://github.com/zenorocha/twitter-button)、[`<facebook-button>`](https://github.com/zenorocha/facebook-button)、[`<gplus-one>`・`<gplus-follow>`](https://github.com/zenorocha/gplus-elements)がある。Polymerのバージョンが古かったのでプルリクエストを送ったんだけど、修正しながら考えてたことを書いてみた。

## Polymerに依存するWeb Components

Polymerで作ったWeb Componentsは、jQueryとそのプラグインの関係に似てると思ってる。それが配布されることを考えてみよう。

そのコンポーネントのバージョンはPolymerのバージョンに依存することは、使いたいコンポーネントが依存するPolymerが複数存在してしまう可能性を示唆している。Polymerがまだベータ版で後方互換性のない変更が起こる可能性を考えると、依存バージョンがてんでバラバラのWeb Componentsが散乱しかねないんじゃないかと。

実際、Polymerの0.8previewでは、Web Componentsの定義を`<polymer-element>`ではなく、`<template>` + `<script>`に変更するっぽい。この変更については素のWeb Componentsとの互換性を加味したアップデートかもしれないけど、今まで`<polymer-element>`で作成してきたコンポーネントは早くも埃を被る結果になってしまう。

このように、Polymerを使ったWeb Componentsを配布することには、現段階ではややリスクがあるかなと思っている。ただ、配布はしないにしてもプロダクトには何の躊躇もなく使ってしまいそうではある。

## 不可能を可能にする

ブラウザデフォルトでは実行できなそうなコードもPolymerの手にかかれば動いてしまう。以下の2つを例示。

### Shadow DOM配下のlink要素は無効である

>7.1 Inert HTML Elements
>A subset of HTML elements must behave as inert, or not part of the document tree. This is consistent how the HTML elements would behave in a document fragment. These elements are:
>
>- base
>- link
>
>All other HTML elements in the shadow trees must behave as if they were part of the document tree.

via http://www.w3.org/TR/shadow-dom/#inert-html-elements

### `extends`にカスタム要素を指定することは出来ない

>Note the use of extends option to specify that the element is being registered as a type extension -- that is, this element does not introduce a new tag (like the custom tag elements do), but rather extends an existing element of type HTMLParagraphElement. Here's how one could instantiate this element:

via http://www.w3.org/TR/custom-elements/#extensions-to-document-interface-to-register

いずれも素のWeb Componentsだと不可能になっているところなのに、[`link`要素はCSSファイルをリクエストして`<style>`で埋め込み](/posts/2014/link-element-in-shadow-dom.html)してしまうし、[`extends`にカスタム要素の指定も出来てしまう](https://www.polymer-project.org/docs/polymer/polymer.html#extending-other-elements)。

便利な半面、W3Cの仕様と反する挙動でもあるので、ブラウザデフォルトの振る舞いを勘違いすらさせてしまう副作用を感じる。賛否両論というよりは、利用シーンに応じた使い分けの問題であり、つまるところ開発者のリテラシーに行き着いてしまう。

## やっぱり便利な付加機能

とにかく強い。Web Componentsに何が補強されているかは[Polymer と Web Components の違い9選（もとい Polymer の便利機能）](http://havelog.ayumusato.com/develop/webcomponents/e603-diff_of_polymer_and_webcomponents.html)でも言及されているが、そのままでは~~貧弱~~シンプルな`<template>`の機能に、Mustacheみたいなテンプレート機能があったり、それがそのままJS側の変数とデータバインディングされていたりと、もはやチートレベルだ。

ライフサイクルコールバックのエイリアスがあったり、各種便利そうなイベントが用意されていたり、カスタム要素の煩雑な定義手順が大幅に簡略化されていたりと。`attributes`による属性の定義は`Object.defineProperty()`よりずっと楽ちんだし、わかりやすい。

Webを構築する上で土台になる機能はCore Elementsとしてコンポーネント化されているので、それらを使うことを加味しても素のWeb Componentsだけで設計していくよりはPolymerのお作法に乗っかるほうが安心だし、早いし、楽かと思う。

## 総論

ややトゲ混じりの内容になった気もするけど、Polymer（jQuery）を使うことに特に嫌悪感はない。手っ取り早くアレコレするにはやっぱり便利だとは思うので。

APIをラップして補強・簡易化している点は同じ。jQueryと異なるのは、Polymer単体で何か嬉しいのではなく、PolymerでWeb Componentsを作る時に凄く便利であるという点。つまり、jQueryで言うところのプラグインが前提（というか主役）になるところ。

jQueryプラグインは使わないかなーという気持ちなんだけど、Polymer依存のWeb Componentsには今のところ手が伸びる。最初に書いたPolymerのバージョンにまつわる問題がチラホラ出てきたりすると、PolymerもjQueryと同じ道を辿ってしまうのかなという心配もある。

Polymerを使ったコンポーネントを開発し配布する側、古びたコンポーネントを使う側の問題、言ってしまえばそうなんだけど…。

Web Componentsの普及という目的は、きっと果たされるんだろう。
