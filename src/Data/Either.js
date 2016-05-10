define([
    '../core.js'
],function(jHaskell){
    jHaskell.moduleW("Data.Either",function(){
        // data Either a b = Left a | Right b
        function Either(){}
        jHaskell.extend(Either.prototype,{
            isLeft:function() {
                if(this._lr_ === "left") { return {value:this.left}; }
                return false;
            },
            isRight: function() {
                if(this._lr_ === "right") { return {value:this.right}; }
            },
            toString: function() { return this.show(); }
        });
        function Left(value){
            var obj = new Either();
            obj._lr_ = "left";
            obj.left = value;
            return obj;
        }
        function Right(value){
            var obj = new Either();
            obj._lr_ = "right";
            obj.right = value;
            return obj;
        }
        // instance (Eq a, Eq b) => Eq (Either a b) where
        instanceW(Eq,Either,{
            equal: function (e) {
                var obj1 = this.isLeft(),
                    obj2 = e.isLeft();
                if(obj1 && obj2) { return obj1.value.equal(obj2.value); }
                if(obj1 && !obj2) { return false; }
                obj1 = this.isRight();
                obj2 = e.isRight();
                if(obj1 && obj2) { return obj1.value.equal(obj2.value); }
                return false;
            }
        });
        // instance Ord a => Ord (Either a)
        instanceW(Ord,Either,{
            compare: function(e) {
                var obj1 = this.isLeft(),
                    obj2 = e.isLeft();
                if(obj1 && obj2) { return obj1.value.compare(obj2.value); }
                if(obj1 && !obj2) { return GT; }
                obj1 = this.isRight();
                obj2 = e.isRight();
                if(obj1 && obj2) { return obj1.value.compare(obj2.value); }
                return LT;
            }
        });
        // instance Show a => Show (Either a)
        instanceW(Show,Either,{
            show: function() {
                var obj = this.isLeft();
                if(obj) { return "Left " + obj.value.show(); }
                obj = this.isRight();
                return "Right " + obj.value.show();
            }
        });
        // instance Monoid a => Monoid (Either a)
        // instance Functor Either
        instanceW(Functor,Either,{
            fmap: function(fn){
                var obj = this.isLeft();
                if(obj) { return new Left(obj.value); }
                obj = this.isRight();
                return new Right(fn(obj.value));
            }
        });
        // instance Applicative Either
        instanceW(Applicative,Either,{
            pure: Right,
            applyTo: function(mValue) {
                var obj = this.isLeft();
                if(obj) { return new Left(obj.value); }
                obj = this.isRight();
                return mValue.fmap(obj.value);
            }
        });
        // instance Monad Either
        instanceW(Monad,Either,{
            bindM: function(fn){
                var obj = this.isLeft();
                if(obj) { return new Left(obj.value); }
                obj = this.isRight();
                return fn.call(arguments[1],obj.value);
            }
        });
        return {
            Either:Either,Left:Left,Right:Right,
            // either :: (a -> c) -> (b -> c) -> Either a b -> c
            either: function(fa,fb,eab,c){
                var itis = eab.isLeft();
                if(itis){ return fa(itis.value); }
                itis = eab.isRight();
                return fb(itis.value);
            }
        };
    });
    return jHaskell.Data.Either;
});
