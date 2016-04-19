define([
    './core.js',
    './libES/extendClass.js',
    './Applicative.js',
    './instanceW.js',
    './Maybe/Maybe.js',
    './Maybe/Nothing.js',
    './Maybe/Just.js',
    './Either/Either.js',
    './Either/Left.js',
    './Either/Right.js',
    './List.js'
],function(jHaskell,extendClass,Applicative,instanceW,Maybe,Nothing,Just,Either,Left,Right,List){
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
    jHaskell.extend(Monad.prototype,{
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
    instanceW(Monad,Maybe,{
        bindM: function (fn){
        if(this === Nothing) { return Nothing; }
        return fn.call(null,this.value);
        }
    });
    instanceW(Monad,Either,{
        bindM: function(fn){
            var obj = this.isLeft();
            if(obj) { return new Left(obj.value); }
            obj = this.isRight();
            return fn.call(arguments[1],obj.value);
        }
    });
    instanceW(Monad,List,{
         bindM: function (fn){
            var len = this.length,
                result = [],
                i,ret;
            for(i=0; i<len; i++){
                ret = fn(this[i]);
                if(ret instanceof List){
                    result = result.concat(ret);
                }else{
                    throw "TypeError";
                }
            }
            return result;
        }       
    });
    return Monad;
});
