---
layout: post
title: Test-Driven Development is not about tests
author: Lucas Fernandes da Costa
place: Paris, France
flag: 🇫🇷
tags: tdd software-engineering
---

Counterintuitively, **test-driven development is not about tests**.

**Test-driven development is about being able to take gradual and small steps towards a solution**. Taking small steps allows you to solve one problem at a time and this is where the benefits of doing TDD come from.

By tackling work in smaller increments we reduce the size of the problems we have to solve and thus reduces the scope of the decisions we need to take. Decreasing the size and quantity of problems then helps us think more about what is the best solution for each one of them.

We can apply this methodology to many other areas of software engineering and, in fact, it already has been. If you take a look at what we do with stories on agile methodologies by breaking them down into multiple tasks you will see that in fact, we're just reducing the size and the scope of the problems we're trying to solve so that we can solve them better.

**Test-driven development is about making writing code an iterative process**.

If you want to build a car you should not start by assembling the wheels, then adding the chassis, the engine and the interior. Before building a car you need to know how to build a skate.



<BlogImage src="/assets/iterative-development.jpg" alt="An image showing that building a car consists in fact of building a skate, then a scooter, then a bicycle, then a motorbike and finally getting to a car" />



Many people don't understand this because they think that TDD is about writing tests first and code later. They just go on and write a full-blown test, see it failing and then struggle with an implementation for a long time until it passes that test. This is not wrong in all cases, but it is definitely not suitable for *every* case.

Proper TDD consists of writing the smallest viable unit of a test, seeing it fail and then solving that small failure in the easiest way possible, even if that consists of returning a hard-coded value. Once you have done that, then it's time to make it fail again by adding another check which makes that hard-coded value not adequate anymore. The more confident you feel, the bigger your steps can be.

In this post, as an example, I'll use [the popular "fizz-buzz" program](http://wiki.c2.com/?FizzBuzzTest), which iterates through all the numbers from `1` to `100` and prints "fizz" for for multiples of `3`, "buzz" for multiples of `5`, and "FizzBuzz" for multiples of both.

If you were to write that piece of code, this is the test you would start with:

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz", () => {
        const result = fizzbuzz();
        expect(result).to.be.equal("fizz");
    });
});
```

Notice that we didn't take into account any of the branching logic involved in the original description of the program. The reason why we write a very simple test is so that we can implement the smallest piece of code possible.

This is better because if you write complete tests up-front you might forget a return, forget to export the function or many other simple mistakes. This might make you wonder which part of the algorithm itself is wrong instead of considering the most obvious factors first.

Now, once that test fails, we can start implementing `fizzbuzz`.

```js
const fizzbuzz = () => {
    return "fizz";
};

module.exports = fizzbuzz;
```

Our first implementation of `fizzbuzz` is obviously incorrect, but once we've made that first simple test pass it becomes easier to make it more complex. This is what TDD is about: incremental/iterative development.

Now we can check if it only returns `fizz` for multiples of three.

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz for a multiple of 3", () => {
        const resultForThree = fizzbuzz(3);
        expect(resultForThree).to.be.equal("fizz");
    });
});
```

That test still passes because our implementation always returns `fizz`, so we must make it more complex.

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz for multiples of 3", () => {
        const resultForThree = fizzbuzz(3);
        const resultForSix = fizzbuzz(6);
        const resultForThirty = fizzbuzz(30);
        expect(resultForThree).to.be.equal("fizz");
        expect(resultForSix).to.be.equal("fizz");
        expect(resultForThirty).to.be.equal("fizz");
    });
});
```

All those tests still fail. What should we do?

We could add another assertion which expects `fizzbuzz(5)` to *not* be equal `fizz`, but using negated assertions [is, in general, a bad practice](/2017/01/02/How-to-Write-Assertions-Right.html).

**Code should be deterministic when under test. You should always know and assert for the exact result you expect**. If your code cannot be deterministic due to dates or timers, [make it deterministic](https://sinonjs.org/releases/v7.0.0/fake-timers/) by using stubs.

**When using a negated assertion it's as if you were saying you don't know the exact `result` for the unit under test and thus expect it to be `infinity - 1` different values.**

Taking this into account, we will write another test:

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz for multiples of 3", () => {
        const resultForThree = fizzbuzz(3);
        const resultForSix = fizzbuzz(6);
        const resultForThirty = fizzbuzz(30);
        expect(resultForThree).to.be.equal("fizz");
        expect(resultForSix).to.be.equal("fizz");
        expect(resultForThirty).to.be.equal("fizz");
    });

    it("returns buzz for a multiple of 5", () => {
        const result = fizzbuzz(5);
        expect(result).to.be.equal("buzz");
    });
});
```

