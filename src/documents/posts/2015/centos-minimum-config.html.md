---
layout: post
title: CentOSに対して行う最低限の設定
date: 2015-1-8
---

# CentOSに対して行う最低限の設定

メモを掘り起こしたので、思い出すついでに記事にしてみる。VPSを借りて、ドメイン充ててみたり、ブログを置いてみたり、メールサーバー立ててみたりしていた当時（2年前）のメモなので、もうちょっとナウいやり方があるのかもしれないけど、とりあえず。ツッコミ歓迎です。

ユーザーの作成と、SSHのログイン周りに制限をかけている。もちろん、サーバーを大量に用意するようなWeb現場でこういった設定をコツコツやるなんてことはまず無いけど、前提知識で持っているべきものだとは思う。

ので、chefだのansibleだのfabricだのについては触れていません。

## サーバーへのログイン

sshコマンドの引数に、IPアドレスなりドメインなりのホスト名を渡してログインする。

```bash
$ ssh [hostname]
```

ログインすると`~/.ssh/known_host`に、ホスト名とRSA公開鍵のフィンガープリントが記録される。ので、その後、公開鍵を変更して同一のホストにログインしようとすると失敗する。その場合は、`~/.ssh/known_host`の該当のホスト名が記録されている行を削除してからやると良い。

## ユーザーの作成

ログイン先のOSに`root`ではないユーザーを作成して、パスワードを設定する。

### ユーザーを追加

```bash
$ useradd [username]
```

ユーザーの有効期限とかグループとかログインシェルといったような設定は`useradd`のオプションで可能なので、ググってみてください。

### パスワードを設定

```bash
$ passwd [username]
```

## SSHログイン周りの設定

セキュリティを考慮して以下の2点を実施。`sshd`の設定を変更したいので`/etc/ssh/sshd_config`を編集。以下の修正をやったら、忘れずにデーモンの再起動をして変更を適用すること。

```bash
# sshdの設定ファイルを編集
$ vim /etc/ssh/sshd_config

# sshdを再起動
$ /etc/init.d/sshd restart
```

### rootログインの拒否

もし`root`でサーバーにログインされてしまうと大変なことになるのでやっておく。

```
PermitRootLogin no
```

### sshポートの変更

不正ログインのリスクを低減させる意味で、デフォルトのポートである`22`から変えるべく`Port`の値を変更。

```
Port [portnumber]
```

## ローカルの秘密鍵を利用してログインする設定

今回は、そのサーバー用のSSHキーを用意する。サーバーからログアウトしておく。

### SSHキーの作成

ローカルでSSHキーを作成。

```bash
$ ssh-keygen -t rsa
$ Enter file in which to save the key...: hoge_rsa
```

`-t`で指定しているのは鍵の種類。ファイル名は`hoge_rsa`としている。すると`~/.ssh`配下に`hoge_rsa`とその公開鍵`hoge_rsa.pub`が作成されているはず。

### 公開鍵をサーバーに登録する

先程作成した鍵ペアのうち、公開鍵をVPSに持っていてもらう。まず、サーバーにログインし、ホームディレクトリに`.ssh`フォルダを作成。

```bash
$ cd ~
$ mkdir .ssh
$ chmod 700 .ssh
```

再びログアウトして、今度はローカルにある公開鍵`hoge_rsa.pub`をサーバーにコピー。先程の手順で`22`ポートではログイン不可になっているので、変更後のポート番号を指定する必要有り。

```bash
$ scp -P [portnumber] ~/.ssh/hoge_rsa.pub [username]@[hostname]:.
```

またまたサーバーにログインして、`scp`でコピーした公開鍵を`authorized_keys`に登録。

```bash
$ cat hoge_rsa.pub > ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/authorized_keys
```

これで公開鍵の登録自体はおしまい。後処理として、`authorized_keys`に登録が済んでいる公開鍵を削除して、`sshd`を再起動。

```bash
$ rm hoge_rsa.pub
$ /etc/init.d/sshd restart
```

### 実際に秘密鍵でログインする

`ssh`の`-i`オプションで秘密鍵を指定。

```bash
$ ssh -p [portnumber] -i ~/.ssh/hoge_rsa [username]@[hostname]
```

## ファイアーウォール

`iptables`で最低限のファイヤーウォールを設定。`iptables`でやるの、既に古いやり方なんだろうけど。

`/etc/sysconfig`配下の`iptables`ファイルを編集。なかったら作成。

```bash
$ cd /etc/sysconfig
$ vim iptables
```

`iptables`ファイルの中身のサンプル。

```
*filter
-A INPUT -i lo -j ACCEPT
-A INPUT -s 10.0.0.0/255.0.0.0 -j DROP
-A INPUT -s 172.16.0.0/255.240.0.0 -j DROP
-A INPUT -s 192.168.0.0/255.255.0.0 -j DROP
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m tcp --dport [portnumber] -j ACCEPT
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A OUTPUT -o lo -j ACCEPT
COMMIT
```

保存したら、`iptables`を再起動して設定を反映。

```bash
$ /etc/rc.d/init.d/iptables restart
```

## 余談

Webサーバーの環境を用意するには、用途に応じて色々な方法がある。静的ファイルのみを置けたり、Wordpressが設置出来る（php+MySQL+...）といった所謂レンタルサーバーだったり、[Parse](https://parse.com/)のような[SaaS](http://ja.wikipedia.org/wiki/SaaS)だったり、[Heroku](http://heroku.com/)に代表される[PaaS](http://ja.wikipedia.org/wiki/Platform_as_a_Service)だったり。AmazonのS3なりEC2なり。

とにかく、CentOSを自前で建てる必要がないケースも往々にしてあると思う。でもこうやってVPSを借りてWebサーバーを立ててみるように（もちろんVirtualBox+Vagrantでも）、原始的な部分を経験することは、Webに関する様々な事象の体系的な理解に必ず繋がる。

転職して間もない頃にインフラの知識がある人をとっ捕まえてやったんだけど、`vim`の基本操作とかのコマンドラインの初歩的な素養は此処で得たし、今更ながらやっててよかったと思ってる（小並感）。