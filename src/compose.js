define([
    './libES/var/slice.js'
],function(slice){
    function compose(fn1,fn2){
        var args = slice.call(arguments,0);
        return function (x) {
            var i = args.length - 1,r;
            r = x;
            for(; i>=0; i--){
                r = args[i].call(null,r);
            }
            return r;
        };
    }
    return compose;
});
