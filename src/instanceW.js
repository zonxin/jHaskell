define([
    './libES/extendObject.js'
],function(extendObject){
    function instanceW(classN,typeN,op){
        var cons = typeN.prototype.constructor;
        extendObject(typeN.prototype,classN.prototype,op);
        typeN.prototype.constructor = cons;
        return typeN;
    }
    return instanceW;
});
