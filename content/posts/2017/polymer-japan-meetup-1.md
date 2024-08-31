---
title: Polymer Japan Meetupに出演しました
date: 2017-11-05
---

# Polymer Japan Meetupに出演しました

11月4日に開催された [Polymer Japan Meetup #1](https://polymer-japan.connpass.com/event/69080/) に出演しました。トップバッターだったので、発表までハラハラすることなく、イチ参加者として楽しめました。

## Web Components Re-Introduction

Polymer のイベントとはいえ前提技術として Web Components の話が必要ということで、Web Components の基礎部分について解説しました。[HTML5 Conference 2017 で話した内容](https://speakerdeck.com/1000ch/the-state-of-web-components)と被るところもありますが、全体感をまとめてお届けしました。

<iframe loading="lazy" class="dropshadow speakerdeck-iframe" src="https://speakerdeck.com/player/a194ef68986e476c8eba0159a7a46bf2" title="Web Components Re-Introduction" allowfullscreen="true" data-ratio="1.7777777777777777"></iframe>

Polymer もとい Web Components の良さについては、このデモが一番わかりやすいです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Web Componentsでできること。タグ一発でこんなノブやスライダーが表示できたりします。 <a href="https://twitter.com/hashtag/polymer_jp?src=hash&amp;ref_src=twsrc%5Etfw">#polymer_jp</a><a href="https://t.co/9enKsWalkL">https://t.co/9enKsWalkL</a> <a href="https://t.co/7TJDx7MBKg">pic.twitter.com/7TJDx7MBKg</a></p>&mdash; Eiji Kitamura (@agektmr) <a href="https://twitter.com/agektmr/status/926665984563281921?ref_src=twsrc%5Etfw">November 4, 2017</a></blockquote>

WebAudio のコントロールのリッチな UI ですが、これが素晴らしいのは Web 標準技術で実現している点です。リッチな UI を提供するライブラリは数え切れないほどありますが、jQuery UI は jQuery など、大半は他のライブラリに依存してたり、独自の作法があります。Web Components であればサードパーティライブラリに依存すること無く、HTML という Web の基礎となる技術を通して拡張し、再配布できます。

ユースケースは Web アプリケーション全般にあると思いますが、いわゆる主に関わるアプリケーション部分だけでなく、サードパーティウィジェット（Twitter、Facebook、Google など）や UI フレームワーク（Bootstrap、Primer など）にも有用な技術でしょう。

## セッションとかハンズオンとか懇親会とか

どのコンテンツも面白くて、特にハンズオンはよくできていました。が、内容が現時点で安定版である Polymer v2 ベースだったので、Polymer v3 のロードマップにはない Bower や HTML Imports を扱わざるを得ない感じは、どの事前のセッションでも Bower や HTML Imports は今後非推奨と伝えていただけに、なんとも歯がゆかったです（いや、どうしようもないんだけど）。

ハンズオンは [Polymer Elements Catalog](https://elements.polymer-project.org/) で配布されているコンポーネントを組み合わせて、[地点間の経路を表示する地図アプリ](https://1000ch.github.io/polymer-handson/)の作成でした。コンポーネントを組み合わせるだけで、いとも簡単にリッチなアプリケーションが組み上がっていくのは快感ですね。

Polymer Japan は[ロゴができたり](https://twitter.com/polymer_jp/status/925287871996559360)、[公式サイトがローンチされたり](https://polymer-jp.org/)、徐々にコミュニティとして整いつつあるようです。今後もトピックを臨機応変に変えつつ、こうしたミートアップに留まらず様々な活動を計画しているようで、とても楽しみです。
