---
title: JavaScriptで起こるメモリリークのパターン
date: 2017-02-17
---

2014年1月25日に [Frontrend in Fukuoka](http://frontendfrogs.org/frontrend/) というイベントが開催された（もう3年前か…）。その時に [Browser Computing Structure](https://speakerdeck.com/1000ch/browser-computing-structure) というタイトルで、ブラウザの仕組みやらスクリプト処理について発表している。

たまたま当時の資料を掘り起こす機会があったので、メモリリークのサンプルを直したついでにリークする JavaScript のパターンについて書き起こしてみる。サンプルは [1000ch/memory-leak](https://1000ch.github.io/memory-leak) に公開してあり、手順通り操作するとメモリリークを再現できるようになっている。

## GCで回収されないオブジェクト

JavaScript はランタイム上で動的にメモリを確保する GC（[ガベージコレクション](https://ja.wikipedia.org/wiki/%E3%82%AC%E3%83%99%E3%83%BC%E3%82%B8%E3%82%B3%E3%83%AC%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3)）を採用しているので、JavaScript の書き手がメモリの確保・開放を意識することは少ない。しかしプログラムの書き方によっては、確保したメモリが GC によって開放されずにメモリが肥大化し、内部処理を圧迫していくことになる。

開放されないメモリは、対象の変数への参照が残っている場合である。どこかで使われている変数であれば GC で回収してはまずいが、不要になった変数が回収されないのはプログラム上のミスと言える。

```javascript
class Leaker {}

let leaker = new Leaker();
```

この JavaScript を実行してみる。実行は Chrome DevTools の Console 上で問題ない。実行したら Memory パネルを開いて **Take Heap Snapshot** を選択して実行すると、ヒープのスナップショットを保存できる。保存したスナップショットの内部を `Leaker` で検索すると、オブジェクトが見つかる。グローバルに存在する `Leaker` インスタンスが GC によって回収されていないためだ。

次に `leaker = null;` を Console で実行すると `leaker` は参照元がなくなり GC による回収対象となる。再度ヒープのスナップショットを保存してみてみると、先程検出された `Leaker` オブジェクトはいなくなっているはず。これがメモリリークの単純な例、もとい GC の基本的な仕組みである。

## 解除されないタイマーやイベントリスナー

`null` を代入して GC による回収を促しても、実行したタイマーや登録したイベントリスナは暗黙的に解除されない。次の `Leaker` はインスタンスを作成した時点でタイマーが発動するが、そのインスタンスに `null` を代入してもタイマーは実行され続ける。

```javascript
class Leaker {
  constructor() {
    this.timerId = setInterval(this.onInterval, 1000);
  }

  onInterval() {
    console.log('interval');
  }
}

let leaker = new Leaker();
leaker = null;
```

先の例と同じように `leaker = null;` を Console で実行した後にヒープのスナップショットを取ってみると、ヒープには `Leaker` オブジェクトが残っていないことが確認できる。デストラクタの機構が JavaScript にあればその中で解除処理を入れれば良さそうだが、[残念ながらない](http://stackoverflow.com/questions/29333017/ecmascript-6-class-destructor)。自前の `dispose()` 関数などを用意して呼び出すことをルール化するなどの工夫が必要になる。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ふと、なぜ JavaScript には destructor がないんだろうと...</p>&mdash; 煎茶 🍵 (@1000ch) <a href="https://twitter.com/1000ch/status/828601998488383488">2017年2月6日</a></blockquote>

## 循環参照

自分で自分を参照してしまったり、2つのオブジェクトが互いに参照しあうなど、オブジェクトの参照がループすることを循環参照と言う。

次のコードは `Registry` というオブジェクトを保持するクラスと、 `Leaker` という親・子への参照と `Registry` のインスタンスを持つクラス。 `Leaker` オブジェクトは親が存在しない場合のみ、新たに `Leaker` のインスタンスを作成して子供として参照する。

```javascript
class Registry {
  constructor() {
    this.subscribers = [];
  }

  add(subscriber) {
    if (!this.subscribers.includes(subscriber)) {
      this.subscribers.push(subscriber);
    }
  }

  remove(subscriber) {
    if (this.subscribers.includes(subscriber)) {
      this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
    }
  }
}

class Leaker {
  constructor(parent, registry) {
    this.parent = parent;
    this.registry = registry;
    this.child = null;
    this.registry.add(this);

    if (!this.parent) {
      this.child = new Leaker(this, registry);
    }
  }
}

let registry = new Registry();
let leaker = new Leaker(null, registry);
leaker = null;
```

`Registry` と `Leaker` のそれぞれを初期化すると次のようになる。

- [1] `Registry` インスタンス
- [2] `Leaker` インスタンス
  - [1] の `Registry` インスタンスを参照
    - [2] の `Leaker` インスタンスを参照
  - [3] `Leaker` 子インスタンス
    - [1] の `Registry` インスタンスを参照
    - [2] の `Leaker` 親インスタンスを参照

次に [2] の `Leaker` インスタンスに `null` を代入するが、`Registry` インスタンスや `Leaker` 子インスタンスなどから再帰的に参照されているので、GC によって回収されない。これは複雑かつ露骨な例だが、ヒープのスナップショットなどに開放されているはずのオブジェクトが残っている場合は要注意。

## コンソールから参照されるオブジェクト

`console.log(object)` などで出力しているオブジェクトは、コンソールから参照していることで GC によってメモリが開放されないケースがあった。しかし最新の Chrome では確認できず、どうやら解消されたようだ。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Chrome の `console.log(object)` で参照してるせいで GC で回収されない現象、無くなってるぽい（前も解消されてるなーという記憶はあったけど改めて確認した） <a href="https://t.co/grkBbHHqNQ">https://t.co/grkBbHHqNQ</a></p>&mdash; 煎茶 🍵 (@1000ch) <a href="https://twitter.com/1000ch/status/827067019451199488">2017年2月2日</a></blockquote>
