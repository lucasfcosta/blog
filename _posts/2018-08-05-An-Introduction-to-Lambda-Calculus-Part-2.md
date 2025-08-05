---
layout: post
title: "A Gentle Introduction to Lambda Calculus - Part 2: Execution"
author: Lucas Fernandes da Costa
place: London, United Kingdom
flag: 🇬🇧
tags: lambda-calculus functional-programming computability
---

This is the second blog post in my series about Lambda Calculus. To make sure you'll have the necessary knowledge about Lambda Calculus' syntax you will probably want to read [the first post in this series](/2018/07/29/An-Introduction-to-Lambda-Calculus-Part-1.html) before coming back to this one.

**In this post we'll see how to actually evaluate lambda calculus and get to know all the important concepts behind it**, such as alpha-equivalence, alpha-reduction, beta-reduction, beta-reduxes, and the beta-normal form, **which will allow us to really understand what is going on when a certain expression gets executed**.

This will be perhaps the most practical post of this series and will serve as a basis for us to understand more abstract concepts in the future. 

Now, let's continue our amazing adventure through the fascinating world of logic.





## Alpha Equivalence 

**In Lambda Calculus we say that two functions are alpha-equivalent when they vary only by the names of the bound variables**. The following functions, for example, are alpha-equivalent:

```
fn1 = λx. λy. x(y)
fn2 = λa. λb. a(b)
```

In laymen's terms, two functions are α-equivalent when they do the same thing. If you replace any occurrence of `fn1` with `fn2`, you would be expressing the exact same thing: your program behave exactly the same.

It's important to highlight that the functions above are α-equivalent because the variables with different names are all bound, if one of those variables was not bound, then the functions would not be α-equivalent anymore as they would do different things.

```
fn1 = λx. λy. x(y(z))
fn2 = λx. λy. λz. x(y(z))
// These are not α-equivalent!
```

