---
layout: post
title: JSConf.Asia 2014 2日目
date: 2014-11-21
description: 短かったような気もするし、長かったような気もする3日間。
---

# JSConf.Asia 2014 2日目

## Intro to BitTorrent & WebTorrent by [@feross](http://twitter.com/feross)

- [Intro to BitTorrent & WebTorrent - SpeakerDeck](https://speakerdeck.com/feross/intro-to-bittorrent-and-webtorrent)
- [feross/webtorrent](https://github.com/feross/webtorrent)

BitTorrentをWebで実現しような話だった。元々PeerJSを手がけていた人っぽい？WebRTCの素のAPIは確かに使いにくいので、その隠蔽策は参考になる。

## Versioning, Syncing & Streaming large datasets using DAT + Node by [@maxogden](http://twitter.com/maxogden)

- [Versioning, Syncing & Streaming large datasets using DAT + Node - スライド](http://maxogden.github.io/slides/dat-intro-talk/)

Gitのようなデータのバージョン管理をリアルタイムに何とかかんとかするって言ってたんだけど、途中からだんだん難しくなってきて理解できなかった。内容的には気になる方面なので、要復習。

<blockquote class="twitter-tweet" lang="ja"><p>Versioning, syncing &amp; streaming large datasets using DAT + Node by <a href="https://twitter.com/maxogden">@maxogden</a> <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/jB9oBpQq6n">pic.twitter.com/jB9oBpQq6n</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535633059802923008">2014, 11月 21</a></blockquote>

- [maxogden/dat](https://github.com/maxogden/dat)

※個人的メモ：データはローカルのlevelDBに保存され、blobのストア先は、Amazon S3なりローカルなり、好きに選べるぜと言っていた気がする。これだけじゃよくわからんことには変わりない。

## Reactive Programming made simple by [@imslavko](http://twitter.com/imslavko)

- [Reactive Programming made simple - Slides](http://slides.com/slavakim/tracker#/)

Meteorのコアコミッターの人で、Reactive Programmingイイよねという話から、どうすれば簡単に実現出来るか。[Tracker](http://docs.meteor.com/#/basic/tracker)なるものを使うとDOM操作から、通信等、しかも依存するライブラリを問わずにいとも簡単にReactiveに出来るらしい。

とてもプレゼンが上手くて、Trackerのデモもかなり鮮やかだったので、後日公開されるであろうビデオを是非。

## Gibbering at Algoraves: JS in live audiovisual performances by Charlie Roberts

- [Gibber](http://gibber.mat.ucsb.edu/)
- [charlieroberts/Gibber](https://github.com/charlieroberts/Gibber)

コードエディタアプリの紹介。このWebアプリを起動するとWeb上にIDEが表示され、そこで各種APIを実行するとそれに応じた音楽や視覚効果が表示されるというモノ。

そのドラムやらスネア等々の再生APIを覚える前提ではあるけど、DJ的なことができる。既に導入利用実績があるらしい。

これは最後のライブコーディング+デモが凄くて一番拍手が起こってた。

## Let’s make a game with Phaser by [@gabehollombe](http://twitter.com/gabehollombe)

ゲームを作るには、アセットをダウンロードして、それらを描画して、アニメーションさせて、ユーザーの入力をハンドリングして、角度を計算して、音楽を鳴らして、得点とかの状態を管理して…。とにかくやることが沢山ある。

でも、[photonstorm/phaser](https://github.com/photonstorm/phaser)というフレームワークを使えば2Dゲームはとても簡単に作れるぜ！というセッションだった。実際に簡単なゲームを作りながらだったが、色んなステップが **preload** と **create** と **update** に綺麗に抽象化されているようだ。

<blockquote class="twitter-tweet" lang="ja"><p>It&#39;s from 聖剣伝説2 ! // Let&#39;s make a game with Phaser by <a href="https://twitter.com/gabehollombe">@gabehollombe</a> <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/sdCQqASGqd">pic.twitter.com/sdCQqASGqd</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535686482753638401">2014, 11月 21</a></blockquote>

## Deep Space - A Simulation Drama by [@simon_swain](simon_swain)

[1日目](http://1000ch.net/posts/2014/jsconf-asia-2014-1st.html)の **PIXEL ART AND COMPLEX SYSTEMS** に、似た系統のセッション。こちらも後日公開されるであろう動画を観てもらうほうが良さそう。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/vp8r-ECco_/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">スターウォーズ的なデモ。かっこいい。</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A video posted by Takanashi, Ginpei (@ginpei) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2014-11-21T08:41:42+00:00">Nov 11, 2014 at 12:41am PST</time></p></div></blockquote>

## ギンペイさんとよもつさんのプレゼン

昨日に続いて **Your 5 minutes of fame** の時間。今日は [@ginpei_jp](https://twitter.com/ginpei_jp)さんと[@yomotsu](https://twitter.com/yomotsu)が日本からの刺客として送り込まれた。

<blockquote class="twitter-tweet" lang="ja"><p>.<a href="https://twitter.com/ginpei_jp">@ginpei_jp</a> is Sushi chef from Japan! <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/g3JCAy2PbC">pic.twitter.com/g3JCAy2PbC</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535702314753859584">2014, 11月 21</a></blockquote>

<blockquote class="twitter-tweet" lang="ja"><p>He is <a href="https://twitter.com/yomotsu">@yomotsu</a> , WebGL specialist! <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/4DX4kzFp2O">pic.twitter.com/4DX4kzFp2O</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535704084766932996">2014, 11月 21</a></blockquote>

2人とも、日本でやるよりは流石に緊張した面持ちだったけど、お見事でした。

自分の動画を見返してみると、カタカナ英語で恥ずかしい代物。それでも、Twitterでメンションされたり直接質問されたりしたので、言いたいことは少なからず伝えられたのかな〜とも実感している。