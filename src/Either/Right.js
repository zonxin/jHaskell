define([
    './Either.js'
],function(Either){
    function Right(value){
        var obj = new Either();
        obj._lr_ = "right";
        obj.right = value;
        return obj;
    }
    return Right;
});
