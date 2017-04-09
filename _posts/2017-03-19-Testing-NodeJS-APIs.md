---
layout: post
title: "Writing Good Tests for NodeJS APIs"
author: Lucas Fernandes da Costa
tags : testing node nodejs javascript api integration tdd
---

<br>

Hello, everyone! Recently I've been working a lot with Node and I felt the urgent need to write a blog post about how to write good API tests. In those tests, all I do is send a request to an instance of my server and then I check its outputs (either in the database or in the returned response).

**Even though this content is focused on API testing, I'm a hundred percent sure you will learn techniques that will help you with any tests you will ever write using JavaScript**.

**In this blog post I will show you how the tools we're going to use work behind the scenes and their roles in the test process so you can choose your own tools later if you want to.** We won't get too tied to specific tools in this post even though I need to explain how they work.

Differently to what happens with unit tests, these tests take into account how the software's components work together instead of testing them individually.

Before we get into technical stuff I must recommend you to read [this blog post about how to write good assertions](http://lucasfcosta.com/2017/01/02/How-to-Write-Assertions-Right.html) and, if you're a Portuguese speaker, I can also recommend that you see [my talk in JSDay Recife 2016 about JavaScript Testing](https://www.youtube.com/watch?v=zPA_BQk6v4k&feature=youtu.be&t=1h31m23s).

**Basic knowledge about [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) and [ES6](https://ponyfoo.com/articles/tagged/es6-in-depth) will be useful when reading this article.**

<br>

## **Our Sample Application**

In this example, we're going to write a simple application that creates, reads, updates and deletes person objects through HTTP requests. If you want to see the whole code used in this post, [here is the link to the repo](https://github.com/lucasfcosta/nodejs-server-test-examples).

In this application, we're going to use [Express](http://expressjs.com/en/starter/installing.html) as our web framework and we're going to store our documents [in a MongoDB instance](https://docs.mongodb.com/manual/installation/). To map the objects in our application to the documents in our database we're going to use [Mongoose](http://mongoosejs.com/docs/guide.html).

However, don't get too tied to these tools, I'll use these ones just to demonstrate what you'd need to do in the real world, but these concepts could easily be applied if you're using other tools such as [Sequelize](http://docs.sequelizejs.com/) and relational databases or other web frameworks such as [Hapi](https://hapijs.com/) or [Sails](http://sailsjs.com/). I'll make sure to explain in detail all the concepts and how things work so you can apply those techniques doesn't matter what you're using.

**First of all, create a new directory and use `npm init` to create a `package.json` file**.

Now, let's install `Express` and add it as a dependency to our project:

```
$ npm install --save express
```

If you're using `yarn` (which I recommend), you could also do `yarn add express`.

Now let's create the server file itself and call it `app.js`. For now, we will only have a single route, which returns a JSON object with a `hello world` message.

```javascript
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!'
    });
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})

module.exports = app;
```

To test this route manually, start your server by running `node app.js`, open your browser and go to `localhost:8080.`

<br>

## **Our First Test**

Before we get to the real deal here, let's start by writing a really simple test, which checks if our `hello world` route is working right.

In order to run our tests we will be using [Mocha](http://mochajs.org/), however, you could also use other tools such as [AVA](https://github.com/avajs/ava) or [Tape](https://github.com/substack/tape). It's important to notice that we will be using these tools just to **run** tests. When using Mocha, for example, it will only be responsible for running the `before`, `after`, `beforeEach` and `afterEach` hooks in the correct order and the code inside test blocks, whether they have assertions or not. Mocha is also responsible for generating an output indicating which tests succeeded and which ones failed.

As you might imagine, writing tests without assertions is something useless, so, in order to check the if the values we've got correspond to the expectations we have about them we will use [Chai](http://chaijs.com). Differently from Mocha, Chai does not run any tests, it just provides a bunch of assertions which will throw an error if they fail. This error will be an [AssertionError](https://github.com/chaijs/assertion-error), which is a type of error the test runners mentioned before know how to handle and display correctly.

What we want to do here to test our application is start our server and send it a request, then we need to validate its output. In order to send HTTP requests to our server, I highly recommend you to use [`Chai HTTP`](https://github.com/chaijs/chai-http), which also provides you cool new assertions related to HTTP requests.

Let's install these tools and start coding:

```
$ npm install --save-dev mocha chai chai-http
```

This time we will be adding those as dev dependencies because we don't need them to run our server, we will only use them in our development environment.

Create a folder called `test` and a file called `helloWorldTest.js`. [By default, Mocha will run every test inside the `test` directory when using the `mocha` command](http://mochajs.org/#the-test-directory), this is why we're using this name. If you want to create a different folder to store your files then you must tell Mocha where your test files are located by passing the path to this directory as the second argument to the `mocha` command.

Finally, we're going to write our test. Start by importing `chai` and `chai-http`. By using `chai.use(chaiHttp)` you will be allowing the `chaiHttp` plugin to extend Chai and therefore add new assertions and features to it. For our tests, we will also need to have our server instance available so we can tell `chai-http` where to send its requests to.

```javascript
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app.js');
```

Now let's write the test itself:

```javascript
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app.js');

describe('Hello World Route', () => {
    it('Returns a 200 response', (done) => {
        chai.request(app)
            .get('/')
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
    });
});
```

As you can see above, we used functions that haven't been defined earlier in our test file: `describe` and `it`, so how do they work and how can they be available?

The `describe` function acts as a "folder", you can nest your tests and other `describe` blocks inside it in order to organize your tests. The `it` function holds the test itself. If an exception happens inside the function passed to `it` or if the `done` callback was added as a parameter but did not get called before the configured timeout this test will be marked as failed.

These two functions are available to us because when we want to run our tests we use the `mocha` command. This command is responsible for running [a JavaScript file that starts mocha](https://github.com/mochajs/mocha/blob/master/bin/mocha) and uses `require` to load our tests files. This file also defines functions in the `global` scope, which makes them available in all files and this is why we can use `describe` and `it` without defining them first.

In our first test, we use the `request` method added by `chai-http` to the `chai` object to send a `get` request to our `app`'s `/` route. When we get a response the callback function passed to `end` gets called and gets passed an `error` and a `response` object so we can check if these objects are what we expect them to be.

In this case, we just expect the response send by the server to have a `200` (success) status.

The `done` argument that gets passed to our test function needs to be called in order to indicate this test is finished. When your function takes this argument you must call it to tell Mocha your test is complete, otherwise, it will reach the specified timeout and fail. This is not mandatory, but you will certainly want to use it when running async tests. **If your function does not take any arguments, Mocha will think it's synchronous and you won't need to call anything to indicate the test is complete**. If `done` is called with an argument your test will fail, this is why we call it with `error` if it is a truthy value.

**To run this test we must use the `mocha` command in our terminal, so let's install it globally:**

```
$ npm install -g mocha
```

To run this test open your terminal, navigate to your project's directory and run:

```
$ mocha
```

This will run your tests and display their status. However, it might be a bit inconvenient to force everyone to install `mocha` globally in order to run your project's tests, especially because they already have `mocha` installed as one of this project's dev dependencies. So, in order to allow people to run your tests with the `mocha` version in their dependencies directory, we need to modify `package.json`.

Open your `package.json` file and add this to it:

```json
"scripts": {
  "test": "mocha"
}
```

The commands inside the `scripts` object will have all the runnable files from `node_modules` (the directory which holds your dependencies) available, so you won't need to install `mocha` globally again.

In order to run the command we have added to our `package.json`, we just need to run `npm test` instead of `mocha`. If you want to read more about NPM scripts I highly recommend you to read [this blog post by my great friend Keith Cirkel](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/).

Now let's use the knowledge we've just acquired to write a new test which checks the response's message body:

```js
// ...

describe('Hello World Route', () => {
    it('Returns a 200 response', (done) => {
        chai.request(app)
            .get('/')
            .end((error, response) => {
                if (error) done(error)
                // Now let's check our response
                expect(response).to.have.status(200)
                done()
            });
    });

    // Let's add this to the same describe block to keep this file organized
    it('Returns a "Hello World" message', (done) => {
        chai.request(app)
            .get('/')
            .end((error, response) => {
                if (error) done(error);
                expect(response.body).to.be.deep.equal({
                    message: 'Hello, world!'
                });
                done();
            });
    });
});
```

If you want to read more about Chai and its assertions take a look at [the official docs](chaijs.com).

Also, here goes another cool tip: some people like to keep their tests in the same folder as the source file they are testing. If this is your case you can use the following piece of code in your `package.json` file:

```
"scripts": {
  "test": "find ./ -name '*_test.js' | xargs mocha -R spec"
}
```

This will run all the files that end in `_test.js` in your project's root directory.

When using `chai-http`, it returns a `Promise` for the requests we are doing. So, finally, let's take that into account to refactor our tests and return ChaiHTTP's promise from the function passed to Mocha's `it`. When we return a `Promise` from a test, this test will end whenever that `Promise` gets resolved so we don't need to call `done` explicitly anymore.

```js
// ...

describe('Hello World Route', () => {
    it('Returns a 200 response', () => {
        return chai.request(app)
            .get('/')
            .end((error, response) => {
                if (error) done(error)
                // Now let's check our response
                expect(response).to.have.status(200)
            });
    });

    // Let's add this to the same describe block to keep this file organized
    it('Returns a "Hello World" message', () => {
        return chai.request(app)
            .get('/')
            .end((error, response) => {
                if (error) done(error);
                expect(response.body).to.be.deep.equal({
                    message: 'Hello, world!'
                });
            });
    });
});
```


<br>

## **Testing and your database**

Now that we know the basics about how API testing works, it's about time we add a bit of complexity to our server and start solving real world problems™.

Make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/), [body-parser](https://github.com/expressjs/body-parser) and [mongoose](https://github.com/Automattic/mongoose) installed before continuing.

To install `body-parser` and `mongoose` and them to our project as dependencies we must run:

```
$ npm install --save mongoose body-parser
```

Mongoose will be responsible for mapping the documents in our MongoDB instance to JavaScript objects in our code and `body-parser` will parse incoming request bodies so that we can read them later under the `req.body` property.

Open your `app.js` file and let's get these two working:

```js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const app = express();
const port = 8080;
const mongoHost = 'localhost:27017';

// This connects to our MongoDB instance
mongoose.connect(mongoHost);

// This allows us to parse request's body
// so we can have it available later
app.use(bodyParser);

app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!'
    });
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})

module.exports = app;
```

As you can see in the code above, we have added `require` calls for `body-parser` and `mongoose`.

Then we added the result of `bodyParser.json` as a middleware to our `express` server. Please make sure that you add `bodyParser.json()` as a middleware before your other routes because Express will run middlewares in the order they are added. This means that if you add that line of code after defining your routes you will only have your request's body parsed after it has matched a route and ran its handler function. You can read more about Express' middlewares at [this link](http://expressjs.com/guide/using-middleware.html).

We have also used `mongoose.connect` to connect the `mongoose` object to our MongoDB instance. If you are using a port other than the default one (`27017`) make sure you change that `mongoHost` variable's value. You should also remember to set `mongoose.Promise` to the Promise implementation you are using, in this case, I'll use the native implementation by assigning `global.Promise` to it.

Now that we've got everything set up let's create a new model to represent our `Person` documents. I'd highly recommend you to create a new folder called `models` to store your model files. I'm going to call the Person model file as person.js:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dogs: { type: Number, required: true }
});

module.exports = mongoose.model('Person', PersonSchema);
```

I'll keep this model as simple as possible since our main goal here is to learn about testing, not about Mongoose. If you want to read more about Mongoose, [they've got excellent docs](http://mongoosejs.com/docs/guide.html).

Finally, we will create a route to insert a `person` into our database. In order to do that, let's add this to your `app.js` file:

```js
// ...

// Don't forget to import your Person model!
const Person = require('./models/person');

app.post('/person', (req, res) => {
    new Person({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        dogs: req.body.dogs
    }).save()
    .then(() => {
        res.send({
            message: 'Person saved successfully!'
        });
    })
    .catch(() => {
        res.send({
            message: 'Ooops! There was an error saving this person.'
        });
    });
});
```

This route is pretty simple, it just assigns attributes from your request's body to a new `Person` object and saves it into our database.

Now let's write a test for it. Create a new file in your `test` folder called `personTest.js`:

```js
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app.js');

describe('Person', () => {
    describe('Create Person', () => {
        it('Returns a 200 response', () => {
            return chai.request(app)
                .post('/person')
                .send({
                    name: 'John Doe',
                    phone: '1-800 999',
                    email: 'johndoe@example.com',
                    dogs: 2
                })
                .then(response => {
                    // Now let's check our response
                    expect(response).to.have.status(200);
                    done();
                })
        });
    });
});
```

Now let's focus on a couple new things we've got here, one of them is the `send` method we're using. This method allows us to fill the body of the request we're sending. Then we also started using `then` and `catch` instead of using a `callback` associated with the old `end` method. We can do this because the `send` method returns a `Promise` so we can deal with it the same way we would with any other `Promise`.

Now you might have noticed that we only checked the response we've got back from the server, but what if this person has not been saved to our database but the server still returns a 200 HTTP status? If we want to ensure that is happening correctly we must check our database after that request. Inside your `describe` block for the person creation tests, let's add a new test that does this:

```js
// Don't forget to import the Person model here too
const Person = require('../models/person');

// ...

it('Creates a person document in our DB', () => {
    return chai.request(app)
        .post('/person')
        .send({
            name: 'John Doe',
            phone: '1-800 999',
            email: 'johndoe@example.com',
            dogs: 2
        })
        .then(() => {
            return Person.find({
                email: 'johndoe@example.com'
            });
        })
        .then(result => {
            expect(result).to.have.lengthOf(1);

            const person = result[0];
            expect(person.name).to.be.equal('John Doe');
            expect(person.phone).to.be.equal('1-800 999');
            expect(person.dogs).to.be.equal(2);
            done();
        })
});
```

In the example above, instead of checking the response sent by the server we query our database for this person to make sure it has been saved there.

Unfortunately, the test above does not pass when we run it, but why? This happens because we are not cleaning up our database before running each test so our query will always return the previous `John Doe` document too and whenever we run this test it creates a new document in our database, which might interfere with other tests and make our testing database heavier and heavier as time goes by.

In order to avoid one test interfering with the other and to ensure we have reproducible builds we will make sure we drop the whole database after each test. This might seem like an overkill, but it's quite fast and helps you ensure you will have a clean database before starting any tests.

Let's use the `beforeEach` hook and pass a function we want to run before each test to it. Inside your uppermost `describe` block (the one for all Person tests) add this:

```js
// Don't forget to require mongoose on the top of your file
const mongoose = require('mongoose');

// ...
beforeEach((done) => {
    mongoose.connection.db.dropDatabase(done);
});
```

Whatever function you pass to the `beforeEach` hook will run before each test inside that suite. By adding a `dropDatabase` statement to it we make sure we will have a clean database before starting any tests.

As it happens with `describe` and `it`, Mocha's hooks (`beforeEach`, `before`, `afterEach` and `after`) can receive an argument that should be called to indicate its completion. In this case, we are using `done` because dropping a database is an `async` action, so by passing `done` as a callback to it, we ensure we have already cleaned up the database before the test starts.

Now we will be able to run our tests without having to worry about one interfering with the other.

Conceptually speaking, each test should aim to be as deterministic as possible. You always have the same state and, when you invoke a certain function, you expect its output (whether it is a state or not) to be something specific. If you are storing state from one test to the other you **will** have problems because you may end up not being able to reproduce the results of a test or these results may change from one test to the other. This can get even worse when you want to run a single test instead of running your whole suite because then that test might have had a dependency of a result from another test and so it may fail.

**Deterministic tests are good. You give an input and it always yields the same output**.

As I mentioned above, you can also run a single test when the `mocha` command is executed.  In order to do that, you just need to call `only` after an `it` or `describe` block and pass it the same arguments as you would for these two functions, for example:

```js
describe.only('Uppermost block', () => {
    it('This will run', () => {
        console.log('Runs');
    });

    it('This will run too', () => {
        console.log('Runs too');
    });
});

describe('This will not run', () => {
    it('This will not run', () => {
        console.log('Does not run.');
    });
});
```

Some people argue that Mongo is just too heavy for us to rely on it on our testing environments, but in my opinion (and something I talked about with a few friends, including [@vieiraIucas](https://twitter.com/vieiraIucas)) your tests should try to simulate your real environment as good as they can. In order to make it easier for you and your team to test in different environments you could use Docker to make sure everybody gets the same build environment in a faster and more reliable way. If you want to read more about how to dockerize MongoDB, take a look at [this link](https://docs.docker.com/engine/examples/mongodb/).

If you still want to mock Mongo you can also use [Mockgoose](https://github.com/mockgoose/mockgoose) and make yourself happy with your new in memory storage.

<br>

## **Stubbing and Spying Methods**

Finally, let's talk about stubbing methods. This is a meaty subject and is definitely something a lot of people miss because they think is too complex or simply because they don't know they could do it.

JavaScript is a very dynamic language and allows us to employ lots of [meta-programming techniques](http://lucasfcosta.com/2016/10/06/Meta-Programming-in-JavaScript-Part-One.html) to read and manipulate the structure of our programs. [Sinon](http://sinonjs.org) is an awesome library which employs lots of these techniques to make it easier for you to manipulate your program's structure in run-time and also records some useful data for you to check later, such as the arguments used to call a function or how many times it was called.

If you have routines that perform HTTP requests or have this kind of side effects, stubbing these functions will help you test them in a deterministic way while avoiding unnecessary I/O.

Also, If you were concerned about mocking Mongo as we mentioned in the last section, stubbing can help you solve your problem, you just need to stub the Model's function you expect to be called and then run assertions on it.

Before getting to a more complex example, let's say you've got this piece of code which writes a string to a file:

```js
// fileModule.js
const fs = require('fs');

function writeToFile(text) {
  fs.writeFileSync('/tmp/writeExample.txt', text);
}

module.exports = {
    writeToFile
};
```

If we had a test like the one below we would end up writing files in our testing environment, which is probably something we don't want to happen:

```js
// fileModuleTest.js
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const fileModule = require('./fileModule');

describe('Write File', () => {
    it('Calls writeFileSync with the passed text', () => {
        fileModule.writeToFile('Lorem ipsum');
        const content = fs.readFileSync('/tmp/writeExample.txt', 'utf8');
        expect(content).to.be.equal('Lorem ipsum');
    });
})
```

Now let's stub our `fs.writeFileSync` method to make our test faster and avoid writing I/O:

```js
// fileModuleTest.js
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const fileModule = require('./fileModule');

describe('Write File', () => {
    it('Calls writeFileSync with the passed text', () => {
        const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
        fileModule.writeToFile('Lorem ipsum');

        expect(writeFileSyncStub.calledWith('Lorem ipsum')).to.be.true;
    });
})
```

By stubbing that method we can change its behavior and keep track of its calls, the arguments passed to it and other useful pieces of information.

If you wanted to provide a function to replace `fs.writeFileSync` you could call `callsFake` on the stub you created and pass a new function to it. Like this:

```js
// fileModuleTest.js
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const fileModule = require('./fileModule');

describe('Write File', () => {
    it('Calls writeFileSync with the passed text', () => {
        const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
        writeFileSyncStub.callsFake((firstArg) => {
            console.log('My first arg is: ' + firstArg);
        })

        fileModule.writeToFile('Lorem ipsum');

        expect(writeFileSyncStub.calledWith('Lorem ipsum')).to.be.true;
    });
})
```

Now the function you passed to `callsFake` will be executed when calling `fs.writeFileSync`.

To restore the `fs.writeFileSync` method you could just do: `fs.writeFileSync.restore()`.

Sinon has many other useful features, such as `spies`, `matchers` and `fakeTimers`. Make sure you read [their docs](sinonjs.org/docs) to know more.

Also, if you just want to keep track of calls instead of override the behavior of a function use [`spies`](http://sinonjs.org/releases/v2.1.0/spies/), not [`stubs`](http://sinonjs.org/releases/v2.1.0/stubs/).

At last, but not least, you probably noticed that our assertion seemed a bit strange. To solve that we could use the [`sinon-chai`](https://github.com/domenic/sinon-chai) plugin and now our code would look like this:

```js
// fileModuleTest.js
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const fs = require('fs');
const fileModule = require('./fileModule');

chai.use(sinonChai);

describe('Write File', () => {
    it('Calls writeFileSync with the passed text', () => {
        const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
        writeFileSyncStub.callsFake((firstArg) => {
            console.log('My first arg is: ' + firstArg);
        })

        fileModule.writeToFile('Lorem ipsum');

        expect(writeFileSyncStub).to.have.been.calledWith('Lorem ipsum');
    });
})
```

Sinon can deal with proxies, callbacks and many other uncommon situations and the Sinon team has been doing a great work with this library. Make sure you [give them a star on GitHub](https://github.com/sinonjs/sinon)!

<br>

## **Stubs in the Real World**

Now that we know how stubs work, it's about time we write a real world example.

This time we will add a simple authentication system using `JWT` (JSON Web Tokens). If you want to know more about how JWTs work, take a look at [this awesome article on Scotch.io](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token). For now, we will only worry about implementing it and then we will see how we can use stubs to ease our testing.

Please make sure you install `sinon` before using it:

```
$ npm install -save sinon
```

First, we will need to create a new model called User. These will be the users of our system and they will be able to see and create new `Person` objects. This will be our `User.js` file, which should be located inside the `models` folder:

```js
// user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', PersonSchema);
```

Since this is just an example I won't waste time [hashing and salting that password](https://crackstation.net/hashing-security.htm). We'll save that as plain text for now. Please don't do that when building real-world applications.

Now let's add a few lines of code to our `app.js` file just after our `mongoose.connect` call so that we can seed our database with a few sample users.

This seed will run asynchronously, but since it will happen very fast I won't worry about starting my server before it finishes.

```js
// app.js
// ...

// This connects to our MongoDB instance
mongoose.connect(mongoHost);

// Let's seed our DB with a few sample users
User.find({}).then(users => {
    if (users.length === 0) {
        new User({
            username: 'admin',
            password: 'example'
        }).save();
    }
}).catch(() => {
    console.log('There was an error seeding the DB.');
});

// ...
```

In order to encode and decode JSON web tokens we will need to use the [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) package, so let's install that too:

```
$ npm install --save jsonwebtoken
```

When we use JSON Web Tokens for authentication, our users need to pass us a token when making a request. To get that token they must call our server, so let's create a `login` route.

```
// app.js

// ...
// Don't forget to import `jsonwebtoken`
const jwt = require('jsonwebtoken');

// We also need a secret to encode/decode our JWTs
app.set('appSecret', 'super-secret-secret')

// ...

app.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (user && user.password === req.body.password) {
            const token = jwt.sign(user, app.get('appSecret'));

            res.json({
                token
            });
        } else {
            res.status(401);
            res.json({
                message: 'Wrong username/password combination.'
            });
        }
    });
});

// ...
```

This route authenticates a user and returns a JSON object with a `token` property.

Now we must ensure the user has logged in when sending a request to our `person` routes, so let's add a middleware after our `login` route and before our `person` routes:

```js
// app.js

// Our login route should be above this middleware

// ...

app.use((req, res, next) => {

  const token = req.headers.token;

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, sender) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.sender = sender;
        next();
      }
    });
  } else {
    res.status(403)
    res.send({
        message: 'Please provide a token'
    });
  }
});

