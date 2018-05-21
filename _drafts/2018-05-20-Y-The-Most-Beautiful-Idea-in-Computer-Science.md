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

This is because when passing zero to the function returned by `refactoredFactorial`, `n` will be equal `0` and then it will return `1`. We won't even need to call the function we passed in (which is `literallyAnyFunction`).

But what if we try to calculate the factorial of 1 in the same way?

```js
const literallyAnyFunction = () => 'a string'
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(refactoredFactorial(literallyAnyFunction)(1)); // NaN
```

Whoah, seems like we've got `NaN`. This definitely not right!

In order to understand what has happened let's take a look at the function returned by calling `refactoredFactorial` and passing it `literallyAnyFunction`:

```js
const literallyAnyFunction = () => 'a string'
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const fn = refactoredFactorial(literallyAnyFunction); 
// fn is: n => n === 0 ? 1 : n * (() => 'a string')(n - 1));
```

As you can see, in the function returned by `refactoredFactorial(literallyAnyFunction)`, if `n` is not `0` we will have to call `literallyAnyFunction` with `n - 1` and then multiply the result of that by `n`. And what is the result of multiplying a `String` by a `Number` in JavaScript? Exactly, it's `NaN`.

Hard to understand? Let's draw it.

// TODO add drawing here

Okay, but what if try calculating the factorial of `2` also using `refactoredFactorial(literallyAnyFunction)`? Will it work?

```js
const literallyAnyFunction = () => 'a string'
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(refactoredFactorial(literallyAnyFunction)(2)); // NaN
```

Of course not. It's still `NaN`. But that's not what I want to show you this time. What I want to show you is that `literallyAnyFunction` has only been called once.

This is what happened:

1. `refactoredFactorial` has been called with `literallyAnyFunction` and returned a function
2. That function hass been called with `2`
3. `2` is not equal `0`, so we'll do `2 * literallyAnyFunction(2 - 1)`
4. `literallyAnyFunction(2 - 1)` will return `'a string'`
5. We'll try to multiply `'a string'` by `2` and `NaN` will be returned

See? Only a single call to `literallyAnyFunction`.

Let's make make that more obvious by adding a `console.log` to `literallyAnyFunction`, like this:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

console.log(refactoredFactorial(literallyAnyFunction)(2));
```

See? `literallyAnyFunction` has only been called once. Now test it again with `0`, `1` and `2`. What happens?

* For `0` it returns `1`, which is the correct answer and does not call `literallyAnyFunction` at all
* For `1` and `2` it returns `NaN`, which is the correct answer and calls `literallyAnyFunction` once

Do you notice any pattern here? Whenever we have to call `literallyAnyFunction` and multiply the string it returns we get back `NaN`. If only we had a way to avoid it...

Well, we actually have!

If we call `refactoredFactorial` with `refactoredFactorial(literallyAnyFunction)`, the first time `f` is called, it will be `refactoredFactorial`, which means we'll call `refactoredFactorial` with `n - 1` instead of calling `literallyAnyFunction`.

Look!

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const result = refactoredFactorial(
    refactoredFactorial(literallyAnyFunction)
)(1);

// It works!
console.log(result); // 1
```

Awesome, it works! But what did happen?

1. The first thing that has been evaluated was `refactoredFactorial(literallyAnyFunction)`. That returned a function which returns `1` if the argument passed to it is `0`, otherwise it will call the `literallyAnyFunction` passed to it
2. Then we call `refactoredFactorial` again with that function we've just returned
3. Finally, the function we've obtained will only call `refactoredFactorial` the first time it has to call `f`. After that it will call `literallyAnyFunction`
4. When it's called with it `1` it sees that `1` is not equal to `0`, so it will call `f` (which is `refactoredFactorial`) with `n - 1` (a.k.a. `0`) and multiply the result of that by `1`
5. Now that `refactoredFactorial` has been called with `0` it will see that `n` is equal `0` and return `1`. This `1` will be multiplied by `1`, returning `1`, which is the correct answer.

**Notice that `literallyAnyFunction` has not been called at all.**

