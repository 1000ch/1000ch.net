---
title: Webサイトのパフォーマンスを調べる
date: 2013-06-16
---

一口にWebサイトのパフォーマンスと言っても色々あって、

- 通信部分のパフォーマンス（Networking）
- スクリプト部分などの実行パフォーマンス（Computing）
- 表示に関するパフォーマンス（Rendering）

などなど。今回はWebサイトのどこがボトルネックになっているかなどの調べ方とか。

## GoogleChromeのPageSpeedを使う

Dev Tools(`command` + `option` + `i`で開くやつ)の進化が凄まじすぎて追いかけるのが大変な今日このごろ、その中のアドオンとして働くPageSpeed Insightsというものがある。

- [PageSpeed Insights (by Google) - Chromeウェブストア](https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli)
- [Using PageSpeed Insights for Google Chrome](https://developers.google.com/speed/docs/insights/using_chrome)

これをインストールすると、Dev ToolsのパネルにPageSpeedが追加されるので、あとは検証したいページを開いてAnalyzeするだけ。すると、そのページの検証が行われて、何が改善可能かを教えてくれる。Gzip効かせろだとか、minifyしろだとか、`<script>`は後ろでロードせいだとか、リダイレクト減らせだとか、cssスプライトにしろよだとか…、手軽に色んなことを教えてくれる。まずはこのツールでScoreを伸ばすことが先決です。

## DevToolsについて

前述の、NetworkingやComputingなどの細かい解析は、デフォルトで搭載されているDevToolsの各機能で行う。NetworkパネルでAjaxのタイミングとか見たり、画像のダウンロードにかかってる時間を見たり。タイムライン見てるだけでも、「ここ時間かかってるなー」っていうのが見えるかと。

あと、Timelineでペインティングコスト見たり、ProfilesでJavaScriptの実行コスト見たり。これらに関しては各パネルでレコーディングをする必要がある。下部の虫眼鏡の右にあるアイコンでレコーディングの開始と終了をする。それぞれ、レコーディングされている間に行われた描画や、スクリプトの実行をプロファイルとして閲覧することができる。

CompositeLayerの生成に関してはあんまりこのパネルで見てなくて、`Settings`の`General`の`Render`の

- Show paint rectangles（赤がpaint rectangle）
- Show composited layer borders（オレンジがcomposite layer）

にチェックをすることで得られる視覚的なほうで確認して、リフロー多いなおい…ってこととかをTimelineパネルで見たりしている。果たしてこれが常套手段なのかどうかは、不明。

## Sitespeed.ioを使って解析する

これはAriyaのRTで今日知った。

<blockquote class="twitter-tweet"><p>Just set up <a href="http://t.co/1phATVNerY">http://t.co/1phATVNerY</a> (by <a href="https://twitter.com/soulislove">@soulislove</a>) locally on my windows machine. Up and running in 5 minutes. Great tool.</p>&mdash; Thomas Puppe (@thomaspuppe) <a href="https://twitter.com/thomaspuppe/statuses/345596762804854785">June 14, 2013</a></blockquote>

こちらはコマンドラインから使うツールで、サイトのURLを指定して実行し、解析結果はhtmlで出力される。観点としては前述のPageSpeedと大差ないが、より細かく、関連ページの解析までしてくれるツール。PhantomJS1.9とJava1.6~が必要。

- [sitespeed.io](http://sitespeed.io/)
- [soulgalore / sitespeed.io](https://github.com/soulgalore/sitespeed.io)

PhantomJSとJavaのインストールはしてもらうとして、その後も、githubからcloneしてくるだけ。もちろんダウンロードでもOK。

```bash
$ git clone https://github.com/soulgalore/sitespeed.io.git
```

あとは、サイト名を指定して実行。

```bash
$ cd sitespeed.io

$ ./sitespeed.io -u https://1000ch.net
```

すると、`sitespeed-result`というフォルダに解析結果が出力される。ドメイン別で出力されるのと、その下は解析した日付時刻でフォルダが生成されるので、継続的に解析して比較するということもできそう。
