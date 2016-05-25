define([
    '../core.js'
],function(jHaskell){
    jHaskell.moduleW("Data.Either",function(){
        // data Either a b = Left a | Right b
        function Either(){}
        jHaskell.extend(Either.prototype,{
            isLeft:function() {
                if(this._lr_ === "left") { return true; }
                return false;
            },
            isRight: function() {
                if(this._lr_ === "right") { return true; }
                return false;
            },
            getEither: function(){
                return this[this._lr_];
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
                var n = 0;
                if(this.isRight()) { n += 1; }
                if(e.isRight()) { n += 2; }
                if(n === 3 || n === 0){
                    return this.getEither().equal(e.getEither());
                }
                return false;
            }
        });
        // instance Ord a => Ord (Either a)
        instanceW(Ord,Either,{
            compare: function(e) {
                var n = 0;
                if(this.isRight()) { n += 1; }
                if(e.isRight()) { n += 2; }
                if(n === 3 || n === 0){
                    return this.getEither().compare(e.getEither());
                }else if(n === 1){
                    return GT;
                }
                return LT;
            }
        });
        // instance Show a => Show (Either a)
        instanceW(Show,Either,{
            show: function() {
                if(this.isLeft()){
                    return "Left " + this.getEither().show();
                }
                return "Right " + this.getEither().show();
            }
        });
        // instance Monoid a => Monoid (Either a)
        // instance Functor Either
        instanceW(Functor,Either,{
            fmap: function(fn){
                if(this.isLeft()){ return this; }
                return new Right(fn(this.getEither()));
            }
        });
        // instance Applicative Either
        instanceW(Applicative,Either,{
            pure: Right,
            applyTo: function(mValue) {
                if(this.isLeft()){ return this; }
                return mValue.fmap(this.getEither());
            }
        });
        // instance Monad Either
        instanceW(Monad,Either,{
            bindM: function(fn){
                var obj = this.isLeft();
                if(this.isLeft()){ return this; }
                return fn.call(null,this.getEither());
            }
        });
        return {
            Either:Either,Left:Left,Right:Right,
            // either :: (a -> c) -> (b -> c) -> Either a b -> c
            either: function(fa,fb,eab,c){
                if(eab.isLeft()){
                    return fa(eab.getEither());
                }
                return fb(eab.getEither());
            }
        };
    });

    return jHaskell.Data.Either.Either;
});
