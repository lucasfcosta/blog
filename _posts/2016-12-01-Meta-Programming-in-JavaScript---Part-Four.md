---
layout: post
title : "Meta Programming In JavaScript - Part Four: Symbols"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags: nodejs meta programming javascript coding metaobject protocol mop
---

<br>

Hello, everyone! So we finally got to the end of our Meta Programming series of blog posts (for now)! But there's much more to explore on this matter, so if you have any ideas related to what you'd like me to write about, get in touch!

If you didn't read [the first](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html), [the second](/2016/10/22/Meta-Programming-in-JavaScript-Part-Two.html) or [the third](/2016/11/15/Meta-Programming-in-JavaScript-Part-Three.html) posts of this series I highly recommend you to do that since we're going to use some concepts we have learned before, especially property descriptors and inheritance!


<br>

## **What is a Symbol?**

First of all we must distinguish the `Symbol` object from the `symbol` type.

**The `symbol` type is a new primitive type of value** introduced in ES6 and **it is both immutable and unique**, which means that, differently from other primitives, a `symbol` will never be equal another one (just as it happens with objects). This behavior very useful and soon we will see why.

The `Symbol` object is a globally available object which acts as a wrapper around the `symbol` primitive data type.

Everytime I write `Symbol` with a capital `S` I'll be talking about the global object and everytime I write `symbol` I'll be talking about the primitive type.

To create a new `symbol` you just need to invoke the `Symbol` function, **if you use the `new` operator a `TypeError` will be thrown**. This becomes clear in the example below:

```js
// First we will invoke Symbol to create a new symbol primitive
const mySymbol = Symbol();

// `mySymbol` is not an instanceof `Symbol`, since Symbol is not its constructor
// Keep in mind that `symbol` is a primitive type!
console.log(mySymbol instanceof Symbol); // false

// If you try to call Symbol using the `new` operator you will get a TypeError:
try {
    const newSymbol = new Symbol();
} catch (e) {
    console.log('A ' + e.constructor + ' was thrown.');
}
```

This happens in order to prevent developers from creating other instances of the `Symbol` object instead of getting new values of type `symbol`. If you could do that, this is what would happen:

```js
// THIS IS NOT A RUNNABLE EXAMPLE! It is just a simulation

// Let's imagine you could do this:
const symbolInstance = new Symbol();

// Since you would be using the `new` operator with `symbolInstance` you would get back the `this` reference inside its constructor
// If that was possible, the following would happen:
console.log(typeof symbolInstance); // 'object'
console.log(symbolInstance instanceof Symbol); // true
console.log(symbolInstance.constructor === Symbol); // true
```

If you want to create an instance of the `Symbol` constructor instead of creating a new `symbol` primitive you just gotta use the `Object()` function, which wraps primitives into objects. The `Object()` function is also great to detect whether or not something is a primitive, because if you use `Object(myVar) === myVar` this comparison will always return `false` when `myVar` is a primitive, since it will be wrapped in a object by `Object()` and therefore these two values will be different from each other.

So take a look at the example below, which is the same as our simulation above except for the way we create an instance of the `Symbol` object:

```js
// Here we create a primitive `symbol`
const sym = Symbol();
typeof sym; // "symbol" 

// Now we will wrap our primitive into a Symbol object using the Object function
const symObj = Object(sym);

// Now symbol is an object
console.log(typeof symObj); // "object"
console.log(symObj instanceof Symbol); // true

// As you can see, our wrapped symbol has Symbol.prototype as its prototype
// If you want to read more about `__proto__` and `prototype` make sure to read the second chapter of this series
console.log(symObj.__proto__ === Symbol.prototype); // true
```


<br>

## **Symbols and Their Behavior**

As we've seen in the previous section, `symbols` are a really special primitive type because, just as it happens with people, every `symbol` is unique. This means it will never be equal any other value no matter what.

When creating a `symbol` you can also give it a description by passing a `String` to the `Symbol` function. This description, however, will only be used for debugability purposes since even though two symbols have the same description, they still won't be considered equal, as you can see in the example below:

