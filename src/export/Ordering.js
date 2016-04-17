define([
    '../core.js',
    '../Ordering/Ordering.js',
    '../Ordering/EQ.js',
    '../Ordering/LT.js',
    '../Ordering/GT.js'
],function(jHaskell,Ordering,EQ,LT,GT){
    jHaskell.Ordering = Ordering;
    jHaskell.EQ = EQ;
    jHaskell.LT = LT;
    jHaskell.GT = GT;
    return jHaskell;
});
