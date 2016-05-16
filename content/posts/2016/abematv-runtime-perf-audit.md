---
layout: post
title: AbemaTVのランタイムパフォーマンスのAudit
date: 2016-05-17
---

# AbemaTVのランタイムパフォーマンスのAudit

最近業務で、巷で話題の[AbemaTV](https://abema.tv/)のパフォーマンス改善をしている。個別具体性が高いが調査改善の雰囲気を感じ取ってもらえればそれで良いかと思い、記事にした。

## AbemaTVのフロントエンドの構成

話の前提となるAbemaTVのフロントエンドの構成は次の通りで、まさに流行りのといった感じ。

- [facebook/react](https://github.com/facebook/react)
- [facebook/immutable-js](https://facebook.github.io/immutable-js/)
- [Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS)
- [reactjs/react-router](https://github.com/reactjs/react-router)
- [css-modules/css-modules](https://github.com/css-modules/css-modules)

ビルド周りは[babel](https://babeljs.io/)と[webpack](https://webpack.github.io/)、あとはlintツールがちょこちょこ入ったりしている。この改善の話と関係してくるのは、ReactとImmutableJSとRxJSだけ。

## 番組再生画面のコメント開閉が重い

今回ケーススタディとして挙げるのは番組再生画面のコメント開閉機能。

![](/img/posts/2016/abematv-runtime-perf-audit/comment.gif)

再生されている内容は無視してもらってGIFアニメの通り、右下のコメントアイコンを押してコメントを開閉するアクションがある。FPSが低くてわかりにくいが、クリック後に200ms程遅延した後にようやく右からコメント領域がせり出てくる。会社の高スペックなMacBook Proでこの状態なので、これはマズい。

## コメント領域を全て開くまでに200msかかっている

クリック後の反応は速いが、アニメーションの最中に何かにつっかかる。コメントを表示して非表示にする一連の処理を、DevToolsのTimelineで計測してみると以下の様な結果が得られた。

![](/img/posts/2016/abematv-runtime-perf-audit/timeline.png)

見たところスクリプト処理（黄色い部分）がアニメーション処理（紫色の部分）の手前で邪魔をしていることがわかる。200ms全てスクリプト処理に持って行かれているので、FPSは0の状態が続いている。応じて、メモリもピークまで達したあとガクッと低下している。

### アニメーション処理そのものの負荷

先程のタイムラインを見てもわかるように、アニメーション処理そのものの負荷は低い。DevToolsのドロワーメニューのRenderingタブに、 **Paint Flashing** と **Layers Borders** というメニューがあるので、これらにチェックをすると画面上に緑色の領域（描画処理が発生している領域）と、オレンジ色の枠（レイヤの境界線）が表れる。この状態でコメントの表示・非表示を切り替えてみる。

![](/img/posts/2016/abematv-runtime-perf-audit/devtools-drawer.png)

すると、コメントの領域はオレンジ色の枠で囲まれているだけで、緑色にはなっておらず描画処理は行われていないことがわかる。この時点で、コメント領域は既に描画されているが画面内に入っておらず、アイコンがクリックされたタイミングでアニメーションしながら表示されることがわかる。アニメーションのタイミングでは描画処理が行われていない（というと語弊がありそうだが）ので、GPUでテクスチャ化されているものが動いているだけということもわかる。

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

予想通り、クリック時`.right-slide--shown`を付け外すことで`transformX(n)`で表示状態を切り替えている。これならば`.right-comment-area`が適用されている要素が変化しビットマップが更新されない限り、アニメーションによる再描画は発生しない。コメント表示は、機能としてポーリングで新しいコメントをロードするようになっているので、GPUに再度送っちゃう問題が起こりそうだが、一旦置いておく。

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

`this.showElement()`で先程の`.right-slide--shown`を付け外していて、その後のコメントデータを取得している。ここが重そうな予感がする。

表示の時（`toShow`が`true`のとき）に行われる`this.fetchComment()`で、コメントデータをサーバーから取得している。サーバーレスポンスが重いのかどうかの確認のため、対象のリクエストをNetworkパネルで確認する。

![](/img/posts/2016/abematv-runtime-perf-audit/fetch-comment.png)

Waitingが36msということで、大きな問題は無さそう。

では、Timelineから問題が見受けられていたスクリプト処理をプロファイルしてみる。

![](/img/posts/2016/abematv-runtime-perf-audit/cpu-profile.png)

すると`storeComment()`という関数で200msかかっているおり、その配下で2回コールされている`setState()`にそれぞれ100msかかっていることがわかる。`storeComment()`は`this.fetchComment()`内でコールしているアクションで呼び出され、subscriberに対してdispatchしている様子。

案の定`subscribe()`のコールバックで`setState()`が複数回実行されていて、状態に依っては3回以上コールされそうな状態だった。これを直す。

## 開閉処理のチューニング

ここからローカル環境で色々直していくので本番環境で計測したものとは異なってくる。ローカル環境で計測したチューニング前の結果は以下の状態。

![](/img/posts/2016/abematv-runtime-perf-audit/before.png)

### React Componentの`setState()`を複数回コールしないようにする

[React Componentの`setState()`](https://facebook.github.io/react/docs/component-api.html#setstate)は実行される度に`render()`が呼ばれる。`render()`が呼ばれると、VirtualDOMを生成して現在のものと比較し、diffに応じてHTMLに対してバッチを実行するので、`setState()`を不要に実行してはならない。Reactのパフォーマンスが良いというのはHTMLをいざ更新するときにブラウザの仕事を最小限に留めてくれるという話であって、React内部はそれなりの仕事をしてメモリも食うので、取り扱いは慎重にする。

問題が発生しているコンポーネントでは`setState()`を何度も呼ばないように修正出来そう。`setState()`の実行を最小限にした状態で計測したのがこちら。

![](/img/posts/2016/abematv-runtime-perf-audit/merge-setState.png)

実行時間がおよそ半分になっているのがわかる。

### ImmutableJSの`toJS()`がハイコストなのでなるべくコールしないようにする

これも調査中に発覚したことだが、JavaScriptネイティブなデータとImmutableJSなデータへの、`toJS()`と`fromJS()`による相互変換処理が重い。当然ながらデータの量に比例して更に重くなっていく。

プロジェクトの元々の設計方針としては、ComponentのstateにはImmutableなデータを格納し、`render()`で`toJS()`を実行して`Map`や`List`をJavaScriptネイティブなデータに変換するというものだった。コードは次のようなイメージ。

```javascript
export default class Component extends React.Component {
  // stateのデータはImmutableなデータ
  state = {
    foo : Map(),
    bar : List()
  };

  subscriptions = [];

  componentDidMount() {
    // FooStoreやBarStoreのsubscribeのコールバックには
    // Immutableなデータが流れてくるのでそのままsetState()
    this.subscriptions.push(
      FooStore.foo$.subscribe(foo => {
        this.setState({ foo });
      })
    );

    this.subscriptions.push(
      BarStore.bar$.subscribe(bar => {
        this.setState({ bar });
      })
    );
  }

  render() {
    // render()の度にImmutableなデータをtoJS()
    let foo = this.state.foo.toJS();
    let bar = this.state.bar.toJS();

    return (
      <div>
        <h1>{foo.text}</h1>
        <p>{bar.text}</p>
      </div>
    );
  }
}
```

この構造の問題は、FooStoreの変更通知で`setState()`している`foo`だけでなく、変更されていない`bar`も`render()`で`toJS()`を実行してしまっている点だ。実際にはsubscriptionsはこれよりずっと多いので、更に顕著になる。

重い重い`toJS()`の実行は最低限にしたいので、Componentのstateに入れるデータはJavaScriptネイティブの`Object`やら`Array`などにして、`setState()`でデータを更新する時に対象データだけ`toJS()`を実行するようにし、`render()`では実行しないように変える。「stateにImmutableなデータを保持するべきかどうか」という設計の話も大事だが、パフォーマンスで実害が出ているので開発者全体に合意を取る。

変更後イメージは以下の通り。これで`toJS()`の実行は必要最低限になった。

```javascript
export default class Component extends React.Component {
  // stateのデータはJavaScriptネイティブなデータ
  state = {
    foo : {},
    bar : []
  };

  subscriptions = [];

  componentDidMount() {
    // FooStoreやBarStoreのsubscribeのコールバックには
    // Immutableなデータが流れてくるのでtoJS()してsetState()
    this.subscriptions.push(
      FooStore.foo$.subscribe(foo => {
        this.setState({ foo : foo.toJS() });
      })
    );

    this.subscriptions.push(
      BarStore.bar$.subscribe(bar => {
        this.setState({ bar : bar.toJS() });
      })
    );
  }

  render() {
    return (
      <div>
        <h1>{this.state.foo.text}</h1>
        <p>{this.state.bar.text}</p>
      </div>
    );
  }
}
```

諸々修正して計測した結果は以下の通り。

![](/img/posts/2016/abematv-runtime-perf-audit/dont-use-Immutable.png)

元々130msだったのが9msまで速くなったということで、CPUに優しいプログラムになった。本番へは近日中にリリースされるでしょう。めでたしめでたし。

※この記事の内容と似たような方針で[番組表](https://abema.tv/timetable)のパフォーマンスも色々直したが、効果適面だった。
