---
title: "DeeloCloud なる会社？からメールが来た"
canonicalURL: ""
date: 2022-01-10T11:45:00+09:00
description: "多分スパムですが、一応できるだけ調べました。"
draft: false
---

GitHub に自分用の Dockerfile を置いていたら DeeloCloud なるサービスの owner を名乗る方からメールが来ました。
見るからに怪しさ全開でしたが、すぐにスパムと決めつけるのは良くないと思ったのでちゃんと調べることにしました。

## DeeloCloud とは

>**Easily deploy and host your apps**
>
>DeeloCloud handles the deployment and hosting of your backend and frontend apps so that you can focus on building instead of managing infrastructure.

だそうです（[公式サイト](https://www.deelo.cloud)より）。
リポジトリの変更を検知して勝手にデプロイしてくれるんだとか。

まぁ Readme 読めば Web サービスじゃないと分かるリポジトリに対して「そのプロジェクト、うちで無料でホスティングしないか？」みたいなメールを送ってきていたので、そもそも使う気は無いんですけどね。

## めちゃくちゃ怪しい
### 薄っぺらいドキュメント
書かれているのはほぼさっき引用したのと同じで、具体的なことが一切書かれていません。
ログインしたら何か変わる可能性もありますが……。

### GitHub でのサインアップ
まず、メールアドレス等でのアカウント作成はできず GitHub との連携が必須です。
これはまだ GitHub との連携が前提のサービスなので分かりますが、問題は許可しなきゃいけない権限が多すぎること。
メールアドレスやプロフィールの読み取りはもちろん、

>This application will be able to **read and write all public and private repository data**.
>This includes the following:
>
>- Code
>- Issues
>- Pull requests
>- Wikis
>- Settings
>- Webhooks and services
>- Deploy keys
>- Collaboration invites

……。潔いですね。

### もちろん定型文メール
当たり前ですが[僕が受け取ったのと全く同じ内容のメールを受け取っている人](https://www.reddit.com/r/Hosting/comments/rxfapx/deelocloud/)がいました。
2022年に入った辺りから増えているみたいです。
GitHub で公開しているメールアドレスにバンバン送っているみたいで、[keras-team](https://github.com/keras-team) という organization に設定されているのが [Keras-users](https://groups.google.com/g/keras-users)という Google グループのアドレスだったせいで[メーリングリストにスパムが紛れ込む](https://groups.google.com/g/keras-users/c/3QdTeLA-YlQ)のはこの世の終わりみたいでちょっと笑ったりしました。

## あとがき
仮に詐欺じゃなかったとしても、無料プランだと RAM 250 MB しかないので使わないよ……。
