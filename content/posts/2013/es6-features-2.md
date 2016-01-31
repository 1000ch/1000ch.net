---
layout: post
title: ES6のシンタックスを予習復習(2) ~Default Parameters, Rest Parameters, Array Spread, Destructuring~
date: 2013-12-27
---

# ES6のシンタックスを予習復習(2) ~Default Parameters, Rest Parameters, Array Spread, Destructuring~

[先日の記事](/posts/2013/es6-features-1.html)で、

> 続き(?)はまた新年

と、言ったばかりだけど、続きを。引き続き[Firefox Nightly](http://nightly.mozilla.org/)で試していく。

## Default Parameters

関数の引数にデフォルト値を与えることが出来る。今まではこのような形で引数のチェックをする必要があった。

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

Default Parameterを使うと、

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

うーん、便利だ。が、厳密に言うと上下でやっていることは違っていて、例えば、`null`を入れるとデフォルト値は代入されずに評価される。`null`は`null`という値なので当たり前といえばそれまでだけど、挙動を理解した上で使ったほうが良い。[デフォルトパラメータの挙動はアレコレやってるみたい](https://bugzilla.mozilla.org/show_bug.cgi?id=781422)なのでこの先も要チェック。

## Rest Parameters

今まで引数を可変長っぽく評価したい場合は`arguments`オブジェクトでやっていたが、Rest Parametersシンタックスを使うことで、引数を可変長で受け取ることが可能になる。

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

色々気になったのが、この場合の`r`の型と何も渡さないケースだが、rは **常に配列(Array LikeではなくArray)** で、 **パラメータを渡さない場合も長さ0の配列** になった。また、Rest Parametersは引数の最後でなければならないという制約もある。


```js
function rest(...r, a) {
  console.log(r);
}
// SyntaxError: parameter after rest parameter
```

上のように書くと、エラーが出る。以下の様な形ならOK。

```js
function rest(a, ...r) {
  console.log(r);
}
```

## Array Spread

Rest Parametersと同じように、代入時にも使用することができる。

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

新しい変数代入の方法。

```js
var [a, b] = [1, 2];
var {y: year, m: month} = {y: 2013, m: 12};
console.log(a);
// 1
console.log(b);
// 2
```

左辺に配列・オブジェクトがあって違和感がある。

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

右辺は配列ないしオブジェクトなので、左辺だけちょっと見慣れる必要がありそう（そんなに大げさでもないけど）。

## あと試したいやつ

- [class](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes) - 個人的には待ち望んでる
- [Modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules) - **import** と `<module>`のやつ
- [Template Strings](http://wiki.ecmascript.org/doku.php?id=harmony:quasis) - テンプレート

プラットフォームが開発側でコントロール出来ないJavaScriptを進化させるのは難しいよなぁと、今更ながら思った。JavaもC#もRubyもPythonも、サーバーの環境で完結させることが出来るけど、JSはそうもいかない。
