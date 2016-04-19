define([
    './core.js',
    './instanceW.js',
    './Void.js',
    './Bool/Bool.js',
    './Ordering/Ordering.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Float.js'
],function(jHaskell,instanceW,Void,Bool,Ordering,LT,EQ,GT,Float){
    function Enum(){}
    // class Enum a where
    //   succ   :: a -> a
    //   pred   :: a -> a
    //   toEnum :: Int -> a
    //   fromEnum  :: a -> Int
    //   enumFrom  :: a -> [a]
    //   enumFromThen :: a -> a-> [a]
    //   enumFromTo   ::  a -> a -> [a]
    //   enumFromThenTo :: a -> a -> [a]
    Enum.prototype = {
        constructor:Enum,
        succ : function() {
            var value = this.toNum() + 1;
            return this.toEnum(value);
        },
        pred : function() {
            var value = this.toNum() - 1;
            return this.toEnum(value);
        },
        toEnum: function (num){ throw "Enum.toEnum:"; },
        // fromEnum
        toNum: function(){ throw "Enum.toNum:"; }
    };
    jHaskell.extend({
        succ: function (e) { return e.succ(); },
        pred: function (e) { return e.pred(); },
        toEnum: function(num,hint) {return hint.prototype.toEnum(num);},
        fromEnum: function (e) { return e.toNum(); },
        enumFromTo: function(s,e){
            var i = s.toNum(), len = e.toNum();
            var ret = [];
            for(;i<=len;i++){
                ret.push(s.toEnum(i));
            }
            return ret;
        },
        enumFromThenTo: function(s1,s2,end){
            var i = s1.toNum(),dt=s2.toNum() - i, len = end.toNum();
            var ret = [];
            if(dt >=0){ for(;i<=len;i+=dt){ ret.push(s1.toEnum(i)); } }
            else      { for(;i>=len;i+=dt){ ret.push(s1.toEnum(i)); } }
            return ret;
        }
    });
    // instance Enum () where
    instanceW(Enum,Void,{ // Void
        toEnum: function(num) { if(num === 0) {return Void; }},
        toNum: function() { return 0; }
    });
    // instance Enum Bool where
    instanceW(Enum,Bool,{ // Bool
        toEnum:function (num){ var arr = [false,true]; return arr[num]; },
        toNum: function (){ return (this.valueOf() === false) ? 0 : 1; }
    });
    // instance Enum Ordering where
    instanceW(Enum,Ordering,{// Ordering
        toEnum: function (num){ var arr = [LT,EQ,GT]; return arr[num]; },
        toNum: function (){
            switch (this){ case LT: return 0; case EQ: return 1; case GT: return 2; }
        }
    });
    // instance Enum Float
    instanceW(Enum,Float,{ // Float
        toEnum: function (e) { 
            if(typeof e !== "number"){ throw "Float.toEnum: TypeError"; }
            return e; 
        },
        toNum: function () { return this.valueOf(); }
    });
    return Enum;
});