```js
const description = 'my description';
const symbolOne = Symbol(description);
const symbolTwo = Symbol(description);

console.log(symbolOne === symbolTwo); // false
```

In JavaScript we have a global symbol registry, which holds symbols created with the `Symbol.for` method, which receives a String as its only argument. The `Symbol.for` method is really important when we're dealing with symbols, because if we do not understand it we can end up in trouble, since it can make it seem like its possible to have non-unique symbols (symbols that can be considered equal when using the `===` operator).

**The `Symbol.for` method searches for a symbol with the given description in the global registry and returns it if it's found, otherwise it creates a new symbol for that description and returns it.** It's also important to keep in mind that **symbols in the global registry are uniquely identified by their description**, which means that it's impossible to have two symbols with the same description in the global registry.

In the example below we demonstrate how `Symbol.for` works. Please read the comments carefully, they are essential to understanding the whole example.

```js
// First let's create a symbol in the global registry using `'ice cream'` as its description.
// Here our JavaScript engine will look for a symbol with this description on the global symbol registry and since it won't
// be able to find any symbol with this description, it will create a new symbol in the global registry and return it.
const globalSymbol = Symbol.for('ice cream');

// Now let's create a local symbol with that same description
const localSymbol = Symbol('ice cream');

// Notice how `localSymbol` is still different from `globalSymbol` even though they have the same description
console.log(globalSymbol === localSymbol); // false

// This comparison will return `true` because now `Symbol.for` will retrieve the existing symbol from the global registry
console.log(Symbol.for('ice cream') === globalSymbol); // true

// Everytime we call `Symbol.for('ice cream')` it will return the same instance on the global registry
console.log(Symbol.for('ice cream') === Symbol.for('ice cream'));
```

Another interesting thing to notice is that it is reasonably easy to end up having descriptions that clash with the ones that already exist in the global registry and this may cause trouble. MDN recommends that you prefix your symbol descriptions with your identifier to avoid this kind of issue.

There is also another method similar to `Symbol.for` which instead of searching for a symbol in the global registry by its description, **searches a description by its symbol**. This method is called `Symbol.keyFor` and, as we said earlier, takes a `symbol` as argument. For example:

```js
// Here we create a global symbol with `'foo'` as its description
const globalSymbol = Symbol.for('foo');

// We will also create a local symbol with the same description
const localSymbol = Symbol('foo');

// Now let's say we want to retrieve the description for our mySymbol item from the global registry
console.log(Symbol.keyFor(globalSymbol)); // 'foo'

// Notice how we can't find any description on the global registry for the local symbol, even though it has the same description
console.log(Symbol.keyFor(localSymbol)); // undefined
```

**If you use a `symbol` as the key for an object's property you won't be able to read it without using the specific `Object.getOwnPropertySymbols` method.** `Object.getOwnPropertySymbols` works just like `Object.getOwnPropertyNames`, except that instead of returning every property's name, it returns an array with the symbols being used as keys.

Similarly to what happens when you use `Object.getOwnPropertyNames`, **an object's symbols are always returned by `Object.getOwnPropertySymbols`, it doesn't matter if they are enumerable or not** (if you want to read about what an `enumerable` property is, please read [the first chapter of this series](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html)). This means that you will not be able to completely hide information in an object by using `Symbols` as the example below clearly demonstrates:

```js
const myObj = {};

// Let's define a non-enumerable property in `myObj` using a symbol as key
Object.defineProperty(myObj, Symbol('aSymbol'), {
    value: 'This is not enumerable',
    enumerable: false
});

// Now we will define an enumerable property in `myObj` using another symbol as key
Object.defineProperty(myObj, Symbol('anotherSymbol'), {
    value: 'This is enumerable',
    enumerable: true
});

// Notice how we are still able to see these two symbols when we use `Object.getOwnPropertySymbols`
const ownPropertySymbols = Object.getOwnPropertySymbols(myObj);
console.log(ownPropertySymbols); // [Symbol(aSymbol), Symbol(anotherSymbol)]
console.log(myObj[ownPropertySymbols[0]]); // 'This is not enumerable'
console.log(myObj[ownPropertySymbols[1]]); // 'This is enumerable'


// However, we still can't see these symbols using `Object.getOwnPropertyNames` or `Object.keys`
console.log(Object.getOwnPropertyNames(myObj)); // []
console.log(Object.keys(myObj)); // []
```

