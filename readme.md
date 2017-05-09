# Javascript Haskell Library

一个可以极大减小代码量和减小函数粒度的库,做到只需要看到函数的声明就可以知道函数的大概作用。

首先,安装 nodejs <https://nodejs.org/en/>, 安装过程中要选择安装 npm 模块。打开命令控制台执行以下命令。

# 全局安装 grunt-cli 只需要安装一次, linux 可能需要管理员权限
npm install -g grunt-cli 

git clone https://github.com/zonxin/jHaskell.git
cd jHaskell
# 安装依赖模块
npm install
# 编译
grunt

# 基本教程

## 零. 准备工作

此处教程主要目的是为了解释一些概念。

方便写代码，首先在网页里执行，`jHaskell.importAs()`，这样，
`jHaskell.equal(1,2)` 就可以简写为`equal(1,2)`了。下载整个工程编译之后，可以直
接打开 test/demo.html 在浏览器的控制台里面执行下面的 Javascript 代码。

## 一. 数据类型(1)

### 1. Unit

这个数据类型只有一个值,如果一个变量是 Unit 型的，那么它的取值只有一种，那就是
`Unit`，例如`var x = Unit;x.show()`。
也就是说,`Unit`既是一个数据类型的名字也是一个值,
不要弄混。不要认为这种数据类型没有用,这是一种很重要的数据类型。

### 2. Bool

Bool型,有两种可能的取值`True`和`False`。这种数据类型仅仅是 Javascript Boolean
类型的包装而已,与原始的数据类型相同。如`var x = True;`，为了方便描述，记为：
``` Haskell
data Bool = False | True
-- 意思是 Bool 型的变量可能取值是 False 或是 True
-- 这是注释
```

### 3. Ordering

Ordering型有三种可能的取值: `LT`,`EQ`,`GT`。基本用途就是比较两个数据大小时候的
返回值,分别代表小于,等于和大于。`var x = EQ; x.show();`
``` Haskell
data Ordering = LT | EQ | GT
```
### 4. Float

Float 仅仅是 Javascript Number 类型重新命名一下而已。`var x = 10;`
``` Haskell
type Float = Number   --数据类型别名，或者说相当于C里面的 typedef
```
### 5. List

List 也仅仅是 Javascript 数组重新命名一下而已。`var x = [1,2,3]`
``` Haskell
-- type List = Array
data [a] = [] | a:[a]  
```
(:)表示在数组的最前面加一个元素,相当于 Javascript 的 unshift。这是一个递归定义
：这是一个递归定义： 1.`[]` 是数组;2.如果 x 是数组,x 前添加一个元素也是数组比如
,`[]` 是数组,那么 `1:[] = [1]` 也是数组;`[1]` 是数组,因此 `2:[1] = [2,1]` 也是
数组。想要生成一个数组，就必须提供另外一种数据类型 a，如果a是Float那么就生成的就
是 Float型的数组`[Float]`，如果 a 是 Bool 型的数据，那么这就是一个Bool型的数组
`[Bool]`，如`[false,true,false]`。当然，由于 Javascript 是弱类型的语言，即使有
不同类型的数组元素`[1,true,20]`也不会有问题。

### 6. Maybe

Maybe 仅仅是为了给其他数据类型添加额外的值而存在的。可能的取值是`Nothing`,或者仅仅
是原始数据类型的取值。`var x = Nothing;var y = Just(5)`。
与 Array 相同，需要给Maybe提供另外一个数据类型。比如
Maybe Bool型，Maybe Float 型。其实可以把 Maybe 看作是一个长度为 0 或是 1 的数组
。 当然，Maybe 不是数组，我们不能写为 `[a]` 因此我们新定义一个生成 Maybe 类型的方
式。
``` Haskell
data Maybe a = Nothing | Just a
```
其中 Nothing 相当于`[]`,Just 是一个构造函数(为了简便通常空白表示函数调用，并且
具有最高的优先级`sqrt 2 + 3 = (sqrt 2) + 3` 而非 `sqrt (2+3)`,时刻记得)，可以使
用`new Just(5);`来生成一个 Maybe Float 型的数据，当然也可以简写为`Just(5)`。
`Just a`类似于函数声明，说它接收一个a类型的参数，返回一个
Maybe a型的数据。比如 a 为 Float。`Just 5` 生成一个 Maybe Float 型的数据。其实
Nothing 也可看作是构造函数，只是它需要 0 个参数。通常构造函数名首字母为大写，其
实List 定义中的(:)也是一个函数，只是Javascript 不支持用(:)作为函数名。可以通过
`Just(x).value`来获得原本的数值`x`。例如，`var y = Just(5);y.value ===5`。通常情况下,Maybe会用
来进行错误处理。

