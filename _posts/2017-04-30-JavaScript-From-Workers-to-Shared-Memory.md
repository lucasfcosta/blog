---
layout: post
title : "JavaScript: From Workers to Shared Memory"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : javascript parallelism concurrency code workers shared memory
---

<br>

Hi, everyone!

The new [Shared Memory](https://github.com/tc39/ecmascript_sharedmem) proposal has reached stage 4 recently and I got really excited about it after reading a few blog posts on this subject, [such as Dr. Axel's excellent post on his blog, 2ality](http://www.2ality.com/2017/01/shared-array-buffer.html). In this blog post, I'll try to cover only the final spec for `Shared Memory` and get into practical questions about how to use this feature. If you're into details and great blog posts, make sure you read Dr. Axel's.

If you are not yet familiar with the concepts of **parallelism and concurrency** make sure you watch [this awesome talk by Rob Pike](https://vimeo.com/49718712). In it he explains what do both concepts mean, how they relate and uses great didactic examples to help you better understand it. I highly recommend it for anyone interested either in Go or in concurrency and parallelism in general.

Before we dive deep into how shared memory works, we must understand why it's important, so let's talk about problems first and let's see how we came to where we are now.

<br>

## **The Problem With Concurrency in JavaScript**

As you may know, JavaScript is a single-threaded environment and therefore every single line of code we normally write is blocking. Due to this fact, we had to come up with some techniques to deal with concurrency in a better way.

Before we even had Web Workers, the way JavaScript runtime environments dealt with concurrency was by delegating I/O tasks to new threads and let them run in parallel. After these tasks have been completed they would be "returned" to the main thread. The mechanism which allows us to do this is called [the Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop).

In order to explain how the event loop works (and how JavaScript itself works) I've put together this small explanation:

![The Event Loop](/assets/eventloop.png)

The image above demonstrates what happens when you run your JavaScript code and how the Event Loop concurrency model works.

First, your script starts running, so `main()` gets pushed into the stack. Any other subsequent function calls will be pushed to the top of the stack when they're called and poped out of it when they end running.

Whenever you have a function which runs asynchronously, as it happens with `setTimeout`, for example, it will be pushed to an "external environment" and your code will continue running. Whenever that environment detects `setTimeout` timer has finished, the callback associated with it will be pushed to the event queue. Finally, when the call stack is empty, the next message in the queue gets processed and when the stack gets empty again we get the next one and so on.
Basically, in JavaScript, **everything runs concurrently, except your code**.

The problem with the event loop is that if we keep pushing multiple messages to the queue and the call stack takes too long to finish running we will end up delaying processing all these messages and making our code run slowly. If we're on browsers we can end up delaying renders and making the whole page seem slow.

This also means that any processing intensive tasks will end up blocking your whole code execution because (until a while ago) we had no way of running them in a separate thread.

If you want to know more about how the Event Loop works I highly recommend [this talk by Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ).


## **The Problem With Web Workers**

In order to solve the problem with concurrency in JavaScript Web Workers were introduced.

Web Workers allow you to spawn separate threads and run scripts on them. By using Web Workers we can now solve the problem we have talked about in the previous section by spawning a new worker to deal with processing-intensive tasks while we still let our browser free to handle UI stuff, such as rendering and handling other kinds of interactions.

In order to achieve parallelism, **web workers communicate through message passing**. After creating a worker we can simply call the `postMessage` method in it and pass our data. In order for the worker to handle these messages, it must implement handler functions that deal with the `message` event.

Passing data to a worker requires us to serialize and clone it by using the **[structured cloning algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)** or by using **[transferable objects](https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast)**. However, even though these approaches seem simple they have downsides.

**When using the structured cloning algorithm we must walk over all the properties of an object and duplicate the values of those properties**, unless they're objects themselves. If we find an object, we recursively walk through each one of its fields until every one of them is duplicated into the new object. As you might have noticed, this seems to be a lot of work (and it is). Therefore the overhead of passing big chunks of data to a worker using this method might be hundreds of milliseconds.

Also, it does not support cloning `functions`, DOM nodes and `Error` objects and it also won't walk through the prototype chain and duplicate it too. There other minor restrictions about this implementation such as not duplicating [property descriptors](/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html) and not preserving the `lastIndexOf` field of RegExp objects, for example.

**When it comes to `transferable objects` we can think of it as passing objects by reference as in C or C++**, but in the case of using `transferable objects` we end up erasing the original reference and so it is no longer available in the original context.


<br>

## **The Basics of Shared Memory**

Since this is a brand new feature, many browsers do not support it yet. I'm using Firefox and in order to test it I had to go to `about:config` set `javascript.options.shared_memory` to true. If you want to follow along with these examples I recommend you to do the same. If you want to try this and other brand new Firefox features you can also [download Firefox Nightly](https://ftp.mozilla.org/pub/firefox/nightly/latest-mozilla-central-l10n/).

In order to easily run our `main.js` and `worker.js` files in the browser we'll need to create an `index.html` file which "imports" `main.js`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shared Memory Wait Example</title>
    <script src="main.js"></script>
</head>
<body>
    <h1>Please open your console.</h1>
</body>
</html>
```

Now let's get to what really matters here, which is sharing memory between two threads. In order to do that we will need to use a new data structure available globally which is called [`SharedArrayBuffer`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer). This shared buffer is the memory itself and a typed array on top of that memory area works like a view. This concept is really similar to [Go's slices](https://blog.golang.org/go-slices-usage-and-internals).


This image demonstrates an example of how a `TypedArray` works on top of a `SharedArrayBuffer`:

![A Typed Array is a view on top of a shared memory area](/assets/shared-memory-typed-array.png)

In the example below, we create an array with even numbers and share it with our worker. After five seconds we do a change in that shared array and after ten seconds we print that array in our worker to make sure it changed.

This is the code we're going to write in `main.js`:

```js
const worker = new Worker('worker.js')
const length = 10;

// Creating a shared buffer
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * length)

// Creating a data structure on top of that shared memory area
const sharedArray = new Int32Array(sharedBuffer)

// Let's build an array with 10 even numbers
for (let i = 0; i < length; i++) sharedArray[i] = i && sharedArray[i - 1] + 2

// Send memory area to our worker
worker.postMessage(sharedBuffer)

setTimeout(function() {
    console.log('[MASTER] Change triggered.')
    sharedArray[0] = 1337
}, 5000)
```

As the comments in the code above show, we:
1. Create a `Worker`
2. Create a shared memory area by using `SharedArrayBuffer`
3. Create a view (`TypedArray`) on top of that shared memory
4. Add 10 even numbers to our shared array
5. Send the shared memory (**not the Shared Array**) to our worker
6. Schedule a write in the `0` position of our shared memory area (represented through a `TypedArray`) after 5 seconds

And this is `worker.js`:

```js
self.addEventListener('message', (m) => {
    // Create an Int32Array on top of that shared memory area
    const sharedArray = new Int32Array(m.data)

    console.log('[WORKER] Received SharedArrayBuffer. First value is: ' + sharedArray[0])

    setTimeout(() => console.log('[WORKER] First value is now: ' + sharedArray[0]), 10000)
});
```

When our worker receives that shared memory we:
1. When the worker receives that memory it creates a view (`TypedArray`) on top of that
2. Now our worker has access to that shared memory through the `TypedArray` we created so we schedule it to read the first position of that `TypedArray` after 10 seconds (because by that time our main thread will already have changed what's in that index)

This is our program's output:

```
[WORKER] Received SharedArrayBuffer. First value is: 0
[MASTER] Change triggered.
[WORKER] First value is now: 1337
```

It's important to notice that, in your worker, you cannot access data directly from the `SharedArrayBuffer` you have sent to it. You need to create a view (`TypedArray`) in order to do that.

If we send our shared array to our `worker`, like this:

```
const worker = new Worker('worker.js')
const length = 10;

// Creating a shared buffer
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * length)

