---
title: "Use Disqus on multilingual Hugo site"
date: 2022-01-26T21:20:00+09:00
description: "How to use Disqus on multilingual Hugo site with minify option"
tags: ["Hugo"]
---

## The answer

```javascript
window.disqus_config = function() {
	this.language = '{{ .Lang }}';
}
```

## Why use `window.disqus_config`?

According to [the Disqus' help page](https://help.disqus.com/en/articles/1717203-multi-lingual-websites), we can override the language by adding this.

```javascript
var disqus_config = function () {
	this.language = "ja";
};
```

So basically the following JavaScript works.

```javascript
var disqus_config = function () {
	this.language = '{{ .Lang }}';
};
```

However, the variable `disqus_config` doesn't work with `--minify` option because Hugo changes the name.

To solve it, you can use a `window` object instead.

```javascript
var disqus_config = function () {
	window.disqus_config = '{{ .Lang }}';
};
```

Reference:

{{< card "https://developer.mozilla.org/en-US/docs/Glossary/Global_object" >}}

## By the way...

Hugo has [a Disqus template](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/disqus.html), and it was using `var disqus_config` so I sent a pull request.
I was happy because it's my first contribution to OSS.

{{< card "https://github.com/gohugoio/hugo/pull/9550" >}}
