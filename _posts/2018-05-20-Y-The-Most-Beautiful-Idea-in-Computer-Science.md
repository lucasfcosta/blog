---
layout: post
title: "Y: The Most Beautiful Idea in Computer Science explained in JavaScript"
author: Lucas Fernandes da Costa
tags: functional-programming combinators javascript y-combinator
---

In this post, we will talk about **one of the most beautiful ideas in computer science: the Y-Combinator**. And no, I'm not talking about [the VC firm in Silicon Valley](http://www.ycombinator.com/), even though this post will explain why they've got this name.

Put in simple terms, **the Y-Combinator (also known as the fixed-point combinator) is a way of doing recursion in a language that does not explicitly supports it**.

Let's say you want to implement a recursive [factorial function](https://en.wikipedia.org/wiki/Factorial). In JavaScript, for example, you could simply do this:

```js
const factorial = n => n === 0 ? 1 : n * factorial(n - 1);
```

But what if you couldn't use any "names"? What if JavaScript didn't allow you to call `factorial` inside of `factorial`, how would you implement it?

In that case, you'd use the Y-Combinator.

It doesn't have many use cases for solving real world problems, but it is not only one of the most mind blowing ideas in computer science and a great mental exercise, but it also separates those who really understand what functional programming is about from those who don't.

