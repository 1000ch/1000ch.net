---
layout: post
title: 一歩進んだHTML/CSS/JSを目指すために
date: 2013-08-01
---

# 一歩進んだHTML/CSS/JSを目指すために

「なんとなく書きたくないけど、どう意識してコーディングしていけばいいのかわからない…。それを解消するためのツールがあるので、紹介する。

## HTMLInspector

- [philipwalton/html-inspector](https://github.com/philipwalton/html-inspector)
- [Introducing HTML Inspector](http://philipwalton.com/articles/introducing-html-inspector/)

こちらはHTMLを解析して悪いところを指摘してくれるツール。たぶんガイドラインとかそれぞれあると思いますが、基本的にはコレに沿ってもいいかと。スクリプトを差し込んで実行すると、指摘事項がconsoleに出力される。[githubのリポジトリ](https://github.com/philipwalton/html-inspector)からダウンロードするか、bowerで落としてくるか。

```bash
$ bower install html-inspector
```

次に、解析したいページに以下のコードを埋め込む。

```html
<script src="path/to/html-inspector.js"></script>
<script> HTMLInspector.inspect() </script>
```

`HTMLInspector.inspect()`には引数を与えられる。設定を渡すことでどういう解析を実行するかを指定できる。

- [Configuring HTML Inspector](https://github.com/philipwalton/html-inspector#configuring-html-inspector)

デフォルトだと以下のようになっている。解析ルールの追加などは都度更新されていくと思うので、公式ドキュメントを参照して欲しい。

```js
{
  useRules: null, //(Array) 解析のルールの指定
  domRoot: "html", //(selector | element) 解析を開始するルート
  exclude: "svg", //(selector | element | Array) 解析の対象としない要素を指定
  excludeSubTree: ["svg", "iframe"], //(selector | element | Array) 解析の対象としないサブツリー要素を指定
  onComplete: function(errors) {//(Function) 解析完了時のコールバック
    errors.forEach(function(error) {
      console.warn(error.message, error.context)
    })
  }
}
```

HTMLInspectorをGruntで実行出来たらいいのかなとか、むしろなぜそうなってないのか一瞬考えたけど、JavaScript側でテンプレート持ってたら無理（PhantomJSはさむとか？）かとか、サーバーサイドで動的にHTMLを返していると面倒くさいな、むしろそれでこういうスクリプト埋め込んでもらう形式なんだろうな、と。

それでも開発時にしか必要のない2行なので、ChromeのExtensionにしてみた。

- [H:inspector](https://chrome.google.com/webstore/detail/hinspector/poeiekompeckjdiigdamalgoahpldgbp)

これで一応、解析したいページを好きなタイミングで解析できるようになったと思う。`inspect()`メソッドに渡す引数はDevToolsのパネルで編集・指定できるようにした。ChromeExtensionなら導入はそれなりに楽かと。

## CSSLint

こちらはNicole SullivanとNicholas C. Zakasが作った、CSSのlintツール。

- [CSS Lint open sourced](http://www.stubbornella.org/content/2011/06/15/css-lint-open-sourced/)
- [CSS LINT](http://csslint.net/)
- [stubbornella/csslint](https://github.com/stubbornella/csslint)
- [stubbornella/csslint - wiki](https://github.com/stubbornella/csslint/wiki)

Node.jsで実行する。

```bash
$ npm install -g csslint

$ csslint target.css
```

都度ターミナルから実行するのもアレなので、Gruntなどで自動化するのが一般的かと思う。

- [gruntjs/grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint)

インストールはこちら。

```bash
$ npm install grunt-contrib-csslint --save-dev
```

Gruntの使い方は[ここ](/posts/2013/gruntjs-0-4.html)とか[ここ](/posts/2012/gruntjs-introduction.html)を見ていただけると。こちらもlintの方針を指定することができるけど、デフォルトで注意される内容を直すだけでもだいぶキレイになる。

## JSHint

最後にJavaScriptのチェックツール。こちらも前述のCSSLintと同様のことが言えるので、Gruntと一緒に紹介してしまう。

- [JS Hint](http://www.jshint.com/)
- [Documentation](http://www.jshint.com/docs/)
- [jshint/jshint](https://github.com/jshint/jshint)
- [gruntjs/grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)

JSHintのインストール。

```bash
$ npm install -g jshint
```

「非推奨プロパティを使うな！」とか比較演算子の使い方のあたりを指摘してくれる。何をチェックするしないの指定はコマンドライン引数でもできるが、`.jshintrc`という設定ファイルで一括指定可能。さらにこの`.jshintrc`をGruntと連携させるなりするのがいいかと。Gruntが公式で配布しているモジュールのインストールはこちら。

```bash
$ npm install grunt-contrib-jshint --save-dev
```

ルールセットは`.jshintrc`で行う他、`gruntfile.js`のタスクのオプションにも指定することが出来る。

```js
grunt.initConfig({
  jshint: {
    options: {
    curly: true,
    eqeqeq: true,
    eqnull: true,
    browser: true,
    globals: {
      jQuery: true
    }
  }
});
```

`gruntfile.js`への指定はこのあたりを参考に。

- [gruntjs/grunt-contrib-jshint - jshintrc](https://github.com/gruntjs/grunt-contrib-jshint#jshintrc)

## 意義とか

テストなどにも同じ事が言えるが、こういったこと継続的にやることが重要かと思っている。その点、メンテナビリティとポータビリティなどを考えて`package.json`だけで済むGruntが最有力候補になるかと。

- [ぼくのかんがえたさいきょうのしーえしゅえしゅ - MOL](http://t32k.me/mol/log/the-perfect-css-i-thought/)
- [t32k/maple](https://github.com/t32k/maple)

こちら[@t32k](http://twitter.com/t32k)氏が作成したフレームワークだけど、Grunt周りやcssの方針など参考になる（@t32k氏にはH:inspectorのアイコンを頂いた）。JSHint、CSSLintに加えて、[grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim)や[grunt-kss](https://github.com/t32k/grunt-kss)なども一緒に導入可能になっており、画像の最適化やスタイルガイドの作成も自動化できるようになっている。

業務でプロジェクトを幾つか経験したけど、最初の設計と継続的リファクタリングが如何に大事であるかを痛感していて、特に運用が大変なプロジェクトだと、どうしてもフロントエンドのコードが犠牲になりがち。それでも、 **ディベロッパーは理性を保ってコードを清潔に保つ努力をしていかなければならない** と、思う。

リファクタリングしてコードを修正するのは、スクラッチで開発していくこととは比較にならないくらい難しい。ましてや稼働中のサービスに一気に手を入れるのは非常に勇気のいる作業。ひとつひとつの蓄積（ある種我慢の蓄積かもしれないけど）が、

- Webのパフォーマンスにつながり
- 運用スピードの向上
- ディベロッパーのスキルアップ

につながると、思ってる。