// Creating a data structure on top of that shared memory area
const sharedArray = new Int32Array(sharedBuffer)

// Let's build an array with 10 even numbers
for (let i = 0; i < length; i++) sharedArray[i] = i && sharedArray[i - 1] + 2

// Send memory area to our worker
worker.postMessage(sharedBuffer)
```

And then we try to read it by doing `message.data`, we will get back `undefined`.

<br>

## **Atomic Operations**

Let's say we don't want to wait a fixed amount of seconds to see a change in our shared array. We'd like to print it as soon as we can.

You may think that we can use a `while` loop, like this:

```js
self.addEventListener('message', (m) => {
    const sharedArray = new Int32Array(m.data)

    console.log('[WORKER] Received SharedArrayBuffer. First value is: ' + sharedArray[0])

    while (sharedArray[0] === 0);

    console.log('[WORKER] Changed! New value is ' + sharedArray[0])
});
```

But actually, we can't.

If you run the code above in our browser you'll see that your `while` loop will run forever. This happens because of compiler related optimizations:

When accessing the value inside `sharedArray[0]` inside a loop in a single-threaded environment, it will never change this your engine might end-up storing that value in another variable, like [Dr. Axel has already explained in his blog post](http://2ality.com/2017/01/shared-array-buffer.html):

```js
const tmp = sharedArray[0];
while (tmp === 123);
```

And this is only one of the problems `Atomics` helps us solve. **By calling a method present in `Atomics` instead of doing a "raw" read we can avoid this kind of unwanted optimization**.

**The other reason why we need `Atomics` is to deal with race conditions**. Race conditions happen when two threads are manipulating the same piece of memory and they end up interleaving operations in an unwanted way.

Let's say you want to go to one of [Criolo's](https://open.spotify.com/album/1K5ax50txEb3shFEWBdSKs) amazing concerts. You've seen the number of tickets available on their website at 9 AM and there were still 200 tickets left, so you've decided to buy them after lunch.

At 1 PM you get back from your lunch and you enter their website but there are no tickets available! This is the moment you realize you have lost an awesome concert but at least you know how race conditions work in real life.

The problem is that an external factor has modified that same data (the number of tickets available) between the time you have checked its value and the time you were ready to act on that data (actually buy the tickets).

You can also imagine what would happen if two people started the process of buying a ticket when there was only one ticket available. If they both were able to finish their acquisition, who gets the ticket? RACE CONDITION SPOTTED!

In order to avoid that kind of situation, we need a locking mechanism. **A locking mechanism determines whether or not an agent can have access to that memory at that time**. By forcing agents to acquire locks before dealing with an area of shared memory we can coordinate their operations and avoid situations such as multiple threads operating on data that is out of date.

**We call the part of our program in which we must deal with this kind of access to a shared resource a [critical section](https://en.wikipedia.org/wiki/Critical_section).**

<br>

## **Using Atomic's Methods**

Considering our previous example, let's rewrite it using `Atomics.load` instead of accessing the value in an Array's index directly, this guarantees we won't suffer from unwanted optimizations:

```js
self.addEventListener('message', (m) => {
    const sharedArray = new Int32Array(m.data)

    console.log('[WORKER] Received SharedArrayBuffer. First value is: ' + sharedArray[0])

    while (Atomics.load(sharedArray, 0) === 0);

    console.log('[WORKER] Changed! New value is ' + sharedArray[0])
});
```

Now, when running this you will notice that our worker won't be stuck in the `while` loop anymore because of the `Atomics.load` call, which takes a `TypedArray` as its first argument and an index as the second one.

Also, instead of using the assignment operator to write to that memory we could have used `Atomics.store`,  which takes a `TypedArray` as its first argument, an index as the second and a value as the third one:

```js
const worker = new Worker('worker.js')
const length = 10;

