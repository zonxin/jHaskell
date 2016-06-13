define([
    "./globalArg/jHaskell.js",
    "./GeneralTrans.js",
    "./var/Applicative.js",
    "./var/Monad.js",
    "./var/Either.js",
    "./var/Right.js"
],function(jHaskell,GeneralTrans,Applicative,Either,Right){
    jHaskell.moduleW("Control.Monad.Trans.Either",function(){
        function EitherT(outerMonad){
            function NewTypeEitherT(m){ 
                if(!(this instanceof NewTypeEitherT)) {
                    return new NewTypeEitherT(m);
                }
                this._getMTrans_ = m; 
            }
            jHaskell.extendClass(NewTypeEitherT,GeneralTrans);
            // Monad
            jHaskell.instanceW(Monad,NewTypeEitherT,{
                returnM: function(x) { return NewTypeEitherT(outerMonad.prototype.returnM(Right(x))); },
                bindM: function(fn) { 
                    var outerVal = this.getMTrans().bindM(function(either_value){
                        if(either_value.isLeft()) { return outerMonad.prototype.returnM(either_value); }
                        return fn(either_value.getEither()).getMTrans();
                    });
                    return NewTypeEitherT(outerVal);
                }
            });
            return NewTypeEitherT;
        }
        return { EitherT:EitherT };
    });
});
