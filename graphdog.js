


function Graphdog(rules) {
    
    this.root = { children: {}, content: ()=>{} };
    if (rules) this.add(rules);
}



Graphdog.prototype.any = Graphdog.any = Symbol('any');



Graphdog.prototype.add = function(rules) {
    
    for (let rule of rules)
        this.newrule(rule);
};



Graphdog.prototype.newrule = function(rule) {
    
    let current = this.root;
    
    for (let item of rule.head) {
        
        if (!current.children[item]) {
            
            current.children[item] = {
                children: {},
                content: ()=>{}
            };
        }
        current = current.children[item];
    }
    current.content = rule.body;
};



Graphdog.prototype.query = function(input, current = this.root, captures = []) {
    
    if (input.length == 0) {
        return current.content.call(this, captures);
    }
    
    if (current.children[input[0]])
        return this.query(
            input.slice(1),
            current.children[input[0]],
            captures
        );
        
    else if (current.children[this.any]) {

        let newCaptures = Array.from(captures);
        newCaptures.push([]);
        let cpos = newCaptures.length-1;

        for (let i = 0; i < input.length; i++) {
            if (current.children[this.any].children[input[i]]) {
                let result = this.query(
                    input.slice(i),
                    current.children[this.any],
                    newCaptures
                );
                if (result) return result;  
            }
            newCaptures[cpos].push(input[i]);
        }
        return this.query([], current.children[this.any], newCaptures);
    }
};




let any = Graphdog.any;


let rules = [
//    { head: [-2, any, 4], body: c => 'foo' },
//    { head: [-2, any], body: c => 'bazz' },
//    { head: [-2, +2], body: c => 'bar' }
];

for (let i = 0; i < 1000000; i++) {

    let head = [];

    for (let j = 0; j < 2+Math.floor(10*Math.random()); j++)
        head.push(Math.random() < 0.25 ? Math.floor(10*Math.random()) : any);

    if (Math.random()<0.9)
        head.push(Math.floor(10*Math.random()));

    rules.push({ head, body: c => 'i'+i+' ['+head.map(e => e == any ? '*' : e.toString()).join(' ')+'] ['+c.map(a => a.join(' ')).join('/')+']' });
}


let gm = new Graphdog(rules);

while (1) {
    let line = [];
    for (let j = 0; j < 3+Math.floor(20*Math.random()); j++)
        line.push(Math.floor(10*Math.random()));

    let q = gm.query(line)

    if (q) {
        console.log("line:", line.map(e => e.toString()).join(' '));
        console.log("rule:", q, '\n');    
    }
}

//console.log("done", JSON.stringify(gm, null, 4));



