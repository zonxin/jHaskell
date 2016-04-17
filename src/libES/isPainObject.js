define([
    './var/isWindow.js',
    './var/hasOwn.js',
    './type.js'
],function(isWindow,hasOwn,type){
    function isPlainObject(obj){
        // Object created by "new Object" or "{}"
        if(type(obj) !== "object" || obj.nodeType || isWindow(obj)){
            return false;
        }
        if(obj.constructor && !hasOwn.call(obj.constructor.prototype,"isPrototypeOf")) {
            return false;
        }
        return true;
    }
    return isPlainObject;
});
