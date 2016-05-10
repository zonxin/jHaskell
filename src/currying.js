define([
    './libES/var/slice.js',
    './libES/extendObject.js'
],function(slice,extendObject){
    function currying(fn){
        var args = slice.call(arguments,1);
        return function (){
            return fn.apply(this,args.concat(slice.call(arguments)));
        };
    }
    currying.currying = currying;
    extendObject(currying,{
        currying2:function(fn){ return function(a){ return function (b) {return fn(a,b);}; }; },
        currying3:function(fn){ return function(a){ return function (b) { return function(c) { return fn(a,b,c);}; }; }; },
        currying4:function(fn){ return function(a){ return function (b) { 
            return function(c){ return function(d){ return fn(a,b,c,d);
        }; }; }; };},
        currying5:function(fn){ return function(a){ return function (b) { 
            return function(c){ return function(d){ return function (e) {
                return fn(a,b,c,d,e);
        }; }; }; };};},
        currying6:function(fn){ return function(a){ return function (b) { 
            return function(c){ return function(d){ return function (e) {
            return function(f){
                return fn(a,b,c,d,e,f);
        }; }; }; };};};},
        currying7:function(fn){ return function(a){ return function (b) { 
            return function(c){ return function(d){ return function (e) {
            return function(f){ return function(g){
                return fn(a,b,c,d,e,f,g);
        }; }; }; };};};};},
        currying8:function(fn){ return function(a){ return function(b) { 
            return function(c){ return function(d){ return function(e) {
            return function(f){ return function(g){ return function(h) {
                return fn(a,b,c,d,e,f,g,h);
        }; }; }; };};};};};}
    });
    return currying;
});
