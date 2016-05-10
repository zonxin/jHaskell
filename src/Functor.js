define([
    './core.js',
    './instanceW.js',
    './List.js',
    './libES/map.js'
],function(jHaskell,instanceW,List,map){
    // class Functor f where
    //     fmap :: (a -> b) -> f a -> f b
    // Functor law
    //   1. fmap id = id
    //   2. fmap (g.f) = fmap f . fmap g
    function Functor() {}
    Functor.prototype.fmap = function (fn){ throw "Functor: fmap :: (a -> b) -> f a -> f b;"; };
    jHaskell.extend({
        fmap:function(fn,fvalue){ return fvalue.fmap(fn); }
    });


    instanceW(Functor,List,{ fmap: map });
    instanceW(Functor,String,{ 
        fmap: function(fn) {
            var arr = [],i,len = this.length;
            for(i=0;i<len;i++){ arr.push(fn(this[i])); }
            return arr;
        }
    });
    return Functor;
});

