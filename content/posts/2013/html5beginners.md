---
title: HTML5ビギナーズでリファクタリングについて喋ってきた
date: 2013-10-25
---

2013/10/23(金)に行われた[HTMLビギナーズ第3回](http://atnd.org/events/44530)に参加して、喋ってきた。

真ん中のスクリーンが映らないという機材トラブルに加えて、[吉川さん](https://twitter.com/yoshikawa_t)と[ひろみつさん](https://twitter.com/hiromitsuuuuu)のとてもわかりやすいCSSの話の後というプレッシャーの中、 ~~「あれ、2人がCSSで俺だけちょっと違う話だけど大丈夫かコレ」って思いながら~~ 話をさせていただいた。

スライドはこちら。

<iframe loading="lazy" class="dropshadow speakerdeck-iframe" src="https://speakerdeck.com/player/876fcb001e760131f03e7e1022f85296" title="Brush up your Coding" allowfullscreen="true" style="aspect-ratio: 560 / 420;" data-ratio="1.3333333333333333"></iframe>

当日使ったようで使っていなかったデモファイルは[こちら](http://github.com/1000ch/brushup-sample)。

## 懇親会

参加者の方々と話してたら「黒い画面使ってみようと思いました！」とか「CSSLintの話参考になりました！」とか感想を頂いて非常にありがたかった。少しでも足しになったなら冥利に尽きます。

黒い画面については[Webデザイナーの為の「本当は怖くない」”黒い画面”入門](http://fjord.jp/tag/dont-be-afraid-kuroigamen)が丁寧でオススメ。

苦手意識がある方もいると思うけど、僕から言わせればPhotoshopのほうがよっぽど難しい。ちょっと苦しめばある程度できるようになるので覚えておいて損はないかと思う。

## npmの話すっ飛ばした

これは簡単に解説しておこうと。

npmはnodeのパッケージ管理ツール。nodeをインストールするとnpmも自動でインストールされる。

- [Node.js 日本ユーザグループ](http://nodejs.jp/)
- [node.js](http://nodejs.org/) - インストーラはここから入手可能

が、nodeの開発は非常に活発でバージョンアップもどんどん行われる。なので、nodeのバージョン管理ツールを使うことをオススメします。いくつかあるけど、ここでは[nvm](https://github.com/creationix/nvm)を簡単に紹介。といってもREADMEの通りではありますが。

まず、nvm本体のインストール。  

```bash
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
```

これでホームディレクトリに`~/.nvm`というフォルダが作成されている。あとはnvmのパスを通すために`.bashrc`とかが書き換わっている。これで`nvm`というコマンドが使えるようになる。nodeはnvmを使ってインストールし、インストールしたnodeは`~/.nvm`の中で管理されるようになる。

あとはnodeを、バージョンを指定してインストール。  

```bash
# nodeの0.10.21をインストールする
$ nvm install 0.10.21

# nodeの0.8.25をインストールする
$ nvm install 0.8.25

# nvmでインストールしたnodeの0.10.21を使う
$ nvm use 0.10.21
```

これでOKです。ターミナル立ち上げる度に`nvm use`とかするのもアレなので`.bashrc`とか`.zshrc`とかに書いたほうが良い。alias作ったり、`.nvmrc`を使った運用は[README](https://github.com/creationix/nvm#usage)を参照のこと。

## 最後に

マークシティはダンジョンだ！
