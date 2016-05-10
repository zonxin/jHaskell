define([
    '../core.js',
    '../instanceW.js',
    '../Ordering/Ordering.js',
    '../Ordering/LT.js',
    '../Ordering/EQ.js',
    '../Ordering/GT.js',
    '../List.js',
    './Maybe.js'
],function(jHaskell,instanceW,Ordering,LT,EQ,GT,List,Maybe){
    jHaskell.moduleW("Data.Monoid",function(){
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
        instanceW(Monoid,Ordering,{
            mempty: EQ,
            mappend:function(o) {
                if(this === LT) { return LT; }
                else if(this === EQ) { 
                    if(o instanceof Ordering) { return o; }
                    throw "Ordering.mappend: TypeError";
                }else{return GT; }
            }
        });
        // instance Monoid a => Monoid (Maybe a) where
        instanceW(Monoid,Maybe.Maybe,{
            mempty: Maybe.Nothing,
            mappend: function(m){
                if(this === Maybe.Nothing) { return m; }
                if(m === Maybe.Nothing) { return this; }
                return new Maybe.Just(this.value.mappend(m.value));
            }
        });
        instanceW(Monoid,List,{
            mempty:[],
            mappend:function(list){
                if(!(list instanceof Array)){ throw "List.mappend:TypeError"; }
                return this.concat(list);
            }
        });
        instanceW(Monoid,String,{
            mempty:"",
            mappend: function(s) { return this.toString() + s.toString(); }
        });
        return jHaskell.extend({},{
            Monoid: Monoid,
            mempty: function(){ return arguments[0].prototype.mempty; },
            mappend: function (m1,m2) { return m1.mappend(m2); }
        });
    });
    return jHaskell.Data.Monoid;
});
