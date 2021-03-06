define([
    './Eq.js',
    './Ord.js',
    './Ordering/LT.js',
    './Ordering/EQ.js',
    './Ordering/GT.js',
    './Enum.js',
    './Show.js',
    './instanceW.js'
],function(Eq,Ord,LT,EQ,GT,Enum,Show,instanceW){
    function dataEnum(str){
        var NewType = function(){},
            consName = str.split("|"),
            len = consName.length,
            consarr= [],k;
        for(k=0;k<len;k++) {
            name = consName[k].trim(); consName[k] = name;
            NewType[name] = new NewType();
            consarr.push(NewType[name]);
        }
        instanceW(Eq,NewType,{ equal: function(e) { return this === e? true:false;} });
        instanceW(Ord,NewType,{
            compare: function(c) {
                var t1,t2;
                t1 = this.toNum(); t2 = c.toNum();
                if(t1<t2) { return LT; }
                else if(t1 === t2) { return EQ; }
                else { return GT; }
            }
        });
        instanceW(Enum,NewType,{
            toEnum:function(n){ return consarr[n]; },
            toNum:function(){
                var i,len=consarr.length;
                for(i=0;i<len;i++){ if(this === consarr[i]) { return i; } }
            }
        });
        instanceW(Show,NewType,{ show:function (){ var i = this.toNum(); return consName[i]; }});
        return NewType;
    }
    return dataEnum;
});
