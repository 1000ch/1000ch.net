---
layout: post
title: ダークモードの再実装と日本語のフレーズ改行
date: 2024-03-28
---

# ダークモードの再実装と日本語のフレーズ改行

このブログでもダークモードを [`prefers-color-scheme` を使って Dark Mode に対応](/posts/2019/dark-mode.html) していたが、諸々の実装を見直すタイミングで削除してあった。今回は、デフォルトでシステムの設定を参照するようにし、ダークモードを優先したい場合はページ上部にあるチェックボックスを on にすると有効化される。

そのトグル UI の実装は、何の変哲もない `<input type="checkbox>` かと思いきや、実は `<input type="checkbox" switch>` という新しい仕様で実装している。 [`switch` 属性は長らく GitHub での議論されているが](https://github.com/whatwg/html/issues/4180)、[Safari Technology Preview 185](https://www.webkit.org/blog/14885/release-notes-for-safari-technology-preview-185/) での実装を経て [Safari 17.4](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/) に ship された。

<iframe loading="lazy" scrolling="no" title="&lt;input type=&quot;checkbox&quot; switch&gt;" src="https://codepen.io/1000ch/embed/abxyeJB?default-tab=html%2Cresult" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/1000ch/pen/abxyeJB">
  &lt;input type=&quot;checkbox&quot; switch&gt;</a> by 1000ch (<a href="https://codepen.io/1000ch">@1000ch</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

また [CSS に 4 つの新しい国際化機能が導入された](https://developer.chrome.com/blog/css-i18n-features?hl=ja)。このブログでも英数字と日本語の混在を意識して半角スペースを含めたテキストにしているが、 `text-autospace` プロパティと `text-spacing-trim` プロパティによってタイポグラフィは改善される。それぞれのプロパティのデフォルトの挙動が改善されるので、実装を待つのみだが、もう1つ注目しているのが `word-break: auto-phrase;` である。

日本語や中国語といった言語は単語をスペースで区切らず、 `word-break` プロパティや `overflow-wrap` プロパティの値に応じて単語そのものが改行され、読みづらさを招く場合がある。`auto-phrase` 値は、日本語においては文節で改行することで可読性を改善してくれる。

このブログでも全般的に適用したが、改行位置が各行の日本語文章に依存するため、ブロック要素の右端で改行されずレイアウト上の違和感が残る。これはパラグラフの改行位置でレイアウトのリズムを揃えるのではなく、そのブロック要素そのものの UI を改善するべきだとは思うが、ひとまずダークモードと同様にオプトインで設定できるようにした。
