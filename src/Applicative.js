define([
    './core.js',
    './libES/extendClass.js',
    './Functor.js',
    './instanceW.js',
    './List.js'
],function(jHaskell,extendClass,Functor,instanceW,List){
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

    instanceW(Applicative,List,{
        pure: function (x){ return [x]; },
        applyTo: function (mValue){
            var len1 = this.length,
                len2 = mValue.length,
                len = len1 * len2,
                result = new Array(len),
                i,j,k=0;
            for(i=0;i<len1;i++){
                for(j=0;j<len2;j++){
                    result[k++] = this[i].call(arguments[1],mValue[j]);
                }
            }
            return result;
        }
    });
    instanceW(Applicative,String,{
        pure: function(c) { return c.charAt(0); },
        applyTo: function() { throw this[0] + " is not a function"; }
    });
    return Applicative;
});
