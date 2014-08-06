---
layout: post
title: Web制作者のためのCSS設計の教科書 書評
date: 2014-08-04
description: この本を読んで、より良いWeb開発を。
---

# Web制作者のためのCSS設計の教科書 書評

( •́谷•̀)「CSSの本書いたよーヽ(=´▽`=)ﾉ」

ということで[@hiloki](http://twitter.com/hiloki)さんから頂きました。ありがとうございます。

<img src='/img/posts/css-architexture-textbook/book.jpg' width='100%'>

## 著者（[@hiloki](http://twitter.com/hiloki)）について

前著も有名で、私から改めて紹介するまでもないかもしれませんが、カンファレンスや様々な勉強会でCSSについての講演を数多く行ってきており、 **CSSが持つ弱点を理解し、設計の重要性を訴えてきた有識者の一人** です。

[スライド](http://www.slideshare.net/hiloki)を見ると分かる通り、[CSSプリプロセッサの話](http://www.slideshare.net/hiloki/css-16247228)に始まり、[CSSの設計の話](http://www.slideshare.net/hiloki/thinking-about-css-architecture)や、最近では[Web Componentsを交えた話](http://www.slideshare.net/hiloki/css-components)もされていて、CSSと戦ってきた傷跡が生生と感じられます（大袈裟）。今回の著書は得てきたナレッジの集大成といえるのではないでしょうか。

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=B00C2ICGPU&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

## 内容について

各章の概要をざっと振り返ってみます。

- 第1章 CSSにおける設計とは
- 第2章 CSSの基本を振り返る
- 第3章 コンポーネント設計のアイデア
- 第4章 コンポーネント設計の実践
- 第5章 CSSプリプロセッサを用いた設計と管理
- 第6章 コンポーネントの運用に必要なツール
- 第7章 Web Componentsの可能性

### 第1章 CSSにおける設計とは + 第2章 CSSの基本を振り返る

では、CSSの特徴を踏まえた基礎理念について書かれています。この辺りは[Code smells in CSS](http://csswizardry.com/2012/11/code-smells-in-css/)に感化されている部分もあるかもしれません。

### 第3章 コンポーネント設計のアイデア + 第4章 コンポーネント設計の実践

では、HTMLとCSSで作成したUIパーツのコンポーネント化（流用しやすい形にする）について。CSSには、一般的なプログラム言語が備えるスコープが存在せず、同名のクラスが宣言されるとスタイリングが上書きされてしまうという特徴があります。
そういった問題に対しては命名規則を工夫するというアプローチが数多くされてきました。コンポーネント設計を念頭に置きつつ、[OOCSS](https://github.com/stubbornella/oocss/)、[SMACSS](https://smacss.com/ja)、[BEM](http://bem.info/)、[MCSS](http://operatino.github.io/MCSS/ja/)の理念や、それらの手法を咀嚼した谷氏が新たに発案するCSSの手法として[FLOCSS](https://github.com/hiloki/flocss)についても触れています。

### 第5章 CSSプリプロセッサを用いた設計と管理 + 第6章 コンポーネントの運用に必要なツール

では、[Sass](http://sass-lang.com/)等のプリプロセッサを用いてCSSの運用を行う際に気をつけることや、[StyleStats](http://www.stylestats.org/)やスタイルガイドを用いたCSSの品質管理及びデザイナーとの連携を前提にした運用の手法、そして[Grunt](http://gruntjs.com/)に代表されるタスクランナーを使ってそれらの作業をどのように自動化していくか等について触れています。
黎明期のWebは所謂ホームページとしての役割が濃かったですが、昨今のWebはよりアプリケーションとしての性質が強いです。開発規模は比較にならないほど大きくなり、UIも複雑化し、パフォーマンスも重要視されるようになっています。そんな現代のWeb開発に必要な知識がまとまっています。

### 第7章 Web Componentsの可能性

第3章と第4章で触れていたCSSの弱点に対する工夫に対し、近年では Web Components というHTMLとCSSにスコープを実現する新しい仕様が策定されつつあります。Web Components によって弱点が補われますが、ブラウザネイティブに実装され、安定して使えるようになるのはまだ先ですし、Web Componentsが実現してもCSSの設計が重要であることは変わりません。第7章では、Web Componentsを構成する4つの新しい仕様と、特徴および具体的に何が解決されるかについて書かれています。

## 買いの一冊

各章のサマリーを書きましたが、Web開発におけるCSSの重要性をここまで説いた本は今まで無かったのではないでしょうか。HTMLとCSSのマークアップをする開発者はもちろん、フロントエンドのワークフローを理解して欲しいという個人的な理由で、 **デザイナーの方々にもオススメな一冊** です。

この本を読んで、より良いWeb開発を。

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4844336355&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

※アフィリンクです
