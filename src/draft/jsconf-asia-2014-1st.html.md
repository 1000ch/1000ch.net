---
layout: post
title: JSConf.Asia 2014 1日目
date: 2014-11-20
description: 
---

# JSConf.Asia 2014 1日目

昨日のCSSConfより参加者が多いようで、席が2割増。今日はRegistrationも無いので、7:30にホテルを出る。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/vmew1DhpxN/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">#jsconfasia</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by 1000ch (@1000ch) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2014-11-20T00:22:30+00:00">Nov 11, 2014 at 4:22pm PST</time></p></div></blockquote>

## BUILDING ISOMORPHIC APPS by Spike Brehm, Airbnb @spikebrehm

Airbnbの[Spike Brehm](http://twitter.com/spikebrehm)のセッション。英語聞き取りやすい。

なぜIsomorphocなのか。
どうやってIsomorphocにするのか。

「どの環境でもJavaScriptは実行されるから」


- performance 初期表示
    - SPA: download skelton html > download JS > evaluate JS > fetch data from API > user sees content
    - OLD: download full html > user sees content
    - flickerはmojitoというnodeのフレームワーク
    - instagramはreactとdjangoらしい
    - AirbnbのモバイルWebはBackboneとExpressで作った自家製ライブラリらしい。
    - ASANA:クライアントとサーバーで同期されているランタイムらしい。JSで統一するメリットだ。
    - Meteor
- seo
- flexibility

Enviroment agnostic & Shimmed per environment

- Cookieとか抽象化するの難しいよね・・・
- cookieモジュールをbrowserifyしてしまえばいいんじゃないのか
- webpackとかもあるよ。instagramとかFacebook、Yahooでも使われている。

どうやってshimmed-per-envなモジュールをつくるのか？
- package.jsonのbrowser属性を使おう
- https://github.com/spikebrehm/set-cookie

Project例
- Facebook/react
- Yahoo/flux
- Meteor/isobuild

## PIXEL ART AND COMPLEX SYSTEMS by Vince Allen, Spotify @vinceallenvince

- ブラウザは1pxずつ描画を繰り返している
- 自然にある複雑な自称をピクセルで抽象化したらどうなるかのような話だった気がする
- デモがどれも凄い

## BAD FORM by Chris Lienert, Jardine Lloyd Thompson @cliener

## HTTP HEADERS – THE SIMPLEST SECURITY by Wei Lu@luweidewei

## FUN WITH JAVASCRIPT AND SENSORS by Jan Jongboom, Telenor @janjongboom

- Firefox OSの話。
- モバイルデバイスに対する入力の方法話限られていた
- 輝度・湿気・磁力・カメラ・バッテリー・圧力などなど、色々な可能性
- 「電波が悪くなったら（navigator.wifiManager）、ローカルモードに切り替える」
- 「暗くなったら（window.addEventListener('devicelight')）音量を下げる（AudioContextいじる）」
- Firefox OSのアーキテクチャ
    - Linux Kernel > Gecko > HTML5 UI
    - Geckoの部分にJSからアクセスするAPIが集約されている
- とにかくセンサーを使ってみよう！

<blockquote class="twitter-tweet" lang="ja"><p>Fun with JavaScript and Sensors by <a href="https://twitter.com/janjongboom">@janjongboom</a> <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/uzgJDvrPbI">pic.twitter.com/uzgJDvrPbI</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535311304526163968">2014, 11月 20</a></blockquote>

## THE ART OF LESS by Martin Kleppe, Ubilabs @aemkei

## QUIVER.JS: RETHINKING WEB FRAMEWORKS by Soares Chen @soareschen

## 俺のLT

<blockquote class="twitter-tweet" lang="ja"><p>CyberAgent gentleman representing Japan at <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> .頑張れ！ <a href="http://t.co/7tESwlz3wm">pic.twitter.com/7tESwlz3wm</a></p>&mdash; Kristian Faeldt (@faeldtk) <a href="https://twitter.com/faeldtk/status/535340940123049984">2014, 11月 20</a></blockquote>

## TRANSLATION WORKFLOW AND FORMATTING COMPLEX TRANSLATIONS by Tingan Ho, P1.cn @tingan87

## PREPARING YOUR NODEJS APPLICATION FOR SCALE by Dexter Tan & Laurence Franslay, 

- expressにはデフォルトだとセキュリティ的な機能はない
    - Lusca or Helment
- requireとは何なのか
    - nodeはserver sideで実行されるJavaScript
    - avoid dependencies that misuse eval
- update your dependencies
    - grunt-nsp-package to scna for vulnerablities
    - retire.js to check for out-dated dependencies (grunt-retire)
- XSS sucks
    - escape everything incoming and outgoing
    
- localizationはnodeの問題ではない

- performance