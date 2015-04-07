---
layout: post
title: H2Oで試すHTTP2
date: 2015-03-06
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

### libuv

```bash
$ sudo apt-get install git libtool automake
$ git clone https://github.com/libuv/libuv.git
```

```bash
# export variables
$export LANGUAGE=en_US.UTF-8
$export LANG=en_US.UTF-8
$export LC_ALL=en_US.UTF-8

# configure
$ ./autogen.sh
$ ./configure
```

```bash
$ make
$ sudo make install
```

### wslay

```bash
$ git clone https://github.com/tatsuhiro-t/wslay/archive/release-1.0.0.tar.gz
$ tar xzvf release-1.0.0.tar.gz
$ sudo apt-get pkg-config
$ sudo apt-get update
$ sudo apt-get upgrade
```

```bash
# configure
$ autoreconf -i
$ automake
$ autoconf
$ ./configure
```

```bash
$ make
$ sudo make install
```

### h2o