Hard to understand? Let's use a gif this time:

If understanding recursion still seems hard to you, once again I recommend you to read [this blog post where I explain how to think about recursion in an easy way](/2017/05/08/All-About-Recursion-PTC-TCO-and-STC-in-JavaScript.html) first and then come back here.

Another question for you: will this technique work with `2` too?

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const result = refactoredFactorial(
    refactoredFactorial(literallyAnyFunction)
)(2);

console.log(result); // NaN
```

Oops! It doesn't!

As you can see, this time, `literallyAnyFunction` has been called, because the second time we have to call `f` it was `literallyAnyFunction`. How could we avoid it? Easy, just pass in `refactoredFactorial` again.

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const result = refactoredFactorial(
    refactoredFactorial(
        refactoredFactorial(literallyAnyFunction)
    )
)(2);

console.log(result); // 2
```

Look, it works again! This happens because we don't call, `literallyAnyFunction`, instead, we just keep calling `refactoredFactorial` until we reach `0`, then the results bubble back up, the same way it happened in the previous example.

This is what happened this time:

// TODO image here

Want to make it work for `3`? Easy, just add another call to `refactoredFactorial`:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const result = refactoredFactorial(
    refactoredFactorial(
        refactoredFactorial(
            refactoredFactorial(literallyAnyFunction)
        )
    )
)(3);

console.log(result); // 6
```

Feel like calculating the factorial of `4` too? There goes another call to `refactoredFactorial`:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const result = refactoredFactorial(
    refactoredFactorial(
        refactoredFactorial(
            refactoredFactorial(
                refactoredFactorial(literallyAnyFunction)
            )
        )
    )
)(4);

console.log(result); // 24
```

This shows that in order to be able to calculate the `factorial` of any number we'd just need to have infinite calls to `refactoredFactorial` being passed to each other:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}

const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const factorial = refactoredFactorial(
    refactoredFactorial(
        refactoredFactorial(
            refactoredFactorial(...)
        )
    )
);
```

Another way to think about this is that what you want to happen is for the `f` inside `refactoredFactorial` to always be the function returned by it. By doing this you guarantee that you will always call the inner function again.

Now let's stop for a moment a talk about another very important concept for understanding Y: **the fixed point**.

**The fixed point of a function is that value that when applied to it, returns a value equal to itself.** Basically, **if you call a function `f` with `fixpoint`, the output should be equal to `fixpoint`**.

Get a calculator and just keep pressing the `cos` key until the result doesn't change anymore. You should get to something like `0.73908513321` (might change depending on your calculator's precision). This means that `0.73908513321` is the fixed point of the `cos` function since once we do `cos(0.73908513321)` we get back `0.73908513321`.

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

// TODO explain that this is not exactly infinite calls, but instead, as many calls as we wanted in the end of the post and then link it here
This looks familiar, doesn't it? It's exactly what we want as we have shown above, we want to be able to nest [infinite¹]() calls to `refactoredFactorial` inside of itself.

This is why we want to find the Y combinator. The Y combinator is the combinator that allows us to find the fixpoint of a function like `refactoredFactorial` so that we can make it recursive! When applying a function to Y we want it to return the fixed point of that function, like this:

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

Now, we're supposed to call `Y` passing `refactoredFactorial` and get back a `factorial` function that works, right? Can we do this?

```js
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

const Y = f => f(Y(f));

const factorial = Y(refactoredFactorial);

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

