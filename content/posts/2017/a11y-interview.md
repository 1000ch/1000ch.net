---
title: アクセシビリティへの取り組みについてのインタビュー
date: 2017-05-13
---

インタビュー記事が公開された。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">「アメブロ」や映像配信プラットフォーム「FRESH!」でアクセシビリティに取り組む技術者たちに話を聞きました。<br>『「アクセシビリティに取り組むことが価値あるサービスづくりにつながる」サイバーエージェント技術者たちの取り組み』<a href="https://t.co/gZC4IqQSs0">https://t.co/gZC4IqQSs0</a></p>&mdash; サイバーエージェント　広報＆IR担当 (@CyberAgent_PR) <a href="https://twitter.com/CyberAgent_PR/status/862869891530936320">2017年5月12日</a></blockquote>

（インタビュー中、インタビュアによるリアルタイムに書き起こし（音声録音ナシ）という離れ業が、記事公開の裏にあったことをここに報告したい…。）

## 動画サービスにおけるアクセシビリティ

今は FRESH! でのアクセシビリティへ取り組みをガイドラインという形で公開を目指している。これは主に WCAG 2.0 に沿ったドキュメントになるはずだが、デザインや HTML 実装では超えられない動画という壁も感じつつある。

[FRESH!](https://freshlive.tv/) や [AbemaTV](https://abema.tv/) のような動画サービスが配信するのは映像と音声の動画コンテンツだが、音声をオフにして視聴したい人や聴覚障碍を持つ人には映像だけでコンテンツを 100% 楽しむことが今のところ難しい（アクセシブルではない）。

こうしたときにアクセシビリティとしては字幕や手話通訳を用意したいという話になるが、ここで技術やコストが立ちはだかる。YouTube には[自動字幕起こし機能](https://support.google.com/youtube/answer/6373554?hl=ja)があり、アップロードされた動画内の音声を自動で解析し、文字に起こしてくれる（あとで手直しもできる）。音声認識のような技術は一朝一夕で手に入るものではないが、動画プラットフォーム事業者としては言うまでもなく価値がある。
