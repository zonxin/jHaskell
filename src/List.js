define([
    './libES/extendObject.js',
    './Functor.js',
    './Applicative.js',
    './Monad.js',
    './libES/map.js',
    './Eq.js',
    './Ord.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Monoid.js'
],function(extendObject,Functor,Applicative,Monad,map,Eq,Ord,LT,EQ,GT,Monoid){
    var List = Array;
    // extendClass(Array,Applicative);
    // Functor
    extendObject(List.prototype,Functor.prototype,Applicative.prototype,Monad.prototype,
                 Eq.prototype,Ord.prototype,Monoid.prototype,{
        constructor:Array,
        fmap: map,
        // Applicative
        pure: function (x){ return [x]; },
        applyTo: function (mValue){
            var len1 = this.length,
                len2 = mValue.length,
                len = len1 * len2,
                result = new Array(len),
                i,j,k=0;
            for(i=0;i<len1;i++){
                for(j=0;j<len2;j++){
                    result[k++] = this[i].call(arguments[1],mValue[j]);
                }
            }
            return result;
        },
        // Monad
        //returnM: pure,
        bindM: function (fn){
            var len = this.length,
                result = [],
                i,ret;
            for(i=0; i<len; i++){
                ret = fn(this[i]);
                if(ret instanceof List){
                    result = result.concat(ret);
                }else{
                    throw "TypeError";
                }
            }
            return result;
        },
        // Eq
        equal: function(list){
            var len1 = this.length,
                len2 = list.length,
                i;
            if(len1 === len2){
                for(i=0;i<len1;i++){
                    if(!(this[i].equal(list[i]))){return false;}
                }
                return true;
            }
            return false;
        },
        // Ord
        compare:function(list){
            var len1 = this.length,
                len2 = list.length,
                i,len,t;
            len = Math.min(len1,len2);
            for(i=0;i<len;i++){
                t = this[i].compare(list[i]);
                switch(t){
                    case LT: return LT;
                    case GT: return GT;
                }
            }
            if(len1 < len2) { return LT;}
            if(len1 > len2) { return GT;}
            return EQ;
        },
        // Monoid
        mempty:[],
        mappend:function(list){
            if(!(list instanceof Array)){ throw "List.mappend:TypeError"; }
            return this.concat(list);
        },
        // show
        show: function (){
            var len = this.length,
                str = "[",i;
            if(len === 0) { return "[]"; }
            for(i=0;i<len-1;i++){
                str += this[i].show() + ",";
            }
            str += this[i].show();
            return str + "]";
        }
    });
    return List;
});
