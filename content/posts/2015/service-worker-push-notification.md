---
layout: post
title: Service WorkerでブラウザにPush通知をする
date: 2015-08-17
---

# Service WorkerでブラウザにPush通知をする

Service WorkerでブラウザにPush通知をする方法については、既に解説記事が幾つかあるのできっと面白くありません。ただの作業ログです。概論については[ウェブのプッシュ通知、何がそんなにすごいのか？ - Tender Surrender](https://blog.agektmr.com/2015/03/mobile-web-app.html)という記事を見てくださいませ。

## 前提と大まかな手順

例によってService Worker周りの実装が進んでいるChromeのCanary Channelで試す。また、配信元はHTTPS環境でないとService Workerをインストール出来ないので、GitHub Pagesでホストする。サーバーからのPushは、今のところGCM（Google Cloud Messaging）のみの様子なので、そのあたりの準備もすることになる。

1. GCMにPushデータ配信を行うサーバーのプロジェクトを用意する
2. 1.で作成したプロジェクトIDをWeb App Manifestの`gcm_sender_id`に指定する
3. HTMLページ及びサーバーPushを受ける準備をしたService Workerを用意する
4. 3.をHTTPS環境下で配信する（今回はGitHub Pages）
5. 4.で用意したページにChrome Canaryでアクセスし、Service Workerをブラウザにインストールする
6. 1.で作成したサーバーにPushの配信リクエストを行う

### GCMとは

以下[Google Cloud メッセージング（GCM）の使用](https://support.google.com/googleplay/android-developer/answer/2663268?hl=ja)からの引用。

>Google Cloud メッセージング（GCM）は、デベロッパーが Android、iOS、Chrome といった複数のプラットフォームにメッセージを送信できる無料のサービスです。たとえば、サーバーから 1 つの端末、端末グループ、または特定のトピックを定期購入している端末に、メッセージを直接送信できます。また、端末に搭載されたアプリも、サーバーや同じグループに属する端末にメッセージを直接送信できます。

## Google Developer Consoleにプロジェクトを作成

[Google Developer Console](https://console.developers.google.com/project)から「プロジェクト作成」。

![](/img/posts/2015/service-worker-push-notification/developer-console-create-project.png)

作成したプロジェクトを選択し、左のメニューの「APIと認証」→「API」から次の2つのAPIをプロジェクトに対して有効化する。

- Google Cloud Messaging for Chrome
- Google Cloud Messaging for Android

前者は最初探しても見つからないのだが、入力エリアに「Messaging」あたりを入力すると表示される。

![](/img/posts/2015/service-worker-push-notification/developer-console-enable-api.png)

次に今作成したGCMサーバーへリクエストをするために、APIキーを発行しておく必要がある。左のメニューの「APIと認証」→「認証情報」から、APIキーの認証情報（サーバーキー）を追加する。作成するとトークンが発行され、これをPush通知のPOSTリクエストを実行する際に付与することになる。

![](/img/posts/2015/service-worker-push-notification/developer-console-create-api-key.png)

## Pushを受け取るWebアプリ側の準備

一式は、[1000ch/service-worker-push-notification](https://github.com/1000ch/service-worker-push-notification)に配置してあるが、ひとつづつ説明していく。

- `index.html` - Pushリクエストをする際に必要になるSubscriptionIdを表示している
- `app.js` - ロード時に`service-worker.js`を登録している
- `service-worker.js` - Pushを受け取ってブラウザに通知を出すService Worker
- `manifest.json` - Web App Manifest。このファイルにGCMのプロジェクトIDを記述しておく

という最小限の構成。

### `app.js`

Service Worker登録時のコールバック引数に渡される`registration`オブジェクトには`pushManager`という、名前の通りプッシュ通知周りを管理するインターフェースを持つオブジェクトが存在する。

```javascript
'use strict';

document.addEventListener('DOMContentLoaded', e => {

  navigator.serviceWorker.register('service-worker.js').then(registration => {

    registration.pushManager.subscribe().then(subscription => {
      console.log('GCM engpoint is: ', subscription.endpoint);
    });

  }).catch(error => console.log(error));
});
```

この`pushManager`の`subscribe()`という関数を実行すると、自身をクライアントとしてプッシュサーバーに登録し、エンドポイントURLを取得できる。

ChromeにはPushインフラとしてGCMがあるが、このあたりがどういう着地になるのかまだわかっていない。ベンダー毎に違う部分をWeb標準でどのように吸収するのか、自身でPushサーバーを持つ場合は`subscribe()`に指定できるようになるのか、とかとか。

### `service-worker.js`

Service Workerとはそもそも…な話は[Service Workerに関する仕様とか機能とか - 1000ch.net](/posts/2014/service-worker-internals.html)を見てもらうとなんとなくわかるはず。

```javascript
self.addEventListener('install', e => console.log('Service Worker oninstall: ', e));

self.addEventListener('activate', e => {

  console.log('Service Worker onactivate: ', e);

  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => console.log('Service Worker onfetch: ', e));

self.addEventListener('push', e => {

  console.log('Service Worker onpush: ', e);

  e.waitUntil(
    self.registration.showNotification('Push Notification Title', {
      body: '(・∀・)',
      icon: 'http://placehold.it/192x192',
      tag: 'push-notification-tag'
    })
  );
});
```

Service Workerコンテキストで`push`イベントをハンドルし、その中でNotificationを表示している。注意したいのは、Web Notification APIではなく、Service Workerコンテキストから実行するNotificationのAPIであること。

### `manifest.json`

Web App Manifestはアプリケーションの制御に用いられるフォーマットで、起動方法のコントロールや、[インストールバナーの表示](https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android)といったことが可能になる。[Manifest for a web application - W3C Living Document](http://www.w3.org/TR/appmanifest)に仕様が記載されており、サマリは[WebApp マニフェストの追加 - Google Developers](https://developers.google.com/web/fundamentals/device-access/stickyness/web-app-manifest?hl=ja)を見ると良い。

以下のようなJSONフォーマットのファイルを作成し、HTMLからは`<link rel="manifest" href="manifest.json">`のように参照する。

```json
{
  "name": "Push Notification Demo",
  "short_name": "Push Notification Demo",
  "icons": [{
    "src": "http://placehold.it/192x192",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "start_url": "/index.html",
  "display": "standalone",
  "gcm_sender_id": "(作成したプロジェクトのプロジェクトID)"
}
```

`gcm_sender_id`はChromeから参照される特別な(というか専用の)属性で、GCMのプロジェクトIDを指定する必要がある。

## Pushサーバーに配信リクエスト

HTTPSにホストし、Chrome CanaryでアクセスするとNotificationを受け取る準備をしてあるService Workerがインストールされる。あとはGCMサーバーに規定通りのPOSTリクエストを送るだけ。

```
curl --header "Authorization: key=(作成したプロジェクトのAPIキー)" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"(エンドポイント文字列)\"]}"
```

エンドポイント文字列は`app.js`で`pushManager.subscribe()`して返却されるsubscriptionオブジェクトの`endpoint`の値から`https://android.googleapis.com/gcm/send/`を除いたものになる。エンドポイントアドレスとしては返却値で良いんだろうけど、GCMのリクエストインターフェースがこの仕様というだけ。

ちなみに[1000ch/service-worker-push-notification](https://github.com/1000ch/service-worker-push-notification)ではfetch APIを使って同等のことをブラウザから実施しようとしたが、リクエストオリジンの制限に引っかかってNGだった(
APIキー晒してますが、既に破棄済のプロジェクトです)。

先程のPOSTリクエストのリクエストBodyに入れている`registration_ids`には複数のRegistrationIdを指定できる。今回はデバッグ的にcURLでリクエストしたが、クライアントにRegistrationIdが付与されたらサーバー等に送信して集計し、Pushサーバーに配信リクエストを送る仕組みからまとめてリクエストするのが本線っぽい。

## まとめ

ただの作業ログでした。現場からは以上です。

- [ウェブのプッシュ通知、何がそんなにすごいのか？ - Tender Surrender](https://blog.agektmr.com/2015/03/mobile-web-app.html)
- [Push Notifications on the Open Web - Google Developers](https://developers.google.com/web/updates/2015/03/push-notificatons-on-the-open-web)
- [ChromeでW3C Push APIを使ってみた - Qiita](http://qiita.com/tomoyukilabs/items/8fffb4280c1914b6aa3d)