### 7. String

String 本质上就是一个字符组成的 List 而已。
``` Haskell 
type String = [Char]
```
### 8. Char

在 Javascript 里不存在字符型。在此我们没有也必要定义Char型的数据,在需要的时候我们把长度为 1 的字符串看作字符型。

## 二. class数据类型类(1)

所谓的数据类型类(class跟其他的语言中的class不是同一个意思)是指对数据类型的描
述。意思是指可以在一个数据类型上进行什么样的操作/执行什么样的函数。比如 Float 属于 Eq 类,那么 Float 型
的数据可以比较是否相同,即Float型可以作为 equal 的参数。把某种类型的数据定义某种
类的好处是：1、某些数据类型为同一 class ,我们就可以为他们定义相同名字的操作（或
者叫做函数重载，函数根据参数的类型和数量决定执行的过程），作用也相同。比如，所
有 Eq 类的数据类型都可以比较是否相等；2、可以附送额外的函数，比如某种类型声明为
Eq，并且为其定义了equal 函数，那么 jHaskell 就可以为这个类型自动添加一个
unequal 函数。

### 1. Eq 类

属于 Eq 类的数据类型可以比较大小,也就是说可以作为 equal 函数的参数。
``` Haskell
class Eq a where  -- 如果 a 是 Eq 类则支持下面的函数
    (==),(/=)  :: a -> a-> Bool  -- equal 和 unequal 函数
    -- 函数声明:: 意思是 equal 和 unequal 接受两个相同类型的参数,返回一个 Bool 型
```
比如 a 是 Float 型,则需要为 Float 定义这两个函数（可以定义一个，附送另外一个）
。Bool 和 Float 都属于 Eq 类，因此可以 `equal(100,100) == true`，
`equal(true,true)==true`。equal 函数声明中要求两个参数类型相同，但是对于
Javascript 这种弱类型的语言来说，我们没有任何办法阻止你使用不同类型的参数。但是
结果就可能不是你预期的结果。其他属于 Eq 类的类型：
``` Haskell
instance Eq Unit
instance Eq Bool 
instance Eq Ordering 
instance Eq Float 
instance Eq a => Eq (Maybe a)  
-- 只有类型 a 属于 Eq 类， Maybe a 才属于 Eq 类
-- a 属于 Eq 类是 Maybe a 属于 Eq 类的必要条件
instance Eq a => Eq [a]
```
`equal(Just(2),Just(2))`

### 2. Ord 类

Ord 类是指可以比较大小的数据类型,属于 Ord 类的数据类型必须属于首先属于 Eq 类。(可以叫继承吗？)
``` Haskell
-- 只有类型 a 属于 Eq 类,那么 a 才属于 Ord 类
class Eq a => Ord a where
    -- compare 接收两个相同类型的参数,返回一个 Ordering类型（即LT,EQ,GT中的一个）
    compare :: a -> a -> Ordering 
    -- lt,gt,le,ge 函数,只要实现 compare 会自动生成这几个函数
    (<),(>),(<=),(>=) :: a -> a -> Bool
```
比如 `compare(2,3).show()` 返回 `LT`。`show`的作用是将其转换成字符串。
``` Haskell
compare(1,1).show(); // EQ
compare(LT,EQ).show(); // LT
compare("123","abc").show(); // LT
(2).lt(3); // true
```
### 3. Enum 类(枚举型)

