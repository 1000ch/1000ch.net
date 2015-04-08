---
layout: post
title: H2Oで試すHTTP2
date: 2015-03-09
draft: true
---

# H2Oで試すHTTP2

HTTP2で遊ぶべく、[H2O](http://github.com/h2o/h2o)をVagrantで立てたローカルの仮想環境にインストールしたり、それをAnsibleで自動化したログ。VagrantやAnsibleってそもそもなんぞやという人は[VagrantでCentOSの仮想環境を作ってAnsibleで遊ぶ](https://1000ch.net/posts/2015/vagrant-ansible.html)の方が基礎的なところに触れているので、読んでもらうと良いやも。今回はセキュリティ周りの設定はしていない。

## H2O on Ubuntu

ローカル環境のOSはUbuntu 14.10、その上にH2Oをスタンドアロンサーバーとしてインストールする。

### ビルド時に必要なツール

- git h2o等をリポジトリからクローンする
- libyaml
- cmake h2oのビルド設定時に必要

### H2Oそのものが依存しているライブラリ

- libuv
- wslay
- OpenSSL (1.0.2~)

## インストール作業

の前に、gitのインストールとインストールされているライブラリ等をアップデートしておく。

```bash
$ sudo apt-get install git
$ sudo apt-get update
$ sudo apt-get upgrate
```

### libuv

```bash
# install libtool & automake
$ sudo apt-get install libtool automake
$ git clone https://github.com/libuv/libuv.git

# export variables
$ export LANGUAGE=en_US.UTF-8
$ export LANG=en_US.UTF-8
$ export LC_ALL=en_US.UTF-8

# configure libuv
$ ./autogen.sh
$ ./configure

# build libuv
$ make
$ sudo make install
```

### wslay

```bash
# install pkg-config
$ sudo apt-get pkg-config libssl-dev

# download wslay
$ git clone https://github.com/tatsuhiro-t/wslay.git
$ tar xzvf release-1.0.0.tar.gz
$ cd wslay

# configure wslay
$ autoreconf -i
$ automake
$ autoconf
$ ./configure

# build wslay
$ make
$ sudo make install
```

### h2o

```bash
# install cmake
$ sudo apt-get install cmake libyaml openssl

# download h2o
$ git clone https://github.com/h2o/h2o.git
$ cd h2o

# configure h2o
$ cmake -DOPENSSL_ROOT_DIR=/usr/local/ssl -DOPENSSL_LIBRARIES=/usr/local/ssl/lib
$ cmake -DCMAKE_INSTALL_PREFIX=/usr/local .

# build h2o
$ make
$ sudo make install
```

## Ansibleで自動化する

[1000ch/http2-sandbox](https://github.com/1000ch/http2-sandbox)に置いておいた。