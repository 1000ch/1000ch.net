---
title: Docker事始め作業ログ
date: 2015-09-14
---

# Docker事始め作業ログ

やってみよう系の記事は既にチラホラあるけど、手元の環境に合わせて書き直したただの作業ログ。

## [Docker](https://www.docker.com)とは

- 従来のような物理的な仮想化ではなくコンテナ型仮想化を実現するソフトウェア
- 例えばLinuxの上に独立したLinuxをシステムを起動できる
  - ハードウェアをシミュレートするのではなくLXCという技術を使ってリソースを隔離する
  - ファイルシステムやプロセス・CPUを共有するので省メモリ・低コストで仮想化できる

ざっくりこのような感じだが、パッとこない場合は以下の記事が参考になる。

- [15分で分かるLXC（Linux Containers）の仕組みと基本的な使い方](http://knowledge.sakura.ad.jp/tech/2108/)
- [クラウド時代のオープンソース実践活用 | 第41回　Linuxコンテナ(LXC)の基礎をまとめ直す](http://www.school.ctc-g.co.jp/columns/nakai/nakai41.html)

## Mac OS XにDocker環境を準備する

以下のものをインストールする必要アリ。公式で配布されている[Docker Toolbox](https://www.docker.com/toolbox)でも良いが、インストーラ使うとroot領域いじられそうなので、VirtualBox以外はHomebrew経由でインストールする。boot2dockerは使わない。

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) v5.0.4
- [docker](https://github.com/docker/docker) v1.8.2
- [docker-machine](https://github.com/docker/machine) v0.4.1

```bash
$ brew install docker
$ brew install docker-machine
```

あとは[公式のチュートリアル](https://docs.docker.com/installation/mac/)に沿ってDockerの振る舞いを理解していく。

## Docker Machineで仮想マシンを作成する

Docker Machineで仮想マシンを立てる。VirtualBoxを使うので、`--driver`で指定し、マシン名も引数に取る（ここではlocalというマシン名を指定）。作成すると`~/.docker/machine/machines/local`というフォルダが作成され、マシンの各種設定が保存される。

```bash
$ docker-machine create --driver virtualbox local
```

Docker Machineで作成したマシンは`ls`コマンドでリストアップできる。マシンを削除するには`rm`コマンドで。

```bash
$ docker-machine ls
NAME    ACTIVE   DRIVER       STATE     URL                         SWARM
local            virtualbox   Running   tcp://192.168.99.100:2376

$ docker-machine rm local
```

### 仮想マシンの各種環境変数

作成したマシンの各種環境変数は`env`コマンドで取得可能。出力結果を`eval`するとそのまま変数を定義できる。

```bash
$ docker-machine env local
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/1000ch/.docker/machine/machines/local"
export DOCKER_MACHINE_NAME="local"
# Run this command to configure your shell:
# eval "$(docker-machine env local)"
```

### hello-worldコンテナを実行してみる

先程の`env`コマンドで得られる環境変数を`export`した上で、いよいよDockerでコンテナを起動する。今回は`hello-world`というコンテナを指定しているが、実行に成功するとハローワールドが表示される。

```bash
$ eval "$(docker-machine env local)"
$ docker run hello-world
```

ここでは`hello-world`というコンテナを指定しているが、以下の手順が実施されている。Docketクライアントはコマンドを叩いているターミナルということになる。

1. DockerクライアントがDockerデーモンに問い合わせる
2. Dockerデーモンが`hello-world`イメージをDocker Hubからダウンロードする
3. Docketデーモンがダウンロードしてきたイメージから新たにコンテナを作成する
4. Dockerデーモンがコンテナを標準出力をDocketクライアントに流す

## nginxコンテナを試してみる

バックグラウンドで実行させるために`-d`（`--detach=false`）を、ランダムにポートを割り当てるために`-P`（`--publish-all=false`）を、明示的に名前を付与すべく`--name`も付けて実行する。nginxのプロセスは終了するまで実行され続けるので、`-d`を付けないとターミナルが持っていかれる。

```bash
$ docker run -d -P --name nginx-web nginx
```

### 起動中のコンテナ一覧の表示、コンテナの開始と停止と削除

停止には`stop`コマンドを、削除には`rm`コマンドを使う。それぞれコンテナのID指定するが、コンテナIDは先程の`run`コマンドの`-d`オプションで出力される他、`ps`コマンドの出力結果にも表示される。尚、コンテナに名前が指定されていればコンテナIDではなくコンテナ名を指定しても実行できる。

```bash
# 起動中のコンテナ一覧を表示する
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                           NAMES
ba377526b912        nginx               "nginx -g 'daemon off"   26 seconds ago      Up 2 seconds        0.0.0.0:32775->80/tcp, 0.0.0.0:32774->443/tcp   nginx-web

# 指定したコンテナを停止する
$ docker stop ba377526b912

# 指定したコンテナを開始する
$ docker start ba377526b912

# 指定したコンテナを削除する
$ docker rm ba377526b912
```

### nginxがホストしているページをブラウザで表示する

`port`コマンドでコンテナに対してマッピングされているポート番号を一覧化できる。先程`nginx-web`という名前でコンテナを起動したので、それがどのポートに割り当てられているかを確認してみる。

```bash
$ docker port nginx-web
443/tcp -> 0.0.0.0:32774
80/tcp -> 0.0.0.0:32775
```

コンテナの443ポートがローカルホスト（Dockerクライアント）の32774に、コンテナの80ポートがローカルホスト32775にマッピングされているのがわかる。

### マシンのIPアドレスを調べる

先程のコンテナのIPアドレスはDockerのホストアドレスではないので、nginxにはアクセスできない。Docker Machineで作成したマシンのIPアドレスを`ip`コマンドを使って調べる。`echo $DOCKER_HOST`あたりを実行すると、`docker-machine env`で出力された`DOCKER_HOST`のIPと一致しているのがわかる。

```bash
$ docker-machine ip local
192.168.99.100

$ echo $DOCKER_HOST
tcp://192.168.99.100:2376
```

### ブラウザでnginxでホストしているページへアクセスする

ここまででnginxが`192.168.99.100:32775`を待ち構えていることがわかるので、 http://192.168.99.100:32775 にアクセスしてみる。

### ローカルのディレクトリをコンテナにマウントする

次に、ローカルのディレクトリをコンテナにマウントしてみる。適当なディレクトリに`index.html`を配置して、配置したディレクトリをnginxのホストディレクトリにマウントする。それが出来れば先程のURLで`index.html`の内容が表示されるはずだ。今回はユーザーディレクトリ配下に`foo`というフォルダを用意し、その中に`index.html`を配置した。HTMLの中身は何でも良い。

コンテナの再作成からやるので、`docker ps`で起動しているコンテナのコンテナIDを取得し、`docker stop [コンテナID]`→`docker rm [コンテナID]`で先程作成したコンテナ（`nginx-web`）を削除する。削除せずに違う名前でも良いんだけど、テストがてら。

```bash
$ docker ps
...

$ docker stop 4bf9cfc2fe49
$ docker rm 4bf9cfc2fe49
```

削除したら、以下のコマンドで再度nginxのコンテナを作成する。さっきと違うのは、`-v`オプションでマウントするディレクトリをしている点。ユーザーディレクトリ配下の`foo`フォルダをマウントするので`$HOME/foo`とし、マウント先にはnginxがホストするディレクトリである`/usr/share/nginx/html`を指定している。

```bash
$ docker run -d -P -v $HOME/foo:/usr/share/nginx/html --name nginx-web nginx
```

起動したら再び`docker port nginx-web`で割り当てられたポート番号をチェックし、ブラウザでアクセスしてみる。用意した`index.html`の中身が表示されればひと通り成功。

```bash
$ docker port nginx-web
443/tcp -> 0.0.0.0:32776
80/tcp -> 0.0.0.0:32777
# ブラウザで http://192.168.99.100:32777 にアクセスしてみる
```

## まとめ

- Docker（`docker`コマンド）でコンテナとそのホストOSを管理する
- Docker Machine（`docker-machine`）でホストOSとなるマシンを管理する
- Docker Hubにマシンイメージが集積されている
    - DockerからPullしてコンテナとして利用する
    - DockerでローカルのイメージをComposeして配布する
