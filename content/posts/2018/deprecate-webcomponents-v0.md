---
layout: post
title: R.I.P. Web Components v0
date: 2018-07-30
---

# R.I.P. Web Components v0

blink から Web Components v0 を deprecate and remove する intent が作成された。

> [Intent to Deprecate and Remove: Shadow DOM V0, Custom Elements V0, HTML Imports](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/h-JwMiPUnuU)

オチはないがツラツラと振り返ってみる。

## Web Components v0 の変遷

Shadow DOM v0、Custom Elements v0、HTML Imports が初めて Chromium に実装されたのが 2014 年なので、そこから早 4 年が経つ（アイデアに至っては 2011 年まで遡り、[Alex Russell 先生が Fronteers Conference 2011 で最初のコンセプトを発表している](https://fronteers.nl/congres/2011/sessions/web-components-and-model-driven-views-alex-russell)）。この **v0** に分類される API は、[`<template>` 要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/template) を除き、他のブラウザベンダーの合意を得られず、安定 API としてリリースされることなく終わった。

Shadow DOM と Custom Elements は API のデザイン変更のステップと捉えることもできるが、HTML Imports は Firefox が ES Modules の存在を理由に反対の姿勢を示していた。2014 年に実装を見送り、2015 年に改めて ES Modules を待つ姿勢を示している。

- [Mozilla and Web Components: Update – Mozilla Hacks](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/)
- [The state of Web Components – Mozilla Hacks](https://hacks.mozilla.org/2015/06/the-state-of-web-components/)

そして、この [ES Modules のブラウザ実装](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)がモジュール化された Web Components を取り扱う方法としてそのまま採用されている。HTML Imports は外部の HTML ドキュメントをロードできるので、その中で HTML・CSS・JavaScript を扱うことができた。ES Modules は外部の JavaScript をロードするので、Web Components なコンポーネントを構成する HTML や CSS を JavaScript に文字列として記述することになる。これは Vue.js の Single File Component と、React の Component の関係によく似ている。

HTML Imports の凋落にしても Shadow DOM + Custom Elements にしても、当初のアイデアにあった「宣言的 (declarative) にやる」という点を達成できていない。Vue.js の Single File Component にしてもビルドが前提なので、コンパイルなどの中間処理を挟めば ES Modules を使ってエミュレートできると思うが、それでは Web 標準技術で達成したとは恐らく言い難い。

Web 開発者の誰かがきっと望んでいる世界観をわかりやすくいうと `<element id="foo-button">` で要素を宣言し、内包する要素が Shadow DOM に挿入されて `<foo-button>` を構成し、記述された `foo-button.html` をロードすればそれが使える。というモノだろう。ちなみにこれらのアイデアはどれも既に議論済のもので、様々な経緯で見送られている。そして再び、近いアイデアが色んな所で生まれているのを見かける。

- [ebidel/declarative-web-components: Author web components, declaratively](https://github.com/ebidel/declarative-web-components)
- [webcomponents/Declarative-Custom-Elements-Strawman.md at gh-pages · w3c/webcomponents](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Custom-Elements-Strawman.md)

## Web Components v1 の変遷

一方で、ブラウザベンダーの合意を経てデザインされた Shadow DOM v1、Custom Elements v1 といった **v1** に分類される API も、Chromium の実装が先行した。それぞれの intent が `2015/09/15` と `2016/03/15` なので、2016 年の中期には安定版 Chrome に実装されていたと推測できる。

- [Intent to Implement: Shadow DOM v1](https://groups.google.com/a/chromium.org/d/msg/blink-dev/Ez2cuT0KmQo/eUpSsU-uAgAJ)
- [Intent to implement: Custom Elements v1](https://groups.google.com/a/chromium.org/d/msg/blink-dev/EDxhDZ-bPkQ/WEFFoWC9BQAJ)

他のブラウザはと言うと、2016 年に Safari (WebKit) が続いている。iOS 10 に同梱された Safari 10 からフラグなしで使えるようになっており、そこから iOS のメジャーアップデートを含む約2年を経て、シェアも充分になりつつある。Dev Fest 2016 の [Web Components 2016 & Polymer v2](https://1000ch.github.io/slide/webcomponents-2016/) でも言及しているが、モバイルブラウザのシェアを Chrome を分かつ Safari が実装した意義は大きく、今や[モバイル Web で Web Components をポリフィルなしで投入することも難しくない](/posts/2018/webcomponents-in-production.html)（Web Components そのものの使い勝手という意味では別の課題があり、言いたいことは色々と　ある）。

- [Introducing Safari Technology Preview](https://webkit.org/blog/6017/introducing-safari-technology-preview/)
- [Release Notes for Safari Technology Preview 14](https://webkit.org/blog/6969/release-notes-for-safari-technology-preview-release-14/)

Firefox については長らく開発が続いていたものの ship に至らずという状態だったが、2018 年にようやく安定版で有効化される目処が立ち、何事もなければ [`2018/09/05` にリリースされる Firefox 62](https://wiki.mozilla.org/Release_Management/Calendar) で使えるようになるはずである（Custom Elements v1 は Firefox 59 で既に有効化されている）。

- [Bug 1406825 Enable Custom elements v1 on Nightly by default](https://bugzilla.mozilla.org/show_bug.cgi?id=1406825)
- [Bug 1460069 enable Shadow DOM in Nightly](https://bugzilla.mozilla.org/show_bug.cgi?id=1460069)

残念ながら、まだ Edge には実装されてない。Developer Feedback の他の機能と比べても高得票数だが、まだ投票していない人は念の為(?)投票して欲しい。モバイルでのシェアを獲得していくことは今の所考えにくいが、Internet Explorer 11 を代替するモダンブラウザとしては実装が進んでいて欲しいところ。

- [Shadow DOM (unprefixed) – Welcome to the Windows developer feedback site!](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263785-shadow-dom-unprefixed)
- [Custom Elements – Welcome to the Windows developer feedback site!](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6261298-custom-elements)

Web Components v0 より R.I.P. して欲しい IE 11 は、どうやら 2025 年あたりまでサポートされてしまうようだが、[StatCounter での IE11 のシェア減少](http://gs.statcounter.com/browser-market-share/desktop/japan/#monthly-201706-201806)を見ている限りはシェア的に無視できる日の方が近そうに思える。Microsoft 的にも Edge に移行して欲しいのは山々だろうし、東京オリンピックが開催される 2020 年あたりを目処に何とかなって欲しいものである。
