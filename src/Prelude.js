define([
    './core.js',
    './Unit.js',
    './Bool/Bool.js',
    './Ordering/Ordering.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Float.js',
    './String.js',
    './List.js',
    './Function.js',

    './Eq.js',
    './Ord.js',
    './Enum.js',
    './Functor.js',
    './Applicative.js',
    './Monad.js',
    './Show.js',
    './Data/Data.js'
],function(jHaskell,Unit,Bool,Ordering,LT,EQ,GT,Float,x,List,y,Eq,Ord,Enum,Functor,Applicative,Monad,Show,Data){

    var Prelude = {
        Unit: Unit, Bool: Bool, False: false, True: true,
        Maybe: Data.Maybe.Maybe,
        Nothing: Data.Maybe.Nothing,
        Just: Data.Maybe.Just,
        maybe: Data.Maybe.maybe,

        Either: Data.Either.Either,
        Left: Data.Either.Left,
        Right: Data.Either.Right,
        either: Data.Either.either,

        Ordering:Ordering,
        LT:LT, EQ:EQ, GT:GT,
        Float:Float,List:List,

        Eq:Eq,Ord:Ord,Enum:Enum,
        Functor:Functor,Applicative:Applicative,Monad:Monad,
        Show:Show,

        Monoid: Data.Monoid.Monoid,
        mempty: Data.Monoid.mempty,
        mappend: Data.Monoid.mappend,

        map: List.map, filter:List.filter,
        foldl: List.foldl, foldl1: List.foldl1,
        foldr: List.foldr, foldr1: List.foldr1,
        elem: List.elem,notElem:List.notElem,
        and:List.and,or:List.or,any:List.any,all:List.all,
        sum:List.sum,product:List.product,
        take:List.take,drop:List.drop,
        takeRepeat:List.takeRepeat,
        takeCycle: List.takeCycle,
        zipWith:List.zipWith,

        guard: function(b){ return b? [Unit]:[]; },
        // even :: Float -> Bool
        even: function(n) { return n%2 === 0; },
        // odd :: Float -> Bool
        odd: function(n) { return n%2 === 1 || n%2 === -1; },
        // id :: a -> a
        id: function (x) { return x; },
        // const :: a -> b -> a
        constfn:function(a,b) { return a; },
        // flip :: (a -> b -> c) -> b -> a -> c
        flip: function(fn,a,b){ return fn(b,a); }
    };

    return Prelude;
});
