---
title: Google I/O 2014
date: 2014-06-27
---

サンフランシスコに来ています。

![](/img/posts/2014/google-io-2014/google-io.jpg)

各セッションは後ほど公開されるものもあるし、Keynoteのサマリー等は[HTML5Experts.jp](http://html5experts.jp/iwase/7369/)を見てもらうとして、主に **初海外・初Google I/O** の感想を。

## 参加したセッション等

### 1日目

- Keynote [Session]
- Performance culture [Session]
- Polymer and Web Components change everything you know about Web development [Session]
- HTTPS Everywhere [Session]
- Designing for wearables [Session]
- After Hours [Party]

### 2日目

- Optimizing for the user experience with WebPagetest [Developer Sandbox: Chrome]
- Cardboard: VR for Android [Session]
- Mobile Web performance auditing [Session]
- Nippon meet up [Community Lounge]
- 5 Chrome DevTool tricks for a faster mobile website [Developer Sandbox: Chrome]
- Making music mobile [Session]
- Material Design: Visuals & Imagery [Session]
- Speechless at I/O [Session]

Keynoteは次世代のAndroid **L** を中心とした話だった。マテリアルデザインに力を入れてくようで、[Material Design System](http://www.google.com/design/spec/material-design/introduction.html)なるものが発表された。SDKにもこの手のものが増えたり、デザインレギュレーションが前より強化・充実するのでしょうか。Webだと[Polymer Core](http://www.polymer-project.org/docs/elements/core-elements.html)を拡張している[Paper Elements](http://www.polymer-project.org/docs/elements/paper-elements.html)あたりが、実際にMaterial Design Systemを実装しており、UIエフェクトを中心としたインタラクションが充実している様子。

あとはDalvikのリプレイスとして現れた新しいランタイムのARTの性能や各種新APIなどなど(LのSDKはプレビュー版が既に出ているそうなのでそちらを見てくださいな)。

事前にややリークされていた、Android Wear周りの話が印象的だった。スマートフォンとタブレットのプラットフォームとして進化し市場を広げてきたAndroidも、そこに留まることなく、あらゆる基盤になることを目指している。Android Wear(腕時計とか)であったり、Android Auto(自動車)、Android TV。例えばスマートフォンで見ていた料理レシピのサイトをAndroid Wearを搭載した腕時計と同期して、その情報からキッチンタイマーになったり。Androidプラットフォームを通じてあらゆるものを統合して便利にしようとするビジョンのようなものを感じる。

![](/img/posts/2014/google-io-2014/samsung-gear-live.jpg)

こちらが参加者に配布されたSamsung Gear Live。LG G watchとの選択だったけど、こっちのほうが[センサーが多くて得られるデータが多いようなので](http://pocketnow.com/2014/06/25/lg-g-watch-vs-samsung-gear-live)こちらにした。デバッグ目的。

社内ではパフォーマンス改善マンという立場もあり、パフォーマンスに関するセッションをいくつか見たけど、真新しくエッジの効いた話はなかった印象。2日目にChromeのSandboxでWebPagetestに関することがあったので、「たぶんPatがやるんだろうな」と思っていたら案の定Patだった。「会社でWebPagetestのフォーク版を使っているよ！」と言いつつ画面を見せたら「Wow, Excellent!」と言われた(コレ以外にも連発で褒め言葉言われたのでウケが良かったのだと思われる)。

![](/img/posts/2014/google-io-2014/patrick-meenan.jpg)

**Optimizing for the user experience with WebPagetest** by Patrick Meenan

英語で喋る力があれば尚更良いのはもちろんだけど、最低限の聴きとる力がないと、セッションにしてもサンドボックスにしても勿体無い。今回は、ある程度知っている内容であることと、節々の単語とセッションの文脈を拾いつつスライドを見ることで概要はある程度理解出来たものの、スピーカーが挟んでくる笑いどころとかはわからない。

というわけで、英語力のなさが浮き彫りになった。フラグじゃないよ。

## ブース

セッション以外には、色んなブースが用意されていた。いくつか紹介。

![](/img/posts/2014/google-io-2014/booth.jpg)

### Sandbox

Android、Chrome、Go、Cloud、Designといったようなテーマ毎に開放されたスペースにブースが用意されていて、そのテーマに沿って時間帯毎(約30分単位)に何かしらセッションが行われている。ステッカーとかTシャツはこの辺りでゲット出来る。

![](/img/posts/2014/google-io-2014/sandbox.jpg)

**Request questの話をしているJake Archibald**

狭いスペースにはなるけど、スピーカーとの距離は断然近いし、質問とかも適時し易い雰囲気(Googlerと喋りたいのであれば、もしかしたらここが一番良いのではないか？)。こういう形式も良いと思った。

### Code Labs

パソコンが並べてあって、用意されている課題みたいなのを自力でやっていくコーナー。Code Labsには参加しなかったけど、たぶん手厚いサポートが受けられるんだと思う。

![](/img/posts/2014/google-io-2014/code-labs.jpg)

今回はAndroid Studio startup、Google Cloud Platoform、Nest API、Polymer startupの4つが用意されていた。

## Cafeスペース

開催中はCafeスペースが開放されていて、休みたいときに休むことが出来た(あまり立ち寄る暇なかったけど)。朝食と昼食はここで頂いた。色んな国の人が来るので当然、宗教もイロイロ。そのために食事が何種類か用意されてた(申し込み時のアンケートにもその手の質問があった)。コーヒーはスタバのが配給されていて美味しかった。

![](/img/posts/2014/google-io-2014/starbucks.jpg)

会場のMoscone Center自体は参加者の人数が多いせいで、常に局所的に混んでいたような気がするのと、Wi-Fiがしばしば断線するのが辛かった。セッションが行われる部屋は十分に椅子が用意されていた。

## After Party

1日目のセッション後にはAfter Partyというなか打ち上げみたいなものが催されて、そちらにもお邪魔してきた。

![](/img/posts/2014/google-io-2014/after-party.jpg)

年齢確認のため、例によってパスポートチェックを受けた後、手にスタンプを押されてパーティーの敷地内に入る。会場は見ての通り屋外で、雨降ったらどうなるんだろうと思いつつ、のんびりしてきた。皆お祭り気分で、なんとも言えない高揚感といいますか。これもまたGoogle I/Oの醍醐味の1つなのかも。

## アメリカ・サンフランシスコ

最初に申した通り、初海外だったので、準備面に不安はあったものの、旅程に関する部分は会社に手配してもらったので大丈夫だった(これについては自分でやったほうが良かったなと今更ながら思っている)。

宿泊したホテルはWhitcomb Hotelというところ。[1906年4月18日の大地震でも倒れなかった](http://ja.wikipedia.org/wiki/%E3%82%B5%E3%83%B3%E3%83%95%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%B9%E3%82%B3%E5%9C%B0%E9%9C%87)、由緒あるホテルだそう。止まった部屋はピカピカとまではいかないまでも綺麗に保たれていて、快適に過ごせた。

![](/img/posts/2014/google-io-2014/whitcomb.jpg)

通りを一本逸れるとやや怪しい雰囲気のあるような立地で、同行した皆となるべく団体行動をしよう(移動中は特に)と話をしていた。実際どこまで敏感になるべきかわからなかったし、実際はそこまで物騒ではないのかもしれないけど、なるべくリスクは避ける意味で。たぶん慣れの部分も大きくて、海外に不慣れな部分が、↑に対する不安を増幅していたと思う。初日よりは最終日のほうが気持ち的にも楽に過ごすことが出来た。パトカーのサイレンはひっきりなしに鳴っていた。

また英語の話になるけど、こっちが話せる話せないに関わらず、サンフランシスコの人は喋りかけてくるので会話をせざるを得ない状況に追い込まれることもしばしばある。遅いけど、言葉を頭で組み立てて返すことは出来るので、それがちょっと楽しかった。あと、日本で習っているような英語は日常会話じゃほとんど使われないなーと思った。主語はしょっちゅう省略されるし、なんというか **ラフな英語(?)** を喋っている気がする。日本で習う英語はさぞ堅苦しく聞こえるんだろうか。

言語の壁はなんとか飛び越えれそうな気がした。リスニング。リスニング。

## 後記

ずっと行きたいとは思っていたなかで、チャンスがあり今回の参加に至った。普段ネットで目にしているヒーローエンジニア達が生で見られるのは興奮するし、世界各国の技術者が一箇所に集結しているこの独特の空気を浴びるというのも中々体験出来るものじゃない。参加して良かった。参加出来て良かった。

何も出来ないな、と。良い意味でショックを受けた旅になりましたとさ。テクニカルな部分は追って反芻します。参加者の皆さん、Googleの皆さん、開催に関わった全ての人、お疲れ様でした。そしてありがとうございました！
