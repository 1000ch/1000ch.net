---
layout: post
title: Progressive Web Appsとは
date: 2015-12-24
---

# Progressive Web Appsとは

今年のChrome Dev Summitでもセッションにあった[Progressive Web Apps](https://www.youtube.com/watch?v=MyQ8mtR9WxI)について。Progressive Web Apps自体は特定の技術を指す言葉ではなく、 **Webの進化していくべき姿** を提唱しているものだ。Alex Russell氏が[自身のブログで綴った](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)のが事の始まりで、Chrome Dev Summitでも初日はProgressive Web Appsをテーマにセッションが組まれたそう。

<iframe width="100%" height="320" src="https://www.youtube.com/embed/MyQ8mtR9WxI" frameborder="0" allowfullscreen></iframe>

## Webアプリとネイティブアプリ

パソコンでWebを閲覧する分にはパフォーマンスがネックになることは少なくなってきている。パソコンのスペックはネットワークインフラに比べて進化が順調だし、ネットワークも光回線のように十分に速度が得られる環境でインターネットをすることがほとんどだろう。

しかしモバイルデバイスではどうだろうか。iPhoneやAndroid端末のスペックも良くなってきているとはいえ、Mac Book Proとは比較にならないし、ネットワークも不安定であることが多い。4Gの提供エリアであっても建物の中にいたり、地下鉄に乗っていれば十分に利用できない（それでも着実に整備が進んでいると思うが）。

詰まるところ、潤沢な閲覧環境にならないことが多い。HTML・CSS・JavaScript・画像・動画といったようなリソースをネットワークを介して適時取得する必要があるWebにとっては、サービスの価値が左右されてしまう。原因がネットワークでもそうでないとしても、ユーザーはスムースに閲覧できることをいつも期待しているからだ。

比べてネイティブアプリは、リソースの大半がアプリにバンドルされており、起動後はネットワークからリソースを読み出す回数がWebに比べて少ない。オフライン時にもキャッシュデータをロードするなど、オフラインになったことを意識させない設計になっていることが多く、少なくともWebのように画面が真っ白になってしまうことがない。動作もOSネイティブに比べてブラウザエンジンはどうしてもパフォーマンスがでない。

加えて、Webのアプリではサービスの要件を機能面で満たせないことが多かった。カメラ、ジャイロスコープ、最近だとiOSの3D Touchなど。プッシュ通知もその中のひとつである。

<blockquote class="twitter-tweet" lang="ja"><p lang="en" dir="ltr">A year ago, I asked what features made you turn to native. #1 response: push notifications. Today, they&#39;re available: <a href="http://t.co/wDOKa5qVbf">http://t.co/wDOKa5qVbf</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/576089864514326528">2015, 3月 12</a></blockquote>

こうした状況を背景に、サービスのモバイルアプリにはiOSやAndroidのネイティブがプラットフォームとして選択されてきた。Mark Zuckerberg氏が(Facebookが?)HTML5に水を差したのも少なからず原因の1つだと思うが。

## プラットフォームとしてのWebの進化

ネイティブにはないWebのメリットもたくさんある。ストアから探してインストールせずとも使えるし、見つけ出したらURLで簡単にシェアできる。リリースもよりスピーディに行うことができる。あとは、Google PlayやApp Storeといったベンダープラットフォームに縛られずに済むという点。これは見方によっては、エコシステムの恩恵を享受できない(アプリのカテゴライズ・配布されるアプリの品質担保・ストアからのプロモートなど)とも捉えられるが、大半はWebでも補うことができるだろう。

Webがプラットフォームとしてネイティブアプリ同等の機能を提供できれば良いということは、Webのエヴァンジェリスト達が唱え続けてきたことだ。パフォーマンスとして[RAIL](https://havelog.ayumusato.com/develop/performance/e664-rail_performance_model.html)が唱えられたり、[Service Worker](https://1000ch.net/posts/2014/service-worker-internals.html)もWebを前に進めるために生まれた。これらで実現されることをワーディングしたのがProgressive Web Appsである(と、理解している)。マーケティングのためのプロモート色が強いが、流行も技術推進のために必要なことだろう。

## Progressive Web Appsを表す特徴

では具体的にどういったことを提供すればいいかという話になるが、Alex Russell氏は先に紹介したブログの記事で以下のように挙げている。が、これらを全て満たす必要があるとかではなく、Webとしてより良い特徴が羅列されているとも捉えられる。

  - **レスポンシブである**: どんな閲覧環境にも最適化されたレイアウトで表示されること。
  - **オンラインでもオフラインでも動作する**: オフライン時でもオンライン時に近い振る舞いをすること。[Service Workerによる通信のハンドルとCache APIによるリソースの制御](https://1000ch.net/posts/2015/service-worker-passive-cache.html)でオフライン化を実現できる
  - **ネイティブアプリのようなインタラクション**
  - **最新に更新されている**: Service WorkerのBackground Sync等で、常に最新が提供できること
  - **安全である**: 傍受されないよう暗号化され、セキュアであること。Service WorkerもHTTPS環境下のみ配信可能である
  - **発見・特定できる**: [Web App Manifest](https://w3c.github.io/manifest/)によってアプリケーションとして確認されること
  - **エンゲージの機会を提供できる**: プッシュ通知などを通じてアプリを使ってもらう機会を促すことができること。[Webのプッシュ通知はService Workerで実現される](https://1000ch.net/posts/2015/service-worker-push-notification.html)
  - **ネイティブアプリのようにインストールできる**: ホームスクリーンに追加され、ユーザーに使ってもらう機会があること。アプリのアイコンを予め用意しておくのはもちろんのこと、[Web App Manifest](https://w3c.github.io/manifest/)というマニフェストファイルをアプリに定義しておくことで、[ブラウザがインストールを促すダイアログを表示](https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android)できる
  - **URLでリンクできる**: インストールが要らず、URLでアクセスできるというWebの基本であり根幹

これらをすべて満たすことがProgressive Web Appsの条件というわけではなく、雑に言えばこういうWebだと良いよねという話である。ひと昔前なら **Webでは無理だけどネイティブならできること** でもあったので、これからのWebで出来ることの再認識をも唱えている。

## Service WorkerとHTTPS

事実上、Service WorkerとHTTPSは必須である。Service WorkerはHTTPSが前提なのでまずHTTPSということになるが、HTTPS化の敷居が証明書の管理や取得のコストと手間のせいでどうしても高い（個人だと特に）。しかしHTTPS化の波は確実に来ており、様々な所で暗黙の前提になりつつあるので導入を避け続けることができない。無料で証明書を取得できる[Let’s Encrypt](https://letsencrypt.org)のようなサービスもあるので、練習がてら積極的に利用していくべきだろう。

また、自身のWebをHTTPS化しても、サードパーティのHTTPのコンテンツが混在すると表示できないという問題が出てくる。そのサービスにとってクリティカルなコンテンツだとどうしようもなくなる可能性があるが、これが障壁になるとWeb全体のHTTPS化が進まないというジレンマもあるので、難しいところだ。

Progressive Web Appsで唱えられている（もといネイティブアプリの特徴であった）、オフライン化・プッシュ通知・バックグラウンド同期は全てService Worker（+Web App Manifest）によって成り立つものだ。しかしいずれの機能もサービスにとってクリティカルな損失になりにくく（要件次第、設計次第だが）、プログレッシブ・エンハンスメントとして導入しやすい。非機能要件として既存のWebにも追加しやすいので、現在関わっているWeb開発に組み込むことを検討できる。

## パフォーマンス

イニシャライズプロセスにおけるアセットのロードについては、Service WorkerとCache APIによる明示的なキャッシュコントロールによってある程度解決されると思う。その他のリソース取得に関しても、[Resource Hints](http://www.w3.org/TR/resource-hints/)や[Client Hints](http://igrigorik.github.io/http-client-hints/)などによる最適化が進んでいる。

ランタイムプロセスにおいてWebアプリのパフォーマンスがネイティブアプリのそれを超えることは性質上無理だが、デバイスと技術の進化と共に使い心地に差を感じにくくなる時は来る。デスクトップWebが良い例で、WindowsやMacのネイティブアプリでサービスを展開するケースは少なくなってきている。というより、Webアプリで機能をカバーできるケースが増えている、という方が適切かもしれない。これは、デスクトップWebでも充分にパフォーマンスが出て、ブラウザで出来る機能も拡充されてきたからだろう。ElectronやNode-webkitのようにChromiumやWebKitがデスクトップアプリの新たなプラットフォームとして再利用されていることにも表れている。

そうなれば1つのソースコードであらゆるプラットフォームに配信できるWebの方が開発時のコストも低く、よりストアに申請することなくスピーディに配信でき、サービスの提供側にも利用側にもメリットが大きい。