define([
    './libES/extendObject.js',
    './currying.js',
    './compose.js',
    './instanceW.js'
],function (extendObject,currying,compose,instanceW){

    var jHaskell = {
        extend:extendObject,
        currying:currying,
        compose:compose,
        instanceW:instanceW,
        id: function (x) { return x; },
        importAs: function(mod,target){
            var k;
            if(arguments.length === 0) {
                mod = jHaskell;
                target = global;
            }else if(arguments.length === 1){
                target = mod;
                mod = this;
            }
            return extendObject(target,mod);
        }
    };
    // ================= end core ======================================
    return jHaskell;
});
