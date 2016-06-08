//  lisp 简明扼要的教程
/*
    变量类型： 布尔型，数字型，原子，字符串，列表。
        在编程中一个变量 var x = 123。 可分为变量 x 和 变量中的值 123。
        在 lisp 中， 变量 x 叫做原子，123 是变量中存储的值。
    变量名，由 !#$%&|*+-/:<=>?@^_~  数字 字母组成，但是第一个字符不能是数字。
    
    语法：
    1. x 返回 x 中的值，比如 123
    2. 'x 返回原子 x 也就是说不对 x 求值。此为 (quote x) 的简写
    3. (fn 1 2) : 1 2 作为参数调用 fn
    4. '(fn 1 2) : 返回一个列表 [fn,1,2] 也就是不求值的意思。也是 (quote (fn 1 2)) 的简写
    5. (if condition returned alt) : if 语句
    6. (define x 3) 变量定义，及初始化
    7. (define (f x y) (+ x y)) 函数定义
    8. (set! x 7) 变量赋值
*/


jHaskell.importAs();

    var chr = jsParse.chr,
        token = jsParse.token,
        space = jsParse.space,
        spaces = jsParse.spaces,
        letter = jsParse.letter,
        digit = jsParse.digit,

        oneOf = jsParse.oneOf,
        noneOf = jsParse.noneOf,
        range = jsParse.range,
        sepBy = jsParse.sepBy,
        choice = jsParse.choice,
        trys = jsParse.trys,

        many = jsParse.many,
        many1 = jsParse.many1,
        skipMany = jsParse.skipMany,
        parse = jsParse.parse,
        parser = jsParse.parser,
