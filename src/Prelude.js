define([
    './core.js',
    './Unit.js',
    './Ordering/EQ.js'
],function(jHaskell,Unit,EQ){

    var Prelude = {
        elem: function(a,list){
            var len = list.length, i;
            for(i=0;i<len;i++){
                if( list[i].equal(a)){ return true; }
            }
            return false;
        },
        guard:function(b){ return b? [Unit]:[]; }
    };

    return Prelude;
});
