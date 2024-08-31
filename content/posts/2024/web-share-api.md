---
title: Web Share API を使った共有機能とフォールバック
date: 2024-03-22
---

# Web Share API を使った共有機能とフォールバック

元々このブログでは記事ページに、各ソーシャルメディアのインテントへリンクするアイコンを設置していた。これを Web Share API を使ってより汎用的な実装に変更した。

ソーシャルメディアには [GET でアクセスできるインテントが用意されている](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent)ことが多い。これを用いた Web ページの共有機能は従来からある方法で、これ自体に大きな課題はないが、より利用者の [OS コンテキストに適したシェア体験を実現する Web Share API](https://web.dev/articles/web-share?hl=ja) が数年前に発表されている。

[Web Share API](https://developer.mozilla.org/ja/docs/Web/API/Web_Share_API) はシェアする文言および URL をパラメータとして渡すことで、OS レイヤで実装される共有メニューを呼び出せる。モバイルではネイティブアプリの共有機能で呼び出されることも多いので、見慣れた UI だろう。このブログはしばしば技術的な実験場として使われ、試験的な API でもすぐに導入しがちだが、[Web Share API はデスクトップ OS でのサポートが長らく進まず](https://caniuse.com/web-share)、倦ねていた。Web Share API を呼び出すモバイルと、ソーシャルメディアのインテントへリンクするデスクトップで、UI を変える必要があるからだ。「ページを共有する」という単一の UI アクションに揃えるために、Web Share API がサポートされていない環境では、シェアする文言をコピーするというフォールバックを提供することにした。

従来の Web ページにおけるコピー機能の実装はシンプルとは言い難い。コピーさせるテキストを `<input type="text">` に埋め込み、そのテキストを選択状態にした上で `document.execCommand('copy')` を呼び出す、という手順が必要だったからだ。そういった実装の煩雑さに加えて同期処理という課題も相まって、[Clipboard API](https://developer.mozilla.org/ja/docs/Web/API/Clipboard_API) が考案された。これは Web Share API より新しいが、OS のインターフェースに絡みづらい話であることもあり、[サポートが進んでいる](https://caniuse.com/async-clipboard)。

さらに最近では [Popover API](https://developer.mozilla.org/ja/docs/Web/API/Popover_API) が話題である。[Popover API は HTML ネイティブでトップレイヤーの HTML 表示・非表示を切り替える](https://zenn.dev/yusukehirao/articles/popover-api-and-attributes)、Web 業界が待ち望んだ仕様だ。近しい HTML 技術としては [`<dialog>` 要素](https://developer.mozilla.org/ja/docs/Web/HTML/Element/dialog)があるが、[細かな機能差があること](https://blog.logrocket.com/comparing-popover-api-dialog-element/)に加えて「それがダイアログなのかどうか」といったメンタリティにも及ぶので、使い所は時と場合に依るだろう。

これらの話を踏まえて、Web Share API がサポートしている環境では Web Share API を呼び出し、対応していない環境では URL を含むシェア文言をクリップボードにコピーし、その UI フィードバックとしてポップオーバーを表示するという仕様にした。前置きからお察しの通り、コピー機能の実装に Clipboard API を、ポップオーバーの表示に Popover API をそれぞれ呼び出しているというわけだ。[Safari v17 が Popover API をサポートした](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)ことも、状況として大きい。

実装自体は難しいものではないし、機能性が革新的なわけでもない。しかし、OS が持つシェアの機能性を活かしながら、フォールバックにも先進的な技術を用いる工夫を凝らした。先進的な Web 標準技術を組み合わせて、うまく OS コンテキストと馴染む体験を考えるようにしており、そのアイデアとして Web Share API と Clipboard API、そして Popover API を紹介した。
