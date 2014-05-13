---
layout: post
title: ES6のシンタックスを予習復習(1) ~let, const, arrow function, generators, for of~
date: 2013-12-26
---

## ECMAScript6

ES6のフォローについては書こうとしていたものの後手に回っていまして、ようやく書くに至ります。
SetやらMapやら、追加クラスのあたりは実装されても試そうとした時にそんなに障壁にならない気がしてますが、
`let`とか`const`、アローファンクション等々、シンタックスが関わる辺はつっかえ棒になりかねないので消化しておきます。

## この段階での実装状況はNightly > Canary

- Chrome Canary 34.0.1760.0
- Firefox Nightly 29.0a1 (2013-12-25)

この2つを[ECMAScript 6 compatibility table](http://kangax.github.io/es5-compat-table/es6/)で比較するとNightlyのほうが先行実装は進んでいるのでNightlyでアレコレします。
Canaryだと試したいシンタックス部分がまだ実装されていないので断念。
Canaryでデバッグしたい人はES6実装を有効にするフラグをたてる必要があるので、
`chrome://flags`にアクセスして`#enable-javascript-harmony`でページを検索すると **JavaScript の試験運用機能を有効にする** という項目があるのでそれを有効にする。
あとはDevTool開いてConsoleでいつも通り試せます。FirefoxなのでScratchpadでやる。使い慣れてない…。

## `let`

`let`を使うことでスコープが考慮された変数宣言が可能になります。
まず、今までの`var`を使ったパターン。
（これだとそもそもlintで怒られますが、挙動のテストということで。）

```js
var x = 1;
if (true) {
  var x = 2;
  console.log('x is ' + x);
  // x is 2
}
console.log('x is ' + x);
// x is 2
```

このケースだと最初に宣言した`x`がif内で上書きされ、2回とも2が出力されます。ここで`let`を使ってみる。

```js
let x = 1;
if (true) {
  let x = 2;
  console.log('x is ' + x);
  // x is 2
}
console.log('x is ' + x);
// x is 1
```

期待通りの動きをしてくれます。`var`と`let`の複合はどうなるか。

```js
let x = 1;
if (true) {
  var x = 2;
  console.log('x is ' + x);
  // x is 2
}
console.log('x is ' + x);
// x is 2
```

`var`はスコープの外の`let`を上書いてしまうらしい。

```js
var x = 1;
if (true) {
  let x = 2;
  console.log('x is ' + x);
  // x is 2
}
console.log('x is ' + x);
// x is 1
```

こっちはスコープを守ってくれています。`var`の使用頻度えらく減る予感…。
あとはおなじみのスコープ形成無名関数も減るのでしょうか。
なんか[Firefoxの現在の実装は仕様とちょっと違うらしい](https://developer.mozilla.org/en/docs/Web/JavaScript/ECMAScript_6_support_in_Mozilla)。

## `const`

`const`もES6から追加される新しい変数宣言の方法で、定数値(constant value)を宣言する時に使用します。
`const`を使って宣言された変数には値を代入できなくなります。

```js
const PI = 3.14;
PI = 3;
console.log('PI is ' + PI);
// PI is 3.14
```

こういうのものOKです。

```js
var x = 3;
var y = 0.14;
const PI = x + y;
PI = 3;
console.log('PI is ' + PI);
// PI is 3.14
```

`use strict`をつけてstrictモードになっている場合は、`PI = 3;`の部分で例外が発生します。
ちなみにこれはtry/catchでも捕捉出来なかった(?)。

```js
"use strict";
const PI = 3.14;
PI = 3;
// TypeError: PI is read-only
console.log(PI);
// ここまで来ない
```

## 関数のアロー記法

関数を、`function`の代わりに`=>`を使って表現可能になったアレです。CoffeeScriptを連想しますね。

```js
const square = function(x) {
  return x * x;
};
const multiply = function(x, y) {
  return x * y;
}
console.log(square(2));
// 4
console.log(multiply(3, 4));
// 12
```

これをアロー記法で書くと

```js
const square = x => {
  return x * x;
};
const multiply = (x, y) => {
  return x * y;
}
console.log(square(2));
// 4
console.log(multiply(3, 4));
// 12
```

関数のとる引数がひとつの場合は括弧を省略出来ます。
**`function`というキーワードを除いて、引数の括弧の後ろに`=>`をつける** という覚え方でしょうか。
あとはイベントのコールバックにも書いたり出来そうです。

```js
document.addEventListener('DOMContentLoaded', e => {
  console.log(e);
});
// DOMContentLoaded {target: ...}
```

C#のラムダ式で妙に親しみがあるのでちょっと懐かしい。そしてJSで書けるのは嬉しい。

## Generatorsとfor ofループ

Generator Functionは実行された後も実行状態を保持し、イテレータとして使用します。
[フィボナッチ数列](http://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%9C%E3%83%8A%E3%83%83%E3%83%81%E6%95%B0)を例に説明します。

```js
const fibonacci = function* () {
  let prev = 0;
  let curr = 1;
  while (true) {
    prev = curr;
    curr = prev + curr;
    yield curr;
  }
};
// SyntaxError: missing ; before statement
```

が、SpiderMonkeyが`function*`シンタックスに綺麗に対応していない(?)ようで、実行出来なかった。仕方なく以下のように書いた。

```js
const fibonacci = function* () {
  var prev = 0;
  var curr = 1;
  var swap = null;
  while (true) {
    swap = curr;
    curr = prev + curr;
    prev = swap;
    yield curr;
  }
};
var seq = fibonacci();
console.log(seq.next()); // {value: 1, done: false}
console.log(seq.next()); // {value: 2, done: false}
console.log(seq.next()); // {value: 3, done: false}
console.log(seq.next()); // {value: 5, done: false}
console.log(seq.next()); // {value: 8, done: false}
```

実行するとイテレータオブジェクトを返却して、`next()`を実行すると値が列挙されていく。
これを配列のイテレーションをすることが可能なfor ofループと組み合わせてみる。

```js
for (var seq of fibonacci()) {
  if (seq > 1000) {
    break;
  }
  console.log(seq);
}
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
```

順番が逆になってしまいましたが、for ofで配列をイテレートすることが可能です。
今までやっていたfor in + Arrayの罠にハマることがなくなりますね。

```js
var array = [1, 10, 100, 1000, 10000];
for (var item of array) {
  console.log(item);
}
// 1, 10, 100, 1000, 10000
```

オブジェクトにはイテレータ関数が明示されていないので、そのままだとfor ofは使えません。
なので、イテレータ関数を挟んでfor ofに列挙させてみます。

```js
var data = {
  a: 10,
  b: 20,
  c: 30
};
const valueIterator = function* (object) {
  var keys = Object.keys(object);
  for(var i = 0, len = keys.length;i < len;i++) {
    yield object[keys[i]];
  }
};
for (var item of valueIterator(data)) {
  console.log(item);
}
// 10, 20, 30
```

## 所感

一番試したかったclassが未実装で書けませんでした（ただの糖衣構文ですが）。でも実装も色々と進んできているし、試すレベルでは色々と楽しめそうです。
ES6をES5にコンパイルしてくれる[google / traceur-compiler](https://github.com/google/traceur-compiler)とかもありますが、プロダクトで **「ES6をゴリゴリ使って後方互換にES5ソースを用意する」** みたいなことをするのはちょっとだけ早いかなとは思いました。
今日はここまでです。続き(?)はまた新年。