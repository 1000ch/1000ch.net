---
title: 続・レスポンシブなiframe
date: 2020-01-03
---

# 続・レスポンシブなiframe

縦横比を維持して親要素いっぱいに広がる `<iframe>` 要素の実現については、[レスポンシブな iframe](/posts/2017/responsive-iframe.html) で解決している。このブログでも、YouTube などの動画を埋め込むことがあるので、この方法を使って対処してきたが、いくつか改善したいポイントがあった。

1. `<iframe>` の親に、特定のクラスを付与した要素を必要とする
2. 縦横比に応じた `padding-top` を用意し、付け替えを必要とする

これを Web Components で実装して解決した。

## `<fluid-iframe>` 要素による単純化

[`<fluid-iframe>`](https://1000ch.github.io/fluid-iframe/) としてカスタム要素にして汎用化した。`npm install fluid-iframe` でもインストールできるが、直接 jsDeliver や unpkg などの CDN からモジュールスクリプトとしてインポートできる。あとは `customElements.define()` でカスタム要素として登録し、 `<iframe>` のように使うだけで良い。

```html
<fluid-iframe
  src="https://www.youtube.com/embed/EqNHSrHzSOU"
  title="Santa Tracker: Out Like A Light"
  aspect="16/9">
</fluid-iframe>

<script type="module">
import FluidIframe from 'https://unpkg.com/fluid-iframe';

customElements.define('fluid-iframe', FluidIframe);
</script>
```

`<iframe is="fluid-iframe">` のように、`<iframe>` 要素の拡張として `<iframe>` 要素をフォールバックとして動作させたかったが、要素を親子関係にしないとレスポンシブを実現できないため、断念した。
