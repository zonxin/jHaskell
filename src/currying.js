define([
    './libES/var/slice.js'
],function(slice){
    function currying(fn){
        var args = slice.call(arguments,1);
        return function (){
            return fn.apply(this,args.concat(slice.call(arguments)));
        };
    }
    return currying;
});
