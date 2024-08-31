---
title: prefers-color-scheme を使った Dark Mode 対応
date: 2019-06-18
---

# prefers-color-scheme を使った Dark Mode 対応

`prefers-color-scheme` は [Media Queries Level 5](https://drafts.csswg.org/mediaqueries-5/) で定義される、システムで明るいテーマ・暗いテーマどちらを要求しているかを参照するメディアクエリである。Safari では 12.1 からサポートされていたが、Chrome の次の安定版である 76 に ship されそうなので、このブログでも申し訳程度に対応した。

Firefox については現在の安定版である 67 に ship されているし、Mobile Safari についても 13 からサポートされそうなので、ブラウザのサポートは近いうちに広まりそうである。[macOS は Mojave から Dark Mode を搭載している](https://support.apple.com/ja-jp/HT208976)ので、試したい人はアップデートしてみて欲しい。

## シンタックス

[`prefers-color-scheme`](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme) は値に `light` と `dark`、そして `no-preference` の3つを取る。`no-preference` はシステムに対して設定していない場合を指す。

```css
@media (prefers-color-scheme: light) {
  body {
    background: #fff;
    color: #000;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background: #000;
    color: #fff;
  }
}
```

このブログではこれまでの明るい見た目を基本テーマとして、Dark Mode が検出された場合に暗いスタイルを適用するべく、`@media (prefers-color-scheme: dark)` を使って上書きしており、`@media (prefers-color-scheme: light)` を使って記述を分けてはいない。

## なぜ対応するのか

Light Mode では眩しいので Dark Mode を使っているという人に対して、ギャップが生まれないように対応した（ちなみに自分はこれを機に Dark Mode を使い始めてみた）。暗いテーマが今後のデザイントレンドになるかどうかはさておき、ユーザーが選択できるのは重要だと思っている。

Media Queries Level 5 では `prefers-color-scheme` の他にもユーザーエージェントの設定を受容するためのメディアクエリが定義されている。いずれもユーザビリティ・アクセシビリティの観点から対応すべき要素に思える。

- [`inverted-colors`](https://drafts.csswg.org/mediaqueries-5/#inverted): 色が反転するよう指定されているか
- [`prefers-reduced-motion`](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-motion): 視差効果を減らす設定になっているか
- [`prefers-reduced-transparency`](https://drafts.csswg.org/mediaqueries-5/#prefers-reduced-transparency): 透過表現を減らす設定になっているか
- [`prefers-contrast`](https://drafts.csswg.org/mediaqueries-5/#prefers-contrast): どのコントラストモードが指定されているか
- [`prefers-color-scheme`](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme): どのカラースキーマが指定されているか
- [`forced-colors`](https://drafts.csswg.org/mediaqueries-5/#forced-colors): ユーザーエージェントによる強制色指定が設定されているか

こうしたユーザーエージェントによる機能を防ぐプロパティもある。[`forced-color-adjust`](https://drafts.csswg.org/css-color-adjust-1/#forced-color-adjust-prop) を使えばユーザーエージェントによる調整を防げるし、[`color-adjust`](https://drafts.csswg.org/css-color-adjust-1/#propdef-color-adjust) なら Web ページ側で指定した通りに表現することを強制できる（この2つのプロパティは意味が酷似しているので、マージされる可能性がある）。

ただし、OS を含めたユーザーエージェントによる調整などの機能は、余程緻密に設計されていたとしても、ユーザー選択肢を奪わないという意味で防ぐべきではないだろう。
