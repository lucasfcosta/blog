---
layout: post
title : Memoization in Javascript
author: Lucas Fernandes da Costa
tags : coding javascript memoize
---

Memoization is one of those great things which makes you ask yourself: "how could I have lived without this?". This isn't all about science, it's about performance awesomeness.

Before we start talking about how memoization works and when to use it, we should get to know what this term actually means, [according to a great ancient god of internet called Wikipedia](https://en.wikipedia.org/wiki/Memoization), this is the definition of memoization:

>In computing, memoization is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Thanks, Wikipedia, this seems like a great and simple explanation.

<br>

# ***When should I use memoization?***

Well, you should use memoization when you have expensive operations which can have their results cached for later use, this way you won't be recalculating things and spending unnecessary CPU time.

This technique is specially useful when it comes to [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming), because when we dissolve our code into smaller parts we are able to cache the results only for the subproblems we are dealing with instead of storing every procedure's result.

Another extremely important factor to decide wheter or not you should use memoization is the reusability of the problem's results. For example: if you've got a function that gets the current [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) and does an operation using this value you certainly won't want the result of this function to be cached, because everytime you call it the result may be different, therefore not being cacheable (unless you want some bugs).

You should be aware that my answer is very simplistic and there are other factors you should take into account when using memoization, such as: range of potential inputs and most common inputs. If you are interested into another interesting examples and considerations about memoise please read [this StackOverflow discussion](http://stackoverflow.com/questions/3242597/what-is-memoization-good-for-and-is-it-really-all-that-helpful).

Enough talking, it's time we get to code. Open your favorite text editor and follow me!.

<br>

# ***I'm ready, give me some memoization awesomeness!***

Let's have a humble start and use a common and easy to understand example, the **[Fibonacci's sequence](https://en.wikipedia.org/wiki/Fibonacci_number)**.

Our function will to calculate the Nth Fibonnacci number recursively. Considering the starting numbers of the sequence as 0 and 1, this is the code we're going to use:

{% highlight javascript %}
// Change the value below multiple times and test this code
var fIndex = 20;

// This counts how many times we've called fibonacci(n)
var timesCalled = 0;

// This calculates the Nth number of the fibonacci sequence (the index starts at 0)
function fibonacci(n) {
  timesCalled++;

  if (n < 2)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

var startTime = Date.now();
console.log('Result: ' + fibonacci(fIndex));
var endTime = Date.now();

console.log('Elapsed Time: ' + (endTime - startTime) + 'ms.');
console.log('Called fibonacci function ' + timesCalled + ' times.');
{% endhighlight %}

Please note that I've also created a counter in order to know how many times we've called the `fibonacci` function. I've also measured the elapsed time between the start and the end of the calculation so that we can compare the results before and after the use of the memoization technique.

When calling our `fibonacci` function with `5` as an argument, for example, this is what happens:
1. Our function calls `fibonacci(4)` and `fibonacci(3)`, because the 5th Fibonacci number is equal to the 4th + 3rd numbers.
2. Each of these calls does the same thing, asking for the sum of the two fibonacci numbers immediately before
3. When asking for `fibonacci(1)` or `fibonacci(0)` the function will return the argument value itself

**If you're having trouble understanding this recursion I highly recommend you read the answers to [this question in StackOverflow](http://stackoverflow.com/questions/8845154/how-does-the-the-fibonacci-recursive-function-work).**

Give it a chance and **run the code above** (preferrably on Node.js so that your browser won't get stuck). You will notice that the bigger the Fibonacci's number index gets the most times the `fibonacci` function gets called. You will also notice a meaningful increase in the elapsed time.

<br>

**In this post you should've learned:**

- X
- Y
- Z