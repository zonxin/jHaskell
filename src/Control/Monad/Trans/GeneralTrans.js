define([
    "./globalArg/jHaskell.js",
    "./var/Eq.js",
    "./var/Ord.js",
    "./var/Show.js",
    "./var/Functor.js",
    "./var/Applicative.js"
],function(jHaskell,Functor,Applicative){
    function GeneralTrans(){}
    GeneralTrans.prototype.getMTrans = function() { return this._getMTrans_; };
    // Eq
    jHaskell.instanceW(Eq,GeneralTrans,{
        equal: function (ma) { return this.getMTrans().equal(ma.getMTrans()); }
    });
    // Ord
    jHaskell.instanceW(Ord,GeneralTrans,{
        compare: function(ma) { return this.getMTrans().compare(ma.getMTrans()); }
    });
    // Show 
    jHaskell.instanceW(Show,GeneralTrans,{
        show: function() { return "MonandTrans { getMTrans = " + this.getMTrans().show() + " }"; }
    });
    // Functor
    jHaskell.instanceW(Functor,GeneralTrans,{
        fmap: function(fn) {
            var getMT = this.getMTrans().fmap(function(x){
                return x.fmap(fn);
            });
            return this.constructor.call(undefined,getMT);
        }
    });
    return GeneralTrans;
});
