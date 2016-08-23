---
layout: post
title: Webフォントのロードをやめた
date: 2016-08-22
---

# Webフォントのロードをやめた

このサイトではフォントに Roboto と Roboto Mono を適用している。以前までは [Google Fonts](https://fonts.google.com/) で配信されているそれぞれのフォントをロードしていたが、それをやめて `font-family` の指定のみに変更した。

## プログレッシブな適用とOS共通フォントの選択

まず前提として、テキストのベースフォントとして明朝（`serif`）を、 `<h1>` ~ `<h6>` の見出しにはゴシック（`sans-serif`）を、コードには等幅（`monospace`）を適用する前提方針がある。明朝・ゴシック・等幅の中から自分の好みに近く、尚且つ Mac と Windows にインストールされているものを優先的に選ぶようにした。

```css
body {
  font-family: YuMincho, serif;
  font-weight: normal;
}

h1, h2, h3, h4, h5, h6 {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: bold;
}

code {
  font-family: "Roboto Mono", "Source Code Pro", Consolas, "Courier New", monospace;
  font-weight: normal;
}
```

最も広域になるであろう `<body>` には Mac にも Windows にもインストールされている可能性が高い游明朝体（`YuMincho`）を指定した。游明朝体は Mac であれば OS X Mavericks (10.9)から、 Windows であれば Windows 8.1 から標準搭載されているので、大半の環境でこちらが適用される。

個人的に好きな Roboto と Roboto Mono の指定も残しておいて、閲覧者の環境にインストールされている場合は優先するようにしている。 Roboto と Helvetica はそこそこ近い見た目なので Mac ユーザーであれば Roboto をインストールしてなくともソツのない見た目になるはず。あとはシェアの大きい Arial でフォールバックさせている。

等幅フォントにも多少のこだわりがあって、 [Roboto Mono](https://fonts.google.com/specimen/Roboto) と [Source Code Pro](https://github.com/adobe-fonts/source-code-pro) と [Consolas](https://en.wikipedia.org/wiki/Consolas) が並んでいるのはそのせい。 Source Code Pro は Adobe 製で視認性の高い等幅フォントとして一時期流行ったので、インストールしている人も多そう。 Consolas は Windows 発の等幅フォントで Mac でも Office 製品のインストールと共にもれなくインストールされる、個人的にはイチオシの等幅フォント。どれもない人には Courier New が適用されるようにしている。

## Flash of Unstyled Text

Web フォントのロードを避けた最大の理由は FOUT (_Flash of Unstyled Text_) である。

FOUT は、テキストに指定されている `font-family` のフォントが Web フォントとして指定されている場合に、ブラウザが **フォントのロードが完了するまでテキストの描画を行わない** 、もしくは **代替フォントで描画しておきロードが完了した時点で切り替える** ことによってテキストがちらつく現象のこと。厳密に言えば前者の振る舞いは表示が遅延しているだけだが、フォントのロード待ちによって発生するテキストの描画遅延に変わりはないので今回はまとめて言及する。

## FOUTにまつわる各ブラウザの挙動

現時点で次のような実装になっている。っぽい。

- Chrome, Firefox: フォントのダウンロード完了まで最大3秒間描画を保留し、完了した時点でテキストを描画する
- Safari: フォントのダウンロード完了までテキストの描画を保留する
- Internet Explorer: フォントのダウンロード完了まで代替フォントでテキストを描画する

このように実装がブラウザによってまちまちなのも Web 開発者にとって悩ましいところ。これを見る限りは Internet Explorer の「ダウンロード完了まで代替フォントで表示する」のがパフォーマンス（ATF）の観点から言えば一番良さそうに見える。特にブログのようにテキストが主なサイトであれば、いち早く文字を表示しておきたいところだし、フォントのダウンロードに失敗したときに真っ白で終わるリスクが少ない。

問題は、ダウンロードが完了しフォントを切り替えるタイミングでレイアウトが発生する点である。フォント間でサイズギャップが大きいと読んでいる最中にガタつきが発生して、ユーザーにとってのストレスは大きい。 Chrome と Firefox はこれを避けるために3秒間の保留を選んでいるのだろう。

## Font Loading API

この3秒間の保留をできる限り短くしたいとすれば、読み込むフォントのそのものを軽量化するのはもちろんのこと、フォントのリクエストからダウンロードまで早めることが重要である。 Web フォントは通常 CSS で定義するので、 CSS のダウンロードと評価に依存するが、これを打破するために JavaScript で命令的にフォントのロードをコントロールする [Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) というものがある。必要になるのがわかっているフォントはなるべく早いタイミングで Font Loading API を駆使してロード開始を早めておくと良い。

```javascript
let font = new FontFace('Font Name', 'url(/font-name.woff2)', {
  style        : 'normal',
  unicodeRange : 'U+000-5FF',
  weight       : '400'
});

font.load();
font.ready().then(() => {
  document.fonts.add(font);
});
```

Font Loading API には [bramstein/fontloader](https://github.com/bramstein/fontloader) というポリフィルがあるので、ブラウザの実装が進むまではそちらを使うのも手。

## font-displayプロパティ

また、フォントの表示に関してはブラウザの実装に依存しないように CSS でコントロールできるべきだとということで、 `font-display` というプロパティもある。 `font-display` はフォントの定義をする `@font-face` と共に使う。

```css
@font-face {
  font-family: "Font Name";
  font-weight: 400;
  font-style: normal;
  src: url("font-name.woff2") format("woff2");
  font-display: swap;
}
```

`font-display` の値は次の通り。

- `auto`: デフォルト値。ブラウザの実装に準ずる
- `swap`: 即座に代替フォントを表示し、フォントのダウンロード完了後に切り替える
- `fallback`: フォントのダウンロードを最大 100ms 待機し、その間に完了しなければ代替フォントで表示する。3秒経過までにダウンロードが完了すればフォントを切り替える
- `optional`: フォントのダウンロードを最大 100ms 待機し、その間に完了しなければ代替フォントで表示する

`swap` は Internet Explorer の振る舞いで、 Chrome や Firefox に近いのは `fallback` ないし `optional` あたりだろうか。さらなる詳細については、 CSS-Tricks の [`font-display` for the Masses](https://css-tricks.com/font-display-masses/) という記事が詳しいのでそちらを参考に。

## Webフォントを使わない選択

Font Loading API や font-display を駆使すると共に、 Cache API などを使ってフォントファイルを完全にキャッシュさせればバンドルフォントの参照に近い振る舞いを期待できそうではあるが、このブログでは冒頭の **プログレッシブな適用とOS共通フォントの選択** で充分だったし、管理コストも考えて Web フォントを使わない選択をとった。自分は必要性に駆られなかったが、 Web フォントを使いたい場合は [Noto Sans の Web Font 対応とサブセットによる最適化](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html) の内容を理解した上で利用すべきだろう。
