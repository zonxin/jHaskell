define([
    './var/hasOwn.js'
],function(hasOwn){
    function extendClass(child,parent) {
        var key;
        for( key in parent){
            if(hasOwn.call(parent,key)){
                child[key] = parent[key];
            }
        }
        function Ctor(){this.constructor = child;}
        Ctor.prototype = parent.prototype;
        child.prototype = new Ctor();
        child.SUPER = parent.prototype;
    }
    return extendClass;
});

