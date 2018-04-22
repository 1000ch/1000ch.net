---
layout: post
title: 技術書典4の戦利品
date: 2018-04-22
---

# 技術書典4の戦利品

会社がスポンサーをしていたり、知り合いや同僚が出展していたりと、行く機運が高まったので技術書典4に初参戦してきた。現地に到着する前から入場制限に関するツイートを観測していて、混雑具合が心配な状態で向かったが、案の定凄い人の数だった。

入場を果たすも Web っぽいゾーンの混雑が凄まじかったので、一次退散して友人と鮨を食してお茶を濁した。Web ゾーン以外も知り合いがたくさんいて、スタッフとして参加していたり、サークル出展していたり、はたまた参加者として出くわしたり。イベントとしては、お祭り感も然ることながら、いる人が一同に技術で盛り上がっていることがとても良かった。

![''](/img/posts/2018/techbookfest-vol4/crowd.jpg)

改めて Web ゾーンに突撃し、日経電子版のチームが無料で配布していた新聞と以下2冊を購入した。冊子で読む機会は減っているのだが、薄い本ということも手伝ってサクサク読めて、3冊合わせて1時間程度で読了。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E6%8A%80%E8%A1%93%E6%9B%B8%E5%85%B8?src=hash&amp;ref_src=twsrc%5Etfw">#技術書典</a> 戦利品 <a href="https://t.co/rRFthZgXLY">pic.twitter.com/rRFthZgXLY</a></p>&mdash; 🍵 #超速本 (@1000ch) <a href="https://twitter.com/1000ch/status/987938640348135424?ref_src=twsrc%5Etfw">2018年4月22日</a></blockquote>

## 日経電子の本

ハイパフォーマンスで話題になった日経電子版（ https://r.nikkei.com ）の舞台裏が書かれている本が無料で配布されていた。本というか新聞形式で配布されていて、新聞社ならではだと思う一方で、縦文字と新聞特有のレイアウトに惑わされ、読むのに苦戦した。ボリュームもかなり大きく読み応えがある。色んな背景で無料になったようだが、お金を出したいレベルである。また、せっかくなので後日電子媒体上で公開されることを期待したい。

個人的には左傳の欄がとても良かった。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">SPA なんぞ要らんと言わんばかりに <a href="https://t.co/X0JB9v1vJS">https://t.co/X0JB9v1vJS</a> が速い。静的リソースは h2 で push しつつ、HTML も Service Woker でキャッシュ。画像はキッチリ最適化して、&lt;picture&gt; 要素でレスポンシブにロードしてる。etc</p>&mdash; 🍵 #超速本 (@1000ch) <a href="https://twitter.com/1000ch/status/927538889752961026?ref_src=twsrc%5Etfw">2017年11月6日</a></blockquote>

## イヌでもわかるHyperapp

約 1KB の超軽量 JavaScript ビューライブラリ [hyperapp/hyperapp](https://github.com/hyperapp/hyperapp) について、設計思想や構成要素、コンポーネントライフサイクルといった基礎から、Markdown エディタといったサンプルアプリケーションの実装を通して応用を学んでいくという構成の本。紹介しているのが v1 についてだが、v2 についても簡単に触れている。

応用編で扱っている Markdown エディタでパーサーに [marked](https://marked.js.org) を使っているが、一時期問題になっていた気がするセキュリティの問題はどうやら解消されたらしい（個人的に最近は [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it) を使っていた）。また、Markdown を変換した結果の HTML を `innerHTML` に代入している箇所があるが、ここを hyperapp の vdom を使って HTML を差分適用できたりしないのかなと読みながら思った（完全な思いつきなので、できるかどうか不明。無責任）。

## イヌでもわかるウェブフォント

Web フォントに関することを幅広く取り扱った本、38ページ、500円。Web フォントとは何か、フォントファイルの種類、Webフォントを扱うときの各種最適化などカバーしているバランスの良い一冊。

特に、実際に使うときに気をつけるポイントが重点的に書かれているのが良い。日本語は、英語などに比べて文字の種類が圧倒的に多いので、Web フォントとして使うにはファイルサイズの面でそもそも不利である。アルファベットだけに対して Web フォントを適用するならまだしも、日本語に対しても使おうとすると重厚なファイルサイズの Web フォントのダウンロードをユーザーに強いることになる。そういう時にどういった対策を取れるかについて、フォントのサブセット化、ローカルフォントの優先的な参照、Preload などを使いましょうというアプローチが書かれている。

Web フォントのテキストへの適用フェーズを、block period、swap period、failure period に分けて説明していて丁寧だった。
