---
layout: post
title: 画像を便利に扱うReactコンポーネント
date: 2017-08-11
---

# 画像を便利に扱うReactコンポーネント

[FRESH!](https://freshlive.tv) の Web 開発チームでは以前[Intersection Observerを使った要素の出現を検出するReactコンポーネント](/posts/2017/openfresh-viewport-observer.html)を公開したが、今度は画像を扱う汎用 React コンポーネントを公開した。

こちらも FRESH! 以外でも使えたら便利だなと思った次第で、機能の切り出しは作業は富澤さん [@tommy-san](https://github.com/tommy-san) がやってくれた 🙏

## SuperImage

仮で付けていた `SuperImage` がそのまま名前に採用されてしまった。[`openfresh/super-image`](https://github.com/openfresh/super-image) にて公開されている。

このコンポーネントの機能はシンプルに絞ってある。[`object-fit`](https://developer.mozilla.org/ja/docs/Web/CSS/object-fit) 非対応ブラウザでも [`background-size`](https://developer.mozilla.org/ja/docs/Web/CSS/background-size) でフォールバックして表示できたり、 `alt` 属性を未指定の場合によしなに空文字を付与するのみである。

素で使うには少し面倒な `<picture>` 要素や `srcset` 属性を使ったレスポンシブな画像の表示なども、このコンポーネントでうまくラップできると良さそう。

## ViewportObserverとの連携

ViewportObserver と組み合わせれば、画像表示に関して用意しておきたい機能はおおよそカバーできるはず。

次のコードは、スクロール同期で画像をロードしつつ、フォールバック付きで `object-fit` でレイアウトできる `<Image>` コンポーネントのサンプルである。

```jsx
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as SuperImage from 'super-image';
import * as ViewportObserver from 'viewport-observer';

const ROOT_MARGIN = '200px 0';
const DUMMY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAP//////zCH5BAEHAAAALAAAAAABAAEAAAICRAEAOw==';

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
