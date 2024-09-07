---
title: D3.jsでColor Pickerを作った
date: 2016-05-02
---

D3.jsの素振りをしていて、何か練習台になるものはと探していたら[A Simple Web Developer’s Guide To Color](https://www.smashingmagazine.com/2016/04/web-developer-guide-color/)で[Dribbble](https://dribbble.com/colors/)やら[Designspiration](http://designspiration.net/)にあるようなカラーピッカーが紹介されていたので、真似て[Color Picker](https://1000ch.github.io/color-picker/)を実装した。機能としては、予め用意してある色がパレットのように陳列されていて、クリックするとそのカラーコードをコピー出来るという単純なもの。ある程度整頓された色の中から選んで使いたいことは多々あったので、その個人的な問題はコレで解決できそう。

クリックでコピーできる機能については[clipboard.js](https://clipboardjs.com/)を使っているのでFlashに依存していない代わりに、`execCommand`がアレなSafariではコピーは機能しない。

## D3.js雑感

少ししか触っていないけど、以下雑感。

- D3.jsはデータに応じたDOM操作を担うライブラリでありデータビジュアライズ専用のライブラリではない
- 結果的にSVGとの相性が良いがそれはビジュアライゼーションでの話であって、HTMLにももちろん活用できる
- 提供しているAPIはjQueryに似ているが、[Selections](https://d3js.org/#selections)の概念は通じないものがある
- データに応じる柔軟なビジュアライゼーションをするべきであり、プログラム（アルゴリズム）力が要求される（普段のWebフロントエンド開発では使わない頭を使った気がする…）
- 作者や有志による[チュートリアル](http://ja.d3js.info/alignedleft/tutorials/d3/)や[D3.jsを使ったギャラリー](https://github.com/mbostock/d3/wiki/Gallery)がとても良く出来ている
- かなり綺麗に抽象化されたAPIだが、あくまでデータとDOMの仲介者。↑のようなのを描くにはSVGの知識もある程度必要

次のコードはコアAPIの簡単な使い方。

```javascript
const svg = d3.select('body')       // bodyを参照する
  .append('svg')                    // svgをappend()し、参照する
  .attr('width', '100vw')           // widthに100vwを指定する
  .attr('height', '100vh');         // heightに100vhを指定する

const rects = svg.selectAll('rect') // svg要素下のrectを参照するが、この時点では何もない
  .data([10, 20, 30, 40, 50])       // selectAll()によるセレクションに対してデータをバインドする
  .enter()                          // セレクションにバインドしたデータの数だけプレースホルダーを作る
  .append('rect')                   // プレースホルダーにrectをappend()する
  .attr('width', d => d)            // バインドしたデータのひとつひとつをwidthに指定する
  .attr('height', d => d)           // バインドしたデータのひとつひとつをheightに指定する
  .attr('x', (d, i) => 100 * i)     // 第2引数にはインデックスが返るので、これを使ってx座標は100ずつずらす
  .attr('y', 0)                     // y座標に0を指定し、上に揃える
  .attr('fill', d => `rgb(${d}, ${d * 2}, ${d * 3})`);
```

これで次のようなSVGが出力される。

```html
<svg width="100vw" height="100vh">
  <rect width="10" height="10" x="0" y="0" fill="rgb(10, 20, 30)"></rect>
  <rect width="20" height="20" x="100" y="0" fill="rgb(20, 40, 60)"></rect>
  <rect width="30" height="30" x="200" y="0" fill="rgb(30, 60, 90)"></rect>
  <rect width="40" height="40" x="300" y="0" fill="rgb(40, 80, 120)"></rect>
  <rect width="50" height="50" x="400" y="0" fill="rgb(50, 100, 150)"></rect>
</svg>
```

コアの使い方を覚えてからは、[Layouts](https://github.com/mbostock/d3/wiki/Layouts)というデータレイアウトの手段を見始めていて、これにはノード同士の物理シミュレーションを行う[Force](https://github.com/mbostock/d3/wiki/Force-Layout)やノード同士の階層構造を表現する[Pack](https://github.com/mbostock/d3/wiki/Pack-Layout)などが含まれている。これらが理解できてくるといよいよD3が本領発揮できそうだが、理系脳がだいぶ眠っているのでまずはリハビリから。
