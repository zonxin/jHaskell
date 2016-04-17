define([
    '../libES/extendClass.js',
    '../libES/extendObject.js',
    '../Monad.js',
    '../Eq.js',
    '../Ord.js',
    '../Ordering/EQ.js',
    '../Ordering/LT.js',
    '../Ordering/GT.js'
],function(extendClass,extendObject,Monad,Eq,Ord){
    // data Either a b = Left a | Right b
    function Either(){}
    extendClass(Either,Monad);
    extendObject(Either.prototype,Eq.prototype,Ord.prototype,{
        isLeft:function() {
            if(this._lr_ === "left") { return {value:this.left}; }
            return false;
        },
        isRight: function() {
            if(this._lr_ === "right") { return {value:this.right}; }
        },
        // Functor
        fmap: function(fn){
            var obj = this.isLeft();
            if(obj) { return new Left(obj.value); }
            obj = this.isRight();
            return new Right(fn(obj.value));
        },
        // Applicative
        pure: Right,
        applyTo: function(mValue) {
            var obj = this.isLeft();
            if(obj) { return new Left(obj.value); }
            obj = this.isRight();
            return mValue.fmap(obj.value);
        },
        // Monad
        // returnM:pure,
        bindM: function(fn){
            var obj = this.isLeft();
            if(obj) { return new Left(obj.value); }
            obj = this.isRight();
            return fn.call(arguments[1],obj.value);
        },
        // Eq
        equal: function (e) {
            var obj1 = this.isLeft(),
                obj2 = e.isLeft();
            if(obj1 && obj2) { return obj1.value.equal(obj2.value); }
            if(obj1 && !obj2) { return false; }
            obj1 = this.isRight();
            obj2 = e.isRight();
            if(obj1 && obj2) { return obj1.value.equal(obj2.value); }
            return false;
        },
        // Ord
        compare: function(e) {
            var obj1 = this.isLeft(),
                obj2 = e.isLeft();
            if(obj1 && obj2) { return obj1.value.compare(obj2.value); }
            if(obj1 && !obj2) { return GT; }
            obj1 = this.isRight();
            obj2 = e.isRight();
            if(obj1 && obj2) { return obj1.value.compare(obj2.value); }
            return LT;
        },
        // Show
        show: function() {
            var obj = this.isLeft();
            if(obj) { return "Left " + obj.value.show(); }
            obj = this.isRight();
            return "Right " + obj.value.show();
        }
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
    Either.Left = Left;
    Either.Right = Right;

    return Either;
});
