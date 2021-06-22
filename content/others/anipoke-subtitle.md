---
title: "【GAS】アニポケのサブタイトルを自動でGoogleカレンダーに書き込みたい"
date: 2021-06-17T06:43:13+09:00
draft: true
---

## はじめに
記憶力の問題で「今週のアニポケはどんな話だったっけ？」と何度も考えるので<a harf="https://calendar.google.com/" target="_blank">Googleカレンダー</a>に記録しているのだが、毎週同じ作業を繰り返すのは無駄なので自動で書き込めないかと考えた。アニポケに限らず、定期的に繰り返す予定に応用できると思う。  
Windowsを用いて説明するのでMac / Chromebookは適宜読み換えてほしい。

### 扱うレベル
この記事ではGoogle Apps Script(GAS)を扱う。簡単にいうとGoogleサービスを操作しやすいJavaScriptで、僕も初めて使うのでそんなに難しいことはしない。  
HTMLも出てくるが知らなくても多分大丈夫。


## 準備

### 手順の確認
1. <a harf="https://www.tv-tokyo.co.jp/" target="_blank">テレビ東京の公式サイト</a>から次回のアニポケのサブタイトルを取得
1. Googleカレンダーに書き込む

### スプレッドシート
サブタイトルの取得はGASでもできるが、よく分からなかったので<a harf="https://docs.google.com/spreadsheets/" target="_blank">Googleスプレッドシート</a>の関数を使う。  
新規作成し、適当な名前を付ける。