---
title: "PowerShell でホームディレクトリを省略する"
date: 2021-12-12 13:00:00 +0900
draft: false
noindex: true
---

PowerShell はデフォルトで現在のフルパスを表示しますが、Bash のようにホームディレクトリを `~` で置き換えてほしかったのでカスタマイズしてみました。

## Profile の準備
Bash でいう `.bashrc` のように、起動時に読み込まれるファイルに任意の処理を書くことで色々とカスタマイズできます。ただデフォルトでは存在しないので、`touch $profile` などで作成する必要があります。

## カスタマイズ
見た目に関する処理は `prompt` 関数に書きます。
デフォルトではこんな感じです。

<!--more-->

```powershell
function prompt {
    $(if (Test-Path variable:/PSDebugContext) { '[DBG]: ' }
      else { '' }) + 'PS ' + $(Get-Location) +
        $(if ($NestedPromptLevel -ge 1) { '>>' }) + '> '
}
```
参考：[プロンプトについて - PowerShell | Microsoft Docs](https://docs.microsoft.com/ja-jp/powershell/module/microsoft.powershell.core/about/about_prompts?view=powershell-7.2#built-in-prompt)

カレントディレクトリの取得に `$(Get-Location)` が使われていますが、これだと文字列として扱うことができません（`$pwd` も同様）。そこで `Convert-Path` を使います。

```powershell
function prompt {
    $currentDir = (Convert-Path .)
    $(if (Test-Path variable:/PSDebugContext) { '[DBG]: ' }
      else { '' }) + 'PS ' + $currentDir +
        $(if ($NestedPromptLevel -ge 1) { '>>' }) + '> '
}
```

これで文字列として扱えるようになりました。あとは `$home` が含まれているかチェックして置換するだけです。

```powershell
function prompt {
    $currentDir = (Convert-Path .)
    if ($currentDir.Contains($HOME)) {
        $currentDir = $currentDir.Replace($HOME, "~")
    }
    $(if (Test-Path variable:/PSDebugContext) { '[DBG]: ' }
      else { '' }) + 'PS ' + $currentDir +
        $(if ($NestedPromptLevel -ge 1) { '>>' }) + '> '
}
```

## あとがき
今回はちょっと表示をいじっただけですが、他にも色々できるので試してみてください。
参考までに僕のリポジトリを置いておきます。

[github.com/akimon658/pwsh-profile](https://github.com/Akimon658/pwsh-profile)