When retrieving symbols from objects we also need to pay attention to whether they exist on the current object or somewhere along its `prototype` chain, since `Object.getOwnPropertySymbols` returns only non-inherited symbols. If we want to retrieve every symbol throughout the inheritance chain we need to use `Object.getPrototypeOf` to go up the inheritance chain and then call `Object.getOwnPropertySymbols` again. As it happens in the example below:

```js
const fatherObj = {};
fatherObj[Symbol('fatherSymbol')] = 'father\'s property value';

const sonObj = Object.create(fatherObj);
sonObj[Symbol('sonSymbol')] = 'son\'s property value';

const everySymbol = Object.getOwnPropertySymbols(sonObj).concat(Object.getOwnPropertySymbols(Object.getPrototypeOf(sonObj)));
console.log(everySymbol); // [Symbol(sonSymbol), Symbol(fatherSymbol)];
```

Even though non-enumerable symbols still can be found by using `Object.getOwnPropertySymbols`, making a property which has a `symbol` as its key `enumerable` or not can be useful because when using [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) (which copies the values of all non-inherited enumerable properties of an object ot another) we can avoid copying undesirable symbols.


<br>

## **Using Symbols to solve Real World Problems™**

Now that we know how to create Symbols and their behavior, it's time to see how we can take advantage of them in the real world.

Due to the fact that every `symbol` is unique, using a `symbol` as the key for a property guarantees it won't be overwritten if someone isn't careful and ends up assigning to that same property. Since anyone can still use `Object.getOwnPropertySymbols` and retrieve all the symbols from an object, they will still be able to assign to that property, but then it will be on purpose and not just an unfortunate coincidence.

Let's say you've got a library which stores a bunch of flags about objects on the objects themselves in order to use this information later. You could use `flag` as the name for that property, but then if anyone has an object which represents a pirate ship, for example, they can end up assigning a value to the `flag` property and you will not have access to the data you need anymore. By using a `symbol` for that property we guarantee that anyone assigning to that property is fully aware of what they're doing.

For example:

```js
// This creates an instance of an example library
function createLibrary() {
    // This symbol is the one which will be the key for our metadata on a target object
    const flagsPrivateSymbol = Symbol('flags');

    return {
        // Here we have a function which marks a timestamp on an object
        addTimestamp: (anObj) => anObj[flagsPrivateSymbol] = Date.now(),
        // This other function checks if the timestamp was added more than 2 seconds ago
        isTimestampTwoSecondsOld: (anObj) => (Date.now() - anObj[flagsPrivateSymbol]) > 2000
    };
};

// This is an instance of our example library
const myLibrary = createLibrary();

// Here is our object
const pirateShip = {
    name: 'Boaty McBoat',
    flags: 2
};

// Now we can add our personal metadata to it without worrying that someone will accidentally erase it
myLibrary.addTimestamp(pirateShip);

// Notice that the `flags` property is still `2` on the `pirateShip` object
console.log(pirateShip.flags); // 2

// We can even reassign to it without erasing our metadata
pirateShip.flags = 1;
console.log(pirateShip.flags); // 1

// Let's schedule a check to see if our `pirateShip` timestamp is more than two seconds old
setTimeout(() => {
    console.log('Is our pirateShip timestamp more than two seconds old? ' + myLibrary.isTimestampTwoSecondsOld(pirateShip)); // true
}, 2500);
```

As we could see, using `symbols` to store metadata on objects is a great idea, especially for "third-party" objects, because it avoids undesirable assignments which would otherwise overwrite the information we need. However, it's important to reinforce that **using symbols as keys for properties still doesn't make them invisible, thus you still shouldn't store sensitive information this way**.

Symbols are also useful because of the so called "Well Known" symbols we will see in the next section, which allow us to reimplement how some of JavaScript's native operations work.


<br>

## Well Known Symbols

