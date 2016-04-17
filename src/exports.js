
 /************* exports ******************************/
    if ( typeof module === "object" && typeof module.exports === "object" ) { // nodejs
        module.exports = jHaskell;
    } else if ( typeof define === "function" && define.amd ) { // AMD, requiejs
        define( function() {return jHaskell;} );
    } else if ( typeof define === "function" && define.cmd){ // CMD, seajs
        define( function() {return jHaskell;} );
    }else {
        var old_jHaskell=global.jHaskell;
        jHaskell.noConflict = function() {global.jHaskell = old_jHaskell; return jHaskell;};
        global.jHaskell = jHaskell;
    }
