![Graphdog](https://github.com/botbreeder/graphdog/raw/main/graphdog.jpg)
Graphdog. Better than Graphmaster.

# What the

I know. I gimped like a pig.

So this is just a parser for my upcoming [Mud](https://en.wikipedia.org/wiki/MUD)BASIC interpreter. Except it works more like a chatbot than like a source code parser. The point is to make it fast and tolerant. It will just spit out the most accurate interpretation of a line of code. Since I want to write code like I make pizza, it will do.

Graphdog will be connected to EON-Markup, when time comes. This is organic... a forest of giant self-shaking trees, with dancing nodes on the rhythm of a rule engine.

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
    gdog.query("for I = 1 to 10 step 2".split(' '))
);

```
