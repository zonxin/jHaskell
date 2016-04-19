define([
    './core.js',
    './instanceW.js',
    './Void.js',
    './Bool/Bool.js',
    './Ordering/Ordering.js',
    './Float.js',
    './Maybe/Maybe.js',
    './Maybe/Nothing.js',
    './Either/Either.js',
    './List.js'
],function(jHaskell,instanceW,Void,Bool,Ordering,Float,Maybe,Nothing,Either,List){
    // class Eq a where
    //     (==),(/=)  :: a -> a-> Bool
    //     x /= y = not (x==y)
    //     x == y = not (x/=y)
    function Eq() {}
    jHaskell.extend(Eq.prototype,{
        equal: function(e) { return !this.unequal(e); },
        unequal: function(e) { return !this.equal(e); }
    });
    jHaskell.extend({
        equal: function(e1,e2) { return e1.equal(e2); },
        unequal: function(e1,e2) { return e1.unequal(e2); }
    });
    // instance Eq () where
    instanceW(Eq,Void,{
        equal: function(e) { 
            if(e === Void) { return true; } 
            throw "Void.equal: TypeError";
        }
    });
    // instance Eq Bool where
    instanceW(Eq,Bool,{
        equal: function(e) { return this.valueOf() === e.valueOf(); }
    });
    // instance Ordering where
    instanceW(Eq,Ordering,{
        equal:function(e) { return this === e; }
    });
    // instance Eq Float where
    instanceW(Eq,Float,{
        equal: function(e) { return this.valueOf() === e.valueOf(); }
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
    // instance (Eq a, Eq b) => Eq (Either a b) where
    instanceW(Eq,Either,{
        equal: function (e) {
            var obj1 = this.isLeft(),
                obj2 = e.isLeft();
            if(obj1 && obj2) { return obj1.value.equal(obj2.value); }
            if(obj1 && !obj2) { return false; }
            obj1 = this.isRight();
            obj2 = e.isRight();
            if(obj1 && obj2) { return obj1.value.equal(obj2.value); }
            return false;
        }
    });
    // instance Eq a => Eq [a] where
    instanceW(Eq,List,{
        equal: function(list){
            var len1 = this.length,
                len2 = list.length,
                i;
            if(len1 === len2){
                for(i=0;i<len1;i++){
                    if(!(this[i].equal(list[i]))){return false;}
                }
                return true;
            }
            return false;
        }
    });
    instanceW(Eq,String,{
        equal:function(s){ return this.toString() === s.toString(); }
    });

    return Eq;
});
