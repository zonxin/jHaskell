define([
    './var/arr.js',
    './var/hasOwn.js'
],function(arr,hasOwn){
    //_map:: [a] -> (a -> b) -> [b]
    // map = _map this
    var map = arr.map || function(callbackfn){
        var len = this.length;
        var result = [];
        // typeof callbackfn == "function"
        var k = 0;
        for(;k<len;k++){
            var Pk = k.toString();
            if(hasOwn.call(this,Pk)){
                result[Pk] = callbackfn.call(arguments[1],this[Pk],k,this);
            }
        }
        return result;
    };
    Array.prototype.map = map;
    return map;
});
