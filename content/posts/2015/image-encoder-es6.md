---
layout: post
title: 画像をdataURIに変換するライブラリをES6で書きなおす
date: 2015-01-06
---

# 画像をdataURIに変換するライブラリをES6で書きなおす

だいぶ前に書いたコードを掘り当ててそれをES6で書き直したのと、エディタのバグらしき現象にぶつかった話。ライブラリはファイルパスを渡して、Canvasに突っ込んだ後、データをdataURIにして出力する。インターフェースがPromise。特に変わったことしてないです(｡-人-｡)ｺﾞﾒﾝﾅｻｲ

ちなみに、リポジトリは[1000ch/image-encoder](https://github.com/1000ch/image-encoder)です。

## ES5で書かれた実装

ES5と言っておきながらPromiseを使っている点には突っ込まないこと。

```javascript
(function (window) {
  
  function ImageEncoder(path, width, height) {
    this.path = path || '';
    this.width = width || 1;
    this.height = height || 1;
  }

  // ...

  ImageEncoder.prototype.getDataURI = function () {

    var that = this;

    return new Promise(function (resolve, reject) {
      
      var image = new Image();
      image.setAttribute('crossOrigin','anonymous');

      var onLoad = function (e) {

        var canvas = document.createElement('canvas');
        canvas.width = that.width ? that.width : image.width;
        canvas.height = that.height ? that.height : image.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        resolve(canvas.toDataURL('image/png', 1));
      };

      var onError = function (e) {

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        reject(e);
      };

      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      image.src = that.path;
    });
  };
  
  window.ImageEncoder = ImageEncoder;
  
})(window);
```

使うには、のような感じ。

```javascript
new ImageEncoder('image.png').getDataURI().then(function onFulfilled(dataURI) {
  console.log(dataURI);
});
```

## ES6で書きなおした実装

コンストラクタで引数をチェックしていたり、`var that = this;`はアロー記法の`this`キャプチャで無くせそうだなとか。`class`構文を使って書きなおしたクラスを`export`したり、`var`を`let`にしたり。色々妄想をしながら書き直す。

やや古いポストだけど、ES6の各種機能等は以下の記事が参考になるかも。

- [ES6のシンタックスを予習復習(1) ~let, const, Arrow Function, Generators, for of~](http://1000ch.net/posts/2013/es6-features-1.html)
- [ES6のシンタックスを予習復習(2) ~Default Parameters, Rest Parameters, Array Spread, Destructuring~](http://1000ch.net/posts/2013/es6-features-2.html)

以下がES6で書き直したコード。

```javascript
export class ImageEncoder {

  constructor(path = '', width = 1, height = 1) {
    this.path = path;
    this.width = width;
    this.height = height;
  }

  // ...

  getDataURI() {

    return new Promise((resolve, reject) => {

      let image = new Image();
      image.setAttribute('crossOrigin','anonymous');

      let onLoad = (e) => {

        let canvas = document.createElement('canvas');
        canvas.width = this.width ? this.width : image.width;
        canvas.height = this.height ? this.height : image.height;
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        resolve(canvas.toDataURL('image/png', 1));
      };

      let onError = (e) => {

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        reject(e);
      };

      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      image.src = this.path;
    });
  }
}
```

かなりJavaっぽく見える…(´･∀･`)

`Image`オブジェクトの`load`イベントにバインドしている`onLoad`等はアロー関数で書いている。その手前の`Promise`のコンストラクタでもアロー関数を使うことで`getDataURI`の`this`をここでは2段構えで引き継いでいる。

`Image`オブジェクトの`load`にバインドしていると、イベントハンドラの呼び出し元オブジェクトは`Image`になるはずなのに、こうやってアロー記法でキャプチャしてしまうのも見通しが良くないような気もする（ネストしていると尚更）。

## トランスパイル

ECMAScript 6から5へのトランスパイルだと[google/traceur-compiler](https://github.com/google/traceur-compiler)か、[6to5/6to5](https://github.com/6to5/6to5)がメジャーっぽい。

### Google Traceur Compiler

traceurはプリビルド以外にも、ランタイムエンジンを入れればES6のコードをそのまま実行できたりするので、ES6のブラウザサポートが進んだ時にランタイムエンジンをロードするコードを外せばそのまま動く！みたいなことが可能（というか、それを想定してのランタイムエンジンかとは思う）。[カスタムビルドしないと重い](https://github.com/google/traceur-compiler/wiki/Building-custom-Traceur-runtimes)けど。

```html
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script>
  // ES6のコード
</script>
```

### 6to5

こちらも有名所なES6→ES5のトランスパイラ。ES6で書きなおした`ImageEncoder`を6to5で変換してみる。

```bash
# 6to5をグローバルにインストールする
$ npm install -g 6to5

# es6のコードをes5に変換する
$ 6to5 src/image-encoder-es6.js > transpiled.js
```

変換結果は以下の様になる。

```javascript
"use strict";

var ImageEncoder = function ImageEncoder() {
  var path = arguments[0] === undefined ? "" : arguments[0];
  var width = arguments[1] === undefined ? 1 : arguments[1];
  var height = arguments[2] === undefined ? 1 : arguments[2];
  this.path = path;
  this.width = width;
  this.height = height;
};

// ...

ImageEncoder.prototype.getDataURI = function () {
  var _this = this;

  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous");

    var onLoad = function (e) {
      var canvas = document.createElement("canvas");
      canvas.width = _this.width ? _this.width : image.width;
      canvas.height = _this.height ? _this.height : image.height;
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);

      resolve(canvas.toDataURL("image/png", 1));
    };

    var onError = function (e) {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);

      reject(e);
    };

    image.addEventListener("load", onLoad);
    image.addEventListener("error", onError);
    image.src = _this.path;
  });
};

exports.ImageEncoder = ImageEncoder;
```

とても綺麗に見える。綺麗に見えるどころか、元のコードに酷似している。この辺は`class`がシンタックスシュガーだなと改めて思わされるところ。

## 変な改行コードが挿入される？

Markdownは[iA Writer](http://www.iawriter.com/mac/)を使って書いているけど、このエディタ内でコードを編集して再びWebStormに貼り付けると文法ミス等が無いのに注意される。

![](/img/posts/2015/image-encoder-es6/error-1.png)

所々改行位置に謎のエラーが。これ、実は違う原稿を書いている時にも時折発生していた現象だったけどスルーしていた。

`nkf`で正体を探る。

```bash
$ nkf -Lu src/image-encoder-es6.js > test.js
```

すると、注意されている箇所で **窶ィ** という謎の呪文が現れた。

![](/img/posts/2015/image-encoder-es6/error-2.png)

ググっても有益そうな情報が中々出てこない。`cat -e`でも正体不明な記号が表示されてよくわからない…。
