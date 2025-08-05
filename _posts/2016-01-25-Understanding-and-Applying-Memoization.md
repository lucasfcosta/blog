---
layout: post
title : Memoization in Javascript
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : coding javascript memoize
---

Memoization is one of those great things which makes you ask yourself: "how could I have lived without this?". This isn't all about science, it's about performance awesomeness.

Before we start talking about how memoization works and when to use it, we should get to know what this term actually means, [according to a great ancient god of the internet called Wikipedia](https://en.wikipedia.org/wiki/Memoization), this is the definition of memoization:

>In computing, memoization is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Thanks, Wikipedia, this seems like a great and simple explanation.



# ***When should I use memoization?***

Well, you should use memoization when you have expensive operations which can have their results cached for later use, this way you won't be recalculating things and spending unnecessary CPU time.

This technique is specially useful when it comes to [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming), because when we dissolve our code into smaller parts we are able to cache the results only for the subproblems we are dealing with instead of storing every procedure's result.

Another extremely important factor to decide whether or not you should use memoization is the reusability of the problem's results. For example: if you've got a function that gets the current [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) and does an operation using this value you certainly won't want the result of this function to be cached, because everytime you call it the result may be different, therefore not being cacheable (unless you want some bugs).

You should be aware that my answer is very simplistic and there are other factors you should take into account when using memoization, such as the range of potential inputs and most common inputs. If you are interested into another interesting examples and considerations about memoize please read [this StackOverflow discussion](http://stackoverflow.com/questions/3242597/what-is-memoization-good-for-and-is-it-really-all-that-helpful).

Enough talking, it's time we get to code. Open your favorite text editor and follow me!



# ***I'm ready, give me some memoization awesomeness!***

Let's have a humble start and use a common and easy to understand example: the **[Fibonacci's sequence](https://en.wikipedia.org/wiki/Fibonacci_number)**.

Our function will calculate the Nth Fibonnacci number recursively. Considering the starting numbers of the sequence as 0 and 1, this is the function we're going to use:

{% highlight javascript %}
// This calculates the Nth number of the fibonacci sequence (the index starts at 0)
function fibonacci(n) {
  timesCalculated++;

  if (n < 2)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}
{% endhighlight %}

Now that you've seen our raw function, let me show you the whole code we will execute so that you can see every meaningful data printed to the console:

{% highlight javascript %}
// Change the value below multiple times and test this code
var fIndex = 20;

// This counts how many times we've calculated fibonacci(n)
var timesCalculated = 0;

// This calculates the Nth number of the fibonacci sequence (the index starts at 0)
function fibonacci(n) {
  timesCalculated++;

  if (n < 2)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Here we are just printing the results to the console
var startTime = Date.now();
console.log('Result: ' + fibonacci(fIndex));
var endTime = Date.now();

console.log('Elapsed Time: ' + (endTime - startTime) + 'ms.');
console.log('Calculated fibonacci ' + timesCalculated + ' times.');
{% endhighlight %}

Please notice that I've also created a counter in order to know how many times we've calculated the `fibonacci` value for that index. I also measured the elapsed time between the start and the end of the calculation so that we can compare the results before and after the use of the memoization technique.

When calling our `fibonacci` function with `5` as an argument, for example, this is what happens:
1. Our function calls `fibonacci(4)` and `fibonacci(3)`, because the 5th Fibonacci number is equal to the 4th + 3rd numbers.
2. Each of these calls does the same thing, asking for the sum of the two fibonacci numbers immediately before
3. When asking for `fibonacci(1)` or `fibonacci(0)` the function will return the argument value itself

**If you're having trouble understanding this recursion I highly recommend you read the answers to [this question in StackOverflow](http://stackoverflow.com/questions/8845154/how-does-the-the-fibonacci-recursive-function-work).**

Give it a chance and **run the code above** (preferrably on Node.js so that your browser won't get stuck). You will notice that the bigger the Fibonacci's number index gets the most times the `fibonacci` value is calculated. You will also notice a meaningful increase in the elapsed time.

**When running the code above to get the 20th fibonacci number you will notice that `fibonacci(n)` gets calculated 21891 times.** This seems a lot (and, in fact, it is), so here comes memoization to the rescue.

We are now going to store the results for the operations happening inside our function on an outer function, which also contains our main `fibonacci` calculation algorithm. They key for caching each result will be the input number that was provided. Take a look at our new code:

{% highlight javascript %}
function fibonacci(n) {
  // We will store our results here
  var resultsCache = {};

  // This is the inner function containing our fibonacci algorithm
  function innerFibonacci(n) {
    var result;

    // If the result for the input `n` is already on the resultsCache
    // we will use it instead of executing the whole algorithm
    if (resultsCache[n] !== undefined) {
      result = resultsCache[n];
    } else {
      if (n < 2)
        result = n;
      else
        result = innerFibonacci(n - 1) + innerFibonacci(n - 2);
        
      resultsCache[n] = result;
    }
    
    return result;
  }

  return innerFibonacci(n);
}
{% endhighlight %}

Basically, it does the same thing as before, it is still recursive, but this time, instead of calling itself and calculating a new result for every number, it checks if that input has already been used and then, if it was, it retrieves the result for that. 

For this to work, I just had to create an object called `resultsCache` which has key/value pairs in which the `key` is the input provided for the function that calculates the fibonacci number and the `value` is its result. If that input has not been used yet, I register the result for it on our `resultsCache` object before returning the value.

Well, now we've got our function let's add a little bit of code in order to measure it's performance:

{% highlight javascript %}
// Change the value below multiple times and test this code
var fIndex = 20;

// This counts how many times we've calculated fibonacci(n)
var timesCalculated = 0;

function fibonacci(n) {
  // We will store our results here
  var resultsCache = {};

  // This is the inner function containing our fibonacci algorithm
  function innerFibonacci(n) {
    var result;

    // If the result for the input `n` is already on the resultsCache
    // we will use it instead of executing the whole algorithm
    if (resultsCache[n] !== undefined) {
      result = resultsCache[n];
    } else {
      timesCalculated++;
      if (n < 2)
        result = n;
      else
        result = innerFibonacci(n - 1) + innerFibonacci(n - 2);
        
      resultsCache[n] = result;
    }
    
    return result;
  }

  return innerFibonacci(n);
}

// Here we are just printing the results to the console
var startTime = Date.now();
console.log('Result: ' + fibonacci(fIndex));
var endTime = Date.now();

console.log('Elapsed Time: ' + (endTime - startTime) + 'ms.');
console.log('Calculated fibonacci ' + timesCalculated + ' times.');
{% endhighlight %}

So, we've got the same algorithm applied both with and without memoization, let's run both and compare the results:

- **20th Fibonacci Number (Result: 6765)**
  - Without memoization
    - Elapsed Time: 2ms.
    - Calculated fibonacci 21891 times.
  - Memoized
    - Elapsed Time: 0ms.
    - Calculated fibonacci 21 times.


- **30th Fibonacci Number (Result: 832040)**
  - Without memoization
    - Elapsed Time: 23ms.
    - Calculated fibonacci 2692537 times.
  - Memoized
    - Elapsed Time: 1ms.
    - Calculated fibonacci 31 times.


- **50th Fibonacci Number (Result: 12586269025)**
  - Without memoization
    - Elapsed Time: 564623ms.
    - Calculated fibonacci 40730022147 times.
  - Memoized
    - Elapsed Time: 0ms.
    - Calculated fibonacci 51 times.

As the desired fibonacci index increases, so does the difference between memoized and non-memoized routines. **Discovering the 50th fibonacci number without applying the memoize technique took us 564623 milliseconds (which is about 9 minutes) while the memoized version of the same code ran in less than 1 millisecond.**

At this point you may be thinking if there is an easier way to create memoized functions. I think we both agree that doing what we just did for every single function we want to apply memoization on our code would be a pain. So, let me answer you: yes there is an elegant way for doing that.



# ***Show me the "Elegant Way"!***

Thanks to JavaScript awesome language design we are able to return functions from functions, so we will use this "feature" to return a function which has a cache property inside itself. The code I'm going to show you here was heavily inspired by [this article written by Addy Osmany](https://addyosmani.com/blog/faster-javascript-memoization/) in which he talks about memoization techniques and performance. This may not be the best implementation when it comes do performance, but I'm keeping it simple because I want readers to comprehend memoization and its benefits as a whole instead of implementing the faster available algorithm.


{% highlight javascript %}
function memoize(fun) {
  return function() {
    // We will use a hash made using arguments to map our results
    var hash = '';

    // If our function has no memoize property, we initialize it to store results
    fun.memoize || (fun.memoize = {});

    // If an argument cannot be added directly to our hash we stringify it
    for (var i = 0; i < arguments.length; i++) {
      hash += (arguments[i] === Object(arguments[i])) ?
        JSON.stringify(arguments[i]) : arguments[i];
    }

    // If the hash created with the current arguments already exists into fun.memoize it means we have its result cached
    if (hash in fun.memoize) {
      // Here we are returning the cached value
      return fun.memoize[hash];
    }

    // If we don't have any value cached for this input we call it and cache its result
    return fun.memoize[hash] = fun.apply(this, arguments);
  }
}
{% endhighlight %}

That's it! Now we're able to use the memoization technique on any function just by passing it to our `memoize` function. Just like:

{% highlight javascript %}
  // This could be any function
  function add(a, b) {
    return a + b;
  }

  // `memoizedAdd` now does the same thing as `add`, but it is memoized
  var memoizedAdd = memoize(add);
{% endhighlight %}

How about we use this technique with our old fibonacci function? Be careful, just assigning the memoized function to a new variable won't be enough, because it's a recursive function, what we've really got to do is replace itself with the new memoized function. The whole code would look like this:

{% highlight javascript %}
function fibonacci(n) {
 if (n < 2)
   return n;
 else
   return fibonacci(n - 1) + fibonacci(n - 2);
}

function memoize(fun) {
  return function() {
    let hash = '';
    fun.memoize || (fun.memoize = {});

    for (let arg of arguments) {
      hash += (arg === Object(arg)) ? JSON.stringify(arg) : arg;
    }

    if (hash in fun.memoize) {
      return fun.memoize[hash];
    }

    return fun.memoize[hash] = fun.apply(this, arguments);
  }
}

// We have to replace the original fibonacci function with the memoized one because it is recursive and ends up calling itself
fibonacci = memoize(fibonacci);

// And now...
console.log(fibonacci(90));
{% endhighlight %}

And now we're finally done. I hope you have enjoyed this wild ride through the world of memoization. Before saying goodbye I would like to add some really useful links in which this article was based, they're all really cool and I'm sure you will learn something with them:

- [Faster JavaScript Memoization - By Addy Osmani](https://addyosmani.com/blog/faster-javascript-memoization/)
- [Implementing Memoization in Javascript - SitePoint](http://www.sitepoint.com/implementing-memoization-in-javascript/)

See you soon!

**In this post you should've learned:**

- What is memoization and how it works
- How to decide whether or not you should use memoization
- How to implement memoization on JavaScript
