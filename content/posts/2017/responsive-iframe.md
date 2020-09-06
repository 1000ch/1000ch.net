---
layout: post
title: レスポンシブなiframe
date: 2017-11-22
---

# レスポンシブなiframe

当ブログのようなシングルカラムレイアウトに、外部のコンテンツを `<iframe>` 要素で埋め込む場合、要素の横幅を 100% にして親要素の幅いっぱいに広げたいが、その時に縦横比を維持して縦幅を追従させる場合に工夫が必要である。

## デフォルトの埋め込みコード

YouTube などの動画コンテンツを `<iframe>` 要素でエンベッドする場合、次のようなものが用意される。

```html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/gTHAn-nkQnI"
  frameborder="0"
  allowfullscreen>
</iframe>
```

横幅 560px、縦幅 315px で配置されるので、モバイルデバイスで閲覧すると横スクロールができてしまう。これを 16:9 の縦横比を維持しつつ横幅を親要素一杯まで広げたい。

`<iframe>` 要素そのものをレスポンシブにするには「`<iframe>` 要素の横幅を親要素まで満たしたい」「親要素の縦幅がテキストなどに依存するので不定である」という制約がある。CSS の `width` と `height` プロパティに [`max-content`](https://www.w3.org/TR/css-sizing-3/#max-content-constraint) を指定しても、`<iframe>` 要素のサイズが読み込みページに依存してしまう。

## 16:9な親要素を用意して子要素で満たす

タイトルの通り、任意の縦横比の親要素を用意して `<iframe>` 要素をその中に縦横一杯に満たすのが解のようだ。

キモとなるのは親要素の高さの取り方で、素直に `height` プロパティで指定しようとすると先に述べた通り親要素に対するパーセンテージになってしまうので、`padding-top` を指定することで高さを確保している。横幅は親要素いっぱいにするので、100% で問題ない。

```css
.YouTube {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.YouTube iframe {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
```

親要素を用意せず `<iframe>` 要素に対して `padding-top` を指定しても、読み込んでいるコンテンツに対してパディングが用意されるだけである。

あとは、埋め込みコードで指定されていた `width` 属性と `height` 属性を取り除けば、期待通りに動いてくれた。

```html
<div class="YouTube">
  <iframe 
    src="https://www.youtube.com/embed/gTHAn-nkQnI"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```
