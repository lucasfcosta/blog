---
layout: post
title : "Meta Programming In JavaScript - Part Three: Proxies and Reflection"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags: nodejs meta programming javascript coding proxies reflect
---



In the third blog post of this series we will talk about two of the most interesting ES6 features: proxies and reflection (`Reflect`, to be specific). In it I will explore some intriguing ideas and show you how to unleash their power with creativity and in real world situations.

If you didn't read [the first](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html) or [the second post of this series](/2016/10/22/Meta-Programming-in-JavaScript-Part-Two.html) yet I highly recommend you to do so, even though they're not necessarily prerequisites for you to understand this one.

Also, just to make sure we're all on the same environment and that it does support proxies I've gotta tell you that I'll be using NodeJS v6.9.1 to run all the examples below and I expect you to do the same (or at least run them in any environment that does support proxies).



## **What are proxies?**

Well, before using proxies it is reasonable for us to understand exactly what they are and what they're able to do.

**A `Proxy` is a wrapper object which is able to intercept and define custom behavior for fundamental operations**. This means that when wrapping an object in a `Proxy` you can redefine the behaviors for some of the operations targeted to it, such as defining properties or even calling an `Object.*` method on it, for example.

Every `Proxy` object is made of basically two things: a `target` object and a `handler` object. The `target` object can be any object you want to wrap in order to be able to intercept operations targeted to it. The `handler` specifies which "`traps`" that `Proxy` contains. A `trap` in our context is analogous to the concept of traps when it comes to operating systems, with them we are able to intercept actions and define custom behavior.

The simplest way to create a new `Proxy` is to use its globally available constructor. For example:

```js
const proxifiedObject = new Proxy(commonObject, myHandler);
```

Proxies are totally transparent, this means **you cannot detect whether an object has been wrapped in a proxy or not and you cannot access its wrapped object or handler**, except if you keep an external reference to any of these elements, such as adding them to a `set`, `map` or just keeping a reference to them.



## **Creating Proxies**

In this first example we will create a simple `Proxy` which logs the name of every accessed property to the console. Please notice that every other operation still has its default behavior.

```js
const dinosaur = {
    name: 'Fred',
    legs: 4,
    isDangerous: true
};

const proxifiedDinosaur = new Proxy(dinosaur, {
    get: (target, propName) => {
        console.log('Property Accessed: ' + propName);
    }
});

// These won't log anything to the console since we're acessing the non-proxified object
dinosaur.name;
dinosaur.legs;
dinosaur.isDangerous;

// These will log the name of the accessed property, since they're being called on the wrapper object
proxifiedDinosaur.name; // Property Accessed: name
proxifiedDinosaur.legs; // Property Accessed: legs
proxifiedDinosaur.isDangerous; // Property Accessed: isDangerous
```

