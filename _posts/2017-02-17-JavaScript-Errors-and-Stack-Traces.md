---
layout: post
title : "JavaScript Errors and Stack Traces in Depth"
author: Lucas Fernandes da Costa
tags : javascript errors stack traces
---

<br>

Hi, everyone! After a few weeks without writing about JavaScript, it's about time we talk about it again!

This time we're going to talk about errors and stack traces and how to manipulate them.

Sometimes people don't pay attention to these details but this knowledge will certainly be useful if you're writing any library related to testing or errors, of course. This week in Chai, for example, we had [this great Pull Request which greatly improved the way we handle stack traces](https://github.com/chaijs/chai/pull/922) in order for our users to have more information when their assertions fail.

Manipulating stack traces lets you clean up unuseful data and focus on what matters. Also, when understanding what exactly are Errors and their properties you will feel much more confident taking advantage of it.

**This blog post may seem too obvious in its beginning but when we get to start manipulating stack traces it gets pretty complicated, so make sure you have a good understanding of the previous content before moving to that section**.

<br>

## **How The Call Stack Works**

Before talking about errors we must understand how the call stack works. It's really simple, but it is essential to know this before going any further. If you already know this, feel free to skip this section.

**Whenever there's a function call it gets pushed to the top of the stack. After it finishes running it is removed from the top of the stack.**

The interesting thing about this data structure is that the **last item to come in will be the first one to come out**. This is known as the LIFO (last in, first out) property.

This means that when calling a function `y` from inside a function `x`, for example, we will have a stack with `x` and `y`, in this order.

Let me give you another example, let's say you've got this code:

```js
function c() {
    console.log('c');
}

function b() {
    console.log('b');
    c();
}

function a() {
    console.log('a');
    b();
}

a();
```

In the example above, when running `a` it will get added to the top of our stack. Then, when `b` gets called from inside of `a`, it gets pushed to the top of the stack. The same happens to `c` when it is called from `b`.

When running `c` our stack trace will contain `a`, `b` and `c`, in this order.

As soon as `c` finishes running it gets removed from the top of the stack and then the control flow gets back to `b`. When `b` finishes it gets removed from the stack too and now we get the control back to `a`. Finally, when `a` finishes running it also gets removed from the stack.

In order to better demonstrate this behavior, we will use `console.trace()`, which prints the current stack trace to the console. Also, you should usually read stack traces from top to bottom. Think of each line as what has been called from inside the line below it.

```js
function c() {
    console.log('c');
    console.trace();
}

function b() {
    console.log('b');
    c();
}

function a() {
    console.log('a');
    b();
}

a();
```

When running this in the Node REPL server this is what we get back:

```js
Trace
    at c (repl:3:9)
    at b (repl:3:1)
    at a (repl:3:1)
    at repl:1:1 // <-- For now feel free to ignore anything below this point, these are Node's internals
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
```

As we can see here we have `a`, `b` and `c` when the stack gets printed from inside `c`.

Now, if we print the stack trace from inside `b` after `c` finishes running we will be able to see it was already removed from the top of the stack, so we will only have `a` and `b`.

```js
function c() {
    console.log('c');
}

function b() {
    console.log('b');
    c();
    console.trace();
}

function a() {
    console.log('a');
    b();
}

a();
```

As you can see, we no longer have `c` in our stack since it has already finished running and has been popped out of it.

```js
Trace
    at b (repl:4:9)
    at a (repl:3:1)
    at repl:1:1  // <-- For now feel free to ignore anything below this point, these are Node's internals
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.onLine (repl.js:513:10)
```

In a nutshell: you call things and they get pushed to the top of the stack. When they finish running they get popped out of it. Simple as that.

<br>

## **The Error Object and Error Handling**

When errors happen, usually an `Error` object is thrown. `Error` objects can also be used as prototypes for users wanting to extend it and create their own errors.

The `Error.prototype` object usually has the following properties:

* `constructor` - The constructor function responsible for this instance's prototype.
* `message` - An error message.
* `name` - The error's name.

These are standard properties and sometimes each environment has its own specific properties. In some environments, such as Node, Firefox, Chrome, Edge, IE 10+, Opera and Safari 6+, we even have the `stack` property, which contains an error's stack trace. **An error's stack trace contains all the stack frames until its own constructor function.**

If you want to read more about specific properties of `Error` objects I highly recommend you to [read this article on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/prototype).

To throw an error you must use the `throw` keyword. In order to `catch` an error thrown, you must wrap the code that may throw an error into a `try` block followed by a `catch` block. Catch also takes an argument which is the error being thrown.

As it happens in Java, JavaScript also allows you to have a `finally` block which runs after your `try/catch` blocks regardless of whether your `try` block threw an error or not. It is good to use `finally` to clean up stuff after you're finished dealing with it, doesn't matter if your operations have worked or not.

Everything until now has been quite obvious for most people so let's get to some non-trivial details.

You can have `try` blocks that are not followed by `catch`, but they must be followed by `finally`. This means that we can use three different forms of `try` statements:

* `try...catch`
* `try...finally`
* `try...catch...finally`

Try statements can be nested inside other `try` statements, such as:

```js
try {
    try {
        throw new Error('Nested error.'); // The error thrown here will be caught by its own `catch` clause
    } catch (nestedErr) {
        console.log('Nested catch'); // This runs
    }
} catch (err) {
    console.log('This will not run.');
}
```

You can also nest `try` statements into `catch` and `finally` blocks:

```js
try {
    throw new Error('First error');
} catch (err) {
    console.log('First catch running');
    try {
        throw new Error('Second error');
    } catch (nestedErr) {
        console.log('Second catch running.');
    }
}
```

```js
try {
    console.log('The try block is running...');
} finally {
    try {
        throw new Error('Error inside finally.');
    } catch (err) {
        console.log('Caught an error inside the finally block.');
    }
}
```

It's also important to notice that **you can also throw values that are not `Error` objects**. Although this may seem cool and permissive it's actually not that great, especially for developers that work with libraries that have to deal with other people's code, because then there's no standard and you never know what to expect from your users. You cannot trust them to throw `Error` objects simply because they may choose not to do so and just throw a string or a number instead. This also makes it harder if you need to handle stack traces and other meaningful metadata.

Let's say you've got this code:

```js
function runWithoutThrowing(func) {
    try {
        func();
    } catch (e) {
        console.log('There was an error, but I will not throw it.');
        console.log('The error\'s message was: ' + e.message)
    }
}

function funcThatThrowsError() {
    throw new TypeError('I am a TypeError.');
}

runWithoutThrowing(funcThatThrowsError);
```

This will work great if your users are passing functions that throw `Error` objects to your `runWithoutThrowing` function. However, if they end up throwing a `String` instead you may be in trouble:

```js
function runWithoutThrowing(func) {
    try {
        func();
    } catch (e) {
        console.log('There was an error, but I will not throw it.');
        console.log('The error\'s message was: ' + e.message)
    }
}

function funcThatThrowsString() {
    throw 'I am a String.';
}

runWithoutThrowing(funcThatThrowsString);
```

Now your second `console.log` will show you that the error's message is `undefined`. This may seem unimportant now, but if you needed to ensure certain properties exist on an `Error` object or deal with `Error` specific properties in another way (such as [Chai's `throws` assertion](https://github.com/chaijs/chai/blob/a7e1200db4c144263599e5dd7a3f7d1893467160/lib/chai/core/assertions.js#L1506) does) you'd need a lot more work to make sure it would work right.

Also, when throwing values that aren't `Error` objects you don't have access to other important data such as it's `stack`, which is a property `Error` objects have in some environments.

Errors can also be used as any other objects, you don't necessarily need to throw them, that's why they're used as the first argument to callback functions many times, as it happens with the `fs.readdir` function, for example.

```js
const fs = require('fs');

fs.readdir('/example/i-do-not-exist', function callback(err, dirs) {
    if (err instanceof Error) {
        // `readdir` will throw an error because that directory does not exist
        // We will now be able to use the error object passed by it in our callback function
        console.log('Error Message: ' + err.message);
        console.log('See? We can use Errors without using try statements.');
    } else {
        console.log(dirs);
    }
});
```

At last, but not least, `Error` objects can also be used when rejecting promises. This makes it easier to handle promise rejections:

```js
new Promise(function(resolve, reject) {
    reject(new Error('The promise was rejected.'));
}).then(function() {
    console.log('I am an error.');
}).catch(function(err) {
    if (err instanceof Error) {
        console.log('The promise was rejected with an error.');
        console.log('Error Message: ' + err.message);
    }
});
```

<br>

## **Manipulating Stack Traces**

And now the part you all have been waiting for: how to manipulate stack traces.

This chapter is dedicated specifically for environments that support [`Error.captureStackTrace`](https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt), such as NodeJS.

The `Error.captureStackTrace` function takes an `object` as first argument and, optionally, a `function` as the second one. What capture stack trace does is capturing the current stack trace (obviously) and creating a `stack` property in the target object to store it. If the second argument is provided, the function passed will be considered the ending point of the call stack and therefore the stack trace will only display the calls that happened before this function was called.

Let's use some examples to make this more clear. First, we will just capture the current stack trace and store it in a common object.

```js
const myObj = {};

function c() {
}

function b() {
    // Here we will store the current stack trace into myObj
    Error.captureStackTrace(myObj);
    c();
}

function a() {
    b();
}

// First we will call these functions
a();

// Now let's see what is the stack trace stored into myObj.stack
console.log(myObj.stack);

// This will print the following stack to the console:
//    at b (repl:3:7) <-- Since it was called inside B, the B call is the last entry in the stack
//    at a (repl:2:1)
//    at repl:1:1 <-- Node internals below this line
//    at realRunInThisContextScript (vm.js:22:35)
//    at sigintHandlersWrap (vm.js:98:12)
//    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
//    at REPLServer.defaultEval (repl.js:313:29)
//    at bound (domain.js:280:14)
//    at REPLServer.runBound [as eval] (domain.js:293:12)
//    at REPLServer.onLine (repl.js:513:10)
```

As you can notice in the example above, we first called `a` (which got pushed into the stack) and then called `b` from inside `a` (which pushed it on top of `a`). Then, inside `b`, we captured the current stack trace and stored it into `myObj`. This is why we get only `a` and then `b` on the stack we printed to the console.

Now let's pass a function as the second argument to the `Error.captureStackTrace` function and see what happens:

```js
const myObj = {};

function d() {
    // Here we will store the current stack trace into myObj
    // This time we will hide all the frames after `b` and `b` itself
    Error.captureStackTrace(myObj, b);
}

function c() {
    d();
}

function b() {
    c();
}

function a() {
    b();
}

// First we will call these functions
a();

// Now let's see what is the stack trace stored into myObj.stack
console.log(myObj.stack);

// This will print the following stack to the console:
//    at a (repl:2:1) <-- As you can see here we only get frames before `b` was called
//    at repl:1:1 <-- Node internals below this line
//    at realRunInThisContextScript (vm.js:22:35)
//    at sigintHandlersWrap (vm.js:98:12)
//    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
//    at REPLServer.defaultEval (repl.js:313:29)
//    at bound (domain.js:280:14)
//    at REPLServer.runBound [as eval] (domain.js:293:12)
//    at REPLServer.onLine (repl.js:513:10)
//    at emitOne (events.js:101:20)
```

When we passed `b` to the `Error.captureStackTraceFunction` it hid `b` itself and all the frames above it. This is why we only have `a` in our stack trace.

Now you may be asking yourself: "why is this useful?". This is useful because you can use it to hide internal implementation details that are not relevant to your users. In Chai, for example, we use it to avoid showing our users irrelevant details about the way we implement checks and assertions themselves.

<br>

## **Stack Trace Manipulation in The Real World**

As I've mentioned in the last section, Chai uses stack manipulations technique to make stack traces more relevant to our users. Here is how we do it.

First, let's take a look at the `AssertionError` constructor thrown when an assertion fails:

```js
// `ssfi` stands for "start stack function". It is the reference to the
// starting point for removing irrelevant frames from the stack trace
function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // Default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // Copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // Here is what is relevant for us:
  // If a start stack function was provided we capture the current stack trace and pass
  // it to the `captureStackTrace` function so we can remove frames that come after it
  ssf = ssf || arguments.callee;
  if (ssf && Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    // If no start stack function was provided we just use the original stack property
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}
```

As you can see above we are using `Error.captureStackTrace` to capture the stack trace and store it into the instance of `AssertionError` we are building and (when it exists) we're passing a start stack function to it in order to remove irrelevant frames from the stack trace, which only show Chai's internal implementation details and end up making the stack "dirty".

Now let's take a look at a recent code written by [@meeber](https://github.com/meeber) in [this awesome PR](https://github.com/chaijs/chai/pull/922).

Before looking at the code below I must tell you what `addChainableMethod` does. It adds the chainable method passed to it to the assertion and it also flags the assertion itself with the method that wraps the assertion. This is stored with the name `ssfi` (which stands for start stack function indicator). This basically means that the current assertion will be the last frame in the stack and so we won't show any further internal methods from Chai in the stack. I avoided adding the whole code for that because it does lots of things and is kind of tricky, but if you do wanna read it, [here goes the link to it](https://github.com/meeber/chai/blob/42ff3c012b8a5978e7381b17d712521299ced341/lib/chai/utils/addChainableMethod.js).

In the piece of code below, we have the logic for the `lengthOf` assertion, which checks if an object has a certain `length`. We expect our users to use it like this: `expect(['foo', 'bar']).to.have.lengthOf(2)`.

```js
function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
        , ssfi = flag(this, 'ssfi');

    // Pay close attention to this line
    new Assertion(obj, msg, ssfi, true).to.have.property('length');
    var len = obj.length;

    // This line is also relevant
    this.assert(
            len == n
        , 'expected #{this} to have a length of #{exp} but got #{act}'
        , 'expected #{this} to not have a length of #{act}'
        , n
        , len
    );
}

Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);
```

In the code above I have highlighted the lines which are relevant to us right now. Let's start with the call to `this.assert`.

This is the code for the `this.assert` method:

```js
Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
        msg = util.getMessage(this, arguments);
        var actual = util.getActual(this, arguments);

        // This is the relevant line for us
        throw new AssertionError(msg, {
                actual: actual
            , expected: expected
            , showDiff: showDiff
        }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
};
```

Basically, the `assert` method is responsible for checking if the assertion boolean expression passed or not. If it didn't we must instantiate an `AssertionError`. Notice that when instantiating this new `AssertionError` we're also passing a stack trace function indicator (`ssfi`) to it. If the configuration flag `includeStack` is turned on we show the user the whole stack trace by passing the `this.assert` itself to it, which is really the last frame in the stack. However, if the `includeStack` configuration flag is turned of we must hide more internal implementation details from the stack trace, so we use what is stored into the `ssfi` flag.

Now, let's talk about the other relevant line for us:

```
new Assertion(obj, msg, ssfi, true).to.have.property('length');
```

As you can see here we are passing the content we've got from the `ssfi` flag when creating our nested assertion. This means that when the new assertion gets created it will use this function as the starting point for removing unuseful frames from the stack trace. By the way, this is the `Assertion` constructor:

```js
function Assertion (obj, msg, ssfi, lockSsfi) {
    // This is the line that matters to us
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
}
```

As you can remember from what I've said about `addChainableMethod`, it sets the `ssfi` flag with its own wrapper method, which means this is the lowest internal frame in the stack trace so we can just remove all frames above it.

By passing `ssfi` to the nested assertion which only checks if our object has the property length we avoid resetting the frame we're going to use as the starting point indicator and then having the previous `addChainableMethod` visible in the stack.

This may seem a bit complicated, so let's review what happens inside Chai we want to remove unuseful frames from the stack:

1. When we run an assertion we set its own method as the reference to removing the next frames in the stack
2. The assertion runs and if it fails we remove all the internal frames after the reference we have stored
3. If we have nested assertions we must still use the current assertion wrapper method as the reference point for removing the next frames in the stack, so we pass the current `ssfi` (start stack function indicator) to the assertion we are creating so it can preserve it

**I also highly recommend you to read [this comment by @meeber](https://github.com/chaijs/chai/pull/922/files#r100704209) in order to understand it.**

<br>

## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**. I'd love to hear what you have to say and do any corrections if I made any mistakes.

**Thanks for reading this!**
