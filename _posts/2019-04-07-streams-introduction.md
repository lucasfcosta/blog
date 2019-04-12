---
layout: post
title: "Your terminal is not a terminal: An Introduction to Streams"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: streams unix terminal tooling workflows
---

I love streams because **I don't like software**.

I always try to build less software. Less software means you have to spend less time updating it, less time fixing it, and less time thinking about it. The only thing better than "less software" is no software at all.

**Streams help us writing less software because they allow programs to communicate with each other**.

If programs cannot communicate they must have too many features to satisfy their user's needs, therefore creating *more* software. By enabling inter-process communication, streams encourage software to be smaller and sometimes can even prevent software from being written.

Learning about streams helps you understand a bit better how UNIX systems work and [keep your development environment simple](https://lucasfcosta.com/2019/02/10/terminal-guide-2019.html).

<br>

# What streams are

Streams are just that: streams. **In the same way that a river has a stream of water, programs have streams of data**. Moreover, **just like you can use steel pipes to carry water from one place to another, you can use UNIX pipes to carry data from one program to another**. This was the very analogy that inspired the design of streams:

> We should have some ways of connecting programs like a garden hose — screw in another segment when it becomes necessary to massage data in another way. This is the way of I/O also.
> — Douglas McIlroy

Streams can be used to pass data into programs and to get data out of them.

![An arrow with "input stream" pointing to a box in which "program is written.](/assets/program-input-output-streams.png)

In UNIX, programs get some streams attached to them by default, both for input and output. We call these *standard streams*.

There are three different standard streams:
* [`stdin`](https://linux.die.net/man/3/stdin) or *standard input* is the stream which feeds your program with data
* [`stdout`](https://linux.die.net/man/3/stdout) or *standard output* is the stream your program writes its main output to
* [`stderr`](https://linux.die.net/man/3/stderr) or *standard error* is the stream your program writes its error messages to

The program [`fortune`](https://en.wikipedia.org/wiki/Fortune_(Unix)), for example, writes some pieces of wisdom to the `stdout` stream.

```console
$ fortune
It is simplicity that is difficult to make
-- Bertold Brecht
```

When fortune ran, it got `stdin`, `stdout` and `stderr` attached to it. Since it didn't produce any errors and didn't get any external input, it just wrote its output to `stdout`.

![A drawing showing a square in the middle with "fortune" written on it. On the left there is an arrow with "stdin" written on it. On the right there are two arrows, one with "stdout" written on it and the other with "stderr".](/assets/fortune-streams.png)

`cowsay` is another program that writes to `stdout`. `cowsay` takes a string and shows a cow saying it.

```console
$ cowsay "Brazil has a decent president"
 _______________________________
< Brazil has a decent president >
 -------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

Differently from `fortune`, `cowsay` doesn't necessarily say smart things – as we've just seen. Thankfully, we can feed `cowsay` through the `stdin` stream attached to it.

All we need to do to make `cowsay` smarter and repeat `fortune`'s quotes is to use something we call a `pipe` — represented by `|` — to attach `fortune`'s `stdout` to `cowsay`'s `stdin`.

```console
$ fortune | cowsay
 _________________________________________
/ A language that doesn't have everything \
| is actually easier to program in than   |
| some that do.                           |
|                                         |
\ -- Dennis M. Ritchie                    /
 -----------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

**We use pipes for connecting the output stream of a program to the input stream of another**.

![A drawing showing the three streams connected to both "fortune" and "cowsay", but this time showing the "stdout" arrow of "fortune" pointing to the "stdin" arrow that goes into the "cowsay" box.](/assets/fortune-and-cowsay-streams.png)

You can see the output of `cowsay` in your screen because, by default, your terminal gets the `stdin`, `stdout` and `stderr` standard streams attached to it.

Data goes in through `stdout` and `stderr` and goes out in the other end: your monitor. Similarly, your keyboard input goes through `stdin` to a program.

![An image showing that the monitor is attached to "stdout" and "stderr" and that the keyboard is attached to "stdin"](/assets/standard-streams-devices.png)
<center><i>Source: <a href="https://en.wikipedia.org/wiki/Standard_streams">Wikipedia</a></i></center>

The `cat` program, for example, uses the `stdin` to receive input from your keyboard and the `stdout` to send it out:

```console
$ cat
Everything I write before pressing Enter
Everything I write before pressing Enter
Gets logged right after
Gets logged right after
```

![A flowchart showing the data coming in from the keyboard through "stdin" and going through "cat", "stdout", and "stderr" to a monitor](/assets/cat-keyboard-and-display.png)

We can make it more elaborate by using [`sed`](https://linux.die.net/man/1/sed) to replace all occurrences of `I` by `We` every time we press `Enter`:

```console
$ cat | sed -E "s/I/We/"
I think streams are quite cool.
We think streams are quite cool.
```

![A flowchart showing the data flowing from the keyboard through "stdin" to "cat" and coming out through "sed"'s "stdin", "sed" itself, and "sed"'s "stdout" to a monitor](/assets/sed-cat-and-keyboard-and-monitor.png)

Also, in case you didn't know, `sed` stands for `stream editor`.

<br>

# How streams talk to your "terminal"

Many websites linked to the [last blog post I've written](https://lucasfcosta.com/2019/02/10/terminal-guide-2019.html). In the comments section of one of them, someone pointed out that I wasn't really using a terminal.

They were completely right in their *not-pedant-at-all* comment. However, here is a picture of me in 1978 — a bit before I was born — using an HP 2647A serial terminal:

<img style="margin-bottom: -18px;" src="/assets/old-serial-terminal.jpg" alt="A picture of a man with glasses using an old terminal display from 1978">
<center><i>Autopilot <a href="https://creativecommons.org/licenses/by-sa/3.0">[CC BY-SA 3.0]</a>, <a href="https://commons.wikimedia.org/wiki/File:HP_2647A_terminal.jpg">via Wikimedia Commons</a></i></center>

If you are not a hardcore time-traveller like me, **what you use is just a terminal *emulator***. Who could've guessed, right?

**Terminal emulators are software simulations of "real" terminals.** These emulators provide you with an interface to interact with the Linux TTY driver. **The TTY driver is responsible for handling the data to and from programs.**

![A diagram showing that data flows from the keyboard through the terminal emulator and the TTY driver all the way to a program and can then flow back all the way from the program to a display](/assets/terminal-interaction-diagram.png).

Each TTY has its own `stdin`, `stdout`, and `stderr` streams connected to it. These are the streams provided to programs for them to read from (`stdin`) and write to (`stdout` and `stderr`).

Here is a more accurate version of what happened when you ran `cat | sed -E "s/I/We/"` in the last example:

![A diagram showing data flowing down from the keyboard to the emulator, then the TTY, then "cat", "sed" and finally flowing all the way back to a monitor.](/assets/tty-and-processes.png)

[Like everything in UNIX](https://en.wikipedia.org/wiki/Everything_is_a_file), the `tty` is a file. Each instance of a terminal emulator has a different `tty` file associated with it. Because each emulator reads from and writes to a different file, you don't see the output of the programs you run in all the windows you have open.

To find out which `tty` is associated with a terminal window you can use the `tty` command.

![Two terminal windows open and the result of the tty command in each one of them showing the path to two different files as the output.](/assets/multiple-terminals-multiple-ttys.png)

When you open a new terminal window, this is what its streams point to:

![An image showing three boxes with "stdout", "stderr" and "stdin" and three arrows pointing to the right to three other boxes with "/dev/ttys/005 written on them](/assets/empty-terminal-streams.png)

In the image above, the `/dev/ttys/005` is just an example. It could've been any other file as there will be a new one for each `tty` instance.

<br>

# Redirection

To write the output of a program to a file instead of the `tty`, you can direct the `stdout` stream somewhere else.

In the example below, we write the contents of the `/` directory to the file `root_content.txt` in the `/tmp` folder. We do this by using the `>` operator, which allows us to redirect the `stdout` stream by default.

```console
$ ls / 1> /tmp/root_content.txt
```

To check what is inside `/tmp/root_content.txt` you can now use `cat`:

```console
$ cat /tmp/root_content.txt
Applications
Library
Network
System
Users
Volumes
bin
cores
dev
etc
home
net
private
sbin
themes
tmp
usr
var
```

Differently from what it would usually do if you had just used `ls /`, the `ls` command didn't write anything to your terminal. Instead of writing to the `/dev/tty` file that your terminal emulator reads from, it has written to `/tmp/content_list.txt`.

![A drawing showing the before and after states of the streams when using `cat`. Initially the `stdout` would point to `/dev/tty` but after we do a redirection it points to the file path.](/assets/stream-redirecting-stdout-to-file.png)

We can achieve the same redirection effect by using `>` instead of `1>`.

```console
$ ls / > /tmp/root_content.txt
```

Omitting the prefixed number works because the `1` in front of `>` indicates which stream we want to redirect. In this case, `1` is the [file descriptor](https://www.computerhope.com/jargon/f/file-descriptor.htm) for `stdout`.

Since the `tty` is just a file, you can also redirect an `stdout` stream from one terminal to another.

![A drawing showing the output of `cowsay` being transferred from one terminal to another by redirecting it to the other terminal's TTY file](/assets/cowsay-from-one-to-another.png)

If we wanted to redirect the `stderr` stream, we could prefix its file-descriptor — which is `2` — to `>`.

```console
$ cat /this/path/does/not/exist 2> /tmp/cat_error.txt
```

![A drawing showing the before and after states of the streams when using `cat` with a redirection of the `stderr` stream. Initially, the `stderr` would point to `/dev/tty`, but after we do a redirection it points to the file path.](/assets/stream-redirecting-stderr-to-file.png)

Now the `/tmp/cat_error.txt` contains whatever `cat` has written to `stderr`.

```console
$ cat /tmp/cat_error.txt
cat: /this/path/does/not/exist: No such file or directory
```

For redirecting both `stdin` and `stderr` we can use `&>`.

```console
$ cat /does/not/exist /tmp/root_content.txt &> /tmp/two_streams.txt
```

Now `/tmp/two_streams` will contain what has been written to both `stdout` and `stderr`.

```console
$ cat /tmp/two_streams.txt
cat: /does/not/exist: No such file or directory
Applications
Library
Network
System
Users
Volumes
bin
cores
dev
etc
home
installer.failurerequests
net
private
sbin
themes
tmp
usr
var
```

![A drawing showing that instead of `stdout` and `stderr` pointing to `/dev/tty` they point to the file path.](/assets/redirecting-stdout-and-stderr.png)

You must be careful when writing to a file with `>`. Using a single `>` overrides the contents of a file.

```console
$ printf "Look, I have something inside" > /tmp/careful.txt

$ cat /tmp/careful.txt
Look, I have something inside

$ printf "Now I have something else" > /tmp/careful.txt

$ cat /tmp/careful.txt
Now I have something else
```

To append to a file instead of overwriting its contents, you must use `>>`.

```console
$ printf "Look, I have something inside" > /tmp/careful.txt

$ cat /tmp/careful.txt
Look, I have something inside

$ printf "\nNow I have one more thing" >> /tmp/careful.txt

$ cat /tmp/careful.txt
Look, I have something inside
Now I have one more thing
```

For reading from `stdin`, we can use the `<` operator.

The following command uses the `stdin` stream to feed `sed` with the contents of `/usr/share/dict/words`. `sed` then selects a random line and writes it to `stdout`.

```console
$ sed -n "${RANDOM}p" < /usr/share/dict/words
alloestropha
```

Since `stdin`'s file descriptor is `0`, we can achieve the same effect by prefixing it to `<`.

```console
$ sed -n "${RANDOM}p" 0< /usr/share/dict/words
pentameter
```

It's also important to notice the difference between using redirection operators and pipes. When using pipes, we attach a program's `stdout` to another program's `stdin`. When using redirection, we change the location a specific stream points to when starting a program.

Since streams are just file-descriptors, we can create as many streams as we want. For that, we can use [`exec`](https://stackoverflow.com/a/18351547) to open files on specific files descriptors.

In the example below, we open `/usr/share/dict/words` for reading on the descriptor `3`.

```console
$ exec 3< /usr/share/dict/words
```

![The list of file-descriptors from 0 to 3 on the left. Above 0, 1, and 2 we can see `stdin`, `stdout`, and stderr` and they point to the tty file. The file descriptor 3 points to /usr/share/dict/words](/assets/extra-file-descriptor.png)

Now we can use this descriptor as the `stdin` for a program by using `<&`.

```console
$ sed -n "${RANDOM}p" 0<&3
dactylic
```

What the `<&` operator does in the above example is *duplicating* the file descriptor `3` and making `0` (`stdin`) a copy of it.

![The list of file descriptors including the standard streams from 0 to 2 on the left and an extra descriptor (3) which points to /usr/share/dict/words. Descriptor 0 (`stdin`) points to the same file.](/assets/copying-extra-file-descriptor-to-stdin.png)

**Once you have opened a file descriptor for reading, you can only "consume" it once**. Hence why trying to use `3` again won't work:

```console
$ grep dactylic 0<&3
```

To close a file-descriptor we can use `-` as if we were copying it to the file-descriptor we want to close.

```console
$ exec 3<&-
```

Just like we can use `<` to open a file for reading, we can use `>` to open a file for writing.

In the example below we create a file called `output.txt`, open it in writing mode, and duplicate its descriptor to `4`:

```
$ touch /tmp/output.txt
$ exec 4>&/tmp/output.txt
```

![On the left the list of file descriptors from 0 to 2 and an extra 4. Above 0, 1, and 2 we can see `stdin`, `stdout`, and stderr` and they point to the tty file. The file descriptor 4 points to /tmp/output.txt](/assets/extra-writing-descriptor.png)

Now if we want `cowsay` to write to the `/tmp/output.txt` file, we can duplicate the file descriptor for `4` and copy it to `1` (`stdout`)

```console
$ cowsay "Does this work?" 1>&4

$ cat /tmp/output.txt
 _________________
< Does this work? >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

![The list of file descriptors including the standard streams from 0 to 2 on the left and an extra descriptor (3) which points to /usr/share/dict/words. Descriptor 0 (`stdin`) points to the same file.](/assets/cowsay-writing-to-duplicate-descriptor.png)

Intuitively, to open a file for reading and writing you can use `<>`. First let's create a file called `/tmp/lines.txt`, open an `r/w` descriptor for it and copy it to `5`.

```console
$ touch /tmp/lines.txt
$ exec 5<> /tmp/lines.txt
```

![On the left the list of file descriptors from 0 to 2 and an extra 5. Above 0, 1, and 2 we can see `stdin`, `stdout`, and stderr` and they point to the tty file. The file descriptor 5 points to /tmp/lines.txt](/assets/extra-read-and-write-descriptor.png)

In the example below, we copy the first 3 lines of `/usr/share/dict/propernames` to `/tmp/lines.txt`.

```console
$ head -n 3 /usr/share/dict/propernames 1>&5
$ cat /tmp/lines.txt
Aaron
Adam
Adlai
```

Notice that if we tried to read from `5` with `cat` we would not get any output because when writing we advanced into the file and `5` is now at its end.

```console
$ cat 0<&5
```

We can solve this by closing `5` and reopening it.

```
$ exec 5<&-
$ exec 5<> /tmp/lines.txt
$ cat 0<&5
Aaron
Adam
Adlai
```

<br>

# Postscriptum

## On generating random numbers

In the examples above, I have used `$RANDOM` to generate random numbers and pass them to `sed` in order to select random lines from the `/usr/share/dict/words` file.

You might have noticed that this usually gives you words starting with `a`, `b` or `c`. That's because `RANDOM` is two-bytes long and therefore can only go from 0 to 32,767.

The `/usr/share/dict/words` file has 235,886 lines.

```console
$ wc -l /usr/share/dict/words
235886 /usr/share/dict/words
```

Since the biggest possible number generated by `RANDOM` is approximately 7 times smaller than `/usr/share/dict/words`, it is not suitable to select random words from it. In this post, it was used merely for the sake of simplicity.

<br>

## On the TTY and I/O devices

I intentionally omitted some details when explaining that the TTY and the terminal emulator stand between the I/O devices and the processes.

You can find a much more complete and in-depth explanation of all the components involved in this communication process at [this extraordinary post by Linus Åkesson called "The TTY Demystified"](https://www.linusakesson.net/programming/tty/).

<br>

# References and useful links

* [Bash One-Liners Explained, Part III: All about redirections](https://catonmat.net/bash-one-liners-explained-part-three) by [Peter Krumins](https://twitter.com/pkrumins). **This is definitely a must-read**. Excellent post.
* [The TTY demystified](https://www.linusakesson.net/programming/tty/) by [Linus Åkesson](https://www.linusakesson.net/) is also a must-read, as I've mentioned above.
* [An overview of pipes and FIFOs from the Linux `man pages`](https://linux.die.net/man/7/pipe)
* [Introduction to Linux: A Hands On Guide](https://linux.die.net/Intro-Linux/) [- Chapter 5. I/O redirection](https://linux.die.net/Intro-Linux/chap_05.html) by Machtelt Garrels
* [What is a file descriptor - Computer Hope](https://www.computerhope.com/jargon/f/file-descriptor.htm)
* [The `man page` for `bash`](https://linux.die.net/man/1/sh)
* [The Illustrated Redirection Tutorial on the Bash Hackers Wiki](https://wiki.bash-hackers.org/howto/redirection_tutorial)
* [The `man page` for the standard streams](https://linux.die.net/man/3/stdin)
* [An explanation on duplicating file descriptors](https://unix.stackexchange.com/a/120535)