Before we start I need to warn you that **deriving the Y-Combinator for the first time is hard** and that **it's normal to struggle with it**. So don't feel bad if you have to read this blog post more than once in order to get it. **I tried to make it very detailed and show every single step of what is happening on each example but [if you feel like you're advanced enough and want to read the short version of it, just click here](/2018/05/20/Y-The-Most-Beautiful-Idea-in-Computer-Science.html#finding-the-y-combinator)**.

I recommend that you **follow this post with a notebook or on Node's REPL** and test things by yourself, that will help you understand all the steps we'll go through. **Don't be afraid of trying things out and testing each example. Doing your own exploration plays a great part in understanding how Y works**.

Also, if you want to learn more about recursion [I've got a very popular post about it in this very same blog](/2017/05/08/All-About-Recursion-PTC-TCO-and-STC-in-JavaScript.html). It's a bit old but it remains amazing and very informative.

I guarantee you **this will be one of the most amazing journeys you will go through when it comes to functional programming**. The first time deriving the Y-Combinator is an indescribable joy, so get comfortable in your chair, bed, or whatever and let's get started.


<br>

## **First things first: what on earth is a combinator?**

**A combinator is a function with no free variables**.

**Free variables are variables defined outside of the function's scope**. They're **the opposite of bound variables**, which are variables that only exist inside of a function's scope.

Let's use an example to make it easier to understand:

```js
const num = 13;

const sumPlusThirteen = (a, b) => a + b + num
```

In the example above, our function `sumPlusThirteen` uses the variables `a`, `b` and `num`. **The variables `a` and `b` are bound variables because they are bound to the function's parameters**: when we refer to their names we are referring to values that were passed to the `sumPlusThirteen` function. However, **the variable `num` refers to a value outside of the function's scope, which means it is a free variable**.

Let's look at some more examples:

1. `x => x` - `x` is a bound variable, because it's bound to the function's parameters
2. `x => x + y` - `x` is a bound variable because it's bound to the function's parameters and `y` is a free variable because it refers to a value outside of the function's scope
3. `x => y + z` - `y` and `z` are both free variables because they refer to values outside of the function's context
4. `(x, y) => x + y` - Both `x` and `y` are bound variables because they are bound to the function's parameters

Getting back to combinators, we can now say that the following functions are all combinators:

1. `x => x` is a combinator because `x` is the only variable in the function's body and it's bound to the function's parameters
2. `(x, y) => y` - is a combinator because the only variable in its body (`y`) is bound to the function's parameters.
4. `x => y` - is not a combinator because the variable in its body (`y`) refers to something outside of the function's context
5. `(x, y) => x(y(z))` is not a combinator, because one of the variables in its body (`z`) refers to a something outside of the function's context

I could write an entire blog post about this, but for now, this basic knowledge will suffice. I highly recommend that you read more about [bound versus free variables](https://stackoverflow.com/questions/21855838/what-are-free-and-bound-variables) and [pass-by-context versus pass-by-name](https://stackoverflow.com/questions/838079/what-is-pass-by-name-and-how-does-it-work-exactly) though.


<br>

## **Deriving Y**

### Discovering what we need

Now that we know what a combinator is, let's get to the funniest part of this post and derive the Y-Combinator itself.

Let's get back to our recursive factorial definition:

```js
const factorial = n => n === 0 ? 1 : n * factorial(n - 1);

// I'm just using this to prove it actually works
console.log(factorial(5)); // 120
```

This is how it works:

[![Calls happening when you calculate the factorial of 5 recursively](/assets/factorial-calls.png)](/2017/05/08/All-About-Recursion-PTC-TCO-and-STC-in-JavaScript.html)

As you might remember, **what we want is a way of calling `factorial` without referring to its own name, we want a function which does not have any free variables, but is still recursive**.

Considering this goal, the most obvious thing here would be to **eliminate the call to `factorial` inside the function's body**. In order to do this, we'd do one of the simplest and most common refactoring techniques in functional programming: we'll remove the `factorial` reference from the function's body and make it a parameter:

```js
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);
```

Now, in order for us to calculate the factorial of a number we must pass a function `f` to `factorialGenerator` so that it can call it with `n - 1` whenever `n` is not `0`. If you passed in a function `myFun`, for example, you'd get back: `n => n === 0 ? 1 : n * myFun(n - 1)`.

Let's see what happens if we call this function with any function and then `0`:

```js
const literallyAnyFunction = () => null
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(factorialGenerator(literallyAnyFunction)(0)); // 1
```

Look, it already works for `0`, and we can use `literallyAnyFunction` for that! Isn't it amazing?

This is because when passing zero to the function returned by `factorialGenerator`, `n` will be equal `0` and then it will return `1`. We won't even need to call the function we passed in (which is `literallyAnyFunction`).

But what if we try to calculate the factorial of `1` in the same way?

```js
const literallyAnyFunction = () => 'a string'
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(factorialGenerator(literallyAnyFunction)(1)); // NaN
```

Whoah seems like we've got `NaN`. This definitely not right!

In order to understand what has happened let's take a look at the function returned by calling `factorialGenerator` and passing it `literallyAnyFunction`:
```js
const literallyAnyFunction = () => 'a string'
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const fn = factorialGenerator(literallyAnyFunction);
// fn is: n => n === 0 ? 1 : n * (() => 'a string')(n - 1));
```

As you can see, in the function returned by `factorialGenerator(literallyAnyFunction)`, if `n` is not `0` we will have to call `literallyAnyFunction` with `n - 1` and then multiply the result of that by `n`. And what is the result of multiplying a `String` by a `Number` in JavaScript? Exactly, it's `NaN`.

Okay, but what if try calculating the factorial of `2` also using `factorialGenerator(literallyAnyFunction)`? Will it work?

```js
const literallyAnyFunction = () => 'a string'
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(factorialGenerator(literallyAnyFunction)(2)); // NaN
```

Of course not. It's still `NaN`. But that's not what I want to show you this time. What I want to show you is that `literallyAnyFunction` has only been called once.

This is what happened:

1. `factorialGenerator` has been called with `literallyAnyFunction` and returned a function
2. That function has been called with `2`
3. `2` is not equal `0`, so we'll do `2 * literallyAnyFunction(2 - 1)`
4. `literallyAnyFunction(2 - 1)` will return `'a string'`
5. We'll try to multiply `'a string'` by `2` and `NaN` will be returned

As I've said, there was only a single call to `literallyAnyFunction`.

Let's make that more obvious by adding a `console.log` to `literallyAnyFunction`, like this:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(factorialGenerator(literallyAnyFunction)(2));
```

See? `literallyAnyFunction` has only been called once. Now test it again with `0`, `1` and `2`. What happens?

* For `0` it returns `1`, which is the correct answer and does not call `literallyAnyFunction` at all
* For `1` and `2` it returns `NaN`, which is the correct answer and calls `literallyAnyFunction` once

Do you notice any pattern here? Whenever we have to call `literallyAnyFunction` and multiply the string it returns we get back `NaN`. If only we had a way to avoid it...

Well, we actually have!

If we call `factorialGenerator` with `factorialGenerator(literallyAnyFunction)`, the first time `f` is called, it will be `factorialGenerator`, which means we'll call `factorialGenerator` with `n - 1` instead of calling `literallyAnyFunction`.

Look!

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const result = factorialGenerator(
    factorialGenerator(literallyAnyFunction)
)(1);

// It works!
console.log(result); // 1
```

Awesome, it works! But what did happen?

1. The first thing that has been evaluated was `factorialGenerator(literallyAnyFunction)`. That returned a function which returns `1` if the argument passed to it is `0`, otherwise, it will call the `literallyAnyFunction` passed to it
2. Then we call `factorialGenerator` again with that function we've just returned
3. Finally, the function we've obtained will only call `factorialGenerator` the first time it has to call `f`. After that, it will call `literallyAnyFunction`
4. When it's called with it `1` it sees that `1` is not equal to `0`, so it will call `f` (which is `factorialGenerator`) with `n - 1` (a.k.a. `0`) and multiply the result of that by `1`
5. Now that `factorialGenerator` has been called with `0` it will see that `n` is equal to `0` and return `1`. This `1` will be multiplied by `1`, returning `1`, which is the correct answer.

**Notice that `literallyAnyFunction` has not been called at all.**

If understanding recursion still seems hard to you, once again I recommend you to read [this blog post where I explain how to think about recursion in an easy way](/2017/05/08/All-About-Recursion-PTC-TCO-and-STC-in-JavaScript.html) first and then come back here.

Another question for you: will this technique work with `2` too?

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const result = factorialGenerator(
    factorialGenerator(literallyAnyFunction)
)(2);

console.log(result); // NaN
```

Oops! It doesn't!

As you can see, this time, `literallyAnyFunction` has been called, because the second time we have to call `f` it was `literallyAnyFunction`. How could we avoid it? Easy, just pass in `factorialGenerator` again.

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const result = factorialGenerator(
    factorialGenerator(
        factorialGenerator(literallyAnyFunction)
    )
)(2);

console.log(result); // 2
```

Look, it works again! This happens because we don't call, `literallyAnyFunction`, instead, we just keep calling `factorialGenerator` until we reach `0`, then the results bubble back up, the same way it happened in the previous example.

This is what happened this time:

```
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const result = factorialGenerator(
    factorialGenerator(
        factorialGenerator(literallyAnyFunction)
    )
)(2);

//  n => 2 === 0 ? 1 : 2 * factorialGenerator(2 - 1)
//  n => 1 === 0 ? 1 : 1 * factorialGenerator(1 - 1)
//  n => 0 === 0 ? 1 : 0 * literallyAnyFunction(0 - 1) - literallyAnyFunction won't be called!

console.log(result); // 2

```

Want to make it work for `3`? Easy, just add another call to `factorialGenerator`:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const result = factorialGenerator(
    factorialGenerator(
        factorialGenerator(
            factorialGenerator(literallyAnyFunction)
        )
    )
)(3);

console.log(result); // 6
```

Feel like calculating the factorial of `4` too? There goes another call to `factorialGenerator`:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const result = factorialGenerator(
    factorialGenerator(
        factorialGenerator(
            factorialGenerator(
                factorialGenerator(literallyAnyFunction)
            )
        )
    )
)(4);

console.log(result); // 24
```

We've got so many parentheses in that example it already started looking like LISP.

This shows that in order to be able to calculate the `factorial` of any number we'd just need to have infinite calls to `factorialGenerator` being passed to each other:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const factorial = factorialGenerator(
    factorialGenerator(
        factorialGenerator(
            factorialGenerator(...)
        )
    )
);
```

Another way to think about this is that what you want to happen is for the `f` inside `factorialGenerator` to always be the function returned by it. By doing this you guarantee that you will always call the inner function again.


<br>

### Fixed Points

Now let's stop for a moment a talk about another very important concept for understanding Y: **the fixed point**.

**The fixed point of a function is that value that when applied to it results in itself.** Basically, **if you call a function `f` with `fixpoint`, the output should be equal to `fixpoint`**.

Get a calculator and just keep pressing the `cos` key until the result doesn't change anymore. You should get something like `0.73908513321` (might change depending on your calculator's precision). This means that `0.73908513321` is the fixed point of the `cos` function since once we do `cos(0.73908513321)` we get back `0.73908513321`.

Let's summarize this in a single expression:

```js
f(fixpoint) = fixpoint
```

As you can see, since `f(fixpoint`) is the same thing as `fixpoint` we can just replace the `fixpoint` inside of `f` with `f(fixpoint)`, like this:

```js
// I've put f(fixpoint) to the right to make it easier to read
fixpoint = f(fixpoint)
fixpoint = f(f(fixpoint))
fixpoint = f(f(f(fixpoint)))
fixpoint = f(f(f(f(fixpoint))))
fixpoint = f(f(f(f(f(fixpoint)))))
// We could go on forever...
```

This looks familiar, doesn't it? Of course it does, it's exactly what we want! We want to be able to nest infinite calls to `factorialGenerator` inside of itself whenever we need to do recursion.

This is why we want to find the Y combinator. The Y Combinator is the combinator that allows us to find the fixpoint of a function like `factorialGenerator` so that we can make it recursive!


<br>

### Finding Y

When applying a function to Y we want it to return the fixed point of that function, like this:

```
Y(f) = fixpoint
```

Considering that the `fixpoint` of a function is the value that when applied to it returns `fixpoint`, we can also say that:

```
Y(f) = fixpoint
Y(f) = f(fixpoint)
```

Now, if we just replace the fixpoint inside that second expression, look at what we've got:

```
Y(f) = f(Y(f))
```

That's the definition of what Y does! When passing a function `f` to `Y`, that's what it does (`f(Y(f))`). So, instead of showing what it does, let's define the Y function just by taking `f` as an argument instead of applying it to `Y`:

```js
const Y = f => f(Y(f))
```

Now, we're supposed to call `Y` passing `factorialGenerator` and get back a `factorial` function that works, right? Can we do this?

```js
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const Y = f => f(Y(f));

const factorial = Y(factorialGenerator);

console.log(factorial(5));
```

Nope, just not yet. If you try to execute the snippet above, this will happen:

```
RangeError: Maximum call stack size exceeded
    at Y (repl:1:11)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
    at Y (repl:1:18)
```

You will get a Stack Overflow because `Y` is calling itself infinitely. If you stop and replace `Y(f)` in the body of that function with its result, this will become obvious:

```js
const Y = f => f(Y(f));

// This is what happens when we apply `f` to it:
// Y(f) = f(Y(f));

// That means we can replace every `Y(f)` with `f(Y(f))`
// = f(Y(f));
// = f(f(Y(f)));
// = f(f(f(Y(f))));
// And so on...
```

In fact, this very definition would work in lazy (a.k.a. [`non-strict`](https://en.wikipedia.org/wiki/Strict_programming_language)) languages, because we would not need to evaluate that `Y(f)` in the body of `Y` instantly, instead we would only evaluate it when needed. This means that instead of infinitely doing that "replacement" we've just done, we would get back the function returned by `f` with `Y(f)` being the first argument it takes (without having to evaluate it).

Okay, so, in order to translate this to JavaScript we will need to delay the execution of `Y(f)` so that it does not get called immediately when we pass a function to `Y`.

And what is the easiest way of delaying the execution of a function in `JavaScript`?

A thunk! [A thunk is a function that wraps an expression to delay its evaluation](https://github.com/reduxjs/redux-thunk#whats-a-thunk).

```js
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;
```

Does this remember you of anything you probably use on a daily basis if you work with Redux? Exactly, [that's exactly what redux-thunk was made for](https://github.com/reduxjs/redux-thunk#motivation). In fact, [the very example above has been taken from their README](https://github.com/reduxjs/redux-thunk#whats-a-thunk).

Now that we know what a thunk is, let's delay the execution of `f(Y(f))` by wrapping it into a function:

```js
const Y = f => x => f(Y(f))(x);
```

Since the function returned by `factorialGenerator` will only take a single argument as a parameter, we can just wrap it inside a function that also takes a single argument and applies it to the result of `f(Y(f))`, which now will be a function that also takes a single argument instead of evaluating infinitely.

Let's make this more obvious by imagining what happens when we invoke Y with `factorialGenerator` and then apply `5` to it:

```js
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const Y = f => x => f(Y(f))(x);

const factorial = Y(factorialGenerator);

console.log(factorial(5));
```

1. Since Y returns a function which takes a single argument we'll get the function in its body back, which is `x => f(Y(f))(x)`.
    In that function we will be able to replace all `f`s with `factorialGenerator`:
    `x => factorialGenerator(Y(factorialGenerator))(x)`
    The trick here is that since everything is still wrapped inside of a function which takes `x` as an argument, we will only evaluate it when we pass `x` to that function.
2. The trick here is to notice that `factorialGenerator(Y(factorialGenerator))` will take that function which `Y(factorialGenerator)` returns but won't evaluate it once we have passed an argument (`x`) to it.
    It will basically return this: `n => n === 0 ? 1 : n * Y(factorialGenerator)(n - 1)`.
3. Doing another expansion, since `Y(factorialGenerator)` is equal to `x => factorialGenerator(Y(factorialGenerator))(x)` (as we've seen on step 1) we get: `n => n === 0 ? 1 : n * (x => factorialGenerator(Y(factorialGenerator)))(n - 1)`
4. Finally, we can invoke the function on the previous step with `5`, for example.
    This will cause the function in the body of `factorialGenerator` to have `n` replaced by `5`, and `f` will be the result of `Y(factorialGenerator)`, which is the exact same function we had on step 1.
    We'll then call the function on step 2 with `5 - 1`:
    `5 === 0 ? 1 : 5 * (x => factorialGenerator(Y(factorialGenerator)))(5 - 1)`.
5. This process will be repeated until we don't call the function on step 1 anymore, but return 1 instead because `n` reached 0, causing the multiplication to run and return the final result.

**And this, my friends, is the very definition of Y, but it is not the Y *combinator* yet**.

As you might remember, in order for it to be a combinator we should not have any free variables in its body, but in this case, we've got an explicit call to `Y`.


<br>

### Finding The Y Combinator

There are many ways to derive the Y Combinator, but I think that the easiest one for most people is, by far, to go from the factorial function to Y instead of using mathematical expressions.

As you might remember, at first we had a explicitly recursive `factorial` function which looked like this:

```js
const factorial = n => n === 0 ? 1 : n * factorial(n - 1);
```

Then, in order to remove explicit recursion we made the explicit recursive call to `factorial` an argument of this function:

```js
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);
```

Now, `factorialGenerator` is not explicitly recursive anymore, instead, it calls the function `f` passed to it. As long as the `f` inside of it is the function returned by `factorialGenerator`, we will be able to calculate factorials, since we'll keep invoking the inner function: `n => n === 0 ? 1 : n * f(n - 1)`.

But how can we make `factorialGenerator` always invoke its inner function?

We can make `f` call itself inside its body:

```js
const factorialRecursive = f => n => n === 0 ? 1 : n * f(f)(n - 1);

const factorial = factorialRecursive(factorialRecursive);

console.log(factorial(5)); // 120
```

And it works! This is because the first time we invoke `factorialRecursive` we get back:

```js
n => n === 0 ? 1 : n * factorialRecursive(factorialRecursive)(n - 1);
```

And then, when invoking it with `5`, for example, we'll call exactly the same function: `factorialRecursive(factorialRecursive)`, which, as you can see above, is the very same definition of `factorial` (and therefore returns the same thing).

This means that it will keep calling `factorialRecursive(factorialRecursive)` (which is, in fact, `factorial`) until `n` reaches `0`, meaning it will then return `1` and allow us to calculate the factorial of a number. Just like this:

```js
const factorialRecursive = f => n => n === 0 ? 1 : n * f(f)(n - 1);

const factorial = factorialRecursive(factorialRecursive);

// factorial is: n => n === 0 ? 1 : n * factorialRecursive(factorialRecursive)(n - 1);

console.log(factorial(5)); // 120

// n => 5 === 0 ? 1 : 5 * factorialRecursive(factorialRecursive)(5 - 1);

// n => 4 === 0 ? 1 : 4 * factorialRecursive(factorialRecursive)(4 - 1);

// n => 3 === 0 ? 1 : 3 * factorialRecursive(factorialRecursive)(3 - 1);

// n => 2 === 0 ? 1 : 2 * factorialRecursive(factorialRecursive)(2 - 1);

// n => 1 === 0 ? 1 : 1 * factorialRecursive(factorialRecursive)(1 - 1);

// n => 0 === 0 ? 1 : 0 * factorialRecursive(factorialRecursive)(0 - 1); // returns 1

// Notice that you can replace all the `factorialRecursive(factorialRecursive)` occurrences
// above for `factorial`, because they are the same thing.
```

Keep in mind that our goal is to make this process generic enough so that we can make it work for any function we want to make recursive, so let's remove `f(f)` so that we can get `factorialGenerator` back and extract it into the near future.

Making it an argument of that function and passing it inside through an [immediately invoked function](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) is how we're going to do that:

```js
const factorialRecursive = myFun => (f => n => n === 0 ? 1 : n * f(n - 1))(myFun(myFun));

const factorial = factorialRecursive(factorialRecursive)

console.log(factorial(5)); // RangeError: Maximum call stack size exceeded
```

Stack Overflow! Why did that happen? That happened because `myFun(myFun)` is the first thing to be evaluated, causing `factorialRecursive` to keep invoking itself indefinitely.

Remember what is the easiest way of delaying the execution of a function? Exactly, wrap it into another function.

```js
const factorialRecursive = myFun => (f => n => n === 0 ? 1 : n * f(n - 1))((x) => myFun(myFun)(x));

const factorial = factorialRecursive(factorialRecursive)

console.log(factorial(5)); // 120
```

Cool, it seems like we're back on track again. Now, we'll only evaluate `myFun(myFun)` everytime we pass an `x` in.

Also, renaming `myFun` to `g` might make it easier to read:

```js
const factorialRecursive = g => (f => n => n === 0 ? 1 : n * f(n - 1))((x) => g(g)(x));

const factorial = factorialRecursive(factorialRecursive)

console.log(factorial(5)); // 120
```

The cool thing is that now we don't even need to define factorial as `factorialRecursive(factorialRecursive)` anymore, we can just copy and paste it, making it call itself in its very same definition, like this:

```js
const factorial = (
    g => (f => n => n === 0 ? 1 : n * f(n - 1))((x) => g(g)(x)) // The function
)(g => (f => n => n === 0 ? 1 : n * f(n - 1))((x) => g(g)(x))); // Itself again as an argument

console.log(factorial(5)); // 120
```

I think we can all agree that just copying and pasting that function is a bit ugly, so why don't we create a function which takes a function and invokes it with itself and uses it?

```js
// `g => g(g)` is a function that takes a function and ivokes it with itself
const factorial = (g => g(g))(g => (f => n => n === 0 ? 1 : n * f(n - 1))((x) => g(g)(x)))

console.log(factorial(5)); // 120
```

Much better!

Finally we can extract the very definition of `factorialGenerator` (`f => n => n === 0 ? 1 : n * f(n - 1)`) we've got in the body of `factorial` and pass it in as an argument to make that function generic:

```js
const factorialGenerator = f => n => n === 0 ? 1 : n * f(n - 1);

const yCombinator = f => (g => g(g))(g => f((x) => g(g)(x)))

const factorial = yCombinator(factorialGenerator);

console.log(factorial(5)); // 120
```

**This is the Y-Combinator!**


<br>

## Applying it to other recursive functions

**Our Y-Combinator works with any non-explicitly recursive function which takes a single argument**.

**Let's see how it works for the [Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) function**.

We'll start by defining the Fibonacci function itself. It returns the Fibonacci number on a certain index `n`.

```js
const fibonacci = n => n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
```

Now, let's eliminate the explicit recursion by removing the explicit calls to `fibonacci` and making it an argument:

```js
const fibonacciGenerator = f => n => n <= 1 ? 1 : f(n - 1) + f(n - 2);
```

Finally, if we pass `fibonacciGenerator` to our `Y-Combinator` we'll get back a recursive `fibonacci` function:

```js
const fibonacciGenerator = f => n => n <= 1 ? 1 : f(n - 1) + f(n - 2);

const yCombinator = f => (g => g(g))(g => f((x) => g(g)(x)))

const fibonacci = yCombinator(fibonacciGenerator)

console.log(fibonacci(0)); // 1
console.log(fibonacci(1)); // 1
console.log(fibonacci(2)); // 2
console.log(fibonacci(3)); // 3
console.log(fibonacci(4)); // 5
console.log(fibonacci(5)); // 8
```


<br>

## The VC firm in Sillicon Valley

Paul Graham himself is known for his amazing work on Lisp, so he's obviously very proficient when it comes to functional programming and therefore knows the Y-Combinator.

According to YC's own website, this is why they've chosen the name:

> The Y Combinator is one of the coolest ideas in computer science. It's also a metaphor for what we do. It's a program that runs programs; we're a company that helps start companies.

Now that we know a bit about Y we can explore the meaning behind this name a bit more.

By taking into account that YC accelerates startups we can say that:

<center><p style="font-size: 22px; font-style: italic;">YC(accelerateStartups)(startup)</p></center>

And as long as `accelerateStartups` doesn't reach its base case (either by running out of money or motivation), we'll keep feeding it with more and more startups.

Well done, Mr. Graham. I'm a huge fan.

<br>

## Related Material and References

* [The Y Combinator or How to Succeed at Recursion Without Really Recursing](https://mvanier.livejournal.com/2897.html) by [Mike Vanier](http://users.cms.caltech.edu/~mvanier/) - This is one of the best blog posts I've read in my life. This very blog post tries to follow the same didactic route as that one, but with a bit more detail and at a slower pace. If you're interested in more detail about how to derive Y in non-strict programming languages I highly recommend you to read that. Excellent material, thanks, Mike.
* [Lambda Calculus: The Y combinator in javascript](https://github.com/calincru/Y-Combinator) by [Yehonathan Sharvit](https://twitter.com/viebel) - Another excellent blog post in JavaScript. More focused on the practical and short derivation of the Y-Combinator and its practical applications
* [Essentials: Functional Programming's Y Combinator](https://www.youtube.com/watch?v=9T8A89jgeTI) by [Computerphile](https://www.youtube.com/channel/UC9-y-6csu5WGm29I7JiwpnA) - I don't usually watch many Youtube videos about computer science, but this one is definitely worth your time. It is a very simple explanation which helps you a lot to understand the theoretical side of the Y-Combinator if you've never dealt with Lambda Calculus before. It's a good starting point.
* [Clear, intuitive derivation of the fixed-point combinator (Y Combinator)?](https://cs.stackexchange.com/questions/9604/clear-intuitive-derivation-of-the-fixed-point-combinator-y-combinator) on [CS StackExchange](https://cs.stackexchange.com/) - Also a very good and simple derivation of Y. Not practical, but definitely very elegant and concise. Highly recommended.
* [thunks/thunks on Github](https://github.com/thunks/thunks) & [redux-thunk](https://github.com/reduxjs/redux-thunk) - More excellent resources to learn about thunks and how they can be useful


<br>

## Special Thanks

* I'd also like to thank my friend [Morgan Roderick](https://twitter.com/mrgnrdrck) for reviewing this blog post and for all the amazing work he's been doing on Sinon.js. Thanks, buddy :)
