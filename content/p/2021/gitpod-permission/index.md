---
title: "Gitpod で自作の Docker イメージを使おうとして permission 関係で詰まった"
canonicalURL: "https://zenn.dev/akimon658/articles/gipod-permission"
date: 2021-12-20T11:13:22+09:00
description: "Linux の permission についてよく知らなくて詰まったときの話です。"
draft: false
---

[Gitpod](https://gitpod.io) では最初から全部入りの [gitpod/workspace-full](https://hub.docker.com/r/gitpod/workspace-full) というコンテナを使えるので、基本的にはこれを使っていれば事足ります。
ただ今回は [MeCab](https://taku910.github.io/mecab/) という形態素解析エンジンと Golang で遊びたかったので、[別で作っておいたイメージ](https://github.com/Akimon658/go-mecab-neologd)を使用しようとしました。
しかし permission 関係でちょっと詰まったので記事にしておこうと思います。

## Gitpod について

ブラウザから使える開発環境です。
まだ [GitHub Codespaces](https://github.com/codespaces) が使えず、また [GitHub Education](https://education.github.com) の特典で月100時間無料で使えるのでお世話になっています。

{{<card "https://gitpod.io" >}}

## やりたかったこと

```dockerfile
# 自作イメージ
FROM akimon658/go-mecab-neologd:latest
# gopls が入っていないので入れたい
RUN go install golang.org/x/tools/gopls@latest
```

この後適宜 `go get` などを実行できれば良い。

## 詰まったところ

`/go/pkg` 以下へのアクセスが全て `Permission denied` となってしまい `go get` できない。

### 原因

上記の Dockerfile で `go install` が root として実行されてしまっているのが原因です。
なので `sudo` すれば解決しますが入っていないしやりたくないです。
ちなみに[公式イメージ](https://github.com/gitpod-io/workspace-images/blob/master/full/Dockerfile)では `USER` が適切に設定されているのでこういったことは起こりません。

### 解決策

```dockerfile
FROM akimon658/go-mecab-neologd:latest
RUN go install golang.org/x/tools/gopls@latest && \
    chmod 777 -R /go
```

`chmod 777` は全てのユーザーに指定した場所への読み書き・実行を許可するコマンド、`-R` はそれを対象ディレクトリの中身にも適用するオプションです。
これを必要なところに設定しましょう。
`777` だと過剰かもしれませんが面倒だったので。

`chmod` について詳しくは以下の記事がとても参考になります。

{{<card "https://qiita.com/shisama/items/5f4c4fa768642aad9e06" >}}

## あとがき

原因はすぐに分かりましたが Linux の権限周りの仕組みを全く知らなかったので解決策に辿り着くまでに1時間ぐらい溶かしました。
