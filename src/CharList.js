define([
    './libES/extendObject.js'
],function(extendObject){
    var CharList = String;
    extendObject(CharList.prototype,{
        // show
        show:function(){
            return this.toString();
        }
    });

    return CharList;
});
