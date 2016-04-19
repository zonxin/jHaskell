define([
    './Either.js'
],function(Either){
    function Left(value){
        var obj = new Either();
        obj._lr_ = "left";
        obj.left = value;
        return obj;
    }
    return Left;
});
