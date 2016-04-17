define([],function(){
    function Monoid() {}
    // class Monoid a where
    //     mempty :: a
    //     mappend :: a -> a -> a
    //     mconcat :: [a] -> a
    Monoid.prototype = { 
        constructor: Monoid,
        mempty:undefined,
        mappend: function () { throw "Monoid.mappend: there is no implementation."; }
    };
    return Monoid;
});
