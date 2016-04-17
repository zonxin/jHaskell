define([
    './libES/extendClass.js',
    './libES/extendObject.js',
    './Eq.js'
],function(extendClass,extendObject,Eq){
    // class Eq a => Ord a where
    //  compare :: a -> a -> Ordering
    //  (<),(>),(<=),(>=) :: a -> a -> Bool
    function Ord(){}
    extendClass(Ord,Eq);
    return Ord;
});
