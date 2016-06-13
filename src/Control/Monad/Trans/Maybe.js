define([
    "./globalArg/jHaskell.js",
    "./GeneralTrans.js",
    "./var/Applicative.js",
    "./var/Monad.js",
    "./var/Maybe.js",
    "./var/Just.js"
],function(jHaskell,GeneralTrans,Applicative,Monad,Maybe,Just){
    jHaskell.moduleW("Control.Monad.Trans.Maybe",function(){
        function MaybeT(outerMonad){
            function NewTypeMaybeT(mMaybea){ 
                if(!(this instanceof NewTypeMaybeT)) {
                    return new NewTypeMaybeT(mMaybea);
                }
                this._getMTrans_ = mMaybea; 
            }
            jHaskell.extendClass(NewTypeMaybeT,GeneralTrans);

            // Monad
            jHaskell.instanceW(Monad,NewTypeMaybeT,{
                returnM: function(x) { return NewTypeMaybeT(outerMonad.prototype.returnM(Just(x))); },
                bindM: function(fn) { 
                    var outerVal = this.getMTrans().bindM(function(maybe_value){
                        if(maybe_value === Nothing) { return outerMonad.prototype.returnM(Nothing); }
                        return fn(maybe_value.getMaybe()).getMTrans();
                    });
                    return NewTypeMaybeT(outerVal);
                }
            });
            return NewTypeMaybeT;
        }
        return { MaybeT:MaybeT };
    });
});
