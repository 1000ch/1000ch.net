---
layout: post
title: ソーシャルボタンのWeb Components
date: 2016-06-15
---

# ソーシャルボタンのWeb Components

世間では久しく聞かなくなったWeb Componentsの話題だが、各種スペックのアップデートは着々と行われている。そんな中、昔作った[`<social-button>`](https://1000ch.github.io/social-button/)というTwitter・Facebook・Google+のソーシャルボタンのWeb Components実装のShadow DOM部分を、[アップデートした](https://github.com/1000ch/social-button/commit/e7764ca88168aa94f491282f1c4500594467991a)。

## トランスパイル無しでES2015

[ES2015のclass構文で書くWeb Components](/posts/2016/web-components-es2015-class.html)でも書いているように、`class`シンタックスを使ってリライトしている。ES2015のブラウザサポートも、Safari TPが100%、Chromeがtail call optimisation以外、FirefoxとEdgeも頑張っているのでそろそろ良かろうということで、トランスパイルなしで書くようになってきている（バベるの面倒）。

世間では阿鼻叫喚のWindows 10への強制アップデートを僕は密かに応援していて、アレが進めば進むほどIEがいなくなってくれるので、Microsoftさん頑張ってくれないかなぁと思っている。アップデートを嫌がるエンプラ業界やら世間一般の人、どうしたら説得されてくれるんでしょう。Chrome・Firefox・Safari・Edgeのブラウザ群雄割拠時代になればもっとWebは良くなる気もするので、どうにかなって欲しい。

## Web Componentsのアップデート関連

Shadow DOM周りは実装されているが、Custom Elementsに関しては実験的実装にすら至っていないようで、`document.registerElement()`のままである。Web Componentsに関しては、もうちょっとスペックと実装が揃ったらまとめなおそうかと思う。

それだけ。