// Our person routes should be below this middleware

// ...
```

We've finally got everything set up! Now, when trying to send a get request to the `/person` route, for example, you will get the following response:

```json
{
  "message": "Please provide a token"
}
```

In order to avoid this you must call `/login` passing a valid `username` and `password` and then use the token returned into a `token` header.

Now our tests should be failing because they do not provide a valid token when issuing requests to our protected routes.

So, how do we fix our tests for the `person` routes without having to call the `login` route and seeding our test database?

Simple: let's create a stub for `jwt.verify` which passes arguments to its callback as if the verification was successful before calling the `person` routes.

This time, instead of using `sinon.stub` we will create a `sandbox` and use `sandbox.stub`. We will do this because then we won't need to restore the stubbed functions one by one after finishing our tests. When calling `restore` on a sandbox every stub created by it will be restored.

```js
// personTest.js

// ...

// Import the `jsonwebtoken` and `sinon` modules
const jwt = require('jsonwebtoken');

// Now let's create a sandbox:
const sandbox = sinon.sandbox.create();

before(() => {
    sandbox.stub(jwt, 'verify').callsArgWith(2, null, {});
})

beforeEach((done) => {
    mongoose.connection.db.dropDatabase(done);
})

after(() => {
    sandbox.restore();
})
```

As you can see above we create a stub to replace the behavior of `jwt.verify`. First, we stubbed that function and then we used `callsArgWith`, which allows us to define which of the arguments passed to `jwt.verify` should be called when `jwt.verify` is invoked and also allows us to define which values will be passed to it.

This is very useful when dealing with callbacks, which is our case right now. Basically, we're telling `sinon` that we want to call the third argument (the one in index `2`) passed to `jwt.verify` with the arguments `null` and `{}`.

However, our tests won't pass yet. We still need to provide a header called `token` in our request. Don't worry about the value of this header, it can be anything since we have already stubbed `jwt.verify`. One of our tests will now look like this:

```js
// personTest.js

