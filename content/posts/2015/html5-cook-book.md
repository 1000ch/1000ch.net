---
layout: post
title: HTML5クックブック
date: 2015-01-22
---

# HTML5クックブック

読みなおした。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/yN3B56hp8F/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">バズワード</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by 1000ch (@1000ch) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2015-01-24T00:27:43+00:00">Jan 23, 2015 at 4:27pm PST</time></p></div></blockquote>

## バズワードとしてのHTML5とリビングスタンダード

[HTML5の草案が発表された](http://www.w3.org/2008/02/html5-pressrelease.html.ja)のが、ちょうど7年前の2008年の1月22日。そして、2014年10月28日に[勧告された](http://www.w3.org/2014/10/html5-rec.html.ja)のも記憶に新しい。段階的に対応してきたブラウザベンダーも、最新版ではすっかり対応がされている。

色んな尾ひれを生やして急速に広まった印象があるHTML5だが、どこからどこまでがHTML5なのか認識が人によって曖昧なところがある中で、この本では次の内容を取り扱っている。

### 目次

1. **基本的な構文とセマンティクス**
2. **プログレッシブなマークアップとテクニック**
3. **フォーム**
4. **ネイティブオーディオ**
5. **ネイティブビデオ**
6. **マークロデータとカスタムデータ**
7. **アクセシビリティ**
8. **位置情報**
9. **`<canvas>`要素**
10. **高度なHTML5 JavaScript** - ローカルストレージ・Web Worker等の新たなブラウザAPI群について

5回目の改定ということでHTML5だけど、そういった括りも、段々とバージョン（エディション）を意識しないようになってきているなと思う。HTMLの仕様はHTML5として捉えるべきではなく、あくまでHTMLとして捉えるべき。HTMLの仕様は常に更新される。

## HTML5におけるマークアップ

8章の位置情報、9章の`<canvas>`要素、10章のAPI群に加えて各所にJavaScriptからの取り扱いの解説が散りばめられているが、個人的にはHTMLに追加されたマークアップとしての機能が印象的だった。

ブラウザの対応状況見てると改めてIE8以前の辛さを感じる。もちろん、バージョンを明確に分けて後方互換性を保ってきた故のことだけど。[先日新ブラウザの発表もあった](http://www.itmedia.co.jp/news/articles/1501/22/news047.html)ので、流れは少しずつ変わってくるとは思うが、それでもエンタープライズ等での対応を考えたりすると、未だに足枷になっていることと思う。こういった対応していないブラウザへのフォールバックについても、本書では触れている。[normalize.css](https://github.com/necolas/normalize.css)と[Modernizr](https://github.com/Modernizr/Modernizr)の偉大さたるや。

`<input>`要素に追加された新たな`type`についてだったり、フォームの必須属性は`required`としたり、`hidden`とか`<details>` + `<summary>`だったり。JavaScriptでコントロールすることが開発する中で当たり前になってしまっているので、HTMLレベルで実現される振る舞いについては知らないことばかりであった。

アクセシビリティの章もあるが、本来こういった属性を適切に指定したり、ドキュメント構造を意識すべきなんだと思う。「開発者同志で齟齬が出るくらいなら全部`<div>`で！」という意見もおおよそ同意な部分もあるけど、適切に実施出来るならやっておくに越したことはないのも間違いなさそう。

<div class="Media Media--affiliate">
  <img class="Media__Figure" src="https://images-na.ssl-images-amazon.com/images/I/51MGrl%2BdO1L._SX389_BO1,204,203,200_.jpg">
  <div class="Media__Body">
    <a href="https://www.amazon.co.jp/dp/4873115477/?tag=1000ch-22" target="_blank">
      <h4 class="Media__Title">HTML5クックブック</h4>
    </a>
    <p>Christopher Schmitt (著), Kyle Simpson (著), 株式会社クイープ (翻訳)</p>
  </div>
</div>

HTML5は、既にバズワードではなく当たり前になってきている。HTMLの知識をアップデートしたい人にオススメ。
