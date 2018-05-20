---
layout: post
title: Y: The Most Beautiful Idea in Computer Science explained in JavaScript
author: Lucas Fernandes da Costa
tags: functional-programming combinators javascript y-combinator
---

In this post we will talk about **one of the most beautiful ideas in computer science: the Y-Combinator**. And no, I'm not talking about [the VC firm in Sillicon Valley](http://www.ycombinator.com/), even though this post will explain why they've got this name.

Put in simple terms, **the Y-Combinator (also known as the fixed-point combinator) is a way of doing recursion in a language that does not explicitly supports it**.

Let's say you want to implement a recursive [factorial function](https://en.wikipedia.org/wiki/Factorial). In JavaScript, for example, you could simply do this:

```js
const factorial = n => n === 0 ? 1 : n * factorial(n - 1);
```

But what if you couldn't use any "names"? What if JavaScript didn't allow you to call `factorial` inside of `factorial`, how would you implement it?

In that case, you'd use the Y-Combinator.

I guarantee you **this will be one of the most amazing journeys you will go through in your life as a programmer**. The first time deriving the Y-Combinator is an indescribable joy, so get comfortable in your chair, bed, or whatever and let's get started.

I recommend that you **follow this post with a notebook or on Node's REPL**, that will help you understand all the steps we'll go through and test things by yourself. **Don't be afraid of trying things out and testing things, doing your own exploration plays a great part in understanding how Y works**.

Also, if you want to learn more about recursion [I've got a very popular post about it in this very same blog](/2017/05/08/All-About-Recursion-PTC-TCO-and-STC-in-JavaScript.html). It's a bit old but it remains amazing and very informative.


## **First things first: what on earth is a combinator?**

**A combinator is a function with no free variables**.

Free variables are variables defined outside of the function's scope. They're the opposite of bound variables, which are variables that only exist inside of a function's scope.

Let's use an example to make it easier to understand:

```js
const num = 13;

const sumPlusThirteen = (a, b) => a + b + first
```

In the example above, our function `sumPlusThirteen` uses the variables `a`, `b` and `num`. **The variables `a` and `b` are bound variables because they are bound to the function's parameters**: when we refer to their names we are referring to values that were passed to the `sumPlusThirteen` function. However, **the variable `num` refers to a value outside of the function's scope, which means it is a free variable**.

Let's look at some more examples:

1. `x => x` - `x` is a bound variable, because it's bound to the function's parameters
2. `x => x + y` - `x` is a bound variable because it's bound to the function's paramers and `y` is a free variable because it refers to a value outside of the function's scope
3. `x => y + z` - `y` and `z` are both free variables because they refer to values outside of the function's context
4. `(x, y) => x + y` - Both `x` and `y` are free variables because they are bound to the function's parameters

Getting back to combinators, we can now say that the following functions are all combinators:

1. `x => x` is a combinator because `x` is the only variable in the function's body and it's bound to the function's parameters
2. `(x, y) => y` - is a combinator because the only variable in its body (`y`) is bound to the function's parameters.
4. `x => y` - is not a combinator because the variable in its body (`y`) refers to something outside of the function's context
5. `(x, y) => x(y(z))` is not a combinator, because one of the variables in its body (`z`) refers to a something outside of the function's context

I could write an entire blog post about this, but for now this basic knowledge will suffice. I highly recommend that you read more about [bound versus free variables](https://stackoverflow.com/questions/21855838/what-are-free-and-bound-variables) and [pass-by-context versus pass-by-name](https://stackoverflow.com/questions/838079/what-is-pass-by-name-and-how-does-it-work-exactly) though.


## **Deriving Y**

Now that we know what a combinator is, let's go straight to the most meaty part of this subject and derive the Y-Combinator itself. Trust me, all the other questions you've got in your mind are gonna be answered while we do this.

Let's get back to our recursive factorial definition:

```js
const factorial = n => n === 0 ? 1 : n * factorial(n - 1);

// I'm just using this to prove it actually works
console.log(factorial(5)); // 120
```

This is how it works:

// TODO add image and explanation on it here and link other post

As you might remember, what we want is a way of calling `factorial` without referring to it's own name, we want a function which does not have any free variables, but is still recursive.

Considering this goal, the most obvious thing here would be to eliminate the call to `factorial` in side the function's body. In order to do this we'd do one of the simplest and most common refactoring techniques in functional programming: we'll remove the `factorial` reference from the function's body and make it a parameter:

```js
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);
```

Now, in order for us to calculate the factorial of a number we must pass a function `f` to `refactoredFactorial` so that it can call it with `n - 1` whenever `n` is not `0`.

This diagram illustrates how it works:

Let's see what happens if we call this function with any function and then `0`:

```js
const literallyAnyFunction = () => null
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(refactoredFactorial(literallyAnyFunction)(0)); // 1
```

Look, it already works for 0, and we can use `literallyAnyFunction` for that! Isn't it amazing?

But what if we try calculating the factorial of 1 in the same way?

```js
const literallyAnyFunction = () => null
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(refactoredFactorial(literallyAnyFunction)(0)); // 1
```


Now, `refactoredFactorial` will depend on a function `f` passed to it in order to be able to calculate factorials.

Let's see what happens when we pass our old `factorial` function to it.






Well, that probably didn't sound very interesting, so let's use a more accurate definition so that we can get into some detail:

> A fixed-point combinator (or fixpoint combinator) is a higher-order function `fix` that, for any function `f` that has an attractive fixed point, returns a fixed point `x` of that function.



