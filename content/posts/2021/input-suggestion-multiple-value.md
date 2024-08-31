---
title: フォームに複数の値を入力するときの入力補完
date: 2021-03-14
---

# フォームに複数の値を入力するときの入力補完

`<input type="text">` の入力補完は `<datalist>` 要素と組み合わせることで簡単に実現できる。ただし、これは単一の値に対する補完で、複数の値を入力しようとしたときに適用されない。というのも、ブラウザとしては `<input>` 要素の `value` プロパティをひとつの値として扱い、それを `<datalist>` 要素の入力候補と比較しているため、当たり前といえば当たり前である。つまり `<input>` 要素に複数の値を保持するという概念がそもそもない。

次のデモは `<input type="text">` と `<datalist>` 要素を組み合わせた挙動である。 [`<input>` 要素の `list` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#htmlattrdeflist)に、[`<datalist>` 要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/datalist)の `id` 属性の値を指定している。

<iframe loading="lazy" scrolling="no" title="&lt;input type=&quot;text&quot;&gt; and &lt;datalist&gt;" src="https://codepen.io/1000ch/embed/PobLZGV?theme-id=light&default-tab=html,result" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/1000ch/pen/PobLZGV'>&lt;input type=&quot;text&quot;&gt; and &lt;datalist&gt;</a> by 1000ch
  (<a href='https://codepen.io/1000ch'>@1000ch</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

今回やりたいのは、ひとつの `<input>` 要素に対して、何らかの区切り文字を含めて複数の値を入力するようなユースケースである。これを実現しているのは [jQuery UI の Autocomplete](https://jqueryui.com/autocomplete/#multiple) だが、ライブラリを用いず HTML だけで再現したい。

色々調べていると、 `<input>` 要素の中でも `<input type="email">` は特殊なようで[^1]、 `multiple` 属性と組み合わせることで、期待している挙動を実現できた。次のデモではカンマ (`,`) を区切り文字として、複数の値に対して `<datalist>` 要素による入力補完を受けられる。

[^1]: `<input type="email" multiple>` と `<datalist>` の組み合わせは、[MDN でも解説されている](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/email)。

<iframe loading="lazy" scrolling="no" title="&lt;input type=&quot;email&quot; multiple&gt; and &lt;datalist&gt;" src="https://codepen.io/1000ch/embed/mdOvoVw?theme-id=light&default-tab=html,result" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/1000ch/pen/mdOvoVw'>&lt;input type=&quot;email&quot; multiple&gt; and &lt;datalist&gt;</a> by 1000ch
  (<a href='https://codepen.io/1000ch'>@1000ch</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

当然ながら `<input type="email">` を使って実装するのは不適切で、本来であれば `<input type="text" multiple>` と `<datalist>` でマークアップされるべきである。複数の値という点では `multiple` 属性を付与するのは適切そうで、 `<input type="email">` ではカンマが使われていたが `<input type="text">` などにも適用させる場合は `delimiter` 属性のようなもので区切り文字の指定ができるべきかもしれない。

仕様としては [whatwg の 4.10.5.3.9 The list attribute](https://html.spec.whatwg.org/multipage/input.html#the-list-attribute) に定義されており、やはり Email 固有の挙動として明記されている。この複数要素に対する入力補完を `<input type="text">` を含めた他のフォームに対しても有効化できると良さそうに思ったら、既に issue に挙がっていたので、議論や実装が進んでくれると嬉しい[^2]。

[^2]: [Multiple Selections from Datalist · Issue #4979 · whatwg/html](https://github.com/whatwg/html/issues/4979)
