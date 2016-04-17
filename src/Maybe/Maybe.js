define([ 
    '../libES/extendClass.js',
    '../libES/extendObject.js',
    '../Monad.js',
    '../Eq.js',
    '../Ord.js',
    '../Ordering/LT.js',
    '../Ordering/EQ.js',
    '../Ordering/GT.js',
    '../Monoid.js'
],function(extendClass,extendObject,Monad,Eq,Ord,LT,EQ,GT,Monoid){
    // data Maybe x = Nothing | Just x
    function Maybe(value){ 
        this._valid = true;
        this.value = value;
    }
    extendClass(Maybe,Monad);
    extendObject(Maybe.prototype,Eq.prototype,Ord.prototype,Monoid.prototype,{
        isJust:function(){
            if(this === Nothing) { return false; }
            return {value:this.value};
        },
        // Functor
        fmap: function (fn){
            if(this === Nothing) { return Nothing; }
            return new Just(fn(this.value));
        },
        // Applicative
        pure: Just,
        applyTo: function (mValue) {
            if(this === Nothing) { return Nothing; }
            return mValue.fmap(this.value);
        },
        // Monad
        // Maybe.prototype.returnM = Maybe.prototype.pure;
        // bind:: Maybe a -> (a -> Maybe b) -> Maybe b
        bindM: function (fn){
        if(this === Nothing) { return Nothing; }
        return fn.call(null,this.value);
        },
        // Eq
        equal: function (m) {
            if(this === Nothing){
                return m === Nothing? true:false;
            }else{
                return this.value.equal(m.value);
            }
        },
        // Ord
        compare: function(m){
            if(this === Nothing){
                if(m === Nothing) { return EQ; }
                else { return LT; }
            }else{
                if(m === Nothing) { return GT; }
                else { return this.value.compare(m.value); }
            }
        },
        // Monoid
        mempty: Nothing,
        mappend: function(m){
            if(this === Nothing) { return m; }
            if(m === Nothing) { return this; }
            return new Just(this.value.mappend(m.value));
        },
        // show :: a -> String
        show: function() {
        if (this === Nothing) { return "Nothing"; }
        return "Just " + this.value.show();
        }
    });
    Maybe.prototype.toString = Maybe.prototype.show;
    // Functor
    
    var Nothing = new Maybe(undefined);
    Nothing._valid = false;
    function Just(value)
    {
        return new Maybe(value);
    }
    Maybe.Nothing = Nothing;
    Maybe.Just = Just;
    return Maybe;
});
