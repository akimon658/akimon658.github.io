---
title: "Go の HTTP クライアントで cookie を永続化させる"
canonicalURL: "https://zenn.dev/akimon658/articles/go-local-cookie"
date: 2022-03-18T08:35:00+09:00
description: "Golang で cookie をファイルとして保存するためのライブラリ・juju/persistent-cookiejar の使い方"
draft: false
tags: ["Golang"]
---

Golang でどこかのウェブサイトにログインして何かしたいとき、同一プロセスでなら標準の cookiejar を使えばログイン状態を保持できますが、一度終了したら再度ログインしなければいけません。
直接ローカルに保存する方法はないので JSON をうんたらかんたらする必要があるのですが、その辺を上手いことやってくれる [juju/persistent-cookiejar](https://github.com/juju/persistent-cookiejar) というライブラリがあったので使ってみました。

{{< card "https://github.com/juju/persistent-cookiejar" >}}

最後のコミットが2017年なのはちょっと気になるところですが……。

## 使い方

基本的には net/http/cookiejar と同じように使えて `Save` で保存できます。

```go
jar, _ := cookiejar.New(nil)
http.DefaultClient.Jar = jar

// 処理

jar.Save()
```

cookie のパスは `New` に渡すオプションで指定できます（デフォルトでは `$GOCOOKIES`、`$HOME/.go-cookies`）。
ファイルが存在しなくてもエラーは返ってきません（無ければ `Save` のときに作ってくれるみたいです）。

```go
jar, _ := cookiejar.New(&cookiejar.Options{Filename: "path/to/cookie"})
```

## 使ってみる

Zenn でテストしようと思いましたが、Google アカウントでしかログインできないので [AtCoder](https://atcoder.jp) で試してみます。
ログイン済みなら `Already logged in!` を出力し、まだならユーザー名とパスワードを聞いてログインするだけのプログラムです。

{{< details コード >}}
エラーハンドリング等かなり省略してます。

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/juju/persistent-cookiejar"
	"golang.org/x/term"
)

func main() {
	jar, _ := cookiejar.New(nil)
	http.DefaultClient.Jar = jar
	defer jar.Save()

	// cookie が存在している場合はログインできているかチェック
	_, err := os.Stat(cookiejar.DefaultCookieFile())
	if err == nil {
		doc, _ := getDocument("https://atcoder.jp/home")
		navbarRight := doc.Find("div#navbar-collapse > ul.navbar-right")
		if navbarRight.Children().Length() == 2 {
			fmt.Println("Already logged in!")
			return
		}
	}

	var username string
	fmt.Print("Username: ")
	fmt.Scan(&username)

	fmt.Print("Password: ")
	// ここで Ctrl + C を押すとその後ターミナルが操作不能になる現象が発生するので本当は対策した方が良いです
	// 参考：qiita.com/x-color/items/f2b6b0852c1a7484ffff
	bypePassword, _ := term.ReadPassword(int(os.Stdin.Fd()))

	loginUrl := "https://atcoder.jp/login"
	doc, _ := getDocument(loginUrl)
	token, found := doc.Find(`form input[type="hidden"]`).Attr("value")
	if !found {
		log.Fatal("error: cannot find CSRF token")
	}

	values := url.Values{
		"username":   {username},
		"password":   {string(bypePassword)},
		"csrf_token": {token},
	}
	req, _ := http.NewRequest("POST", loginUrl, strings.NewReader(values.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.Request.URL.String() == loginUrl {
		log.Fatal("Failed to login. Check your username/password")
	}

	fmt.Println("Successfully logged in!")
}

func getDocument(url string) (*goquery.Document, error) {
	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	return goquery.NewDocumentFromReader(resp.Body)
}
```
{{< /details >}}

実行後に cookie が保存されていることを確認できると思います。

```bash
$ cat ~/.go-cookies
[{"Name":"REVEL_SESSION","Value":"xxxxx...","Domain":"atcoder.jp","Path":"/","Secure":true,"HttpOnly":true,"Persistent":true,"HostOnly":true,"Expires":"2022-09-13T18:19:25.9840269+09:00","Creation":"2022-03-17T18:19:15.4703732+09:00","LastAccess":"2022-03-17T18:19:25.9840269+09:00","Updated":"2022-03-17T18:19:25.9840269+09:00","CanonicalHost":"atcoder.jp"}]
```

この状態で再度実行すると、

```bash
$ go run main.go
Already logged in!
```

ユーザー名・パスワードを入力せずにログインできました。