The so called **"Well Known Symbols" are symbols used to "guide" some native operations**, such as `instanceof` or the new `for of` loop. By reassiging to properties whose the keys are one of these well known symbols we are able to manipulate how some operations work.

**These symbols can be accessed through static properties on the `Symbol` object**.

This may sound a bit abstract at first, but take a look at how each of the "well known symbols" explained below work and I guarantee you will fully understand this concept.

I also need to highlight that these symbols are only taken into account by ES6 compliant engines. This means that some older browsers may not be able to run your code as you expect.

<br>

#### Symbol.hasInstance - `instanceof`

This symbol is used to hold the function which will be used by the `instanceof` operator. When using `x instanceof y`, for example, the `y[Symbol.hasInstance]` function will be called with `x` as argument.

So let's say we have a constructor function called `Pirate` and we want every other object with a property `isPirate` which has value `true` to be recognized as an instance of `Pirate` by the `instanceof` operator, this is what we would do:

```js
function Pirate(name) {
    this.name = name;
}

const jackSparrow = {
    isPirate: true
};

// Notice how `jackSparrow` is not yet considered an instance of the `Pirate` object
console.log(jackSparrow instanceof Pirate); // false

// Now let's assign another function for `Pirate[Symbol.hasInstance]`
// WARNING: Using `Pirate[Symbol.hasInstance] = aFunction` won't work!
Object.defineProperty(Pirate, Symbol.hasInstance, {
    value: (anObj) => anObj.isPirate
});

// This will cause Pirate[Symbol.hasInstance] to be called with `jackSparrow`
console.log(jackSparrow instanceof Pirate); // true
```

It's also important to notice that since the `Symbol.hasInstance` property is non-writable by default **it's not possible to assign a value to the `Symbol.hasInstance` property using the assignment (`=`) operator**, unless you have made it `writable` before the assignment.

And if you want to read more about `writable` properties and property descriptors in general I (again) highly recommend you to read [the first post of this series](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html).

<br>

#### Symbol.isConcatSpreadable - `Array.prototype.concat`

