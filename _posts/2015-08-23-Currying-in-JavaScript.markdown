---
layout: post
title : Currying in JavaScript
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : coding javascript currying
---

Hi Sir, do you have a moment to talk about currying? Well, I hope you do, because this is one of the most useful techniques when it comes to [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming).

<br>

# ***Ok, but first can you tell me what is currying?***

Of course I do Sir, here's [the definition of currying according to Wikipedia](https://en.wikipedia.org/wiki/Currying):

> In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument (partial application).

Don't worry if you didn't get it by now, it's fine, you will surely understand what we're talking about if you let me give some examples.

<br>

# ***Give an example then!***

As you wish!

Here we're going to create a sum function that takes only one argument at a time.

{% highlight javascript %}
var sum = function firstFunction(a) {
  return function secondFunction(b) {
    return a + b;
  }
}

var onePlus = sum(1);
var result = onePlus(2);

console.log(result);
// --> 3
{% endhighlight %}

**Here's what happens when running the code above:**

When calling `var onePlus = sum(1)`, you receive the `secondFunction(b)` and assign it to the `onePlus` variable.

There's an important detail to pay attention here: the `a` variable inside `secondFunction` gets the value you've given as a parameter to the `firstFunction`.

In a nutshell: imagine `onePlus` is equivalent to the following:
{% highlight javascript %}
onePlus = function secondFunction(b) {
  return 1 + b
}
{% endhighlight %}

After assigning `secondFunction` to the `onePlus` variable we're calling it and passing `2` as an argument. This means that when we write `onePlus(2)` we're invoking `secondFunction` using `2` as an argument.

In the example above we've used currying to add any number to `1`, now let's suppose we need to add any number to 50, how would we do it?

{% highlight javascript %}
var fiftyPlus = sum(50);

console.log(fiftyPlus(10));
// --> 60

console.log(fiftyPlus(50));
// --> 100
{% endhighlight %}

<br>

# ***This is awesome, can you give me one more example?***

Of course I can.

Here's the code:

{% highlight javascript %}
var epicFunction = function(anyName) {
  return function(occupation) {
    return function(currentState) {
      return anyName + ' is the greatest ' + occupation + ' ' + currentState + '.';
    }
  }
}

var aboutLucas = epicFunction('Lucas')('programmer')('alive');
console.log(aboutLucas);
// --> Lucas is the greatest programmer alive.
{% endhighlight %}

In the example above we're calling `epicFunction` and then getting it's result (which in this case is another function) and invoking it again passing another parameter.
For each call we've made the variables inside the innermost function are being assigned the values we pass to the outermost functions.

**Just in case you still didn't get it, I'm gonna show you what happens step by step:**

{% highlight javascript %}
var epicFunction = function(anyName) {
  return function(occupation) {
    return function(currentState) {
      return anyName + ' is the greatest ' + occupation + ' ' + currentState + '.';
    }
  }
}

// First let's call the outermost function
var ryanIsTheGreatest = epicFunction('Ryan Ghosling');
{% endhighlight %}

Now `ryanIsTheGreatest` is the same as:

{% highlight javascript %}
ryanIsTheGreatest = function(occupation) {
  return function(currentState) {
  	return 'Ryan Ghosling' + ' is the greatest ' + occupation + ' ' + currentState + '.';
  }
}
{% endhighlight %}


If we do:

{% highlight javascript %}
var greatestActor = ryanIsTheGreatest('actor');
{% endhighlight %}

The variable `greatestActor` will be the same as:

{% highlight javascript %}
greatestActor = function(currentState) {
  	return 'Ryan Ghosling' + ' is the greatest ' + 'actor' + ' ' + currentState + '.';
  }
{% endhighlight %}


Finally, when doing:

{% highlight javascript %}
var greatestActorAlive = greatestActor('alive');
{% endhighlight %}

`greatestActorAlive` will contain the following string: `Ryan Ghosling is the greatest actor alive.`


<br>

**In this post you should've learned:**

- What is Currying
- How it works
- That [Ryan Ghosling](https://en.wikipedia.org/wiki/Ryan_Gosling) is the best actor alive
