define([
    '../core.js',
    '../instanceW.js',
    '../Ordering/Ordering.js',
    '../Ordering/LT.js',
    '../Ordering/EQ.js',
    '../Ordering/GT.js',
    '../List.js',
    './Maybe.js'
],function(jHaskell,instanceW,Ordering,LT,EQ,GT,List,Maybe){
    jHaskell.moduleW("Data.Monoid",function(){
        function Monoid() {}
        // class Monoid a where
        //     mempty :: a
        //     mappend :: a -> a -> a
        //     mconcat :: [a] -> a
        Monoid.prototype = { 
            constructor: Monoid,
            mempty:undefined,
            mappend: function () { throw "Monoid.mappend: there is no implementation."; }
        };
        instanceW(Monoid,Ordering,{
            mempty: EQ,
            mappend:function(o) {
                if(this === LT) { return LT; }
                else if(this === EQ) { 
                    if(o instanceof Ordering) { return o; }
                    throw "Ordering.mappend: TypeError";
                }else{return GT; }
            }
        });
        // instance Monoid a => Monoid (Maybe a) where
        instanceW(Monoid,Maybe,{
            mempty: Maybe.Nothing,
            mappend: function(m){
                if(this === Maybe.Nothing) { return m; }
                if(m === Maybe.Nothing) { return this; }
                return new Maybe.Just(this.value.mappend(m.value));
            }
        });
        instanceW(Monoid,List,{
            mempty:[],
            mappend:function(list){
                if(!(list instanceof Array)){ throw "List.mappend:TypeError"; }
                return this.concat(list);
            }
        });
        instanceW(Monoid,String,{
            mempty:"",
            mappend: function(s) { return this.toString() + s.toString(); }
        });
        // newtype All = All { getAll:: Bool }
        function All(v){
            if(!(this instanceof All)) { return new All(v);}
            this._getAll_ = v;
        }
        All.prototype.getAll = function(){ return this._getAll_; };
        instanceW(Eq,All,{ equal:function(s){ return this.getAll().equal(s.getAll()); } });
        instanceW(Ord,All,{ compare: function(s) { return this.getAll().compare(s.getAll()); } });
        instanceW(Show,All,{ show: function(){ return "All { getAll = " + this.getAll().show() + " }"; } });
        instanceW(Monoid,All,{
            mempty:new All(true),
            mappend: function(s) { return new All(this.getAll() && s.getAll()); }
        });
        // newtype Any = Any { getAny:: Bool }
        function Any(v){
            if(!(this instanceof Any)) { return new Any(v);}
            this._getAny_ = v;
        }
        Any.prototype.getAny = function(){ return this._getAny_; };
        instanceW(Eq,Any,{ equal:function(s){ return this.getAny().equal(s.getAny()); } });
        instanceW(Ord,Any,{ compare: function(s) { return this.getAny().compare(s.getAny()); } });
        instanceW(Show,Any,{ show: function(){ return "Any { getAny = " + this.getAny().show() + " }"; } });
        instanceW(Monoid,Any,{
            mempty:new Any(false),
            mappend: function(s) { return new Any(this.getAny() || s.getAny()); }
        });

        // Sum
        function Sum(value){ if(!(this instanceof Sum)){ return new Sum(value); } this._getSum_ = value; }
        Sum.prototype.getSum = function() { return this._getSum_; };
        instanceW(Eq,Sum,{ equal:function(s){ return this.getSum().equal(s.getSum()); } });
        instanceW(Ord,Sum,{ compare: function(s) { return this.getSum().compare(s.getSum()); } });
        instanceW(Show,Sum,{ show: function(){ return "Sum { getSum = " + this.getSum().show() + " }"; } });
        // instance Num a => Monoid (Sum a)
        instanceW(Monoid,Sum,{
            mempty:new Sum(0),
            mappend: function(s) { return new Sum(this.getSum() + s.getSum()); }
        });
        instanceW(Functor,Sum,{ fmap: function(fn) { return new Sum(fn(this.getSum())); } });
        instanceW(Applicative,Sum,{
            pure: Sum,
            applyTo: function(s){
                return new Sum(this.getSum().call(null,s.getSum()));
            }
        });
        instanceW(Monad,Sum,{ bindM: function(fn) { return fn.call(null,this.getSum()); } });
        // Product
        function Product(v){
            if(!(this instanceof Product)) { return new Product(v); }
            this._getProduct_ = v;
        }
        Product.prototype.getProduct = function() { return this._getProduct_; };
        instanceW(Eq,Product,{ equal: function(p) { return this.getProduct().equal(p.getProduct()); } });
        instanceW(Ord,Product,{ compare: function(p) { return this.getProduct().compare(p.getProduct()); }});
        instanceW(Show,Product,{ show: function() { return "Product { getProduct = " + this.getProduct().show() + " }"; } });
        instanceW(Monoid,Product,{
            mempty: new Product(1),
            mappend: function(p) { return new Product(this.getProduct() * p.getProduct()); }
        });
        instanceW(Functor,Product,{ fmap: function(fn) { return new Product(fn(this.getProduct())); } });
        instanceW(Applicative,Product,{
            pure: Product,
            applyTo: function(s){
                return new Product(this.getProduct().call(null,s.getProduct()));
            }
        });
        instanceW(Monad,Product,{ bindM: function(fn) { return fn.call(null,this.getProduct()); } });

        return jHaskell.extend({},{
            Monoid: Monoid,
            mempty: function(){ return arguments[0].prototype.mempty; },
            mappend: function (m1,m2) { return m1.mappend(m2); },

            All: All,Any: Any, Sum: Sum,Product:Product
        });
    });
    return jHaskell.Data.Monoid;
});