// Creating a shared buffer
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * length)

// Creating a data structure on top of that shared memory area
const sharedArray = new Int32Array(sharedBuffer)

// Let's build an array with 10 even numbers
for (let i = 0; i < length; i++) Atomics.store(sharedArray, i, i && sharedArray[i - 1] + 2)

// Send memory area to our worker
worker.postMessage(sharedBuffer)

setTimeout(function() {
    console.log('[MASTER] Change triggered.')
    Atomics.store(sharedArray, 0, 1337)
}, 5000)
```

Now it's about time we optimize our code and remove that `while` loop used to watch for a change at the `TypedArray` we're using. By using a while loop to wait for a change we end up consuming CPU resources unnecessarily because we keep that thread running the code inside that loop infinitely.

Fortunately, `Atomics` gives us excellent tools to solve that problem: the `wait` and `wake` methods.

**The `wait` method puts the [agent](https://tc39.github.io/ecma262/#agent) that called it to sleep in a wait queue until someone wakes it up or until the defined `timeout` expires (if it exists, otherwise it waits infinitely)**. One important detail about the `wait` method is that it not only takes a timeout (optionally) and a `TypedArray` but it also takes an index and a value so that it will only wake up if the passed index has a different value than the one you have specified.

**In order to wake up an agent that is in the wait queue you need to call the `wake` method** and pass an index which is the index other agents are waiting on and a number of agents you want to wake.

In the previous example, we could swap the `while` loop for a `wait` call and then wake up that worker when our master changes that value.

```js
// worker.js
self.addEventListener('message', (m) => {
    const sharedArray = new Int32Array(m.data)

    console.log('[WORKER] Received SharedArrayBuffer. First value is: ' + sharedArray[0])

    // Instead of a `while` loop we will use Atomics.wait
    // This tells our worker to wait for a change in the value of the 0 index
    // This worker can also wake up after the timeout (10000ms) expires
    Atomics.wait(sharedArray, 0, 0, 10000)

    console.log('[WORKER] Changed! New value is ' + sharedArray[0])
});
```

Please be careful when calling `wait` and make sure the index and value you pass to it will be both correct because if the value indexed by `index` in the passed `TypedArray` is different from what you told it would be your worker thread won't wait, it will just go straight ahead.

Now, in our master, we must call the `wake` method after changing the value in that index so that we can notify the workers they can continue.

```js
// master.js
const worker = new Worker('worker.js')
const length = 10;

