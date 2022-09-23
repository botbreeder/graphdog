


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


