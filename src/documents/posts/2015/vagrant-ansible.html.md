---
layout: post
title: VagrantでCentOSの仮想環境を作ってAnsibleで遊ぶ
date: 2015-1-9
---

# VagrantでCentOSの仮想環境を作ってAnsibleで遊ぶ

Vagrantは今更説明するまでもないけど、仮想環境の作成や起動・破棄を自動化したりするツール。VagrantはChefやAnsibleといったようなプロビジョニングツールとも連携可能なのでそれも少し。

## Vagrantで仮想環境を作る

自身には仮想化する機能を備えておらず、仮想化ソフトウェアとしてVirtualBoxやVMWareなどを使う。今回はVagrant + VirtualBoxでCentOSの仮想環境を作ってみる。

以下のサイトに環境ごとのインストーラがあるので、ダウンロードしてインストールする。

- [Vagrant](https://www.vagrantup.com/)
- [Oracle VM VirtualBox](https://www.virtualbox.org/)

### CentOS 6のBoxファイルをダウンロード

Vagrantを使う準備は出来たので、今度はどのOSで仮想化するか決める。VagrantではOSイメージをBoxと呼ばれる形式で管理する。有志で配布されているBoxの一覧は以下にあるので、違うOSで試したい場合はそちらを選んでくださいまし。

- [Vagrantbox.es](http://www.vagrantbox.es/)

```bash
# boxファイルのダウンロード
$ vagrant box add centos6 https://github.com/2creatives/vagrant-centos/releases/download/v6.5.3/centos65-x86_64-20140116.box

# Vagrantに保持されてるboxのリスト
$ vagrant box list

# ダウンロードしてきたcentos6を使って初期化
$ vagrant init centos6
```

`centos6`というキーに対して`.box`ファイルが紐づいて、そのダウンロードしてきたBoxファイルでVagrantプロジェクトの初期化をしている。これで`Vagrantfile`が作成され、仮想環境の起動の準備が完了してしまう。簡単すぎる。

### 起動と終了と削除と仮想環境へのログイン

起動と終了は`up`と`halt`で行う。起動するとデフォルトだと`2222`ポートで仮想環境が立ち上がり、VirtualBoxを見るとインスタンスが追加されているのが確認できる。

```bash
# 仮想環境の起動
$ vagrant up

# 仮想環境の終了
$ vagrant halt

# 仮想環境の終了と削除
$ vagrant destroy
```

ログインは`ssh`コマンド。`vagrant`ユーザーでログインし、もちろんルートにもスイッチできる。`sudo su -`とか。

```bash
# 仮想環境へSSHログイン
$ vagrant ssh
```

### Vagrantfileの中身

`vagrant init`で作成されたファイルは設定可能な箇所が色々とコメントアウトされている。コメントアウトされている内容が、各項目の初期値におおよそなっている。以下は抜粋。

```ruby
Vagrant.configure(2) do |config|
  # vagrant box addで取得したboxの指定
  config.vm.box = "centos6"

  # ローカルの8080へのアクセスが仮想環境の80へポートフォワードされる
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # 仮想環境のプライベートIPアドレスを指定
  config.vm.network "private_network", ip: "192.168.33.10"

  # 仮想環境に同期（マウント）させたいローカル環境のディレクトリ
  # デフォルトでカレントディレクトリが仮想環境の/vagrantにマウントされる
  # config.vm.synced_folder "../data", "/vagrant_data"
end
```

ここまで出来たら、仮想環境にログインして、煮るなり焼くなりしてOK。間違えて環境を壊しても、`vagrant destroy`で削除して、指定したBoxとVagrantfileでの設定までは何度でも適用できる。

詳しい設定は[公式ドキュメント](https://docs.vagrantup.com/v2/vagrantfile/)をどうぞ。

## Ansibleでプロビジョニング

プロビジョニングには[Ansible](http://docs.ansible.com/)を使ってみる。AnsibleはHomebrewなどでインストールしておくこと。

```bash
$ brew install ansible
```

プロビジョニングツールとしてはChefやらPuppetやらもあって、それらとも連携出来る。ChefとAnsibleの両方を使ったの感想として、ChefはRubyのコードベースで色々出来るので設定の自由度等は高いけど、学習コスト高め且つ設定等も複雑で膨らみがちな印象。Ansibleは、YAMLでコマンドラインベースの命令を設定するので、シンプルでわかりやすかった。僕はインフラ屋じゃないので、使い込む必要性を問われていないっていう背景はありつつ、やった範囲ではAnsibleで出来ないことがなかったのでAnsibleの感触が良かったっていうだけ。Chefがイケてないとかではない。

### VagrantfileでAnsibleを使う準備

ホスト名の指定`config.vm.hostname`と、プロビジョニングの設定を`config.vm.provision`に書いている。Ansibleにおいて指定環境に適用させたい設定はプレイブックと呼ばれ、ここでは`vagrant-centos6.yml`としておく。`ansible.inventory_path`には`hosts`というファイル名を指定しているが、設定を適用させるホストを列挙したインベントリーファイルというものになる。`hosts`という名前でなくとも良い。

```ruby
Vagrant.configure(2) do |config|

  config.vm.box = "centos6"
  config.vm.hostname = "vagrant-centos6"

  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "vagrant-centos6.yml"
    ansible.inventory_path = "hosts"
    ansible.limit = "all"
    ansible.verbose = "v"
  end

end
```

### インベントリーファイル

今回は`hosts`というファイル名で、以下のようにVagrantで用意した仮想環境のホスト名を指定した。

```ini
[vagrant-centos6] 192.168.33.10
```

### プレイブック

`vagrant-centos6.yml`の中身は以下のようになっている。

```yml
- hosts: vagrant-centos6   sudo: yes
  tasks:
    - debug: This is a message in tasks   roles:
    - common
```

`hosts`は適用先のホスト名で、`sudo`は管理者実行するかどうか。設定の実行は`tasks`ないし、それらを分割管理する`roles`という属性に指定する。`tasks`には実行したいことをシェルっぽく書ける。`yum`を実行したいのであれば、以下の様な雰囲気。

```yml
- name: be sure httpd is installed using yum
  yum: name=httpd state=installed
```

タスクを羅列するだけでも良いけど、項目ごとに単位化したくなるのがエンジニアの性なので、`roles`を使う。今回は`common`というロールを作った。このロールの構成には、`roles/common/tasks`というフォルダ階層が要る。その中に、実行のエントリポイントとなる`main.yml`を配置するだけ。

Ansibleとしては、他のタスクをインクルード出来たり、変数宣言等が可能。詳細は公式サイトを確認してください。

- [Best Practices - Ansible Documentation](http://docs.ansible.com/playbooks_best_practices.html)
- [YAML Syntax - Ansible Documentation](http://docs.ansible.com/YAMLSyntax.html)

また、今回やったような最低限の連携を少し応用して、WebPageTestを仮想環境に立てるサンプルが[1000ch/webpagetest-local](https://github.com/1000ch/webpagetest-local)に置いてある。と、言っても、テストエージェントとの疎通まではしておらず、Webアプリ側だけ閲覧可能というだけですが、悪しからず。