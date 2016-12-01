---
layout: post
title : "Meta Programming In JavaScript - Part One: Properties and Property Descriptors"
author: Lucas Fernandes da Costa
tags : nodejs meta programming javascript coding
---

<br>

This is the first blog post of a series in which I will teach you some meta programming techniques in JavaScript. Recently I have been seeing many posts about Proxies because they're a recent feature (and because they're awesome and people really should be talking about them anyway), but JavaScript has a lot more to offer on the grounds of meta programming, so I will try to explore the things people don't usually talk about.

First, let's start by defining "meta programming". According to Wikipedia, meta programming can be defined as:

> Metaprogramming is the art of writing of computer programs with the ability to treat programs as their data. It means that a program could be designed to read, generate, analyse or transform other programs, and even modify itself while running.

Basically, anything that can act upon your program, modify it or use its own structure as data can be considered meta programming. Also, as [Dr. Axel Rauschmayer brilliantly noticed](http://www.2ality.com/2014/12/es6-proxies.html): "all of the `Object.*` methods can be considered meta programming functionality".

<br>

## **Listing Properties of an Object**

Being able to list the properties of an object is a really useful `introspection` feature. Actually there is more ways to do that, but I'll use `Object.keys` for this example. The `Object.keys` function returns an array with the name of every `enumerable` property an object has (we will see what this means in the next section).
Let's say you've got a "fruits basket" object which has a different property for each fruit it contains and the values of those properties represent the quantity of each fruit. Different fruit baskets have different fruits and therefore have different keys. How can you build a function which lists the fruits available at a fruits basket?

```js

const tropicalBasket = {
    bananas: 3,
    papayas: 0,
    oranges: 7,
    watermelons: 4 // Don't even dare asking me how 4 watermelons fit inside a basket
};

const smallBasket = {
    strawberries: 8,
    grapes: 12
};

const getFruitsDescription = (basket) => {
    // This will hold the name of every key (fruit) listed in the object
    const fruitsListed = Object.keys(basket); // E.g. ['bananas', 'papayas', 'oranges', 'watermelons']

    // Here we will create a new Array with every fruit with quantity > 0
    const fruitsAvailable = fruitsListed.filter((fruit) => {
        return basket[fruit] > 0;
    });

    return 'This basket has: ' + fruitsAvailable.join(', ');
};

console.log(getFruitsDescription(tropicalBasket)); // This basket has: bananas, oranges, watermelons
console.log(getFruitsDescription(smallBasket)); // This basket has: strawberries, grapes
```

You could also have used `for (let prop in obj)` for that. In that case `prop` would be the the name of each property and you could access `prop`'s value by using `obj[prop]`.

<br>

## **Property Descriptors**

In JavaScript every `property` of an `object` has a property descriptor. A property descriptor is an object describing the properties of a property (really self explanatory, isn't it?). It contains information on whether or not you can delete a property or change its value, show the property itself when enumerating the properties of an object, and change the value of a property with an assignment operator. A property descriptor may also contain the `get` and `set` properties, which may be functions to serve as a `getter` or `setter` for a property (respectively). And you can also set a `value` for that property, of course.

These are the properties a property descriptor has and their description (this was taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)):

* `configurable` - `true` if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object (defaults to `false`).
* `enumerable` - `true` if and only if this property shows up during enumeration of the properties on the corresponding object (defaults to `false`).
* `value` - The value associated with the property. Can be any valid JavaScript value (defaults to `undefined`).
* `writable` - `true` if and only if the value associated with the property may be changed with an assignment operator (defaults to `false`).
* `get` - A function which serves as a getter for the property, or `undefined` if there is no getter. This function will be called whenever retrieving a property and its return value will be used as the value for that property.
* `set` - A function which serves as a setter for the property, or `undefined` if there is no setter. This function will be called with the value you are trying to assign to the property whenever setting that property.

Also, notice that these default values apply only when you're using `property descriptors` to define a property. When you're using object literals or assigning directly to a property, the descriptor for that property will have different default values.

If this is the first time you're seeing a property descriptor this may look very abstract, so let me get back to the fruits basket example.

This time you've got not only the fruits basket, but also the color of the basket. However, you certainly don't want it to be displayed when you're enumerating the properties of your basket, otherwise you would end up making your `getFruitsDescription` function return an incorrect description of what is inside the basket. Therefore we will need to set a non-enumerable property in our basket, this way we will still be able to access it but it won't be listed by `Object.keys()`.

To define (or redefine) a property in an object using a property descriptor you must use [the `Object.defineProperty` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

```js
const tropicalBasket = {
    bananas: 2,
    papayas: 0,
    oranges: 7,
    watermelons: 4
};

Object.defineProperty(tropicalBasket, 'color', {
    value: 'green', // the value of the property
    enumerable: false, // this property won't be listed when calling `Object.keys`
    configurable: false, // we can't change this property's descriptor and we can't delete this property
    writable: true // we can assign a new value to this property by using an assignment operator like `=`
});

console.log(Object.keys(tropicalBasket)); // ['bananas', 'papayas', 'oranges', 'watermelons']
console.log(tropicalBasket.color); // 'green'
```

Cool isn't it?

But that's not all, you can also get the property descriptor of a property by using `Object.getOwnPropertyDescriptor` (please notice that this will only work for non-inherited properties).

There's also another version of `Object.defineProperty` called [`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) which let's you define more than one property at a time. You can use it like this:

```js
const tropicalBasket = {
    bananas: 2,
    papayas: 0,
    oranges: 7,
    watermelons: 4
};

Object.defineProperties(tropicalBasket, {
    'color': {
        value: 'green',
        enumerable: false,
        configurable: false,
        writable: true
    },
    'owner': {
        value: 'Tarzan',
        enumerable: false,
        configurable: false,
        writable: false
    }
});

console.log(Object.keys(tropicalBasket)); // ['bananas', 'papayas', 'oranges', 'watermelons']
console.log(tropicalBasket.color); // 'green'
console.log(tropicalBasket.owner); // 'Tarzan'
```

<br>

## Using custom `getter` functions

As we've seen before, it's possible to define custom functions to be called when accessing or setting the value of properties, to do this all you've gotta do is add a function to the `get` or `set` property of your property descriptor when defining a property.

Let's use the fruits basket example again. This time let's say we've got a fruits basket that weights 1 kilogram and we want to retrieve the its total weight including the weight of the fruits inside it. How could we do that dinamically? How can we retrieve a correct weight without redefining the `weight` property everytime we add a new fruit to our basket?

The answer is simple: **let's use a `getter` function!**

```js
const fruitWeightsInKg = {
    bananas: 1, // those are big bananas
    papayas: 1, // big papayas too
    oranges: 5, // why lift weights when you've got 5kg oranges?
    watermelons: 10
};

const tropicalBasket = {
    bananas: 2,
    papayas: 0,
    oranges: 7,
    watermelons: 4
};

// When defining a `getter` or `setter` you need to leave the `writable` property out of your property descriptor!
Object.defineProperty(tropicalBasket, 'weight', {
    enumerable: false,
    configurable: false,
    get: function get() {
        const fruitsList = Object.keys(this); // ['bananas', 'papayas', 'oranges', 'watermelons'];

        // I'd prefer using `reduce` here, but for educational purposes I'm gonna use a `for` loop
        let weight = 1; // This is the weight of the empty basket
        for (let fruit of fruitsList) {
            weight += fruitWeightsInKg[fruit] * this[fruit]; // Here we're adding fruitWeight * fruitQuantity to the total weight
        }

        return weight;
    }
});

console.log(tropicalBasket.weight); // 78

tropicalBasket.watermelon -= 1; // Now let's remove one watermelon (which weights 10kg) from the basket
console.log(tropicalBasket.weight); // 68
```

Using custom `getter` functions can be fun, but you must take care when using them. These functions can be very dangerous because of two main reasons:

1. They will be called whenever you access a property, whether or not you're using it's value. This can be very dangerous if your getter functions have side-effects.
2. If you're accessing it too often and doing heavy operations or recalculating things you may have a performance decrease, so you need to analyze each situation carefully. If you would need to redefine a property too often and would access it only a few times this will be a great choice since you will only calculate the property you would need to change everytime when you really want its value, as it happens on our fruits basket example. If we were adding and removing fruits all the time and resetting the `weight` property we would have a performance decrease, but since we want to be able to add and remove fruits frequently and retrieve the weight only a few times, it's better to get it "on-demand".

<br>

## Using custom `setter` functions

Now that we have already seen `getter` functions, let's study how `setter` functions work.

The `setter` function must be the value for the `set` property of your property descriptor when defining a property. This function will receive an argument which will be the value being assigned to it and then the function can do whatever it wants with it, including assigning the new value to another property or variable.

In order to be consistent, let's keep using the fruits basket example here too (yes, I like fruits, they're good for your health).

Now let's imagine we have got an two identifier words for each basket but we are too lazy to set them separately and so we want to assign to both just by assigning two words to the `identifiers` property.

Here comes `set` to the rescue:

```js
const tropicalBasket = {
    bananas: 5,
    papayas: 0,
    oranges: 7,
    watermelons: 4
};

// Don't forget we have to set these using `Object.defineProperty` in order to make them non-enumerable
// We also need to set `writable` to `true`, otherwise it will be false by default
Object.defineProperty(tropicalBasket, 'firstIdentifier', {
    value: 'tropical',
    enumerable: false,
    writable: true
});

Object.defineProperty(tropicalBasket, 'secondIdentifier', {
    value: 'basket',
    enumerable: false,
    writable: true
});

Object.defineProperty(tropicalBasket, 'identifiers', {
    enumerable: false,
    configurable: false,
    set: function set(val) {
        const identifiers = val.split(' ');
        this.firstIdentifier = identifiers[0];
        this.secondIdentifier = identifiers[1];
        
        // Don't try to set the identifier property itself inside here or you will get infinite recursion since it will call the set function again
    }
});

tropicalBasket.identifiers = 'magical thing';
console.log(tropicalBasket.firstIdentifier); // 'magical'
console.log(tropicalBasket.secondIdentifier); // 'thing'
```

Please notice that you cannot reassign to the property you are setting inside your own `setter` function, otherwise it will end up calling itself infinitely.

<br>

## The Easy Way

At last, but not least, let me show you the easy way of defining `getters` and `setters` for a property. I'm sorry for not showing you this before, but since I needed to explain how property descriptors work I thought it would be better to use them before showing you the following technique.

When creating object literals you can define the `get` and `set` functions directly on them, like the example below:

```js
const fruitsBasket = {
    firstIdentifier: 'common',
    secondIdentifier: 'basket',
    bananas: 10,
    oranges: 4,
    get totalFruits() {
        return this.bananas + this.oranges;
    },
    set identifiers(val) {
        const identifiers = val.split(' ');
        this.firstIdentifier = identifiers[0];
        this.secondIdentifier = identifiers[1];
    }
};

console.log(fruitsBasket.totalFruits); // 14

fruitsBasket.identifiers = 'nice thing'
console.log(fruitsBasket.firstIdentifier); // 'nice'
console.log(fruitsBasket.secondIdentifier); // 'thing'
```

<br>

## Some Cool Ideas

By using the knowledge you learned in this post you can also create beautiful chainable API's. This gives you flexibility and makes your API beautiful and understandable.

In the example below we have a beautiful API to consume bananas from a basket. Pay attention to how close it is to the english language:

```js
const fruitsBasket = {
    firstIdentifier: 'common',
    secondIdentifier: 'basket',
    bananas: 10,
    oranges: 4,
    get totalFruits() {
        return this.bananas + this.oranges;
    },
    set identifiers(val) {
        const identifiers = val.split(' ');
        this.firstIdentifier = identifiers[0];
        this.secondIdentifier = identifiers[1];
    }
};

const consume = function consume(amount) {
    return {
        amount,
        get bananas() {
            return this;
        },
        from: function from(targetBasket) {
            targetBasket.bananas -= this.amount; 
        }
    }
};

console.log(fruitsBasket.bananas); // 10
consume(6).bananas.from(fruitsBasket);
console.log(fruitsBasket.bananas); // 4
```

Cool, isn't it? Want some real world examples? No problem!

Currently the [Chai](http://chaijs.com/) assertion library uses these techniques to provide an efficient, clear and beautiful API. Take a look at the examples for the [`expect` or `should`](http://chaijs.com/api/bdd/) interfaces and you will see what I'm talking about. Of course Chai has more checks and is more careful than I was when crafting this example, but it's basically the same thing, just implemented more carefully and covering more edge cases.

If you want to see the source code for how this is done inside the library you can take a look at [`addMethod.js`](https://github.com/chaijs/chai/blob/master/lib/chai/utils/addMethod.js), [`addProperty.js`](https://github.com/chaijs/chai/blob/master/lib/chai/utils/addProperty.js) or [`addChainableMethod.js`](https://github.com/chaijs/chai/blob/master/lib/chai/utils/addChainableMethod.js).

Also, feel free to contribute!

<br>

## Coming up soon...

In this post we talked about enumerating properties, about property descriptors and how to take advantage of them. In the next one I'll talk about `freezing`, `sealing` and about inheritance.

You better be prepared!

**If you have any doubts or thoughts, please share them with me on the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**
