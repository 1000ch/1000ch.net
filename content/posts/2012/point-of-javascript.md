---
layout: post
title: jQueryでコーディングをする際気をつけたいポイント
date: 2012-12-02
---

# jQueryでコーディングをする際気をつけたいポイント

煩雑なDOMのAPIをラップして扱いやすいインターフェースを提供するjQuery。非常に便利なjQueryだけど、DOM操作のコスト自体が低くなる訳ではないので、実装方法によってはブラウザに大きな負荷をかけてしまう。特に、モバイルデバイスのようなか弱い環境にとってはそれなりにシビアになってくる。端末の性能も飛躍的に向上してきてるとはいえ、最適化された実装を目指さない理由はない。

jQueryでコーディングしていく上で気をつけると良いというポイントを挙げてみる。jQueryと銘打ってるけどそれに限らず、ZeptoでもピュアなJavaScriptでも同じこと。

## CSS Selectorのキャッシュ

大半のケースで、要素の再検索は必要ないはず。クエリの実行結果はキャッシュする。

```js
// これはNG
$('#hoge').hide();
$('#hoge').css('background', '#ccc');
$('#hoge').show();
```

jQueryは`$()`の中にCSSセレクタを渡す事で、指定の要素を探す。つまり、上の例はidがhogeの要素を3回探して、jQueryのインスタンスを3つ生成していることになる。

```js
// これが望ましい
var hoge = $('#hoge');
hoge.hide();
hoge.css('background', '#ccc');
hoge.show();
```

こちらが検索結果を保持し、最適化したコード。要素検索とjQueryオブジェクトの生成が1回のみになっている。変数に格納するしない、あるいはメソッドチェーンするかどうかは、コードの見通しの善し悪しで決めれば良い。

## ループ文の書き方

よく書かれがちなループ文。

```javascript
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
for (var i = 0; i < array.length; i++) {
  var data = '<div>' + array[i] + '</div>';
  // ...
}
```

まず、forの継続条件評価式に`i < array.length`とある。継続条件評価はループの度に行われ、配列のlengthプロパティは都度参照されることになる。また、for文の中で`var data`を定義しhtmlを受け取っているが、特殊な理由がない限り、for文の外で定義すべき。これだとループの度にdataが宣言されることなる。

```javascript
// 上記をふまえたループ文
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var i, len = array.length;
var data = '';
for (var i = 0, len = array.length; i < len; i++) {
  data = '<div>' + array[i] + '</div>';
  // ...
}
```

ちなみに、逆ループにはなるがこれが最速かと思っている。

```javascript
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var len = array.length;
var data = '';
while (len--) {
  data = '<div>' + array[len] + '</div>';
  // ...
}
```

## ループ中のappendはしない

HTMLの文字列やDOMノード、及びそれらをラップしたjQueryインスタンスを生成し、HTMLドキュメントに追加するケースは多々あるけど、その際の留意点。先程の`for`ループ処理の最適化と合わせて実施したい。

まずは、ループ中で都度HTMLドキュメントに対して追加処理をしている例。

```js
// 都度appendしてるのはNG
var container = $('ul');
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var i, len = array.length;
for (i = 0;i < len;i++) {
  container.append('<li>' + array[i] + '</li>');
}
```

`container`に対し、都度HTMLを追加しているが、この記述だとループの度にリフロー+リペイント（HTMLの再レイアウトと再描画）が発生する。この再レイアウトと再描画の発生を少なくすることでちらつきを減らす。

```js
// 最後にappendする
var container = $('ul');
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var i, len = array.length;
var html = '';
for (i = 0;i < len;i++) {
  html += '<li>' + array[i] + '</li>';
}
container.append(html);
```

このように追加するHTMLを蓄積して、最後にappendすることでHTMLドキュメントに対する変更処理を最小限に留めることができる。

## カスタムデータ属性の参照の仕方

### 「JavaScriptでhtmlを操作することはもちろん、参照する事すら高価である。」 by [@cssrasar](http://twitter.com/cssradar)

参照の仕方はいくつかあるけど、jQueryの例も含めて、カスタムデータ属性を参照してみる。

```html
<button class="buttonClassName" data-hoge="この値取りたい">ボタン</button>
```

```js
$('.buttonClassName').on('click', function() {
  // この3つが考えられる
  console.log(this.getAttribute('data-hoge'));
  console.log($(this).attr('data-hoge'));
  console.log($(this).data('hoge'));
});
```

後者2つに関しては、jQueryのインスタンスの生成および内部メソッドを通るため低速になる。このケースに関して言えば、jQueryを通す事はただの遠回りと言える。さらに、`.data()`の返り値は、暗黙的に型変換されるため注意したい。例えば文字列の"2"であれば`Number`に型変換される。

- [jQueryの$elm.data()で取得できる値は暗黙でstringから型変換される ::ハブろぐ](http://havelog.ayumusato.com/develop/javascript/e291-jquery_data_method.html)
- [HTML5 data attribute - dataset vs getAttribute - jsPerf](http://jsperf.com/html5-data-attribute-dataset-vs-getattribute)
- [dataset vs jquery.data() - jsPerf](http://jsperf.com/dataset-vs-jquery-data/4)

jQueryの関数インターフェースの特徴として、参照系は内包する要素の先頭を取得しようとするので、そもそもこれが好きじゃかったりする。コーディングの統一感に反する恐れはあるが、個人的には`getAttribute()`をオススメしたい。
