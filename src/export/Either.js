define([
    '../core.js',
    '../Either/Either.js',
    '../Either/Left.js',
    '../Either/Right.js'
],function(jHaskell,Either,Left,Right){
    jHaskell.Either = Either;
    jHaskell.Left = Left;
    jHaskell.Right = Right;
    return jHaskell;
});
