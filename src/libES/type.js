define([
    './forEach.js',
    './var/class2type.js'
],function(forEach,class2type){
    forEach.call("Boolean Number String Function Array Date RegExp Object Error".split(" "),
                 function(name,i){
                     class2type["[object " + name + "]"] = name.toLowerCase();
                 });
    // type:: a -> String
    function type(obj)
    {   
        if(obj === null) { return obj + ""; }
        return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
    }
    return type;
});
