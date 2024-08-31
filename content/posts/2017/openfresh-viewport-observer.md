---
title: Intersection Observerを使った要素の出現を検出するReactコンポーネント
date: 2017-05-17
---

# Intersection Observerを使った要素の出現を検出するReactコンポーネント

Intersection Observer を使った要素の検出については、[過去に記事にしていたり](/posts/2016/intersection-observer-lazyload.html)、[Intersection Observer を用いた要素出現検出の最適化 | blog.jxck.io](https://blog.jxck.io/entries/2016-06-25/intersection-observer.html)などでより具体的に触れられている。また[最近関わっている FRESH! でも導入した](https://developers.cyberagent.co.jp/blog/archives/6057/)経緯があるが、今回はその React 実装部分を切り出し、オープンソースとして公開した話。

## ViewportObserver

元々付けていたものや目ぼしい名前空間は軒並み取られていて、結局 `ViewportObserver` というコンポーネント名に着地した。[`openfresh/viewport-observer`](https://github.com/openfresh/viewport-observer) にて公開されている。

```bash
$ npm install --save viewport-observer
```

でインストールして、

```jsx
import { Component } from 'react';
import ViewportObserver from 'viewport-observer';

export default class Foo extends Component {
  render() {
    return (
      <ViewportObserver
        onChange={() => console.log('onChange')}
        onEnter={() => console.log('onEnter')}
        onLeave={() => console.log('onLeave')}
      />
    );
  }
}
```

な感じで使う。詳しくは README を参照のこと。

内部実装は [`IntersectionObserver`](https://wicg.github.io/IntersectionObserver/) に依存しているが、このパッケージにはポリフィルを含んでいないので、別途 [`WICG/IntersectionObserver`](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill) あたりでポリフィルしておく必要アリ。

## openfreshでのソフトウェアの公開

FRESH! の開発で生まれた副産物は [`github.com/openfresh`](https://github.com/openfresh) での公開を徐々に進めていて、Web クライアントサイドだと [ESLint の設定](https://github.com/openfresh/eslint-config-fresh)や [stylelint の設定](https://github.com/openfresh/stylelint-config-fresh)なども公開されている。これだけでも、マイクロサービス化されている FRESH! 内の他プロジェクトで使う時に `.eslintrc` をメンテナンスする必要がなくなるし、ViewportObserver のように社内の他のプロジェクトでも使える（もちろん、社内に限らず！）。

小さいことだけど、需要に応えられる可能性があるし、メンテナンスコストを分散できるかもしれない。実際 `ViewportObserver` に関しては、もともと作りがシンプルだったので公開できたら良さそうだなとは思っていた矢先、社内の近隣のプロジェクトから欲しいという声を複数もらったので公開に踏み切った。この辺りの気持ちについては [`openfresh/plasma`](https://github.com/openfresh/plasma) の公開に際して書かれている [gRPCとServer-Sent Eventsでサーバプッシュできるplasmaを公開しました - tehepero note(・ω<)](http://blog.stormcat.io/entry/openfresh-plasma)でも似たような言及がある。

他の人に使われているプレッシャーによる、ある種義務のような保守意識を持つため…というと色々違うような気もするけど、中途半端にコストかけてプライベートに使い続けて闇に葬られる…よりはマシだと信じたい。
