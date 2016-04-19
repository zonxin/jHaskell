define([
    './core.js',
    './instanceW.js',
    './Maybe/Maybe.js',
    './Maybe/Nothing.js',
    './Maybe/Just.js',
    './Either/Either.js',
    './Either/Left.js',
    './Either/Right.js',
    './List.js',
    './libES/map.js'
],function(jHaskell,instanceW,Maybe,Nothing,Just,Either,Left,Right,List,map){
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
    instanceW(Functor,Maybe,{
        fmap: function (fn){
            if(this === Nothing) { return Nothing; }
            return new Just(fn(this.value));
        }
    });
    instanceW(Functor,Either,{
        fmap: function(fn){
            var obj = this.isLeft();
            if(obj) { return new Left(obj.value); }
            obj = this.isRight();
            return new Right(fn(obj.value));
        }
    });
    instanceW(Functor,List,{ fmap: map });
    instanceW(Functor,String,{ 
        fmap: function(fn) {
            var arr = [],i,len = this.length;
            for(i=0;i<len;i++){ arr.push(fn(this[i])); }
            return arr.join("");
        }
    });
    return Functor;
});

