---
title: ワークフローにおける画像の最適化
date: 2016-07-26
---

# ワークフローにおける画像の最適化

画像の最適化をビルドプロセスでやるのか、コミット前にやるのかという話。

## ビルド時の画像の最適化

ビルドプロセスに画像の最適化を行うことはしばしばある。 Gulp や Grunt のプラグインとしては [sindresorhus/gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) や [gruntjs/grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) があったり、追加プラグインのインストールやオプションの設定が面倒な人のために、拙作の [gulp-image](https://github.com/1000ch/gulp-image) と [grunt-image](https://github.com/1000ch/grunt-image) などもある。その他の CSS や JavaScript といったアセットのビルドと併せて、こうしたツールを実行するのが一般的である。

### 👍 Pros

- 最適化し忘れのリスクを防げる
  - 大抵の場合は glob でパス指定してあるはず?だし、少なくとも手作業よりは抜け漏れは少ない
- 手動で行うという作業の手間が発生しない

### 👎 Cons

- 画像それぞれの特徴に併せた細やかな最適化処理を施せない
  - 問答無用に png を 8bit ダウンコンバートしている場合に、透過でフルカラーな png があると　**意図せず** 劣化する（本来的にはこういった画像を運用上作らない努力をすべきだし、大抵の場合選ばずに済む）
- **対象の画像が多くなると処理にかかる時間が長くなる**
  - ビルドパイプライン的に個別に実施してリリースが出来れば良いが、フルビルドしないというのもそれはそれで（個人的に）微妙

処理にかかる時間が長くなるというのは中々に厄介で、リリース作業の長時間化だけでなくローカル開発時の効率にも関わる問題で、中長期的な生産性に関わる恐れもある（やや大げさかもしれないが）。

## バージョン管理時の画像の最適化

他の解決策としては、バージョン管理に含める段階で最適化をしておくというものがある。つまり、 JPEG ・ PNG ・ GIF ・ SVG ・ WebP を処理した上で`git commit`して、デプロイ時には行わないというものだ。

### 👍 Pros

- ビルド時に最適化処理を行わないのでビルドにかかる時間が短く済む（実際には成果物フォルダへのコピーなどはあるかもしれないが、それでも最適化に比べれば微細である）
- 軽いファイルを扱うので、 git への負担が少ない（`git clone`時や`git push`時のコストが小さく済む）

### 👎 Cons

- 最適化処理の手間が発生する
- 作業漏れにより、最適化されていないファイルがリリースされてしまう恐れがある
  - ペイロードが大きくなるのでダウンロードに時間がかかる
  - ビットマップを扱うコストが高くなりメモリを圧迫する
  - 一度リリースされてサーバーやクライアントのキャッシュされてしまうとそれらをパージするのは不可能に近いケースも多くある

## コミットに含まれる画像を git の `pre-commit` で最適化する

バージョン管理する段階で実施すると問題のある程度が解決するので、何か方法はないかと思っていたところ、 git の `pre-commit` でやったらいいよねという話になる。 [`pre-commit` で画像を最適化するサンプル](https://gist.github.com/arnaud-lb/4181829)を編集長が教えてくれたので、それを改変したのがこちら。

```sh
#!/bin/sh
# to use, save this file as .git/hooks/pre-commit in your git repo
# make sure to add execute permissions using: chmod +x .git/hooks/pre-commit
command -v imgo >/dev/null 2>&1 || {
  echo "\033[1mPlease install imgo to reduce images size before commit\033[0m"
  echo "Install imgo with the following:"
  echo "\t \033[1mnpm install -g imgo\033[0m"
  exit 1;
}

for file in `git diff --cached --name-status | awk '$1 ~ /[AM]/ && tolower($2) ~ /\.png$/ {print $2}'`
do
echo "Optimizing $file"
  cat $file | imgo --pngquant --zopflipng > ${file%.png}.new
  mv -f ${file%.png}.new $file
  git add $file
done

for file in `git diff --cached --name-status | awk '$1 ~ /[AM]/ && tolower($2) ~ /\.jpe?g$/ {print $2}'`
do
echo "Optimizing $file"
  cat $file | imgo --jpegoptim --jpegRecompress --mozjpeg > ${file%.jpg}.new
  mv -f ${file%.jpg}.new $file
  git add $file
done

for file in `git diff --cached --name-status | awk '$1 ~ /[AM]/ && tolower($2) ~ /\.gif$/ {print $2}'`
do
echo "Optimizing $file"
  cat $file | imgo --gifsicle > ${file%.gif}.new
  mv -f ${file%.gif}.new $file
  git add $file
done

for file in `git diff --cached --name-status | awk '$1 ~ /[AM]/ && tolower($2) ~ /\.svg$/ {print $2}'`
do
echo "Optimizing $file"
  cat $file | imgo --svgo > ${file%.svg}.new
  mv -f ${file%.svg}.new $file
  git add $file
done
```

元ネタでは `pngcrush` と `jpegtran` のみで処理しているが、改変バージョンでは自作の [imgo](https://www.npmjs.com/package/imgo) というツールを通すようにし、 JPEG と PNG に加えて GIF と SVG も最適化するようにしてある。 `imgo` は `npm install -g imgo` でインストールできる。

この `pre-commit` を対象プロジェクトの `.git/hooks` に配置しておけば `git commit` しようとした時に、自動で最適化して `git add` しなおしてくれる。

## バージョン管理時とビルド時の両方に実施する？

両方のメリットを享受したいところだが、単に両方で実施すると、

> - 画像それぞれの特徴に併せた細やかな最適化処理を施せない
> - **対象の画像が多くなると処理にかかる時間が長くなる**

の問題が残る。

**対象の画像が最適化されているかどうか** をチェックできれば、未実施の画像ファイルに対してだけ処理すれば良い。が、現実解が見当たらない。チャンクや更新日時のチェックなども考えられるが、それが全ケースで完璧に機能してくれるのかどうかに自信がない。

ビルド時の実施はセーフティネットとしても有効なので、これらの問題を解決できればバージョン管理時・ビルド時の両実施が望ましい形だと思われる。

## オンザフライで最適化する？（おまけ）

画像へのリクエスト時に最適化してからクライアントに返すという発想もある。実現するソリューションとして、弊社では [hayabusa](http://hayabusa.io) というものがある。

画像サーバーのプロキシとして動作し、画像の URL にクエリパラメータを付与すると応じて最適化された画像が返却されるという仕組み。最適化処理はその URL へのリクエストのうち初回のみ実施されてキャッシュされるので、最適化にかかるコストは無視できる程度である。うっかりクエリを付け忘れなければ、いつでもどこでも適切に処理された画像をダウンロードできるというわけだ。

大掛かりな仕組みではあるので、導入は比較的困難である。多くの Web 制作現場では、こうしたツールの導入は難しいだろう。

hayabusa のコンセプトはやや富豪的にも感じていて、アップロード時にきっちり処理してあげれば、それが良いのではと思っている。 hayabusa のようにリクエスト時に処理を行うのとは逆に、サーバーへのアップロード時に自動で最適化してはどうだろうということで、 AWS Lambda で動作する [ysugimoto/aws-lambda-image](https://github.com/ysugimoto/aws-lambda-image) というツールがある。

リサイズやクロップが必要なケースは?という話では、きっちり最適化した一枚を扱う方が効率よいケースもあると思っている。例えば、大きな画像とそれをリサイズしたサムネイルの2枚をダウンロードするより、大きな画像をダウンロードすればそれだけで済む。オンメモリでリサイズするほうがトータルコストが安そう?だし、サムネイルとしてダウンロードすればそのまま大きな画像のキャッシュになるので無駄にならない。クロップに関してはCSSでやるほうが筋だと思う。とは言え、大きな画像とサムネイルのサイズに差異が大きければドデカイ画像をサムネイルとしてダウンロードする羽目になるので、結局は時と場合に依ってしまう。

ぶっちゃけ hayabusa のような仕組みはとても便利なので、使えるならそれが一番楽。
