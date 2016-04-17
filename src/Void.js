define([
    './libES/extendClass.js',
    './libES/extendObject.js',
    './Ord.js',
    './Enum.js',
    './Ordering/EQ.js'
],function(extendClass,extendObject,Ord,Enum,EQ){
    function Void(){}
    extendClass(Void,Ord);
    extendObject(Void.prototype,Enum.prototype,{
        // Eq
        equal: function(e) { 
            if(e === Void) { return true; } 
            throw "Void.equal: TypeError";
        },
        // Ord
        compare: function(e) {
            if(e === Void) { return EQ; }
            throw "Void.compare: TypeError";
        },
        // Enum
        toEnum: function(num) { if(num === 0) {return Void; }},
        toNum: function() { return 0; },
        // Show
        show: function(){
            return "Void";
        }
    });
    Void = new Void();
    
    return Void;
});
