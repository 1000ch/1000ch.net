---
title: SharedPreferenceへのアクセスがつらい
date: 2018-01-18
---

# SharedPreferenceへのアクセスがつらい

Android のアプリケーションでデータの永続化をしてくれる [SharedPreference](https://developer.android.com/training/basics/data-storage/shared-preferences.html?hl=ja) だが、これがなかなかつらい。SharedPreference はコンストラクタに ApplicationContext を渡してインスタンスを生成するが、肝心の値の取得と保存が面倒である。

## 値の取得と保存

`SharedPreference` のインスタンスを取得して、アレコレする。インスタンスの生成は `PreferenceManager` からじゃなくても良い。

```kotlin
val p: SharedPreference = PreferenceManager.getDefaultSharedPreferences(context)

// getString() で文字列を取得する
val data: String = p.getString("key", "default value")

// putString() + commit() で文字列を保存する
val editor: SharedPreferences.Editor = p.edit()
editor.putString("key", "new value")
editor.commit()
```

保存時は `SharedPreferences.Editor` インスタンスの `put***()` メソッドで値をセットし、 `commit()` メソッドで保存を実行する。保存先は XML ファイルなので、IO を最小限にするためのインターフェースになっている。

## 保存したいデータモデルとSharedPreferenceへのアクセスの抽象化

やり方はいくつか思い浮かんだが、最適解が浮かばないのでひとまず以下に落ち着いた。Context をコンストラクタの引数にとり、メンバ変数に `SharedPreference` を初期化する。

```kotlin
import android.content.Context
import android.content.SharedPreferences
import android.preference.PreferenceManager

class Preference(context: Context) {
    val p: SharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)

    var userId: String = p.getString("userId", "")
        set(value) {
            p.edit().putString("userId", value).commit()
            field = value
        }
}
```

永続化したいデータはプロパティとして定義して、初期値を `SharedPreference` から取得する。`setter` で `SharedPreference` への保存処理を行い、`field` キーワードからメンバー変数にも代入しておく。値のバリデーション等はここで行えば良い。という、たぶん普通のやり方。

しかしこれだと `setter` へアクセスがある度に XML ファイルへの保存が実行されるので、複数プロパティへの変更を保存したい時に無駄な IO が発生する。できれば変更をキューに溜めて、何かを契機にコミットするのが望ましい。

抽象化の別案としては、

1. 保存したいデータをプロパティに持つクラスを定義し、class annotation を付与すると、プロパティへの get/set 時に SharedPreference への永続化も行うアノテーション
2. 保存したいデータをプロパティに持つクラスを定義し、基底クラスを継承すると、プロパティへの get/set 時に SharedPreference への永続化も行うクラス

が浮かんだ（普通だ…）。SharedPreference に関する色々な記事を徘徊している感じでは、おおよそ近い解決方法が提示されていた。

- [中規模以上のアプリでSharedPreferencesをエレガントに扱う](https://qiita.com/rejasupotaro/items/e112350e5a7db2febc74)
- [Rx Preferences・Public Void](http://f2prateek.com/2015/10/05/rx-preferences/)
- [GarumとSharedPreferencesへの異常なまでの愛](https://qiita.com/operandoOS/items/8af20ac09a9d6acb075e)
- [SharedPreferencesをいい感じに扱うライブラリSpotを書いた](https://qiita.com/kobakei/items/91cc4fb673c846549c84)
