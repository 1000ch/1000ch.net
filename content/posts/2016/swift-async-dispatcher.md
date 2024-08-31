---
title: iOS+Swiftの非同期処理のヘルパークラス
date: 2016-03-09
---

# iOS+Swiftの非同期処理のヘルパークラス

iOSではネットワークを介するような処理は非同期で実行するように書かないと、メインスレッドを専有されて描画処理が大変なことになる。例えば以下の様に画像を`NSURL` → `NSData`経由で取得するケース。

```swift
if let imageURL = NSURL(string: "https://1000ch.net/img/1000ch.png") {
    if let imageData = NSData(contentsOfURL: imageURL) {
        imageView?.image = UIImage(data: imageData)
    }
}
```

こういうのをTableViewのdelegateあたりで実行していると逐次実行されてまともにスクロールできない。ので、別スレッドで実行して良きタイミングでメインスレッドにdispatchする必要がでてくるが、生で`dispatch_async()`を駆使するとややコードが汚い。そんな時のために簡易的なヘルパー関数を2つ用意した。

```swift
import Foundation

class AsyncDispatcher {
    static func main(closure: () -> ()) {
        dispatch_async(dispatch_get_main_queue(), closure)
    }

    static func global(closure: () -> ()) {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), closure)
    }
}
```

これを使って先程の処理を非同期にすると、（`NSURLSession`を使う云々はさておき）以下のように記述できる。

```swift
if let imageURL = NSURL(string: "https://1000ch.net/img/1000ch.png") {
    AsyncDispatcher.global {
        if let imageData = NSData(contentsOfURL: imageURL) {
            AsyncDispatcher.main {
                imageView?.image = UIImage(data: imageData)
            }
        }
    }
}
```
