// javascript 会自动把 this 转换为对象
Array.prototype.constructor = Array;
Array.prototype.toString = function(){
    return this.join.call(this);
};
Array.prototype.concat = function (item1)
{
    var i=0,n=0;A=[];items=[];
    items.push(this);
    for(i=0;i<arguments.length;i++){
        items.push(arguments[i]);
    }
    while(items.length){
        var E = items.shift();
        if(E instanceof Array){
            var k = 0;var len = E.length;
            while(k<len){
                if(E.hasOwnProperty(k.toString())){
                    A[n] = E[k];
                }
                n++;k++;
            }
        }else{
            A[n] = E;
            n++;
        }
    }
    return A;
};
Array.prototype.join = function(sepatator)
{
    var len = this.length; // toUint32(this.length)
    sepatator = sepatator || ",";
    var sep = sepatator.toString();
    if(len === 0) { return ""; }
    
    var element = this[0],
        R = element===undefined || element===null ? "" : element.toString(),
        k = 1,
        S,next;
    while(k<len){
        S = R + sep;
        element = this[k];
        next = element===undefined || element===null ? "" : element.toString();
        R = S + next;
        k++;
    }
    return R;
};
Array.prototype.pop = function (){
    var len = this.length; // toUint32(this.length)
    if(len === 0){
        this.length = 0;
        return undefined;
    }
    var element = this[len-1];
    // 对于数组下面一句不是必须的
    delete this[len-1];
    this.length = len-1;
    return element;
};
Array.prototype.push = function(item1) {
    var n = this.length, // toUint32(this.length)
        items = [this],
        i;
    for(i = 0; i < arguments.length; i++) {
        items.push(arguments[i]);
    }
    while(items.length > 0){
        this[n] = items.shift();
        n++;
    }
    this.length = n;
    return n;
};
Array.prototype.reverse = function () {
    var len = this.length, // toUint32(this.length)
        middle = Math.floor(len/2);
    var lower = 0;
    while(lower !== middle){ //不知道为什么标准里写的不是 lower >= middle
        var upper = len - lower - 1;
        var lowerValue = this[lower];
        var upperValue = this[upper];
        if(this.hasOwnPropery(lower.toString()) && this.hasOwnPropery(upper.toString())){
            this[lower] = upperValue; this[upper] = lowerValue;
        }else if(!this.hasOwnPropery(lower.toString()) && this.hasOwnPropery(upper.toString())){
            this[lower] = upperValue; delete this[upper] ;
        }else if(this.hasOwnPropery(lower.toString()) && !this.hasOwnPropery(upper.toString()) ){
            delete this[lower]; this[upper] = lowerValue;
        }
        lower++;
    }
    return this;
};
Array.prototype.shift = function (){
    var len = this.length; // toUint32(this.length)
    if(len === 0) { this.length = 0; return undefined; }
    var first = this[0],
        k =1;
    while(k < len){
        var from = k.toString();
        if(this.hasOwnPropery(from)){
            this[k-1] = this[k];
        }else{
            delete this[k-1];
        }
        k++;
    }
    delete this[k-1];
    this.length = len - 1;
    return first;
};
Array.prototype.slice = function (start, end){
    var A = [];
    var len = this.length; // toUint32(this.length)
    var relativeStart = start; // toIntger
    var k = relativeStart < 0 ? Math.max(len + relativeStart,0):Math.min(relativeStart,len);
    var relatveEnd = typeof end ==="undefined" ? len : end; // toIntger(end)
    var final_ = relatveEnd < 0 ? max(len+relatveEnd,0) : min(relativeEnd,len);
    var n  = 0;
    while(k < final_){
        if(this.hasOwnPropery(k.toString())){
            A[n] = this[k];
        }
        k++;n++;
    }
    return A;
};
Array.prototype.sort = function (){ };
Array.prototype.splice = function (start,deleteCount) {
    var A = [];
    var len = this.length; // toUint32(this.length)
    var relatveStart = start; // toIntger
    var actualStart = relatveStart < 0 ? Math.max(len + relatveStart,0): Math.min(relatveStart,len);
    var actualDeleteCount = Math.min(max(deleteCount,0),len - actualStart); //toIntger(deleteCount)
    var k = 0;
    var from;
    while(k < actualDeleteCount){
        from = (actualStart+k).toString();
        if(this.hasOwnPropery(from)){
            A[k] = this[actualStart+k];
        }
        k++;
    }
    var items = [];
    for(i = 2; i < arguments.length; i++) {
        items.push(arguments[i]); // 标准里没有使用push实现这个
    }
    var itemCount = items.length;
    if(itemCount < actualDeleteCount){
        k = actualStart;
        while(k < len - actualDeleteCount){
            from = (k+actualDeleteCount).toString();
            if(this.hasOwnPropery(from)){
                this[k+itemCount] = this[k+actualDeleteCount];
            }else{
                delete this[k+itemsCount];
            }
            k++;
        }
        k = len;
        while(k > len-actualDeleteCount + itemsCount){
            delete this[k-1];
            k--;
        }
    }else if(itemCount > actualDeleteCount){
        k = len - actualDeleteCount;
        while(k > actualStart){
            from = (k+actualDeleteCount - 1).toString();
            if(this.hasOwnPropery(from)){
                this[k + itemCount - 1] = this[k+actualDeleteCount -1];
            }else{
                delete this[k + itemCount -1];
            }
            k--;
        }
    }
    k = actualStart;
    while(items.length>0){
        var E = items.shift();
        this[k] = E;
        k++;
    }
    this.length = len - actualDeleteCount + itemCount;
    return A;
};
Array.prototype.unshift = function (item1){
    var len = this.length; // toUint32(this.length)
    var argCount = arguments.length;
    var k = len;
    while(k > 0){
        var from = (k-1).toString();
        if(this.hasOwnPropery(from)){
            this[k + argCount - 1] = this[k-1];
        }else{
            delete this[k + argCount -1];
        }
        k--;
    }
    var j = 0;
    var items = []; var i;
    for(i = 0 ; i < arguments.length;i++){
        items.push(arguments[i]);
    }
    while(items.length > 0){
        var E = items.shift();
        this[j] = E;
        j++;
    }
    this.length = len + argCount;
    return len+argCount;
};
Array.prototype.indexOf = function (searchElement){
    var len = this.length; // toUint32(this.length)
    if(len === 0) { return -1; }
    var n = arguments.length >=2 ? arguments[1] : 0; //toIntger(arguments[1])
    if(n > len) { return -1; }
    var k = n>=0 ? n : Math.max(len + n, 0);
    while(k < len){
        if(this.hasOwnPropery(k.toString)()){
            if(searchElement === this[k]) {
                return k;
            }
        }
        k++;
    }
    return -1;
};
Array.prototype.lastIndexOf = function (searchElement){
    var len = this.length; // toUint32(this.length)
    if(len === 0) { return -1; }
    var n = arguments.length >=2 ? arguments[1] : 0; //toIntger(arguments[1])
    var k = n>=0 ? min(n,len-1) : len + n;
    while(k >= 0){
        if(this.hasOwnPropery(k.toString)()){
            if(searchElement === this[k]) {
                return k;
            }
        }
        k++;
    }
    return -1;
};
Array.prototype.every = function (callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    var T = arguments.length >=2 ? arguments[1] : undefined;
    var k = 0;
    while(k < len){
        if(this.hasOwnPropery(k.toString())){
            var testResult = callbackfn.call(T,this[k],k,this);
            if(!testResult) { return false; }
        }
        k++;
    }
    return true;
};
Array.prototype.some = function (callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    var T = arguments.length >=2 ? arguments[1] : undefined;
    var k = 0;
    while(k < len){
        if(this.hasOwnPropery(k.toString())){
            var testResult = callbackfn.call(T,this[k],k,this);
            if(testResult) { return true; }
        }
        k++;
    }
    return false;
};

