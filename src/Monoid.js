define([
    './core.js',
    './instanceW.js',
    './Ordering/Ordering.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Maybe/Maybe.js',
    './Maybe/Nothing.js',
    './List.js'
],function(jHaskell,instanceW,Ordering,LT,EQ,GT,Maybe,Nothing,List){
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
    jHaskell.extend({
        mempty: function(){ return arguments[0].prototype.mempty; },
        mappend: function (m1,m2) { return m1.mappend(m2); }
    });
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
    instanceW(Monoid,Maybe,{
        mempty: Nothing,
        mappend: function(m){
            if(this === Nothing) { return m; }
            if(m === Nothing) { return this; }
            return new Just(this.value.mappend(m.value));
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
    return Monoid;
});
