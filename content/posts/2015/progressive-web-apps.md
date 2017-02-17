---
layout: post
title: Progressive Web Appsとは
date: 2015-12-24
---

# Progressive Web Appsとは

今年の Chrome Dev Summit でもセッションにあった [Progressive Web Apps](https://www.youtube.com/watch?v=MyQ8mtR9WxI) について。Progressive Web Apps 自体は特定の技術を指す言葉ではなく、 **Webの進化していくべき姿** を提唱しているものだ。Alex Russell 氏が[自身のブログで綴った](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)のが事の始まりで、Chrome Dev Summit でも初日は Progressive Web Apps をテーマにセッションが組まれたそう。

<iframe width="100%" height="320" src="https://www.youtube.com/embed/MyQ8mtR9WxI" frameborder="0" allowfullscreen></iframe>

## Webアプリとネイティブアプリ

パソコンで Web を閲覧する分にはパフォーマンスがネックになることは少なくなってきている。パソコンのスペックはネットワークインフラに比べて進化が順調だし、ネットワークも光回線のように十分に速度が得られる環境でインターネットをすることがほとんどだろう。

しかしモバイルデバイスではどうだろうか。iPhone や Android 端末のスペックも良くなってきているとはいえ、Mac Book Pro とは比較にならないし、ネットワークも不安定であることが多い。4G の提供エリアであっても建物の中にいたり、地下鉄に乗っていれば十分に利用できない（それでも着実に整備が進んでいると思うが）。

詰まるところ、潤沢な閲覧環境にならないことが多い。HTML・CSS・JavaScript・画像・動画といったようなリソースをネットワークを介して適時取得する必要がある Web にとっては、サービスの価値が左右されてしまう。原因がネットワークでもそうでないとしても、ユーザーはスムースに閲覧できることをいつも期待しているからだ。

比べてネイティブアプリは、リソースの大半がアプリにバンドルされており、起動後はネットワークからリソースを読み出す回数がWebに比べて少ない。オフライン時にもキャッシュデータをロードするなど、オフラインになったことを意識させない設計になっていることが多く、少なくともWebのように画面が真っ白になってしまうことがない。動作もOSネイティブに比べてブラウザエンジンはどうしてもパフォーマンスがでない。

加えて、Webのアプリではサービスの要件を機能面で満たせないことが多かった。カメラ、ジャイロスコープ、最近だとiOSの3D Touchなど。プッシュ通知もその中のひとつである。

<blockquote class="twitter-tweet" lang="ja"><p lang="en" dir="ltr">A year ago, I asked what features made you turn to native. #1 response: push notifications. Today, they&#39;re available: <a href="http://t.co/wDOKa5qVbf">http://t.co/wDOKa5qVbf</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/576089864514326528">2015, 3月 12</a></blockquote>

こうした状況を背景に、サービスのモバイルアプリには iOS や Android のネイティブがプラットフォームとして選択されてきた。Mark Zuckerberg 氏が（ Facebook が？）HTML5 に水を差したのも少なからず原因の1つだと思うが。

## プラットフォームとしてのWebの進化

ネイティブにはない Web のメリットもたくさんある。ストアから探してインストールせずとも使えるし、見つけ出したら URL で簡単にシェアできる。また、Google Play や App Store といったベンダープラットフォームに縛られないというメリットもある。これは見方によっては、エコシステムの恩恵を享受できない（アプリのカテゴライズ・配布されるアプリの品質担保・ストアからのプロモートなど）とも捉えられるが、大半は Web でも補うことができるだろう。

Web がプラットフォームとしてネイティブアプリ同等の機能を提供できれば良いということは、Web のエヴァンジェリスト達が唱え続けてきたことだ。パフォーマンスとして [RAIL](https://havelog.ayumusato.com/develop/performance/e664-rail_performance_model.html) が唱えられたり、[Service Worker](/posts/2014/service-worker-internals.html) も Web を前に進めるために生まれた。これらで実現されることをワーディングしたのが Progressive Web Apps である（と、理解している）。マーケティングのためのプロモート色が強いが、流行も技術推進のために必要なことだろう。

## Progressive Web Appsを表す特徴

では具体的にどういったことを提供すればいいかという話になるが、Alex Russell 氏は先に紹介したブログの記事で以下のように挙げている。しかし、これらを全て満たす必要があるとかではなく、Web としてより良い特徴が羅列されているとも捉えられる。

  - **レスポンシブである**: どんな閲覧環境にも最適化されたレイアウトで表示されること
  - **オンラインでもオフラインでも動作する**: オフライン時でもオンライン時に近い振る舞いをすること。[Service Worker による通信のハンドルと Cache API によるリソースの制御](/posts/2015/service-worker-passive-cache.html)でオフライン化を実現できる
  - **ネイティブアプリのようなインタラクション**
  - **最新に更新されている**: Service Worker の Background Sync 等で、常に最新が提供できること
  - **安全である**: 傍受されないよう暗号化され、セキュアであること。Service Worker も HTTPS 環境下のみ配信可能である
  - **発見・特定できる**: [Web App Manifest](https://w3c.github.io/manifest/)によってアプリケーションとして確認されること
  - **エンゲージの機会を提供できる**: プッシュ通知などを通じてアプリを使ってもらう機会を促すことができること。[Web のプッシュ通知は Service Worker で実現される](/posts/2015/service-worker-push-notification.html)
  - **ネイティブアプリのようにインストールできる**: ホームスクリーンに追加され、ユーザーに使ってもらう機会があること。アプリのアイコンを予め用意しておくのはもちろんのこと、[Web App Manifest](https://w3c.github.io/manifest/)というマニフェストファイルをアプリに定義しておくことで、[ブラウザがインストールを促すダイアログを表示](https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android)できる
  - **URLでリンクできる**: インストールが要らず、URL でアクセスできるという Web の基本であり根幹

これらをすべて満たすことが Progressive Web Apps の条件というわけではなく、雑に言えばこういう Web だと良いよねという話である。ひと昔前なら **Web では無理だけどネイティブならできること** でもあったので、これからの Web で出来ることの再認識をも唱えている。

## Service WorkerとHTTPS

事実上、Service Worker と HTTPS は必須である。Service Worker は HTTPS が前提なのでまず HTTPS ということになるが、HTTPS 化の敷居が証明書の管理や取得のコストと手間のせいでどうしても高い（個人だと特に）。しかし HTTPS 化の波は確実に来ており、様々な所で暗黙の前提になりつつあるので導入を避け続けることができない。無料で証明書を取得できる [Let’s Encrypt](https://letsencrypt.org) のようなサービスもあるので、練習がてら積極的に利用していくべきだろう。

また、自身の Web を HTTPS 化しても、サードパーティの HTTP のコンテンツが混在すると表示できないという問題が出てくる。そのサービスにとってクリティカルなコンテンツだとどうしようもなくなる可能性があるが、これが障壁になると Web 全体の HTTPS 化が進まないというジレンマもあるので、難しいところだ。

Progressive Web Apps で唱えられている（もといネイティブアプリの特徴であった）、オフライン化・プッシュ通知・バックグラウンド同期は全て Service Worker によって成り立つものだ。しかしいずれの機能もサービスにとってクリティカルな損失になりにくく（要件次第、設計次第だが）、プログレッシブ・エンハンスメントとして導入しやすい。非機能要件として既存の Web にも追加しやすいので、現在関わっている開発に組み込むことを検討できる。

## パフォーマンス

イニシャライズプロセスにおけるアセットのロードについては、Service Worker と Cache API による明示的なキャッシュコントロールによってある程度解決されるだろう。その他のリソース取得に関しても、[Resource Hints](http://www.w3.org/TR/resource-hints/) や [Client Hints](http://igrigorik.github.io/http-client-hints/) などによる最適化が進んでいる。

ランタイムプロセスにおいて Web アプリのパフォーマンスがネイティブアプリのそれを超えることは性質上無理だが、デバイスと技術の進化と共に使い心地に差を感じにくくなる時は来る。デスクトップ Web が良い例で、Windows や Mac のネイティブアプリでサービスを展開するケースは少なくなってきている。というより、Web アプリで機能をカバーできるケースが増えている、という方が適切かもしれない。これは、デスクトップ Web でも充分にパフォーマンスが出て、ブラウザで出来る機能も拡充されてきたことが理由にある。Electron や Node-webkit のように Chromium や WebKit がデスクトップアプリの新たなプラットフォームとして再利用されていることにも表れている。

そうなれば1つのソースコードであらゆるプラットフォームに配信できる Web の方が開発時のコストも低く、よりストアに申請することなくスピーディに配信でき、サービスの提供側にも利用側にもメリットが大きい。
