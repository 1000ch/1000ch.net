---
title: SVG ファイルを GUI ツールで最適化する
date: 2018-11-11
---

# SVG ファイルを GUI ツールで最適化する

Sketch や各種ツールから出力する SVG には、表示には必要ないデータが含まれることがある。SVG を git などでバージョン管理することも多いと思うが、この時に不要なデータを含めたくない。

ツールとしては [svgo](https://github.com/svg/svgo) という Node.js 製のツールがあり、これを使うことで不要なデータを取り除きつつ、整形や最小化処理を適用できる。

どのタイミングで最適化するのかという話があるが、それについては[ワークフローにおける画像の最適化](/posts/2016/optimize-image-on-workflow.html)でも書いてある。今回は git のコミットフックではなく、GUI ツールで最適化することを考えてみる。

## GUI ツールでやる必要性

は特にないが、とりあえず1ファイルだけ最適化したかったり、ターミナルではなくテキストエディタでやりたいなど、git のコミットフックを用意するまでもない場面の選択肢のひとつとして考えられる。

Sketch のプラグインをインストールしておけば、エクスポート時に最適化した状態で出力できるので、漏れがない。あとは SVG に限らないが、エクスポートする前に、アイコンであればアートボードのサイズを揃えたり、パスをアウトライン化しておいたり、アートボードの名前を意味のあるものにしておくと良い。これをやっておくと、ViewBox のサイズが統一され、不要な transform の情報がなくなり、 `<title>` 要素に意味のある名前が挿入される。

## 各種プラグイン

Figma については [With Figma’s new SVG Exports, less = more](https://blog.figma.com/1b2e2cedf319) を見るに、ツールがない様子である。他のツールについては、Sketch にはオフィシャルで用意されていた。

- [`BohemianCoding/svgo-compressor`](https://github.com/BohemianCoding/svgo-compressor): Sketch のプラグインなので、手動でダウンロードする他、[Sketchpacks](https://sketchpacks.com/) などからインストールできる
- [`1000ch/vscode-svgo`](https://github.com/1000ch/vscode-svgo): [コマンドパレット](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (<kbd>Cmd</kbd> <kbd>Shift</kbd> <kbd>P</kbd>) で **Install Extensions** を実行し、svgo で検索する
- [`1000ch/atom-svgo`](https://github.com/1000ch/atom-svgo): `apm install svgo` または **Install** から svgo で検索する
- [`1000ch/Sublime-svgo`](https://github.com/1000ch/Sublime-svgo): コマンドパレット (<kbd>Cmd</kbd> <kbd>Shift</kbd> <kbd>P</kbd>) で **Install Package** を実行し、svgo で検索する

VSCode と Atom は Node.js を内蔵しているので、インストールするだけで使える。Sublime Text には Node.js が含まれていないので、インストールしている端末の `PATH` に `node` のパスが通っている必要がある。

Node.js のインストールについては[nodenv を使って Mac に Node.js の環境を構築する](https://qiita.com/1000ch/items/41ea7caffe8c42c5211c)も参考に。
