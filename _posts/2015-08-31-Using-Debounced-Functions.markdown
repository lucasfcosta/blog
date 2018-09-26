---
layout: post
title : Using Debounced Functions
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : coding javascript debounce
---

If you've been struggling with performance or losing your hair due to constant requests to the server get ready to start using debounced functions. I cannot guarantee your problems will be solved, but at least you will have one more way to deal with them.

<br>

# ***But I don't even know what a debounced function is!***

No need to worry sailor!
**A debounced function is a function that has a waiting time and a callback, after it stops being called for the given time period then the callback function gets executed.** Simple, isn't it?

<br>

# ***Ok, how can I create debounced functions?***

To create debounced functions you can use something like this:

{% highlight javascript %}
function debounce(callback, waitingTime, immediate) {
    var timeout;           

    return function() {
        var context = this;
        var args = arguments;

        var shouldCallNow = immediate && !timeout;

        // Resets the callback timer
        clearTimeout(timeout);

        // Schedules the callback to run on the next N ms
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) {
                callback.apply(context, args);
            }
        }, waitingTime);

        if (shouldCallNow) {
            callback.apply(context, args);
        } 
     };
};
{% endhighlight %}

Carefully reading the code above you will note that if you call it using: 

* The function you want to debounce (the callback)
* The waiting time 
* A boolean value indicating if your callback function should be called immediately for the first time

It returns a new anonymous function, **that is our debounced function**!

If you used `true` as the third argument the debounced function itself will check if it's the first time it is running (it's the same as checking if timeout is still undefined) and do your callback immediately.

Everytime you call your new debounced function the callback will be scheduled to run on the next N milliseconds you established when creating it. If you call it again before the callback reaches the time it was scheduled to run the timer will be cleared and the callback will be rescheduled for the next N milliseconds again.

<br>

# ***How am I supposed to use this?***

Let's say you want to show a list of suggestions for an input as your user types, something like an [autocomplete](https://en.wikipedia.org/wiki/Autocomplete). You certainly won't want your application to send a request to the server everytime the user types a character, this would make your aplication very slow and it would be very bad for your server. How can we solve this? Using debounced functions, of course!

First of all let's say we have a `getSuggestions` function that takes a string, does an AJAX request and returns completion suggestions based on that string. Let's also say our input's id is `nameInput`.

Now we know these things let's create a debounced `getSuggestions` function. It should be triggered 750ms after it stops being called. This is the code for doing it:

{% highlight javascript %}
var getSuggestionsDebounced = debounce(getSuggestions, 750, true);
{% endhighlight %}

Ok, now we've got a debounced function we will call it everytime the user types a new character:

{% highlight javascript %}
var nameInput = document.getElementById('nameInput');

nameInput.addEventListener('keydown', getSuggestionsDebounced(nameInput.value));
{% endhighlight %}

Well, **it's done! Simple, isn't it?**

Now everytime the user types a character into the input the `getSuggestions` function will be scheduled to run (using the input's content as argument) after the next 750 ms, if the users types another character before this time the timer will be cleared and `getSuggestions(inputContent)` will be rescheduled.

This means that we won't be sending many requests for suggestions until the user stops typing for a little bit of time. **Yeah, Louis Armstrong, what a wonderful world.** 

<br>

# ***OH GOD, THAT'S AWESOME, I WANT MORE!!11!1***

Hey folks, if you want more you check out this [StackOverflow question](http://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript#_=_) and [this awesome article written by David Walsh](http://davidwalsh.name/javascript-debounce-function).

<br>

**In this post you should've learned:**

- What is a debounced function
- How it works
- How to create debounced functions
- How to use them as the programming god you were born to be
