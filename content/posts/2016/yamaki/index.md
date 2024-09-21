---
title: 開発合宿 in 山喜旅館
date: 2016-11-04
image: ./outside.jpg
---

静岡県伊豆伊東にある[山喜旅館](http://www.ito-yamaki.jp/)へ、1泊2日の開発合宿にプロジェクトメンバーと行ってきた。渋谷に出勤しているとどうしてもまとまった時間が取れないこともあり、プロジェクトの技術的負債を返済するべく、静岡へ赴いた。

## 山喜旅館

山喜旅館は静岡県JR伊東駅から徒歩7分の立地にある老舗の旅館。開発合宿の地として有名で、数々の実績がある温泉宿である。

- [エンジニアが選ぶ。開発合宿で泊まりたい日本の宿7選【2013年版】](http://www.find-job.net/startup/devcamp-2013)
− [IT技術者必見！　一度は行きたい「開発合宿所」10選](http://hrnabi.com/2015/06/15/8336/)
- [開発合宿にオススメ！旅館5選（Wi-Fiやモニタなど充実設備！）](https://agency-star.com/freelance/articles/377/)
- [【2016年版】エンジニアにおすすめの開発合宿所4選＆企画のポイント](https://career.levtech.jp/guide/knowhow/article/52/)

### アクセス

JR品川駅→JR熱海駅→JR伊東駅というルートで、品川から熱海までは新幹線こだまで36分、熱海から伊東までは伊東線に乗り換えて各駅停車の電車で25分程なので、なんだかんだで1時間半程で現地に到着してしまうという距離感。

### 設備

設備としては、24時間解放の温泉・懐石料理・Wi-Fi・会議室・アメニティ・アダプタや延長コードの貸出・近辺のコンビニなどが挙げられる。

会議室を借りてそこで開発をしていたが、Wi-Fiはやや重く時折ストレスを感じながらの作業になった。13人が同時に繋いでいた状況で重さを感じたので、もしかしたら4~5人なら重さは気にならないのかもしれない。ベストエフォートとは言え、もう少し潤沢だと嬉しかった。

電源についてはタコ足延長コードの貸出もあったので不自由はなく、椅子と机については立派なものではないので長時間座っていると腰痛を招くかもしれない。が、旅館にアーロンチェアを望むのもアレなので、運用でカバーしたいところだ。

### 雰囲気

伊東駅からほど歩くと、風情ある外観に出迎えられる。

![山喜旅館外観](./outside.jpg)

良い意味で老舗旅館という感じで、新しくはないけど清潔に保たれている様子。海辺という立地もあり風が強かったが、窓はガタガタ騒がしい。今回に関して言えば、会議室に立て籠もって開発していたせいで部屋でゆっくりした時間はなかったので、それを聴いたのも寝る直前だけ。疲れ果てていたので耽る間もなく寝た。

![山喜旅館内観](./inside.jpg)

外観だけでなく内観も情緒に溢れている。宿泊者にはコーヒー☕のサービスがあったので、ありがたく利用させてもらった。

## 1日目

朝9:00に品川に集合して出発すると昼には現地に着いていた。会議室に入って、机などをセッティングして開発できる環境を整えてから昼食のために[楽味家まるげん](https://tabelog.com/shizuoka/A2205/A220503/22003774/)に向かう。会議室にある机や椅子は自由に使っていいけど、撤収するときはもとに戻してねというスタイル。

![鯵丼](./horse-mackerel.jpg)

昼食を終えるとセブンイレブンで飲み物やお菓子などの買い出しをしてから旅館に戻って、旅館の夕食の時間（19:00~）までしばし作業をする。

夕食後（~20:00）から作業を再開し、かれこれ22:00まで続いた。22:00の段階で一応初日終了の合図はされたものの、作業のキリが悪いのか皆再び作業に戻る。そこからは買いだした酒を飲みはじめたり、合宿に来ていないメンバーから差し入れを頂いたり、Hangoutしたりとゆるりと休憩ムードへ。温泉に使ってからもまた作業に戻ったりして、結局寝たのは日付が変わった2:00頃だった。

## 2日目

7:00起床というスケジュールだったが、案外皆起きてくる。昼前まで作業の続き。

![2日目早朝](./early-morning.jpg)

2日目の昼食は[うなぎのまとい](https://tabelog.com/shizuoka/A2205/A220503/22003157/)というところで鰻重を食べた。非常に美味しかった。

![鰻重](./eel.jpg)

昼食を終えて例のごとくコンビニに寄ってから旅館に戻ると夕方の成果発表までラストスパート。夕方に各チームに分かれての成果発表として、チームで抱える課題・この合宿での成果・今後の課題などのプレゼンテーションを行った。

## 所感

合宿の目的として技術的負債の返却（の足がかり）だったので、やるべきことが明確な分、事前の準備もしやすく現地での作業も悩む時間は少なかったのではないか。事前にピックアップした技術的負債を全て消化しきれなかったチームもあったが、それはあまり気にしなくて良いと思う。負債の多寡に対してリソースは限られているので、その場でどうするかより今後の開発で継続的にリファクタリングをしていくきっかけにすることが重要なわけで（や、もちろん返却しきるに越したことはない）。言うなれば日々のFacebookを見る時間を削ってリファクタリングできるのだから。

負債を返却することを目的にした合宿を頼りにすると、人によっては普段の開発での心構えが弱くなりそうなのでそれは注意が必要。とは言え、温泉地に赴いてリファクタリングだけに集中することは大事だし、楽しいし、事業の一環として（表現がやや無理矢理だが）許容してもらえるのは非常にありがたいことだ。マンネリ化するのも良くないので、クオーター・半期に1回くらい行けると合宿としての意義が生まれやすいかもしれない。あとは、1泊2日だとそれなりに移動に疲弊してしまうので、できれば2泊3日だとより良かった。この辺は業務との兼ね合いもあるので難しいけど。