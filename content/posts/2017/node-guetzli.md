---
title: GuetzliをNode.jsで使えるモジュール
date: 2017-04-21
---

# GuetzliをNode.jsで使えるモジュール

[imagemin/guetzli-bin](https://github.com/imagemin/guetzli-bin) という、Node.js のモジュールを作った。[imagemin のプラグイン](https://github.com/imagemin/imagemin-guetzli)もあるし、[gulp-image](https://github.com/1000ch/gulp-image) や [grunt-image](https://github.com/1000ch/grunt-image) もサポートしている。

## Guetzliとは

Guetzli は Google が開発している JPEG エンコーダで、従来よりも少ない劣化で圧縮できる。劣化しているかどうかは butteraugli という品質評価アルゴリズムを用いてチェックしている。

- [Guetzli／Butteraugliに関するあれこれ](http://qiita.com/yohhoy/items/406af27d4415c7bb6346)
- [google/guetzli: Perceptual JPEG encoder](https://github.com/google/guetzli)
- [google/butteraugli: butteraugli estimates the psychovisual difference between two images](https://github.com/google/butteraugli)

パラメータを変えて圧縮を繰り返し、最も劣化が少ない試行を選ぶという処理なので、処理速度は遅い。というより、圧縮スピードに主眼は置いていない。同じファイルサイズであれば Guetzli の方が良い結果が得られるのなら、多少遅くとも Guetzli で圧縮したほうが良い気はする。しかし手元で色々試していても遅いなぁと感じる遅さなので、導入するときは開発フローのどこで行うかは考える必要がある。
