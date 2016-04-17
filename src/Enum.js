define([
    './core.js'
],function(jHaskell){
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

});
