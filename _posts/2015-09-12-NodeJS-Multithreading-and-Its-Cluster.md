---
layout: post
title : Multithreading in Node.js</Node>
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : nodejs multithread javascript coding
---

Hey folks, I'm sure you've heard about multithreading, but have you ever thought about doing it in JavaScript? Well, maybe not, since Node.js has non-blocking I/O operations you actually may never have thought about this. But don't get scaried, let me teach you a couple things.

<br>

# ***Hey, wait, what does this "non-blocking I/O" thing means?***

This means Node won't have it's execution blocked by I/O operations such as writing or reading data on disk. These are expensive operations. Due to the assynchronous nature of JavaScript and it's awesome features like functions being first-class objects, Node was designed to keep doing its business until the I/O operation is complete, then it will execute the provided callback (if you want to learn more about the inner working of Node I strongly recommend that you read [this blog post](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/)).

Other servers usually have a thread pool and get a single thread to process each request they get, after the request is fulfilled the thread is sent back to the pool.

You should also know that Node keeps a single thread for your code, this means that if you have a CPU intensive code it will be executed from top to bottom and it will block all other requests.

In a nutshell: **everything runs parallel, except your code**

**Interesting Knowledge Tip:** If you want to learn about how your operating system deals with these kinds of problems you should read about how [time-sharing systems](https://en.wikipedia.org/wiki/Time-sharing) and [multiprogramming systems](http://ecomputernotes.com/fundamental/disk-operating-system/multiprogramming-operating-system) work. You will certainly like it if you are into this whole performance and multithreading thing.

<br>

# ***Ok cap'n, but can you tell me the pros and cons of this?***

Of course I can, fellow sailor of the internet sea.

* Pros:
  - Code gets simpler both to write and to read
  - It eliminates [race conditions](http://stackoverflow.com/questions/34510/what-is-a-race-condition)
  - I/O operations (which are expensive) do not block the thread's execution

* Cons:
  - CPU intensive operations block the thread's execution
  - Less control over how your code works

Of course using or not a non-blocking I/O solution depends on the problem you are trying to solve. If you are dealing with heavy loads of I/O you may bet your chips into Node.js, but you may not do it when it comes to heavy loads of CPU intensive operations.

<br>

# ***Enough talking, let's get to code***

**Disclaimer:** For these examples I'm going to use [Node.js' cluster module](https://nodejs.org/api/cluster.html) and [a module for sorting I've made called sugar-sorting](https://www.npmjs.com/package/sugar-sorting). I also recommend that you take a look into the [Node's Process docs](https://nodejs.org/api/process.html).

Let's start with a simple example: we're going to create 5 threads and get them to notify their own Process ID.

{% highlight javascript %}
var cluster = require('cluster');

var threads = 5;

// cluster.isMaster indicates if this process is a master process
if(cluster.isMaster) {
  for (var i = 0; i < threads; i++) {
    cluster.fork();
  }

} else {
  // This gets executed if the process is a worker
  console.log('I am the thread: ' + process.pid);
  process.exit(1);
}
{% endhighlight %}

**Simple isn't it?**

All you need to do is use the `fork()` method to create new `process` instances. The `fork()` method returns a worker object and it also pushes the worker into the `cluster.workers` hash, this hash stores all the worker objects mapped by their `id` field.

<br>

# ***Whoa! Is that all I've gotta know?***

Unfortunately (or not) no. I'm sorry but there are some details I really need to tell you.

**The first thing** you should know when creating a new thread is that, unlike C's `fork()`, **the new thread will execute the whole file that created it**.

If you don't wan't this to happen you can use the `cluster.isMaster` and `cluster.isWorker` properties to differentiate between the two kinds of threads or you can create a new .js file an then use cluster's `setupMaster()` method to configure your workers to use it. Let's say you've got a `myWorkerCode.js` file and you want your worker threads to run it, you would write something like:

#### threadCreator.js
{% highlight javascript %}
var cluster = require('cluster');

var threads = 5;

cluster.setupMaster({
  exec: 'worker.js',
});

for (var i = 0; i < threads; i++) {
  cluster.fork();
}
{% endhighlight %}

#### worker.js
{% highlight javascript %}
console.log('PID' + process.pid + ' says: I am running on a separate file');
process.exit(1);
{% endhighlight %}

Now when running `threadCreator.js` you will see '`PID XXXX says: I am running on a separate file`' printed five times on your console.

**The second thing** you should know is that Node.js threads cannot share memory, although this means you won't be able to have two threads reading and writing the same variable you also won't need to implement any lock mechanisms. As a workaround you could use [Redis](http://redis.io/) or [Memcached](http://memcached.org/).

**The last but not least thing** you should know is that workers cannot directly see their masters, this means you won't be able to send direct messages from workers to their masters. How to overcome this? When creating worker threads you've gotta watch for the messages they send themselves, then you can use this into your current thread. Just like:

{% highlight javascript %}
var cluster = require('cluster');
var threads = 5;

if (cluster.isMaster) {
  var messagesFromWorkers = [];

  for (var i = 0; i < threads; i++) {
    var worker = cluster.fork();

    // Everytime a message event happens on a worker we push this message to the messages list
    worker.on('message', function(msg) {
      messagesFromWorkers.push(msg);
    });
  }

    // When all workers die we will print the whole message list
  cluster.on('exit', function() {
    // To check if all the workers died we see if the cluster.workers hash does not contain any workers
    // Object.keys(obj) returns an array with all the object's keys
    if (Object.keys(cluster.workers).length === 0) {
      console.log(messagesFromWorkers.join('\n'))
    }
  });

} else {
  // Here we're making the workers send messages
  process.send('I am the thread: ' + process.pid);
  process.exit(1);
}
{% endhighlight %}

<br>

# ***Can you give me a real world example?***

Well, let's say we've got a CPU intensive operation like sorting a bunch of enormous arrays (and we're dumb enough to use [bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)). We certainly don't want to do this synchronously and lose tons of performance **therefore we're going to use more threads.**

What we're gonna do is simple: we're going to create other threads and split the processing between them, when every thread has finished the master will print the elapsed time and kill itself. Do some changes to the code below and you will be able to notice the performance difference between using one or many threads.

{% highlight javascript %}
var Sorter = require('sugar-sorting');
var cluster = require('cluster');

// Number of threads we're going to create
var numThreads = 5;

// How many arrays you want to create
var totalArrays = 1000;

// The process will only get inside this if it isn't a worker
if (cluster.isMaster) {
  // Starting time
  var start = Date.now();

  // This variable will hold our sorted arrays
  var sortedArrays = [];

  // Here we're creating enourmous arrays
  // Then we push them into randomArrays
  var randomArrays = [];
  for (var i = 0; i < totalArrays; i++) {
    randomArrays.push(generateRandomArray());
  }

  function generateRandomArray() {
    var array = [];
    var length = 1000;

    for (var i = 0; i < length; i++) {
      array.push(Math.random() * 1000);
    }
    return array;
  }

  // Here we are:
  // Creating the workers;
  // Defining their action's callbacks;
  // Sending them the arrays they should sort;
  for (var t = 0; t < numThreads; t++) {
    var worker = cluster.fork();

    // When the workers send a message with the results we save them
    // After we've got the results we kill the worker
    worker.on('message', function(workerArrays) {
      for (var arr = 0; arr < workerArrays.length; arr++) {
        sortedArrays.push(workerArrays[arr]);
      }
      console.log('Process ' + this.process.pid + '  has finished sorting its arrays.');
      this.destroy();
    });
    
    // Here we're sending some random arrays for the worker to sort
    worker.send(randomArrays.splice(0, (totalArrays/numThreads)));
  }

  cluster.on('exit', function(worker) {
    // When the master has no more workers alive it
    // prints the elapsed time and then kills itself 
    if (Object.keys(cluster.workers).length === 0) {
      console.log('Every worker has finished its job.');
      console.log('Elapsed Time: ' + (Date.now() - start) + 'ms');
      process.exit(1);
    }
  });

} else {
  // This is the work our workers are going to do
  // They start working after getting the message with some random arrays
  process.on('message', function(arrays) {
    console.log('Process ' + process.pid + '  is starting to sort.');
    var arraysIHave = arrays;

    for (var i = 0; i < arraysIHave.length; i++) {
      var s = new Sorter(arraysIHave[i]);
      s.bubbleSort();
      arraysIHave[i] = s.getElements();
    }

    process.send(arraysIHave);
  });
}
{% endhighlight %}

<br>

# ***Okay, can you give some tips, please?***

Here they go:

* Use `require('os').cpus().length` to get the number of cores you have, creating one thread for each one of them will improve performance
* Read [the cluster docs](https://nodejs.org/api/cluster.html) to learn about every event and how they're triggered
* To deal with the current thread (either on a worker or a master thread) you can use the [process object](https://nodejs.org/api/process.html)
* You can also take a look into the [Child Process module](https://nodejs.org/api/child_process.html) if you want to learn more about multithreading in Node.js

* Recommended for Further Reading:
  - [This question about Blocking Vs. Non-Blocking workers](http://programmers.stackexchange.com/questions/181397/many-blocking-vs-single-non-blocking-workers)
  - [This excellent article written by Mikito Takada](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/)

<br>

**In this post you should've learned:**

- What "non-blocking I/O" means
- The pros and cons of using non-blocking I/O technologies
- When to use multiple threads in Node.js
- How to create and manage multiple threads in Node.js
