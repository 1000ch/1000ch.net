---
layout: post
title: クラス関数をthrottleするデコレータ
date: 2017-07-15
---

# クラス関数をthrottleするデコレータ

掲題の通り、throttle してくれる [1000ch/throttle-decorator](https://github.com/1000ch/throttle-decorator) というモジュールを作った。ES Decorator については[全力で ES Decorator使ってみた](http://qiita.com/mizchi/items/6bdf9d100f564a5c5b08)が参考になると思う。標準化されるか問題は一旦さておいて。

## インストールと使い方

npm でインストールする。

```bash
$ npm install --save-dev throttle-decorator
```

旧来 `throttle()` するときは宣言してあるイベントハンドラに `throttle()` を挟んで新たな名前付き関数を宣言していたと思う。React のコンポーネントの例だと次のようになる。

```jsx
import throttle from 'lodash.throttle';

class Foo extends React.Component {
  constructor() {
    this.onChange = throttle(this.onChange, 100);
  }

  onChange() {
    console.log('changeイベントを間引きたい');
  }

  render() {
    return <input onChange={this.onChange} />;
  }
}
```

そこで `throttle-decorator` を使うと、次のように書ける。

```jsx
import throttle from 'throttle-decorator';

class Foo extends React.Component {  
  @throttle(100)
  onChange() {
    console.log('changeイベントを間引きたい');
  }

  render() {
    return <input onChange={this.onChange} />;
  }
}
```

[Class と Property のデコレータ](https://github.com/tc39/proposal-decorators)は現在策定中で、今は Stage 2 である。まだ仕様が未完成な状態だが、Angular もモリモリ使っているようだしそのうち来るだろう（…と楽観している）。このご時世トランスパイラ前提になるのは諦めているので、互換性は然程気にしていないが、ECMAScript なら Safari もそこそこスピード感ありそうだし、心配していない。