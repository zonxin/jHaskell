define([
    './core.js',
    './libES/extendClass.js',
    './instanceW.js',
    './Void.js',
    './Bool/Bool.js',
    './Ordering/Ordering.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Float.js',
    './Maybe/Maybe.js',
    './Maybe/Nothing.js',
    './Either/Either.js',
    './List.js'
],function(jHaskell,extendClass,instanceW,Void,Bool,Ordering,LT,EQ,GT,Float,Maybe,Nothing,Either,List){
    // class Show a where
    //     show :: a -> String
    function Show(){}
    Show.prototype.show = function() { return this.toString(); };
    jHaskell.extend({show:function(s){return s.show();}});

    instanceW(Show,Void,{ show: function(){ return "Void"; } });
    instanceW(Show,Bool,{ show: function(){ return this.valueOf()? "True":"False";} });
    instanceW(Show,Ordering,{
        show: function(){
            if(this === LT) { return "LT"; }
            else if(this === EQ) { return "EQ"; }
            else {return "GT";}
        }
    });
    instanceW(Show,Float,{
        show: function () { return this.toString(); }
    });
    instanceW(Show,Maybe,{
        show: function() {
            if (this === Nothing) { return "Nothing"; }
            return "Just " + this.value.show();
        }
    });
    instanceW(Show,Either,{
        show: function() {
            var obj = this.isLeft();
            if(obj) { return "Left " + obj.value.show(); }
            obj = this.isRight();
            return "Right " + obj.value.show();
        }
    });
    instanceW(Show,List,{
        show: function (){
            var len = this.length, str = "[",i;

            if(len === 0) { return "[]"; }
            for(i=0;i<len-1;i++){
                str += this[i].show() + ",";
            }
            str += this[i].show();
            return str + "]";
        }
    });
    instanceW(Show,String,{});
    return Show;
});
