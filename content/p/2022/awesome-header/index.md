---
title: "スクロール速度に合わせて消えたり現れたりするヘッダーを作る"
canonicalURL: "https://zenn.dev/akimon658/articles/awesome-header"
date: 2022-04-06T13:16:41+09:00
description: ""
tags: ["JavaScript"]
---

上にスクロールすると生えてくるヘッダーを作るときは JavaScript でクラスを付け替えてアニメーションは CSS で実現するというやり方が多いです。
しかし、それだとアニメーションの速度が一定になってしまって気持ち悪い（と僕は感じる）ので、ヘッダーもスクロールと同じ速度で動くようにしたいと思います。

言葉で説明するのは難しいのですが、要するにこういう挙動ですね。

![Google 画像検索結果画面](./google.webp)

## サンプル

マウスだと（設定によりますが）速くて分かりにくいのでタッチパッドやスマホで試してみてください。

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="zYpROeV" data-user="akimon658" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/akimon658/pen/zYpROeV">
  Awesome header</a> by Akimo (<a href="https://codepen.io/akimon658">@akimon658</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

やることはシンプルで、`position: sticky;` で固定したヘッダーの `top` の値を JavaScript でいじるだけです。（もっと良い方法があったら教えてください）

```javascript
const header = document.querySelector("header"),
  headerStyle = window.getComputedStyle(header);

let lastPosition = 0;

document.addEventListener("scroll", () => {
  const currentPosition = window.scrollY,
    diff = currentPosition - lastPosition,
    headerHeight = parseFloat(headerStyle.height);

  let newTop = parseFloat(headerStyle.top) - diff;
  if (diff < 0) {
    newTop = Math.min(newTop, 0);
  } else {
    newTop = Math.max(newTop, 0 - headerHeight);
  }

  header.style.top = `${newTop}px`;
  lastPosition = currentPosition;
});
```

現在の `top` から移動距離を引いたものか、はみ出す場合には範囲の上限・下限を新しく `top` とします。

影をつける場合にはその高さも考慮した方が良いかもしれません。

```javascript
newTop = Math.max(newTop, 0 - headerHeight - shadowHeight)
```

## あとがき

ゆっくりスクロールしなきゃ分からないので拘りが無ければ CSS で十分だと思います。
