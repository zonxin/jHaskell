define([
    './libES/extendObject.js',
    './currying.js',
    './compose.js'
],function (extendObject,currying,compose){

    var jHaskell = {
        extend:extendObject,
        currying:currying,
        compose:compose,
        // show
        show: function(showValue){ return showValue.show(); },
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
            var len = arr.length,
                i;
            for(i=0;i<len;i++){
                k = names[i];
                if(this.hasOwnProperty(k)){
                    global[k] = this[k];
                }
            }
            return jHaskell;
        }
    };
    return jHaskell;
});
