---
layout: post
title : "Everything You Need to Know About Regular Expressions In JavaScript - Part Two: Grouping And The RegEx API"
author: Lucas Fernandes da Costa
place: Florianópolis, Brazil
flag: 🇧🇷
tags : regex regular expressions
---


<br>

Hello everyone! This is my second blog post about regular expressions in JavaScript, if you didn't read [the first one](/2016/12/17/Regular-Expressions-in-JavaScript-Part-One.html), make sure you do because we're gonna need that knowledge for this post. If you're already familiar with the basics of how to create simple regular expressions and the most common metacharacters feel free to skip that post.

In the second article of this series **we're going to talk about how grouping works and the Regular Expression API we've got in JavaScript.**

As I've done in the first post, I will once again recommend you to use [RegEx101.com](https://regex101.com) when reading this article. This amazing tool not only lets you test your regular expressions but it also shows every single rule in detail.

<br>

## **How does grouping works?**

**When creating groups by putting characters inside parenthesis we can apply other metacharacters to a whole group of elements**.

Remember when we wanted to match either one character or the other by using the `|` metacharacter? By using group delimiters we can create regular expressions which match either one entire word or another. The following regex, for example, matches either `true` or `false`: `(true|false)`. Now that we've got a group delimiter we can tell `|` where any of its operands start and end.

By using groups we can even match either the `true`, `false` or `undefined` words. Take a look at how we would do it: `(true|false|undefined)`.

Groups can be used for a great variety of purposes, so let me give you some more examples:

* By putting a `+` right next to a group we indicate we want to match that group at least one or as many times as possible
    * `(bla|ha)+`, for example, matches `bla` or `ha` at least one time or as many times as possible
* By putting a `*` next to a group we can indicate we want to match that group zero or as many times as possible
    * `Hi (Fred|Francis)*`, for example, matches `Fred` or `Francis` at least one time or as many times as possible
* Whenever using `{min,max}` after a group it will be applied to it
    * `(Ha|He){2,5}`, for example, will match `Ha` or `He` two to five times

<br>

## **Capturing Groups**

Besides allowing us to apply metacharacter semantics to groups of elements, **the use of parenthesis allows us do define capture groups**.

**Capture groups can be used both to remember captured elements in the regular expression itself and to gather pieces of information in a complex regular expression using the JavaScript RegEx API**.

In [the previous blog post](/2016/12/17/Regular-Expressions-in-JavaScript-Part-One.html), when talking about meta sequences I only mentioned the simple ones. In order to show you what I meant by saying that you can "remember" captured elements I will use the `\n` meta sequence, in which `n` can be any integer.

**The `\n` meta sequence matches the `nth` subpattern of a regular expression**. This means that you can match a previously captured element just by using `\n` where `n` represents which group you want to match.

Let's use a simple example to demonstrate how it works. Suppose we want to match words that repeat itself after any other word, this is the regular expression we would use: [`(\w+) \w+ \1`](https://regex101.com/r/JXJCWG/1) (notice that we've got two whitespaces in this RegEx).

Does it seem complex? Let's dissect that regular expression:

