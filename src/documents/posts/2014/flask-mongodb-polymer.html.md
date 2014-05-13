---
layout: post
title: PythonとMongoDBとPolymerでRSSリーダーを作った
date: 2014-03-12
---

# PythonとMongoDBとPolymerでRSSリーダーを作った

## 1ヶ月以上ぶりの更新…

Pythonで何かアプリ書きたいなと思ってはいたので、RSSリーダーを作りました。
フレームワークは薄いやつが良かったのでFlaskを、データはMongoDBに突っ込んでいます。
実物はHerokuにデプロイしてあります。

- [Cobra](http://cobra.herokuapp.com)
- [1000ch/cobra](https://github.com/1000ch/cobra/tree/development)

Flask + MongoDBのところまで実装して暫く放置していましたが、最近思いつきでPolymerをねじ込んだので記事にしてみる。

## やってること

- スケジューラでopmlに登録してあるRSSから記事を取得しMongoDBに保存
- トップページで50件ずつ記事の表示 & 非同期で50件づつ取得
- 購読しているRSSで表示する記事をフィルタ

Polymer入れる前はキープしてあるデータをごっそり表示してました。
正直50件ずつ取得にしたことで使い心地が落ちた。使いたいだけ。

**Opml(XML)のパース→記事の取得** に非常に時間が掛かるので、何らかのデータストアに入れなければ話にならないのと、
それを[Heroku Scheduler](https://addons.heroku.com/marketplace/scheduler)で定期実行し、実際にWebを見る時は何もしない。この辺はごく普通と思われる構成です。
あと遊び半分でNew Relicも入れてある。ここまで色々遊べて無料。Herokuっていいですねー。

## PythonとFlask

これはハンズオンをやったことがあったので、実装は非常に簡単でした。

- [Flask](http://flask.pocoo.org/)
- [Flask ハンズオン](http://methane.github.io/flask-handson/)

Pythonは、プロパティアクセスとかリテラル（配列・オブジェクト）がJavaScriptとほぼ同じだし、
JSやってる人ならあまり違和感なくやれるのではと思ったりしました。

```js
// JavaScriptでのArrayとObject
var array = [0, 1, 2];
var object = {
  key: 'value'
};
// 出力
console.log(object.key);
```

```python
# PythonでのArrayとObject
array = [0, 1, 2]
object = {
  key: 'value'
}
# 出力
print(object.key);
```

~~似てると思うのは俺だけかも。~~

## MongoDBへのアクセス

MongoDBへのアクセスはpymongoでやってます。MongoDBを使ったアプリ書いたことありませんでしたが、これもまた楽に実装できました。
ローカルでデバッグするときはHomebrewでインストールしたMongoを実行しておくのと、Herokuのときは環境変数からURLを得るようにする。

```sh
# install mongodb
$ brew install mongo

# run mongo
$ mongod

# run application
$ python run.py
```

```python
class EntryDAO:

    def __init__(self):
        # get url string from env
        url = os.environ.get('MONGOHQ_URL')

        if url:
            client = pymongo.MongoClient(url)
            self.db = client[urlparse(url).path[1:]]
        else:
            client = pymongo.MongoClient('localhost', 27017)
            self.db = client.db
```

Herokuの時はGunicornで起動。

## [Flask RESTFul](http://flask-restful.readthedocs.org/en/latest/)

最初はMongoDBに入れておいたデータを全て返して表示しておくだけだったが、[RESTなAPIも用意](https://github.com/1000ch/cobra/blob/development/cobra/api.py)してみた。
普通にHTMLテンプレートにデータ渡して描画させてるときは気にかけてなかったけど、
Pythonの`list`オブジェクトを素直に`jsonify()`出来なくて、暫く中断。
結果的にはMongoDBから取得しているために、`ObjectId()`があったのが要因だった。ので、[素直に`del`してる](https://github.com/1000ch/cobra/blob/development/cobra/api.py#l27)。
JavaScriptでいうところのPluckとかMap的なことをしたい。これは後で書き直すと思う…

- [Flask RESTFul](http://flask-restful.readthedocs.org/en/latest/)

`flask.jsonify()`はFlaskが提供するユーティリティで、組み込みの`json.dumps()`と何が違うんだろうと思ったら、
[引数周りを上手いことラップしたりmimetypeの指定をしてる](http://stackoverflow.com/questions/7907596/json-dumps-vs-flask-jsonify)らしい。薄めのラッパーだった。

URLのマッピングは`/api/get/<int:skip>/<int:limit>`とし、`/api/get/10/10`とも出来たのですが、
個人的にQuery Stringの方がなんかしっくりくるので`reqparse.RequestParser()`でパースしてます。

## Polymerのおまけ

繰り返しですが、これは完全に使いたかっただけ。とりあえずレベルで`<polymer-ajax>`を試したあとに
いくつかの課題を残しつつ、記事の一覧（画面左）を`<x-entry>`というカスタムエレメント化。

### `<polymer-ajax>`

リクエストURLに`"/api/get?skip={{skip}}&limit={{limit}}"`という形で変数を埋め、
Ajaxで取得する毎にskipと書き換えているので、ささやかながら2way-bindingの恩恵を受けている。以下課題とメモ。

### テンプレートオブジェクトが残る…

Ajaxで取得したデータを以下に渡して描画。

```html
<polymer-element name="x-entry" attributes="skip limit filter">
  <template>
    <div class="list-group">
      <template id="entries" repeat="{{ entry in entries }}" index="i">
        <a href="{{entry.link}}" target="_blank" class="list-group-item" data-feed="{{entry.feedTitle}}">
          <h4 class="list-group-item-heading">{{entry.title}}</h4>
          <p class="list-group-item-text">
            <date>{{entry.date}}</date> - {{entry.feedTitle}}
          </p>
        </a>
      </template>
    </div>
    ...
</polymer-element>
```

`repeat="{{ entry in entries }}"`で記事の数だけループさせたはまではよかったのだが、
`<template>`がデータとして残るので、CSSが意図しない適用になった。（例えば`:first-child`のところとか）
これはテンプレート側では回避不可能なんでしょうか？

### `ready`でフィルタシンタックスが参照出来ない？

画面右のUIで表示する記事のフィルタリングをしていますが、その絞り込みがお粗末になってしまった。
上で述べたループ定義を`repeat="{{ entry in entries | filterEntry }}"`とし、
`filterEntry`関数を用意すれば良いような気がしたけど、どうも`ready`のタイミングだとエラーが出て参照できない模様。
これもどうにかしたい…

### プロパティの監視

`attributeChanged`でも取れるけど、`propertyNameChanged`でもいける。つまり`filter`というattributeがある場合に、

```js
attributeChanged: function attributeChangedCallback(changedAttr) {
  switch (changedAttr) {
    case 'filter':
      console.log('filter property is changed.');
      break;
  }
},
```

と書いていたのは以下のように書き換え可能。ダイナミックだ。

```js
filterChanged: function filterChangedCallback(oldValue, newValue) {
  console.log('filter property is changed.');
},
```

- [Observing properties](http://www.polymer-project.org/docs/polymer/polymer.html#observeprops)

### オブジェクトや配列の初期化は`created`でやったほうがベター

らしいです。

```js
Polymer('x-foo', {
  // ここで初期化するとprototypeに紐付いて予期しない動作を起こす
  //array: [],
  //object: {},
  created: function() {
    // ここでやったほうが良い
    this.array = [];
    this.object = {};
  }
});
```

- [Adding public properties and methods](http://www.polymer-project.org/docs/polymer/polymer.html#propertiesmethods)

## その他感想

Polymer要素が多めな割にあまりスコープの恩恵は受けていない作りになってます。
サーバー側も結構適当な作りなのでアドバイス欲しいです。
