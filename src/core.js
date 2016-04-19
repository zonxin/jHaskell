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
        makeGlobal: function(names,ext){
            var k;
            if(arguments.length === 0){
                for(k in this){
                    if(this.hasOwnProperty(k)){
                        global[k] = this[k];
                    }
                }
                return jHaskell;
            }
            if(arguments.length === 1) { ext = global; }
            var len = arr.length, i;
            for(i=0;i<len;i++){
                k = names[i];
                if(this.hasOwnProperty(k)){
                    global[k] = this[k];
                }
            }
            return jHaskell;
        }
    };
    // ================= end core ======================================
    return jHaskell;
});
