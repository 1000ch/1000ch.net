---
title: Zepto.js ver1.0がリリースされた
date: 2013-03-05
---

v1.0rcが11ヶ月間も続いていたが、ようやくRelease Candidateではなくなり正式リリースとなった。

- [http://zeptojs.com/](http://zeptojs.com/)
- [https://github.com/madrobby/zepto](https://github.com/madrobby/zepto)

## おさらい

おさらいすると、Zepto.jsはjQueryとAPIの互換性があるモダンブラウザ向け軽量ライブラリ。
jQueryはIE対応とか$.AnimationとかDeferredとかあるけど、その辺りを除いて実装してあるようなイメージ。現状、iOSやSafariにはIE対応とか必要ない訳で、これ使うとファイルサイズ落とせますねっていうコンセプトで作られている。

## ビルドについて

### rakeファイルがいつの間にか消えてる！

Zeptoは[カスタムビルド](https://github.com/madrobby/zepto#building)が出来るようになっていて、欲しい実装のみを選んで使える。rcの頃はrakeファイルがあった気がしたんだけど、今はmake経由でビルドするようだ。

### [Zepto modules](https://github.com/madrobby/zepto#zepto-modules)

モジュール一覧を引用して少し解説する。★がついているのはノーマルビルドに含まれるもの。

- polyfill★ - iOS3.x向けのString#trimとArray#reduceの実装。要らないと思う。
- zepto★ - Coreモジュール。これはないと話にならない。
- event★ - `on()`とか`off()`とか、イベント周りの実装。
- detect★ - UserAgentの判定の実装。必要に応じて。
- fx★ - アニメーションを実現する`animate()`の実装。
- fx_methods - `animate()`を使った`show()`や`hide()`などの実装。fx依存。
- ajax★ - 非同期通信(XMLHttpRequest)の実装。
- form★ - form要素の値からQueryStringを作ってくれたりsubmitしてくれるあたり。
- assets - iOSのimgのmemory対策用モジュール。コアの`remove()`のオーバーライド。
- data - ノードの`data-`へのアクセスではなくメモリベースで情報を格納する機構。コアの`data()`のオーバーライド。
- selector - jQueryの拡張CSSセレクタ(`:first`とか`:visible`とか)の実装。
- touch - タッチデバイスでの`swipe`や`tap`などのイベントの実装。
- gesture - タッチデバイスでの`pinch`イベントの実装。
- stack - `andSelf()`と`end()`の実装。

polyfillは要らないケースが多いし、detectもfxも必要に応じて入れればいいので、まずは少ない構成で試してみては如何だろう。

## 更新履歴の気になるあたり

- 「 **Twitter Bootstrapに対応！** 」
- 「node.jsベースのビルドになったよ。」
- 「PhantomJSとTravis CIによる自動テストになった。」
- 「touchモジュールをデフォルトビルドから外した。」
- 「 **バグがいっぱい直った** 」.｡ﾟ+.(･∀･)ﾟ+.ﾟｲｲ!!
- 「Ajaxで`{cache: false}`をサポート」
- 「`each()`のコールバック中でfalseが返されるとループを止めるようにした。」

Ajaxの`{cache: false}`は同じリクエストで結果がキャッシュされる話だと思うが、対応策としてダミーでDate.now()を付与してる。ちなみにjQueryだと長さを気にしてidをインクリメントして付与してる。やってることは同じ。`each()`中のreturn falseはjQueryの仕様に合わせたといったところだろう。

## 所感

何はともあれrcがとれるのは嬉しい。

DOMのラッパーライブラリは他にも色々あるが、実績ある分Zeptoは比較的安心できる。再設計・軽量化を謳ったjQuery2.0もrcですがuncompressedで8000行くらいあったので、Zeptoまで軽くなることは、ひとまずなさそう。軽さの話が出たところで、改めて以下のことを提言。

> 負荷をかけるべきはネットワークではなくハードウェア

で、あるべきと。

4Gなどでネットワークも速くなってきているとは言え、環境に影響される。それに比べてハードウェアの進化は格段に早い上に安定している。ファイルサイズが減れば、自ずと端末にキャッシュされるサイズも、JavaScriptをパースする時間も、ブラウザメモリも削減できる。
