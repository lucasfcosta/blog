---
layout: post
title : "How to Write Assertions Right"
author: Lucas Fernandes da Costa
tags : assertions chai testing tdd
---


<br>

Hi, friends! Today I'm going to write about **assertions**.

I won't be talking about JavaScript, I'll be talking about assertions in general and **this knowledge can be applied doesn't matter what language you use**. My examples, however, will be written in JavaScript.

As you may know, I've been one of Chai core maintainers (alongside other awesome people) for more than a year and during this time these are some of the things that I and other maintainers have noticed based on the changes and features people request and the problems we usually deal with.

Nowadays TDD and test automation in general are hot topics, but I'd like you to remember that:

<center><h3><a href="http://rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf">Automated crap is still crap</a></h3></center>

So let's get down to business and talk about how to improve our testing skills by writing quality assertions.

<br>

## **Assert on a single subject per test**

Whenever a test fails we want to know the cause of that failure as soon as possible. If you write assertions on different subjects inside a single test you will end up taking more time to find out exactly which part of it worked and which part didn't.

By asserting on a single subject per test you will usually have more informative tests since you will be able to know exactly which requirements were met and which were not. If you want to know more about this I highly recommend you to do a Google search on [`BDD` (Behavior Driven Development)](https://dannorth.net/introducing-bdd/).

<br>

## **Avoid loose assertions**

When writing assertions **make sure you are being strict about what you want**.

Let's say you've got a function called `sum` which takes two arguments, `a` and `b`, and returns the sum of both. If you write `expect(sum(1, 1)).to.be.a.number` when testing that function you will be allowing an infinite number of wrong implementations to pass this test.

Even if you had this assertion before `expect(sum(1, 1)).to.be.equal(2)` this assertion it would still be worth nothing, since `equals` would already fail if `sum(1, 1)` was not a number.

But, as wise people always say, to every rule there is an exception.

Whenever you can't predict the exact result of a test and you can't replace any of the targets internals in order to make it deterministic, as it happens when you are testing certain kinds of Random Number Generators, then it's okay to assert that `something.is.a.number`.

**Just keep in mind that you should be as strict as you can about your requirements and you will be fine**.

<br>

## **Avoid allowing multiple outputs ("OR"s)**

**If you are allowing multiple outputs to pass your assertion you probably have either written wrong code or you don't know your requirements.**

There are only two things that can define the output of a function. One of them is `state`, which means every variable outside the function's scope (which allows side-effects to happen), and the other is the set of `arguments` passed to it.

So you feed a `function` with a `state` and `arguments` and it will give you an `output`. If we consider that, given the same state and the same arguments, the function will always give you the same output, we can say that function is deterministic and therefore we can predict its behavior depending on which `state` and `arguments` we have at a time.

I should also remember you that just because a function has side-effects it doesn't mean it is not deterministic. Being deterministic means that given the same `input` (`state` and `arguments`) you will always have the same `output`, doesn't matter if this output is a change to the `state` or a new value which has just been returned.

Therefore, if you can predict the result of a function you should give it multiple `inputs` and check their `output`. If you can have multiple outputs it means that either or `state` is changing, or your `input` is changing or your tests rely on a random factor. If your case happens to be one of the first two you just gotta make sure to replace your `state` or `input` in order to guarantee the `output` is always going to be the same.

Also by adding `OR` logic to your test you end up ignoring the carefully placed `if` clauses inside your code.

Let's say you have this code in your application:

```js
function changeType(value) {
    if (value === string) {
        return [value];
    } else {
        return String(value);
    }
}
```

If you had this test you would be totally ignoring those `if` clauses and your tests would still pass even though there was an error in `changeType`'s implementation:

```js
const firstResult = changeType('string');
const secondResult = changeType(2);

expect(firstResult).to.be.either.a('string').or.an('array');
expect(secondResult).to.be.either.a('string').or.an('array');
```

You might even feel tempted write these bad assertions in order to wrap them into a function such as the one below. But please, resist that urge.

```js
// Don't try this at home
function assertNumberOrString(value) {
    expect(value).to.be.either.a('string').or.a('number');
}
```

The ideal solution, in this case, would be to a separate assertion for each call. When you give a certain `input` to a function you want to make sure your assertion regarding the `output` is as strict as possible and you can only do this by treating one `input`/`output` pair at a time.

But then you might say: "okay, Lucas, but this goes against the DRY principle and I'd like to use this same generic assertion for other tests". I can answer that with the most obvious answer ever, which is: "yes, you can use this very same assertion for other tests, but only if you want them to give you false positives". In this example, even if the content of those `if` clauses were swapped and therefore the whole thing was wrong, these tests would still pass.

You can reuse assertions on different tests, but only if they strictly match the requirements for that piece of software. If you are writing you assertions so generic that they can be used anywhere you are just adding a bunch of totally useless code to your testing suite.

A better and a lot more useful version of those assertions would be:

```js
const firstResult = changeType('string');
const secondResult = changeType(2);

expect(firstResult).to.be.an('array')
expect(secondResult).to.be.a('string')
```

And [this is the reason why `Chai` does not implement `either` and `or` assertion chains in its code](https://github.com/chaijs/chai/issues/620).

**When writing tests you will want to have assertions that will pass if the function under test does exactly what you want and not if it does one thing OR another**.

<br>

## **Avoid using negated (`not`) assertions whenever you can**

In most cases, writing `not` assertions can bring you a lot of trouble. Let me explain why.

Let's use some simple logic here. **Whenever you say that you want `object` to *not* be `something` you are saying that `object` can be any other thing, except `something`. This virtually creates `infinite - 1` logical *or* conditions in our assertion.**

Whenever writing an assertion try to rephrase them into positive phrases and see if it creates multiple passing conditions and if it adds `or` logic to it. For example:

* `expect(sum(1, 2)).to.not.be.equal(4)` can be rephrased into: `expect(sum(1, 2)).to.be.equal(0).or(1).or(2).or(3).or(5)` -> **BAD ASSERTION!**
* `expect(parseInt('1200')).to.not.be.a('string')` can be rephrased into: `expect(parseInt('1200')).to.be.a('map').or('set').or('mycustomToStringTag')` -> **BAD ASSERTION!**

Did you notice how many `or` conditions we add to assertions when using `not`?

Please notice that I'm not saying you should not use an `isFalse` assertion. That assertion is strict and it guarantees that something **is** false and not that something is any other thing but false.

When writing this post I tried to think of any exceptions to this rule but I couldn't find any exception other than writing tests for the `not` condition itself, as we do in Chai. But such meta-subject is something I will talk about in another blog post.

**If you can determine the exact result of a test then you should assert the result you've got is exactly the same as you expected, there is no need to use "`not`". If you can't, then using "`not`" won't solve your problem, it will just make the tests pass.**

<br>

## **Avoid asserting on implementation details**

This is something many people don't talk about but I think it's a really important thing to say: **you pay for maintaining tests**.

Yes, test code does cost something. The more testing code you have, the more time you will have to spend maintaining it and, as we all know, our time costs money. Just as it happens with bad application code, a bad testing code will make you spend a lot more time on them.

I'm saying this due to the fact that many people end-up using `stubs` and `mocks` to help them assert on implementation details they shouldn't. This creates coupling and coupling make code harder to maintain, because then whenever you change your application's code you will have to change your tests too even if your application code still gives you the correct result. That happens because when you are asserting on implementation details you are not expecting the function to do something, you are expecting it to do something in a specific way.

When writing assertions you will want to make sure that you separate what can be considered `output` and what can be considered an `implementation detail`.

In this case, we can consider an `output` as everything a function **must** do when fed with a certain `input`.

If you have a function which must do an HTTP request to your server, for example, it's okay if you check that the method which actually does an HTTP request is being called and if it's being called with the correct parameters, after all, that is what your function produces given a certain `input`. However, if you've got a function which powers an `x` number to an `y` potency you don't want to assert that it is calling `Math.pow(x, y)` because if someone finds out that the native implementation sucks and it's faster to just use another one then your test will start failing even though the `output` is still correct.

**When writing assertions you are not concerned about how your function does something, you are concerned whether your function does something correctly or not.**

<br>

## **Avoid circular assertions**

Testing things against themselves means creating circular assertions.

Whenever you compare something that can possibly be wrong with another thing that may also be wrong then your assertion will be worth nothing. This may sound strange, but let me use this excellent example my friend [Keith Cirkel](https://twitter.com/keithamus) has used to demonstrate it.

This is our test. It asserts that a cloned `cat` object has the same color as the original `cat` object.

```js
it("cloned cat has the same color as original cat after cloning", function () {
  var cat = new Cat('blue');
  var clonedCat = cloneCat(cat);

  expect(clonedCat.color).to.equal(cat.color);
});
```

It seems fine right? But what if our `Cat` constructor looks like this:

```js
function cloneCat(cat) {
  cat.color = false;
  return cat;
}
```

This test will pass, of course. We even said that both `cat` objects should have the same color and they do! The problem is that this color is `false`, which is incorrect.

I hope that now you know what I meant by saying that you should not be testing stuff against itself.

To avoid this try using literal values whenever possible, never rely on code that might be incorrect. The test above, for example, could be written exactly like this:

```js
it("cloned cat has the same color as original cat after cloning", function () {
  var cat = new Cat('blue');
  var clonedCat = cloneCat(cat);

  expect(clonedCat.color).to.equal('blue');
});
```

**Make sure the variable/property/object/whatever you are expecting as the result really contains the correct result. To make sure of that, use literals whenever possible**.


<br>

## **Special Thanks & Further Reading**

As you may have noticed, many of these pieces of advice are based on the simple concept of determinism. When it comes to determinism in tests Martin Fowler has [a great article on this subject](http://martinfowler.com/articles/nonDeterminism.html) and I definitely think you should read it, it may help you a lot when writing and maintaining tests.

If want to read more about testing I highly recommend that you follow [Eric Elliot](https://twitter.com/_ericelliott). He writes lots of good stuff about software testing in general.

And at last, but not least, make sure you read some of the awesome discussions we have at `Chai`'s repo. We always learn a lot with our users about their necessities and about the most common problems they face and how to solve them. We are always trying to give people better tools to solve their problems.

Take a look at these issues if you have time: [chaijs/chai#870](https://github.com/chaijs/chai/issues/870), [chaijs/chai#620](https://github.com/chaijs/chai/issues/620) and [chaijs/chai#892](https://github.com/chaijs/chai/issues/892).

I would also like to thank all of the people that use Chai or contribute to it because they're the ones responsible for keeping this awesome project alive, you rock!

My great friends [@meeber](https://github.com/meeber), [@keithamus](https://github.com/keithamus), [@shvaikalesh](https://github.com/shvaikalesh) and [@vieiralucas](https://github.com/vieiralucas/) also deserve my eternal gratitude for all the knowledge they have shared with me during this time! It's been great to work with all of you.

<br>

## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**. I'd love to hear what you have to say and do any corrections if I made any mistakes.

**Thanks for reading this!**