This symbol is used by the [`Array.prototype.concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) to decide whether or not it should flatten the array elements.

If the property for which this symbol is used as key is `true`, then the array passed as argument to the `Array.prototype.concat` will have its elements added to the newly created array one by one. On the other hand, if it's false, the whole array will be added to the result of `Array.prototype.concat`. The same happens for Array-like objects, except that by default they won't be flatenned, so we need to set this property to `true` if we want this to happen.

It's kind of hard to explain this using natural language, so let's get to an example:

```js
const numbers = [1, 2, 3];
const letters = ['a', 'b', 'c'];

// By default arrays get flattened when using `Array.prototype.concat`, as you can see below
console.log(numbers.concat(letters)); // [1, 2, 3, 'a', 'b', 'c'];

// However, if we set the `Symbol.isConcatSpreadable` property to `false`, the entire array will be added as is to the newly created array
letters[Symbol.isConcatSpreadable] = false;

// Notice how the entire `letters` array gets added to the result
console.log(numbers.concat(letters)); // [1, 2, 3, ['a', 'b', 'c']]

// For array-like objects (fake arrays) we need to set it to true in order to be able to get a flattened result
const fakeArray = {
    0: 'first',
    1: 'second',
    2: 'third',
    length: 3
};

// Notice how `fakeArray` didn't get flattened
console.log(numbers.concat(fakeArray)); // [1, 2, 3, { '0': 'first', '1': 'second', '2': 'third' }]

// Now let's set our `fakeArray`'s `Symbol.isConcatSpreadable` property to true
fakeArray[Symbol.isConcatSpreadable] = true;
console.log(numbers.concat(fakeArray)); // [1, 2, 3, 'first', 'second', 'third' }]
```

<br>

#### Symbol.iterator - `for..of`

This might be one of the most famous symbols we've got in ES6. It allows us to iterate through objects using the `for of` syntax.

We've also got some default iteration behavior implemented in [`Maps`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator), [`Sets`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator), [`Arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator), [`Strings`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator) and [`TypedArrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator).

Since this depends on some previous knowledge about [generator functions](http://thejsguy.com/2016/10/15/a-practical-introduction-to-es6-generator-functions.html?utm_source=nodeweekly&utm_medium=email) and the default [iteration protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), I'll just leave you [this awesome article on MDN which explains everything you need to know about creating an iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

**Stay tuned because I might write another blog post just to explain how ES6 iterators work! They deserve a whole post for them to make sure we will be able to cover all the important details we've got to.**

<br>

#### Symbol.match - `String.prototype.match`

This symbol allows you to create your own "version" of Regular Expressions since it allows you to redefine what should be the default behavior for `String.prototype.match`.

Whenever you want to implement your own "matcher" you can just set the `Symbol.match` property to a function which receives a String and then returns an array with the the matches found by your new implementation.

Let's say we want to create our own version of a matcher, which checks if a string repeats a given character sequence three times in a row and returns the first match.

```js
// Here we are creating an instance of our matcher which stores a sequence of characters
function RepeatsThreeTimes(charSeq) {
    this.charSeq = charSeq;
}

// Now we will implment another function which will be called whenever `match` is called and there is an instance of our matcher as the first argument
RepeatsThreeTimes.prototype[Symbol.match] = function(str) {
    // Here we are repeating the character sequence stored in our matcher three times
    const charSeqRepeated = this.charSeq.repeat(3);
    
    // Now we will see if the target string contains that character sequence
    return str.indexOf(charSeqRepeated) !== -1 ? [charSeqRepeated] : null;
};

const myWord = 'blablabla';

console.log(myWord.match(new RepeatsThreeTimes('bla'))); // true
```

Please notice that I defined the `Symbol.match` property on the constructor's prototype. I had to do this because I needed every instance of `RepeatsThreeTimes` to have this same method available (by inheritance in this case) in order for it to be called when `match` is invoked.

<br>

#### Symbol.replace - `String.prototype.replace`

The `Symbol.replace` property is used whenever `String.prototype.replace` is called. It receives a target `String` and the content that should be used whenever a match is found according to the first argument passed to `replace` method.

Let's say you want to create your own replacer which replaces every occurrence of a given letter by a random number from 0 to 9, this is what you would do:

```js
// First let's create a constructor for our new replacer which stores the letter we will replace in a String
function RandomNumberReplacer(letter) {
    this.letter = letter;
}

// This function generates random numbers from 0 to 9
function randomUntilNine() {
    return Math.floor(Math.random() * 10);
}

// Now we will create a function which will be called whenever `replace` is called with an instance of `RandomNumberReplacer`
RandomNumberReplacer.prototype[Symbol.replace] = function (str, desiredContent) {
    // This function generates a random number and them uses it to replace every occurrence of the letter property of our replacer
    const result = str.replace(new RegExp(this.letter, 'ig'), randomUntilNine());
    return result;
};

// Let's call `replace` passing our RandomNumberReplacer and see what happens:
const replacedStr = ('Tomorrow').replace(new RandomNumberReplacer('o'));
console.log(replacedStr); // Something like: 'T6m6rr6w'
```

In this case we also need to assign `RandomNumberReplacer.prototype[Symbol.replace]` instead of `RandomNumberReplacer[Symbol.replace]` because we need it to be available on every instance of `RandomNumberReplacer` in order for `String.prototype.replace` to call it.

<br>

#### Symbol.search - `String.prototype.search`

This symbol allows you to implement a function which will be called by `String.prototype.search`.

Just as it happens with `Symbol.replace` and `Symbol.match` you just need to make it available on the object you're going to pass to `String.prototype.search` and it will get called automatically. In our case we will implement this method on our constructor's prototype to solve this.

The `String.prototype.search` method originally searches for a given `String` in another `String` and returns the index of the first occurrence, similar to what happens with `String.prototype.indexOf`. In our example we will create a "searcher" which searches for any of the strings passed to it through an array.

```js
// Before anything else we will create a constructor function for our searcher
function SearchForAny(wordArray) {
    this.wordArray = wordArray;
}

// The function we will assign to the `Symbol.search` property returns the index of the first word in `wordArray` it finds
SearchForAny.prototype[Symbol.search] = function(str) {
    let foundIndex = -1;
    this.wordArray.some((word) => {
        const wordIndex = str.indexOf(word);
        if (wordIndex !== -1) {
            foundIndex = wordIndex;
            return true;
        } else {
            return false;
        }
    });

    return foundIndex;
};

// Now we can use this to search for the names of any of our friends in a String
const names = ['Mark', 'Frank', 'Jack'];
console.log('Is Jack traveling to Europe?'.search(new SearchForAny(names))); // 3
```

<br>

#### Symbol.species

The `Symbol.species` symbol can be used on many different tasks, but by definition, according to [the ECMAScript 2015 specification](http://www.ecma-international.org/ecma-262/6.0/#table-1), this property should point to a constructor function which is used to create derived objects. **This symbol is used by built-in functions to determine the proper type of objects which derive from other objects.**

I think the easiest way to explain this symbol is by using [`Array.prototype.map`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map) as an example. Keep in mind that `map` is a pure function, which means it has no side affects (does not modify any existing objects), so it always returns a new object.

In our example we will use the `map` function to multiply each value in our `CustomArray` object by three and then check its type before and after implementing `CustomArray.prototype[Symbol.species]`.

I'm not a big fan of ES6 classes, but I see no other way of explaining this simply without using classes. So please, pardon me for that.

Our first example aims to show what will happen if you don't define `Symbol.species` on your subclass:

```js
// Our customArray extends the Array object
class CustomArray extends Array {
}

// Now let's call `map` and see what kind of instance it gives us back:
const mappedArr = new CustomArray(1, 2, 3).map((val) => val * 2);

// Notice how our `mappedArr` object is still an instance of CustomArray
console.log(mappedArr instanceof CustomArray); // true
console.log(mappedArr instanceof Array); // true
```

Let's say we don't want our mapped arrays to be instances of CustomArrays too, maybe we just want to make them simple Arrays after calling `map`. This is what we would do:

```js
class CustomArray extends Array {
    // Whenever asked for its species, our CustomArray will indicate the global Array constructor
    static get [Symbol.species]() {
        return Array;
    }
}

// Now map should give us an instance of Array and not an instance of CustomArray
const mappedArr = new CustomArray(1, 2, 3).map((val) => val * 2);

console.log(mappedArr instanceof CustomArray); // false
console.log(mappedArr instanceof Array); // true
```

<br>

#### Symbol.split - `String.prototype.split`

The `Symbol.split` symbols is another `String` related symbol. It holds a function which is called whenever invoking `String.prototype.split` and it takes a target `String` as argument,

For this example let's try to create a situation you may find in the real world. Imagine you've got an Array with punctuation symbols and you want to split a String whenever you find one of them, this is what you would do:

```js
// Our `PunctuationSplitter` will store an array of punctuation symbols
function PunctuationSplitter(punctuationSymbols) {
    this.punctuationSymbols = punctuationSymbols;
}

// Now let's implement the function which should be called when invoking `split` passing a `PunctuationSplitter` as argument
PunctuationSplitter.prototype[Symbol.split] = function(str) {
    // This function splits our string whenever it finds a punctuation symbol
    return this.punctuationSymbols.reduce((previous, punctuationSymbol) => {
        // Then, in every iteration, it goes through every part and splits it again if it finds another punctuation symbol
        const splittedPhrases = previous.map((part) => part.split(punctuationSymbol));

        // Since each split generates an array, we will flatten our splittedPhrases before returning them
        return Array.prototype.concat.apply([], splittedPhrases);
    }, [str]);
};

const punctuationSymbols = [',', '.', '!'];
const phrase = 'one,two.three!four';

console.log(phrase.split(new PunctuationSplitter(punctuationSymbols))); // ['one','two', 'three', 'four']
```

Again we needed to implement this into the `prototype` of our `PunctuationSplitter` splitter because we needed this method to be available on every instance of it.

<br>

#### Symbol.toPrimitive

In my opinion, this is one of the most interesting Symbols we've got. It allows you to determine how an object is going to be converted to a primitive value depending on the provided hint.

As an example for this we will create instances of `Hackers` which get converted to their respective names whenever the preferred primitive is a `String` or 1337 whenever the preferred primitive value is `Number`. If none of them is the preferred value we just return `'haxxor'`.

```js
// This is the constructor for our `Hacker` instances
function Hacker(name) {
    this.name = name;
}

// Here we set this property on our Hacker.prototype object because we want it to be available on all instances
Hacker.prototype[Symbol.toPrimitive] = function(hint) {
    console.log(hint);
    if (hint === 'string') {
        return this.name;
    }

    if (hint === 'number') {
        return 1337;
    }

    return 'haxxor';
};

// Now we will create a `dangrousHacker`
const dangerousHacker = new Hacker('Super Haxxor Leet McHacker');

// Let's see what happens we force `dangerousHacker` to become a primitive

// Number
console.log(Number(dangerousHacker)); // 1337
console.log(+dangerousHacker); // 1337

// String
console.log('You have been hacked by ' + String(dangerousHacker)); // 'You have been hacked by Super Haxxor Leet McHacker'

// Default
console.log('I am a ' + dangerousHacker); // 'haxxor'
```


<br>

#### Symbol.toStringTag - `Object.prototype.toString`

Whenever you use `toString` on an Object you might see something like this: `[object Object]`, `[object Array]`, `[object String]` and many others. This symbol allows you to to define which word will be used in that tag.

This may not seem useful at first, but when it comes to developing meta programming related libraries or things that depend on type checking such as [`type-detect`](https://www.npmjs.com/package/type-detect) it might come in handy.

Let's say you've got a constructor for `Pirates` and you want every instance of `Pirate` to be logged to the console as `[object Pirate]` instead of `[object Object]`, this is what you would do:

```js
function Pirate(name) {
    this.name = name;
}

// Now we will implement the function for our Symbol.toStringTag
// We do this into the Pirate.prototype to make sure it will be available to all instances
Object.defineProperty(Pirate.prototype, Symbol.toStringTag, {
    // Make sure you assign your function to the property descriptor's `get` property instead of `value`
    get: () => 'Pirate'
});

console.log(new Pirate('Jack Sparrow').toString()); // '[object Pirate]'
```

<br>

#### Symbol.unscopables - `with`

This symbol is related to [the `with` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with), which is kind of odd and is even disabled in strict mode. It basically makes a whole object available within the scope of the if statement.

Using `with` you could do something like:

```js
const myObject = {
    one: 1,
    two: 2,
    three: 3
};

// To access myObject's properties we need to use dot notation:
console.log(myObject.one); // 1
console.log(myObject.two); // 2

// However if we use `with` we can make those properties available on the scope inside the `with` block:
with (myObject) {
    console.log(one); // 1
    console.log(two); // 2
    console.log(three); // 3
}
```

The `Symbol.unscopables` symbol lets us determine which properties will be available or not inside our `with` block:

```js
const myObject = {
    one: 1,
    two: 2,
    three: 3
};

myObject[Symbol.unscopables] = {
    one: false,
    two: false,
    three: true
};

// Now `myObject.three` will not be directly available inside the scope of our `with` block
with (myObject) {
    console.log(one); // 1
    console.log(two); // 2
    console.log(three); // ReferenceError: three is not defined
}
```

<br>

## We're done for now!

First of all, thank you for reading this series until here and for your support! This post is quite long and I think we covered everything we needed about Meta Programming in JavaScript. I hope you enjoyed it!

**This material is also going to be presented at [FrontIn POA 2016](http://frontinpoa.com.br) at Dec. 10th! Let me know if you're going to be there to watch my talk!**

This post is pretty long, but it is filled with lots of examples and details, I tried to make it shorter, but I really couldn't due to everything we had to talk about.

I also highly recommend you to read [this blog post](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/), written by my great friend [@keithamus](https://twitter.com/keithamus), if you want some extra material about `Symbols`. His post is very detailed and it's also filled with some more ideas and awesome examples .

**If you have any doubts or thoughts, please share them with me on the comments below or reach me at [@thewizardlucas on twitter](https://twitter.com/thewizardlucas)!**

