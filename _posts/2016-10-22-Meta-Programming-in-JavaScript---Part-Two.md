---
layout: post
title : "Meta Programming In JavaScript - Part Two: Freeze, Seal, Prevent Extensions and Inheritance"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : nodejs meta programming javascript coding
---

<br>

In the second blog post of this series I will teach you how to deal with inheritance and also teach you how the `.freeze`, `.seal` and `.preventExtensions` methods work and a about how to deal with inheritance, both by making changes to the inheritance chain and by going through it to read properties.

If you didn't read [the first post of this series](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html) yet I highly recommend you to do so since we're going to need some of the concepts we have learned there.

Also, before messing with the inheritance chain we need to understand its basics, **if you want to learn about how inheritance works in JavaScript I highly recommend you to read [this article](https://alexsexton.com/blog/2013/04/understanding-javascript-inheritance/) by Alex Sexton** before continuing.

<br>

## **Going through the prototype chain**

Remember what we've seen on the last chapter about listing the enumerable properties an object has? What if we wanted to see **every** property an object has and not just the enumerable ones?

To handle that we've got `Object.getOwnPropertyNames`, but that alone is not enough, because it returns the name only of the **own** properties of an object and not the ones present up in the prototype chain, so we will also need `Object.getPrototypeOf`, which returns the prototype of an object thus we will be able to to go up in the prototype chain and solve this problem.

To make it clear, let me give you an example: let's say you've got a `tRex` object which inherits from `dinosaur`, which inherits from `animal` and you want to get the names of every property they've got, including the non-enumerable ones. This is what you would do:

```js
const animal = {};
Object.defineProperty(animal, 'isHuman', {
    value: false,
    enumerable: false
});

const dinosaur = Object.create(animal);
Object.defineProperty(dinosaur, 'isExtinct', {
    value: true,
    enumerable: false
});

const tRex = Object.create(dinosaur);
Object.defineProperty(tRex, 'legs', {
    value: 4,
    enumerable: false
});

function getAllPropertiesOf(something) {
    let properties = [];
    
    let proto = something;

    // Here we are stopping at Object.prototype because we don't want things like valueOf, toString, etc...
    while (proto !== Object.prototype) {
        properties = properties.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }

    return properties;
}

console.log(getAllPropertiesOf(tRex));
```

Simple isn't it? Basically what we're doing is adding the properties we've got from an object using `Object.getOwnPropertyNames` to an array of properties (actually we're using `.concat` to create a new array on every iteration, but that doesn't matter in this case) and then going up the prototype chain using `Object.getPrototypeOf` and repeating this process for every object until we reach `Object.prototype`, which is the uppermost prototype.

<br>

## **__proto__ and Prototype**

In ES6 we've got the controversial `__proto__` property, which will always point to an object's prototype. It's this property that will be used when going up the prototype chain to access a property. But why does this exist if we already have the `prototype` property?

As you may have noticed, objects can have other objects as their prototypes, so they need to store this reference somewhere and you would normally expect them to store it in a property called `prototype`, but, as we're dealing with JavaScript and nothing is as simple as it seems, sometimes the property `prototype` will be `undefined` even though an object inherits from another one. Let me explain that edge case to you.

**By default only Functions have the `prototype` object** and this happens because when calling a function with `new`, that function will be the prototype for that object.

Again, it's time for an example to make things clear, first we will create an object by calling a constructor function with `new`:

```js
function Dinosaur(name) {
    this.name = name;
}

const fred = new Dinosaur('fred');

console.log(Object.getPrototypeOf(fred) === Dinosaur.prototype); // true

// Now notice that Fred's __proto__ is Dinosaur too
console.log(fred.__proto__ === Dinosaur.prototype); // true
```

Did you notice how the `prototype` property has been set as the `Dinosaur` function? Now let's create an object which inherits from another object by using `Object.create`:

```js
const dinosaur = {};

const fred = Object.create(dinosaur);

console.log(fred.prototype === dinosaur); // false because fred.prototype is undefined
console.log(fred.__proto__ === dinosaur); // true because that's where JavaScript will look for properties when they're not present in Fred
```

Now you have been warned. Whenever in doubt use `Object.getPrototypeOf` and you will be fine.

<br>

## **Redefining Prototypes**

Before teaching you how to redefine the prototype of an object it's also my responsibility to warn you about how slow this operation is. It's so slow that even MDN has put up this notice on the top of its article about `Object.setPrototypeOf`:

>Warning: Changing the [[Prototype]] of an object is, by the nature of how modern JavaScript engines optimize property accesses, a very slow operation, in every browser and JavaScript engine. The effects on performance of altering inheritance are subtle and far-flung, and are not limited to simply the time spent in obj.__proto__ = ... statement, but may extend to any code that has access to any object whose [[Prototype]] has been altered. If you care about performance you should avoid setting the [[Prototype]] of an object. Instead, create a new object with the desired [[Prototype]] using Object.create().

However, if you still need to change the `prototype` of an existing object, you have two main ways of doing that: one of them is to simply redefine the `__proto__` property of an object (or using `Object.setPrototypeOf`) and the other is iterating through every property an object has and then adding it to a new object. And if you ask me why would you do the latter the answer will be simple: not all browsers support `__proto__` and `Object.setPrototypeOf`.

As we have seen on [the first post of this series](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html), every property has an object which describes that properties' properties (I was dying to use that phrase) which is called a `Property Descriptor`. Since the descriptor of a property can contain crucial data to the functioning of an object, it is a very important part of it and we need to transfer that to our new object too, so we will be using `Object.getOwnPropertyDescriptor`, which returns the property descriptor for a non-inherited property of an object. You also need to use `Object.getOwnPropertyNames` to avoid transfering inherited properties and to avoid not transfering non-enumerable properties.

The example below demonstrates how to build a function that transfers every property of an object to another one with the desired prototype whenever we can't just redefine `__proto__`.

```js
function changeProto(target, newProto) {
    if ('__proto__' in Object) {
        target.__proto__ = newProto;
    } else {
        // Clone is a new object which has `newProto` as its prototype
        const clone = Object.create(newProto);
        const propNames = Object.getOwnPropertyNames(target);

        // Here we define properties on the cloned object with their respective property descriptors
        propNames.forEach((propName) => {
            const propDescriptor = Object.getOwnPropertyDescriptor(target, propName);
            Object.defineProperty(clone, propName, propDescriptor);
        });
    }

    return clone;
}

const oldProto = {
  name: 'oldProto'
};

const newProto = {
  name: 'newProto'
};

const instance = Object.create(oldProto);
console.log(instance.name); // oldProto

const newInstance = changeProto(instance, newProto);
console.log(instance.name); // newProto
```

<br>

## **Freezing, Sealing and Preventing Extensions**

These three are commonly misunderstood due to the similarity of their actions, but let's explain what each one of them does and hopefully we will be able to end this confusion once and for all.

<br>

### Freezing

This is the most restrictive action between all three. Calling `Object.freeze` on an object makes it "immutable" and returns it. **Frozen objects cannot have their property descriptors changed, cannot have their value changed and can't have new properties added to them.**

Also, as you might have noticed, I used quotes around the *immutable* word and that is because **even though an object is frozen, you can still change properties from its values that are objects and you can still change values on its prototype** (if these things are not frozen or anything like that, of course). In the example below it is easy to notice this behavior. Observe how we were able to change the values in an object's prototype and in its values that are also objects even though the original object was frozen.

```js
const animal = {
    legs: 4
};

// Dinosaur inherits from animal
const dinosaur = Object.create(animal);
dinosaur.isDangerous = true;
dinosaur.stomach = {
    cows: 2,
    pigs: 4
};

// Now we will freeze our dinosaur
const frozen = Object.freeze(dinosaur);

// frozen and dinosaur are the same instance
console.log(frozen === dinosaur); // true

// Notice how we can still change values in nested objects inside dinosaur
console.log(dinosaur.stomach.pigs); // 4
dinosaur.stomach.pigs = 10;
console.log(dinosaur.stomach.pigs); // 10

// We can also change values on its prototype
console.log(dinosaur.legs); // 4
Object.getPrototypeOf(dinosaur).legs = 2;
console.log(dinosaur.legs); // 4

// However, we cannot change its own values
console.log(dinosaur.isDangerous); // true
dinosaur.isDangerous = false;
console.log(dinosaur.isDangerous); // true

// And we can't add new properties to it
console.log(dinosaur.isExtinct); // undefined
dinosaur.isExtinct = true;
console.log(dinosaur.isExtinct); // undefined
```

<br>

### Sealing

The `Object.seal` method seals an object, preventing any new properties from being added to it and preventing you of changing any property's property descriptor, except their value (but only if the property is `writable`).

In sealed objects, as it happens on frozen objects, **you can still make changes inside nested objects and properties on the object's prototype** (as long as they're not frozen, sealed or anything like that too).

