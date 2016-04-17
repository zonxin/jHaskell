define([
    './core.js'
],function(jHaskell){
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
    return Functor;
});