Finally, we've got a failing test. It's time to refactor our implementation. Keep in mind that we should always implement the minimal amount of code necessary to make the tests pass.

```js
const fizzbuzz = (n) => {
    if (n === 5) {
        return "buzz";
    }

    return "fizz";
};

module.exports = fizzbuzz;
```

That is incorrect but makes the test pass. We need more assertions to reveal that our code does not conform to the requirements.

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz for multiples of 3", () => {
        const resultForThree = fizzbuzz(3);
        const resultForSix = fizzbuzz(6);
        const resultForThirty = fizzbuzz(30);
        expect(resultForThree).to.be.equal("fizz");
        expect(resultForSix).to.be.equal("fizz");
        expect(resultForThirty).to.be.equal("fizz");
    });

    it("returns buzz for multiples of 5", () => {
        const resultForFive = fizzbuzz(5);
        const resultForFifteen = fizzbuzz(15);
        const resultForFifty = fizzbuzz(50);
        expect(resultForFive).to.be.equal("buzz");
        expect(resultForFifteen).to.be.equal("buzz");
        expect(resultForFifty).to.be.equal("buzz");
    });
});
```

More assertions caused that test to fail. Adapting the implementation we get a more plausible piece of code.

```js
const fizzbuzz = (n) => {
    if (n % 3 === 0) {
        return "fizz";
    }

    return "buzz";
};

module.exports = fizzbuzz;
```

We still didn't cover the numbers for which neither `fizz` nor `buzz` should be returned. Let's write tests for that now:

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz for multiples of 3", () => {
        const resultForThree = fizzbuzz(3);
        const resultForSix = fizzbuzz(6);
        const resultForThirty = fizzbuzz(30);
        expect(resultForThree).to.be.equal("fizz");
        expect(resultForSix).to.be.equal("fizz");
        expect(resultForThirty).to.be.equal("fizz");
    });

    it("returns buzz for multiples of 5", () => {
        const resultForFive = fizzbuzz(5);
        const resultForFifteen = fizzbuzz(15);
        const resultForFifty = fizzbuzz(50);
        expect(resultForFive).to.be.equal("buzz");
        expect(resultForFifteen).to.be.equal("buzz");
        expect(resultForFifty).to.be.equal("buzz");
    });

    it("returns null for a number that isn't multiple of 3 or 5", () => {
        const result = fizzbuzz(8);
        expect(result).to.be.equal(null);
    });
});
```

Great, another failing test. This time, instead of hard-coding a special condition only for `8`, I'll implement what I think is correct straight-away.

**The right size of the tests and implementation you write increases as your confidence increases**. More confidence means larger changes at a time.

```js
const fizzbuzz = (n) => {
    if (n % 3 === 0) {
        return "fizz";
    }

    if (n % 5 === 0) {
        return "buzz";
    }

    return null;
};

module.exports = fizzbuzz;
```

**As you get more experienced with proper TDD you will get better at estimating what the size of the steps you take should be**. **Writing tests is really easy, the hard thing is knowing which tests to write and when**.

The last case we must check is when a number is a multiple of both 3 and 5.

```js
const fizzbuzz = require("./fizzbuzz");

describe("fizzbuzz", () => {
    it("returns fizz for multiples of 3", () => {
        const resultForThree = fizzbuzz(3);
        const resultForSix = fizzbuzz(6);
        const resultForThirty = fizzbuzz(30);
        expect(resultForThree).to.be.equal("fizz");
        expect(resultForSix).to.be.equal("fizz");
        expect(resultForThirty).to.be.equal("fizz");
    });

    it("returns buzz for multiples of 5", () => {
        const resultForFive = fizzbuzz(5);
        const resultForFifteen = fizzbuzz(15);
        const resultForFifty = fizzbuzz(50);
        expect(resultForFive).to.be.equal("buzz");
        expect(resultForFifteen).to.be.equal("buzz");
        expect(resultForFifty).to.be.equal("buzz");
    });

    it("returns fizzbuzz for a multiple of 3 a 5", () => {
        const result = fizzbuzz(15);
        expect(result).to.be.equal("fizzbuzz");
    });

    it("returns null for a number that isn't multiple of 3 or 5", () => {
        const result = fizzbuzz(8);
        expect(result).to.be.equal(null);
    });
});
```

Another failing test means more changes to the implementation.

```js
const fizzbuzz = (n) => {
    if (n % 3 === 0 && n % 5 === 0) {
        return "fizzbuzz";
    }

    if (n % 3 === 0) {
        return "fizz";
    }

    if (n % 5 === 0) {
        return "buzz";
    }

    return null;
};

module.exports = fizzbuzz;
```

Now that test passes but we've got two of the previous ones to fail:

```console
returns fizz for multiples of 3
    expected "fizzbuzz" to equal "fizz"

returns fizz for multiples of 5
    expected "fizzbuzz" to equal "buzz"
```