We can even go further and create infinite sequences (a.k.a. list comprehensions), [just as we can when using Haskell](http://learnyouahaskell.com/starting-out#im-a-list-comprehension). Imagine being able to have an array with **every** multiple of 3, for example. Yes, I used the word **every**: which means you can access every multiple of 3 until infinity (or at least as many multiples of 3 as the `Number` type can hold).

Let's see an infinite list in action:

```js
const multiplesOfThree = new Proxy([], {
    get: (target, index) => {
        // To get every multiple of three each index must be equal `index * 3`
        return index * 3;
    }
});

// Now let's print the fifty first multiples of three:
for (let index = 0; index < 50; index++) {
    console.log(multiplesOfThree[index]); // 0, 3, 6, 9, 12, 15...
}
```

Easy, right? It can get even better, imagine being able to use formulas or getting streams with those infinite sequences. Sounds awesome, doesn't it? Well, I have good news for you: this has already been implemented! **If you want to explore new possibilites and use infinite lists you can check [`Harray`](https://github.com/lucasfcosta/harray)**, which is available both for Node and the Browser.

Another awesome thing you can do with proxies is preventing the users of your API of accessing properties that do not exist and therefore prevent unexpected behavior. Since this is a really simple thing to do let's write the whole code for that here:

```js
const privateCounter = {
    count: 0,
    increment: function increment() {
        this.count++;
        return this;
    },
    decrement: function decrement() {
        this.count--;
        return this;
   }
};

const counter = new Proxy(privateCounter, {
    get: (target, propName) => {
        // If property exists in target we will return it, otherwise we will throw an error
        if (propName in target) {
            return target[propName];
        } else {
            throw new Error('Property ' + propName + ' does not exist.');
        }
    }
});

try {
    console.log(counter.count); // 0
    console.log(counter.increment().count); // 1
    console.log(counter.decrement().count); // 0
    console.log(counter.unicorn);
} catch (e) {
    console.log(e); // Error: Property unicorn does not exist.
}
```

And if that is not enough to you we can do even better. When someone accesses a property that does not exist on `target` you can use an algorithm like [Levenshtein](http://levenshtein.net/) to measure the distance between the accessed property's name and the name of other existent properties and then suggest correct possibilities on your error, making it even more informative.

On Chai `4.0.0`, for example, we do that to suggest correct assertion names to our users whenever they try to use assertions that do not exist. This helped us fix a big problem we were having on `3.5.0` which was that property assertions that did not exist were simply passing because JavaScript would just return `undefined` when accessing properties that do not exist. If you want to see this implemented, [here goes the link for our `proxify` function](https://github.com/chaijs/chai/blob/master/lib/chai/utils/proxify.js) (I highly recommend you to read that code).

As you can imagine, `get` is not the only trap we've got. You can see the complete list of available traps at [this MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Methods_of_the_handler_object), it would be a complete waste of time to just copy and paste that whole list here.

There is a lot of good ideas of things to implements with proxies and infinite possibilities, so let me inspire you with some more ideas:

 * As my great friend [Keith Cirkel](https://twitter.com/keithamus) suggested in [his blog post about proxies](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/), you can make infinitely chainable APIs or even implement your own version of [`Object.observe`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/observe)!
 * [Dr. Axel Rauschmayer](https://twitter.com/rauschma) also [suggests another very creative idea in his book called Exploring JS](http://exploringjs.com/es6/ch_proxies.html): you can use proxies to forward HTTP requests and then you will be able to access external resources as if they were properties on an object.


**It is also important to notice that there are two traps which only work when the target is a `function`: `apply` and `construct`.**

Even though I didn't put the whole list of traps here, these are some of the traps I think are the most interesting ones:

* The use of the `new` operator (`handler.construct`)
* Function calls (`handler.apply`)
* The `delete` operation (`handler.deleteProperty`)
* Assignments to properties (`handler.set`)



## **Creating Temporary (Revocable) Proxies**

Besides creating common Proxies, you can also create temporary (`revocable`) proxies, which can be destroyed anytime you want.

To create a revocable proxy all you gotta do is call `Proxy.revocable` passing the same arguments as you would pass the `Proxy` constructor. Differently from the constructor, however, the `revocable` method returns an object with two keys: `proxy` (which holds the proxified object) and `revoke` (which holds the function responsible for revoking an object's proxy).

In the example below we will use a revocable `Proxy` to wrap our `dinosaur` object and then we will revoke it and show what happens:

```js
const dinosaur = {
    name: 'Fred',
    isDangerous: true
};

const dinoProxy = Proxy.revocable(dinosaur, {
    get: (target, property) => {
        return 'RAWRRRRRRRR';
    }
});

// We need this assignment because the `revocable` method returns an object with the proxified object and the revoke method
const proxifiedDinosaur = dinoProxy.proxy;

// Now everytime we access a property in our `proxifiedDinosaur` it gets intercepted by the `get` trap in our handler
console.log(proxifiedDinosaur.name); // "RAWRRRRRRRR"
console.log(proxifiedDinosaur.isDangerous); // "RAWRRRRRRRR"

// Now, if we call `revoke` on our `dinoProxy` we get a TypeError when accessing properties on `proxifiedDinosaur`
dinoProxy.revoke();
console.log(proxifiedDinosaur.name); // TypeError: Cannot perform 'get' on a proxy that has been revoked
console.log(proxifiedDinosaur.isDangerous); // TypeError: Cannot perform 'get' on a proxy that has been revoked
```



## **Proxies and Prototypes**

As Axel Rauschmayer brilliantly suggested in [the 28th chapter of his book ExploringJS](http://exploringjs.com/es6/ch_proxies.html) (which I highly recommend you to read), it might be a good idea to set proxies on object's prototypes, since they'll be checked if properties are not present in lower hierarchical levels.

You can, for example, count how many times it was necessary to get properties from a `prototype`, as you can see in the example below:

```js
let count = 0;
const myProto = new Proxy({}, {
    get: (target, propName) => {
        count++;
    }
});

const anInstance = Object.create(myProto);
anInstance.propOne;
anInstance.propTwo;
anInstance.propTwo;
anInstance.propThree;
anInstance.propThree;
anInstance.propThree;

console.log('We had to check myProto ' + count + ' times.');
```



## **Forwarding Operations**

**By default, when you create a trap for an action, the default behavior for that action won't happen anymore (unless you find a way to call it manually)**. This means that whenever you have a trap for the `get` operation and you return nothing, you won't be able to retrieve the value of properties anymore.

To demonstrate this, take a look at the following example, in which we have a trap for the `get` operation and log the value of every property on our proxified object.

```js
const dinosaur = {
    name: 'Fred',
    legs: 4,
    isDangerous: true
};

const proxifiedDinosaur = new Proxy(dinosaur, {
    get: (target, propName) => {
        // We will do nothing here
        // This means you won't have the default behavior of accessing properties
    }
});

const dinosaurProps = Object.keys(proxifiedDinosaur);

dinosaurProps.forEach((prop) => {
    // Every property will be `undefined` here:
    console.log('Property ' + prop + ' is ' + proxifiedDinosaur[prop]);
});
```

Fortunately we've got the new `Reflect` global object to solve this problem. Added in ES6, it allows you to call static functions for interceptable JavaScript operations.

The interesting thing in `Reflect` and the reason why it works so well alongside proxies is because it provides methods with the same signature as the the traps' callbacks. This means that **for every proxy trap, we've got a method in Reflect with that same name and that receives the same arguments as that trap.**

Let's say you'd like create a trap for the `get` operation which logs which property the being accessed and then forwards that operation in order to achieve its default behavior, this is what you would do:

```js
const anObj = new Proxy({}, {
    get: (target, propName) => {
        console.log('Accessed prop: ' + propName);
        return Reflect.get(target, propName);
    }
});
```

The same applies for any other trap, if you have a trap called `x` and its callback function takes arguments `y` and `z`, you will have a globally available method called `Reflect.x` which also takes `y` and `z` as arguments.



## Coming up soon...

In this post we talked about proxies and about the new `Reflect` global object, I think this blog post was pretty straight forward but it is filled with ideas and other great references. I hope you like it.

In the next and last post of this series we will talk about **Symbols**. We will study their properties, how they're used to "guide" the language's internal operations and see how to use them to effectively solve real world problems.

**If you have any doubts or thoughts, please share them with me on the comments below or reach me at [@thewizardlucas on twitter](https://twitter.com/thewizardlucas)!**
