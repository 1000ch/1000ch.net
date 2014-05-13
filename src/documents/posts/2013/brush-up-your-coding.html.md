---
layout: post
title: 一歩進んだHTML/CSS/JSを目指すために
date: 2013-8-1
---

## 一歩進んだHTML/CSS/JSを目指すために

「なんとなく書きたくないけど、どう意識してコーディングしていけばいいのかわからない…。」
それを解消するためのツールがありますので、紹介します。

## HTMLInspector

- [philipwalton/html-inspector](https://github.com/philipwalton/html-inspector)
- [Introducing HTML Inspector](http://philipwalton.com/articles/introducing-html-inspector/)

こちらはHTMLを解析して悪いところを指摘してくれるツール。
たぶんガイドラインとかそれぞれあると思いますが、基本的にはコレに沿ってもいいかと。
スクリプトを差し込んで、実行すると、指摘事項がconsoleに出力されます。
[githubのリポジトリ](https://github.com/philipwalton/html-inspector)からダウンロードするか、bowerで落としてくるか。

```sh
$ bower install html-inspector
```

次に、解析したいページに以下のコードを埋め込みます。

```html
<script src="path/to/html-inspector.js"></script>
<script> HTMLInspector.inspect() </script>
```

`HTMLInspector.inspect()`には引数をとることができます。
設定を渡すことでどういう解析を実行するかを指定します。

- [Configuring HTML Inspector](https://github.com/philipwalton/html-inspector#configuring-html-inspector)

デフォルトだと以下のようになっているようです。
解析ルールの追加などは都度更新されていくと思うので、公式ドキュメントを参照ください。

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

HTMLInspectorをgruntで実行出来たらいいのかなとか、むしろなぜそうなってないのか一瞬考えたんだけど、
js側でテンプレート持ってたら無理（phantomjsはさむとか？）かとか、
サーバーサイドで動的にHTMLを返していると面倒くさいな、
むしろそれでこういうスクリプト埋め込んでもらう形式なんだろうな、と。  

それでも開発時にしか必要のない2行なので、ChromeのExtensionにしてみた。

- [H:inspector](https://chrome.google.com/webstore/detail/hinspector/poeiekompeckjdiigdamalgoahpldgbp)

これで一応、解析したいページを好きなタイミングで解析できるようになったと思います。
`inspect()`メソッドに渡す引数はDevToolsのパネルで編集・指定できるようにしました。
ChromeExtensionなら導入はそれなりに楽かと。

## CSSLint

こちらはNicole SullivanとNicholas C. Zakasが作った、CSSのlintツールです。

- [CSS Lint open sourced](http://www.stubbornella.org/content/2011/06/15/css-lint-open-sourced/)
- [CSS LINT](http://csslint.net/)
- [stubbornella/csslint](https://github.com/stubbornella/csslint)
- [stubbornella/csslint - wiki](https://github.com/stubbornella/csslint/wiki)

こちらはnode.jsで実行されます。

```sh
$ npm install -g csslint

$ csslint target.css
```

しかし都度ターミナルから実行するのもアレなので、
grunt.jsなどで自動化するのが一般的です。

- [gruntjs/grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint)

インストールはこちら。

```sh
$ npm install grunt-contrib-csslint --save-dev
```

grunt.jsの使い方は[ここ](http://1000ch.net/2013/01/22/ReconstructionOfGrunt/)とか[ここ](http://1000ch.net/2012/12/08/ReconsideringGruntJs/)を見ていただけると！
もちろんこちらもlintの方針を指定することができますが、
デフォルトで注意される内容を直すだけでもだいぶキレイになります。

## JSHint

最後にjsのチェックツール。
こちらも前述のcsslintと同様のことが言えるので、grunt.jsと一緒に紹介してしまいます。

- [JS Hint](http://www.jshint.com/)
- [Documentation](http://www.jshint.com/docs/)
- [jshint/jshint](https://github.com/jshint/jshint)
- [gruntjs/grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)

JS Hintのインストール。

```sh
$ npm install -g jshint
```

「非推奨プロパティを使うな！」とか比較演算子の使い方のあたりを指摘してくれます。
何をチェックするしないの指定はコマンドライン引数でもできますが、`.jshintrc`という設定ファイルで一括指定できます。
さらにこの`.jshintrc`をgrunt.jsと連携させるなりするのがいいかと。
gruntjsが公式で配布しているモジュールのインストールはこちら。

```
$ npm install grunt-contrib-jshint --save-dev
```

ルールセットは`.jshintrc`で行う他、`gruntfile.js`のタスクのオプションにも指定することが出来ます。

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

`gruntfile.js`への指定はこのあたりを参考にどうぞ。  

- [gruntjs/grunt-contrib-jshint - jshintrc](https://github.com/gruntjs/grunt-contrib-jshint#jshintrc)

## 意義とか

テストなどにも同じ事が言えますが、こういったこと継続的にやることが重要かと思います。
その点、メンテナビリティとポータビリティなどを考えて`package.json`だけで済むgrunt.jsが最有力候補になるかと。  

- [ぼくのかんがえたさいきょうのしーえしゅえしゅ - MOL](http://t32k.me/mol/log/the-perfect-css-i-thought/)
- [t32k/maple](https://github.com/t32k/maple)

こちら[@t32k](http://twitter.com/t32k)氏が作成したフレームワークですが、grunt周りやcssの方針など、非常に参考になります。
(@t32k氏にはH:inspectorのアイコンを頂きました。ありがとうございます。)
cssに関してはプロパティソートとか、ショートハンドへの変換などにも言及しています。
また、jshint、csslintに加えて、[grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim)や[grunt-kss](https://github.com/t32k/grunt-kss)なども一緒に導入可能になっており、
画像の最適化やスタイルガイドの作成も自動化できるようになっています。
　  
僕も業務でプロジェクトを幾つか経験しましたが、最初の設計と継続的リファクタリングが如何に大事であるかを痛感しています。
特に運用が大変なプロジェクトだとどうしてもフロントエンドのコードが犠牲になりがちです。それでも、

### ディベロッパーは理性を保ってコードを清潔に保つ努力をしていかなければならない

と思います。  
cssとかjsは短ければ短いほどいいと思いますが、コード増やすのは簡単だけど、コード削るのってやっぱり困難だなぁ、と。
ましてや稼働中のサービスに一気に手を入れるのは非常に勇気のいる作業です。
　  
ひとつひとつの蓄積（ある種我慢の蓄積かもしれないけど）が、

- Webのパフォーマンスにつながり
- 運用スピードの向上
- ディベロッパーのスキルアップ

につながると、思ってます。  