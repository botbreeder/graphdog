


function Graphdog(rules) {
    
    this.root = { children: new Map(), content: ()=>{} };
    if (rules) this.add(rules);
}



Graphdog.prototype.anything = Graphdog.anything = Symbol('anything');



Graphdog.prototype.add = function(rules) {
    
    for (let rule of rules)
        this.newrule(rule);
};



Graphdog.prototype.newrule = function(rule) {
    
    let current = this.root;
    
    for (let item of rule.head) {
        
        if (!current.children.has(item)) {
            
            current.children.set(item, {
                children: new Map(),
                content: ()=>{}
            });
        }
        current = current.children.get(item);
    }
    current.content = rule.body;
};



Graphdog.prototype.query = function(input, current = this.root, captures = []) {
    
    if (input.length == 0) {
        return current.content.call(this, captures);
    }
    
    if (current.children.has(input[0]))
        return this.query(
            input.slice(1),
            current.children.get(input[0]),
            captures
        );
        
    else if (current.children.has(this.anything)) {

        let newCaptures = Array.from(captures);
        newCaptures.push([]);
        let cpos = newCaptures.length-1;

        for (let i = 0; i < input.length; i++) {
            if (current.children.get(this.anything).children.get(input[i])) {
                let result = this.query(
                    input.slice(i),
                    current.children.get(this.anything),
                    newCaptures
                );
                if (result) return result;  
            }
            newCaptures[cpos].push(input[i]);
        }
        return this.query([], current.children.get(this.anything), newCaptures);
    }
};



if (module) module.exports = Graphdog;