---
title: ES Modulesを優先的にロードするmodulepreload
date: 2017-11-26
---

`<link>` 要素の `rel` 属性に、新しく `modulepreload` という値が ES Modules を先行してロードする仕様として追加され、[Chrome 64 に実装された](https://www.chromestatus.com/feature/5762805915451392)。リソースを先行してロードする手段としては既に `<link rel="preload">` があり、スクリプトファイルには `as="script"` を指定すれば良いが、ES Modules をロードするためにはいくつか問題があり、新しく `rel="modulepreload"` が検討されている。

## `<link rel="preload" as="script">` ではダメなのか

もとい `<link rel="modulepreload">` にすべき理由が [Preload and Modules](https://docs.google.com/document/d/1WebH4IOCswACUbaczx5cGQPVl5mnqcieOd4MRJM2syk/edit) に書かれている。

- `<link>` 要素によるリクエストの credential が `<script>` 要素と一致している必要がある
- 事前に module なのかどうかわかっていないとパースに困る (v8 固有？)
- `<link rel="preload">` は単一リソースをロードする仕様である
- 保存先が preload cache ではなく module map である必要がある (chrome 固有？)
    - `<link rel="preload">` の保存先は preload cache/HTTP cache である
- `as=""` で対応しようとすると `modulescript` / `moduleworker` / `modulesharedworker` / `moduleserviceworker` と、様々な値を定義しなくてはならない

つまり Normal Script と Module Script を区別する必要アリということだ。

Module Preload は、Preload では実施しない Module Script が依存するモジュールの解決も行うことで、依存関係を探すレイテンシーを省ける。

## `<link rel="modulepreload">` の振る舞い

1. Module Script をロードし module map に追加する
2. ゆくゆく必要になる依存モジュールのロードのために、ヒントとして記録する
3. ユーザーからは見えない

## ES Modulesが抱えるパフォーマンスの問題

現時点で ES Modules は、モジュールの数が多かったり、依存が深かったりするとパフォーマンス上で劣るという課題がある。もちろん実装の最適化はされていくと思うが。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">モジュール数100以上 or 深さが5以上ならbundleした方がいいとのこと  &quot;Loading Performance with (Many) Modules: Summary as of Oct 7, 2017 - Go…&quot; <a href="https://t.co/8gZZBbejMn">https://t.co/8gZZBbejMn</a></p>&mdash; azu (@azu_re) <a href="https://twitter.com/azu_re/status/918675534632042496?ref_src=twsrc%5Etfw">2017年10月13日</a></blockquote>

対策案はいくつかありそうだが、この `<link rel="modulepreload">` を使って優先的に Module Script をリクエストしておけば、モジュールをバンドルせずとも改善が見込める。
