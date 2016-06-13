define([
    './libES/extendObject.js',
    './libES/extendClass.js',
    './currying.js',
    './compose.js',
    './instanceW.js'
],function (extendObject,extendClass,currying,compose,instanceW){

    var jHaskell = {
        extend:extendObject,
        extendClass:extendClass,
        compose:compose,
        instanceW:instanceW,
        moduleW:function(ns,factory){
            var nslist = ns.split("."),
                endfor = nslist.length - 1,
                i,p,name;
            p = jHaskell;
            for(i=0; i<endfor;i++){
                name = nslist[i];
                if(p[name] === undefined){
                    p[name] = {};
                }
                p = p[name];
            }
            name = nslist[i];
            p[name] = factory();
        },
        importAs: function(mod,target){
            var k;
            if(arguments.length === 0) {
                mod = jHaskell;
                target = global;
            }else if(arguments.length === 1){
                target = global;
            }
            return extendObject(target,mod);
        }
    };
    jHaskell.extend(currying);
    // ================= end core ======================================
    return jHaskell;
});
