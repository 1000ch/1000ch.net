---
layout: post
title: Raspberry PiにChromiumとかJenkinsを入れてみた
date: 2013-12-2
description: この記事はFrontrend Advent Calendar 2013 2日目の記事です。
---

# Raspberry PiにChromiumとかJenkinsを入れてみた

この記事は[Frontrend Advent Calendar 2013](http://www.adventar.org/calendars/62) 2日目の記事です。

この前フロントエンドな同僚の方々にRaspberry Piをプレゼントして頂きました（ありがとうございます｡･ﾟ･(ﾉД`)･ﾟ･｡）ので、アレコレしてみたログを晒します。
Frontrendのアドベントカレンダーに書いて良いのか些か迷ったものの、フロントエンドディベロッパーたるものLinuxやらJenkinsやらも触れるようにならないとね！
<del>断じて良いネタが浮かばなかったわけではない。</del>嘘ですごめんなさい。  

<img src='/img/posts/raspberry-pi/raspberrypi.jpg' width='100%' class='mv10'>

で、そのまま飾っておくのは勿体無いので周辺機器買い揃えて動くようにしてみました。
そもそもラズベリーパイとはなんなのかを簡単におさらいすると、

> Raspberry Pi（ラズベリーパイ）は、ラズベリーパイ財団によって英国で開発されたARMプロセッサを搭載したシングルボードコンピュータ。 via Wikipedia

です。手のひらサイズで非常に小さいながらも、
CPU、GPU、メモリ、USB2.0 x 2、HDMI、イーサネット等を備えております。
SDカードが挿せるようになっており、OSのイメージをSDカードに焼いて、
USBケーブルから電源を供給し、起動するようなイメージ。

- [Raspberry Pi](http://www.raspberrypi.org/)
- [Raspberry Pi - Wikipedia](http://ja.wikipedia.org/wiki/Raspberry_Pi)

## 用意したもの

電源を供給しなければ始まらないのでMicro-USB(A-MicroB)という規格(?)のケーブルを購入。
あと、OSイメージを焼くSDカードがないと話にならないのでそれも購入。  

<a href="http://www.amazon.co.jp/gp/product/B003UIRIFY/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B003UIRIFY&linkCode=as2&tag=1000ch-22" class='mv10' target="_blank">
  <img src="http://ecx.images-amazon.com/images/I/41YMHZRWcIL._SL500_AA300_.jpg" width='300px'><br>
  ELECOM Micro-USB(A-MicroB)ケーブル 1.0m ブラック MPA-AMB10BK
</a>

<a href="http://www.amazon.co.jp/gp/product/B003YC0U5G/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B003YC0U5G&linkCode=as2&tag=1000ch-22" class='mv10' target="_blank">
  <img src="http://ecx.images-amazon.com/images/I/41s4HhodUgL._SL500_AA300_.jpg" width='300px'><br>
  SanDisk SDHCカード 16GB Class4 SDSDB-016G-J95A
</a>

USBは2口しかないですがハブ等駆使すればラズパイだけで楽しめそうな。

## OSイメージをSDカードに焼く

Linuxなら何でも動く風(?)だけど、基本の **Raspbian** をダウンロードしてみます。

- [Downloads | Raspberry Pi](http://www.raspberrypi.org/downloads)

ダウンロードしてきたzipを解凍すると、`.img`拡張子のイメージファイルがあります。
そのイメージファイルをSDカードに焼けばRaspbianの起動ディスクの完成です。
ということで、MacにSDカードを挿し込みます。

### 挿す前

```bash
% df -h
Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
/dev/disk1     233Gi  106Gi  126Gi    46% 27952569 33026246   46%   /
```

### 挿した後

```bash
% df -h
Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
/dev/disk1     233Gi  106Gi  126Gi    46% 27973543 33005272   46%   /
/dev/disk2s1    15Gi  2.2Mi   15Gi     1%        0        0  100%   /Volumes/NO NAME
```

どうやら`/dev/disk2s1`がSDカードらしい。それをアンマウントする。  

```bash
% diskutil unmount /dev/disk2s1
```

ダウンロードしてきたイメージをSDに焼く。
`/dev/disk2s1`の場合は`/dev/rdisk2`のように、先頭に`r`を付与し、最後の`s1`を除く。

```bash
% sudo dd if=/path/to/2013-09-25-wheezy-raspbian.img of=/dev/rdisk2 bs=1m
2825+0 records in
2825+0 records out
2962227200 bytes transferred in 610.198031 secs (4854534 bytes/sec)
```

思ったより時間かかりました。（10分かからなかったくらい？）  
中身を確認してみる。

```bash
% fd -h
Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
/dev/disk2s1    56Mi   18Mi   38Mi    33%      512        0  100%   /Volumes/boot
```

書き込まれてるっぽい。
SDカードのセットアップにはMacだと[こういう便利なアプリ](http://alltheware.wordpress.com/2012/12/11/easiest-way-sd-card-setup/)もあるみたいです。  

## 送電して起動

手元にあったHDMIでディスプレイに繋いで、USBキーボードも接続。
Raspberry Piには電源ボタンはなくて、給電を開始すると起動します。

<img src='/img/posts/raspberry-pi/raspbian-cli.jpg' width='100%' class='mv10'>

起動すると初期設定画面が表示されるので、キーボードで設定をしていきます。
項目もそんなに複雑じゃないです。やった設定は以下の通り。

- **Expand Filesystem** - SDの残り領域をOS用に使う。
- **Enable Boot to Desktop/Scratch** - CUIで起動するかGUIで起動するかの設定。
- **Internationalisation Options** - Location等の設定。 **Asia/Tokyo** だけ設定。
- **Advanced Options** - SSHを有効にした。

CUIからでも`startx`でGUIを起動できるし、GUIからでもXterminalというソフトでCUIを起動できます。
ただし、マウスがない状態でGUIを立ち上げると身動きとれなくなる。かも。
僕はGUIを少し楽しんだら、CUIをデフォルト起動にしました。  
これでこのRaspberry PiにSSHでログイン出来るようになったはず。

```bash
raspberrypi login:pi
Password raspberry（デフォルトのままの場合）
```

何か困って初期設定画面に戻りたい場合は`sudo raspi-config`を実行すれば良い。

## ネットワークに接続

Raspberry Piをネットワークに繋げるべく、AirMacExpressからイーサネット経由で接続。  

<a href='http://www.amazon.co.jp/gp/product/B00B5NKDT4/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=B00B5NKDT4&linkCode=as2&tag=1000ch-22' class='mv10' target='_blank'>
  <img src='http://ecx.images-amazon.com/images/I/31KoJbIgDkL.jpg' width='300px'><br>
  ELECOM LANケーブル CAT6 Gigabit プロテクタ付き 1m ブラック LD-GP/BK1/E [フラストレーションフリーパッケージ(FFP)]
</a>

LANケーブルでAirMacExpressと接続して`sudo reboot`でRaspberry Pi再起動。
そうするとIPアドレスが勝手に割り振られる。起動ログの最後にIPアドレスが出ます。
`ifconfig`とかでももちろん表示される。これは後ほどMacからのログインに使うので覚えておく。
ネットワークに繋がっているかどうか、`ping`で確認。

```bash
$ ping google.com
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=1 ttl=51 time=13.6 ms
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=2 ttl=52 time=12.7 ms
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=3 ttl=52 time=13.4 ms
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=4 ttl=52 time=12.8 ms
```

大丈夫そう。折角なのでGUIでGoogle Chromeをインストールしようとしたら
アーカイブファイルがどうのこうのとエラーが出るので諦めてChromiumをインストール。
（ちゃんと`.deb`パッケージが落ちてくるんだけど何故かダメだった。）

```bash
$ sudo apt-get update
$ sudo apt-get install chromium
$ startx
```

ちょっと重たいですが、ブラウジングを出来るところまで確認しました。  

<img src='/img/posts/raspberry-pi/raspbian-chromium-1.jpg' width='50%' class='mv10'><img src='/img/posts/raspberry-pi/raspbian-chromium-2.jpg' width='50%' class='mv10'>

## SSHの確認

今度は、さっきメモしておいたRaspberry PiのIPアドレスにMacからSSHしてみる。

```bash
% ssh pi@[Raspberry PiのIPアドレス]
```

パスワード聞かれるので、初期値あるいは設定したパスワードを入力すればOKです。
IPアドレスがもし変わらないのであれば、この時点で一応ディスプレイなしで楽しめるようになった。
GUIは無理だけど。あと、無線LANでRaspberry Piにアクセスも[WPA使えばいけそう](http://www.myu.ac.jp/~xkozima/lab/raspTutorial1.html)。

## 最後にJenkinsを入れてみる

大変重いのが予想されますが、やってみます。

```bash
$ sudo apt-get install jenkins
```

結構時間かかりましたが、インストール完了。
Macから`[Raspberry PiのIPアドレス]:8080`にアクセスしてみると…!!!

<img src='/img/posts/raspberry-pi/raspberrypi-jenkins.png' width='100%'>

OK!!!  
今回触れていませんが、デフォルトだと **iptablesの設定はされていない** ので、
ネットワークに繋げている以上、最低限のファイアーウォールは設定した方が良いです。
まぁ、攻撃されて深刻な被害を受けるような使い方は、されなそうではあるけど。

## まとめ

ここまで出来れば、あとはある程度自由に遊べそうです。  
node.jsでアプリサーバーたてるもよし、Jenkinsサーバーにするもよし、Chromiumで海外記事を読みあさるもよし。
Raspberry Piとパトランプ的な何かを繋げて、**GitHubにプッシュ→Travisでビルド成功** をトリガーにパトランプ光らせたい。  
　  
次（3日目）の記事は、更新が年に1回という伝説のブログということで、とても楽しみです。  