---
title: カスタマイズ可能な <select> 要素
date: 2025-03-26
---

昨今の Web で「複数の選択肢から1つを選ぶ」というインターフェースは多用されているが、Web の黎明期から存在する `<select>` 要素と `<option>` 要素に柔軟性がない故に、Web 開発者は自前の実装を要求され続けており、そのカスタマイズ性は長らく課題視されてきた。様々な「Web 黎明期に誕生したが今日の Web の要求に合致しない仕様」があったが、中でも `<select>` 要素と `<option>` 要素は代表格だろう。

[Extensible Web](https://extensiblewebmanifesto.org/) の流れも受けて、開発者が再利用可能な Web の部品を作れるようにはじまった技術が Web Components であり、より現在の Web 需要に即した UI を検討するワーキンググループが W3C の [Open UI](https://open-ui.org/) である。これは [TechFeed Experts Night#26](/posts/2023/techfeed-experts-night-26/) の [2023 年の Web 開発のベースライン](https://1000ch.github.io/slides/web-development-baseline-2023/) でも触れている。

より柔軟な `<select>` 要素のアイデアは、[ネイティブの `<selectmenu>` 要素](https://web.dev/blog/state-of-css-2022?hl=ja#customizing_select_elements)にはじまり、[`<selectlist>` 要素に名前が変更](https://github.com/openui/open-ui/issues/773)された後に [Customizable Select Element](https://open-ui.org/components/customizableselect/) に着地し、ついにその実装が [Chrome では 135 から有効化される](https://groups.google.com/a/chromium.org/g/blink-dev/c/kN5LTzuTLVs/m/6HqTsmk3EQAJ?pli=1)ことになった。Chromium をベースにしているブラウザ郡は間もなくサポートされ、Mozilla と Apple も簡潔な仕様になったことで支持するようだ[^1][^2]。

<baseline-status featureId="customizable-select"></baseline-status>

[^1]: [Relax `<select>` parser · Issue #1086 · mozilla/standards-positions](https://github.com/mozilla/standards-positions/issues/1086)
[^2]: [Relax `<select>` parser · WebKit/standards-positions](https://github.com/WebKit/standards-positions/issues/414)

最新の仕様は [Updates to the customizable select API](https://una.im/select-updates/) で詳しく解説されているが、自分用の覚書として以下に残す。

## `<select>` 要素のカスタマイズ方法

ブラウザで UI として表示される `<select>` 要素および、クリック時に表示される `::picker(select)` 擬似要素に、 `appearance: base-select;` を付与することで、ブラウザがカスタマイズする `<select>` 要素であることを認識する。

```css
select,
::picker(select) {
  appearance: base-select;
}
```

個人的にはカスタマイズする `<select>` 要素であることを明示し既存の描画と区別する意図として理解できるが、これが[冗長であるというフィードバックもある](https://developer.chrome.com/blog/rfc-customizable-select-findings?hl=ja)。

カスタマイズする `<select>` 要素であることを宣言し、HTML を記述していく。`<select>` 要素内の `<button>` 要素が「ピッカーを表示していない時」と「ピッカーを表示している時」の境界となり、ある程度自由に `<option>` 要素をスタイリングできる。

<iframe scrolling="no" title="Customizable Select Element Demo" src="https://codepen.io/1000ch/embed/ZYEjMdL?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/1000ch/pen/ZYEjMdL">
  Customizable Select Element Demo</a> by 1000ch (<a href="https://codepen.io/1000ch">@1000ch</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

カスタマイズする `<select>` 要素の制限として、`<option>` 要素を除く `<button>` 要素や `<input>` 要素といったインタラクティブな要素を含むことができず、現在は `<div>` 要素・`<span>` 要素・`<option>` 要素・`<optgroup>` 要素・`<img>` 要素・`<svg>` 要素・`<hr>` 要素が許可されている[^3]。

[^3]: [デベロッパー フィードバックのリクエスト: カスタマイズ可能な選択](https://developer.chrome.com/blog/rfc-customizable-select?hl=ja)

### `selectedcontent`

選択されている要素を参照する [`<selectedcontent>` 要素](https://github.com/mozilla/standards-positions/issues/1142)。デモでは `<option>` 要素内の画像を非表示にしている。

### `select::picker-icon`

`<select>` 要素の右側に表示される擬似要素。デモでは絵文字 👇 を表示している。

### `select:open`

ピッカーを表示している状態の `<select>` 要素を参照する擬似セレクタ。デモでは背景色を変更している。

### `option::checkmark`

選択中の `<option>` 要素に付随する擬似要素。デモでは `<option>` 要素の `data-type` 属性を表示している。

### `option:checked`

選択中の `<option>` 要素を参照する擬似セレクタ。デモでは背景色を変更している。

## おまけ

<iframe scrolling="no" title="Pokemons with &lt;select&gt; Element" src="https://codepen.io/1000ch/embed/RNwBqRa?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/1000ch/pen/RNwBqRa">
  Pokemons with &lt;select&gt; Element</a> by 1000ch (<a href="https://codepen.io/1000ch">@1000ch</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
