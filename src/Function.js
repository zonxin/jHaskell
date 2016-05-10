define([
    './currying.js'
],function(currying){
    extendObject(Function.prototype,{
        currying:function(){
            var ar = [].slice.call(arguments,0);
            ar.unshift(this);
            return currying.apply(null,ar);
        },
        currying2: function(){ return currying.currying2(this); },
        currying3: function(){ return currying.currying3(this); },
        currying4: function(){ return currying.currying4(this); },
        currying5: function(){ return currying.currying5(this); },
        currying6: function(){ return currying.currying6(this); },
        currying7: function(){ return currying.currying7(this); },
        currying8: function(){ return currying.currying8(this); }
    });
    return Function;
});
