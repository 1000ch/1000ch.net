---
layout: post
title: inputやtextareaの入力補助
date: 2015-06-22
---

# inputやtextareaの入力補助

`<input>`の入力補助には`<datalist>`を使ったものがある。補助候補を`<datalist>`と`<option>`を使って定義し、そのIDを適用先の`<input>`の`list`属性に付与する。以下サンプル。

<p data-height="240" data-theme-id="0" data-slug-hash="ZGJVJL" data-default-tab="result" data-user="1000ch" class="codepen">See the Pen <a href="http://codepen.io/1000ch/pen/ZGJVJL/">Input suggestion using datalist</a> by 1000ch (<a href="http://codepen.io/1000ch">@1000ch</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Chromeだと領域の右端に▼が表示されているし、候補のドロップダウンやその▼はまさにブラウザネイティブのUIといった感じだが、どうもスタイリングが出来ない。古いという意味で信頼性に欠けるが[Relevant Dropdowns: Polyfill for Datalist](https://css-tricks.com/relevant-dropdowns-polyfill-for-datalist/)にも不可能っぽいことが書いてある。Shadow DOMだろうからインスペクタ使ってセレクタを調べようとしたけど、フォーカスアウトするとダメで断念した。

これらに加えて、[テキストエリアでは機能しない](http://www.w3.org/TR/html5/forms.html#the-datalist-element)。僕はテキストエリアでサジェストされて欲しいんです。

## input-suggest

jQueryプラグインだとチラホラ見かけるけど、jQueryナシが良いし、自分の勉強も兼ねて[実装してみた](https://github.com/1000ch/input-suggest)。`InputSuggest`コンストラクタに`<textarea>`要素・`<input type="text">`要素、ないしそれらを参照するセレクタを渡すと実行される。また、ポップアップはそのままだとスタイルが当たっていないので各自でCSSを書いてもらう必要がある。

<p data-height="480" data-theme-id="0" data-slug-hash="EjwOaz" data-default-tab="result" data-user="1000ch" class="codepen">See the Pen <a href="http://codepen.io/1000ch/pen/EjwOaz/">Input suggestion using input-suggest</a> by 1000ch (<a href='http://codepen.io/1000ch'>@1000ch</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

`<datalist>`を`<textarea>`でも機能させるというコンセプトにしようかとも考えたが、定義されてもいないポリフィルを実装するような感覚に陥りそうだったのでやめた。
