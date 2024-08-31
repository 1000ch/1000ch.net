---
title: gzipとzopfliとbrotliによる圧縮データのサイズを簡易的に比較する
date: 2017-04-11
---

# gzipとzopfliとbrotliによる圧縮データのサイズを簡易的に比較する

圧縮アルゴリズムは gzip・[zopfli](https://github.com/google/zopfli)・[brotli](https://github.com/google/brotli) と色々あるが、それらによる圧縮効果を簡易的に試したいときがしばしばあったので、関数にしてみた。

```bash
function compare() {
  echo "original size (bytes): $(cat "$1" | wc -c)"
  echo "    gzip size (bytes): $(gzip -c "$1" | wc -c)"
  echo "  zopfli size (bytes): $(zopfli -c "$1" | wc -c)"
  echo "  brotli size (bytes): $(bro --input "$1" | wc -c)"
}
```

関数名は適当に調整してもらうとして、これを `.bashrc` とか `.zshrc` あたりに書いておくと、`compare filename` で圧縮によってどの程度小さくなるかをコマンドライン上で試せる。

gzip は大抵の環境にインストールされている気はするが、zopfli や brotli はインストールしておく必要がある。Homebrew なら次のコマンドで簡単にインストールできる。

```bash
$ brew install zopfli
$ brew install brotli
```
