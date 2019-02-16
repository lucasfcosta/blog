---
layout: post
title: "How I'm still not using graphical interfaces in 2019: A guide to the terminal"
author: Lucas Fernandes da Costa
place: Paris, France
flag: 🇫🇷
tags: terminal graphical-interfaces dotfiles tooling workflow
---

> *TL;DR: [Here are my dotfiles](https://github.com/lucasfcosta/dotfiles). Use them and have fun.*

GUIs are bloatware. [I've said it before](/2018-08-05-In-Praise-of-Plaintext.html). But rather than just complaining about IDEs I'd like to provide a simple guide to a much better alternative: the terminal.

*IDE* stands for Integrated Development Environment. This might be an accurate term, but when it comes to a *real integrated* development environment, the terminal is a lot better.

In this post I'll walk you through everything you need to start making your terminal an IDE: editing text efficiently, configuring its appearence, running a myriad of programs and dinamically creating, resizing and closing tabs and windows.

![An image from my terminal showing three panes. My text editor (vIM), htop and a blank pane.](/assets/terminal-demo.png)

<br>

# La Raison D'Être

In an IDE you can only use plugins made specifically for it, in a terminal you can use any program. An IDE limits you to the extent of what their creators envisioned you would want to do.

The terminal allows you to easily combine programs. Thanks to streams you can use a program's output as the input to another. This provides great flexibility and allows creative use of sets of tools for purposes that their authors might have never imagined. That's one of the most remarkable characteristics of programs designed according to the UNIX philosophy.

> Word, Excel, PowerPoint, and other Microsoft programs have intimate — one might say promiscuous — knowledge of each others' internals. In Unix, one tries to design programs to operate not specifically with each other, but with programs as yet unthought of.
> — Doug McIlroy

GUIs' learning curve is less steep than the terminal's learning curve, but the more you get used to plain-text it becomes much quicker to type in commands than to search for buttons or options. The hard-part is to remember which commands to type.

IDEs also tend to do too much "magic". They hide important details from the user for the sake of practicality. This causes problems when you need to debug a problem caused by the very tasks that the IDE executed. There are two main reasons for that. The first is that all this abstraction makes people completely unaware of what the computer is doing. The second is that the IDE did so many things and hid so much information that you are now left in the dark with insufficient information to solve the problem.

Now you might argue that some IDEs have small windows with console interfaces that provide you the same output as a terminal would and that's true. However, it's not enough. If you are still unaware of how to communicate with the machine in front of you in its own terms you won't be able to make any sense of what that IDE is showing. Being comfortable in a terminal means speaking the same language as the machine does. It's beautiful. I feel a strong sense of aesthetic pleasure when I speak to my computer in its own language.

Configuration for terminal programs is also extremely portable. To configure most programs all you need to do is copy a plain-text file to the correct directory. This allows you to setup a complete development environment in a new machine in a matter of seconds or, at most, a few minutes.

All the effort invested into it will soon pay-off. Saving a few key-strokes or millisseconds doesn't really make that much difference as most of the time you are thinking rather than coding. The real benefit of using the terminal is having a better comprehension of how your computer works and making your workflow more predictable and customizable.

Finally, being proficient with a terminal is a "learn-once-use-everywhere" — and "use-frequently" — skill. Not every machine has VSCode, Sublime or Atom installed but every machine has a terminal.


<br>

# The Terminal Starter Pack

These are the main programs I use to make my terminal a complete development environment:

* [`neovim`](https://neovim.io)
* [`tmux`](https://github.com/tmux/tmux/wiki)
* [`iterm2`](https://www.iterm2.com)
* [`zsh`](http://www.zsh.org/) and [`oh-my-zsh`](https://github.com/robbyrussell/oh-my-zsh)

In the end of this post you will also find a list of other useful programs.


<br>

# `neovim`

`vIM` is my text-editor of choice and has a special place in my heart [and my ankle](https://pbs.twimg.com/media/DY65vJAW0AEfF-h.jpg).

**`neovim` is another version of `vIM`**. It maintains all of `vIM`'s standard keybindings, the same features, and is fully compatible with `vIM` configuration options.

`neovim` adds features such as the ability to run jobs asynchronously, avoiding the annoying seconds in which `vIM` would freeze during tasks like syntax-checks.

It also supports scripts not only written in VimL — not my favourite language, let's put it like that — but also scripts written in [LUA](https://www.lua.org/home.html).

To make sure you are always using `nvim` rather than `vim` you can alias the `vim` command to `nvim` by using the lines below. You can put them on your `.zshrc` — or `.bashrc`, or whatever shell you are using.

```
alias vim="nvim"
alias vimdiff="nvim -d"
```


<br>

## Learning `vIM`

Even though many people fear `vIM` and ["how to quit `vIM` is the most popular question on StackOverflow](), vIM is better especially because it is different.

**For learning to use `vIM` effectively I'd highly recommend starting with [`vimtutor`](https://superuser.com/questions/246487/how-to-use-vimtutor)**. It will seem boring in the beginning, but it is the most effective way of learning vIM properly.

**Resist the urge to to quit**. If you don't know how to a certain task, duck-duck-go it. In the first few days or weeks you will have to actively remember which keys and commands do which things, but as time goes they will become deeply ingrained into your brain and editing text will be just like muscle memory.

**Disable arrow keys from the start** by adding these lines into your `~/.config/nvim/init.vim` file (previously `~/.vimrc`):

```
" don't use arrowkeys
noremap <Up> <NOP>
noremap <Down> <NOP>
noremap <Left> <NOP>
noremap <Right> <NOP>

" really, just don't
inoremap <Up>    <NOP>
inoremap <Down>  <NOP>
inoremap <Left>  <NOP>
inoremap <Right> <NOP>
```

**I usually advise already proficient `vIM` users to never put anything they don't understand into their `init.vim` file**. Searching for what commands do will lead you to a better understanding of `vIM` and will give you the knowledge necessary to create configurations that match your own editing style and workflow.

Now you can go ahead and duck-duck-go the `noremap` and `inoremap` commands if you're feeling adventurous.

Once you have gotten confortable editing text, **start noticing [anti-patterns such as repeating the same key more than twice, repeating commands, or entering insert mode to delete text](https://sanctum.geek.nz/arabesque/vim-anti-patterns/)**.

**You should be constantly asking yourself if there is a better way of doing something**. Most of the time the answer will be "yes".

**Avoid plugins unless you really need them**. Many times `vIM` already has the functionality you are looking for and it's better to not depent on any third-parties whenever possible. This keeps your environment fast, free of bloat and will make it easier for you to use `vIM` in other machines without having to copy your configs over.

As a beginner you don't exactly know what you need so go ahead and add anything that you think might improve your workflow. **I usually recommend beginners to start with [`NERDTree`](https://github.com/scrooloose/nerdtree) and [`fzf`](https://github.com/junegunn/fzf.vim)**. In the future you will eventually want to trim your configs and remove the clutter.

Ultimately, the best tip I can give to anyone using `vIM` is to adopt an incremental leraning approach. Try to improve a little bit everyday and avoid adding too much to your skillset in a short period of time. You will use your text-editor of choice — hopefully `vIM` — every single day, it's more important to memorize a command once over the course of a few days and use it for the rest of your life than to learn many tricks quickly and use them once.

Dig deep, learn things properly and in a moderate pace. For that, I highly recommend [`vIM Wikia`](http://vim.wikia.com).


<br>

## Plugins I'm Currently Using

To install and manage plugins you will probably want to use [`vim-plug`](https://github.com/junegunn/vim-plug). It's minimalist, [easy to install](https://github.com/junegunn/vim-plug#neovim), [easy to use](https://github.com/junegunn/vim-plug#usage) and has many nice features such as [loading plugins on demand](https://github.com/junegunn/vim-plug#on-demand-loading-of-plugins) andadding [post-update hooks](https://github.com/junegunn/vim-plug#post-update-hooks) so that you don't have to worry about extra installation steps.

[`neomake`](https://github.com/neomake/neomake) is *la raison d'être* of `neovim`. It allows you to run programs asynchronously and therefore avoid blocking the main thread. This is specially useful for running syntax-checks or any other actions that would have previously caused `vIM` to freeze for a few seconds.

[`NERDTree`](https://github.com/scrooloose/nerdtree) is an easy way of visualising and managing file trees. Even though all of its features have straightforward native alternatives, they are simply not as practical. I use the following lines to open it using `Ctrl+n` and show hidden files:

```
" NERDTree on ctrl+n
let NERDTreeShowHidden=1
map <silent> <C-n> :NERDTreeToggle<CR>

" close NERDTree after a file is opened
let g:NERDTreeQuitOnOpen=1
```

[`fzf.vim`](https://github.com/junegunn/fzf.vim) does fuzzy-finding, allowing you to quickly find and open files by typing part of their names. Installing it is a bit more complicated than installing other plugins. Since `fzf.vim` is just a wrapper around `fzf`, you will need to use the following lines to ensure the `fzf` binaries are installed.

```
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --bin' }
Plug 'junegunn/fzf.vim'
```

`fzf` can use other programs in order to find files, such as UNIX's `find` or [the silver searcher (also known as `ag`)](https://github.com/ggreer/the_silver_searcher). I like using `ag` because I can configure it to ignore whatever `blob` patterns I have on my `.gitignore` and therefore have pretty sensible defaults for whatever repository I'm working with.

```
" make FZF respect gitignore if `ag` is installed
" you will obviously need to install `ag` for this to work
if (executable('ag'))
    let $FZF_DEFAULT_COMMAND = 'ag --hidden --ignore .git -g ""'
endif
```

Finally, I use the following to line to bind `fzf` to `ctrl+p`:

```
nnoremap <C-P> :Files<CR>
```

[`editorconfig-vim`](https://github.com/editorconfig/editorconfig-vim) helps me quickly adapt my editor's settings — like line-ending formats, and indentation size and characters — to any project as long as it has [a `.editorconfig` file](https://editorconfig.org/).

[emmet-vim](https://github.com/mattn/emmet-vim) makes it very quick to write HTML. If you write a lot of JSX — like I do — the following lines will make it

```
" make emmet behave well with JSX in JS and TS files
let g:user_emmet_settings = {
\  'javascript' : {
\      'extends' : 'jsx',
\  },
\  'typescript' : {
\      'extends' : 'jsx',
\  },
\}
```


I use [`ale`](https://github.com/w0rp/ale) as a linting engine because it works out-of-the-box with most linters from most languages. This avoids all the pain I previously had configuring one linter for each language I used and then having to maintain all their configs. With `ale`, if you have `eslint` and an `.eslintrc` file in your project it will automatically run `eslint` with those configs and display the errors. Zero work required.

I also configured it to make linting seem faster, to remove any trailing lines and trim unecessary whitespace.

```
" fix files on save
let g:ale_fix_on_save = 1

" lint after 1000ms after changes are made both on insert mode and normal mode
let g:ale_lint_on_text_changed = 'always'
let g:ale_lint_delay = 1000

" use nice symbols for errors and warnings
let g:ale_sign_error = '✗\ '
let g:ale_sign_warning = '⚠\ '

" fixer configurations
let g:ale_fixers = {
\   '*': ['remove_trailing_lines', 'trim_whitespace'],
\}
```

**The biggest highlight in this list is probably [`YouCompleteMe`](https://github.com/Valloric/YouCompleteMe)**, which allows me to have an IDE-like semantic-based completion. This means that `YouCompleteMe` gives me suggestions for auto-completion not only based on the words themselves (token-based) but also according to their meaning (semantic-based).

The `YouCompleteMe` plugin is just a client that connects to the `YouCompleteMe` server, which is what actually generates the suggestions for you by running a different service for each language.

To install it you also have to install the `YouCompleteMe` server:

```
" semantic-based completion
Plug 'Valloric/YouCompleteMe', { 'do': './install.py' }
```

Needless to say — or maybe not so needless as I'm saying it already — it will be more useful for statically typed languages. I have tested it mostly with `rust` and `TypeScript` and it's been fantastic.

I also use the following lines to bind its suggestions to `vIM`'s default shortcut and popup for completion:

```
" disable auto_triggering ycm suggestions pane and instead
" use semantic completion only on Ctrl+n
let ycm_trigger_key = '<C-n>'
let g:ycm_auto_trigger = 0
let g:ycm_key_invoke_completion = ycm_trigger_key

" this is some arcane magic to allow cycling through the YCM options
" with the same key that opened it.
" See http://vim.wikia.com/wiki/Improve_completion_popup_menu for more info.
let g:ycm_key_list_select_completion = ['<TAB>', '<C-j>']
inoremap <expr> ycm_trigger_key pumvisible() ? "<C-j>" : ycm_trigger_key;
```

My language-specific plugins are `rust.vim`, `vim-javascript` and `typescript-vim` since those are the languages I've been writing most frequently. I only add other language-specific plugins when I'm about to start writing in a new language. As you might have noticed, I'm a minimalist.


<br>

# `tmux`

`tmux` is a terminal multiplexer. Essentially, this is a fancy name for **a program that allows you to have multiple tabs and panes in a single terminal window**.

If you are old enough to remember `IE6` — I'm not as young as I'd like to be — and the horrible experience of having to browse the web in one thousand windows, you will probably remember how big of an improvement it was when browsers started introducing tabs. This is the same life-changing improvement `tmux` provides.

In `tmux` lingo every tab is a `window` and a `window` can contain multiple `panes` (splits).

This is great for when you are editing text and need to keep your tests running whenever you change a file, for example. I very often find myself working with a big pane in which I edit code and a small one on the side where I keep tests running whenever I save a file.

The biggest advantage of using tmux is that you can run as many programs you want in parallel and see their outputs without having the burden of using an IDE and dragging panels around or toggling views.

`tmux` leverages the versatility of the terminal to a whole new level.

`tmux`'s key-bindings consist of a `prefix` and the binding-keys themselves. To trigger a shortcut you just press the `prefix` keys and then the bind-keys. If your preffix is, for example, `Ctrl+a` and your key-binding for opening a new horizontal split is `-`, then you will first press `Ctrl+a` and then press `-`. You can think of the `prefix` as the combination of keys that tell the terminal that you want to trigger `tmux`.

I find `tmux`'s default key-bindings to be a bit annoying, hence why I have changed.

I currently use `C-a` as a prefix, `h`, `j`, `k`, `l` — the same direction keys as in `vIM` — to switch between panes and `-` and `|` to do horizontal and vertical splits.

```
# Free the original `Ctrl-b` prefix keybinding.
unbind C-b

# set prefix key to ctrl-a
set -g prefix C-a

# vi keys for switching panes
bind-key h select-pane -L
bind-key j select-pane -D
bind-key k select-pane -U
bind-key l select-pane -R

# Splitting panes.
bind - split-window -v
bind | split-window -h
```

Another improvement I had to configure it to resize panes with `H`, `J`, `K`, and `L` (all uppercase).

```
# shift-movement keys will resize panes
bind J resize-pane -D 5
bind K resize-pane -U 5
bind H resize-pane -L 5
bind L resize-pane -R 5
```

I often use `preffix + z` to toggle panel's fullscreen mode.

In the past I have also struggled with `tmux`'s way of copying things, so I have made some changes to how it works so that I can make life less painful.

First, I had to allow `tmux` to access the `OSX` pasteboard:

```
# Workaround to allow acessing OSX pasteboard
set-option -g default-command "reattach-to-user-namespace -l zsh"
```

Then I started using the same keys as I use in `vIM` to select and copy text:

```
# Vi copypaste
setw -g mode-keys vi
unbind p
bind p paste-buffer
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```

With these configurations, all you need to do whenever you need to scroll through your tmux panes and/or copy text is to press **`preffix+[` to start scrolling**, **`h j k l` (or `Ctrl+u` and `Ctrl+d`) to move the cursor**, **`v` or `shift+v` (entire lines) for making a selection** and **`y` to copy what you have selected**.

Here are other small improvements that are self explanatory:

```
# Start tabs at index 1
# (they usually start at 0, which is too far from where my fingers usually are)
set -g base-index 1

# Make pane numbering consistent with windows
setw -g pane-base-index 1

# Renumber windows when a window is closed
# This guarantees it will be easier for you to switch
# between windows as you keep opening and closing them
set -g renumber-windows on

# Automatically set window title according to the running program
set-window-option -g automatic-rename on
set-option -g set-titles on
```

## `tmux` plugins

In order to install and manage `tmux` plugins you will need [`tpm`](https://github.com/tmux-plugins/tpm).

There is no point in replicating their installation instructions here, so [I'll just link to their README](https://github.com/tmux-plugins/tpm#installation).

The theme I use for `tmux` is [my own fork of `nord-tmux`](https://github.com/lucasfcosta/nord-tmux/). I absolutely adore their colorscheme but I wanted to customize my status-bar a bit further, hence why I have made my own fork. If you also want to customize yours just go ahead and fork their repository — or mine — and start committing changes to it.

Once you have decided which theme you want to use, you can customise it by adding new plugins and referencing them on your status bar.

If you want to display your battery percentage, for example, you can use [`tmux-battery`](https://github.com/tmux-plugins/tmux-battery) by adding the following line to your `.tmux.conf` and pressing `prefix + I` (capital I!) to install it.

```
set -g @plugin 'tmux-plugins/tmux-battery'
```

Then just reference it in your `status_bar` configuration:

```
set -g status-right 'Battery: #{battery_icon} #{battery_percentage} #{battery_remain} | %a %h-%d %H:%M '
```

You can find [a complete guide on how to configure your `status_bar` in the `tao-of-tmux` book](https://github.com/git-pull/tao-of-tmux/blob/master/manuscript/09-status-bar.md).

Here is a list of plugins I'm currently using:

* [`lucasfcosta/nord-tmux`](https://github.com/lucasfcosta/nord-tmux) → my theme
* [`tmux-plugins/tmux-cpu`](https://github.com/tmux-plugins/tmux-cpu) → shows information about CPU usage
* [`tmux-plugins/tmux-battery`](https://github.com/tmux-plugins/tmux-battery) → shows battery stats
* [`tmux-plugins/tmux-online-status`](https://github.com/tmux-plugins/tmux-online-status) → shows the connectivity status
* [`tmux-plugins/tmux-resurrect`](https://github.com/tmux-plugins/tmux-ressurrect) → persists sessions between shutdowns/restarts
* [`tmux-plugins/tmux-continuum`](https://github.com/tmux-plugins/tmux-continuum) → continuously saves and reloads sessions
* [`robhurring/tmux-spotify`](https://github.com/robhurring/tmux-spotify) → displays currently playing spotify songs


<br>

# `zsh`

In UNIX a shell does the job of providing you a text-based interface to communicate with the underlying operating system. You can think of it just as another way of telling your machine what it should do, but instead of clicking around and having all the clutter that graphical interfaces often display you just type commands.

Usually you will have `bash` set as a your default shell (the `login shell`).

`zsh` is just another kind of shell, one which offers great additional features.

To setup `zsh` as your `login shell`, you can use:

```
chsh -s $(which zsh)
```

`zsh`'s auto-completion is far superior than the one in `bash`, both for file paths and for programs like `git`. Just press `TAB` as you type a command and it will try to complete it for you.

`zsh` is highly extensible, hence why [`oh-my-zsh`](https://ohmyz.sh/) is so popular. `oh-my-zsh` is a framework for managing your `zsh` configuration. It makes it easy to add plugins, use themes and customise other relevant settings. You can find [the installation instructions for `oh-my-zsh` on their wiki](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH).

The configuration for `zsh` lives in a file called `.zshrc` located at your `home` directory (`~/.zshrc`). This file is executed in the current context whenever you open a new instance of the shell. This gives you access to any exported environment variables and allows you to execute other necessary commands for setting up the shell's environment when it's started. Executing a script in the current context is also known as "sourcing" because the command which does it is `source`. Whenever you have an environment variable you want to be present in your shell when starting it, just add it to your `.zshrc`.

```
# Use nvim as the default editor
export EDITOR=nvim
```

In order to keep my `.zshrc` clean I also have a `.aliases` file, whose name is self explanatory.

```
# Load aliases
if [ -f ~/.aliases ]; then
    . ~/.aliases
fi
```

You can see the contents of my `.aliases` file on [GitHub](https://github.com/lucasfcosta/dotfiles/blob/c01b73c6bd71b4888cae31440e14bf42297b3455/.aliases).

You can also do other useful things such as managing your Node versions with `nvm` or setting up `cargo`:

```
# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Add cargo to the PATH
source $HOME/.cargo/env
```

## `zsh` Plugins

My current `zsh` prompt is [the `spaceship-prompt`](https://github.com/denysdovhan/spaceship-prompt). It is pretty, minimalist and includes emoji — an essential feature for millenials. [Installing it is quite simple, especially if you're using `oh-my-zsh`](https://github.com/denysdovhan/spaceship-prompt#oh-my-zsh).

My favourite plugin is definitely `z`. It allows you to jump to a directory without typing its full path. If you were in the directory `/Users/Elon/tesla/new-york`, switched to `/london` but now you want to switch back to `new-york`. Instead of typing the full path, you can just type `z new-york`.

`z` works by learning which directories you accessed more frequently lately and uses that information to take you to the right place.

I also use [the `git` plugin](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/git), which is just [a bunch of convenient aliases for `git`](https://github.com/robbyrussell/oh-my-zsh/blob/965a27aa69b49f4e447bcaae913e71a010f7d141/plugins/git/git.plugin.zsh#L36-L263). My favourite aliases are `g` for `git`, `gcm` for `git checkout master`, `gp` for `git push`, `gst` for `git status`, `grb` for `git rebase`, and `grba` and `grbc` for `git rebase --abort` and `git rebase --continue`.

If you're in an early 2000's vibe you can install the `chucknorris` plugin and use the `chuck` command to get quotes that used to be funny.

![An ASCII drawing of a cow telling a Chuck Norris joke.](/assets/cowsay-chucknorris.png)


```
# .zshrc plugins section
plugins=(
  z
  git
  chucknorris # ¯\_(ツ)_/¯
)
```


<br>

## `iTerm2`

`iTerm2` is a terminal emulator. Not to be confused with a `shell`, a terminal emulator is just the window which *contains* the `shell`. The terminal emulator is responsible for how the `shell` is displayed.

`iTerm2` is nice because it lets me setup which fonts and colors I want to use.

By pressing `Ctrl+,` I get to configure its appearence and other useful settings.

My `iTerm2` uses [the `nord` iTerm colors](https://github.com/arcticicestudio/nord-iterm2) to match with the rest of my themes and renders text using a `DejaVu Sans Mono for Powerline`.

[Powerline Fonts](https://github.com/powerline/fonts) are also a cool thing to have. They include many characters used for layouting such as the fill-blocks and triangles you can see in my `tmux` status-bar.

I use `iTerm2` simply because it's more customizable than Mac OS's default terminal. I don't need its window control features and tabs since I already use `tmux`.


<br>

## Other Useful Programs & Things to Know

The art of using the terminal as your main interface to interact with the machine requires time and patience.

The hardest part is probably adding new tools to your workflow and getting used to them. This is because sometimes you don't even know there is a command-line alternative for something you want to do.

Here is a list of other extremely useful programs to incorporate to your workflow.

* [`curl`](https://curl.haxx.se/), for transferring data with URLs. I mostly use it to do HTTP requests.
* [`jq`](https://stedolan.github.io/jq/), for working with JSON.
* [`sed`](http://www.grymoire.com/Unix/Sed.html), for transforming text. I absolutely adore `sed`.
* [`ag`](https://github.com/ggreer/the_silver_searcher), for searching code.
* [`awk`](https://www.gnu.org/software/gawk/manual/gawk.html), for transforming and extracting data. I don't use it much, but it is particularly useful for scripting or for combining programs effectively.
* [`cron`](https://en.wikipedia.org/wiki/Cron), for scheduling jobs.
* [`rsync`](https://rsync.samba.org/), for transferring files.
* [`make`](https://www.gnu.org/software/make/), for automating tasks.
* [`gzip`](https://www.gzip.org/), for working with compressed files.

Being a versed terminal user also requires knowledge about basic management commands, streams, UNIX permissions and shell scripting.


<br>

## Other Recommended Resources

* [arabesque](https://sanctum.geek.nz/arabesque/), a blog by [Tom Ryder](https://sanctum.geek.nz/)
* [The Tao of Tmux](https://leanpub.com/the-tao-of-tmux/read)
* [Learn VimScript The Hard Way](http://learnvimscriptthehardway.stevelosh.com/)
* [vim-wikia](http://vim.wikia.com)


<br>

## Rule Number One

*Whenever in doubt, read the manual*.
