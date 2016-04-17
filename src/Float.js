define([
    './libES/extendObject.js',
    './Eq.js',
    './Ord.js',
    './Enum.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js'
],function(extendObject,Ord,Enum,LT,EQ,GT){
    var Float = Number;
    extendObject(Float.prototype,Eq.prototype,Ord.prototype,Enum.prototype,{
        // Eq
        equal: function(e) { return this.valueOf() === e.valueOf(); },
        // Ord
        compare: function(o) {
            if     (this.valueOf() > o.valueOf()) { return GT; }
            else if(this.valueOf() === o.valueOf()) { return EQ; }
            else if(this.valueOf() < o.valueOf()) { return LT; }
            throw "Float.compare: TypeError";
        },
        // Enum
        toEnum: function (e) { 
            if(typeof e !== "number"){ throw "Float.toEnum: TypeError"; }
            return e; 
        },
        toNum: function () { return this.valueOf(); },
        // Show
        show: function () { return this.toString(); }
    });

    return Float;
});
