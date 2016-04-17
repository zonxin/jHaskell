define([
    './core.js',
    './libES/extendClass.js',
    './Functor.js'
],function(jHaskell,extendClass,Functor){
    // class Functor f =>  Applicative f where
    //     pure :: a -> f a
    //     (<*>) :: Applicative f => f (a->b) -> f a -> f b
    // Applicative law
    //   1. pure id <*> v = v
    //   2. pure f <*> pure x = pure (f x)
    //   3. u <*> pure y = pure ($ y) <*> u
    //   4. pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
    function Applicative() {}
    extendClass(Applicative,Functor);
    Applicative.prototype.pure = function(a) { throw "Applicative: pure :: a -> f a"; };
    Applicative.prototype.applyTo = function (fn) { throw "Applicative: applied :: Applicative f => f (a->b) -> f a -> f b"; };
    jHaskell.extend({
        pure:function(value) { 
            if(arguments.length < 2){
                throw "jHaskell.pure: Can not extract the type of return";
            }
            return arguments[1].prototype.pure(value); 
        },
        applyTo: function(fn,fvalue){ return fn.applyTo(fvalue); }
    });
    return Applicative;
});
