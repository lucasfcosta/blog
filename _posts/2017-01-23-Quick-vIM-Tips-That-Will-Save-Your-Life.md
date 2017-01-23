---
layout: post
title : "Quick vIM Tips That Will Save Your Life"
author: Lucas Fernandes da Costa
tags : vim vi
---

Hello, everyone! This week I'm a bit out of ideas for blog posts about programming, so I decided to write about vIM!

I have already written [a blog post teaching people how to get started with it](/2016/09/25/How-I-Learned-to-Stop-Worrying-and-Love-vIM.html), but now it's time to teach you some new tricks and make you even more productive.


## **Relative Line Numbers**

**If you are holding keys in vIM, you are doing it wrong**. That's it, plain and simple. vIM was not designed for you to hold any keys, the whole idea of using vIM is being able to "program" your actions and execute them efficiently by using a combination of movements and other commands.

Whenever moving you will want to execute a certain movement a determined number of times so you just type a number (how many times you want the next movement to be repeated) and the movement key itself.

Relative Line numbers will make it extremely easy and fast for you to quickly move to the line you want to edit.

**When using relative line numbers, the current line becomes `0` and all other line numbers are calculated relative to this line**. This means that the line which is `12` lines above the current line will have number `12` and the line which is `8` lines below the current line will have number `8`.

With this information you will then be able to use `nj` or `nk` (`n` being the relative line number) to move to the line you want to edit. This works because you are just prefixing the movement (`j` for going down and `k` for going up) with how many times you want to do it.

To enable relative line numbers just add the following line to your `.vimrc`:

```
set relativenumber             " Show relative line numbers
```

Also, this can get even better and we can mix absolute line numbers with relative line numbers in order to substitute the unuseful `0` in the current line for the absolute line number:

```
set relativenumber             " Show relative line numbers
set number                     " Show current line number
```

Please notice that **even if you use relative line numbers you can still go to a specific line by using `:` followed by the line number you want to jump to**. `:512`, for example, jumps to the line `512`.

<br>

## **Interactive Search And Replace**

This is one of the features that blew my mind the first time I used it.

Whenever you want to do replacements in bulk but you want to check each occurrence of a word to see if it should be replaced or not you just gotta use `gc` as flags to your substitute command.

Let's say you've got a variable called `foo` and you want to rename it to `bar`, but you have also got strings which have `foo` in it and you don't want to replace any occurrences inside strings, this is what you'd do:

```
:%s/foo/bar/gc
```

This will show you every occurrence of `foo`, one by one, and ask you if you want to replace it with `bar` (by pressing `y`) or not (by pressing `n`).

It's important to notice that `c` also makes the search `case-insensitive`. In order to make it `case-sensitive` again you gotta use the `I` flag.

<br>

## **Searching for Words Under The Cursor**

Another extremely useful feature of vIM is being able to search for words under your cursor. To do that you just gotta use `*` or `#`.

<br>

## **Scrolling Effectively**

You have already got relative line numbers by the time you got to this item, but let's say you just want to scroll freely and explore a file, these are some useful keys you can use:

* `{` and `}` - Move to the start/end of the previous/next code block (respectively)
* `ctrl + b` - Moves the cursor and the screen up half a page
* `ctrl + d` - Moves the cursor and the screen down half a page
* `ctrl + e` - Moves the screen down one line

Unfortunately, vIM requires you to keep the cursor on your screen all the time, so whenever your cursor would go out of the screen it would be repositioned.

**If you are moving around a lot I highly recommend you to use line marks**. By using a line mark you can save the position of the cursor and come back to it later.

To add a mark to the current cursor position you just gotta type `mx`. `x` can be any letter in which you want to store that mark.

To go back to a mark you need to type \`x. Again, `x` means the letter in which you stored the mark you want to go back to.

Another interesting mark is \`., which goes to the position of the last change in the current buffer.

<br>

## **Copying and Pasting like a King**

Whenever you copy or delete something in vIM you might have already noticed that it is stored somewhere for you to paste later, right? When you do this, vIM is actually using a default register to store and then paste that text.

If you want to copy multiple parts of a text you need to prepend `"x` to your `yank` or `delete` command. `x` can be any letter in which you want to store that text.

Let's say you need to copy two different lines and paste them in different places across a file. You could simply yank one of them into register `a` by using `"ayy` and then go to the other line and yank it into register `b` by using `"byy`.

Now you just gotta press `"ap` to paste what is in the register `a` and `"bp` to paste what is in the register `b`.

Besides these registers, vIM has also got some other really useful default ones, such as the `_` register, which discards everything passed to it. It is really useful when you want to copy or delete text but you don't want to mess with the content of the default (unnamed) register.

You can reference this register as you would reference any other, just by using `"_`.

vIM has also got "numbered registers", which are the registers from `0` to `9`.

Register `0` always contains the last yanked text and registers from `1` to `9` contain the most recent deleted text, `1` being the most recently deleted text, `2` is the text deleted before that and so on.

<br>

## **Repeating the last command**

This is really simple, but it is a lot useful. To repeat the very same command you used the last time you just gotta press `.`.

<br>

## Let me know if you have any other useful tips!

**If you have any useful tips, doubts or thoughts, please share them with me in the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**
