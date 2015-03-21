---
layout: post
title: Macのアプリにバイナリをバンドルする
date: 2015-03-21
---

# Macのアプリにバイナリをバンドルする

[WebPonize](/posts/2015/weponize.html)には画像をWebPフォーマットに変換するために、WebM Projectにて配布されているWebPのライブラリ群をバンドルする必要があった。

- [A new image format for the Web - WebP — Google Developers](https://developers.google.com/speed/webp/?csw=1)

## `cwebp`をバンドルして実行するアプローチ

実行可能形式の`cwebp`をプロジェクトに配置して、Swiftから実行する。バンドルされた`cwebp`への参照は`NSBundle`を、実行は`NSTask`を使えばできる。以下の様な雰囲気。

```swift
func execute() -> String {
    let task = NSTask()
    let pipe = NSPipe()
      
    task.launchPath = bundle.pathForResource("cwebp", ofType: "")
    task.currentDirectoryPath = "~"
    task.arguments = "-q 80 input.png -o output.webp"
    task.standardOutput = pipe
    task.launch()
        
    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    return NSString(data: data, encoding: NSUTF8StringEncoding)!
}
```

これは汎用的に使えるように[1000ch/BinaryWrapper](http://github.com/1000ch/BinaryWrapper)として切り出してみた。

## iTunes Connectにsubmitできない

いざMacのストアにsubmitしようとすると、同梱物に実行可能ファイルがあるので怒られる。厳密に言えば、その実行可能ファイルにも自分（ここでは私）が書いたプログラムの一部だということをセキュリティ的に証明する必要がある。よくよく考えてみれば正体不明な実行可能ファイルをバンドルできてしまったら大変なことになりそうだ。納得。

自分で書いているSwiftのコード（というかコンパイルした成果物）に対してはCode Signと呼ばれるMacのディベロッパーとしてiTunes Connectに登録すると得られる証明書が、Xcodeがビルド時に付与される。

## コンパイル済バイナリへのCode Sign

`cwebp`に自分のCode Signを付与することが良い事か悪い事かは一旦置いておいて、できるかどうか試した。

```bash
$ codesign --entitlements ./cwebp.entitlements -s "登録してあるディベロッパー名" ./cwebp
$ codesign --display --entitlements - ./cwebp
```

無事に(?)付与できた。

`cwebp`にCode Signが付与された状態でMacのストアにsubmitできるかどうか試したが、できなかった。今回は`cwebp`がコンパイル済のもので試したけど、ソースコードからmakeする途中でやってもたぶん同じことになると思う。予想だけど。

バイナリとCode Signの関係については、ImageAlphaやImageOptimも同じことが該当していると予想している。ImageAlphaは`pngquant`、ImageOptimは`optipng`やら`jpegoptim`その他をバンドルしているが、それらのバイナリはMacにバンドルされる想定のObjective-C / Swiftのプログラムというわけではない。

ちなみに、ストアへのsubmitができなかっただけで`.app`形式へのエクスポートは可能。この場合、表面上は正体不明のバイナリを含んでいるアプリということになる。WebPへのコンバート（`cwebp`の実行）も正常に行われることから、ImageAlphaやImageOptimはWebからのダウンロードによる配布形式をとっているんだと思う。予想だけど。

## `libwebp.a`をリンクして実行するアプローチ

`cwebp`は実行可能形式だけど、ライブラリとして利用するための`libwebp.a`とヘッダーファイル群（`encode.h`、`decode.h`など）も配布されている。

- [Downloading and Installing WebP - WebP — Google Developers](https://developers.google.com/speed/webp/download)

これらのファイルをXcodeのプロジェクトに追加したあとは、ヘッダーファイルを作成し、`encode.h`と`decode.h`をインポートする。`libwebp.a`へのリンクは自動で行われた。

```h
#ifndef SampleApp_libwebp_h
#define SampleApp_libwebp_h

#import "libwebp/encode.h"
#import "libwebp/decode.h"

#endif
```

作成したら、プロジェクト設定の **Build Settings** → **Swift Compiler - Code Generation** → **Objective-C Bridging Header** に作成したヘッダーファイルのパスを指定。

![](/img/posts/bundle-binary-in-mac-app/xcode.png)

先程のようにコマンドラインっぽく実行するわけではなく、ヘッダーファイルで定義されている構造体に沿ってWebPへの変換作業をする。

- [WebP API Documentation - WebP — Google Developers](https://developers.google.com/speed/webp/docs/api)

```swift
let image: CGImage? = getCGImage(image)
let provider: CGDataProviderRef = CGImageGetDataProvider(image)
let bitmap: CFDataRef = CGDataProviderCopyData(provider)
    
let rgb: UnsafePointer<UInt8> = CFDataGetBytePtr(bitmap)
let width: Int32 = Int32(image.size.width)
let height: Int32 = Int32(image.size.height)
let stride: Int32 = Int32(CGImageGetBytesPerRow(image))
let qualityFactor: Float = Float(80)

var webp: NSData
var output: UnsafeMutablePointer<UInt8> = nil
var size: size_t = WebPEncodeRGBA(rgb, width, height, stride, qualityFactor, &output)
        
webp = NSData(bytes: output, length: Int(size))
webp.writeToFile(self.saveFilePath, atomically: true)
free(output)
```

これならば手元でのコンパイルでCode Signが付与される。ストアへのsubmitもできた。