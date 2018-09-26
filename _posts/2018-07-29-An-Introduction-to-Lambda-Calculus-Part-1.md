---
layout: post
title: "A Gentle Introduction to Lambda Calculus - Part 1: Syntax"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: lambda-calculus functional-programming computability
---

Even though lots of people nowadays advocate for applying functional programming principles to JavaScript, not many of them know the principles of Lambda Calculus and how it all started.

Theory of computability itself deserves not only blog posts about it, but whole books, so I'll try to cover that separately in the future. **In this series of posts I'll focus on the practical principles of Lambda Calculus and Combinators** with simple JavaScript snippets that will hopefully make it easier for the practical programmer to follow along with the most fascinating ideas in computability and combinatory logic in a simplified way.

You will also find, at the end of each post, a list of recommended resources to learn more about it in case you're interested.

[I've also recently written about my favorite combinator: the Y-Combinator and I highly recommend you to read that](2018/05/20/Y-The-Most-Beautiful-Idea-in-Computer-Science.html) too if you end up liking this post.

Without further ado, let's talk about what matters to us here: [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus).


<br>


## What is Lambda Calculus?

Lambda calculus was introduced by Alonzo Church in the 1930s and is, essentially, a way of expressing computation through the use of functions we call Lambdas (yes, the same name you use for unnamed JavaScript functions). If a problem is computable then it means we can build an algorithm to solve it and thus it can be expressed through the use of Lambda Calculus, just like we could do with the use of [Turing Machines](https://en.wikipedia.org/wiki/Turing_machine).

Any of the computer programs we have ever written and any of the ones that are still unwritten can be expressed using either Lambda Calculus or a Turing Machine.

As I've mentioned in the introduction to this post, I could write an entire blog post contextualizing this, but now that you know what Lambda Calculus is and what it does, let's get to the practical stuff.


<br>


## Lambda Calculus' Syntax

Everything in Lambda Calculus is an [expression](https://www.quora.com/Whats-the-difference-between-a-statement-and-an-expression-in-Python-Why-is-print-%E2%80%98hi%E2%80%99-a-statement-while-other-functions-are-expressions), which means that everything must evaluate to a value.

There are, however, four different forms of expressions (which I'll call `E`). An `E` can be either:

* `ID` - **Identifier**
* `λID. E` - **Abstraction**.
* `E E` - **Application**
* `(E)` - **Grouping**

**Identifiers** are simply that: identifiers. They **identify certain values by giving them a "name"**, just like our modern programming languages do.

```js
const x = 10
x // Identifier equivalent
```


**Abstractions** are perhaps the most iconic kind of lambda expression, they **define what we call functions** or, more adequately, lambdas: which are just anonymous functions. The `ID` is an abstraction is called the metavariable, which is the variable in that abstraction which is going to be used in the function's body (which in this case is `E`), for example.

```js
(x) => x * x // Abstraction equivalent
```


**Applications denote function invocation**. If you have a function `A` you can say you're calling it with `B` by writing `A B`.

```js
const a = (x) => x * x
const b = 10
a(b) // Application equivalent
```


**Grouping exists for the sake of disambiguation**. We use these parentheses around the expressions we want to group to make it clear which ones of them we want to apply to each other. If this doesn't make much sense now don't worry, it will in a few paragraphs.


<br>


## Bound and Free Variables

In lambda calculus, it is very important to understand the concept of bound and free variables, so that we can explore combinators later.

*(I'll now shamefully copy the explanation I've used for bound and free variables from my Y-Combinator post, because [good programmers know what to write, great ones know what to reuse](http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/ar01s02.html))*

**Free variables are variables defined outside of the function's scope**. They're **the opposite of bound variables**, which are variables that only exist inside of a function's scope.

Let's use an example in JavaScript to make it easier to understand:

```js
const num = 13;

const sumPlusThirteen = (a, b) => a + b + first
```

In the snippet above, our function `sumPlusThirteen` uses the variables `a`, `b` and `num`. **The variables `a` and `b` are bound variables because they are bound to the function's parameters**: when we refer to their names we are referring to values that were passed to the `sumPlusThirteen` function. However, **the variable `num` refers to a value outside of the function's scope, which means it is a free variable**.

Let's look at some more examples:

1. `x => x` - `x` is a bound variable, because it's bound to the function's parameters
2. `x => x(y)` - `x` is a bound variable because it's bound to the function's parameters and `y` is a free variable because it refers to a value outside of the function's scope
3. `x => y(z)` - `y` and `z` are both free variables because they refer to values outside of the function's context
4. `(x, y) => x(y)` - Both `x` and `y` are free variables because they are bound to the function's parameters


Now, the same examples above, but in using Lambda Calculus' syntax:

1. `λx. x` - `x` is a bound variable
2. `λx. x y` - `x` is a bound variable and `y` is a free variable
3. `λx. y z` - `y` and `z` are both free variables
4. `λx. λy. x(y)` - Both `x` and `y` are bound variables


<br>


## Currying

In Lambda Calculus, each abstraction cannot take more than one argument, which means that we have to do [currying](https://en.wikipedia.org/wiki/Currying) in order to be able to work with multiple variables in the body of a function.

Currying consists in translating a single function with multiple arguments into series of nested functions which take one argument each.

Let's say you wanted to have, for example, a function which takes two numbers and evaluates the product of them. In JavaScript you could simply write the following:

```js
const sum = (a, b) => a * b
sum(2, 3) // 6

// Or, more adequately:

((a, b) => a * b)(2, 3) // 6
```

However, you cannot do this in Lambda Calculus. In order to have these two variables available in an expression we would have to nest one lambda inside the other so that both `a` and `b` are available to the innermost function's body:

```js
const product = (a) => (b) => a * b;
product(2)(3) // 6

// Or, more adequately:
((a) => (b) => a * b)(2)(3) // 6
```

In the example above, when we call `product` with `2` what we're doing is returning another function which is `(b) => a * b` in which `a` is already bound to the `a` metavariable in the outermost function.

Similarly, if you wanted to have more arguments you could just keep wrapping your lambdas in other lambdas:

```js
const product = (a) => (b) => (c) => a * b * c;
product(2)(3)(4) // 24

// Or, more adequately:
((a) => (b) => (c) => a * b * c)(2)(3)(4) // 24
```

Now, in a bit more conventional lambda calculus syntax:

```
λa. λb. a * b
```


<br>


## Disambiguating

More importantly than knowing how Lambda Calculus works, is being able to read it correctly, otherwise, all you've learned until now would have little to no use.

How would you read the lambda expression `x y z` for example? Should it be interpreted as `x(y(z))` or `(x(y))(z)`?

**Applications are left associative**, which means that the terms are grouped from left to right. In the previous example, you would then disambiguate `x y z` as `(x y) z`. This means you could disambiguate `a b c d` as `((a b) c) d`.

What about `abstractions`: does `λx. x y` mean `(λx. x)(y)` or `λx. x(y)`?

**Abstractions extend as to the far right as possible**. For `λx. x y` a plausible disambiguation could be `λx. x(y)`, meaning that the outermost lambda expression applies `y` to the passed `x`.

For `λx. λy. x` we could write `λx. (λy. x)`: which means that the outermost lambda expression evaluates to `(λy. x)`.


<br>

## References & Resources for the Curious

* [Gödel's Incompleteness Theorem - Numberphile](https://www.youtube.com/watch?v=O4ndIDcDSGc)
* [Computerphile](https://www.youtube.com/channel/UC9-y-6csu5WGm29I7JiwpnA) has this awesome series of 3 videos about the history of undecidability, which has a lot to do with the theory of computation. I highly encourage you to watch all of them: [Part 1](https://www.youtube.com/watch?v=nsZsd5qtbo4), [Part 2](https://www.youtube.com/watch?v=FK3kifY-geM), and [Part 3](https://www.youtube.com/watch?v=lLWnd6-vSGo)
* [First lecture by Adam Doupé about Lambda Calculues at Arizona State University](https://www.youtube.com/watch?v=_kYGDJSm0gE)
* [Fundamentals of Lamda Calculus and Functional Programming in JavaScript by Gabriel Lebec](https://www.youtube.com/watch?v=3VQ382QG-y4) - Must watch!
* The Impact of Lambda Calculus in Logic and Computer Science - Henk Barendregt
* Introduction to Lambda Calculus - Henk Barendregt & Erik Barendsen
* Computability and Incomputability - Robert Soare
* Computability and Recursion - Robert Soare
* The History and Concept of Computability - Robert Soare

In the next few posts of this series, you will also notice that I simplified a few things in this first post to make it easier to follow, such as using the `+` and `*` operators inside lambdas or even numbers, which is something I'll talk about in the future.

For now, focus on understanding what lambda calculus itself is and its syntax constructs.
