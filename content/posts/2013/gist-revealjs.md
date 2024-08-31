---
title: gist + Reveal.js = GistReveal
date: 2013-09-11
---

# gist + Reveal.js = GistReveal

以前[Gistを簡易スライドにするGistSlideを作った](/posts/2013/gist-slide.html)という記事を書いた。

[Reveal.js](https://github.com/hakimel/reveal.js)で作られたスライドをたくさん見るようになってきた。gistにReveal.jsを適用出来ても便利なんじゃないかと思い、[ChromeのExtensionを作った]((https://github.com/1000ch/GistReveal))。

インストールしたら、スライドにしたいgistを表示中にボタンをクリックするだけでスライドになる。

## Reveal.jsのリソースを動的にページに

gistのページにreveal.jsのリソースをロードさせることを念頭に置くと、JavaScriptはまだしも
CSSを常に適用させていると当然レイアウトが壊れてしまうので、クリックを契機にページにCSSをロードさせなければならない。

```js
chrome.tabs.insertCSS(tab.id, {file: '/hoge.css'});
```

CSSはこれでOKだが、CSSの中で定義されているフォントへのURLは相対パスで記述されているため、そのままだと`http://gist.github.com/.../hoge.ttf`のようになってしまい、Extension内のリソースをロードしにいくことができない。

そこで`chrome.extension.getURL()`でExtension内の絶対パスを使って、CSSを適用させた。

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
