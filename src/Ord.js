define([
    './core.js',
    './libES/extendClass.js',
    './instanceW.js',
    './Unit.js',
    './Bool/Bool.js',
    './Float.js',
    './List.js'
],function(jHaskell,extendClass,instanceW,Unit,Bool,Float,List){
    function Ord(){}
    // class Eq a => Ord a where
    //  compare :: a -> a -> Ordering
    //  (<),(>),(<=),(>=) :: a -> a -> Bool
    extendClass(Ord,Eq);
    jHaskell.extend(Ord.prototype,{
        compare: function(o){
                if(this.equal(o)) { return EQ; }
                else if(this.lt(o)) { return LT; }
                else { return GT; }
        },
        lt:function(o){ if(this.compare(o) === LT){ return true; } return false; },
        le:function(o){ if(this.compare(o) === GT){ return false; } return true; },
        gt:function(o){ if(this.compare(o) === GT){ return true; } return false; },
        ge:function(o){ if(this.compare(o) === LT){ return false; } return true; },
        max: function(o) { return this.lt(o)? o:this; },
        min: function(o) { return this.lt(o)? this:o; }
    });
    jHaskell.extend({
        compare:function(c1,c2){return c1.compare(c2);},
        lt: function(c1,c2) { return c1.lt(c2); },
        le: function(c1,c2) { return c1.le(c2); },
        gt: function(c1,c2) { return c1.gt(c2); },
        ge: function(c1,c2) { return c1.ge(c2); },
        max: function(x,y){ return x.max(y); },
        min: function(x,y){ return x.min(y); }
    });
    instanceW(Ord,Unit,{
        compare: function(e) {
            if(e === Unit) { return EQ; }
            throw "Unit.compare: TypeError";
        }
    });
    instanceW(Ord,Bool,{
        compare: function(e) {
            if(this.valueOf() === false){
                if(e.valueOf() === false){ return EQ; }
                else if(e.valueOf() === true) { return LT; }
            }else{
                if(e.valueOf() === false){ return GT; }
                else if(e.valueOf() === true) { return EQ; }
            }
            throw "Bool.compare: TypeError";
        }
    });
    instanceW(Ord,Ordering,{
        compare:function(e) {
            if(e === LT) {
                if(this === LT) { return EQ; }
                else if(this === EQ || this === GT){ return GT; }
            }
            else if( e === EQ ){
                if(this === LT) { return LT; }
                else if(this === EQ) { return EQ; }
                else if(this === GT){ return GT; }
            }else if( e === GT ) {
                if(this === GT) {return EQ;}
                else if(this === EQ || this === LT){ return LT; }
            }
            throw "Ordering.compare: TypeError";
        }
    });
    instanceW(Ord,Float,{
        compare: function(o) {
            if     (this.valueOf() > o.valueOf()) { return GT; }
            else if(this.valueOf() === o.valueOf()) { return EQ; }
            else if(this.valueOf() < o.valueOf()) { return LT; }
            throw "Float.compare: TypeError";
        }
    });
    instanceW(Ord,List,{
        compare:function(list){
            var len1 = this.length,
                len2 = list.length,
                i,len,t;
            len = Math.min(len1,len2);
            for(i=0;i<len;i++){
                t = this[i].compare(list[i]);
                switch(t){
                    case LT: return LT;
                    case GT: return GT;
                }
            }
            if(len1.lt(len2)) { return LT;}
            if(len1.gt(len2)) { return GT;}
            return EQ;
        }
    });
    instanceW(Ord,String,{
        compare: function(s){ 
            if(this.toString() < s.toString()) { return LT; }
            else if(this.toString() === s.toString()) { return EQ; }
            else {  return GT; }
        }
    });
    return Ord;
});
