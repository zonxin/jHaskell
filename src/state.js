define([
    './libES/extendClass.js',
    './Monad.js'
],function(extendClass,Monad){
    var state = (function(){
        function State(){
            this.runState = function(preSt) { throw "Error using"; };
            // this.runState = function(preSt) { return {v:undefined,st:null}; };
        }
        extendClass(State,Monad);
        State.prototype.bindM = function(fn){
            var that = this;
            function pAB(preSt){
                var o = that.runState(preSt);
                var value = o.v;
                var curSt = o.st;
                var pB = fn.call(null,value);
                return pB.runState(curSt);
            }
            return state(pAB);
        };
        //State.prototype.then = function(fn){
        //    var that = this;
        //    function pAB(preSt){
        //        var curst = that.runState(preSt).st;
        //        var pB = fn.call(null);
        //        return pB.runState(curSt);
        //    }
        //    return state(pAB);
        //};
        function state(pA)
        {
            var st = new State(pA);
            st.runState = pA;
            return st;
        }
        return state;
    })();
    return state;
});
