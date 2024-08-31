---
title: simplehttp2serverをnpmからインストールできるようにした
date: 2020-06-04
---

# simplehttp2serverをnpmからインストールできるようにした

ディレクトリを簡易的にローカル環境でホストする Python 3 系の [`http.server`](https://docs.python.org/ja/3/library/http.server.html) という標準ライブラリがある。Python 2 系では [SimpleHTTPServer](https://docs.python.org/ja/2.7/library/simplehttpserver.html) として提供されており、ローカル環境で簡易的に Web ページをホストするのに重宝していた。

## simplehttp2server

これは http/1.1 でホストされるが、http/2 でホストしたい人のために [GoogleChromeLabs/simplehttp2server](https://github.com/GoogleChromeLabs/simplehttp2server) というものがある。非常に便利なツールだが、Homebrew ないし `go get` でインストールする必要がある。これを Web Frontend のプロジェクトでも簡単に使えるようにするために、`GoogleChromeLabs/simplehttp2server` の Node.js ラッパーとして開発したのが [`1000ch/simplehttp2server`](https://github.com/1000ch/simplehttp2server) である。

と、言っても `npm` に [`simplehttp2server`](https://www.npmjs.com/package/simplehttp2server) を公開したのは5年ほど前で、新しいものではない。最近変更を加えたのは、この Node.js ラッパーとコマンドライン用のパッケージを分割した部分にある。

## simplehttp2server-cli

そのため今は、バイナリをラップした `1000ch/simplehttp2server` と [`1000ch/simplehttp2server-cli`](https://github.com/1000ch/simplehttp2server-cli) がパッケージとして存在する。コマンドラインで `simplehttp2server` を実行するためには、後者をインストールする必要がある。

```sh
$ npm install simplehttp2server-cli
$ simplehttp2server --help
  -config string
      Config file
  -cors string
      Set allowed origins (default "*")
  -listen string
      Port to listen on (default ":5000")
```

これで `simplehttp2server` は動くようになり、ローカル環境のフォルダ等を http/2 で簡単にホストできる。この場合 http/2 なので https を伴うことになり、デフォルトポートを使う場合は `https://localhost:5000` になることに注意して欲しい。[そして Google Chrome ではデフォルトで `https://localhost` をセキュリティ上の問題で開けない](https://github.com/GoogleChromeLabs/simplehttp2server#that-browser-warning)。

そこで `chrome://flags` から `#allow-insecure-localhost` フラグを有効化し Google Chrome を再起動すれば `https://localhost` も開けるようになる。
