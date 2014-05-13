---
layout: post
title: HTML5ビギナーズでリファクタリングについて喋ってきました
date: 2013-10-25
---

## お疲れ様でした

2013/10/23(金)に行われた[HTMLビギナーズ第3回](http://atnd.org/events/44530)に参加して、喋ってきました。  
真ん中のスクリーンが映らないという機材トラブルに加えて、
[吉川さん](https://twitter.com/yoshikawa_t)と
[ひろみつさん](https://twitter.com/hiromitsuuuuu)のとてもわかりやすいCSSの話の後というプレッシャーの中
<del>「あれ、2人がCSSで俺だけちょっと違う話だけど大丈夫かコレ」って思いながら</del>
お話させていただきました。ありがとうございました。
ちょっとモリモリ過ぎて早口でしたごめんなさい。  
　  
スライドはこちらです。  

<script async class="speakerdeck-embed" data-id="876fcb001e760131f03e7e1022f85296" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

当日使ったようで使っていなかったデモファイルは[こちら](http://github.com/1000ch/brushup-sample)です。一応。

## 懇親会

参加者の方々と話してたら「黒い画面使ってみようと思いました！」とか  
「csslintの話参考になりました！」とか感想を頂いて非常にありがたかったです。  
少しでも足しになったなら冥利に尽きます。喋ってよかった。  

黒い画面については…  

- [Webデザイナーの為の「本当は怖くない」”黒い画面”入門](http://fjord.jp/tag/dont-be-afraid-kuroigamen) - すごく丁寧

苦手意識がある方もいらっしゃるかと思いますが、
僕から言わせればPhotoshopのほうがよっぽど難しいです。
ちょっと苦しめばある程度できるようになるので覚えておいて損はないかと思います。

## npmの話すっ飛ばした

これは簡単に解説しておこうと。  
npmはnodeのパッケージモジュールを管理するツールです。  
nodeをインストールするとnpmも自動でインストールされます。  

- [Node.js 日本ユーザグループ](http://nodejs.jp/)
- [node.js](http://nodejs.org/) - インストーラはここから入手可能

が、nodeの開発は非常に活発でバージョンアップもどんどん行われます。  
なので、nodeのバージョン管理ツールを使うことをオススメします。  
いくつかありますが、ここでは[nvm](https://github.com/creationix/nvm)を簡単に紹介します。  
といってもREADMEの通りではありますが。  
　  
まず、nvm本体のインストール。  

```sh
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

これでホームディレクトリに`~/.nvm`というフォルダが作成されているはずです。
あとはnvmのパスを通すために`.bashrc`とかが書き換わっています。
これで`nvm`というコマンドが使えるようになります。
nodeはnvmを使ってインストールし、インストールしたnodeは`~/.nvm`の中で管理されるようになります。  
　  
あとはnodeを、バージョンを指定してインストールする。  

```sh
# nodeの0.10.21をインストールする
$ nvm install 0.10.21

# nodeの0.8.25をインストールする
$ nvm install 0.8.25

# nvmでインストールしたnodeの0.10.21を使う
$ nvm use 0.10.21
```

これでOKです。ターミナル立ち上げる度に`nvm use`とかするのもアレなので
`.bashrc`とか`.zshrc`とかに書いたほうがいいですね。  
alias作ったり、`.nvmrc`を使った運用は[README](https://github.com/creationix/nvm#usage)を見てください。  

## 最後に

マークシティはダンジョンだ！