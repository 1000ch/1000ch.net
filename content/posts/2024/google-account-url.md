---
title: Google アカウントを複数利用する場合の URL
date: 2024-10-23
---

複数の Google アカウントでログインして各種サービスを利用していると、デフォルトアカウントは https://www.google.com/?authuser=0 となり、他の Google アカウントであれば https://www.google.com/?authuser=1 のように、ログインした順序に応じて採番される。

採番は Google グローバルつまりサービスをまたいで共通で、有効な URL も基本的に同じである。例えば Google に `[account-name]@gmail.com` でログインしている場合は、Gmail だと

- default: https://mail.google.com/mail/u/0/
- https://mail.google.com/mail/u/[account-name]@gmail.com
- https://mail.google.com/mail/?authuser=0
- https://mail.google.com/mail/?authuser=[account-name]@gmail.com

であり、或いは Google Search だと

- default: https://www.google.com/?authuser=0
- https://www.google.com/?authuser=[account-name]@gmail.com

で、はたまた Google Drive だと

- default: https://drive.google.com/drive/u/0/home
- https://drive.google.com/drive/u/[account-name]@gmail.com
- https://drive.google.com/drive/?authuser=0
- https://drive.google.com/drive/?authuser=[account-name]@gmail.com

のようになっている。

デフォルトの URL は（恐らく短さを優先して）採番された番号ベースだが、その採番に紐づく Google アカウントが何かを覚えておくことは難しい。ログインし直しなどで採番が変わることも多々あり、ブックマークなどは機能しなくなる。そこで役立つのが `?authuser=[account-name]@gmail.com` のようにクエリ文字列を利用するパターンである。

複数の Google アカウントの管理には、[Shift という macOS アプリ](/posts/2018/tryshift/)を使っているが、これでカバーできずに URL ブックマークを使う場合は `?authuser=[account-name]@gmail.com` を使うと良いかもしれない。