* `(\w+)` - Matches any word character at least one time and captures it
* ` ` - The whitespace simply matches a whitespace
* `\w+` - Matches any word character at least one time (this won't be captured)
* ` ` - The whitespace simply matches a whitespace
* `\1` - Matches the same thing that was matched by the first (`1`) capture group

If you had two capture groups and you wanted to match the same thing captured by the second one you would use `\2` instead of `\1`, for the third capture group you would use `\3`, for the fourth you would use `\4` and so on.

In case you just want to use groups to apply metacharacter to multiple subexpressions, as we mentioned on earlier, **you can add `?:` to the start of your group and then it will become a non-capturing group**.

Let's say you want to match either `true` or `false` followed by repeated words, instead of having two matching groups and using the `\2` meta sequence you can use a non-capturing group and then use the `\1` meta sequence.

The regular expression mentioned above could be written as: [`(?:true|false) (\w+) \1`](https://regex101.com/r/hkLSXa/1).

As you can see above we created two groups, but since only the second one is capturing group we can reference it by using `\1` and not `\2`.

<br>

## **Capturing Groups and the RegExp API**

In JavaScript, objects that inherit from the `RegExp` object have the following methods:

* `exec` - Executes a search for a match in a String and returns an array of information or `null` if no match has been found
* `test` - Returns `true` if it is possible to find a match in the given string, otherwise returns `false`
* `toString` - Returns a `String` representing the RegEx

Besides those methods we also have methods implemented in `RegExp.prototype` through the use of `Symbols`. If you want to read more about that make sure you read [my latest blog post about meta programming](/2016/12/01/Meta-Programming-in-JavaScript-Part-Four.html).

For now let's focus on [the `Regex.prototype.exec` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

This method takes a `String` as argument and "executes" the regular expression against it. It returns an array object containing the full match, what has been matched by each capture group, the index of that match in the given `String` and the original `String`.

Let's use the same example we created in the last section and show an example of the returned object:

```js
// Notice we've got only one capture group here
const myRegex = /(?:true|false) (\w+) \1/g;

const lineOne = 'true word word';
const lineTwo = 'false thing thing';

const resultOne = myRegex.exec(lineOne);
const resultTwo = myRegex.exec(lineTwo);

console.log(resultOne); // [ 'true word word', 'word', index: 0, input: 'true word word' ]
console.log(resultTwo); // null
```

Did you notice anything strange? Why is `resultTwo` `null`?

It's clear that this regular expression should find a match in `lineTwo`, so why does that happen?

This happens because whenever you use the `g` (Global) flag, the `exec` method will update the `RegExp` object with the index of the last match in order to allow you to continue calling `exec` multiple times until you have no more matches left in a `String`.

The example below clearly demonstrates this behavior:

```js
// Notice we've got only one capture group here
const myRegex = /(?:true|false) (\w+) \1/g;

const lineOne = 'true word word';
const lineTwo = 'false thing thing';

// Let's call `exec` to find a match in `lineOne`
const resultOne = myRegex.exec(lineOne);

// Notice that resultOne is not `null`
console.log(resultOne !== null); // true

// So, since we've found a match, `myRegex` should have been updated with the last match index
// In this case the whole string matches the RegExp, so the index should be equal its length
console.log(myRegex.lastIndex === lineOne.length); //true

// Now when calling `exec` again it will try to find a match AFTER `myRegex.lastIndex`
const resultTwo = myRegex.exec(lineTwo);

// Since we don't have a match after that index `resultTwo` will be null
console.log(resultTwo); // null

// However, if we run `exec` again it will start from the beginning of the String
const resultTwoAgain = myRegex.exec(lineTwo);

// Since it started from index 0 this time we will have result that is not null
console.log(resultTwoAgain); // [ 'false thing thing', 'thing', index: 0, input: 'false thing thing' ]
```

The `lastIndex` property is only set when using regular expressions with the global (`g`) flag, otherwise it will remain as `0`. Be careful with this because if you don't use the `g` flag you will always have the same return from `RegExp.prototype.exec` since it will always start from index `0` and return on the first match.

If we had more than one capturing group our array would have more elements, one for each matching group, starting from index 1. For example:

```js
const myRegex = /(\w+) name is (\w+)/ig;
const phrase = 'My name is John and her name is Susan';

const firstRun = myRegex.exec(phrase);

// Notice that we've got `My` and `John` on the index `1` and `2`
console.log(firstRun); // [ 'My name is John', 'My', 'John', index: 0, input: 'My name is John and her name is Susan' ]

// Now `exec` will search for a match after the last match index
const secondRun = myRegex.exec(phrase);

// Again we have more than one capture group so we've got elements on index `1` and `2` again
console.log(secondRun); // [ 'her name is Susan', 'her', 'Susan', index: 20, input: 'My name is John and her name is Susan' ]
```

Besides the `lastIndex` property, a `RegExp` instance also has the following attributes:

* `ignoreCase` - Indicates if the `i` flag was used to make the regular expression case insensitive - `Boolean`
* `global` - Indicates if the `g` flag was used (Global Match) - `Boolean`
* `multiline` - Indicates if the `m` flag was used for a search across multiple lines - `Boolean`
* `source` - The `RegExp`'s content - `String`

In order to find sucessive matches we can simply keep calling `RegExp.prototype.exec` until the result is `null`, for example:

```js
const myRegex = /(red|blue|yellow|green)/ig;
const phrase = 'I like Pokémon Red, Blue, Yellow and Green';

let result;
while ((result = myRegex.exec(phrase)) !== null) {
    console.log('Matched: ' + result[0]);
}
```

<br>

## **Methods Which Use Regular Expressions**

In this chapter and in the previous one we have already seem what `exec` and `test` do, but they're not the only useful methods we can apply our RegEx knowledge to. There are other methods in `String.prototype` which take advantage of JavaScript RegEx capabilities. These methods are:

* `split`
* `replace`
* `match`
* `search`

The `split` method splits a `String` whenever it finds what has been passed to it as a parameter. If we pass a Regular Expression to it the `String` will be split whenever we find a match.

If we wanted to split a string whenever we found a digit we could simply do this:

```js
const phrase = 'I have 3 dogs, my son has 2 cats.'
const result = phrase.split(/\d/);

console.log(result); // [ 'I have ', ' dogs, my son has ', ' cats.' ]
```

The `replace` method replaces the occurrence of a `String` or `RegExp` matches with the `String` passed to it as the second argument.

If we wanted to replace the words `true` or `false` for `undefined` this is what we would do:

```js
const phrase = 'This is true and that is false.';

// Notice that we're using the `g` flag here in order to replace EVERY match
const result = phrase.replace(/(true|false)/g, 'undefined');

console.log(result); // This is undefined and that is undefined.
```

The `String.prototype.match` is called on a `String` instance and can receive objects such as Strings, RegExps and others.

However, it may not be as simple as it seems. Differently to what happens with the `exec` method it returns every matched `String` at once if you use the `g` flag. If you don't, it returns the first match.

The example below uses a code which is similar to what we've shown above, but this time we call `String.prototype.match` instead of calling `RegExp.prototype.exec`:

```js
const myRegex = /Pokémon (red|blue|yellow|green)/ig;
const phrase = 'I like Pokémon Red, Pokémon Blue, Pokémon Yellow and Pokémon Green';

// Notice that we're using `match` instead of `exec` here
// Since our regex already has the `g` flag we don't need a while loop to get every match
const result = phrase.match(myRegex);
console.log(result.input);

// As you can see, this returns the full match, not only the capture groups
console.log(result); // [ 'Pokémon Red', 'Pokémon Blue', 'Pokémon Yellow', 'Pokémon Green' ]
```

As demonstrated above, `match` returns the full match, not only what has been captured by the capture groups.


<br>

## **Nested Groups**

As you may have imagined already, it is also possible to nest groups.

This is really simple, but I wanted to make I sure I had a section for this in order to avoid leaving you with any doubts regarding this matter.

Whenever you create groups inside other groups their index will be defined by the position of the opening parenthesis.

Take a look at [the example below](https://regex101.com/r/jYay4A/1) and you will surely understand what I meant:

```
(start (nothing|var (bla)+) (end|final))+
 |          |         |          |
 |          |         |          \_ 4th Group
 |          |         \_ 3rd Group
 |          \_ 2nd Group
 \_ 1st Group
```

As you can see, even though a group is nested inside another one, the order or groups is defined by the position of its opening parenthesis.

The regular expression above does the following:

* First it matches the characters `start` literally
* It matches either `nothing` or `var` followed at least one `bla` at least one time
* It matches a whitespace
* It matches either `end` or `final` literally
* It matches all the above at least one time as many times as it can

In the following phrases, these will be the capture groups:

<br>

<h2>start var blabla end</h2>

|Full Match:  | start | var | bla | bla | end |
|-------------|-------|-----|-----|-----|-----|
| **Group 1:** | start | var | bla | bla | end |
| **Group 2:** |       | var | bla | bla |     |
| **Group 3:** |       |     |     | bla |     |
| **Group 4:** |       |     |     |     | end |

<br>

<h2>start var blabla end</h2>

|Full Match:   | start | nothing | end |
|--------------|-------|---------|-----|
| **Group 1:** | start | nothing | end |
| **Group 2:** |       | nothing |     |
| **Group 3:** |       |         |     |
| **Group 4:** |       |         | end |

<br>

As you can notice in the second example, the third capture group didn't match anything since it was nested into the second group and it could only match `bla` words if they have been preceded by "`var`".


<br>

## **Exercises**

As we have done in the last chapter, let's do a few exercises in order to guarantee our knowledge is solid.

* Create a Regular Expression which captures words that repeat themselves after another word - [SOLUTION](https://regex101.com/r/Ubci69/1)
    * `Mark and Mark // Captures "Mark"`
    * `This car is not as big as that car // Captures "as"`
* Create a Regular Expression which captures ONLY whatever repeated word comes after `var` or `identifier` - [SOLUTION](https://regex101.com/r/JQxOeX/1)
    * `var one one // Captures "one"`
    * `identifier two two // Captures "two"`
* Create a Regular Expression which captures the words that come after `start var` until it reaches a `;` or captures `void` if there is no `var` after the `start` word - [SOLUTION](https://regex101.com/r/RgkEVi/1)
    * `start var myVar; // Captures "myVar"`
    * `start void; // Captures "void"`

<br>

## Coming up soon...

In this post we have learned how grouping works, how backreferences work and how capture groups work.

We have also explored the JavaScript `RegExp` API in order for us to use it on the next chapters since we will be doing more complex work.

In the next chapter we will talk about the history of Regular Expressions in order to know how the current engines were born and understand the whole regular expression ecosystem.

**If you have any doubts or thoughts, please share them with me on the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**
