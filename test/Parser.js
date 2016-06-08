/*
 * 依赖与 jHaskell 但是很容易改为不依赖 jHaskell 的代码
 * @author: zonxin
 */

(function (jHaskell){
    var Unit = jHaskell.Unit,
        Left = jHaskell.Left,
        Right = jHaskell.Right,
        Monad = jHaskell.Monad,
        instanceW = jHaskell.instanceW;
    // ParserState 源码
    function ParserState(src,index){
        this.src = src;
        this.index = index || 0; // 保存已经解析到的位置
        this.length = src.length - this.index;
    }
    ParserState.prototype = { 
        constructor:ParserState, 
        charAt: function(i) { return this.src.charAt(this.index + i); },
        from: function(i) { return new ParserState(this.src,this.index + i);},
        substring: function(start,end){
            return this.src.substring(start+this.index,(end || this.length) + this.index);
        },
        trimLeft: function(){
            var s = this.substring(0),
                m = s.match(/^\s+/);
            return m?this.from(m[0].length) : this;
        }
    };

    function Tuple(ast,state) { this.ast = ast; this.state = state; }
    Tuple.prototype.getAst = function(){ return this.ast; };
    Tuple.prototype.getState = function(){ return this.state; };
    function parse_result(ast,state) { return new Tuple(Right(ast),state); }
    function parse_error(ast,state) { 
        if(typeof ast !== "string") { throw "Parser.parse_error: TypeError"; }
        return new Tuple(Left(ast),state); 
    }
    // type Parser ast = Parser{ runParser:: ParserState -> (Either String ast,ParserState) }
    // 事实上，解析器是一个接受源码，返回解析结果和剩余源码的函数
    // Left 表示解析出错，Right 中是解析结果
    // 为了理解起来简单，就不用单子变换了
    function Parser(fn) { this._runParser_ = fn; }
    Parser.prototype.runParser = function(st){ return this._runParser_.call(null,st); };
    instanceW(Monad,Parser,{
        // return ast = parser $ \st -> (ast,st)
        returnM:function(ast){ return parser(function(st){ return parse_result(ast,st); }); },
        // >>= :: Parser ast -> (ast -> Parser ast2) -> Parser ast2
        // e.g. >>= :: (st -> (ast,st)) -> (ast -> st -> (ast,st) ) -> ( st->(ast2,st) )
        bindM:function(fn){     // fn:: (ast -> st -> (ast,st))
            var that = this;  // this :: st -> (ast,st)
            return parser(function(st){ // st -> (ast2,st)
                var r1 = that.runParser(st),
                    st1 = r1.getState(),
                    ast1 = r1.getAst();
                if(ast1.isLeft()) { return r1; }
                return fn(ast1.getEither()).runParser(st1);
            });
        } // end bindM
    });
    // MonadPlus
    Parser.prototype.mplus = function(p){
        var that = this;
        return parser(function(st){
            var r1 = that.runParser(st),
                st1 = r1.getState(),
                ast1 = r1.getAst();
            if(ast1.isRight()) { return r1; }
            return p.runParser(st);
        });
    };
    function parser(fn) { 
        return new Parser(fn);
    }
    // parse :: Parser a -> String -> a
    function parse(p,src){
        var st = new ParserState(src),
            r = p.runParser(st);
        return r.getAst();
    }

    /************************** 量词 **********************************/
    // many :: Parser String -> Parser String
    // 匹配任意次
    function many(p){
        return parser(function(st){
            var retAst = "",
                st0 = st;
            while(1){
                t = p.runParser(st0);
                if(t.getAst().isLeft()) { break; }
                retAst += t.getAst().getEither();
                st0 = t.getState();
            }
            return parse_result(retAst,st0);
        });

    }
    // many1 :: Parser String -> Parser String
    // 至少匹配一次
    function many1(p){
        return parser(function(st){
            // 第一次匹配
            var t = p.runParser(st),
                ast0 = t.getAst(),
                st0 = t.getState();
            if(ast0.isLeft()) { return t; }

            var retAst = ast0.getEither();
            while(1){
                t = p.runParser(st0);
                if(t.getAst().isLeft()) { break; }
                retAst += t.getAst().getEither();
                st0 = t.getState();
            }
            return parse_result(retAst,st0);
        });
    }
    // skipMany :: Parser string -> Parser ()
    function skipMany(p){
        return parser(function(st){
            var t;
            while(1){
                t = p.runParser(st);
                if(t.getAst().isLeft()) { break; } 
                st = t.getState();
            }
            return parse_result(Unit,st);
        });
    }
    /************************** 解析器 **********************************/
    // token:: String -> Parser String
    function token(s){
        return parser(function(st){
            var r = st.length >= s.length && st.substring(0,s.length) === s;
            return r ? parse_result(s,st.from(s.length)):
                       parse_error("Expect: " + s,st);
        });
    }
    function toParser(p){ return typeof p === "string" ? token(p):p; }
    // chr :: Char -> Parser Char
    // 同 token ，只是为了效率
    function chr(c){
        return parser(function(st){
            var r = st.length >= 1 && st.charAt(0) === c;
            return r ? parse_result(c,st.from(1)):
                       parse_error("Expect: " + c,st);
        });
    }
    // oneOf :: String -> Parser Char
    function oneOf(str)
    {
        var chrs = str.split("");
        return parser(function(st){
            if(st.length < 1) { return parse_error("Unexpect file ending."); }
            var fst = st.charAt(0);
            return jHaskell.elem(fst,chrs) ? 
                        parse_result(fst,st.from(1)):
                        parse_error("Unexpect " + fst,st);
        });
    }
    // noneOf:: String -> Parser Char 
    function noneOf(str){
        var chrs = str.split("");
        return parser(function(st){
            if(st.length < 1) { return parse_error("Unexpect file ending."); }
            var fst = st.charAt(0);
            return jHaskell.elem(fst,chrs) ?  
                        parse_error("Unexpect " + fst,st):
                        parse_result(fst,st.from(1));
        });
    }
    var space = oneOf(" \t\f\n");
    var spaces = many1(space);

    function range(l,u){
        return parser(function(st){
            if(st.length < 1) { return parse_error("Unexpect ending",st);}
            var ch = st.charAt(0);
            return ch >= l && ch <= u ?  
                        parse_result(ch,st.from(1)) :
                        parse_error("Unexpect " + ch,st);
        });
    }
    function choice(p1,p2){
        var ps = [].slice.call(arguments,0);
        ps = ps.fmap(toParser);
        return parser(function(st){
            var i,t;
            for(i=0;i<ps.length;i++){
                t = ps[i].runParser(st);
                if(t.getAst().isRight()) { return t; }
            }
            return t;
        });
    }
    var letter = choice(range("a","z"),range("A","Z"));
    var digit = range("0","9");
    
    function sepBy(p1,p2) {
        return parser(function(st){
            var r1,ast1,st1 = st,r2,ast2,st2 = st;
            var arr = [];
            while(1){                
                r1 = p1.runParser(st2);
                if(r1.getAst().isLeft()) { break;}
                arr.push(r1.getAst().getEither());
                st1 = r1.getState();
                r2 = p2.runParser(st1);
                if(r2.getAst().isLeft()) { break;}
                st2 = r2.getState();
            }
            return parse_result(arr,st1);
        });
    }
    
    function trys(p1,p2)
    {
        return parser(function(st){
            var r1 = p1.runParser(st),
                r2 = p2.runParser(st);
            if(r2.getAst().isRight()) { return r2;}
            return r1;
        });
    }
    
    var jsParse = {
        chr: chr, token:token,
        space: space, spaces:spaces,
        letter: letter,
        digit: digit,

        oneOf: oneOf,noneOf:noneOf,
        range: range, choice:choice,

        many:many,many1: many1, skipMany:skipMany,
        sepBy:sepBy,trys:trys,

        parse: parse,
        parser:parser,
    };
    window.jsParse = jsParse;
})(jHaskell);