在 C 中枚举型本质上是一个整数。在此,属于 Enum 的数据类型指可以转换成一个整数的
数据类型。
``` Haskell
class Enum a where
    succ   :: a -> a  -- 相当与 +1; 比如 succ(LT) === EQ
    pred   :: a -> a  --   -1 ; pred("b") === "a"
    toEnum :: Int -> a  -- 把整型转换为 a 类型; toEnum(0,Ordering) == LT 
    fromEnum  :: a -> Int  -- 将其转换为整形; fromEnum("a") === 97
    enumFromTo   ::  a -> a -> [a]  -- enumFromTo("a","z") === ["a","b","c"..."z"]
    enumFromThenTo :: a -> a -> a -> [a] 
    -- enumFromThenTo(1,3,9) === [1,3,5,7,9] 等差数列
```
由于 toEnum 会返回多种类型的数据，因此需要提供额外的一个参数确定返回的类型。

### 4. Show 类

可转换为字符串,类似toString,只是有些数据类型可能和toString的结果不太相同。
`show(Just(1))`,`show([1,2,3])`
 ``` Haskell   
class Show a where
    show :: a -> String
```

## 三. 将数据类型声明为某一类

由于 Javascript 不支持真正意义上的多态函数，为了实现和使用方便的目的, 执行
`equal(2,3)`的时候，其实仅仅是调用了 2 的 equal 方法，上面的代码相当于
`(2).equal(3)`。因此，一个函数实际上是由该函数的某个参数实现的。jHaskell 为每个
函数都确定了一个合适的参数来实现这个函数。比如 equal 是由该函数的第一个参数来实现该
操作，就是说 `equal(2,3)` 调用的其实是 2 的 equal 方法。
``` Javascript
// instance Eq Float where
instanceW(Eq,Float,{ equal: function(x){ return this.valueOf() === x; } });
// 这样 jHaskell 会自动帮我们实现 unequal 方法。
```
下面我们定义一个新的数据类型来表示一个坐标点 (x,y),并给他添加 equal 方法。
``` Javascript
function Point(x,y) { this.x = x; this.y = y; }
instanceW(Eq,Point,{ 
    equal: function(p){ 
        return this.x === p.x &&  this.y === p.y;
    }
});
instanceW(Show,Point,{
    show: function(p){
        return "(" + this.x + "," + this.y + ")";
    }
});

var p1 = new Point(4,5); 
var p2 = new Point(4,5); 
var p3 = new Point(10,5);
p1 === p2; // False
p1.equal(p2); // True
p1.equal(p3); // False
p1.unequal(p3); // True
elem(p1,[p1,p2,p3]); // True
// elem :: (Eq a) => a -> [a] -> Bool 
// elem 判断一个变量的值是否在一个数组中出现
// 是不是看函数声明就知道了其基本用途?
p1.show(); // (4,5)
```
#### 事关 Enum 

Enum 类的数据类型需要定义一个 fromEnum 的方法。但是例如 `LT.fromEnum()`这样的代码
似乎在语义上不太好理解。为了强化代码的语义，当一个数据类型定义为 Enum 类时，额外提供一个
叫做 toNum 的方法。实现的时候可以选择实现 `toNum` 或是 `fromEnum`,实现其中一个自动生成
另外一个。
``` Javascript
function Num(){}
var Zero = new Num();
var One = new Num();
instanceW(Enum,Num,{
    toEnum: function(n){ var arr = [Zero,One]; return arr[n]; },
    toNum: function() { if(this === Zero) {return 0;} else { return 1; } }
});
fromEnum(Zero);  // 0
One.fromEnum(); // 1
One.toNum();  // 1

// 当然 jHaskell 定义了一种更简单的方式
Num = dataEnum("Zero | One"); // 这样生的的类会自动继承 Eq,Ord,Enum,Show 类
importAs(Num,window);
fromEnum(Zero); // 0
Zero.show(); // "Zero"
```
## 四. class数据类型类(2)

### 5. Functor 类(函子)
``` Haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b  --注意(a->b)的括号
    -- fmap(fn,fa) 相当于(<=>) fa.fmap(fn);
```
fmap接受两个参数，其中第一个参数是 (a -> b) 也就是说地一个参数是一个函数，这个函数接收
一个a类型的参数，返回b类型的参数。f a 是一种 f 类型的值，比如 f 是 Maybe 那么
fmap 的第二个参数就是 Maybe a 类型的，再如果 a 是Float 型那么，fmap的第二个参数
才能确定为 Maybe Float。a b 可为相同或是不同类型 。例如
```Javascript
fmap(x=> x+1    ,Just(5)).show(); // Just 6
fmap(x=> x+10   ,Just(5)).show(); // Just 15
fmap(x=> x+1,[1,2,3,4,5]).show(); // [1,2,3,4,5]
```
fmap 的作用就是将其中的数据拿出来,然后用这个数据作为函数的输入,然后把返回值放入
这个函子中。

