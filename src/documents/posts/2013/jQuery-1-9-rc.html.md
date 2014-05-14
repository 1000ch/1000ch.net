---
layout: post
title: jQuery1.9リリース候補版がリリースされました
date: 2013-1-11
---

## 2.0の方が興味津々ではあるけど

- [JQUERY 1.9 RC1 AND MIGRATE RC1 RELEASED](http://blog.jquery.com/2013/01/09/jquery-1-9-rc1-and-migrate-rc1-released/)

jQuery1.9のリリース候補版ver1が公開されました。  
[beta1の続き](/2012/12/19/UpdateOfjQuery/)ということで、懲りずに変更とか追っかけてみます。  

## Sizzleが対応するCSS3セレクタが増えた

追加されたものと、簡単な解説を。  
ネイティブじゃないので相変わらずIE6でも使えるそうで。  
`:link`・`:visited`・`:hover`の3つに関してはサポートしていません。  
オーバーヘッドが大きいこともあって、実装予定はないとのこと。  

- `:nth-last-child()` - ()の条件式に該当する子要素の最後の要素。引数の形式は:nth-childと同様。
- `:nth-of-type()` - ()の条件式に該当する同一属性要素。引数の形式は:nth-childと同様。
- `:nth-last-of-type()` - ()の条件式に該当する同一属性要素の最後の要素。引数の形式は:nth-childと同様。
- `:first-of-type` - 同一属性要素の最初の要素。:nth-of-type(1)と同義。
- `:last-of-type` - 同一属性要素の最後の要素。:nth-last-of-type(1)と同義。
- `:only-of-type` - 同一属性要素が単独の場合該当。:first-of-type:last-of-typeとか:nth-of-type(1):nth-last-of-type(1)と同義。
- `:target` - アンカーで遷移した先の要素に該当。
- `:root` - ルートを意味する。htmlで言うとhtml。
- `:lang()` - ()の指定と、lang="ja"が一致する要素。

## finish()が追加された

`.stop(Boolean, Boolean)`のように真偽値を渡すのをやめたいそうな。  
stop()の引数の渡し方で制御をするような複雑なことをしたことがないんですが、  
ほとんどの場合は`.clearQueue(a)`や`.finish()`で解決できるからだそうです。  

- [サンプル](http://jsfiddle.net/dmethvin/AFGgJ/)

## Source Mapに対応

minifyされてたら無理ということでSource Mapを用意してくれました。  
生ソースが得られてもjQueryをデバッグする気にはあまりならないけど。  
chromeでどうぞ。Source Mapについては以下のリソースが参考になります。  

- [Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#heading=h.9ppdoan5f016)
- [SourceMapについて調べました。](http://maruta.be/intfloat_staff/144)

## たくさんあるchangelogで気になるところ

- `ajax.type`が`ajax.method`にリネームされた。
- `$("some-selector")`の性能が10%~30%向上した。

### Sizzleはどこまで進化するんだ。

## まとめ

改めてロードマップは、2.0はIE6~IE8のサポートを打ち切り、  
再設計して改良。軽量化と高速化を図るそうです。1.9は引き続きIE6~IE8をサポートを続けます。  
バグフィックスは2.0.xと1.9.xのマイナーアップデートにされるってことになるのかな。  
内部APIを色々と整理したのでたくさんテストして下さいとのことです。  
