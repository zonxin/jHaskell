define([
    './core.js',
    './libES/extendClass.js',
    './libES/extendObject.js',
    './Applicative.js'
],function(jHaskell,extendClass,extendObject,Applicative){
    // Class Applicative m => Monad m where
    //     return :: a -> m a
    //     (>>=) :: m a -> (a -> m b) -> m b
    //     (>>) :: m a -> m b -> m b
    //  Monad law
    //    1. m >>= return     =  m                          -- right unit
    //    2. return x >>= f   =  f x                        -- left unit 
    //    3. (m >>= f) >>= g  =  m >>= (\x -> f x >>= g)    -- associativity
    function Monad(){}
    extendClass(Monad,Applicative);
    extendObject(Monad.prototype,{
        returnM: function (x) { return this.pure(x); },
        bindM: function (fn) { throw "Monad: bindM :: m a -> (a -> m b) -> m b"; },
        // a >> b = a >>= \_ -> b
        thenM: function (mValue) { return this.bindM(function(){ return mValue; }); }
    });
    jHaskell.extend({
        returnM: function(value){ 
            if(arguments.length < 2){
                throw "jHaskell.returnM: Can not extract the type of return";
            }
            return arguments[1].prototype.returnM(value); 
        },
        bindM: function(mValue,fn) { return mValue.bindM(fn); },
        thenM: function(ma,mb) { return ma.thenM(mb); }
    });
    return Monad;
});
