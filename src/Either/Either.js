define([
    '../core.js'
],function(jHaskell){
    // data Either a b = Left a | Right b
    function Either(){}
    jHaskell.extend(Either.prototype,{
        isLeft:function() {
            if(this._lr_ === "left") { return {value:this.left}; }
            return false;
        },
        isRight: function() {
            if(this._lr_ === "right") { return {value:this.right}; }
        },
        toString: function() { return this.show(); }
    });
    // instance Eq a => Eq (Either a)
    // instance Ord a => Ord (Either a)
    // instance Show a => Show (Either a)
    // instance Monoid a => Monoid (Either a)
    // instance Functor Either
    // instance Applicative Either
    // instance Monad Either
    return Either;
});
