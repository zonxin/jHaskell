define([
    '../libES/extendObject.js',
    '../Eq.js',
    '../Ord.js',
    '../Enum.js',
    '../Ordering/LT.js',
    '../Ordering/EQ.js',
    '../Ordering/GT.js'
],function(extendObject,Eq,Ord,Enum,LT,EQ,GT){
    var Bool = Boolean;
    extendObject(Boolean.prototype,Eq.prototype,Ord.prototype,Enum.prototype,{
        // Eq
        equal: function(e) { 
            if (this.valueOf() === e) { return true; }
            return false;
        },
        // Ord
        compare: function(e) {
            if(this.valueOf() === false){
                if(e.valueOf() === false){ return EQ; }
                else if(e.valueOf() === true) { return LT; }
            }else{
                if(e.valueOf() === false){ return GT; }
                else if(e.valueOf() === true) { return EQ; }
            }
            throw "Bool.compare: TypeError";
        },
        // Enum
        toEnum:function (num){
            var arr = [false,true];
            return arr[num];
        },
        toNum: function (){
            if(this.valueOf() === false) {
                return 0;
            }else {
                return 1;
            }
        },
        // Show
        show: function(){
            if(this.valueOf()){
                return "True";
            }else{
                return "False";
            }
        }
    });
    
    return Bool;
});
