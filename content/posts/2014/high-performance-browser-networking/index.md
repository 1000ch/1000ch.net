---
title: ハイパフォーマンス ブラウザネットワーキング
date: 2014-05-22
---

オライリー・ジャパン様より本を頂きましたので、その感想を。
頂いたのは **ハイパフォーマンス ブラウザネットワーキング** という、[Ilya Grigorik](https://www.igvita.com/)氏執筆の日本語訳本。

![](./book.jpg)

サブタイトルに **ネットワークアプリケーションのためのパフォーマンス最適化** と付いている通り、TCP、UDPといったトランスポートレイヤからアプリケーションレイヤまでのプロトコルの原理に始まり、Webアプリのパフォーマンス最適化アプローチ、ブラウザの通信系API（XHR・WebSocket・WebRTC）と現存のネットワーク技術を幅広く、そして詳細に取り扱っている書籍です。

## Webパフォーマンスとしてのネットワーク

Webサイトのパフォーマンスの重要性についてはもとより、それを構成するファクターは複雑化を辿る一方です。Webサイトのあり方が凄まじい勢いで変化している中で、とある1つのWebサイトにおいてどれが重要なパフォーマンスファクターになるのかは事の次第によります。

スマートフォンの性能が瞬く間に向上してきたように、クライアントデバイスの進化が早いことに対し、ネットワークの進化はとても遅いです。そして、モバイルであれば基地局との距離や、周辺の建物の電波状態に左右されるように、非常に不安定な状況にあります。

そのような背景に加え、ネットワークはユーザーにコンテンツを届けるフローの最初に当たる、一番始めに最適化するべき指標と考えます。本書ではそのネットワークに関するアプローチも、サーバーの配信の最適化からブラウザの挙動の観点からのコンテンツ要求の接続管理に至るまで、網羅的に解説してあります。

## 本書の読者ターゲット

ネットワークについては各所で仕入れて用語と概要がなんとなくわかるレベルの私にとっては、第Ⅰ章のネットワークの基礎や第Ⅲ章のHTTPのような低レイヤに触れている章が、特に読んでて非常に面白い内容でした。この辺りのTCP、UDP、TLSといった基礎理論も多いので、本当に真っさらな状態（IPやHTTPリクエストと言った用語がぼんやりレベルですらわからない）だと辛いかもしれません。

モバイルネットワークにおける最適化・Webパフォーマンス・アプリケーション配信最適化についてもそれまでの基礎理論を踏まえた内容になっているので、最適化の章だけ読むよりはネットワークのコンテキストを得てから読む方が効果的です。業務でもWebサービスのパフォーマンス改善をやっているので、掘り下げて併せて理解することが出来ました。

約360ページで内容も非常に濃いものになっており、お手軽とは言えませんが、4000円と時間を投じて消化する価値があります。フロントエンドのエンジニアにとっても、バックエンドのエンジニアにとっても、双方のレイヤを理解するきっかけになる、抑えておくべき一冊です。

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/51x2sA8N%2BTL._SX389_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/4873116767/"
  tag="1000ch-22"
  title="ハイパフォーマンス ブラウザネットワーキング ―ネットワークアプリケーションのためのパフォーマンス最適化">
  Ilya Grigorik (著), 和田 祐一郎  (翻訳), 株式会社プログラミングシステム社 (翻訳)
</affiliate-link>

[英語版であればWeb上で閲覧可能](http://chimera.labs.oreilly.com/books/1230000000545/index.html)ですが、ボリュームもありますし、日本語訳を読めるのはやはりありがたいです。

## HPBNj

[#HPBNjがハッシュタグ](https://twitter.com/search?q=%23HPBNj)です。流れているツイートの通り、いわゆる **絶対読め系の本** です。

<blockquote class="twitter-tweet" lang="ja"><p>10章「Webパフォーマンス入門」が大変良かったので書きました / フロントエンドエンジニアから見た『ハイパフォーマンス ブラウザネットワーキング』 - じまぐてっく <a href="http://t.co/fXHAXorK2e">http://t.co/fXHAXorK2e</a> <a href="https://twitter.com/search?q=%23HPBNj&amp;src=hash">#HPBNj</a></p>&mdash; じまぐ (@nakajmg) <a href="https://twitter.com/nakajmg/statuses/466031579534331904">2014, 5月 13</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>読了ハイパフォーマンス「ブラウザ」ネットワーキング ::ハブろぐ <a href="http://t.co/hYFX0ZgMHr">http://t.co/hYFX0ZgMHr</a> ありがとうございました <a href="https://twitter.com/search?q=%23HPBNj&amp;src=hash">#HPBNj</a></p>&mdash; あほむ (@ahomu) <a href="https://twitter.com/ahomu/statuses/468274067745681408">2014, 5月 19</a></blockquote>

## 余談

余談ですが、本書の冒頭で、現在FastlyでChief Performance Officerを務める[Steve Souders](http://www.stevesouders.com/)氏（以前までGoogleでHead Performance Engineerとして働いていた）は、著者のIlya Grigorick氏を「ネットワークの神様」と称賛しています。

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/51hIDIWHmYL._SX389_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/487311361X/"
  tag="1000ch-22"
  title="ハイパフォーマンスWebサイト ―高速サイトを実現する14のルール">
  Steve Souders (著), 武舎 広幸  (翻訳), 福地 太郎 (翻訳), 武舎 るみ (翻訳)
</affiliate-link>

<affiliate-link
  src="https://images-na.ssl-images-amazon.com/images/I/51GQNCMJsZL._SX383_BO1,204,203,200_.jpg"
  href="https://www.amazon.co.jp/dp/4873114462/"
  tag="1000ch-22"
  title="続・ハイパフォーマンスWebサイト ―ウェブ高速化のベストプラクティス">
  Steve Souders (著), 武舎 広幸  (翻訳), 福地 太郎 (翻訳), 武舎 るみ (翻訳)
</affiliate-link>