// ...

it('Returns a 200 response', () => {
    return chai.request(app)
        .post('/person')
        .set('token', 'anything') // This is the line we need to add!
        .send({
            name: 'John Doe',
            phone: '1-800 999',
            email: 'johndoe@example.com',
            dogs: 2
        })
        .then(response => {
            // Now let's check our response
            expect(response).to.have.status(200);
        })
});

// ...
```

We can even think of a worse situation (when it comes to software testing) and imagine we have a flag indicating this user's role in order to determine whether or not he can do an action. If that's the case we just need to change the object returned by the `jwt` verify method to this:


```
sandbox.stub(jwt, 'verify').callsArgWith(2, null, {
    role: 'Admin'
});
```

**Also, some people may argue that we should pass a valid authentication header instead of just stubbing the verify function, and they're not wrong. However, I think that by considering each route as a separate testing unit we will be able to detect what's failing with more precision and agility. If our authentication failed in this case, for example, all the tests for APIs that are restricted would fail and this could result in a lot more confusion to identify the piece which is causing the failure.** However, in order to guarantee our middleware is working I'd write separate tests for it and ensure it is protecting the routes it should.


<br>

## **Your Homework**

If you want to practice and create the missing `update` and `delete` routes for this example, feel free to this and submit [a PR on this example's repository on GitHub](https://github.com/lucasfcosta/nodejs-server-test-examples).

Also, if you want to go even further, explore the new `stub.resolves` and `stub.rejects` methods from Sinon or try using conditional stubs.

Finally, you can look for Chai Plugins in [our official website](http://chaijs.com/plugins/). You might also want to use [`chai-as-promised`](https://github.com/domenic/chai-as-promised) alongside the other plugins mentioned here.

<br>

## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**. I'd love to hear what you have to say.

**Thanks for reading and thanks [@vieiraIucas](https://twitter.com/vieiraIucas) for reviewing this post and sharing your valuable opinion!**