### 6. Monad 类(单子)
``` Haskell
class Monad m where
    -- returnM
    return :: a -> m a
    -- bindM, 注意第二个参数是一个函数,这个函数接收一个a类型的参数，返回 m b 类型
    (>>=) :: m a -> (a -> m b) -> m b
    -- thenM，仅仅是 bindM 的一种特殊情况
    (>>) :: m a -> m b -> m b
    -- ma.bindM(fn) 等价于  bindM(ma,fn)
```

单子是是一个比较常用的概念,在不同的数据结构中 `bindM` 具有不同的意义,虽然他们具
有相同的数学结构。这正是抽象的魅力,看似不相关的东西其实由相同的数学公式描述。既
然有相同的数学描述，那么我们就可以写相似的代码(只是输出的时候显示不一样)，那么
一段代码出现的概率就越大，出现概率大我们可以通过宏（或者添加语法），把很长的代
码写的很短。比如在Javascript 里面我们经常要写`function (x) { return x+2;}`,所以
ES6规定可以直接写成 `x=>x+2`。看似不相干的东西，能写成类似的代码，就更加提高了
一段代码出现的概率，就可以在规定很少的语法的情况下写出更短的代码。

对于 Maybe：
``` Javascript
function fn(x) { return Just(x+1) }
Just(5).bindM(fn).bindM(fn).show() // Just 7
Nothing.bindM(fn).bindM(fn).show() // Nothing
```
可见，如
果前面的数据不是Nothing,就从Maybe中取出数据,作为函数的参数执行后面的函数,否则直
接返回这个 Nothing。一个常用的方式就是：
``` Javascript
ma.bindM(fn1).bindM(fn2).bindM(fn3)
```
fn1~fn3 是可能出错的函数，如果出错直接返回 Nothing 就可以了，由于bindM 的作用，
如果前面的出错了，后面的函数并不会执行。

对于 List: 
``` Javascript
var x = [100,200,300];
function fn(x) { return [x+1,x+2,x+3]; }
x.bindM(fn).show();  // [101,102,103,201,202,203,301,302,303]
// 或者直接写为
[100,200,300].bindM(x=> [x+1,x+2,x+3]).show(); 
```
可见对于数值,bindM的作用是把数组中的每个元素拿出来,然后应用于后面的
函数,最后把这个函数返回的数组链接起来，因此上面的代码返回含有3x3=9个元素的数组。

我前面说过，Maybe可以看作是长度为 0 或 1 的数组。
``` Javascript
[].bindM(x => [x+1]).show(); // []
Nothing.bindM(x=> Just(x+1).show()); // Nothing
```
因为 `[]`，只有 0 个元素那么返回的就是 0x1=0 个元素的数组`[]`。有没有发现上面
的类比很正确？而正是 Monad 揭示了他们之间的相似性。

### 五、doM 语法糖

