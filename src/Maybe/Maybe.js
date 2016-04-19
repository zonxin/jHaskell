define([ 
    '../core.js'
],function(jHaskell){
    // data Maybe x = Nothing | Just x
    function Maybe(value){ 
        this.value = value;
    }
    jHaskell.extend(Maybe.prototype,{
        isJust:function(){
            if(this === Nothing) { return false; }
            return {value:this.value};
        },
        toString:function (){
            return this.show();
        }
    });
    // instance Eq a => Eq (Maybe a)
    // instance Ord a => Ord (Maybe a)
    // instance Show a => Show (Maybe a)
    // instance Monoid a => Monoid (Maybe a)
    // instance Functor Maybe
    // instance Applicative Maybe
    // instance Monad Maybe
    return Maybe;
});
