---
title: "Use Disqus on multilingual Hugo site"
date: 2022-01-26T21:20:00+09:00
description: "How to use Disqus on multilingual Hugo site with minify option"
tags: ["Hugo"]
---

According to [the Disqus help page](https://help.disqus.com/en/articles/1717203-multi-lingual-websites), we can override the language by adding this.

```javascript
var disqus_config = function () {
	this.language = "ja";
};
```

So, if you want to change the language of Disqus by the page's, adding the following code to the `disqus_config` of your theme or [official Disqus template](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/disqus.html) should effect.

```javascript
var disqus_config = function () {
	this.language = '{{ .Lang }}';
};
```

However, the variable name `disqus_config` would be changed if you used `hugo --minify` so you couldn't change the language.

## Against `minify`
One day, I realized that `disqus_config` should be called from somewhere because it was just declared in the above code.
Therefore, I visited [akimon658-githug-io.disqus.com/embed.js](https://akimon658-github-io.disqus.com/embed.js) and found this.

```javascript
var _config = window.disqus_config;
```

So I tried the following code, and it works correctly.

```javascript
var disqus_config = function () {
	window.disqus_config = '{{ .Lang }}';
};
```

## `window` objects and global variables
We can use `window.foo` same as a global variable `foo`.
I didn't know that.

Reference: [Global object - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Global_object)