// Creating a shared buffer
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * length)

// Creating a data structure on top of that shared memory area
const sharedArray = new Int32Array(sharedBuffer)

// Let's build an array with 10 even numbers
for (let i = 0; i < length; i++) Atomics.store(sharedArray, i, i && sharedArray[i - 1] + 2)

// Send memory area to our worker
worker.postMessage(sharedBuffer)

setTimeout(function() {
    console.log('[MASTER] Change triggered.')
    Atomics.store(sharedArray, 0, 1337)

    // This call wakes up the first agent in the queue (FIFO) that is 
    // waiting on the value at index 0 of `sharedArray`
    Atomics.wake(sharedArray, 0, 1)
}, 5000)
```

If we had multiple workers waiting on that same index we would need to increase the number of workers we wanted to wake too in our call to `Atomics.wake`, thus you gotta be careful with this in order to wake the right amount of agents at the right time.

Another important thing to notice is that **the shared memory spec allows browsers to deny waiting in the main thread**. This is done that way because if the main thread needed to wait for a long time the browser could become irresponsive because that thread would be completely prohibited from doing any operations to the DOM or handling any events. Even though that waiting period could be brief it is still a risk to trust that.

According to [Lars T. Hansen](https://github.com/lars-t-hansen), the brilliant author of the `SharedMem` proposal, most browsers will implement this same behavior and one of the best ways to work around this is to spawn another worker which coordinates other workers (Lars calls this a "`master worker`"). This worker can wait indefinitely without making the browser become irresponsive.

I did these tests in `Firefox Nightly 55.0a1` and this is the error I got when calling `wait` in the main thread:

```
TypeError: waiting is not allowed on this thread
```

The `Atomics` object also has other methods which I have described below. If you want to read about their algorithms and internal implementations in detail I highly recommend you to read [the ECMA spec for them](https://tc39.github.io/ecma262/#sec-atomics-object).


#### `Atomics.add(typedArray, index, value)`

Adds the passed `value` to `typedArray[index]`.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 1)
Atomics.add(sharedArray, 0, 2)

console.log(Atomics.load(sharedArray, 0)) // 3
```


#### `Atomics.sub(typedArray, index, value)`

