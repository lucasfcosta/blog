---
layout: post
title : "Getting Started With Testing in Go"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : tdd testing golang go
---




Hello, everyone! Today I'm gonna do something a little bit different from what I usually do. **I'm not going to write about JavaScript, I'm going to write about [Go](https://golang.org)!**

Recently I have been writing Go on a daily basis at work and I found it to be a fantastic programming language. If you are looking forward to learning it I highly recommend you to start with [A Tour of Go](https://tour.golang.org/).

**In order to get the most out of this post I highly recommend you to make sure you understand the basics about the Go mindset and how its environment works.** I have read [this document](https://github.com/alco/gostart#motivation) when starting out and it helped me a lot, it's one of the best resources available for everyone learning Go.

Also, if you want to read about how to write good assertions, take a look at [this previous blog post](/2017/01/02/How-to-Write-Assertions-Right.html).



## **How Testing Works in Go**

Differently from what happens in other languages, such as JavaScript, **the `go` tool is bundled with a built-in utility to run tests**. **It is called `go test`**.

**In order to run your tests all you gotta do is navigate to the folder in which your tests are located and run `go test`**. You can also provide the path to your tests by passing it as an argument to the `go test` command, for example: `go test ./folder/subfolder`.

**When running `go test` it will search for every file whose name ends with `_test.go` and will then run all functions whose name starts with `Test` and that take a `*testing.T` as argument.**

**TIP:** we often need to run tests in multiple packages, to do that all you gotta do is use `go test ./...` and it will search for tests recursively in the current directory.

It's also important to notice that **these `_test.go` files will not be included when doing regular package builds**, they will only be included when running `go test`.



## **Writing our First Test**

Since our main concern in this post is not to learn TDD but to learn how to test our code in Go, I'll show you the code we are going to test before writing any testing code.

For this demonstration, I'll take a simple function from my `gobotto` package. This function takes any address and returns the expected `robots.txt` address for that website. This is its code:



#### **gobotto.go**
```go
package gobotto

import "net/url"

func RobotsURL(address string) (string, error) {
    parsedUrl, err := url.Parse(address)
    result := parsedUrl.Scheme + "://" + parsedUrl.Host + "/robots.txt"
    return result, err
}
```



It's really simple, all it does is take out all the path and use `/robots.txt` instead.

In order to write our first test, we will need to create a `gobotto_test.go` file and import the `testing` package:



#### **gobotto_test.go**
```go
package gobotto

import "testing"
```



Now it's time for us to add some testing functions to the `gobotto_test.go` file. Remember they have to start with `Test` and they should take a `*testing.T` as an argument.

Here is a test case which makes sure `RobotsURL` behaves correctly:



#### **gobotto_test.go**
```go
package gobotto

import (
    "testing"
)

func TestRobotsURLSuccessful(t *testing.T) {
    expectedURL := "http://my-cool-domain.com/robots.txt"
    result, _ := RobotsURL("http://my-cool-domain.com/blog-post/1")

    if result != expectedURL {
        t.Fatal("Expected " + expectedURL + " but got " + result)
    }
}
```



As it happens in any other language, we're just calling the function being tested and comparing its result to the result we expected. However, as you may have noticed, we're not using any assertions here. Instead, we're just calling `t.Fatal` in order to stop the test immediately, marking it as a failure, and log something to the console.

In Go, there are no built-in assertions, but, fortunately, we've got the open source community to help us solve this problem. **I'm a big fan of the [testify](https://github.com/stretchr/testify) package, which provides us a lot of utilities for writing tests, [including assertions](https://godoc.org/github.com/stretchr/testify/assert).**

Now, let's rewrite the previous test by using testify's assertions package:



#### **gobotto_test.go**
```go
package gobotto

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestRobotsURLSuccessful(t *testing.T) {
    expectedURL := "http://my-cool-domain.com/robots.txt"
    result, _ := RobotsURL("http://my-cool-domain.com/blog-post/1")

    assert.Equal(t, expectedURL, result, "")
}
```



Testify has got a lot of assertions available. All of them take the `*testing.T` argument passed to the testing function as an argument in order to be able to fail tests when needed. Their last argument is always a `string` to allow custom messages to be appended to the testing output.

If you want to see the full list of available assertions take a look at [testify's assert package docs](https://godoc.org/github.com/stretchr/testify/assert).

Another interesting advantage of using `testify` are the diffs it produces, which make it a lot more easy to spot errors and inconsistencies.



## **Running Multiple Tests**

Let's add another simple test to our `gobotto_test.go` file so we can talk about running multiple tests.

This time we will just check if the returned `error` is `nil` when everything goes fine.

This is the function we're going to add to `gobotto_test.go`:

```go
func TestRobotsURLNoError(t *testing.T) {
    expectedURL := "http://my-cool-domain.com/robots.txt"
    _, err := RobotsURL("http://my-cool-domain.com/blog-post/1")

    assert.Nil(t, err)
}
```

So, now that we've got two different functions, how are they run?

Tests in Go run sequentially unless marked as parallel. To mark a test as parallel you just gotta call the `Parallel` function on the provided `*testing.T` argument, just like this:

```go
func TestRobotsURLNoError(t *testing.T) {
    t.Parallel()
    expectedURL := "http://my-cool-domain.com/robots.txt"
    _, err := RobotsURL("http://my-cool-domain.com/blog-post/1")

    assert.Nil(t, err)
}
```

Tests marked as parallel will run in parallel with (and only with) other parallel tests.

Right now you may also be asking yourself, okay, but what about test suites? Does Go provide that?

Actually **every `*_test.go` file is already considered a test suite, but if you want to have your code organized into suites programmatically, `testify` has got you covered.**

**Another cool advantage of using `testify`'s test suites is being able to set up methods that run on certain lifecycle events in order to add setup/teardown functionality added to your tests.**

To define a testing suite we just need to do define a `struct` extending `testify`'s `suite.Suite`:

```go
package gobotto

import (
    "github.com/stretchr/testify/suite"
    "testing"
)

// This is our suite
type RobotsURLSuite struct {
    suite.Suite
}
```

Now we can add whatever test methods we want to that suite just by adding methods that start with `Test` and that have this suite as the [`receiver`](http://stackoverflow.com/questions/34031801/function-declaration-syntax-things-in-parenthesis-before-function-name). You should also notice that now we can call the assertion methods straight from the testing suite. For example:

```go
package gobotto

import (
    "github.com/stretchr/testify/suite"
    "testing"
)

// This is our suite
type RobotsURLSuite struct {
    suite.Suite
}

// This is one of our tests
func (suite *RobotsURLSuite) TestRobotsURLSuccessful() {
    expectedURL := "http://my-cool-domain.com/robots.txt"
    result, _ := RobotsURL("http://my-cool-domain.com/blog-post/1")

    // Notice we are now using `suite` to call the assertion methods
    suite.Equal(expectedURL, result)
}
```

**However, this is still not enough to run our tests! We still need to call the `suite.Run` method within a standard testing method (one that starts with Test so it can get run automatically by `go test`)**.

Here is the final touch:

```go
package gobotto

import (
    "github.com/stretchr/testify/suite"
    "testing"
)

// This is our suite
type RobotsURLSuite struct {
    suite.Suite
}

// This is one of our tests
func (suite *RobotsURLSuite) TestRobotsURLSuccessful() {
    expectedURL := "http://my-cool-domain.com/robots.txt"
    result, _ := RobotsURL("http://my-cool-domain.com/blog-post/1")

    // Notice we are now using `suite` to call the assertion methods
    suite.Equal(expectedURL, result)
}

// This gets run automatically by `go test` so we call `suite.Run` inside it
func TestSuite(t *testing.T) {
    // This is what actually runs our suite
    suite.Run(t, new(RobotsURLSuite))
}
```

In order to add lifecycle hooks all you've gotta do is implement them with their corresponding names and make your test suite the `receiver` for these methods. If you wanted to write a setup method for this test, this is what it would look like:

```go
package gobotto

import (
    "github.com/stretchr/testify/suite"
    "testing"
)

// This is our suite
type RobotsURLSuite struct {
    suite.Suite
}

// This method gets run before each test in the suite
func (suite *RobotsURLSuite) SetupTest() {
    // Initialize things or do any setup stuff inside here
}

// This is one of our tests
func (suite *RobotsURLSuite) TestRobotsURLSuccessful() {
    expectedURL := "http://my-cool-domain.com/robots.txt"
    result, _ := RobotsURL("http://my-cool-domain.com/blog-post/1")

    // Notice we are now using `suite` to call the assertion methods
    suite.Equal(expectedURL, result)
}

// This gets run automatically by `go test` so we call `suite.Run` inside it
func TestSuite(t *testing.T) {
    // This is what actually runs our suite
    suite.Run(t, new(RobotsURLSuite))
}
```

These are the methods available for you to take advantage of the suite lifecycle hooks:

* `BeforeTest(suiteName, testName string)` - Runs right before the test starts
* `AfterTest(suiteName, testName string)` - Runs right after the test finishes
* `SetupSuite()` - Runs before the tests in the suite
* `SetupTest()` - Runs before each test in the suite
* `TearDownTest()` - Runs after each test in the suite
* `TearDownSuite()` - Runs after all the tests in the suite have been run

Another interesting thing to notice is that you still have access to the `*testing.T` value inside your tests and therefore you can still call all of its methods. In order to access it, you just gotta call the suite's `T()` method, just like `suite.T()`. This is how it's able to run assertions without passing a `*testing.T` value as their first argument.

If you're interested in using Go's native way of organizing tests, take a look at [this link](https://golang.org/pkg/testing/#hdr-Subtests_and_Sub_benchmarks).

Also, `testify` seems to be having trouble when tests inside a `suite` are run in parallel by marking them with `suite.T().Parallel()`. Take a look at [this issue](https://github.com/stretchr/testify/issues/187) to see how to work around it and keep an eye on it until this has been solved (or maybe you can even send a Pull Request).



## **Using Stubs**

Speaking in a broad manner, a stub is a "replacement" for a method in order to change its behavior. I talked a little bit about it in [my last blog post about assertions](/2017/01/02/How-to-Write-Assertions-Right.html), so check that if you want to know more about how to use stubs well.

In Go, we don't have access to many of the meta-programming jiu-jitsu we've got in dynamic languages and therefore we can't get away just by using third party stub libraries.

In order to work around that it is generally considered a good practice to use **dependency injection**.

So, instead of using directly using an `http.Get` for fetching data inside one of your methods, for example, you can pass an instance of an interface you created and then call the `fetch` method of what was passed. This way you're able to provide fake implementations for this `fetch` method and avoid doing HTTP calls.

Let's use another example. Let's say we've got a function that needs to read a file and return a boolean indicating whether it contains a name or not:

```go
package myPackage

import (
    "io/ioutil"
    "strings"
)

func FileContainsName(filename string, name string) (bool err) {
    file, _ := ioutil.ReadFile(filename)
    content := string(file)

    return strings.Contains(content, name), err
}
```

If we had this we would need real files in the disk to test it and we would need these files to have different contents, which makes testing a lot more painful.

So, instead of using `ioutil` directly we just need to pass to our function an object which implements a `MyFileReader` interface, which has a `Read` method.

Let's define an interface for `MyFileReader`:

```go
package gobotto

import (
    "strings"
)

// This is our new interface!
type MyFileReader interface {
    Read(name string) ([]byte, error)
}

// Notice we're not using ioutil's ReadFile anymore, now we can provide our own file reader and implement a fake Read method in it
func FileContainsName(reader MyFileReader, filename string, name string) bool {
    file, _ := reader.Read(filename)
    content := string(file)

    return strings.Contains(content, name)
}
```

Thanks to this interface we will be able to implement a fake version of `MyFileReader` and pass it to our `FileContainsName` function. So, this is what our test would look like:

```
import (
    "github.com/stretchr/testify/assert"
    "testing"
)

type fakeReader struct{}

// Notice how we're now able to implement any Read method we want to and return arbitrary content
func (fakeReader *fakeReader) Read(filename string) ([]byte, error) {
    return []byte("My friend John is nice."), nil
}

func TestFileContainsName(t *testing.T) {
    assert.True(t, FileContainsName(new(fakeReader), "whatever.txt", "John"))
}
```

Got it?

If you are interested in reading more about this subject [Karl Matthias has got an awesome blog post for you](http://relistan.com/writing-testable-apps-in-go/). I highly recommend you to read that!



## **Testing HTTP Calls**

Another important thing to talk about is how to test HTTP calls. Go is widely used to build web applications and due to that, it has got [the `httptest` package](https://golang.org/pkg/net/http/httptest).

This package allows you to test both HTTP calls and fake HTTP responses by providing a simple server implementation and other utilities such as a [ResponseRecorder](https://golang.org/pkg/net/http/httptest/#ResponseRecorder).

Let's start by testing an HTTP Client's behavior. This client is responsible for sending a POST request to a given URL with `CustomHeader: iLoveBacon` in this request's headers. The method which does that is called `BaconPost`.

Here is the code for our `BaconClient`:

```go
package bacon

import (
    "net/http"
)

// Every BaconClient needs an http.Client in order to make its requests
type BaconClient struct {
    httpClient *http.Client
}

func (client *BaconClient) BaconPost(address string) {
    // Here we're creating a "POST" request and adding a custom header to it
    req, _ := http.NewRequest("POST", address, nil)
    req.Header.Add("CustomHeader", "iLoveBacon")

    // This sends our request
    client.httpClient.Do(req)
}
```

In order to test this, we're going to create a test server and do assertions on the request object we get when our client does its HTTP call.

```go
package bacon

import (
    "github.com/stretchr/testify/assert"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestCustomHeader(t *testing.T) {
    // This is what will be called when the request arrives
    testHandler := func(w http.ResponseWriter, req *http.Request) {
        // We don't even need to answer the request, we just need to assert the request has the data we want
        assert.Equal(t, req.Method, "POST")
        assert.Equal(t, req.Header.Get("CustomHeader"), "iLoveBacon")
    }

    // Here we're effectively creating a server and passing our `testHandler` to it
    testServer := httptest.NewServer(http.HandlerFunc(testHandler))
    defer testServer.Close()

    // Now let's instantiate a client and tell it to do its request to our fake server
    httpClient := &http.Client{}
    client := BaconClient{httpClient}

    // This sends the POST request with our custom header
    client.BaconPost(testServer.URL)
}
```

This is what happens when running the test above:

1. We create `testHandler`, which is the function that will be called by our server when a request arrives.
2. We create `testServer` and pass `testHandler` to it.
3. We create a BaconClient.
4. We tell the BaconClient to execute is `BaconPost` method, which does an HTTP request
5. Our `testServer` receives this request and calls `testHandler`
6. The `testHandler` function is run, executing the assertions on the `req` object passed to it

Testing HTTP servers, however, is a bit different from testing HTTP clients. Basically what you've gotta do in order to test these servers is test their handlers, which are responsible for processing the input and writing to an output.

To ease this task, the `httptest` package has got a struct called `ResponseRecorder`, which is an implementation of the `http.ResponseWriter` that is passed to the handler functions. This other implementation, however, records its mutation for later inspection.

To demonstrate this let's say you've got a server which repeats the word sent to it 1 to 10 times and adds a header (`RepeatHeader`) to the response indicating how many times it was repeated.

This is its code:

```go
package randmult

import (
    "fmt"
    "io/ioutil"
    "math/rand"
    "net/http"
    "strconv"
    "strings"
    "time"
)

func randomBetween(min int, max int) int {
    rand.Seed(time.Now().UTC().UnixNano())
    return min + rand.Intn(max-min)
}

func RandomHandler(w http.ResponseWriter, req *http.Request) {
    randomFactor := randomBetween(1, 10)
    w.Header().Add("RepeatHeader", strconv.FormatInt(int64(randomFactor), 10))

    reqBody, _ := ioutil.ReadAll(req.Body)

    fmt.Fprint(w, strings.Repeat(string(reqBody), randomFactor))
}
```


In order to test this we need to create a [http.HandlerFunc](https://golang.org/pkg/net/http/#HandlerFunc) and then we will be able to pass a `ResponseRecorder` to it by calling [`ServeHTTP`](https://golang.org/pkg/net/http/#HandlerFunc). We then do our assertions using the data on that `ResponseRecorder`.

For example:

```go
package randmult

import (
    "bytes"
    "fmt"
    "github.com/stretchr/testify/assert"
    "io/ioutil"
    "net/http"
    "net/http/httptest"
    "strconv"
    "strings"
    "testing"
)

func TestRandomHandler(t *testing.T) {
    // Let's create a HandlerFunc using our handler as an argument
    handler := http.HandlerFunc(RandomHandler)

    // Here we're creating a io.Reader to be sent as our request's body
    buf := new(bytes.Buffer)
    fmt.Fprint(buf, "word")

    // Create a request object
    req, _ := http.NewRequest("POST", "/", buf)

    // Call our handler function passing our ResponseRecorder and request to it
    recorder := httptest.NewRecorder()
    handler(recorder, req)

    // Let's see if the result matches the multiplier and the word we've sent
    multiplier, _ := strconv.Atoi(recorder.HeaderMap.Get("RepeatHeader"))
    expected := strings.Repeat("word", multiplier)
    response, _ := ioutil.ReadAll(recorder.Body)

    // Now we do assertions on our recorder
    assert.Equal(t, string(response), expected)
}
```

This is what is happening in the example above:

1. We create a `HandlerFunc` wrapping our `RandomHandler`
2. We create an `http.Request` object with a word in its body
3. We create a `ResponseRecorder`, which is just like an `http.ResponseWriter`, but records modifications made to it
4. We call our `HandlerFunc` and pass the `ResponseRecorder` and the `http.Request` we have created to it
5. We calculate what should be the expected output based on the `RepeatHeader` and `word`
6. We check the response sent to see if it matches what we expected



## Get in touch!

**If you have any doubts, thoughts or if you disagree with anything I've written, please share it with me in the comments below or reach me at [@thewizardlucas on twitter](https://twitter.com/thewizardlucas)**. I'd love to hear what you have to say and do any corrections if I made any mistakes.

Also, if you know any better ways to write Go code than what I've done here, please let me know, I'm still getting started with it so it would be awesome to have feedback from more experienced people.

**Thanks for reading this!**