The reason why these functions are not α-equivalent is because even though their bodies are the same, **in `fn1` the variable `z` is free** (it is present in the outermost context) while **in `fn2` the variable `z` is bound** (it is passed in as an argument, which means it's bound to the metavariable `z`).

Here are a few more examples:

* `λx. x y` and `λa. a y` are α-equivalent because the only variable name that changed is the name of the bound variable `x`. The `y` is a free variable and didn't have its name changed.
* `λx. x y` and `λx. x z` are not α-equivalent because the free variable `y` in the first function is not the same one as the free variable `z` in the second function, even though the bound variable still has the same name.
* `λx. λy. y x` and `λx. λy. x y` are not α-equivalent because even though they have the same variable names, they differ in what they do. In the first one we apply `x` to `y` and in the second one, we apply `y` to `x`. These are semantically different.
* `λx. λx. x` and `λy. λx. x` are α-equivalent because the `x` in the inner function is bound to the inner meta-variable `x` and the outermost metavariable (which coincidently has the same name) is a completely different variable. If we rename that outermost `x`, which is not free, we're not changing the semantics of the function in any way.

Being familiar with the concept of bound and free variables is essential for you to understand this post. If you still think you cannot identify each case easily, once again I'll recommend you to read [this section about types of variables in the previous post](/2018/07/29/An-Introduction-to-Lambda-Calculus-Part-1.html#bound-and-free-variables).





## Renaming

Given a certain lambda expression, **renaming allows us to replace the bound variables names by other names**. Since this does not change what an expression does, you might have already come to the conclusion that by doing this we can obtain α-equivalent expressions.

**The syntax for substituting a variable is `Expression {newVariableName/currentVariableName}`**.

Now let's rename a few variables in the lambda expression `λx. λy. x(y(z))`. We'll start by replacing `x` with `a`:

```
λx. λy. x(y(z)) {a/x}
λa. λy. a(y(z))
```

It's important to notice that `λa. λy. a(y(z))` is α-equivalent to `λx. λy. x(y(z))` since only the name of the bound variable has changed.

Then we will replace `y` with `b`:

```
λa. λy. a(y(z)) {b/y}
λa. λb. a(b(z))
```

This time `λa. λb. a(b(z))` is also α-equivalent to our original expression: `λx. λy. x(y(z))`. If you compare both you will see that only the names of the bound variables `x` and `y` and have changed.

But what happens if we try to replace `z` with `c`?

```
λa. λy. a(y(z)) {c/z}
λa. λb. a(b(z))
```

The expression remains the same in that case because `z` is a free variable and thus cannot be renamed to `c`, otherwise we'd get a different expression and not an expression which just has different variable names. That expression would also not be α-equivalent to the first one, obviously.

If `z` was also a bound variable we would have been able to rename it:

```
λz. λa. λb. a(b(z)) {c/z}
λc. λa. λb. a(b(c))
```

Renaming variables is important in order to reduce confusion so that you can easily know which variables are bound to which terms.

**When you perform renamings so that there are no more repeated variable names you've done an alpha-reduction**.

If you perform an alpha reduction in `((λa. λb. a b) (λa. a)) (λa. a b)`, for example, you can obtain the α-equivalent expression `((λa. λc. a c) (λd. d)) (λe. e b)`.

Notice that in the example above we would not have been able to rename the free variable `b` in `λa. a b` so I chose to rename the bound variable `b` in `λa. λb. a b` by `c`.





## Substitution and Evaluation

**Substituting allows us to replace a bound variable's name with an expression**.

After so long, it's finally about time we destroy a sweet illusion we've had for so long so that I can explain this. When you do a sum in Lambda Calculus you do not write it as `a + b`, you write it as `+ a b` instead, because in fact, `+` is just the name of a function which performs addition. We'll see how it does that in a next post, for now just trust that the `+` function adds two numbers (it is curried, of course).

The same is valid for `-`, `*` and `/`.

**The syntax for substitution is: `Expression [variableName→OtherExpression]`**.

Now that we know this, let's substitute `x` in an expression which adds `1` to the number passed to it. In this case, we substitute `x` by `2`:

```
(λx. + x 1) [x→2]
(+ 2 1)
```

As might have you noticed in the example above, **a substitution is what happens when an expression is evaluated**: when you apply something to it. In the previous example that substitution is what would have happened if we applied 2 to that expression:


```
(λx. + x 1) 2
(λx. + x 1) [x→2]
(+ 2 1)
```

To demonstrate this better, let's use an expression that's a little bit more complicated:

```
λx. λy. + y (+ x 1)
```

We'll start by applying `4` to it, which will result in a substitution of `x` by `4`:

```
(λx. λy. + y (+ x 1)) 4
(λx. λy. + y (+ 4 1)) [x→4]
(λy. + y (+ 4 1))
```

Finally we can also apply `2` to the resulting expression, which will then result in:

```
(λy. + y (+ 4 1)) 2
(λy. + y (+ 4 1)) [y→2]
(+ 2 (+ 4 1)) [y→2]
```

Now, if you trust me and accept the illusion that `+` can simply sum two numbers we can get to the final result of this:

```
(+ 2 (+ 4 1))
(+ 2 5)
(7)
```

Please notice that, just like renaming, **you cannot substitute free variables in a lambda expression**.

In the expression `λx. + x (+ y 1)`, for example, you can substitute `x`, because if you applied something to that expression `x` would be replaced:

```
(λx. + x (+ y 1)) 2
(λx. + x (+ y 1)) [x→2]
(+ 2 (+ y 1))
```

But if you tried to replace `y` nothing would happen, because `y` is a free variable. You would never be able to apply something to that expression which could cause `y` to be replaced. That expression is not even an `abstraction` anymore.

In a more adequate example, let's do a substitution by applying an abstraction to another:

```
(λx. + x (+ y 1)) (λx. x)
(λx. + λx. x (+ y 1)) [x→λx. x]
(+ λx. x (+ y 1))
```



## Beta-reductions, Beta-reduxes, and The Beta-normal Form


**A β-reduction is a step in the execution of a function**.

In the previous section, when we were applying one lambda expression to the other we were essentially performing a β-reduction. `(λx. + x 1) 2` β-reduces to `(λx. + x 1) [x→2]`, which means we substitute every `x` in the body of that lambda with a `2`.

**A β-redux is an expression in the application form**, or, in simpler words: **an expression in which you are applying a value to a function**. The following expressions, for example, are all `β-reduxes`:

* `(λx. x) y` - Applying `y` to `λx. x`
* `(λx. λy. y) z` - Applying `z` to `λx. λy. y`
* `(λx. y) (λx. + x 1)` - Applying `λx. + x 1` to `λx. y`
* `(λx. y) (λx. + x 1) (λw. w w)` - Applying `λx. + x 1` to `λx. y` and then applying `(λw. w w)` to the result of that. This disambiguates as: `((λx. y) (λx. + x 1)) (λw. w w)` (if you don't remember [the disambiguation rules from the last post, you might want to go back and read that](/2018/07/29/An-Introduction-to-Lambda-Calculus-Part-1.html#disambiguating)).

Finally, **we can say that an expression is in the *β-normal form* when there are no more *β-reduxes* left**, or, again in simpler terms: when there are no more applications to be done.

**In the previous section, when we executed `((λx. λy. + y (+ x 1)) 4) 2` and got back `7` we have done a *full β-reduction*, which is the act of evaluating an expression to its β-normal form**.

Now, to end this post with that awesome feeling of accomplishment, let's perform a *full β-reduction* on the expression `((λx. λy. y) ((λz. z) (λy. λx. y))) a`:

1. As in any other programming language, we need to start evaluating from the inside out, so the first part we will evaluate is `(λz. z) (λy. λx. y)`. This results in the very same expression `λy. λx. y` because `λz. z` just returns whatever was passed to it.
2. Now that we have `((λx. λy. y) (λy. λx. y)) a` we will, once again, have to evaluate the innermost application first, which is: `(λx. λy. y) (λy. λx. y)`. Since `λx. λy. y` will return `λy. y` independently of what's passed to it, we get that back and now we have `(λy. y) 2`.
3. Finally, we can see that `λy. y` will return the `y` that was passed to it, in this case, `2`, which is the final result.

This is what just happened:

```
((λx. λy. y) ((λz. z) (λy. λx. y))) a
((λx. λy. y) (λy. λx. y)) a
(λy. y) a
a
```



## Practicing all we've learned so far

In this blog post you should have learned:

* What is α-equivalence and how to perform renamings so that you get α-equivalent expressions
* What is β-equivalence and how to perform substitutions so that you can evaluate expressions until you get to their β-normal form

These are things that can take a while to get used to and there's no other way of getting better in it besides practicing.

**I've found [this excellent lambda calculus interpreter](http://jacksongl.github.io/files/demo/lambda/index.htm) when I was studying all this myself and it was very helpful for me to check my results, correctly disambiguate expressions, and evaluate expressions step by step**.

Just remember to replace any `λ` symbols by the word `lambda` so that it can evaluate your expressions.

This interpreter will perform disambiguation (represented in the interpreter by the symbol ω), α-reduction (represented by α) and then β-reduction (represented by β) so that you can see in detail what happens when you evaluate a lambda expression.





## Destroying Dreams

In this post I've used a few illusions such as representing numbers by their commonly used symbols (`1`, `2`, `3`, etc...) so that I could explain more general concepts, but, in fact, this is not really what numbers are in lambda calculus. In the next post, we'll see the truth behind numbers in lambda calculus by disassociating their concepts and their representation. I can assure you this is gonna be mind-blowing. It's gonna change the way you think about numbers.

As I've also mentioned before, there was a bit of handwaving when considering how the `+` function works, so we'll also dig deep into that once we know more about numbers and then you'll see what kind of ancient wizardry happened behind the scenes when we used `+`.

Get ready to get your dreams crushed in the next post of this series.





## References & Resources for the Curious

* Lectures by Adam Doupé at the Arizona State University: [Lecture 2](https://www.youtube.com/watch?v=Q8CmUoq4waQ), [Lecture 3](https://www.youtube.com/watch?v=FFtp-4GpWlY), and [Lecture 4](https://www.youtube.com/watch?v=41rUQ_c4V98)
* [Fundamentals of Lambda Calculus and Functional Programming in JavaScript by Gabriel Lebec](https://www.youtube.com/watch?v=3VQ382QG-y4) - Must watch!
* [What is beta-equivalence? - Computer Science StackExchange](https://cs.stackexchange.com/questions/634/what-is-beta-equivalence) - A more formal definition of what is beta-equivalence and another view on how to perform full beta-reduction
* Haskell Theoretical Foundations: [Alpha Conversion](https://wiki.haskell.org/Alpha_conversion) and [Beta Reduction](https://wiki.haskell.org/Beta_reduction) - Some excellent short definitions for both concepts
* Introduction to Lambda Calculus - Henk Barendregt & Erik Barendsen
* A Tutorial Introduction to Lambda Calculus - Raul Rojas
