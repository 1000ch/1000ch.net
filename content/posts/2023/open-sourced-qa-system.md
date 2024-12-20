---
title: 社内の有志で運用していた QA システムをオープンソース化した
date: 2023-04-24
---

社員が一堂に会する全体定例や各種イベントで、相互的な理解を促すためのコミュニケーションツールとして Q&A システムを用いている。元はと言えば、この目的に即した出来物のシステムを使っていたが、社内で求める用途に合わず [@sinmetal](https://twitter.com/sinmetal) さんがゼロから作ったことがきっかけで、途中からフロントエンド部分の改善を手伝っていた。

すると想定以上に様々な場面で利用されるようになり、ツールへの依存が高まる一方で、維持管理をボランティアベースでやっていたため、中長期的に維持が難しくなることが懸念された。実際、当時 Vue.js/Nuxt v2 で実装されていたが長い間そのまま改善されず、Vue.js/Nuxt v3 がリリースされた後もしばらく放置されていた。

そこで Vue.js/Nuxt を最新の v3 にアップグレードさせつつ、よりコミュニティベースでもコミットできるように OSS として公開した。それが [gcpug/qa_board](https://github.com/gcpug/qa_board) である。公開に際して、もともと社内向けにベタ書きしていたロジックなどの情報を削除する必要があり、コミットログは squash されていることをご容赦頂きたい。

システムとしてはデータベースに Firestore を利用している。そのため作成したプロジェクトの Firebase console から、Firebase SDK の初期化に必要な各種トークンを環境変数として渡す必要がある。ローカル環境であれば `.env` で（これは [Nuxt v3 の機能](https://nuxt.com/docs/guide/directory-structure/env#env-file)である）、デプロイ時には CI の環境変数に設定しビルド時に参照できるようにする。

システムと言っても豊富な機能を備えているわけではなく、ある程度運用でカバーしている部分が大きい。機能を追加するほどソフトウェアが複雑になり最終的に持続が難しくなる側面は避けられないため、コミュニティベースになったとはいえ全ての機能リクエストを汲めるわけではなく、ある程度目を瞑ってメンテナンスしていく必要がある。この点を理解いただいた上で、こうした会社やコミュニティの Q&A システムの需要がある場合は是非お試しください。
