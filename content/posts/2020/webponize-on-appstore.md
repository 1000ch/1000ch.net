---
title: WebPonize を App Store で公開した
date: 2020-08-11
---

# WebPonize を App Store で公開した

最近メンテナンスが止まっていた WebPonize だが、[Safari が WebP をサポートする](https://developer.apple.com/documentation/safari-release-notes/safari-14-beta-release-notes)との発表がありメンテナンスを再開することにした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Web Authentication (Face ID, Touch ID) や http/3 など、色々と実装されているけど WebP 対応が一番嬉しいかもしれない。うっかり OS 側も macOS 11 からサポートしたりするのかな / &quot;Safari 14 Beta Release Notes | Apple Developer Documentation&quot; <a href="https://t.co/JJNw4OIhhv">https://t.co/JJNw4OIhhv</a></p>&mdash; Shogo ( ˘ω˘) (@1000ch) <a href="https://twitter.com/1000ch/status/1275190209093660672?ref_src=twsrc%5Etfw">June 22, 2020</a></blockquote>

- App Store で公開するために
  - developer certification & codesign 周りを整理した
  - Sparkle による自動アップデート機能を削除した ([`webponize/webponize/dcc63f0`](https://github.com/webponize/webponize/commit/dcc63f0887a5efa0439b4e2cff88a502347085d9))
  - Homebrew Cask から削除した (https://github.com/Homebrew/homebrew-cask/pull/87302)
  - [Apple の Human Interface Guideline](https://developer.apple.com/design/human-interface-guidelines/) に則り、ユーザーが保存先を選択できるようにした ([`webponize/webponize/fffda24`](https://github.com/webponize/webponize/commit/fffda24206d59897f75bac654c0d7f5a6a3d8578))
- ユーザー設定を [`sindresorhus/Defaults`](https://github.com/sindresorhus/Defaults) を使って管理するようにした ([`webponize/webponize/e7662f5`](https://github.com/webponize/webponize/commit/e7662f53f067ad1cfc7d05ec1830e87a424b8b0d))
- 設定画面を [`sindresorhus/Preferences`](https://github.com/sindresorhus/Preferences) を使って実装し直した ([`webponize/webponize/af5e2a7`](https://github.com/webponize/webponize/commit/af5e2a7e2a0b1e551b7bcf6b675999b8d8e50069))
- webponize.org を手直しした ([`webponize/webponize.org/93f4bf1`](https://github.com/webponize/webponize.org/commit/93f4bf1929d5e58e959e6710dc105dacf5325f67), [`webponize/webponize.org/d0e7479`](https://github.com/webponize/webponize.org/commit/d0e7479e3ff2675718aa5612259186c267c8741e))

こうした改善を経て、ついに [WebPonize は App Store にて公開されました](https://apps.apple.com/us/app/id1526039365?mt=12)。今まで GitHub のリリースや Homebrew Cask を使ってインストールしていた人もそうでない人も、是非 App Store からダウンロードしてください。
