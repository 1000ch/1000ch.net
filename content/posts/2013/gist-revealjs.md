---
layout: post
title: Gist + Reveal.js = GistReveal
date: 2013-09-11
---

# Gist + Reveal.js = GistReveal

以前[Gistを簡易スライドにするGistSlideを作った](/posts/2013/gist-slide.html)という記事を書いた。

[Reveal.js](https://github.com/hakimel/reveal.js)で作られたスライドをたくさん見るようになってきた今日この頃、GistにReveal.jsを適用出来ても中々いいんじゃないかと思ったので、ChromeExtensionで作った。
我ながらかなりの安直ネーミングなので何かいい名前のがあったら教えてください。（名前考える前にコードを書き始めてしまうクセが。）

- [1000ch/GistReveal](https://github.com/1000ch/GistReveal)
- [GistReveal](https://chrome.google.com/webstore/detail/gistreveal/dbgcokbpeflcdicckohpdlgjjdecedpp)

インストールしたら、gistを見てもらって、ボタンをクリックでスライドになる。

## Reveal.jsのリソースを動的にページに

gistのページにreveal.jsのリソースをロードさせることを念頭に置くと、
cssを常に適用させていると当然レイアウトが壊れてしまうので（js周りはまだいいのですが）、クリックを契機にページにcssをロードさせなければならない。

```js
chrome.tabs.insertCSS(tab.id, {file: '/hoge.css'});
```

cssはOKですが、cssの中で定義されているフォント情報は相対パスで記述されているため、そのままだと`http://gist.github.com/.../hoge.ttf`のようになってしまい、Extension内のリソースをロードしにいくことができない。

そこで`chrome.extension.getURL()`でExtension内の絶対パスを使って、cssを適用させた。

```js
var fontDefinition =
  '@font-face {' +
    'font-family: "League Gothic";' +
    'src: url("' + chrome.extension.getURL("/font/hoge.ttf") + '");' +
    'font-weight: normal;' +
    'font-style: normal;' +
  '}';

chrome.tabs.insertCSS(tab.id, {code: fontDefinition});
```

が、適用されない。`chrome-extension://`スキーマでもローカルリソースとは認識されないためだった。ロードするフォントを、`manifest.json`の`web_accessible_resources`に追加。

```json
{
  "web_accessible_resources": [
    "/font/hoge.ttf"
  ]
}
```

これでOKだった。

## やりたいこと

~~いくつかテーマが用意されているのでそれをExtensionから選べたら楽かな…。~~オプションページで選択出来るように実装済。
