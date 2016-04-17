define([
    './var/arr.js',
    './var/hasOwn.js'
],function(arr,hasOwn){
    //_forEach:: [a] -> ( (a,Int,[a])->b ) -> undefined
    // forEach = _forEach this
    var forEach = arr.forEach || function(callbackfn){
        var len = this.length;
        // typeof callbackfn == "function"
        var k = 0;
        for(;k<len;k++){
            var Pk = k.toString();
            if(hasOwn.call(this,Pk)){
                callbackfn.call(arguments[1],this[Pk],k,this);
            }
        }
        return undefined;
    };
    Array.prototype.forEach = forEach;
    return forEach;
});
