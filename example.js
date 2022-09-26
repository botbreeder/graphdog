
const Graphdog = require("./graphdog.js");

let anything = Graphdog.anything;



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
    gdog.query("for UJUJ = 1 to 10 step 2".split(' '))
);
