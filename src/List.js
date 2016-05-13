define([
    './core.js',
    './libES/extendObject.js',
    './libES/filter.js',
    './currying.js'
],function(jHaskell,extendObject,filter,currying){
    // data [] a = [] | a : []
    var List = Array;
    // instance Eq a => Eq (Maybe a)
    // instance Ord a => Ord (Maybe a)
    // instance Show a => Show (Maybe a)
    // instance Monoid a => Monoid (Maybe a)
    // instance Functor Maybe
    // instance Applicative Maybe
    // instance Monad Maybe
    function addition(x,y){ return x + y; }
    function multiply(x,y){ return x * y; }
    extendObject(List,{
        //map :: (a -> b) -> [a] -> b
        map: function(fn,ar) { return ar.fmap(fn); },
        // filter :: (a -> Bool) -> [a] -> [a]
        filter: function(fn,ar) { return ar.filter(fn); },
        // foldl :: (a->b->a) -> a -> [b] -> a
        foldl: function(fn,a,br) { 
            var len = br.length, i,acc = a;
            for(i=0;i<len;i++){ acc = fn(acc,br[i]); }
            return acc;
        },
        // foldl1 :: (a->a->a) -> [a] -> a
        foldl1: function(fn,ar) { 
            var len = ar.length,i,acc;
            if(len === 0) { throw "foldl1: Empty List"; }
            acc = ar[0];
            for(i=1;i<len;i++) { acc = fn(acc,ar[i]); }
            return acc;
        },
        // foldr :: (a->b->b) -> b -> [a] -> b
        foldr: function(fn,b,ar){
            var i = ar.length - 1,bcc = b;
            for(;i>=0;i--) { bcc = fn(ar[i],bcc); }
            return bcc;
        },
        // foldr1 :: (a->a->a) -> [a] -> a
        foldr1: function(fn,ar){
            var i = ar.length - 1,acc;
            if(i<0) { throw "foldr1: Empty List"; }
            acc = ar[i];
            for(i--;i>=0;i--) { acc = fn(ar[i],acc); }
            return acc;
        }
    });
    extendObject(List,{
        // sum :: Num a => [a] -> a
        sum: currying(List.foldl,addition,0),
        // product :: Num a => [a] -> a
        product: currying(List.foldl,multiply,1),
        // maximum :: Ord a => [a] -> a
        maximum: currying(List.foldl1,function(x,y){ return x.lt(y)? y:x;}),
        // minimum :: Ord a => [a] -> a
        minimum: currying(List.foldl1,function(x,y){ return x.lt(y)? x:y;}),
        // and :: [Bool] -> Bool
        and: currying(List.foldl,function(x,y){return x && y;},true),
        // or :: [Bool] -> Bool
        or: currying(List.foldl,function(x,y){return x || y;},false),
        // any:: (a-> Bool) -> [a] -> Bool
        any: function(fn,ar){ 
            var len = ar.length,i;
            for(i=0;i<len;i++) { if(fn(ar[i])) { return true;} }
            return false;
        },
        // all:: (a-> Bool) -> [a] -> Bool
        all: function(fn,ar){ 
            var len = ar.length,i;
            for(i=0;i<len;i++) { if(!fn(ar[i])) { return false;} }
            return true;
        },
        //take :: Int -> [a] -> [a]
        take: function(n,ar){ return ar.slice(0,n); },
        //drop :: Int -> [a] -> [a]
        drop: function(n,ar){ return ar.slice(n); },
        // zipWith:: (a->b->c) -> [a] -> [b] -> [c]
        zipWith: function(fn,arr1,arr2){
            var len1 = arr1.length, len2 = arr2.length,
                len = len1 > len2? len2:len1,
                r = [],i;
            for(i=0;i<len;i++){ r.push(fn(arr1[i],arr2[i])); }
            return r;
        },
        // elem :: Eq a => a -> [a] -> Bool
        elem: function(a,list){
            var len = list.length, i;
            for(i=0;i<len;i++){ if( list[i].equal(a)){ return true; } }
            return false;
        },
        // notElem :: Eq a => a -> [a] -> Bool
        notElem: function(a,list){
            var len = list.length, i;
            for(i=0;i<len;i++){
                if( list[i].equal(a)){ return false; }
            }
            return true;
        }, 
        // takeRepeat :: Int -> a -> [a]
        takeRepeat:function(n,a){
            var len = n, r = new Array(len),i;
            for(i=0;i<n;i++) { r[i] = a;}
            return r;
        },
        // takeCycle :: Int -> [a] -> [a]
        takeCycle: function(n,ar){
            var r = [];
            while(r.length < n){
                r = r.concat(ar);
            }
            r.length = n;
            return r;
        }
    });
    return List;
});
