---
layout: post
title: Google I/O 2012発 JavaScript高速化テクニックの日本語訳と考察
date: 2013-1-4
description: Google I/O 2012で発表されたJavaScriptの高速化のテクニックについて考察してみます。
---

# Google I/O 2012発 JavaScript高速化テクニックの日本語訳と考察

+ [13 JavaScript Performance Tips](http://www.jonefox.com/blog/2012/07/10/13-javascript-performance-tips/)
+ [Google I/O 2012発 JavaScript高速化Tips集の日本語訳](http://tech.a-listers.jp/2012/07/13/13-javascript-performance-tips/)

Google I/O 2012で発表されたJavaScriptの高速化のテクニックについて考察してみます。
基本的なテクニックの他、JavaScriptエンジンの挙動に対する最適化もあります。
主観と憶測が含まれますので、ご指摘等お願い致します。
**「v8におけるのJavaScriptの最適化」** における話です。

## [Be Prepared - Hidden Classes](http://www.youtube.com/watch?v=UJPdhx5zTaw&t=10m30s)

### 1.オブジェクトメンバはコンストラクタですべて初期化する

### 2.オブジェクトメンバを常に同じ順序で初期化する

クラスはhidden classという形でキャッシュされます。
よって、初期化するメンバがまちまちだったり、違う順序で初期化されると
キャッシュを利用出来ず、新しいキャッシュを作成しなければいけません。

## [Be Prepared - Numbers](http://www.youtube.com/watch?v=UJPdhx5zTaw&t=15m30s)

### 3.可能な限り31bit符号付き整数を使う

v8がコンパイルするときに、変数に対して分類のためにタグ付けをするらしくて
31-bit signed integerだと参照される順番が速いそうな。
変数の判断が、まず31-bit signed integerかどうかを見て、
次にdoubleかどうか、それでもなかったらobjectである。というロジックのようです。

## [Be Prepared - Arrays](http://www.youtube.com/watch?v=UJPdhx5zTaw&t=17m25s)

### 4.配列のキーに0から始まる連続する値を使う

この辺りは理解に苦しんだので、アメリカ人の同僚に聴いてもらって解説もらいました。
0~をキーとする配列は配列として扱われるけど、以下のようなケースは
連想配列（というかオブジェクト）として扱われて、低速になるよという話。

```js
var array1 = new Array();
array[25000] = 123;
//0~24999 is empty

//[xxxxxxxxxxxxxxxxxxxxxxxxxxx_____]これは配列として扱われる
//[xxxxxx__________________________]これはオブジェクトとして扱われる
//らしい。「配列が満たされているかどうか」が重要らしい。まばらな配列も駄目。
```

真偽の程を@cssradarさんに詳しく聞きたい。

### 5.要素数が64000個を超える配列がある場合、予め用意するのではなく必要に応じて都度追加する

初期化時に大きなメモリを確保するなということで、単にメモリの圧迫の問題でしょうか。
64000個というのは滅多になさそうなのでさておき、個人的には1000個とかでも多いと感じます。
仕様や構造の見直しも検討してみるのもアプローチのひとつとしてあってもいいかと。

### 6.配列の要素を削除しない。（数字の配列の場合は特に。）

##[Be Prepared - Full Compiler](http://www.youtube.com/watch?v=UJPdhx5zTaw&t=26m35s)

### 7.初期化されていない要素や削除されている要素をロードしない。

展開されているメモリ上にないものを参照すると
undefinedを返すはずなので、多少イレギュラーなロジックっていうことかな。
内部的に例外が発生する可能性も考えられます。

### 8.要素数が少なく、固定数の配列の初期化には、配列リテラルを使う

```js
var array1 = new Array();
array1.push("static value1");
array1.push("static value2");
array1.push("static value3");

var array2 = ["static value1", "static value2", "static value3"];
```

配列リテラルを使う方が、初期化時に配列サイズが決定する点と、
生成された配列を変更しないので単純に速度も速いと思われます。

### 9.小さな配列の場合は、予めそのサイズの領域を確保しておく

```
var array1 = new Array();
array1.push("value1");
array1.push("value2");
array1.push("value3");

var array2 = new Array(3);
array2[0] = "value1";
array2[1] = "value2";
array2[2] = "value3";
```

最初に確保しておいた方がメモリブロックが繋がるような気がしますね。
なので、参照も高速になると思われます。
前述しましたが、大きい配列の場合はご注意を。

### 10.数字の配列の中に、数字以外の値を格納しない

```js
var array1 = [1, 2, 3, 4, 5];
var array2 = [1, 2, 3, "4", 5];
var array3 = [1, 2, "Three", 4, 5];
```

恐らく、array2もarray3も最適化されないケースでしょう。
array3は言う迄もなく、array2も"4"はオブジェクトとして扱われてしまうためです。

### 11.出来る限り関数の動きが単一になるようにする。

前述のHidden Classが常に単一になるため、高速になります。
常に同様の挙動をするような使い方をしましょう。みたいなことを言ってる。

```js
function add(x, y) {
	return x + y;
}
add(1, 2);	//ok:これはモノモフィックな挙動になる
add("1", "2");	//ng:これはポリモフィックになってしまう
```

### 12.try/catchリテラルを使用しない

どの言語でも大体そうですが、例外のキャッチとスローは重い処理です。

### 13.クラスの作成後にそのクラスの構造を変えない

メモリの再配置が必要になりそう。そもそもバグの原因になりそう。
コンパイルしてキャッシュ後に変えるのはそもそも無茶するイメージですよね。
JavaScriptはプロパティの追加等が簡単に出来てしまいますが、
例えばJavaならば、それは出来ないわけで。
Javaから連想すれば如何に無理矢理行うかが想像出来ると思います。

## まとめ

キャッシュを重要視したアプローチですね。
キャッシュからの適用が出来ない場合は、再発行します。
ベストなパフォーマンスを出すためにはキャッシュを念頭において実装した方が良さそうです。
あと、全体的にintは最適化されるようです。なので定数等もintで定義した方が良いと言えるでしょう。