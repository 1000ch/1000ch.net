---
title: Emojiを選べるAlfredのWorkflowを作った
date: 2013-10-27
---

## GitHubとかTrelloとかで使える絵文字

GitHubで使える絵文字はどうやらこんなにあるらしい。とても覚えきれん。

- [EMOJI CHEAT SHEET](http://www.emoji-cheat-sheet.com/)

更にGitHubだけじゃなくて、TrelloやQiita、Kippt等のいろんなサービスでこの絵文字が使えるそう。知らなかった。

## いちいちWebサイトで絵文字調べるの面倒臭い

GitHubは`:`を入れると候補が表示されるからまだいいけど、候補出してくれないサービスがほとんどなのでAlfredから入力できるようにAlfredのWorkflowを作った。完全に[@ruedap氏](http://blog.ruedap.com/2013/08/07/alfred2-font-awesome-workflow)にインスパイアされてる。

- [ダウンロード](https://github.com/1000ch/emoji-workflow/raw/master/Emoji.alfredworkflow)
- [1000ch/emoji-workflow](https://github.com/1000ch/emoji-workflow)

使い方はAlfredを開いて、キーワードは`emoji`。

![](https://raw.github.com/1000ch/emoji-workflow/master/screenshot/emoji.png)

スペースに続けて、キーワードを打ち込むと、絞り込みが出来る。

## 紹介してもらった

<blockquote class="twitter-tweet"><p>Just added another useful Alfred workflow for quickly Emoji lookup ~ <a href="https://t.co/H3b6584mAc">https://t.co/H3b6584mAc</a> <a href="http://t.co/nL02B6Mhgq">pic.twitter.com/nL02B6Mhgq</a></p>&mdash; Zeno Rocha (@zenorocha) <a href="https://twitter.com/zenorocha/statuses/398224734900350976">November 6, 2013</a></blockquote>

## 所感

 **AlfredのPowerpackユーザー且つ、前述の絵文字が使えるサービスのユーザー** ということで、ターゲットが狭そうだけど、この両方に属する人は割といると信じてる。AlfredのWorkflowにしたところで、一覧性がそこまであるわけじゃないけど、いちいちチートシートから探すよりは、キーワード入れてヒットする絵文字を使うほうがまだ楽かなと。
