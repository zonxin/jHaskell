define([
    "./globalArg/jHaskell.js",
    "./GeneralTrans.js",
    "./var/Applicative.js",
    "./var/Monad.js",
    "./var/List.js"
],function(jHaskell,GeneralTrans,Applicative,List){
    jHaskell.moduleW("Control.Monad.Trans.List",function(){
        function ListT(outerMonad){
            function NewTypeListT(m){ 
                if(!(this instanceof NewTypeListT)) {
                    return new NewTypeListT(m);
                }
                this._getMTrans_ = m; 
            }
            jHaskell.extendClass(NewTypeListT,GeneralTrans);
            // Monad
            jHaskell.instanceW(Monad,NewTypeListT,{
                returnM: function(x) { return NewTypeListT(outerMonad.prototype.returnM([x])); },
                bindM: function(fn) { 
                    var outerVal = this.getMTrans().bindM(function(list_value){
                        var i = 0,acc = outerMonad.prototype.returnM([]),outer_result;
                        function concatResult(list_acc){
                            return outer_result.bindM(function(list_result){
                                if(!(list_result instanceof Array)) { 
                                    throw "ListT.bindM: the type of fn returned is not list;"; 
                                }
                                return outerMonad.prototype.returnM(list_acc.concat(list_result));
                            });
                        }

                        for(i=0; i<list_value.length; i++){
                            outer_result = fn(list_value[i]).getMTrans();
                            acc = acc.bindM(concatResult);
                        }
                        return acc;
                    });
                    return NewTypeListT(outerVal);
                }
            });
            return NewTypeListT;
        }
        return { ListT:ListT };
    });
});