Does this remember you of anything you probably use on a daily-basis if you work with Redux? Exactly, [that's exacly what redux-thunk was made for](https://github.com/reduxjs/redux-thunk#motivation). In fact, [the very example above has been taken from their README](https://github.com/reduxjs/redux-thunk#whats-a-thunk).

Now that we know what a thunk is, let's delay the execution of `f(Y(f))` by wrapping it into a function:

```js
const Y = f => x => f(Y(f))(x);
```

Since the function returned by `refactoredFactorial` will only take a single argument as a parameter, we can just wrap it inside a function that also takes a single argument and applies it to the result of `f(Y(f))`, which now will be a function that also takes a single argument instead of evaluating infinitely.

Let's make this more obvious by imagining what happens when we invoke Y with `refactoredFactorial`:

```js
const refactoredFactorial = 

const Y = f => x => f(Y(f))(x);

const factorial = Y(refactoredFactorial);

console.log(factorial(5));
```

// TODO improve this
1. Since Y returns a function which takes a single argument we'll get the function in its body back
    Which is `x => f(Y(f))(x)`
2. As we passed `refactoredFactorial` to it, we can replace all the `f`s with `refactoredFactorial`, like this:
    `x => refactoredFactorial(Y(refactoredFactorial))(x)`
3. Notice that `Y(refactoredFactorial)` will then return a function (just look at its body) which is: `x => f(Y(f))(x)`.
    In that function we will be able to replace all `f`s with `refactoredFactorial` just as we've done in the previous step.
    The trick here is that since everything is still wraped inside of a function which takes `x` as an argument, we will only evaluate it when we pass `x` to that function.
4. Let's replace all the `f`s in the body of the function we've got back with `refactoredFactorial` to see what we will run when invoking that function:
    `x => refactoredFactorial(Y(refactoredFactorial))(x)`
5. The trick here is to notice that `refactoredFactorial(Y(refactoredFactorial))` will take that function which `Y(refactoredFactorial)` will return but won't evaluate it, instead it will return a function that takes `5` as an argument (remember that `n`?)
    It will basically return this: `n => n === 0 ? 1 : n * Y(refactoredFactorial)(n - 1)`.
    Doing another expansion, since `Y(refactoredFactorial)` is equal to `x => refactoredFactorial(Y(refactoredFactorial))(x)` (as we've seen on step 2) we get: `n => n === 0 ? 1 : n * (x => refactoredFactorial(Y(refactoredFactorial)))(n - 1)
5. Finally, we can invoke the function on the previous step with `5`, for example.
    This will cause the function in the body of `refactoredFactorial` to be have `n` replaced by `5`, and `f` will be the result of `Y(refactoredFactorial)`, which is the exact same function we had on step 2.
    We'll then call the function on step 2 with `5 - 1`:
    `5 === 0 ? 1 : 5 * (x => refactoredFactorial(Y(refactoredFactorial)))(5 - 1)`
6. This process will repeat until we don't call the function on step 2 anymore, but return 1 instead because `n` reached 0, causing the multiplication to run.
















// In JavaScript we'll have to evaluate what we're passing to
```






And this, my friends, is the very definition of Y! But wait, it won

What this

```js
fixp
```






// TODO fixpoint or fixedPoint?









Now let's stop for a moment and get back to the§

Well, that probably didn't sound very interesting, so let's use a more accurate definition so that we can get into some detail:

> A fixed-point combinator (or fixpoint combinator) is a higher-order function `fix` that, for any function `f` that has an attractive fixed point, returns a fixed point `x` of that function.















We could also expand it like this:

```js
const literallyAnyFunction = () => {
    console.log('f has been called!')
    return 'a string'
}
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);

refactoredFactorial(refactoredFactorial(literallyAnyFunction));

// This is:

n => n === 0 ? 1 : n * refactoredFactorial(n - 1)

```





// TODO add ; and lint everything









Now, let's make things a bit easier for us and instead of passing `literallyAnyFunction` to `refactoredFactorial`, let's pass the `identity` combinator, which takes a single argument and returns it.

```js
// The identity combinator
const i = x => x
```

We'll do this because we want to be able to actually return the number `f` was invoked with inside `refactoredFactorial` so that we can see it. This will help us think about what we should do next.

Okay, let's try it with `1` first, which is the value for which it has failed before:

```js
const i = x => x
const refactoredFactorial = f => n => n === 0 ? 1 : n * f(n - 1);


console.log(refactoredFactorial(i)(1));
```


















Now, `refactoredFactorial` will depend on a function `f` passed to it in order to be able to calculate factorials.

Let's see what happens when we pass our old `factorial` function to it.




