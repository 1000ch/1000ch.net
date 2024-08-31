---
title: react-routerのハッシュリンクとスムーススクロール
date: 2017-06-11
---

# react-routerのハッシュリンクとスムーススクロール

React Router を使っているプロジェクトで、できれば「ハッシュリンクを踏んだ時に、対象位置までスクロールしたい」というのがあり、少し調べていた。そもそも React Router はハッシュリンクが正しく機能しないという不具合があったり、既に公開されているライブラリでは機能を満たせない、メンテナンスが不安、コードがアレ…等等、スクラッチで書くところから始まった。

## react-router-hashlink

[React Router の `<Link>` コンポーネント](https://reacttraining.com/react-router/web/api/Link) をラップして、ハッシュリンクに対応したのが [1000ch/react-router-hashlink](https://github.com/1000ch/react-router-hashlink) である。

```javascript
import { HashLink } from 'react-router-hashlink';

function render() {
  return (
    <ul>
      <li><HashLink to="/foo#bar">/foo#bar</HashLink></li>
      <li><HashLink to="/foo#bar" behavior="smooth">/foo#bar</HashLink></li>
      <li><HashLink to="/foo#bar" delay={500}>/foo#bar</HashLink></li>
    </ul>
  );
}
```

な感じで使う。`behavior` と `delay` を除き、React Router の `<Link>` コンポーネントを指定できると思ってもらえば良い。

## `Element.prototype.scrollIntoView()` と ScrollBehavior

内部的に `#bar` へは `document.getElementById('bar').scrollIntoView()` で移動しているが、この `Element.prototype.scrollIntoView()` 実行時などのスクロールの挙動を制御する仕様、 [ScrollBehavior](https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface) が新たに策定されつつある。ScrollBehavior の適用先としては MDN の [`Element.prototype.scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) にはあるが、CSSOM View Module の [6. Extensions to the Element Interface](https://drafts.csswg.org/cssom-view/#extension-to-the-element-interface) にはないようで、最終的にどうなるかは不明。全て CSS の [`scroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) に吸収される可能性も大いにある（この辺りの動向を突き止められていないので誰か知っていたら教えてください）。

## ScrollBehavior のポリフィル

この ScrollBehavior のポリフィルが [smooth scroll polyfill](http://iamdustan.com/smoothscroll/) で、これで `scrollIntoView({ behavior: 'smooth' })` とすると、その要素まで滑らかにスクロールしてくれる。

このポリフィルがよくできていて良いのだが、`polyfill()` 関数のはじめに次のような処理をしている。

```javascript
function polyfill() {
  if ('scrollBehavior' in document.documentElement.style) {
    return;
  }

  // ポリフィル処理
}
```

Chrome では [CSSStyleDeclaration](https://developer.mozilla.org/ja/docs/Web/API/CSSStyleDeclaration) に既に `scrollBehavior` が存在している状態なので、このポリフィルの恩恵を受けることができない。これは `delete` などで消すことも不能なので仕方なく、ネイティブ実装をポリフィルで上書きできるように [`override()` 関数を追加してプルリクエストを出した](https://github.com/iamdustan/smoothscroll/pull/69)。他の PR の状態を見るにあまり活発ではないようなので、しばらく [fork バージョン](https://github.com/1000ch/smoothscroll)を使おうと思う。

## ハッシュリンクでスムーススクロール

`<HashLink>` とポリフィル、諸々合わせると[ハッシュリンクへのスムーススクロールが実現できた](https://1000ch.github.io/react-router-hashlink-demo/)。まぁここまでせずともユーティリティ関数を作って凌げそうではあるが、なるべく Web 標準に準拠した形で実装したい気持ち。

`<HashLink>` コンポーネントに `delay` プロパティを用意したのは、ページ遷移を含むハッシュリンクの場合に、ページ遷移直後にすぐさまスムーススクロールするより、ファーストビューを視認させた上でスクロールを始めたいケースがある気がしたから。
