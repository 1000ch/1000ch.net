---
layout: post
title: ハイパフォーマンス ブラウザネットワーキング 書評
date: 2014-05-22
---

# ハイパフォーマンス ブラウザネットワーキング 書評

オライリー・ジャパン様より本を頂きましたので、その感想を。
頂いたのは **ハイパフォーマンス ブラウザネットワーキング** という、[Ilya Grigorik](https://www.igvita.com/)氏執筆の日本語訳本。

<img src='/img/posts/high-performance-browser-networking/book.jpg' width='100%'>

サブタイトルに **ネットワークアプリケーションのためのパフォーマンス最適化** と付いている通り、TCP、UDPといったトランスポートレイヤからアプリケーションレイヤまでのプロトコルの原理に始まり、Webアプリのパフォーマンス最適化アプローチ、ブラウザの通信系API（XHR・WebSocket・WebRTC）と現存のネットワーク技術を幅広く、そして詳細に取り扱っている書籍です。

## Webパフォーマンスとしてのネットワーク

Webサイトのパフォーマンスの重要性についてはもとより、それを構成するファクターは複雑化を辿る一方です。Webサイトのあり方が凄まじい勢いで変化している中で、とある1つのWebサイトにおいてどれが重要なパフォーマンスファクターになるのかは事の次第によります。

スマートフォンの性能が瞬く間に向上してきたように、クライアントデバイスの進化が早いことに対し、ネットワークの進化はとても遅いです。そして、モバイルであれば基地局との距離や、周辺の建物の電波状態に左右されるように、非常に不安定な状況にあります。

そのような背景に加え、ネットワークはユーザーにコンテンツを届けるフローの最初に当たる、一番始めに最適化するべき指標と考えます。本書ではそのネットワークに関するアプローチも、サーバーの配信の最適化からブラウザの挙動の観点からのコンテンツ要求の接続管理に至るまで、網羅的に解説してあります。

## 本書の読者ターゲット

ネットワークについては各所で仕入れて用語と概要がなんとなくわかるレベルの私にとっては、第Ⅰ章のネットワークの基礎や第Ⅲ章のHTTPのような低レイヤに触れている章が、特に読んでて非常に面白い内容でした。この辺りのTCP、UDP、TLSといった基礎理論も多いので、本当に真っさらな状態（IPやHTTPリクエストと言った用語がぼんやりレベルですらわからない）だと辛いかもしれません。

モバイルネットワークにおける最適化・Webパフォーマンス・アプリケーション配信最適化についてもそれまでの基礎理論を踏まえた内容になっているので、最適化の章だけ読むよりはネットワークのコンテキストを得てから読む方が効果的です。業務でもWebサービスのパフォーマンス改善をやっているので、掘り下げて併せて理解することが出来ました。

約360ページで内容も非常に濃いものになっており、お手軽とは言えませんが、4000円と時間を投じて消化する価値があります。フロントエンドのエンジニアにとっても、バックエンドのエンジニアにとっても、双方のレイヤを理解するきっかけになる、抑えておくべき一冊です。

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=1000ch-22&o=9&p=8&l=as1&m=amazon&f=ifr&ref=qf_sp_asin_til&asins=4873116767" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

[英語版であればWeb上で閲覧可能](http://chimera.labs.oreilly.com/books/1230000000545/index.html)ですが、ボリュームもありますし、日本語訳を読めるのはやはりありがたいです。

## HPBNj

[#HPBNjがハッシュタグ](https://twitter.com/search?q=%23HPBNj)です。流れているツイートの通り、いわゆる **絶対読め系の本** です。

<blockquote class="twitter-tweet" lang="ja"><p>10章「Webパフォーマンス入門」が大変良かったので書きました / フロントエンドエンジニアから見た『ハイパフォーマンス ブラウザネットワーキング』 - じまぐてっく <a href="http://t.co/fXHAXorK2e">http://t.co/fXHAXorK2e</a> <a href="https://twitter.com/search?q=%23HPBNj&amp;src=hash">#HPBNj</a></p>&mdash; じまぐ (@nakajmg) <a href="https://twitter.com/nakajmg/statuses/466031579534331904">2014, 5月 13</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>読了ハイパフォーマンス「ブラウザ」ネットワーキング ::ハブろぐ <a href="http://t.co/hYFX0ZgMHr">http://t.co/hYFX0ZgMHr</a> ありがとうございました <a href="https://twitter.com/search?q=%23HPBNj&amp;src=hash">#HPBNj</a></p>&mdash; あほむ (@ahomu) <a href="https://twitter.com/ahomu/statuses/468274067745681408">2014, 5月 19</a></blockquote>

## 余談

余談ですが、本書の冒頭で、現在FastlyでChief Performance Officerを務める[Steve Souders](http://www.stevesouders.com/)氏（以前までGoogleでHead Performance Engineerとして働いていた）は、著者のIlya Grigorick氏を「ネットワークの神様」と称賛しています。凄すぎてよくわかりません。

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=487311361X&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>

<iframe src="http://rcm-fe.amazon-adsystem.com/e/cm?t=1000ch-22&o=9&p=8&l=as1&asins=4873114462&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>