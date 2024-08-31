---
title: Progressive Web Appsとは
date: 2015-12-24
---

# Progressive Web Appsとは

今年の Chrome Dev Summit でもセッションにあった [Progressive Web Apps](https://www.youtube.com/watch?v=MyQ8mtR9WxI) について。Progressive Web Apps は特定の技術を指す言葉ではなく、 **Web の進化していくべき姿** を提唱しているものだ。[Alex Russell 氏が自身のブログで綴った](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)のが事の始まりで、Chrome Dev Summit でも初日は Progressive Web Apps をテーマにセッションが組まれた。

<iframe loading="lazy" src="https://www.youtube.com/embed/MyQ8mtR9WxI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="aspect-ratio: 16/9;"></iframe>

## Web アプリとネイティブアプリ

昨今、パソコンで Web を閲覧する時にパフォーマンスがボトルネックになることは少なくなってきている。パソコンの性能はネットワークインフラに比べれば進化が順調であり、ネットワークも光回線のように十分に速度が得られる環境でインターネットをすることが大半ではないだろうか。

しかしモバイルデバイスではどうだろうか。iPhone や Android 端末の性能も良くなってきているとはいえ、MacBook Pro とは比較にならないし、4G の提供エリアであっても建物の中や地下鉄に乗っていれば相応の影響を受けるといったように、ネットワークも不安定であることが多い（それでも着実に整備が進んでいると思うが）。

要するに、閲覧環境が不安定なのだ。HTML・CSS・JavaScript・画像・動画といったようなリソースをネットワークを介して適時取得する必要がある Web にとっては、サービスの価値を左右する要因になってしまう。低スペックの端末だろうと、貧弱なネットワーク環境であろうと、ユーザーはスムースに閲覧できることをいつも期待しているからだ。

それに比べてネイティブアプリは、リソースの大半がアプリにバンドルされているため、起動後はネットワークからリソースを読み出す回数が Web に比べて少ない。オフライン時にもキャッシュデータをロードするなど、オフラインになったことを意識させない設計になっていることが多く、Web のように画面が真っ白になってしまうことが少ない。動作も OS ネイティブのランタイムで動作するため、ブラウザエンジンというレイヤを介す Web はどうしてもパフォーマンスが出難い。

加えて、Web ではサービスの要件を機能面で満たせないことが多かった。カメラ、ジャイロスコープ、最近だと iOS の 3D Touch など。プッシュ通知もその中のひとつである。

<blockquote class="twitter-tweet" lang="ja"><p lang="en" dir="ltr">A year ago, I asked what features made you turn to native. #1 response: push notifications. Today, they&#39;re available: <a href="http://t.co/wDOKa5qVbf">http://t.co/wDOKa5qVbf</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/576089864514326528">2015, 3月 12</a></blockquote>

こうした状況を背景に、iOS や Android がアプリのプラットフォームとして選択されてきた。Mark Zuckerberg 氏が HTML5 に水を差したのも少なからず原因の1つだと思うが。

## プラットフォームとしての Web の進化

ネイティブにはない Web のメリットもたくさんある。ストアから探してインストールせずとも使えるし、見つけ出したら URL で簡単にシェアできる。また、Google Play や App Store といったベンダープラットフォームに縛られないというメリットもある。これは見方によっては、エコシステムの恩恵を享受できない（アプリのカテゴライズ・配布されるアプリの品質担保・ストアからのプロモートなど）とも捉えられるが、大半は Web でも補うことができるだろう。

Web がプラットフォームとしてネイティブアプリ同等の機能を提供できれば良いということは、Web のエヴァンジェリスト達が唱え続けてきたことだ。[パフォーマンスモデルとして RAIL](https://havelog.aho.mu/develop/performance/e664-rail_performance_model.html) が唱えられたり、[Service Worker](/posts/2014/service-worker-internals.html) も Web の機能性を大きく前進させるために生まれた。これらで実現されることを標榜したのが Progressive Web Apps であると理解している。マーケティング色も強いが、認知拡大も技術推進のために必要なことだろう。

## Progressive Web Apps を表す特徴

では具体的にどういったことを提供すればいいかという話になるが、Alex Russell 氏は先に紹介したブログの記事で以下のように挙げている。しかし、これらを全て満たす必要があるとかではなく、Web としてより良い特徴が羅列されているとも捉えられる。

- **レスポンシブである**: どんな閲覧環境にも最適化されたレイアウトで表示されること
- **オンラインでもオフラインでも動作する**: オフライン時でもオンライン時に近い振る舞いをすること。[Service Worker による通信のハンドルと Cache API によるリソースの制御](/posts/2015/service-worker-passive-cache.html)でオフライン化を実現できる
- **ネイティブアプリのようなインタラクション**
- **最新に更新されている**: Service Worker の Background Sync 等で、常に最新が提供できること
- **安全である**: 傍受されないよう暗号化され、セキュアであること。Service Worker も HTTPS 環境下のみ配信可能である
- **発見・特定できる**: [Web App Manifest](https://w3c.github.io/manifest/)によってアプリケーションとして確認されること
- **エンゲージの機会を提供できる**: プッシュ通知などを通じてアプリを使ってもらう機会を促すことができること。[Web のプッシュ通知は Service Worker で実現される](/posts/2015/service-worker-push-notification.html)
 - **ネイティブアプリのようにインストールできる**: ホームスクリーンに追加され、ユーザーに使ってもらう機会があること。アプリのアイコンを予め用意しておくのはもちろんのこと、[Web App Manifest](https://w3c.github.io/manifest/)というマニフェストファイルをアプリに定義しておくことで、[ブラウザがインストールを促すダイアログを表示](https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android)できる
- **URL でリンクできる**: インストールが要らず、URL でアクセスできるという Web の基本であり根幹

これらをすべて満たすことが Progressive Web Apps の条件というわけではなく、雑に言えば「こういう Web だと良いよね」という話である。ひと昔前なら **Web では無理だけどネイティブならできること** でもあったので、これからの Web で出来ることの再認識をも唱えている。

## Service Worker と HTTPS

事実上、Service Worker と HTTPS は必須である。Service Worker は HTTPS が前提なのでまず HTTPS ということになるが、HTTPS 化の敷居が証明書の管理や取得のコストと手間のせいでどうしても高い（個人だと特に）。しかし HTTPS 化の波は確実に来ており、様々な所で暗黙の前提になりつつあるので導入を避け続けることができない。無料で証明書を取得できる [Let’s Encrypt](https://letsencrypt.org) のようなサービスもあるので、練習がてら積極的に利用していくべきだろう。

また、自身の Web を HTTPS 化しても、サードパーティの HTTP のコンテンツが混在すると表示できないという問題が出てくる。そのサービスにとってクリティカルなコンテンツだとどうしようもなくなる可能性があるが、これが障壁になると Web 全体の HTTPS 化が進まないというジレンマもあるので、難しいところだ。

Progressive Web Apps で唱えられている（もといネイティブアプリの特徴であった）、オフライン化・プッシュ通知・バックグラウンド同期は全て Service Worker によって成り立つものだ。しかしいずれの機能もサービスにとってクリティカルな損失になりにくく（要件次第、設計次第だが）、プログレッシブ・エンハンスメントとして導入しやすい。非機能要件として既存の Web にも追加しやすいので、現在関わっている開発に組み込むことを検討できる。

## パフォーマンス

ローディングにおけるアセットのロードについては、Service Worker と Cache API による明示的なキャッシュコントロールによってある程度解決されるだろう。その他のリソース取得に関しても、[Resource Hints](http://www.w3.org/TR/resource-hints/) や [Client Hints](http://igrigorik.github.io/http-client-hints/) などによる最適化が進んでいる。

ランタイムにおいて Web アプリのパフォーマンスがネイティブアプリのそれを超えることは原理的に無理だが、その差を感じにくくなる時は来る。デスクトップ Web が良い例で、Windows や macOS のネイティブアプリでサービスを展開するケースは少なくなってきている。というより、Web アプリで機能をカバーできるケースが増えている、という方が適切かもしれない。これは、デスクトップ Web でも充分にパフォーマンスが出て、ブラウザで出来る機能も拡充されてきたことが理由にある。Electron や Node-webkit のように Chromium や WebKit がデスクトップアプリの新たなプラットフォームとして再利用されていることにも表れている。

そうなれば1つのソースコードであらゆるプラットフォームに配信できる Web の方が開発時のコストも低く、よりストアに申請することなくスピーディに配信でき、サービスの提供側にも利用側にもメリットが大きい。
