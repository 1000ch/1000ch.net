---
title: Swift 3 における非同期処理
date: 2016-10-22
---

自作の [iOS クライアント](https://itunes.apple.com/app/id1090705533)のコードを [Swift 3 に移行した](https://github.com/1000ch/PinFeed/commit/d3332b09f3613867502d851fd0d337284d1c2b16)。その時に非同期処理について色々調べたのでメモ。

## GCD (Grand Central Dispatch)

macOS や iOS といった Apple のプラットフォームにおいて非同期で処理したい場合は GCD (Grand Central Dispatch) という仕組みを使う。

UI に関する更新はメインスレッドで行う必要があるので `dispatch_get_main_queue()` で取得するメインキューに処理を追加し、通信などの非同期でも差し支えない処理はグローバルディスパッチキューという並列処理用のキューを `dispatch_get_global_queue()` で参照する。それぞれのキューに処理を追加するには同期か非同期かを、 `dispatch_sync()` と `dispatch_async()` で指定できる。

```swift
dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), {
    // グローバルキューで実行される

    dispatch_async(dispatch_get_main_queue(), {
        // メインキューで実行される
    });
});
```

`dispatch_sync()` で処理を追加すると同期的に実行されるので、追加した処理が終わるまで次の処理に進まない。逆に `dispatch_async()` で追加された場合、追加された処理の実行完了を待たずに次の処理に進む。

Swift の GCD については[Swift GCD入門](http://qiita.com/ShoichiKuraoka/items/bb2a280688d29de3ff18)という記事により詳しく書かれている。

## DispatchQueueクラスが追加された

これを[iOS+Swiftの非同期処理のヘルパークラス](/posts/2016/swift-async-dispatcher.html)のような形でラップしていたが、 Swift 3 からは [`DispatchQueue`](https://developer.apple.com/reference/dispatch/dispatchqueue) というクラスが追加されている。これを使うと非同期処理は次のように書ける。

```swift
DispatchQueue.global().async {
    // グローバルキューで実行される

    DispatchQueue.main.async {
        // メインキューで実行される
    }
}
```

メインキューを取得する `dispatch_get_main_queue()` は `DispatchQueue.main` に対応し、グローバルキューを取得する `dispatch_get_global_queue()` は `DispatchQueue.global()` に対応する。グローバルキューの取得時の優先度指定は `DispatchQueue.global()` に引数を渡せるようになっており、 enum の [`DispatchQoS.QoSClass`](https://developer.apple.com/reference/dispatch/dispatchqos.qosclass) を指定する。

- `userInteractive`: The user-interactive quality of service class.
- `userInitiated`: The user-initiated quality of service class.
- `default`: The default quality of service class.
- `utility`: The utility quality of service class.
- `background`: The background quality of service class
- `unspecified`: The absence of a quality of service class.

取得したキューには `sync` や `async` 、 `asyncAfter` といった関数が生えているので、同期で処理するのか非同期で処理するのかによって決める。

これによって `AsyncDispatcher` でやりたかった「より Swift らしいコード」は達成されてしまったので、こちらを使うようにした。
