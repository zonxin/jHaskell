define([
    '../core.js',
    '../Maybe/Maybe.js',
    '../Maybe/Nothing.js',
    '../Maybe/Just.js'
],function(jHaskell,Maybe,Nothing,Just){
    jHaskell.Maybe = Maybe;
    jHaskell.Nothing = Nothing;
    jHaskell.Just = Just;
    return jHaskell;
});
