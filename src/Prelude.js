define([
    './core.js',
    './Unit.js',
    './Ordering/EQ.js',
    './Maybe/Maybe.js',
    './Maybe/Nothing.js',
    './Maybe/Just.js',
    './Either/Either.js',
    './Either/Left.js',
    './Either/Right.js'
],function(jHaskell,Unit,EQ,Maybe,Nothing,Just,Either,Left,Right){

    var Prelude = {
        elem: function(a,list){
            var len = list.length, i;
            for(i=0;i<len;i++){
                if( list[i].equal(a)){ return true; }
            }
            return false;
        },
        guard:function(b){ return b? [Unit]:[]; },
        // maybe :: b -> (a -> b) -> Maybe a -> b
        maybe: function(d,fn,ma,r){
            if(ma === Nothing) { return d; }
            return fn(ma.value);
        },
        // either :: (a -> c) -> (b -> c) -> Either a b -> c
        either: function(fa,fb,eab,c){
            var itis = eab.isLeft();
            if(itis){ return fa(itis.value); }
            itis = eab.isRight();
            return fb(itis.value);
        }
    };

    return Prelude;
});
