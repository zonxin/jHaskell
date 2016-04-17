define([
],function(){
    function doM(code)
    { 
        var lines = code.split(";"),
               parsed = "", i,line,segs,seg,hasLet = "";
        for(i=lines.length - 1;i>=0;i--){
            line = lines[i].trim();
            // skip blank line
            if(line.length === 0) { continue;}
            segs = line.split("<-");
            // Last line
            if(parsed.length === 0) {
                if(segs.length > 1) { throw "doM.parse: parse error"; }
                parsed = segs[0];
                continue;
            }
            // other Lines
            if(segs.length > 2){throw "doM.parse: parse error;";}
            if(segs.length == 1){ // thenM and let
                // let
                if(/[^=]=[^=]/.test(segs)) {
                    hasLet = "var " + segs[0] + ";" + hasLet;
                    continue;
                }
                if(hasLet){
                    parsed = segs[0].trim() + ".thenM((function(){ "+ hasLet +"return "+ parsed + ";})())" ;
                    hasLet = "";
                    continue;
                }
                parsed = segs[0].trim() + ".thenM(" + parsed + ")";
            }else{ // bindM
                if(hasLet){
                    parsed = segs[1].trim() + ".bindM(function (" + segs[0] + "){ " + hasLet +"return " + parsed + ";})";
                    hasLet = "";
                    continue;
                }
                parsed = segs[1].trim() + ".bindM(function (" + segs[0] + "){ return " + parsed + ";})";
            }
        }
        parsed =hasLet + parsed + ";";
        return  arguments.length>1? doM.pretty(parsed) : parsed;
    }
    doM.pretty = function (code) {

        function addTab(lines,num){
            var space,arr;
            arr = new Array(num);
            space = arr.join("    ");
            return space + lines.trim() + "\n";
        }

        var pretty = "\n",len=code.length,i=0,j=0,ch;
        var cntTab=1;
        for(i=0;i<len;i++){
            ch = code[i];
            switch(ch){
                case "{": 
                    pretty += addTab(code.slice(j,i+1),cntTab);
                    cntTab++;
                    j = i + 1;
                    break;
                case ";": 
                    pretty += addTab(code.slice(j,i+1),cntTab);
                    j = i + 1;
                    break;
                case "}": 
                    cntTab--;
            }
        }
        pretty += addTab(code.slice(j),cntTab);
        return pretty + "\n";
    };

    return doM;
});