```js
const vehicle = {
    wheels: 4
};

// Ferrari inherits from vehicle
const ferrari = Object.create(vehicle);
ferrari.cost = Infinity;

// The isFast property of our Ferrari won't be writable
Object.defineProperty(ferrari, 'isFast', {
    value: true,
    writable: false
});

// Now we will seal our Ferrari
const sealed = Object.seal(ferrari);

// ferrari and sealed are the same instance
console.log(ferrari === sealed);

// Notice how we can still change the values of any writable properties inside the Ferrari
console.log(ferrari.cost); // Infinity
ferrari.cost = 1;
// Now we can afford this ferrari
console.log(ferrari.cost); // 1

// However, we cannot change non-writable properties
console.log(ferrari.isFast); // true
ferrari.isFast = false;
console.log(ferrari.isFast); // true

// We also can't change the descriptor of any properties
try {
    Object.defineProperty(ferrari, 'cost', {
        enumerable: false
    });
} catch (e) {
    console.log(e.constructor.name); // TypeError
    console.log(e.message); // Cannot redefine property: 'cost'
}
```

### Preventing Extensions

The `Object.preventExtensions` method is the least restrictive and only prohibits the user from adding new properties to an object. As it happens with the other two methods (`freeze` and `seal`), nested objects and prototypes can still have properties added to them (if anyone has not called `Object.preventExtensions` on them too).

