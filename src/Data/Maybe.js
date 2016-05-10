define([ 
    '../core.js',
    '../instanceW.js',
    '../Eq.js',
    '../Ordering/Ordering.js',
    '../Ordering/LT.js',
    '../Ordering/EQ.js',
    '../Ordering/GT.js'
],function(jHaskell,instanceW,Eq,Ordering,LT,EQ,GT){
    jHaskell.moduleW("Data.Maybe",function(){
        // data Maybe x = Nothing | Just x
        function Maybe(value){ 
            this.value = value;
        }
        function Just(value)
        {
            return new Maybe(value);
        }
        var Nothing = new Maybe(undefined);
        jHaskell.extend(Maybe.prototype,{
            isJust:function(){
                if(this === Nothing) { return false; }
                return {value:this.value};
            },
            toString:function (){
                return this.show();
            }
        });
        // instance Eq a => Eq (Maybe a) where
        instanceW(Eq,Maybe,{
            equal: function (m) {
                if(this === Nothing){
                    return m === Nothing? true:false;
                }else{
                    return this.value.equal(m.value);
                }
            }
        });
        // instance Ord a => Ord (Maybe a)
        instanceW(Ord,Maybe,{
            compare: function(m){
                if(this === Nothing){
                    if(m === Nothing) { return EQ; }
                    else { return LT; }
                }else{
                    if(m === Nothing) { return GT; }
                    else { return this.value.compare(m.value); }
                }
            }
        });
            // instance Show a => Show (Maybe a)
        instanceW(Show,Maybe,{
            show: function() {
                if (this === Nothing) { return "Nothing"; }
                return "Just " + this.value.show();
            }
        });
        // instance Functor Maybe
        instanceW(Functor,Maybe,{
            fmap: function (fn){
                if(this === Nothing) { return Nothing; }
                return new Just(fn(this.value));
            }
        });
        instanceW(Applicative,Maybe,{
            pure: Just,
            applyTo: function (mValue) {
                if(this === Nothing) { return Nothing; }
                return mValue.fmap(this.value);
            }
        });
        // instance Monad Maybe
        instanceW(Monad,Maybe,{
            bindM: function (fn){
            if(this === Nothing) { return Nothing; }
            return fn.call(null,this.value);
            }
        });
        return {
            Maybe:Maybe,Just:Just,Nothing:Nothing, 
            // maybe :: b -> (a -> b) -> Maybe a -> b
            maybe: function(d,fn,ma,r){
                if(ma === jHaskell.Data.Maybe.Nothing) { return d; }
                return fn(ma.value);
            }
        };
    });
    var Maybe = jHaskell.Data.Maybe;
    return Maybe;
});
