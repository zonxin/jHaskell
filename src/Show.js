define([
    './core.js',
    './libES/extendClass.js',
    './instanceW.js',
    './Unit.js',
    './Bool/Bool.js',
    './Ordering/Ordering.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Float.js',
    './List.js'
],function(jHaskell,extendClass,instanceW,Unit,Bool,Ordering,LT,EQ,GT,Float,List){
    // class Show a where
    //     show :: a -> String
    function Show(){}
    Show.prototype.show = function() { return this.toString(); };
    jHaskell.extend({show:function(s){return s.show();}});

    instanceW(Show,Unit,{ show: function(){ return "Unit"; } });
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
