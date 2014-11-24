---
layout: post
title: JSConf.Asia 2014 1日目
date: 2014-11-20
description: 海外でプレゼンするの巻
---

# JSConf.Asia 2014 1日目

今日はRegistrationも無いので、7:30にホテルを出る。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/vmew1DhpxN/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">#jsconfasia</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by 1000ch (@1000ch) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2014-11-20T00:22:30+00:00">Nov 11, 2014 at 4:22pm PST</time></p></div></blockquote>

昨日のCSSConfより参加者が多いようで、席が2割増。OctcatのBracketsを使ってラテを体に注入した。

## [Building Isomorphic Apps](http://www.slideshare.net/spikebrehm/building-isomorphic-apps-jsconfasia-2014) by [@spikebrehm](https://twitter.com/spikebrehm)

Airbnbの[Spike Brehm](http://twitter.com/spikebrehm)のセッション。英語聞き取りやすい気がした。

- JavaScriptはブラウザ環境でもNode.js環境でも実行される。だからこそIsomorphicにするべき
- フロントエンドの比重は大きくなっているが、SPAなどで極端にクライアントに処理を寄せてしまうとパフォーマンスに影響する
    - 1.Download skelton HTML
    - 2.Download JavaScript
    - 3.Evaluate JavaScript
    - 4.Fetch data from API
    - 5.User sees content
- 従来のように、HTMLをサーバー側で構築して返却する場合はやはり手順が少ない
    - 1.Download fill HTML
    - 2.User sees content
- パフォーマンスはもちろん、SEO的にも、うまく組み合わせたい。
    - Flickerは[mojito](https://github.com/yahoo/mojito)で、Instagramは[react](https://github.com/facebook/react)と[django](https://github.com/django/django)で実現しているらしい。
    - AirbnbのモバイルWebはBackboneとExpressで作った自家製ライブラリらしい。
    - [ASANA](https://github.com/Asana) - クライアントとサーバーで同期されているランタイムらしい。Meteorも同じ類のアプローチ？
- これらの実現のために、環境の差異を吸収する。”Enviroment agnostic & Shimmed per environment”
    - 例えばCookieの抽象化は、[cookie](https://github.com/jshttp/cookie) + Browserifyで良いのでは？
    - リクエストであれば[visionmedia/superagent](https://github.com/visionmedia/superagent)とか。
    - webpackを使ったアプローチも、InstagramやFacebook、Yahooで使われている。
- どうやってshimmed-per-environmentなモジュールをつくるのか？
    - `package.json`の`browser`属性を使おう
    - https://github.com/spikebrehm/set-cookie
    - [facebook/react](https://github.com/facebook/react)
    - [yahoo/flux-examples](https://github.com/yahoo/flux-examples)
    - [Isobuild: why Meteor created a new package system](https://www.meteor.com/blog/2014/08/28/isobuild-why-meteor-created-a-new-package-system)

## Pixel Art and Complex Systems by [@vinceallenvince](https://twitter.com/vinceallenvince)

自然にある複雑な事象をピクセルで抽象化したらどうなるかのような話だった。気がする。デモがどれも凄い。

- http://vinceallenvince.github.io/jsasia2014/
- http://www.bitshadowmachine.com/

<blockquote class="twitter-tweet" lang="ja"><p>Pixel Art &amp; Complex Systems by <a href="https://twitter.com/vinceallenvince">@vinceallenvince</a> <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/FDcilWKzTg">pic.twitter.com/FDcilWKzTg</a></p>&mdash; 1000ch (@1000ch_en) <a href="https://twitter.com/1000ch_en/status/535466005573545984">2014, 11月 20</a></blockquote>

## [Fun with sensors](http://www.slideshare.net/janjongboom/fun-with-sensors-jsconfasia-2014) by [@janjongboom](https://twitter.com/janjongboom)

面白かった。凄くしゃべり慣れている感じ。Firefox OS中心の話。

- モバイルデバイスに対する入力の方法は限られていたが、センサーの進化によって、今では色んな可能性がある。
    - 輝度・湿気・磁力・カメラ・バッテリー・圧力等…
- これらのセンサーを組み合わせたらアプリケーションの幅が広がる
    - 電波が悪くなったらオフラインモードに切り替える（`navigator.mozWifiManager`）
    - 暗くなったら音量を下げる（`window.addEventListener('devicelight')` + `AudioContext`）
- Firefox OSのアーキテクチャ
    - Linux Kernel > Gecko > HTML5 UI
    - このGeckoの部分にJSからセンサーにアクセスするAPIが集約されている

<blockquote class="twitter-tweet" lang="ja"><p>Fun with JavaScript and Sensors by <a href="https://twitter.com/janjongboom">@janjongboom</a> <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> <a href="http://t.co/uzgJDvrPbI">pic.twitter.com/uzgJDvrPbI</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535311304526163968">2014, 11月 20</a></blockquote>

## [The Art of Less](https://speakerdeck.com/aemkei/the-art-of-less-jsconf-dot-asia) by [@aemkei](https://twitter.com/aemkei)

このセッションが今日のベストバウトかもしれない。プレゼンも鮮やかだったし、内容のエグさも良かった。

- http://aem1k.com/

恐らく、後日ビデオで公開されると思うのでJavaScript好きな人に見て欲しい。 http://aem1k.com/ に置いてあるブツが好きなら見て損はないと思う。

## Preparing Your NodeJS Application for Scale by Dexter Tan & Laurence Franslay

- expressにはデフォルトだとセキュリティ的な機能はないので[Lusca](https://github.com/krakenjs/lusca)か[Helmet](https://github.com/helmetjs/helmet)を使うとだいぶ良くなる。
- 使っていないモジュールは削除し、使っているならこまめに更新する。そして依存関係を無闇に作らないことも大事
    - [grunt-nsp-package](https://github.com/nodesecurity/grunt-nsp-package)でモジュールの脆弱性を調べる
    - [retire.js](http://bekk.github.io/retire.js/)で古くなったモジュールを調べる。Gruntは[grunt-retire](https://github.com/bekk/grunt-retire)
- XSS対策として、基本的にincomingなものもoutgoingなものもエスケープする

あと、ローカライズとかパフォーマンスの話もあった。

## JSConf.Asia 2014でプレゼンした

[Your 5 minutes of fame](https://jsconfasia.wufoo.com/forms/your-5-minutes-of-fame/)というメインセッション外の枠で、おぼつかない英語をかましてきた。

<blockquote class="twitter-tweet" lang="ja"><p><a href="http://t.co/ZmBVO31saP">http://t.co/ZmBVO31saP</a> 2014でプレゼンしました。無事終わってよかった（小並感） <a href="https://t.co/phDA3K143B">https://t.co/phDA3K143B</a></p>&mdash; 1000ch (@1000ch) <a href="https://twitter.com/1000ch/status/535347007984906240">2014, 11月 20</a></blockquote>

このシンガポール遠征に発つ前に、「海外で発表がナントカカントカ…」という話をしていて、ノリでスライドを準備していたものの、その時はこういったLT枠があるとは知らない状態。

そして、LT枠の存在を[@yomotsu](http://twitter.com/yomotsu)さんのこのツイートで知る。

<blockquote class="twitter-tweet" lang="ja"><p>申し込んでしまったーーー！もう後には引けませぬ… i just entered for 5 min presentation at <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> I’m not confident talk in english tho… <a href="http://t.co/hAnrQRDzx9">pic.twitter.com/hAnrQRDzx9</a></p>&mdash; Akihiro Oyamada (@yomotsu) <a href="https://twitter.com/yomotsu/status/534730164341460992">2014, 11月 18</a></blockquote>

申し込んでみたものの、「希望者が殺到してたら時間ないだろうなー」と思っていた。が、いざ主催スタッフに話を聞いてみると申込者は6人しかいなかったという展開で、難なく枠をゲット出来てしまったという話。

<script async class="speakerdeck-embed" data-id="e18016304ebe01320da372c75fc688f9" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

滅多に無いチャンスだったと思うので、良い経験になった。

<blockquote class="twitter-tweet" lang="ja"><p>CyberAgent gentleman representing Japan at <a href="https://twitter.com/hashtag/jsconfasia?src=hash">#jsconfasia</a> .頑張れ！ <a href="http://t.co/7tESwlz3wm">pic.twitter.com/7tESwlz3wm</a></p>&mdash; Kristian Faeldt (@faeldtk) <a href="https://twitter.com/faeldtk/status/535340940123049984">2014, 11月 20</a></blockquote>

援護射撃ありがとうございます。ちなみにこのセッションの元ネタは[前にMediumに投下したもの](http://bit.ly/we-should-optimize-images)です。

明日は[@yomotsu](http://twitter.com/yomotsu)さんと[@ginpei_jp](http://twitter.com/ginpei_jp)さんがやります。6人中3人が日本人ね。

## 念願のチリ・クラブ

今日は皆でホテルの近くにある、Red Houseという中華料理のレストラン(?)に行ってきた。お目当ては名物のチリ・クラブ。

<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="4" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAGFBMVEUiIiI9PT0eHh4gIB4hIBkcHBwcHBwcHBydr+JQAAAACHRSTlMABA4YHyQsM5jtaMwAAADfSURBVDjL7ZVBEgMhCAQBAf//42xcNbpAqakcM0ftUmFAAIBE81IqBJdS3lS6zs3bIpB9WED3YYXFPmHRfT8sgyrCP1x8uEUxLMzNWElFOYCV6mHWWwMzdPEKHlhLw7NWJqkHc4uIZphavDzA2JPzUDsBZziNae2S6owH8xPmX8G7zzgKEOPUoYHvGz1TBCxMkd3kwNVbU0gKHkx+iZILf77IofhrY1nYFnB/lQPb79drWOyJVa/DAvg9B/rLB4cC+Nqgdz/TvBbBnr6GBReqn/nRmDgaQEej7WhonozjF+Y2I/fZou/qAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/vn3GiJBp9E/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_top">蟹</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A photo posted by 1000ch (@1000ch) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2014-11-20T13:14:25+00:00">Nov 11, 2014 at 5:14am PST</time></p></div></blockquote>

蟹2匹がほぼ丸ごと出てきた。ざっくりぶつ切りになっているだけで、分断された部位をペンチのような機器で殻を破壊し、そして手をチリソース塗れにしながら食べた。

プレゼンが終わった後のビールは格別だ。

- [シンガポール遠征初日](/posts/2014/singapore-the-1st-day.html)
- [CSSConf.Asia 2014](/posts/2014/cssconf-asia-2014.html)
- JSConf.Asia 2014 1日目
- [JSConf.Asia 2014 2日目](/posts/2014/jsconf-asia-2014-2nd.html)
- [JSConf.Asia 2014を振り返って](/posts/2014/look-back-in-singapore.html)