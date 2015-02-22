---
layout: post
title: Emojiを選べるAlfredのWorkflowを作った
date: 2013-10-27
---

# Emojiを選べるAlfredのWorkflowを作った

## GitHubとかTrelloとかで使える絵文字

GitHubで使える絵文字はどうやらこんなにあるらしい。とても覚えきれん。

- [EMOJI CHEAT SHEET](http://www.emoji-cheat-sheet.com/)

更にGitHubだけじゃなくて、TrelloやQiita、Kippt等の
いろんなサービスでこの絵文字が使えるそうです。知らなかった。  

## いちいちWebサイトで絵文字調べるの面倒臭い

GitHubは`:`を入れると候補が表示されるからまだいいのですが、
候補出してくれないサービスがほとんどなのでAlfredから入力できるようにWorkflow作った。
完全に[@ruedap氏](http://blog.ruedap.com/2013/08/07/alfred2-font-awesome-workflow)にインスパイアされてる。

- [ダウンロード](https://github.com/1000ch/emoji-workflow/raw/master/Emoji.alfredworkflow)
- [1000ch/emoji-workflow](https://github.com/1000ch/emoji-workflow)

使い方はAlfredを開いて、キーワードは`emoji`です。  

<img src="https://raw.github.com/1000ch/emoji-workflow/master/screenshot/emoji.png" width="100%">

絞込はスペースに続けて、キーワードを打ち込みます。  

## 紹介していただいた

<blockquote class="twitter-tweet"><p>Just added another useful Alfred workflow for quickly Emoji lookup ~ <a href="https://t.co/H3b6584mAc">https://t.co/H3b6584mAc</a> <a href="http://t.co/nL02B6Mhgq">pic.twitter.com/nL02B6Mhgq</a></p>&mdash; Zeno Rocha (@zenorocha) <a href="https://twitter.com/zenorocha/statuses/398224734900350976">November 6, 2013</a></blockquote>

ありがとうございます！

## 所感

 **AlfredのPowerpackユーザー且つ、前述の絵文字が使えるサービスのユーザー** ということで
ターゲットが狭いようだけど、この両方に属する人は割といると信じてる。いてほしい。  
AlfredのWorkflowにしたところで、一覧性がそこまであるわけじゃないですが、
いちいちチートシートから探すよりは、キーワード入れてヒットする絵文字を使うほうがまだ楽かなと。  

## リンク

- [Alfred](http://www.alfredapp.com/)
- [Alfred Powerpack](http://www.alfredapp.com/powerpack/)
- [zhaocai / alfred2-ruby-template](https://github.com/zhaocai/alfred2-ruby-template/)
- [ruedap / alfred2-font-awesome-workflow](https://github.com/ruedap/alfred2-font-awesome-workflow/)