//        make_result = jsParse.make_result,
        return_result = space.returnM;

    var doM = jHaskell.doM;
    // Lisp 变量类型：Atom List DottedList Number String Bool
    function LispVal(type,val){ this.type = type; this.value=val;}
    function Atom(str) { return new LispVal("Atom",str); }
    function ListL(arr) { return new LispVal("List",arr); }
    function DottedList(arr,e) { 
        var a = new LispVal("DottedList",arr);
        a.extraVal = e;
        return a;
    }
    function NumberL(v) { return new LispVal("Number",v); }
    function StringL(str) { return new LispVal("String",str); }
    function BoolL(b) { return new LispVal("Bool",b); }
    function Func(params,body,closure){
        var fn = new LispVal("Function");
        fn.params = params;
        fn.body = body;
        fn.closure = closure;
        return fn;
    }
    LispVal.prototype.show = function() {
        var i,r = "";
        switch(this.type) {
            case "Atom": 
                return  this.value;
            case "String" :
                return "\"" + this.value +"\"";
            case "Number" :
                return this.value.show();
            case "Bool" :
                return this.value ? "#t" : "#f";
            case "List" :
                r = "(";
                if(this.value.length === 0) { return "Nil";}
                r += this.value[0].show();
                for(i=1;i<this.value.length;i++){
                    r += " " + this.value[i].show();
                }
                r += ")";
                return r;
            case "DottedList" :
                r = "(";
                if(this.value.length === 0) { return "Nil";}
                r += this.value[0].show();
                for(i=1;i<this.value.length;i++){
                    r += " " + this.value[i].show();
                }
                r += " . ";
                r += this.extraVal.show();
                r += ")";
                return r;
            case "Function":
                r  = "(lamada (";
                r += this.params.join(" ");
                r += ")";
                for(i=0;i<this.body.length;i++){
                    r+= " " + this.body[i].show();
                }
                r += ")";
                return r;
        }
        return "found value";
    };
    instanceW(jHaskell.Eq,LispVal,{
        equal: function(lpv2){
            var lpv1 = this;
            if(lpv1.type !== lpv2.type ) { return false; }
            switch(lpv1.type){
                case "Atom" : case "String" : case "Bool" : case "Number":
                    return lpv1.value === lpv2.value;
                case "List":
                    return lpv1.value.equal(lpv2.value);
                case "DottedList":
                    return lpv1.value.equal(lpv2.value) && lpv1.extraVal.equal(lpv2.extraVal);
            }
        }
    });

    var symbol = oneOf("!#$%&|*+-/:<=>?@^_~");
    // skipSpaces :: Parser ()
    // 忽略空格
    var skipSpaces = skipMany(space);

    // parString :: Parser LispVal
    var code = doM(function(){
        chr("\"");
        x <- many(noneOf ("\""));
        chr("\"");
        return_result(StringL(x));
    });
    var parseString = eval(code);

    // parseAtom :: Parser LispVal
    code = doM(function(){
        first <- choice(letter,symbol);
        rest <- many(choice(letter,digit,symbol));
        atom = first + rest;
        result = atom == "#f" ? BoolL(false) : atom == "#t"? BoolL(true) : Atom(atom);
        return_result(result);
    });
    var parseAtom = eval(code);
    // parNumber :: Parser LispVal
    code = doM(function(){
        nums <- many1(digit);
        return_result(NumberL(parseInt(nums)));
    });
    var parseNumber = eval(code);
    
    var _t = parser(function(st){
        var p = eval(doM(function(){
            chr("(");skipSpaces;
            x <- trys(parseList,parseDottedList);
            skipSpaces;chr(")");
            return_result(x);
        }));
        return choice(parseQuoted,p).runParser(st);
    });
    var parseExpr = choice(parseAtom,parseString,parseNumber,_t);
    
    // parseList :: Parser LispVal
    var parseList = eval(doM(function(){
        x <- sepBy(parseExpr,spaces);
        return_result(ListL(x));
    }));
    // parseDottedList :: Parser LispVal
    var parseDottedList = eval(doM(function(){
        head <- sepBy(parseExpr,spaces);
        tail <- spaces.thenM(chr(".")).thenM(spaces).thenM(parseExpr);
        return_result(DottedList(head,tail));
    }));
    // parseQuoted :: Parser LispVal
    var parseQuoted = eval(doM(function(){
        chr("'");
        x <- parseExpr;
        return_result(ListL([Atom("quote"),x]));
    }));

    var throwError = Left;
    var eval_result = Right;
    // trap_Error :: (a -> c) -> (b -> c) -> Either a b -> c
    var trap_Error = either;
    // LispVal -> LispVal
    function evaluate(env){
        return function(lispv){
            // 预定义的基本函数
            var evaluateWithEnv = evaluate(env);
            function numberBiFunction(fn){
                return function(args){
                    var acc = args[0].value,i;
                    for(i=1;i<args.length;i++){
                        acc = fn(acc,args[i].value);
                    }
                    return eval_result(NumberL(acc));
                };
            }
            function boolBiFunction(fn){
                return function(args){
                    var acc = args[0].value,i;
                    for(i=1;i<args.length;i++){
                        acc = fn(acc,args[i].value);
                    }
                    return eval_result(BoolL(acc));
                };
            }
            var  primitives = {
                "+": numberBiFunction(function(x,y) { return x+y; }),
                "-": numberBiFunction(function(x,y) { return x-y; }),
                "*": numberBiFunction(function(x,y) { return x*y; }),
                "/": numberBiFunction(function(x,y) { return x/y; }),
                "mod": numberBiFunction(function(x,y) { return x%y; }),
                "=": boolBiFunction(function(x,y) { return x===y; }),
                ">": boolBiFunction(function(x,y) { return x>y; }),
                "<": boolBiFunction(function(x,y) { return x<y; }),
                ">=": boolBiFunction(function(x,y) { return x>=y; }),
                "<=": boolBiFunction(function(x,y) { return x<=y; }),
                "/=": boolBiFunction(function(x,y) { return x!==y; }),
                "&&": boolBiFunction(function(x,y) { return x && y; }),
                "||": boolBiFunction(function(x,y) { return x || y; }),
                "car": function(args) {
                    if(args.length !== 1) {return throwError(" car need one arguments!");}
                    return eval_result(args.value[0].value[0]);
                },
                "cdr": function(args) {
                    if(args.length !== 1) {return throwError(" car need one arguments!");}
                    return eval_result(args.value[0].slice(1));
                }
            };
            function lookup(obj,prop)
            {
                if(obj.hasOwnProperty(prop))
                { return Just(obj[prop]); }
                return Nothing;
            }
            function apply(arr){
                return function(fn){
                    return fn(arr);
                };
            }
            var ret,fnname,realargs,newEnv,i;
            switch(lispv.type){
                case "String": case "Number" : case "Bool": 
                    return eval_result(lispv);
                case "List":
                    if(lispv.value.length === 0) { return eval_result(lispv);}
                    if(lispv.value[0].type !== "Atom") { 
                        return throwError(lispv.value[0].value.show() + " is not a function.");
                    }
                    // quote
                    if(lispv.value[0].equal(Atom("quote"))) {
                        return eval_result(lispv.value[1]);
                    }
                    // if
                    if(lispv.value[0].equal(Atom("if"))) {
                        if(lispv.value.length !== 4) { return throwError("if expect 3 arguments!"); }
                        var condition = evaluateWithEnv(lispv.value[1]);
                        if(condition.isLeft()) { return condition; }
                        condition = condition.getEither().value;
                        if(condition) {
                            return evaluateWithEnv(lispv.value[2]);
                        }
                        return evaluateWithEnv(lispv.value[3]);
                    }
                    // define
                    var def_var,def_val,def_params,def_body,def_t;
                    if(lispv.value[0].equal(Atom("define"))) {
                        switch(lispv.value[1].type){
                            case "Atom":
                                def_var = lispv.value[1].value;
                                def_val = evaluateWithEnv(lispv.value[2]);
                                if(def_val.isLeft()) { return def_val; }
                                def_val = def_val.getEither();
                                
                                def_t = env.defineVar(def_var);
                                if(def_t.isLeft()){ return def_t;}
                                return env.setVar(def_var,def_val);
                            case "List":
                                def_var = lispv.value[1].value[0].value;
                                def_params = lispv.value[1].value.slice(1);
                                def_params = def_params.fmap(function(x){return x.value;});
                                def_body = lispv.value.slice(2);
                                
                                def_t = env.defineVar(def_var);
                                if(def_t.isLeft()){ return def_t;}
                                return env.setVar(def_var,Func(def_params,def_body,env));
                        }
                        return throwError("Unknown error!");
                    }
                    // set!
                    var set_var,set_val;
                    if(lispv.value[0].equal(Atom("set!"))) {
                        set_var = lispv.value[1].value;
                        set_val = evaluateWithEnv(lispv.value[2]);
                        if(set_val.isLeft()) { return set_val;}
                        set_val = set_val.getEither();
                        return env.setVal(set_var,set_val);
                    }
                
                    fnname = lispv.value[0].value;
                    realargs = [].slice.call(lispv.value,1);
                    realargs = realargs.fmap(evaluateWithEnv);
                    for(i=0;i<realargs.length;i++){
                        if(realargs[i].isLeft()) { return realargs[i];}
                        realargs[i] = realargs[i].getEither();
                    }
                    ret =  maybe(throwError(fnname.show() + " is not a function."),
                                 apply(realargs),
                                 lookup(primitives,fnname));
                    if(ret.isLeft()) {                        
                        ret = env.getVar(fnname).bindM(function(fn){
                            if(fn.type !== "Function") { return throwError(fnname.show() + " is not a function."); }
                            newEnv = new Env(fn.closure);
                            for(i=0;i<fn.params.length;i++){
                                newEnv.defineVar(fn.params[i]);
                                newEnv.setVar(fn.params[i],realargs[i]);
                            }
                            for(i=0;i<fn.body.length-1;i++){
                                ret = evaluate(newEnv)(fn.body[i]);
                                if(ret.isLeft()) { return ret;} 
                            }
                            return evaluate(newEnv)(fn.body[i]);
                        });
                    }
                    return ret;
                case "Atom":
                    return env.getVar(lispv.value);
            }
            return throwError("Und");
        };
    }
    
    // 执行环境
    function Env(closure){ this.env = {};this.closure=closure;}
    Env.prototype = {
        constructor:Env,
        isBound: function(variable) { return this.env.hasOwnProperty(variable); },
        getVar: function(variable) {
            var that = this;
            while(that){
                if(that.isBound(variable)) { 
                    return eval_result(that.env[variable]);
                }
                that = that.closure;
            }
            return throwError("Undefined variable " + variable);
        },
        setVar: function(variable,value) {
            if(this.isBound(variable)) { 
                return eval_result(this.env[variable] = value);
            }
            return throwError("Undefined variable " + variable);
        },
        defineVar: function(variable) {
            if(this.isBound(variable)) {
                return throwError(variable + " has been defined!");
            }            
            this.env[variable] = null;
            return eval_result(ListL([]));
        }
    };
    // readExpr :: String -> Either String String
    var gobalEnv = new Env();
    function readExpr(src){
        var r = parse(skipSpaces.thenM(parseExpr),src);
        if(r.isLeft()){ return throwError(r.getEither()); }
        return evaluate(gobalEnv)(r.getEither());
    }
    function main(src,display){
        var restult = readExpr(src);
        var output = trap_Error(
            function(errmsg){ return "Error:" + errmsg;},
            function(reslt) { return reslt.show(); },
            restult
        );
        return display(output);
    }
