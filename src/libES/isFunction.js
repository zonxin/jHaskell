define([
    './type.js'
],function(type){
    function isFunction(obj){
        return type(obj) === "function";
    }
    return isFunction;
});
