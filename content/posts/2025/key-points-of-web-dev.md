---
title: 望ましい Frontend 開発環境の勘所
date: 2025-04-05
---

ここで言う望ましさ

- 先進的で安定した技術を用い、実行環境を問わない動作
- 型安全かつ高速で、簡略化されたビルド
- 合理的に厳しく運用保守コストの少ない Lint と Format

## ESM による実装と実行環境による最適化

[JavaScript の言語標準のモジュールシステムである ESM](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules) を前提とすることで、Node.js やブラウザといったランタイムレベルで将来的な最適化を期待できる。ESM かどうかを意識するのは、ビルドツールとしての Node.js だけでなく、実行環境としての Node.js やブラウザでもある。

Node.js であれば [`package.json` の `type` プロパティ](https://nodejs.org/api/packages.html#type)に `module` を指定し、ブラウザであれば [`<script type=module>`](https://html.spec.whatwg.org/multipage/scripting.html#dom-script-type) で指定することでモジュールシステムに ESM を用いることを宣言する。npm パッケージとして配布する場合は、`main` プロパティなどを考慮する必要があるが、詳しくは[こちらの資料](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)を参考にして欲しい。

あくまで要点は JavaScript ネイティブのモジュールシステムに倣うことであり、実装においては `module.exports` や `require()` といった旧来の [CommonJS](https://nodejs.org/api/modules.html) ではなく、`import` / `export` や `import()` を用いる [ESM](https://nodejs.org/api/esm.html) を使う。これをベースにしているバンドラーが、Vite に内包される [Rolldown](https://rolldown.rs/) であり、遡れば [Rollup](https://rollupjs.org/) だろう。

ここでの ESM は実装時点のコードベースを焦点としており、実行時を含まない。つまり、実行する JavaScript ファイルが依存関係に基づいて結合されているべきか等については論点に含まない。Web ページのパフォーマンスの重要要素にネットワーク処理があるが、[HTTP/1.1 が主流だった頃はリクエスト数がボトルネックだったため JavaScript ファイルを結合する](https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/)といったプラクティスがあった。しかし、HTTP/2 が普及し HTTP/3 も広がり、[Web ページの性質も多様化する昨今でベストプラクティスも変化](https://gihyo.jp/admin/serial/01/http3/0001)している。

最終的にはバンドルなどの中間処理を介さず、モジュール同士が ESM で連携する基本的な構造を前提とした仕様の議論が行われていることを踏まえ、状況に応じた技術や設計を選択していく。

## 厳格な型安全と高速で効率的なビルド

TypeScript の型機構は、人間によるミスを減らし実装を補助する。VSCode で提供される提案は、[TypeScript の LSP 実装](https://github.com/typescript-language-server/typescript-language-server)によって実現されており、今やこれなしには開発できない程である。

「厳格」が何を意味するかと言えば、端的には `any` や `as` を使わないことを指す。厳格に拘ることで型安全性が高まり、開発生産性そして継続的なデリバリーに寄与することは言うまでもない。型に関するオプションは幾つかあるが、設定としては [`strict` オプション](https://www.typescriptlang.org/tsconfig/#strict)を `true` を設定するのみで良い。

型厳格性の他には、[TypeScript 5.8](https://devblogs.microsoft.com/typescript/announcing-typescript-5-8/) で導入された [`erasableSyntaxOnly` オプション](https://www.typescriptlang.org/tsconfig/#erasableSyntaxOnly)を有効化したい。TypeScript は JavaScript のスーパーセットだが、[`namespace`](https://www.typescriptlang.org/docs/handbook/namespaces.html) や [`enum`](https://www.typescriptlang.org/docs/handbook/enums.html) といった現時点の JavaScript には存在しない文法が幾つか存在する。`erasableSyntaxOnly` オプションはこれらの文法が使えなくなるオプションだが、この設定によって `tsc` でトランスパイルをせずに、Node.js の [Type stripping](https://nodejs.org/api/typescript.html#type-stripping) で直接 TypeScript ファイルを実行できる。

```json:tsconfig.json
{
  "strict": true
  "erasableSyntaxOnly": true
}
```

Node.js の発展を受けて、[Deno](https://deno.com/) や [Bun](https://bun.sh/) といった次なる JavaScript 実行環境が誕生した。これらは Node.js の課題を踏まえて様々な点が改善されているが、大きな差分としてネイティブの TypeScript サポートがある。エコシステムでも [`ts-node`](https://github.com/TypeStrong/ts-node) などのモジュールをはじめ TypeScript との親和が図られてきたが、[Node.js ネイティブとしても TypeScript サポートが長らく議論](https://gist.github.com/azu/ac5dafbf211ef8b5ecf386930ac75250)されてきた。そして最終的に実装された [Type stripping](https://github.com/nodejs/node/pull/53725) が「型チェックをせずに型情報を削除して実行する」という機能という訳だ。既に [v23.6.0 で有効化](https://nodejs.org/en/blog/release/v23.6.0)されており、次の v24 系をはじめ、徐々に安定していくはずだ。

TypeScript は Node.js で実装されてきたが、その実行速度は常々課題視されてきた。コミュニティでは [swc](https://swc.rs/) や [esbuild](https://esbuild.github.io/) といったサードパーティのビルドツールが誕生し開発体験を大きく向上させてきた。しかし、TypeScript の根幹とも言える巨大な型システムを含む `tsc` 実装を移管することは困難であり、これらのツールは型チェックの機構を持たない。これに対する TypeScript チームのアンサーソングが、型システムの移管を含めてネイティブで実装することで高速化を目指した [TypeScript の Go ポート](https://devblogs.microsoft.com/typescript/typescript-native-port/)である。

現在は [microsoft/typescript-go](https://github.com/microsoft/typescript-go) という別リポジトリで開発されているが、v6 での移行期間を経て v7 で [microsoft/typescript](https://github.com/microsoft/typescript) に合流することを目指して開発されている。実現した暁には、型チェックやトランスパイルが高速化されることはもちろんのこと、`tsc --noEmit` で型チェックのみ行って JavaScript ファイルへ変換せずに `node index.ts` で実行するという未来もあるだろう。

## 厳格な Lint/Format と持続可能なエコシステム

言語レベルでの型チェックに加えて Linter と Formatter を導入することで、コードベースに指針を造り品質をボトムアップする。JavaScript や TypeScript には、Go 言語における [`gofmt`](https://pkg.go.dev/cmd/gofmt) のように有無を言わせない標準ツールがないため、Lint および Formatter のエコシステムが非常に多様化している。[JSLint](https://www.jslint.com/) に始まり [JSHint](https://jshint.com/)・[Esprima](https://esprima.org/)・[ESLint](https://eslint.org/)・[Prettier](https://prettier.io/)、最近では [Biome](https://biomejs.dev/ja/) といったように、様々なツールが勃興しては衰退してきた。

標準がない故に Lint や Format は「開発者の好み」の議論になりがちで、生産的な時間とは言い難い。だからこそ Prettier や Biome のように opinionated なルールを持ち、設定余地をなるべく与えないツールが誕生し、支持されてきたのだろう。この点を対比すると、言わば ESLint は「Lint ルールの実装拡張性を持った JavaScript のパーサー」であり、このコンセプトがコミュニティによるエコシステムの発展に寄与してきた。CSS では [PostCSS](https://postcss.org/) を用いた [Stylelint](https://stylelint.io/) も同じ思想である。

こうした[自転車置き場の議論](https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%BC%E3%82%AD%E3%83%B3%E3%82%BD%E3%83%B3%E3%81%AE%E5%87%A1%E4%BF%97%E6%B3%95%E5%89%87)を減らす意図において「Web 開発に関する Lint や Format は全部お任せあれ」という Biome の思想は合理的で、Rust による実装も実行速度に大きく寄与している。しかし、外部拡張性を持たない中央集権的な構造なので、要求が多様化し続ける Web 開発全域をカバーし得ない予感がある。Prettier のように Format 機能だけならまだしも、Lint 機能を考えると例えば [Next.js 専用の Lint ルール](https://nextjs.org/docs/app/api-reference/config/eslint)を取り込む未来は考え難い。

その点、拡張されることを前提とした ESLint は、こうした個別具体性の高い Lint ルールの需要にも対応する。設定余地を省いた [standard/standard](https://github.com/standard/standard) や [neostandard/neostandard](https://github.com/neostandard/neostandard)、あるいは Prettier も内蔵する [xojs/xo](https://github.com/xojs/xo) も、ルールセットを含む ESLint をラップしたライブラリである。このように Lint ルールや周辺ツールの開発をコミュニティに委ね、ESLint としてはエンジン自体のメンテナンスに集中したことが、持続可能なエコシステムとしての成功要因だろう。

TypeScript と同様に、ESLint の課題として実行速度がある。他力本願だが、eslint-go のような ESLint のネイティブ実装を待つしかないのかもしれない。もう少し希望的観測をするなら、前述の [typescript-go](https://github.com/microsoft/typescript-go) が JavaScript/TypeScript の AST を再利用できる形で公開するとなれば、eslint-go の実現への期待がやや高まる。
