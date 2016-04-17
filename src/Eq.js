define([
    './libES/extendObject.js'
],function(extendObject){
    // class Eq a where
    //     (==),(/=)  :: a -> a-> Bool
    //     x /= y = not (x==y)
    //     x == y = not (x/=y)
    function Eq() {}
    extendObject(Eq.prototype,{
        equal: function(e) { return !this.unequal(e); },
        unequal: function(e) { return !this.equal(e); }
    });
    return Eq;
});