Let's demonstrate the behavior of `Object.preventExtensions` with a simple example:

```js
const brazil = {
    isHot: true
};

// Rio inherits from Brazil
const rio = Object.create(brazil);
rio.beaches = {
    copacabana: 'Expensive place.',
    ipanema: 'Awesome beach.'
};

// Now we will prevent Rio from being extended
const nonExtensible = Object.preventExtensions(rio);

// rio and nonExtensible are the same instance
console.log(nonExtensible === rio);

// Now we just can't add new properties to rio
console.log(rio.biggestArena); // undefined
rio.biggestArena = 'maracana';
console.log(rio.biggestArena); // undefined

// However, we can still add itens to nested objects
console.log(rio.beaches.leblon); // undefined
rio.leblon = 'Beautiful beach.';
console.log(rio.beaches.leblon); // 'Beautiful beach.'

// We can also add new properties to Rio's prototype
console.log(brazil.currency); // undefined
brazil.currency = 'BRL';
console.log(brazil.currency); // BRL
```

<br>

### Checking if an object is frozen, sealed or non-extensible

To check if an object has been frozen, sealed or if it's non-extensible you can use the following methods, which return a boolean value:

* `Object.isFrozen`
* `Object.isSealed`
* `Object.isExtensible`

<br>

### How to Remember Them

Now that you know what each one does, you might find it easier to remember what is most restrictive one and what is the least restrictive one by putting this diagram into your mind.

As you can see, `Object.freeze` is the most restrictive one and also includes the same restrictions as `Object.seal` and `Object.preventExtensions`. `Object.seal` includes the same restrictions as `Object.preventExtensions`. Finally, `Object.preventExtensions` is the least restrictive one and does not include the same restrictions as any other `Object.*` method.

<br>

![Venn Diagram with Freeze, Seal and PreventExtensions](/assets/freezeSealAndPreventExtensions.png)

<br>

## Coming up soon...

In this post we talked about inheritance and prototypes and about `freezing`, `sealing` and `preventing extensions`. The next post of this series will be about Proxies, Reflection and other kinds of intercessions. It will be the most dense post until now, so you better be prepared!

**If you have any doubts or thoughts, please share them with me on the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)!**
