define([
    './var/slice.js'
],function(slice){
    var bind = Function.prototype.bind || function(thisArg){
        var args = slice.call(arguments,1);
        var fn = this;
        return function(){
            return fn.apply(thisArg,args.concat(slice.call(arguments)));
        };
    };
    Function.prototype.bind = bind;
    return bind;
});