Array.prototype.forEach = function(callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    var T = arguments.length >=2 ? arguments[1] : undefined;
    var k = 0;
    while( k < len ){
        if(this.hasOwnPropery(k.toString())){
            callbackfn.call(T,this[k],k,this);
        }
        k++;
    }
    return undefined;
};

Array.prototype.map = function(callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    var T = arguments.length >=2 ? arguments[1] : undefined;
    var A = [];
    var k = 0;
    while( k < len ){
        if(this.hasOwnPropery(k.toString())){
            A[k] = callbackfn.call(T,this[k],k,this);
        }
        k++;
    }
    return A;
};


Array.prototype.filter = function(callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    var T = arguments.length >=2 ? arguments[1] : undefined;
    var A = [];
    var k = 0;
    var to = 0;
    while( k < len ){
        if(this.hasOwnPropery(k.toString()) ){
            if( callbackfn.call(T,this[k],k,this) ){
                A[to] = this[k];
                to++;
            }
        }
        k++;
    }
    return A;
};

Array.prototype.reduce = function (callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    //if(len === 0 && arguments.length <  2 ) {throw "type error"}
    var k = 0;
    var accumulator;
    if(arguments.length > 2) { 
        accumulator = arguments[1]; 
    }else{
        var kPresent = false;
        while(kPresent === false && k < len){
            kPresent = this.hasOwnPropery(k.toString());
            if(kPresent){
                accumulator = this[k];
            }
            k++;
        }
        // if(!kPresent) {throw "type error"}
    }
    while( k < len ){
        if(this.hasOwnPropery(k.toString())){
            accumulator = callbackfn.call(undefined,accumulator,this[k],k,this);
        }
        k++;
    }
    return accumulator;
};
Array.prototype.reduceRight = function (callbackfn){
    var len = this.length; // toUint32(this.length)
    //if(! callbackfn instanceof Function) {throw "typeerror"}
    //if(len === 0 && arguments.length <  2 ) {throw "type error"}
    var k = len - 1;
    var accumulator;
    if(arguments.length > 2) { 
        accumulator = arguments[1]; 
    }else{
        var kPresent = false;
        while(kPresent === false && k >= 0){
            kPresent = this.hasOwnPropery(k.toString());
            if(kPresent){
                accumulator = this[k];
            }
            k--;
        }
        // if(!kPresent) {throw "type error"}
    }
    while( k >= 0 ){
        if(this.hasOwnPropery(k.toString())){
            accumulator = callbackfn.call(undefined,accumulator,this[k],k,this);
        }
        k--;
    }
    return accumulator;
};


