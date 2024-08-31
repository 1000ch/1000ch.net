---
title: 画像を便利に扱うReactコンポーネント
date: 2017-08-11
---

# 画像を便利に扱うReactコンポーネント

React を使った Web プロダクト開発では、遅延ロードやアクセシビリティといった画像として基本的な機能を備えつつ、ステートレスな `<Image>` コンポーネントを実装することがしばしある。

[FRESH!](https://freshlive.tv) の Web 開発チームでは以前[Intersection Observerを使った要素の出現を検出するReactコンポーネント](/posts/2017/openfresh-viewport-observer.html)を公開したが、今度は画像を扱う汎用 React コンポーネントを公開した。今日はその紹介と、それらを組み合わせた `<Image>` コンポーネントの実装をしてみる。

こちらも FRESH! 以外でも使えたら便利だなと思った次第で、機能の切り出しは作業は富澤さん [@tommy-san](https://github.com/tommy-san) がやってくれた 🙏

## SuperImage

仮で付けていた `SuperImage` がそのまま名前に採用されてしまった。[`openfresh/super-image`](https://github.com/openfresh/super-image) にて公開されている。

このコンポーネントの機能はシンプルに絞ってある。

- [`object-fit`](https://developer.mozilla.org/ja/docs/Web/CSS/object-fit) を使ったレイアウトが可能で、非対応ブラウザでも [`background-size`](https://developer.mozilla.org/ja/docs/Web/CSS/background-size) でフォールバックする
- `alt` 属性が未指定の場合に、空文字を付与する。`object-fit` がフォールバックされ `<img>` で描画されない場合は `aria-label` を使う

素で使うには少し面倒な `<picture>` 要素や `srcset` 属性を使ったレスポンシブな画像の表示なども、このコンポーネントでうまくラップできると良さそう。

## ViewportObserverとの連携

ViewportObserver と組み合わせれば、画像表示に関して用意しておきたい機能はおおよそカバーできるはず。

次のコードは、スクロール同期で画像をロードしつつ、フォールバック付きで `object-fit` でレイアウトできる `<Image>` コンポーネントのサンプルである。

```jsx
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as SuperImage from 'super-image';
import * as ViewportObserver from 'viewport-observer';

const DUMMY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAP//////zCH5BAEHAAAALAAAAAABAAEAAAICRAEAOw==';
const ROOT_MARGIN = '200px 0';

export default class Image extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    fit: PropTypes.oneOf(['contain', 'cover'])
  };

  state = {
    src: DUMMY_IMAGE
  };

  onEnter() {
    this.setState({
      src: this.props.src
    });
  }

  onError() {
    this.setState({
      src: DUMMY_IMAGE
    });
  }

  render() {
    return (
      <ViewportObserver
        triggerOnce
        rootMargin={ROOT_MARGIN}
        onEnter={this.onEnter}>
        <SuperImage
          src={this.state.src}
          fit={this.props.fit}
          onError={this.onError}
        />
      </ViewportObserver>
    );
  }
}
```

`DUMMY_IMAGE` は base64 でエンコードされた 1px 四方の gif 画像で、プレースホルダーとしてデフォルト設定されている。

`ROOT_MARGIN` は ViewportObserver 内部で使っている IntersectionObserver のコンストラクタに指定する `rootMargin` の値で、ビューポートからのオフセットとして機能する。これによって要素が画面下部に交差した瞬間を判定可能で、要素が画面に交差した瞬間に画像をロードすることの遅延を緩和できる。
