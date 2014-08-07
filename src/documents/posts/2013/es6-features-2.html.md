---
layout: post
title: ES6のシンタックスを予習復習(2) ~Default Parameters, Rest Parameters, Array Spread, Destructuring~
date: 2013-12-27
---

# ES6のシンタックスを予習復習(2) ~Default Parameters, Rest Parameters, Array Spread, Destructuring~

[先日の記事](http://1000ch.net/2013/12/26/ES6LetConstArrowFunction/)の続きです。

> 続き(?)はまた新年

いったばかりですが続きを。引き続き[Firefox Nightly](http://nightly.mozilla.org/)で試していきます。

## Default Parameters

関数の引数にデフォルト値を与えることが出来ます。
今まではこのような形で引数のチェックをする必要がありました。

```js
function fn(arg1, arg2) {
  arg1 = arg1 || 0;
  arg2 = arg2 || 1;
  console.log('arg1 is ' + arg1);
  console.log('arg2 is ' + arg2);
}
fn(10);
// arg1 is 10
// arg2 is 1
fn(undefined, 5);
// arg1 is 0
// arg2 is 5
```

Default Parameterを活用すると、

```js
function fn(arg1 = 0, arg2 = 1) {
  console.log('arg1 is ' + arg1);
  console.log('arg2 is ' + arg2);
}
fn(10);
// arg1 is 10
// arg2 is 1
fn(undefined, 5);
// arg1 is 0
// arg2 is 5
```

便利ですねー。が、細かいことを言うと上と下でやっていることは異なります。
例えば、`null`を入れるとデフォルト値は代入されずに評価されます。
`null`は`null`という値なので当たり前といえばそれまでなのですが、ちゃんと挙動を理解した上で使いましょう。
[デフォルトパラメータの挙動はアレコレやってるみたい](https://bugzilla.mozilla.org/show_bug.cgi?id=781422)なのでこの先も要チェック。

## Rest Parameters

今まで引数を可変長っぽく評価したい場合はargumentsオブジェクトでやっていましたが、
Rest Parametersシンタックスを使うことで引数を可変長で受け取ることが可能です。

```js
function rest(...r) {
  console.log(r);
}
rest(1, 2, 3);
// [1, 2, 3]
rest(10, 'foo', [5, 20]);
// [10, "foo", Array[2]]
rest('bar');
// ["bar"]
```

色々気になったのが、この場合の`r`の型と何も渡さないケースですが、
rは **常に配列(Array LikeではなくArray)** で、 **パラメータを渡さない場合も長さ0の配列** になりました。
あと、Rest Parametersは引数の最後でなければなりません。


```js
function rest(...r, a) {
  console.log(r);
}
// SyntaxError: parameter after rest parameter
```

上のように書くと、エラーが出ます。以下の様な形ならOKです。

```js
function rest(a, ...r) {
  console.log(r);
}
```

## Array Spread

Rest Parametersと同じように、代入時にも使用することができます。

```js
let array1 = [7, 8, 9];
let array2 = [1, 2, ...array1];
console.log(array1);
// [1, 2, 7, 8, 9]

function fn1(...r) {
  return r;
}
function fn2(...g) {
  return fn1(g)
}
console.log(fn2(1, 2, 3).toString());
// 1,2,3
```

## 変数の分割代入

新しい変数代入の方法です。

```js
var [a, b] = [1, 2];
console.log(a);
// 1
console.log(b);
// 2
```

左辺に配列表現があって違和感がありますね。

```js
var array = [3, 4];
var [c, d] = array;
console.log(c);
// 1
console.log(d);
// 2
console.log(Array.isArray(array));
// true
```

うん、右辺は配列なので、左辺だけちょっと見慣れる必要がありそう。（そんなに大げさでもないけど）

## あと試したいやつ

- [class](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes) - 個人的には待ち望んでる
- [Modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules) - **import** と `<module>`のやつ
- [Template Strings](http://wiki.ecmascript.org/doku.php?id=harmony:quasis) - テンプレート

あと、`Array`が拡張されるのは嬉しい。<del>あと静的型付になったらなぁ。</del>
プラットフォームが開発側でコントロール出来ないJavaScriptを進化させるのは難しいよなぁと、今更ながら思いました。
JavaもC#もRubyもPythonも、サーバーの環境で完結させることが出来るけど、JSはそうもいかない。

あと、ES6と関係無いですが[Products](http://1000ch.net/products)のページ更新しました。
ChromeのExtensionとか、AlfredのWorkflowとか、JSライブラリとかの置き場になってます。
来年も継続してコードを書いて、Web Engineerとして進化していきたい。頑張ります。