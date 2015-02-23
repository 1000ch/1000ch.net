---
layout: post
title: jQueryでコーディングをする際気をつけたいポイント
date: 2012-12-02
---

# jQueryでコーディングをする際気をつけたいポイント

Webの開発において欠かすことのできないJavaScript。html/cssしか触った事のない人でも理解のしやすいモデルを提供するjQuery。
非常に便利なjQueryだけど、DOM操作のコスト自体が低くなる訳ではないので、実装方法によってはブラウザに大きな負荷をかける場合がある。特に、モバイルデバイス等のか弱い環境にとってはそれなりにシビアな所。端末の性能も飛躍的に向上してきてるとはいえ、最適化された実装を目指さない理由はない。

この辺りを気をつけると良いっていうポイントを挙げてみる。jQueryと銘打ってるけどそれに限らず、ZeptoでもピュアなJavaScriptでも同じこと。

## ループ文の書き方

よく書かれがちなループ文。

```js
var array = ["data1", "data2", "data3", "data4", "data5"];
for (var i = 0;i < array.length;i++) {
    var data = "<div>" + array[i] + "</div>";
    //any process...
}
```

まず、forの継続条件評価式に`i < array.length`とある。継続条件評価はループの度に行われ、つまり、arrayのlengthプロパティは都度参照されることになる。また、for文の中で`var data`を定義しhtmlを受け取っていますが、特殊な理由がない限り、for文の外で定義すべき。ループの度にdataが宣言されると、ガベージコレクトの誘発に繋がる。

```js
// 上記をふまえたループ文
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var i, len = array.length, data = '';
for (i = 0;i < len;i++) {
  data = '<div>' + array[i] + '</div>';
  //any process...
}
```

ちなみに、逆ループにはなりますがこれが最速かと思っています。

```js
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var len = array.length, data = '';
while (len--) {
  data = '<div>' + array[len] + '</div>';
  // any process...
}
```

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

## ループ中のappendはしない

htmlを生成し追加するケースは多々あるけど、その際の留意点。

```js
// 都度appendしてるのはNG
var container = $('ul');
var array = ['data1', 'data2', 'data3', 'data4', 'data5'];
var i, len = array.length;
for (i = 0;i < len;i++) {
  container.append('<li>' + array[i] + '</li>');
}
```

`container`に対し、都度htmlを追加していますが、この記述だと追加の度にリフロー+リペイントが発生します。
要素の動く先の再計算や再描画がループ中に発生しないようにしましょう。

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

## カスタムデータ属性の参照の仕方

### 「JavaScriptでhtmlを操作することはもちろん、参照する事すら高価である。」

これ、[@cssrasar](http://twitter.com/cssradar)先生の御言葉。

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

後者2つに関してはjQuery内部を通るため、低速。jQueryの関数インターフェースの特徴として、参照系は内包する要素の先頭を取得しようとする（そもそもこれが好きじゃない）。このケースに関して言えば、jQueryを通す事はただの遠回りと言える。また、`$().data()`の返り値は暗黙的に型変換されるため、注意。

- [jQueryの$elm.data()で取得できる値は暗黙でstringから型変換される ::ハブろぐ](http://havelog.ayumusato.com/develop/javascript/e291-jquery_data_method.html)
- [HTML5 data attribute - dataset vs getAttribute - jsPerf](http://jsperf.com/html5-data-attribute-dataset-vs-getattribute)
- [dataset vs jquery.data() - jsPerf](http://jsperf.com/dataset-vs-jquery-data/4)

コーディングの統一感に反する恐れはありますが、個人的には`getAttribute()`を使用する事をオススメする。

## まとめ

もう少し言及出来る部分もありますが、今日はここまで。次はbindとdelegateの使い分けとか。