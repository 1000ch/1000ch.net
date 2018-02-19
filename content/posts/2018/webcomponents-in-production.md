---
layout: post
title: Web Components を本番投入する（2018年春）
date: 2018-02-16
---

# Web Components を本番投入する（2018年春）

とあるプロジェクトの技術監修をして、大まかに Web Components + Payment Request API な構成で進めてみたのでその話を思い出しながら書く。ちなみに FRESH! ではないです。

## 決済基盤をサービスで使うための SDK

Payment Request API でお察しの通り、新たな決済基盤のプロジェクトで、それを使うための SDK を読み込んでボタンを配置すれば決済できる…みたいなものを作った。Payment Request API は、対応している環境ではそれで、対応していない環境では旧来の通り決済代行業者が用意しているフォーム付きページへ遷移させるという形でビジネスサイドへ提案した。

技術面に関しても、FRESH! で導入済みだったこともあり、いざとなればサポートできるという意味で心配はあまりないつもりだった。実際には iOS Chrome の Payment Request API 実装に幾つかバグがあったり、決済代行業者との通信時にデータを指定のフォーマットで暗号化しなければいけなかったりと、いくつか地雷は踏みぬいたが…。

- [806272 - Cannot type sonant mark (Japanese) on any input area of Payment Request API dialog - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=806272)
- [806666 - Total amount validation is wrong on Payment Request API - chromium - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=806666)

## ボタンを Web Components で配布したい

配布したい機能を含む JavaScript と CSS をロードさせて使ってもらう、昔ながらの形ではなく、Web Components で定義し配布させることにした。

- `<pay-button>購入する</pay-button>` で機能を提供でき、わかりやすい
- ロードした JavaScript や CSS が Shadow DOM に閉じるので、グローバル空間を汚さない

サービスを丸々 Web Components で構成するとなると大掛かりだが、範囲としてはまずまず小さく、おあつらえ向きだったと言える。2016年末に Safari が Custom Elements v1 と Shadow DOM v1 をサポートしたあたりからモバイル Web ならネイティブで使えることは何度か言ってきたが、2018年末ではサポート環境が更に充実してきた。モダンブラウザでは Firefox が [v59 で Custom Elements v1 をサポートし](https://caniuse.com/#feat=custom-elementsv1)、[Shadow DOM v1 も v59 か v60 に間に合わせたい](https://bugzilla.mozilla.org/show_bug.cgi?id=1205323)様子。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">Happy to say that support for Custom Elements and Shadow DOM is coming to Gecko in the Firefox 59/60 time frame. Web Components FTW! 🦎🚀</p>&mdash; Andreas Bovens (@andreasbovens) <a href="https://twitter.com/andreasbovens/status/935870321386754048?ref_src=twsrc%5Etfw">2017年11月29日</a></blockquote>

IE11 は仕方ないとして、残すところは Edge のみとなった。これらの非対応ブラウザでも動いてもらうために、 [webcomponents/webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) をロードさせる。Shadow DOM の振る舞いを完全にはエミュレートできず、具体的には、Shadow DOM にぶら下がる予定の `<style>` などが Light DOM にむき出しになるので、読み込んだ先でクラス名が衝突しないようにある程度のケアは必要である。

## ES Modules でロードしてもらう

Web Components で作ったコンポーネントを ES Modules とそのフォールバックでロードしてもらう。

```html
<pay-button>購入する</pay-button>
<script nomodule src="polyfill.js"></script>
<script type="module" src="sdk.js"></script>
<script nomodule src="bundle.js"></script>
```

これで、ES Modules に対応しているブラウザは `sdk.js` をロードし、内部の `import` や `export` もブラウザネイティブで解決する。対応していないブラウザ向けには、`sdk.js` をエントリポイントにして依存モジュールをまとめた `bundle.js` を、 `nomodule` 属性付きの `<script>` 要素でロードする。

バンドルには [rollup/rollup](https://github.com/rollup/rollup) を、トランスパイルには [babel/babel](https://github.com/babel/babel) を使った（ここでも地雷はいくつかあったが、単なる rollup.config.js の書き方の話なので割愛する）。Edge 向けのトランスパイルはある程度省いても良いはずだが、IE11 とエントリポイントとなるファイルが分かれるより、一律トランスパイルして単純化する。どのスペックについても中長期的に Edge のサポートを期待できるので、バンドルもトランスパイルもされていない `sdk.js` 側を ES Modules をロードしてくれる日が来るはずである。「ES Modules はサポートしたけど、あのシンタックスをサポートしていない」みたいな状況になって部分的にトランスパイルする、などの微調整は要るかもしれないが。

## 導入する側でのボタン UI のカスタマイズ

SDK 側でカスタマイズされたくない、あるいはしても良いというレギュレーションはさておき、Shadow DOM 内部のスタイルも closed な Shadow DOM でない限り上書きできる。仮にボタンの UI を上書きできないとしても、JavaScript のメソッドを直接実行すれば機能を使える。

```javascript
import PayButton from './pay-button.js';

// window に宣言する
window.PayButton = PayButton;

// <pay-button> 要素を宣言する
customElements.define('pay-button', PayButton);

// PayButton クラスを命令的に使う
const payButton = new PayButton();
payButton.foo = '...';
payButton.pay();
```

なので、ボタンの `click` イベントで実行すれば、提供している UI は自由である。

```javascript
// 望ましくない？
export default class Component extends React.Component {
  onClick() {
    // window.PayButton を命令的に使う
    const payButton = new PayButton();
    payButton.foo = this.props.foo;
    payButton.pay();
  }

  render() {
    return <button onClick={this.onClick}>購入する</button>;
  }
}
```

が、これだと Web Components もへったくれもない使い方ではあるので、次のように宣言的に使って欲しい所ではある（使って欲しいというか、Web Components の流儀はこういうものだと解釈している）。

```javascript
// 望ましい
export default class Component extends React.Component {
  render() {
    return <pay-button foo={this.props.foo}>購入する</pay-button>;
  }
}
```

こうした他のライブラリとの共存については、[JSフレームワークの末端がWebComponentsになるのか、なれるのか、検証してみた](https://qiita.com/mizchi/items/053f5b42a6d0902e9412) という記事を最近見かけた。JSX は結局 JavaScript の世界なので、HTML と JavaScript でやり取りをしようとした時にどうしてもモヤモヤは残る。
