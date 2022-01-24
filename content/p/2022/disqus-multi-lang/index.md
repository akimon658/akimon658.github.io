---
title: "Hugo で Disqus を多言語対応させる"
canonicalURL: ""
date: 2022-01-24T13:55:00+09:00
description: "Hugo でビルド時に minify すると JavaScript から Disqus の言語が変えられなくて困ってたんですが、解決できたのでメモ"
draft: true
tags: ["Hugo"]
---

[Disqus 公式のヘルプ](https://help.disqus.com/en/articles/1717203-multi-lingual-websites)によると、

```javascript
var disqus_config = function () {
	this.language = "ja";
};
```

このように言語設定を上書きできます。
なので使っているテーマのコメント部分、もしくは [Hugo 公式の Disqus テンプレート](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/disqus.html)の `disqus_config` を探して

```javascript
var disqus_config = function () {
	this.language = '{{ .Lang }}';
};
```

のようにすればそのページの言語を設定できるはずです。
が、ビルド時に `hugo --minify` すると変数名 `disqus_config` も短縮されて別の名前になってしまうので設定を上書きできません。

## `minify` 対策

`minify` の仕様を変えてもらうのも難しいのでしばらく放置してましたが、定義した以上どこかから `disqus_config` を呼び出しているはずだと思って [akimon658-github-io.disqus.com/embed.js](https://akimon658-github-io.disqus.com/embed.js) を見てみたら

```javascript
var _config = window.disqus_config;
```

という記述がありました。
もしかして……と思って

```javascript
window.disqus_config = function() {
	this.language = '{{ .Lang }}'
}
```

こうしたら上手くいきました。

## グローバル変数は `window` オブジェクトのプロパティとして扱える
JavaScript 詳しくないので知らなかったのですが、例えばグローバル変数 `foo` と `window.foo` は同じものとして扱えるんですね。

参考：[Global object (グローバルオブジェクト) - MDN Web Docs 用語集: ウェブ関連用語の定義 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Global_object)

（関数も同じように使えるらしいけど、`addEventListener` みたいな関数作ったらどうなるんだろう？）

JavaScript、こういう変わった仕様のせいでイマイチ好きになれないけどポジティブに捉えるなら奥が深いってことでしょうか……。
