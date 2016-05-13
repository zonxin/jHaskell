define([
    './var/arr.js',
    './var/hasOwn.js'
],function(arr,hasOwn){
    var filter = arr.filter || function(callbackfn){
        var len = this.length;
        var result = [];
        // typeof callbackfn == "function"
        var k = 0;
        for(;k<len;k++){
            var Pk = k.toString();
            if(hasOwn.call(this,Pk)){
                if(callbackfn.call(arguments[1],this[k],k,this)){
                    result.push(this[k]);
                }
            }
        }
        return result;
    };
    Array.prototype.filter = filter;
    return filter;
});
