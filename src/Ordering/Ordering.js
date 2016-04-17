define([
    '../libES/extendClass.js',
    '../libES/extendObject.js',
    '../Ord.js',
    '../Enum.js',
    '../Monoid.js'
],function(extendClass,extendObject,Ord,Enum,Monoid){

    extendObject(Ord.prototype,{
        compare: function(o){
                if(this.equal(o)) { return EQ; }
                else if(this.lt(o)) { return LT; }
                else { return GT; }
            },
        lt:function(o){ if(this.compare(o) === LT){ return true; } return false; },
        le:function(o){ if(this.compare(o) === GT){ return false; } return true; },
        gt:function(o){ if(this.compare(o) === GT){ return true; } return false; },
        ge:function(o){ if(this.compare(o) === LT){ return false; } return true; }
    });

    function Ordering(){}
    extendClass(Ordering,Ord);
    extendObject(Ordering.prototype,Enum.prototype,Monoid.prototype,{ 
        // Eq Ord
        equal:function(e) { return this === e; },
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
        },
        // Enum
        toEnum: function (num){
            var arr = [LT,EQ,GT];
            return arr[num];
        },
        toNum: function (){
            switch (this){
                case LT: return 0;
                case EQ: return 1;
                case GT: return 2;
            }
        },
        // Monoid
        mempty: EQ,
        mappend:function(o) {
            if(this === LT) { return LT; }
            else if(this === EQ) { 
                if(o instanceof Ordering) { return o; }
                throw "Ordering.mappend: TypeError";
            }else{return GT; }
        },
        // show
        show: function(){
            if(this === LT) { return "LT"; }
            else if(this === EQ) { return "EQ"; }
            else {return "GT";}
        }
    });
    
    var LT = new Ordering();
    var EQ = new Ordering();
    var GT = new Ordering();
    Ordering.LT = LT;
    Ordering.EQ = EQ;
    Ordering.GT = GT;
    
    return Ordering;
});