It seems like we've got failing assertions in two of our tests: the one for multiples of 3 and the one for multiples of 5. These are the faulty assertions:

```
// In the test for multiples of 3
expect(resultForThirty).to.be.equal("fizz");

// In the test for multiples of 5
expect(resultForFifteen).to.be.equal("buzz");
```

Obviously, `30` and `15` are both multiples of `3` and `5`. Since we've written tests gradually and always doing the least effort possible to make them pass, we didn't have to worry about this at that time. Not getting ahead of ourselves helps a lot when writing code, but now it's time to correct those mistakes.

**Mistakes also become a lot easier to spot once they appear. By doing the least possible effort to make tests pass you end up adding less code at each iteration. Fewer lines changed means bugs have fewer places to hide.**

```js
describe("fizzbuzz", () => {
    it("returns fizz for multiples of 3", () => {
        const resultForThree = fizzbuzz(3);
        const resultForSix = fizzbuzz(6);
        const resultForThirtyThree = fizzbuzz(33); // This changed
        expect(resultForThree).to.be.equal("fizz");
        expect(resultForSix).to.be.equal("fizz");
        expect(resultForThirtyThree).to.be.equal("fizz");
    });

    it("returns buzz for multiples of 5", () => {
        const resultForFive = fizzbuzz(5);
        const resultForTwenty = fizzbuzz(20); // This changed
        const resultForFifty = fizzbuzz(50);
        expect(resultForFive).to.be.equal("buzz");
        expect(resultForFifteen).to.be.equal("buzz");
        expect(resultForFifty).to.be.equal("buzz");
    });

    it("returns fizzbuzz for a multiple of 3 a 5", () => {
        const result = fizzbuzz(15);
        expect(result).to.be.equal("fizzbuzz");
    });

    it("returns null for a number that isn't multiple of 3 or 5", () => {
        const result = fizzbuzz(8);
        expect(result).to.be.equal(null);
    });
});
```

This is enough to make all tests pass again.

If you ever need to refactor `fizzbuzz` (spoiler: you won't) you will also have tests indicating if it still conforms to the specification.

In this post, I have tried to write explain what Kent Beck does magistrally in his excellent book "TDD by Example". If you wish to see more examples or more detailed explanations, that should be your go-to material.

Even though I there is no correct way of doing TDD, it is definitely incorrect to think you should always write full-blown tests or too much code upfront. This is why many people miss the benefits of TDD, which I'll not get into here otherwise this post would end up becoming a book.


## Do passing tests mean my code works?

No. **Passing tests do not mean your code works, it just means it works for the inputs you have tested**.

**Your goal with tests should never be proving your code works, your goal should be proving it does not**.

**It is impossible to prove your code has no bugs**.

**You will never truly have 100% coverage.**

> I define 100% coverage as having examined all possible combinations of all possible paths through all methods of a class, having reproduced every possible configuration of data bits accessible to those methods, at every machine language instruction along the paths of execution. Anything else is a heuristic about which absolutely no formal claim of correctness can be made. The number of possible execution paths through a function is moderate: let’s say 10. The cross product of those paths with the possible state configurations of all global data (including instance data which, from a method scope, are global) and formal parameters is indeed very large. And the cross product of that number with the possible sequencing of methods within a class is countably infinite.  If you plug in some typical numbers you’ll quickly conclude that you’re lucky if you get better coverage than 1 in 10^12.
> [Why Most Unit Testing is Waste - James O Coplien](https://rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf)

**Having 100% code coverage does not mean you have tested all possible inputs, all possible combination of inputs and made the right assertions**.

It's always good to remember that unit tests are more of a tool to help you implementing a piece of code than to prove your application works. Always make sure you have good integration and end-to-end tests.


## A quick recap

1. Test-driven development is not about tests. It is about being able to take gradual and small steps towards a solution
2. The more confident you are, the bigger your steps can be. Avoid biting more than you can chew.
3. All code should be deterministic when under test. You should always know and assert for the exact result you expect.
4. Writing tests is really easy, the hard thing is knowing which tests to write and when.
5. When doing TDD properly, mistakes become a lot easier to spot once they appear because by doing the least possible effort to make tests pass you end up adding less code at each iteration. Fewer lines changed means bugs have fewer places to hide.
6. It is impossible to prove your code has no bugs.
7. Passing tests do not mean your code works, it just means it works for the inputs you have tested.
8. Your goal with tests should never be proving your code works, your goal should be proving it does not.
9. Having 100% code coverage does not mean you have tested all possible inputs, all possible combination of inputs and made the right assertions
10. Don't write only unit tests. Make sure you have good integration and end-to-end tests. They take more time to write but deliver great value.