Subtracts the passed `value` from `typedArray[index]`.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 3)
Atomics.sub(sharedArray, 0, 1)

console.log(Atomics.load(sharedArray, 0)) // 2
```


#### `Atomics.and(typedArray, index, value)`

Does a bitwise AND and returns the old value of `typedArray[index]`.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 1)

const returnedValue = Atomics.and(sharedArray, 0, 0)
const newValue = Atomics.load(sharedArray, 0)

console.log(returnedValue) // 1
console.log(newValue) // 0
```


#### `Atomics.or(typedArray, index, value)`

Does a bitwise OR and returns the old value of `typedArray[index]`.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 0)

const returnedValue = Atomics.or(sharedArray, 0, 1)
const newValue = Atomics.load(sharedArray, 0)

console.log(returnedValue) // 0
console.log(newValue) // 1
```


#### `Atomics.compareExchange(typedArray, index, expectedValue, replacementValue)`

Compares the value at `typedArray[index]` with `expectedValue` and if they're equal, replace `typedArray[index]` for `replacementValue`.

This always returns the initial value of `typedArray[index]`, even if no exchange has been done.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 1337)

const returnedValue = Atomics.compareExchange(sharedArray, 0, 1337, 666)
const newValue = Atomics.load(sharedArray, 0)

console.log(returnedValue) // 1337
console.log(newValue) // 666
```


#### `Atomics.exchange(typedArray, index, replacementValue)`

Exchanges the value at `typedArray[index]` with `replacementValue` and returns the initial value for `typedArray[index]`.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 1)

const returnedValue = Atomics.exchange(sharedArray, 0, 1337)
const newValue = Atomics.load(sharedArray, 0)

console.log(returnedValue) // 1
console.log(newValue) // 1337
```


#### `Atomics.isLockFree(size)`

This method is kind of odd, but it is worth explaining.

`Atomics.isLockFree` returns a boolean indicating whether or not the given `size` (amount of bytes) can be manipulated without locking. If they cannot be manipulated without needing a lock then it is often more efficient for the user's algorithm to provide its own locking mechanism.

If you remember our previous concert tickets theoric example, you can imagine that `isLockFree` indicates whether or not you can buy a ticket atomically, which means only you will be dealing with that data (the number of available tickets) at that time.

If we called `isLockFree` in that case and discovered that we could buy tickets atomically, it would mean only we would be interacting with the number of available tickets at that time and therefore we would not need to acquire a lock before starting that operation. However, if `isLockFree` returned `false` we would need to provide an external locking mechanism wich allows a single agent to deal with it at a time.

Since these operations are supported on all known relevant hardware, `Atomics.isLockFree` will always return `true`.


#### `Atomics.xor(typedArray, index, value)`

Does a bitwise [XOR](https://en.wikipedia.org/wiki/Exclusive_or) (exclusive or) and returns the initial value of `typedArray[index]`.

An exclusive or (XOR) is an operation that returns true only when both inputs differ.

```js
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
const sharedArray = new Int32Array(sharedBuffer)

Atomics.store(sharedArray, 0, 0)

const returnedValue = Atomics.xor(sharedArray, 0, 1)
const newValue = Atomics.load(sharedArray, 0)

console.log(returnedValue) // 0
console.log(newValue) // 1
```

<br>

Since we cannot share types of data other than Arrays of integers with up to 32 bits, we must find ways to encode other data as integers. [In his blog post about shared memory, Dr. Axel has come up with a few excellent suggestions](http://2ality.com/2017/01/shared-array-buffer.html#sharing-data-other-than-integers), so you might want to take a look at it.


## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@thewizardlucas on twitter](https://twitter.com/thewizardlucas)**. I'd love to hear what you have to say.

If you're interested into Shared Memory and would like to read about it in more detail I highly recommend you to see the [ECMAScript Shared Memory proposal](https://github.com/tc39/ecmascript_sharedmem) and the other links I've mentioned above.

And in case you want to see more interesting stuff implemented using `Shared Memory`, you can also check [Lars' own examples](https://github.com/lars-t-hansen/parlib-simple).
