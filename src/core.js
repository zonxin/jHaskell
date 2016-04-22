define([
    './libES/extendObject.js',
    './currying.js',
    './compose.js',
    './instanceW.js'
],function (extendObject,currying,compose,instanceW){

    var jHaskell = {
        extend:extendObject,
        currying:currying,
        compose:compose,
        instanceW:instanceW,
        id: function (x) { return x; },
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
        }; }; }; };};};};};},
        importAs: function(mod,target){
            var k;
            if(arguments.length === 0) {
                mod = jHaskell;
                target = global;
            }else if(arguments.length === 1){
                target = mod;
                mod = this;
            }
            return extendObject(target,mod);
        }
    };
    // ================= end core ======================================
    return jHaskell;
});