对于一个单子
``` Javascript
Just(5).bindM(x=>Just(x+1)).bindM(y=>Just(10*y));
```
上面已经讲过，这样写的意思是把 Just(5) 中的 5 取出,作为形参 x,然后执行这个函数
。可是有些时候，我们希望在第二个匿名函数中也可以使用取出的这个 x，也就是 5。那
么我们需要这样写 
```Javascript
function fn(x) { return Just(x+1); }
Just(5).bindM( x=>( 
    fn(x).bindM( y => (
        Just([x,10*y])
    ))
));
```
，如果更长的话写起来就很麻烦了。而很多东西都是 Monad，因此这样的形式是很常见的
。因此我们是不是可以定义一种简写的方式呢？于是 jHaskell 中定义了一个语法糖，于是
上面的代码可以写成：
``` Javascript
function fn(x) { return Just(x+1); }
var code = jHaskell.doM(function(){
    x <- Just(5);
    y <- fn(x);
    Just([x,10*y]);
});
eval(code);
```
`<-` 其实是 `=>` 倒过来写的意思(<=可能会在 Javascript 里用到，因此我们选了一个
不常出现但也是合法的Javascript <-，而且与Haskell中的相同)。因此在 doM 里面
对于 Maybe， <- 的意义就是从Just中取出对应的值(如果后面不是 Just 不再执行后面的
语句，直接返回这个 Nothing,(bindM的定义)，最终返回值是 `Just([x,10*y])`。由于 Javascript
是弱类型的语言，最后即使返回`[x,10*y]`，也不会有问题。只是`[x,10*y]` 和 `Nothing`
不是同一类型的数据。`Nothing` 和 `Just([x,10*y])` 才是同种类型的数据。
``` Javascript
var code = jHaskell.doM(function(){
    x <- [1,2,3];
    y <- [100,200,300];
    [x+y];
});
eval(code);
```
对于数组 `x <- [1,2,3];` 就是 x 遍历`[1,2,3]`的每一个元素，执行后面的代码(这相
当于一个 for); y 遍历 `[100,200,300]` 中的每一个值，最终返回`[x+y]`。doM 其实就
是隐藏的 bindM, 而 bindM 具有把后面函数返回的数组链接到一起的功能,因此结果就是
`[101,201,301,102,202,203,301,302,303]`,其实如果写成这样（目前 jHaskell 还不支持）
``` Haskell
[ x+y | x<-[1,2,3],y<-[100,200,300] ]
```
是不是更加明显呢? `<-` 可以看作数学里面的符号`∈`(属于)，是不是就很好理解了呢？。其实上面的代码相当于:
``` Javascript
var arr = [];
for(var x of [1,2,3]){
    for(var y of [100,200,300]){
        arr = arr.concat([x+y]);
    }
}
```
真的是等价的代码（虽然不是最优的，但是更多时候代码写的短远比效率高更重要，不是吗？
写的短，减小写错的概率，写的短节省程序员的时间）。

#### thenM

其实 thenM 仅仅是一种特殊的情况，thenM 的定义是
``` Javascript
function thenM(ma,mb){
    return bindM(ma,function(x){return mb;});
}
```
主要的用途就是，有些时候我们并不关心前一步的返回值（只要前一步不“出错”）。
``` Javascript
var code = jHaskell.doM(function(){
    z <- [1000,2000];
    x <- [1,2,3];
    y <- [100,200,300];
    [x+y];
});
eval(code); 
// [101,201,301,101,201,301,102,202,302,102,202,302,103,203,303,103,203,303]
// 由于 z 后面没有什么用，就可以写做
var code = jHaskell.doM(function(){
    [1000,2000];
    x <- [1,2,3];
    y <- [100,200,300];
    [x+y];
});
eval(code); 
// 或等价的
[1000,2000].thenM([1,2,3].bindM(function (x ){
    return [100,200,300].bindM(function (y ){
        return [x+y];
    });
})); 
```
仔细的人可能发现，在 Maybe 单子的例子里，其实
``` Javascript   
// 这种写法是不是特别像 gulp 里面的 pipe ？
Just(5).bindM(x=>Just(x+1)).bindM(y=>Just(10*y));
// 和
Just(5).bindM(x=>(
    Just(x+1).bindM(y => 
        Just [x,10*y]
    )
));
```
改变了一些执行顺序，这对我们的函数有什么影响吗？答案是对于 Maybe 满足，因为它符合 Monad Law。

## 六. Law

现在我们说一些很重要，但是对我们写代码作用不大的东西（其实很重要）。就像 Javascript
引擎很重要，但是你不要知道其实现原理依旧可以写代码一样。

既然定义了新的类型类(class)，肯定要满足某种条件，比如Functor满足的条件，叫做 Functor
Law, 否则多定义这个类还有什么意义。当然如果你在某个类型上定义一个`fmap`不满足
Functor Law。jHaskell中没有任何的限制,但是你可能会得不到预期的结果,
如果你定义一个 equal 和 unequal 不是相反的数据类型为 Eq 类那么，jHaskell 自动
给这个类型成生成的 unequal 函数显然就不是你预期的结果。

### 1. Functor law
``` Haskell
fmap id = id  -- var id = function(x){return x;}
fmap (g.f) = fmap g . fmap f   -- 记得函数调用具有最高优先级,要慢慢习惯哦。
```
g 和 f 都是一个函数,g.f 就是函数复合的意思 h = g.f，就是说对于任意参数x,有 h(x) == g(f(x))。
fmap 接收两个参数,如果我们只给它提供一个参数,我们来看 fmap 的声明 
``` Haskell
fmap :: (a -> b) -> f a -> f b
```
其实 (->) 的结合性是从右到左，也就是说 `a -> b -> c` 相当于 `a -> (b -> c)`。
如果我们只给它提供一个参数 fn, 那么它返回的东西就是 f a -> f b, 这是什
么？这是另一个函数。也就是说如果我们只是用一个参数调用两个参数的函数
，就会返回另外一个接受一个参数的函数。例如，
``` Javascript
function add(a) {
    return function (b) {
        return a+b;
    }
}
var add1 = add(1); 
add1(3); // 4
add1(10); // 11
add(4)(5) // 9
```
这种函数叫做curry函数, 因此 fmap g 其实是一个函数。考虑到 Javascript 的函数调用
比较麻烦（要写括号），目前在 jHaskell 中大部分函数还不是curry化的函数。因此，
其实在 jHaskell 中 fmap 的类型应该是`(a->b,f a) -> f b`。`fmap id
= id` 的意思是说,`fmap id` 和 `id` 是等价的函数，可以相互替换。
``` Javascript
function id(x) { return x; }
// 对于任意值 x （当然需要是一个函子类的）
var x = Just(10);
// 满足
fmap(id,x)； 
// 等价于
id(x);
```  
第二条就是
``` Javascript
// 对于任意函数 f g 
function g(x) { return x+10;}
function f(x) { return x*10;} 
// 满足
fmap(x=>g(f(x)),Just(10)); 
// 等价于
var t = fmap(f,Just(10));
fmap(g,t);
```
你可能觉得 Functor Law 意义不大，因为不知道有什么用，而且就这么两条。能干什么？
正是因为它规定的东西少，所以它覆盖的范围广，它可以解释成任何你想要的意义。只要满足上面两条，我们就可以用类
似的代码处理! 当然我们不需要了解上面的 Law，因为我们写代码不需要，只需
要知道如果Haskell里面说某个东西是函子那么它一定符合上面的 Law (经过了严格的数学证明
)，后面的 Law 也是。

### 2. Monad law
``` Haskell
-- bindM 的中缀写法， bindM ma fn 可写作 ma >>= fn ,只是优先级不如函数调用高。
m >>= return     =  m                          -- right unit
return x >>= f   =  f x                        -- left unit 
(m >>= f) >>= g  =  m >>= (\x -> f x >>= g)    -- associativity
-- \x -> x + 1 是匿名函数的写法, -> 优先级高于 >>= 
-- \x -> f x >>= g 相当于 (\x -> f x) >>= g
```
上面提到 Maybe 的时候说道会改变函数的执行顺序，通过上面第三条可以看到，这两种写法是等价的。
至此你应该可以看懂源码中的注释了，那里面有所有的 class 的定义，以及那些数据类型属于哪些类。

## 七. 数据类型(2)

### 9. Either

Either 有两种数据类型组成。比如,Eihter Bool Float类型的值,可以是包装后的 `Bool`
或是包装后的 `Float`。当然只能取其中一种类型的值。 也就是说 Either 是两种类型的
和。通常情况下,Either也会用来了进行错误处理。好吧,在这种情况下,跟原始的
`try...catch...` 结构相同。可是 Either 的用途不仅仅是错误处理。
``` Haskell
data Either a b = Left a | Right b
```
Either 对于第二个参数也是一个函子， bindM 的作用就是，如果是 Left 就返回这个
Left，如果是Right就取出Right 中的值，执行后面的函数。这个跟 Maybe 类似，只是
Nothing 换成了 Left，而 Left 中是可以保存出错原因的。写个例子(更清爽的方法看demo.html里的代码)
``` Javascript
// 仅仅是为了加强语义而定义的函数
var throwE = Left;
var returnE = function(x){ return returnM(x,Either)}
//catchE :: m a -> ( e -> m a)  -> m a
//catchE 若 ma 出错，则执行后面的函数，否则什么也不做
// try{ ... } catch(e){ ... }
function catchE(ma,fn)
{
    if(ma.isLeft()){
        return fn(ma.getEither());
    }
    return ma;
}

// 模拟从数据库查询一个人的父/母
function father(names){
    if(Math.random() > 0.80) { 
        var msg = "Can not find " + names + "'s father "
        return throwE(msg);
    }
    var dad = names + "'s father";
    return returnE(dad);
}
function mother(names){
    if(Math.random() > 0.80) { 
        var msg = "Can not find " + names + "'s momther"
        return throwE(msg);
    }
    var dad = names + "'s mother";
    return returnE(dad);
}
function getGrandparents(names)
{   
    var code = doM(function(){
            dad <- father(names); 
            mom <- mother(names); 
            gp1 <- father(dad);   
            gp2 <- mother(dad);   
            gp3 <- father(mom);   
            gp4 <- mother(mom);   
            returnE([dad,mom,gp1,gp2,gp3,gp4]);
        }, "Output Pretty Code");
    // console.log(code);
    return eval(code);
}
// try { result = getGrandparents("Peter") } catch(e) { console.log(e); }
var result = catchE(getGrandparents("Peter"),function(e){
    console.log(e);
    return returnE(["Nobody"]);
}).show();
   console.log(result);
```
抽象的魅力正在于此：正因为它什么都不是，所以它可以是任何东西。如果你赋予 Left 是
throw 的意义，那么，Either 单子就是一个 try catch 结构。

## 八. class数据类型类(3)

### 7. Monoid 类（幺半群）

为了简便,有时候我们把二元函数调用 `fn(a,b)` 写为 ``a `fn` b``（反引号`` ` ``，
键盘左上角，数字1旁边那个），这种形式的叫做中缀表达式，像加法 `2 + 3` 也是
中缀表达式。
``` Haskell
class Monoid a where
    mempty :: a   -- 仅仅是一个这种类型的数据,通常叫做单位元
    mappend :: a -> a -> a
```

#### Monoid Law
``` Haskell
mempty `mappend` x = x  -- 单位元
x `mappend` mempty = x  -- ; x + 0 = x
(x `mappend` y) `mappend` z =  x `mappend` (y `mappend` z)
    --  (a + b) + c = a + (b + c) 分配律
```
当然因为某些原因,在此 Float 型暂时还没有被定义成 Monoid 类。但是字符串相对与字
符串链接是一个 Monoid,单位元是 "" : 
``` Javascript  
"".mappend("abc"); // "abc"
"abc".mappend(""); // "abc"
"a".mappend("b").mappend("c"); // "abc"
"a".mappend(("b".mappend("c"))); // "abc"
// 其实就是
("a" + "b") + "c" === "a" + ("b" + "c")
```
### 8. Applicative 类
``` Haskell
class Functor f =>  Applicative f where
    pure :: a -> f a  -- pure(10,Array) == [10] 
    -- 因为pure可以生成多种类型的数据,因此需要加一个参数
    -- applyTo
    (<*>) :: Applicative f => f (a->b) -> f a -> f b
```
List 是一个 Applicative: 
``` Javascript
[x=>x+1,x=>x+2,x=>x+3].applyTo([10,20,30]).show()
[x=>y=> x+y].applyTo([10,20,30]).applyTo([1,2,3]).show()
```
另外需要说明的是，其实如果一个类型是 Monad 也是一个 Applicative，return 和 pure
是等价的。只是前人还没证明的时候就把 Monad 和 Applicative 分别放入了 Haskell 中
。因此 applyTo 的行为和 bindM 有点儿相似，完全可以用 bindM 来实现 applyTo。
不是所有的 Applicative 都是 Monad，但所有的Monad 都是 Applicative。
``` Javascript
returnM(10,Array); // [10]
pure(10,Array); // [10]

function applyTo(u,v){
    var code = doM(function(){
        f <- u;
        x <- v;
        returnM(f(x),Applicative);
    });
    return eval(code);
}
```
#### Applicative Law
``` Haskell
pure id <*> v = v
pure f <*> pure x = pure (f x)
u <*> pure y = pure ($ y) <*> u
pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
```

# LICENSE

MIT
