---
title: "Permission denied when using Gitpod with self-made Dockerfile"
date: 2021-12-20T13:17:03+09:00
description: "I didn't know much about permission of Linux."
draft: false
---

When you use [Gitpod](https://gitpod.io), you can use [gitpod/workspace-full](https://hub.docker.com/r/gitpod/workspace-full).
It is enough for development most case.
However, I'd like to use a morphological analysis engine called [MeCab](https://taku910.github.io/mecab/) with Golang, so I tried to use [an image I've created in advance](https://github.com/Akimon658/go-mecab-neologd).
However, I got stuck on permission, so I'm writing this article.

## About Gitpod
It is a development environment that we can use on a browser.
I often use it because I haven't been able to use [GitHub Codespaces](https://github.com/codespaces) yet, and I can use it for free for 100 hours a month with the benefits of [GitHub Education](https://education.github.com).

{{< card "https://gitpod.io" >}}

## What I wanted to do

```dockerfile
# Self-made image
FROM akimon658/go-mecab-neologd:latest
# This image doesn't have gopls, so I want to install it
RUN go install golang.org/x/tools/gopls@latest
```

After that, I want to run `go get` etc. as needed.

## Why I got stuck

All accesses under `/go/pkg` are denied, so I can't run `go get`.

### Cause

It occurred because `go install` was run by root in the Dockerfile.
So running `sudo` will solve it, but the image doesn't have the command.
By the way, it won't occur in [the official image](https://github.com/gitpod-io/workspace-images/blob/master/full/Dockerfile) because it sets the `USER` properly.

### Solution

```dockerfile
FROM akimon658/go-mecab-neologd:latest
RUN go install golang.org/x/tools/gopls@latest && \
    chmod 777 -R / go
```

`chmod 777` is a command that allows all users to read, write, and execute to the specified location, and `-R` is an option that applies it to the contents of the target directory as well.
Set this where you need it.
It may not need to set `777` permission, but it was troublesome to think.

## Afterword
I understood the cause immediately, but I didn't know the mechanism about Linux permissions at all, so it took about an hour to reach the solution.
