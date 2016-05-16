---
layout: post
title: AbemaTVのランタイムパフォーマンスのAudit
date: 2016-05-17
---

# AbemaTVのランタイムパフォーマンスのAudit

最近業務で、巷で話題の[AbemaTV](https://abema.tv/)のパフォーマンス改善をしている。ちなみに、この記事の内容とは関係ないけど番組表のパフォーマンスもアレコレ直している最中で、最近速くなった気がしたら僕のせいかもしれません。

## 番組再生画面のコメント開閉が重い

舛添さん出てるけど動画は無視してもらって、右下のコメントアイコンを押してコメントを開閉するアクションがある。GIFアニメのFPSが低くてわかりにくいが、クリック後に200ms程遅延した後にようやく右からコメント領域がせり出てくる。会社の良スペックMacBook Proでこの状態なので、これはマズい。

![](/img/posts/2016/abematv-runtime-perf-audit/comment.gif)

## コメント領域を開くまでに200msかかっている

クリック後の反応は速いが何かにつっかかってアニメーションが再開される。コメントの表示して非表示にする一連の流れを、DevToolsのTimelineで計測してみると以下の様な結果が得られた。

![](/img/posts/2016/abematv-runtime-perf-audit/timeline.png)

見たところスクリプト処理（黄色い部分）がアニメーション処理（紫色の部分）の手前で大きな邪魔をしていることがわかる。

### アニメーション処理そのものの負荷

先程のタイムラインを見てもわかるように、アニメーション処理そのものの負荷は低い。DevToolsのドロワーメニューのRenderingタブに、 **Paint Flashing** と **Layers Borders** というメニューがあるので、これらにチェックをすると画面上に緑色の領域（描画処理が発生している領域）と、オレンジ色の枠（レイヤの境界線）が表れる。この状態でコメントの表示・非表示を切り替える。

![](/img/posts/2016/abematv-runtime-perf-audit/devtools-drawer.png)

すると、コメントの領域はオレンジ色の枠で囲まれているだけで、緑色にはなっておらず描画処理は行われていないことがわかる。この時点で、コメント領域は描画処理は既に行われているが画面内に入っておらず、クリックを契機にアニメーションと共に表示されることがわかる。描画処理が行われていない（というと語弊がありそうだが）ので、GPUでテクスチャ化されているものが動いているだけということも予想できる。

![](/img/posts/2016/abematv-runtime-perf-audit/comment-animation.gif)

CSSを確認してみると、以下のようになっていた。

```css
.right-slide-base {
  height: 100%;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  transition: transform var(--duration) var(--ease-out-cubic);
  z-index: var(--z-footer);
}

.right-comment-area {
  composes: right-slide-base;
  background-color: var(--lt-bg-regular);
  width: 310px;
}

.right-slide--shown {
  transform: translateX(0);
}
```

予想通り`transformX(n)`で表示状態を切り替えており、クリックに応じて`.right-slide--shown`を付け外している。これならば`.right-comment-area`の更新によるラスタライズがされない限り、アニメーションによる再描画は発生しない。コメント情報のポーリングでGPUに再度送っちゃう問題が起こりそうだが、一旦置いておく。

### 開閉に伴うスクリプト処理

クリック時のスクリプト処理を抜粋。

```javascript
showCommentList(toShow = true) {
  this.closeAll();
  this.showElement(this.refs.commentList, toShow);

  if (!this.state.metaSlotId) return;
  if (toShow) {
    this.fetchComment(this.state.metaSlotId, this.metaData.get("channelId"));
    this.mergeComments();
    this.commentFetchSubscription = Rx.Observable.interval(POLLING_INTERVAL * CONVERSIONS.sec)
      .subscribe(() => {
        if (!this.state.metaSlotId) return;
        this.fetchComment(this.state.metaSlotId, this.metaData.get("channelId"));
      });
  } else {
    this.fetchSlotAudience(this.state.metaSlotId);
    if (this.commentFetchSubscription) {
      this.commentFetchSubscription.dispose();
    }
  }
}
```

`this.showElement()`でさっきの`.right-slide--shown`を付け外していて、その後のコメントデータを取得している部分が重そうである。表示の時（`toShow`が`true`のとき）に行われる`this.fetchComment()`で、コメントデータをサーバーから取得している。サーバーレスポンスが重いのかどうかの確認のため、対象のリクエストをNetworkパネルで確認する。

![](/img/posts/2016/abematv-runtime-perf-audit/fetch-comment.png)

Waitingが36msということで、200msの大部分を占める要素ではなさそうだ。

では、Timelineからも問題が見受けられていたスクリプト処理をプロファイルしてみる。すると`storeComment()`という関数が見て取れる他、`setState()`が2回コールされそれぞれの処理に100msかかっていることがわかる。`storeComment()`は`this.fetchComment()`内でコールしているアクションで呼び出され、subscriberに対してdispatchしている様子。

![](/img/posts/2016/abematv-runtime-perf-audit/cpu-profile.png)

案の定`subscribe()`のコールバックで`setState()`が散乱していて、状態に依っては3回以上コールされそうな状態だった。これを直す。

## 開閉処理のチューニング

ここからローカル環境で色々直していくので本番環境で計測したものとは異なってくる。ローカル環境で計測したチューニング前の結果は以下の状態。

![](/img/posts/2016/abematv-runtime-perf-audit/before.png)

### React Componentの`setState()`を複数回コールしないようにする

[React Componentの`setState()`](https://facebook.github.io/react/docs/component-api.html#setstate)は実行される度に`render()`が呼ばれる。`render()`が呼ばれると、VirtualDOMを生成して現在のものと比較し、diffに応じてHTMLに対してバッチを実行するので、`setState()`を不要に実行してはならない。Reactのパフォーマンスが良いというのはHTMLをいざ更新するときにブラウザの仕事を最小限に留めてくれるという話であって、React内部はそれなりの仕事をしてメモリも食うので、取り扱いは慎重にする。

`setState()`を何度も呼ばずに済みそうだったので、直したところ実行時間がおよそ半分になった。

![](/img/posts/2016/abematv-runtime-perf-audit/merge-setState.png)

### ImmutableJSの`toJS()`がハイコストなのでなるべくコールしないようにする

これも調査中に発覚したことだが、JavaScriptネイティブなデータからImmutableJSなデータへの変換（逆も然り）がとても重い。当然ながらデータの量に比例して更に重くなっていくので、要注意。

設計方針としてstateにImmutableなデータを格納して、`render()`の度に`toJS()`を実行してImmutableな`Map`や`List`をJavaScriptネイティブなデータに変換していた。が、先の通りImmutableJSの`fromJS()`と`toJS()`のコストが結構高いので、stateに入れるデータはJavaScriptネイティブの`Object`やら`Array`などにして、`render()`の度に`toJS()`を呼ばないように変える。設計も大事だけど、パフォーマンスで実害が出ているので、合意を取る。

Immutableなデータは`setState()`のタイミングで`toJS()`を実行することにして、とにかく不必要に呼ばない。諸々修正して計測した結果は以下の通り。

![](/img/posts/2016/abematv-runtime-perf-audit/dont-use-Immutable.png)

元々130msだったのが9msということで、CPUに優しいプログラムになりました。めでたしめでたし。
