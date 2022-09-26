![Graphdog](https://github.com/botbreeder/graphdog/raw/main/graphdog.jpg)
Graphdog. Better than Graphmaster.

# What the

I know. I gimped like a pig.

So this is just a parser for my upcoming [Mud](https://en.wikipedia.org/wiki/MUD)BASIC interpreter. Except it works more like a chatbot than like a source code parser. The point is to make it fast and tolerant. It will just spit out the most accurate interpretation of a line of code. Since I want to write code like I make pizza, it will do.

Graphdog will be connected to [EON-Markup](https://github.com/botbreeder/eon-markup), when time comes. This is organic... a forest of giant self-shaking trees, with dancing nodes on the rhythm of a rule engine.

```Javascript

let rules = [
    {
        head: ["FOR", anything, "=", anything, "TO", anything],
        body: c => "FOR LOOP "+JSON.stringify(c)
    },
    {
        head: ["FOR", anything, "=", anything, "TO", anything, "STEP", anything],
        body: c => "FOR LOOP STEP "+JSON.stringify(c)
    },
];

let gdog = new Graphdog(rules);



console.log(
    gdog.query("for I and J = 1 to 10 step 2".split(' '))
);

```
↓↓→↓→↓↓→→→→→→→→→
```
FOR LOOP STEP [["I","and","J"],["1"],["10"],["2"]]
```

Graphdog doesn't take only strings. Any Javascript value can appear in the queried sequences and in the rules. Matching is done based on the [SameValueZero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality) algorithm, because Graphdog's nodes have their children under [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

The `Graphdog.anything` special value means "one or more values, whatever". It's like the wildcard of a glob-pattern, or like the plus-star of an eBNF. But remember: it's not zero or more, it's ONE or more.

### _Mud?_

Why Mud you ask. Actually the ~conscious~ chatty thingies (the breeding bots) are going to be [situated](https://en.wikipedia.org/wiki/Situated) in [Open City](https://opencity.web.app/), an in-the-pipeline Firebase-backed hackable shared environment where, if you're lucky enough, you might even meet a virtual replica of Ryan Reynolds. How cool is that.
