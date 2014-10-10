---
layout: post
title: WEB+DB PRESS 新連載「Webフロントエンド最前線」
date: 2014-10-17
image: /img/posts/wdpress-frontend-series-image/cover.jpg
description: 連載を担当させてもらっているWEB+DB PRESSのVol.83が10月24日に発売されます！
---

# WEB+DB PRESS Vol.83 Webフロントエンド最前線「Webフロントエンドの画像形式と最適化」

「Webフロントエンド最前線」という連載を担当させてもらっているWEB+DB PRESSのVol.83が10月24日に発売されます！
連載の第3回目ということで「Webフロントエンドの画像形式と最適化」という、その名の通りWebにおける画像について執筆しました。

<img src='/img/posts/wdpress-frontend-series-image/cover.jpg'>

今回は[@ahomu](http://twitter.com/1000ch)氏と共同で執筆しました。各章の担当分担については良いとして、執筆後の体裁をならす作業大変そうだなと心配していましたが、お互いの校正を繰り返しつつ[@inao]([@ahomu](http://twitter.com/1000ch))さんの編集も頂きつつ（毎度ご迷惑をお掛けしておりますorz）で何とか見れる文章に収まったかなと思います。

## 記事サマリー

一口に画像と言ってもトピックとして色々あると思いますが、今回は **パフォーマンスをゴールに見据えた画像の取り扱い** を知るべく、JPEGやPNGといった各種画像形式の特徴や利用シーンに加えて、Googleが開発し新たな画像のフォーマットとして注目されるWebPについて、ベクター画像であるSVG、各種画像の最適化やワークフローへの導入手法などなど、8ページに渡り画像について語っています。

## たかが画像されど画像

圧縮されたjQueryが32KBだのなんだのと言っても、未減色の画像なら平気でそのサイズの10倍とか突破するケースも多々あることを考え始めてからは、私自身もいくつかアプローチをしてきた。

[Give PNG a chance](http://calendar.perfplanet.com/2009/give-png-a-chance/)を[日本語訳](http://article.enja.io/articles/give-png-a-chance.html)したり（日本語に訳したいと言ったらStoyanも快くOKしてくれた）、

<blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/1000ch">@1000ch</a> of course, I&#39;ll be flattered</p>&mdash; Stoyan Stefanov (@stoyanstefanov) <a href="https://twitter.com/stoyanstefanov/status/383705245064237056">2013, 9月 27</a></blockquote>

[Webにおける画像の最適化について考えたり](http://1000ch.net/posts/2013/web-image-optimization.html)、[画像の最適化をCLIだけで行うgrunt-imageを作った](http://1000ch.net/posts/2014/grunt-image.html)り、Mediumに[We should optimize imagesという記事を寄稿した](https://medium.com/@1000ch/we-should-optimize-images-8435760e0ec9)り（ついでに、[redditに投下したら議論を醸した](http://www.reddit.com/r/webdev/comments/22qp05/we_should_optimize_images/)）。

今回の記事はこうして得てきたナレッジの集大成とも言えます。是非お手にとって見てください！

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4774167355&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>