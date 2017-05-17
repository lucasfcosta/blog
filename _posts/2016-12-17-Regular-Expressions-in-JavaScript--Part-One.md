---
layout: post
title : "Everything You Need to Know About Regular Expressions In JavaScript - Part One: Basic Concepts"
author: Lucas Fernandes da Costa
tags : regex regular expressions
---

<br>

When I was just starting out with JavaScript and programming in general I always thought using Regular Expressions was just too complicated and then I resorted to many crazy combinations of String manipulation methods, which didn't always do the job the way I wanted it to be done.

In this series of posts I will explain the basic concepts related to regular expressions, their history, how a RegEx engine works and all the theory behind it, which will also be useful to you when thinking about how to create your own powerful and efficient regular expressions.

And since this series aim to be very useful we will also talk about Regex related methods in JavaScript and do some benchmarking and research on its performance against common String manipulation methods.

All of these topics will, of course, be filled with lots of examples so you can apply this knowledge as soon as possible.

**In this first post we will talk about what is a Regular Expression and all the basic concepts related to it in order for us to be able to move forward and develop more complex knowledge.**

I also highly recommend you to use [RegEx101.com](https://regex101.com) when reading this article. This amazing tool not only lets you test your regular expressions but it also shows every single rule in detail.

**Disclaimer:** since this post is geared towards JavaScript developers I will not be talking about features which are not supported by JavaScript's RegEx engine.


<br>

## **What is a regular expression?**

I'm a big fan of Wikipedia definitions because they're very simple yet informative, so here [it](https://en.wikipedia.org/wiki/Regular_expression) goes:

> A regular expression, regex or regexp (sometimes called a rational expression) is, in theoretical computer science and formal language theory, **a sequence of characters that define a search pattern**. Usually this pattern is then used by String searching algorithms for "find" or "find and replace" operations on Strings.

Basically, by using Regular Expressions we are able to describe character patterns and then identify them and do whatever we want with those matches.

Regular expressions can be use for a wide variety of applications, from a simple `vIM`/`sed` String find/replace command to building complex compilers. **In the excellent book called [Mastering Regular Expressions](https://www.amazon.com/dp/0596528124/ref=olp_product_details?_encoding=UTF8&me=) the autor, Jeffrey E. F. Friedl, uses regular expressions to define a pattern which will be used to identify doubled words and then highlight and correct them**. Personally I think this is a great first example and I also highly recommend you to buy that book.

**Regular expressions, of course, aren't an exclusive JavaScript feature, although there may be different engines interpreting the regular expressions you write depending on the language you are using, the basic rules and the correct way of thinking about regular expressionss can be applied to virtually every language**.

To craft regular expressions there are specific syntax rules and characters we will explore later, for now just keep in mind what a RegEx is.

<br>

## **Regular Expressions' Components**

**Regular Expressions are made of two things: metacharacters and normal characters.**

Metacharacters are special characters used to identify and express certain rules, while normal characters are just the "parameters" to those rules. You can also think of metacharacters as a language's grammar and normal characters as those language's words. **One defines the format (metacharacters) and the other defines a content (normal characters).**

Let's begin by doing a plain text search and replace. In this simple example we will just replace the word `sad` by the word `happy`. In order to create a Regular expression in JavaScript all we've gotta do is write it inside `/` delimiters, so please be aware that the first and the last `/` characters are not part of our regular expression.

For this example we will use the `String.prototype.replace` method, which takes a regular expression as its first argument and a String as its second one. When there's a match of the given RegEx it will be replaced by the given String.

```js
const phrase = 'Maria was sad, but her mom was not sad too.';
const newPhrase = phrase.replace(/sad/, 'happy');

console.log(newPhrase); // Maria was happy, but her mom was not sad too.
```

Did you notice how we only ended up replacing the first occurrence of the word "`sad`"? This happened because we didn't tell that **every** match of that Regular Expression should be replaced. In order to do that we need to add the flag "`g`" to our Regular Expression, so we will simply put the letter "`g`" right after our regular expression. Take a look at our example after applying this fix:

```js
const phrase = 'Maria was sad, but her mom was not sad too.';

// Now we'll add `g` after our regular expression in order for it to match every occurrence
const newPhrase = phrase.replace(/sad/g, 'happy');

console.log(newPhrase); // Maria was happy, but her mom was not happy too.
```

The "`g`" flag is not the only one we've got in JavaScript, so here goes the list of every available flag:

* `g` (**G**lobal) - Doesn't return after the first match
* `m` (**M**ulti Line) - `^` and `$` match start/end of line
* `i` (**I**nsensitive) - Makes the regex case-insensitive
* `y` (Stick**y**) - Proceed matching from where previous match ended only
* `u` (**U**nicode) - Match with full unicode

Don't worry if you didn't understand what every single one of this flag does for now, we will get into more detail later.

In the previous example you may have noticed we didn't use any metacharacters, we used normal characters only. Now let me show you what a metacharacter is by adding it to an example. In this case I'll demonstrate the use of `^` and `$`, which are both metacharacters. This is what they do:

* `$` matches the end of a String
* `ˆ` matches the start of a String

This means whenever you have a `$` in your regular expression it means that the end of a String must be at that position for us to find a match. The inverse happens for `^` as it matches the start of a String.

In the example below we will use the `RegExp.prototype.test` method to check if a given String contains an occurrence matching our regular expression.

```js
const phrase = 'Hello, Chris, how are you?';

// First let's check if our phrase STARTS with 'Hello'
const startsWithHello = (/^Hello/).test(phrase);
console.log(startsWithHello); // true

// Now let's check if our phrase ENDS with a '?'
const isAQuestion = (/\?$/).test(phrase);
console.log(isAQuestion);
```

As you can see in the example above, the `$` and `^` metacharacters match **positions** instead of any actual text. **Metacharacters used to match specific positions or boundaries are called anchors**.

Pay attention to what we had to do when checking if our `phrase` ended with a `?`. We couldn't simply write `/?/` because `?` is a metacharacter too! **Whenever you want to turn metacharacters into normal characters you should just escape them by adding `\` in front of that metacharacter.**

In this section it's also important to talk about another kind of anchor metacharacters: word boundaries. **In JavaScript, word boundaries are represented by `\b` and they match the start or the end a word**. They're useful whenever you are trying to find a single word and you don't want to have a match whenever it is contained by another word. If you were searching for the word `sit`, for example you wouldn't want your regular expression to indicate a match in the words `site` and `deposit`. In that case you would need to add word boundaries to your regex, just like this: `\bsit\b`. Now this regular expression will only match the `sit` word and nothing else.

**There are lots of metacharacters, for now you don't need to know what each one of them does, just remember the difference between metacharacters and normal characters**. We will go through each one in detail on the next sections.

<br>

## **Character Classes**

**Character Classes allow you to match groups of possible characters you want at that point in the match.**

Let's say you want to match both "`sad`" and "`bad`". As you can notice, the difference between these two words consists of a single letter at the same position (the first), so, in order to do that, we'd use the following regular expression: `[bs]ad`.

Let's dissect the `[bs]ad` regular expression:

* `[bs]` indicates that either "`b`" or "`s`" should be matched at this position
* `ad` indicates that "`b`" or "`s`" should be immediately followed by "`ad`"

Just think that there is an "or" between the list of characters inside `[]`. In the example above we could read that regular expression as: "match the characters `b` or `s` and then match the characters `ad`".

**Character classes also have their own special metacharacters and allow us to do things such as creating character ranges** thus we don't need to list every single character in that range. To create character ranges you just need to separate the first and last character in that desired range by a "`-`" character, which when used inside a character class is a metacharacter used to delimit ranges but when used outside of it just matches the normal "`-`" (dash) character.

If we wanted to create a regular expression to match hexadecimal numbers we could write it like: `[A-Fa-f0-9]`. Again, let's dissect this:

* `[]` indicates a character class, this means we expect something to match either one of the elements inside it. Which in this case are:
    * `A-F` indicates any letter character from uppercase `A` to uppercase `F`
    * `a-f` indicates any letter character from lowercase `a` to lowercase `f`
    * `0-9` indicates any digit from 0 to 9

As you could have noticed, we used both the uppercased `A-F` range and the lowercase `a-f` range but we could have just added the "`i`" flag to this RegEx and use only one of these ranges and it would work the same way.

```js
// Let's have a hexadecimal with both uppercase and lowercase characters
const hexString = 'cC07C9'; // This represents the decimal: 13371337

// Now we will create two Regular Expressions
// One with the `i` flag
// And the other with multiple ranges for upper and lowercase characters
const insensitiveFlagRegExp = /[a-f0-9]/i;
const multipleRangesRegExp = /[A-Fa-f0-9]/;

// Notice how both regular expressions work the same:
console.log(insensitiveFlagRegExp.test(hexString)); // true
console.log(multipleRangesRegExp.test(hexString)); // true
```

I have already said that character classes have their own special metacharacters, but let me clarify that sentence even more. Do you remember the "`^`" metacharacter? When used in the beginning a character class it does not match the start of the line anymore, instead it negates the content of that character class. If we wanted to match every digit greater than 5, for example, we could simply write "`[^0-5]`". This regular expressions basic tells the regular expression engine that it should match everything that is **not** in this range (`0` to `5`). Therefore we can conclude that **the same metacharacters can have different meanings when used inside or outside character classes**.

Another interesting consideration we shall make, as Jeffrey Friedl brilliantly emphasized in his book, is that when using a negated character class, `[^0-5]` for example, it means "match a character that is not listed" and not "do not match what is listed". So if we had a regular expression which was something like `t[^a-c]` it would indicate a match in the word `site` but it would not indicate a match in the word `sit`. That happens because in the word `site` we match the `t` character and then we are able to match something that is not `a`, `b` or `c`, but in the word `sit` we only match `t` and then we cannot find anything that's not `a`, `b` or `c`.


<br>

## **Meta Sequences**

**Meta sequences represent certain kinds of characters we want to match, so instead of listing every single one of them we can just use a meta sequence to make our job easier.**

Remember when we had to create a character class and then add a range from 0 to 9 inside it to match any digits? If we had known about meta sequences we could just write our regular expression as `\d` and then it would match any digit. If otherwise we wanted to match non-digit characters only we could simply use `\D` (with capital `D`) in our regular expression.

Let's say we wanted a regular expression to indicate a match whenever a string had a digit in it. This is what we would do:

```js
const phrase = 'I am an el1t3 hack3r, be cau7105.';

// This regex matches a digit
const myRegex = /\d/;

const hasADigit = myRegex.test(phrase);

console.log(hasADigit); // true
```

We could go even further and create a regular expression to indicate a match whenever we had a lowercase letter followed by a number:

```js
const phrase = `I am an el1t3 hack3r, be cau7105.`;

// This regex matches a lowercase letter followed by a digit
// It could also have been written as /\D\d/
const myRegex = /[a-z]\d/;

const hasADigit = myRegex.test(phrase);

console.log(hasADigit); // true
```

**One of the most useful meta sequences is the one indicated by the `.` (dot) metacharacter, which matches any character**. This is useful, for example, when you want to match any letter between two other ones, as in the regular expression `a.e`, which indicates a match in the words `awesome` and `ahead`.

There are lots of meta sequences and since they're really easy to understand, here is a list of some other simple meta sequences:

* `.` matches any single character
* `\s` matches any whitespace character (`tabs`, `newlines` and `spaces`)
* `\S` matches any non-whitespace characters
* `\d` matches any digit
* `\D` matches any non-digit character
* `\w` matches any word character (uppercase letters, lowercase letters, digits and underscore)
* `\W` matches any non-word characters
* `\v` matches newlines and vertical tabs

For now just make sure you memorize those above, we will talk in depth about other meta sequences and unicode later.


<br>

## **Quantifiers**

**The quantifier metacharacters are responsible for indicating quantities of characters, of character classes or of groups (which we will talk about later).**

**The "`|`" metacharacter means "`or`" and separates match possibilities in a regular expression**. If you wanted, for example, a regular expression that indicated a match whenever it found the characters "`g`" or "`b`" followed by "`ad`" you'd write the following: `g|bad`. This metacharacter can also be very useful inside group delimiters, which we will talk about later.

**To match optional characters you can use the "`?`" metacharacter right after the characters you want to be optional**. If you wanted to match both the words `behavior` (american english) and `behaviour` (anywhere else) you could simply use the following regular expression: `behaviou?r`. This regexp will be able to match the characters `behavio`, match an `u` if it exists and then match an `r`.

**In order to match one or more of any character we need to use the "`+`" metacharacter**. If we wanted to identify, for example, words that end with one or multiple `a` characters we would need the following regular expression: `a+$`. This tells our regular expression engine to match one or more `a` characters at the end of a line.

Another interesting quantifier is the "`*`" quantifier, which matches none or as many elements as possible. If we wanted, for example, to match words that start with `si` and end with `t` (including the word `sit`) we could just write: `\bsi.*t\b`. Since this regular expression is a little bit more complex than the other ones let's break it down into smaller parts:

* The word boundary (`\b`) matches the start of a word
* `si` matches the characters `si`
* The `.` metacharacter matches any character and the `*` quantifier indicates any characters should be matched none or as many times as possible
* `t` matches the character `t`
* The word boundary (`\b`) matches the end of a word

At last, but not least we also need to talk about the interval quantifiers. **Interval quantifiers can be used to provide an specific minimum and maximum of times something should be matched**. **To create an interval quantifier we must follow the pattern: `{min,max}`**. If we wanted to match, for example, words that ended with a minimum of two and a maximum of four `e` characters, we could use the following regular expression: `e{2,4}$`. This would identify matches in the words `bee`, `beee` and `beeee`, but not in `be` or `beeeee` (which has 5 `e` characters by the way).


<br>

## **Exercises**

One cannot simply learn how to use regular expressions without practicing it, so it's about time we have some exercises.

For these ones I made sure they could be solved by using the knowledge we've gathered in this post only. However, if you are feeling anxious and want to try researching and using other possibilities, feel free to do it.

Next to each task is the link to its solution at [RegEx101.com](https://regex101.com). I also highly recommend you to use that website when solving these exercises.

* Create a Regular Expression which matches any word that starts with `a` - [SOLUTION](https://regex101.com/r/PEdWzA/1)
    * `after // MATCH!`
    * `arrive // MATCH!`
    * `block // NO MATCH!`
* Create a Regular Expression which matches any word that starts and ends with `b` - [SOLUTION](https://regex101.com/r/6wN5he/1)
    * `blob // MATCH!`
    * `bob // MATCH!`
    * `bounce // NO MATCH!`
* Create a Regular Expression which matches hexadecimal numbers with four digits - [SOLUTION](https://regex101.com/r/oHvdPd/1)
    * `8128 // MATCH!`
    * `A0BC // MATCH!`
    * `T01B // NO MATCH!`
* Create a Regular Expression which matches opening HTML header tags (from `h1` to `h6`) - [SOLUTION](https://regex101.com/r/J9hs1q/1)
    * `<h1> // MATCH!`
    * `<h3> // MATCH!`
    * `<h6> // MATCH!`
    * `h7 // NO MATCH!`
    * `<h7> // NO MATCH!`
* Create a Regular Expression which matches quotes (which are indicated by being surround by double-quotes at the start and the end of a string) - [SOLUTION](https://regex101.com/r/Ex5EZx/1)
    * `"One small step for man, one giant leap for mankind" // MATCH!`
    * `'Not all those who wander are lost' // NO MATCH!`
    * `Then he said: "Not all those who wander are lost" // NO MATCH!`
* Create a Regular Expression which matches money amounts written in the format `${DOLLARS}.{CENTS}` - [SOLUTION](https://regex101.com/r/b9p6PJ/1/)
    * `$50.99 // MATCH!`
    * `$01.30 // MATCH!`
    * `$10000.00 // MATCH!`
    * `120.00 // NO MATCH!`
    * `$10.0010 // NO MATCH!`

<br>

## Coming up soon...

In this post we have learned the very basics about regular expressions: what is a regular expression, the kinds of metacharacters and what they do, how to combine them and a few methods to test them in JavaScript.

In the next post we will talk about grouping and some other RegEx related methods in JavaScript. You better be prepared!

**If you have any doubts or thoughts, please share them with me on the comments below or reach me at [@lfernandescosta on twitter](https://twitter.com/lfernandescosta)**

