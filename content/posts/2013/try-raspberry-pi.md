---
title: Raspberry PiにChromiumとかJenkinsを入れてみた
date: 2013-12-02
---

この記事は[Frontrend Advent Calendar 2013](http://www.adventar.org/calendars/62) 2日目の記事です。

この前フロントエンドな同僚の方々にRaspberry Piをプレゼントしていただいたので、アレコレしてみたログを晒してみる。Frontrendのアドベントカレンダーに書いて良いのか些か迷ったものの、フロントエンドディベロッパーたるものLinuxやらJenkinsやらも触れるようにならないとね！

![](/img/posts/2013/raspberry-pi/raspberrypi.jpg)

そのまま飾っておくのは勿体無いので周辺機器買い揃えて動くようにしてみた。そもそもラズベリーパイとは、

> Raspberry Pi（ラズベリーパイ）は、ラズベリーパイ財団によって英国で開発されたARMプロセッサを搭載したシングルボードコンピュータ。 via Wikipedia

となっている。

手のひらサイズで非常に小さいながらも、CPU、GPU、メモリ、USB2.0 x 2、HDMI、イーサネット等を備えている。SDカードが挿せるようになっており、OSのイメージをSDカードに焼いて、
USBケーブルから電源を供給し、起動するようなイメージ。

- [Raspberry Pi](http://www.raspberrypi.org/)
- [Raspberry Pi - Wikipedia](http://ja.wikipedia.org/wiki/Raspberry_Pi)

## 用意したもの

電源を供給しなければ始まらないのでMicro-USB(A-MicroB)という規格(?)のケーブルを購入。あと、OSイメージを焼くSDカードがないと話にならないのでそれも購入。  

<affiliate-link
  src="https://m.media-amazon.com/images/I/71xLL2jT47L._AC_SL1500_.jpg"
  href="https://www.amazon.co.jp/dp/B003UIRIFY"
  tag="1000ch-22"
  title="エレコム マイクロUSBケーブル microUSB 転送・充電 1A出力 1.0m ブラック MPA-AMB10BK">
  USB(Aタイプ:オス)のインターフェイスを持つパソコンに、USB(MicroBタイプ:オス)のインターフェイスを持つスマートフォン(Xperia(TM)やDesire)などの機器を接続し、充電やデータ転送ができるMicro-USBケーブルです。
</affiliate-link>

<affiliate-link
  src="https://m.media-amazon.com/images/I/61s-6bZrcxL._AC_SL1500_.jpg"
  href="https://www.amazon.co.jp/dp/B0B21F8RQ5"
  tag="1000ch-22"
  title="SDカード 32GB SDHC Class10 UHS-I U3 V30 SanDisk Extreme SDSDXVT-032G-GHJIN">
  ブランド: SanDisk、モデル名: Extreme SD、フラッシュメモリタイプ: SDHCカード、メモリストレージ容量: 32 GB、色: ブラック|ゴールド
</affiliate-link>

USBは2口しかないけど、ハブ等駆使すればラズパイだけでそれなりに楽しめそうな。

## OSイメージをSDカードに焼く

Linuxなら何でも動くっぽいけど、基本の **Raspbian** を[Downloads | Raspberry Pi](http://www.raspberrypi.org/downloads)からダウンロードしてみる。ダウンロードしてきたzipを解凍すると、`.img`拡張子のイメージファイルがある。そのイメージファイルをSDカードに焼けばRaspbianの起動ディスクの完成。ということで、MacにSDカードを挿し込む。

### 挿す前

```bash
$ df -h
Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
/dev/disk1     233Gi  106Gi  126Gi    46% 27952569 33026246   46%   /
```

### 挿した後

```bash
$ df -h
Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
/dev/disk1     233Gi  106Gi  126Gi    46% 27973543 33005272   46%   /
/dev/disk2s1    15Gi  2.2Mi   15Gi     1%        0        0  100%   /Volumes/NO NAME
```

どうやら`/dev/disk2s1`がSDカードらしい。それをアンマウントする。  

```bash
$ diskutil unmount /dev/disk2s1
```

ダウンロードしてきたイメージをSDに焼く。`/dev/disk2s1`の場合は`/dev/rdisk2`のように、先頭に`r`を付与し、最後の`s1`を除く。

```bash
$ sudo dd if=/path/to/2013-09-25-wheezy-raspbian.img of=/dev/rdisk2 bs=1m
2825+0 records in
2825+0 records out
2962227200 bytes transferred in 610.198031 secs (4854534 bytes/sec)
```

思ったより時間かかった（10分弱くらい）。中身を確認してみる。

```bash
$ fd -h
Filesystem      Size   Used  Avail Capacity  iused    ifree %iused  Mounted on
/dev/disk2s1    56Mi   18Mi   38Mi    33%      512        0  100%   /Volumes/boot
```

書き込まれてるっぽい。SDカードのセットアップにはMacだと[こういう便利なアプリ](http://alltheware.wordpress.com/2012/12/11/easiest-way-sd-card-setup/)もあるっぽい。

## 送電して起動

手元にあったHDMIでディスプレイに繋いで、USBキーボードも接続する。Raspberry Piには電源ボタンはなくて、前述のように給電を開始すると起動する。

![](/img/posts/2013/raspberry-pi/raspbian-cli.jpg)

起動すると初期設定画面が表示されるので、キーボードで設定をしていく。項目もそんなに複雑ではない。やった設定は以下の通り。

- **Expand Filesystem** - SDの残り領域をOS用に使う。
- **Enable Boot to Desktop/Scratch** - CUIで起動するかGUIで起動するかの設定。
- **Internationalisation Options** - Location等の設定。 **Asia/Tokyo** だけ設定。
- **Advanced Options** - SSHを有効にした。

CUIからでも`startx`でGUIを起動できるし、GUIからでもXterminalというソフトでCUIを起動できる。ただし、マウスがない状態でGUIを立ち上げると身動きとれなくなる。かも。僕はGUIを少し楽しんだら、CUIをデフォルト起動にした。これでこのRaspberry PiにSSHでログイン出来るようになったはず。

```bash
$ raspberrypi login:pi
Password raspberry（デフォルトのままの場合）
```

何か困って初期設定画面に戻りたい場合は`sudo raspi-config`を実行すれば良い。

## ネットワークに接続

Raspberry Piをネットワークに繋げるべく、AirMac Expressからイーサネット経由で接続。  

<affiliate-link
  src="https://m.media-amazon.com/images/I/51Utf90oy5L._AC_SL1204_.jpg"
  href="https://www.amazon.co.jp/dp/B076J9NL4D"
  tag="1000ch-22"
  title="エレコム LANケーブル CAT6A 3m 爪折れ防止コネクタ cat6a対応 やわらか ホワイト LD-GPAYC/WH3">
高速光通信に適した、10ギガビット・イーサネットの「10GBASE-T」に対応した、Cat6A準拠LANケーブルです。
Cat6の2倍である500MHzまでの高周波帯域まで対応しており、ノイズ干渉にも強く、高速で安定したネットワーク環境を実現します。
</affiliate-link>

LANケーブルでAirMac Expressと接続して`sudo reboot`でRaspberry Pi再起動。

そうするとIPアドレスが勝手に割り振られて、起動ログの最後にIPアドレスが出力される。`ifconfig`とかでももちろん表示される。これは後ほどMacからのログインに使うので覚えておく。

ネットワークに繋がっているかどうか、`ping`で確認。

```bash
$ ping google.com
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=1 ttl=51 time=13.6 ms
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=2 ttl=52 time=12.7 ms
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=3 ttl=52 time=13.4 ms
64 bytes from kix01s04-in-f7.1e100.net (173.194.38.39): icmp_req=4 ttl=52 time=12.8 ms
```

大丈夫そう。

折角なのでGUIでGoogle Chromeをインストールしようとしたら、アーカイブファイルがどうのこうのとエラーが出るので諦めてChromiumをインストール（ちゃんと`.deb`パッケージが落ちてくるんだけど何故かダメだった）。

```bash
$ sudo apt-get update
$ sudo apt-get install chromium
$ startx
```

ちょっと重たいけど、ブラウジングを出来るところまで確認した。`.deb`パッケージがメンテナンスされていないようで、Chromium古いけど。

![](/img/posts/2013/raspberry-pi/raspbian-chromium-1.jpg)
![](/img/posts/2013/raspberry-pi/raspbian-chromium-2.jpg)

## SSHの確認

今度は、さっきメモしておいたRaspberry PiのIPアドレスにMacからSSHしてみる。

```bash
$ ssh pi@[Raspberry PiのIPアドレス]
```

パスワード聞かれるので、初期値あるいは設定したパスワードを入力すればOK。IPアドレスがもし変わらないのであれば、この時点で一応ディスプレイなしで楽しめるようになった。あと、無線LANでRaspberry Piにアクセスも[WPA使えばいけそう](http://www.myu.ac.jp/~xkozima/lab/raspTutorial1.html)。

## 最後にJenkinsを入れてみる

かなり重いのが予想できるけど、やってみる。

```bash
$ sudo apt-get install jenkins
```

時間かかったけど、インストール完了。Macから`[Raspberry PiのIPアドレス]:8080`にアクセスしてみると…

![](/img/posts/2013/raspberry-pi/raspberrypi-jenkins.png)

OK!!!

今回触れていないが、デフォルトだと **iptablesの設定はされていない** 。ので、ネットワークに繋げている以上、最低限のファイアーウォールは設定した方が良いとは思う。攻撃されて深刻な被害を受けるような使い方は、されなそうではあるけど。

## まとめ

ここまで出来れば、あとはある程度自由に遊べそう。node.jsでアプリサーバーたてるもよし、Jenkinsサーバーにするもよし、Chromiumで海外記事を読み漁るもよし。Raspberry Piとパトランプ的な何かを繋げて、 **Jenkinsのビルド成功をトリガーにパトランプを光らせる** なんてことも。
