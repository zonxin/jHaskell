# Javascript Haskell Library

首先,安装 nodejs <https://nodejs.org/en/>, 安装过程中要选择安装 npm 模块。打开命令控制台执行以下命令。

    # 全局安装 grunt-cli 只需要安装一次, linux 可能需要管理员权限
    npm install -g grunt-cli 
    
    # 安装依赖模块
    npm install
    # 编译
    grunt

# 基本教程

## 零. 准备工作

方便写代码，首先在网页里执行，`jHaskell.importAs()`，这样，
`jHaskell.equal(1,2)` 就可以简写为`equal(1,2)`了。下载整个工程编译之后，可以直
接打开 test/demo.html 在浏览器的控制台里面执行下面的 Javascript 代码。

## 一. 数据类型(1)

### 1. Void

    data Void = Void

这个数据类型只有一个值:`Void`,也就是说,`Void`既是一个数据类型的名字也是一个值,
不要弄混。不要认为这种数据类型没有用,这是一种很重要的数据类型。

### 2. Bool

Bool型,有两种可能的取值`True`和`False`。这种数据类型仅仅是 Javascript Boolean
类型的包装而已,与原始的数据类型相同。

    data Bool = False | True
    -- Bool型的变量可能取值是 False 或是 True

### 3. Ordering

Ordering型有三种可能的取值: `LT`,`EQ`,`GT`。基本用途就是比较两个数据大小时候的
返回值,分别代表小于,等于和大于。

    data Ordering = LT | EQ | GT

### 4. Float

Float 仅仅是 Javascript Number 类型重新命名一下而已。

    type Float = Number   --数据类型别名

### 5. List

List 也仅仅是 Javascript 数组重新命名一下而已。

    -- type List = Array
    data [a] = [] | a:[a]  

(:)表示在数组的最前面加一个元素,相当于 Javascript 的 unshift。这是一个递归定义
：这是一个递归定义： 1.`[]` 是数组;2.如果 x 是数组,x 前添加一个元素也是数组比如
,`[]` 是数组,那么 `1:[] = [1]` 也是数组;`[1]` 是数组,因此 `2:[1] = [2,1]` 也是
数组 想要生成一个数组，就必须提供另外一种数据类型 a，如果a是Float那么就生成的就
是 Float型的数组`[Float]`，如果 a 是 Bool 型的数据，那么这就是一个Bool型的数组
`[Bool]`，如`[false,true,false]`。当然，由于 Javascript 是弱类型的语言，即使有
不同类型的数组元素`[1,true,20]`也不会有问题。

### 6. Maybe

Maybe 仅仅是为了给其他数据类型额外的值而存在的。可能的取值是`Nothing`,或者仅仅
是原始数据类型的取值。与 Array 相同，需要给Maybe提供另外一个数据类型。比如
Maybe Bool型，Maybe Float 型。其实可以把 Maybe 看作是一个长度为 0 或是 1 的数组
。 当然，Maybe 不是数组，我们不能写为 `[a]` 因此我们新定义一个生成 Maybe 类型的方
式。

    data Maybe a = Nothing | Just a

其中 Nothing 相当于`[]`,Just 是一个函数，为了简便通常空白表示函数调用，并且具有
最高的优先级(`sqrt 2 + 3 = (sqrt 2) + 3` 而非 `sqrt (2+3)`,时刻记得)。`Just` 这
样的通常叫做构造函数而`Just a`类似于函数声明，说它接收一个a类型的参数，返回一个
Maybe a型的数据。比如 a 为 Float。`Just 5` 生成一个 Maybe Float 型的数据。其实
Nothing 也可看作是构造函数，只是它需要 0 个参数。通常构造函数名首字母为大写，其
实List 定义中的(:)也是一个函数，只是Javascript 不支持用(:)作为函数名。可以通过
`Just(x).value`来获得原本的数值`x`。通常情况下,Maybe会用来了进行错误处理。

### 7. String

String 本质上就是一个字符组成的 List 而已。
    
    type String = [Char]

### 8. Char

在 Javascript 里不存在字符型。在此我们没有也必要定义Char型的数据,在需要的时候我们把长度为 1 的字符串看作字符型。

## 二. class数据类型类(1)

所谓的数据类型类(class，跟其他的语言中的class不是同一个意思)是指对数据类型的描
述,指可以在一个数据类型上进行什么样的操作。比如 Float 属于 Eq 类,那么 Float 型
的数据可以比较是否相同,即Float型可以作为 equal 的参数。把某种类型的数据定义某种
类的好处是：1、某些数据类型为同一 class ,我们就可以为他们定义相同名字的操作（函
数），作用也相同。比如，所有 Eq 类的数据类型都可以比较是否相等；2、可以附送额外
的函数，比如某种类型声明为 Eq，并且为其定义了equal 函数，那么我们就可以为这个类
型自动得到一个 unequal 函数。

### 1. Eq 类

属于 Eq 类的数据类型可以比较大小,也就是说会实现一个 equal 函数。

    class Eq a where  -- 如果 a 是 Eq 类则需要定义下面的函数
        (==),(/=)  :: a -> a-> Bool  -- equal 和 unequal 函数
        -- 函数声明:: 意思是 equal 和 unequal 接受两个相同类型的参数,返回一个 Bool 型

比如 a 是 Float 型,则需要为 Float 定义这两个函数（可以定义一个，附送另外一个）
。Bool 和 Float 都属于 Eq 类，因此可以 `equal(100,100) == true`，
`equal(true,true)==true`。equal 函数声明中要求两个参数类型相同，但是对于
Javascript 这种弱类型的语言来说，我们没有任何办法阻止你使用不同类型的参数。但是
结果就可能不是你预期的结果。其他属于 instance 类的类型：

    instance Eq Void
    instance Eq Bool 
    instance Eq Ordering 
    instance Eq Float 
    instance Eq a => Eq (Maybe a)  
    -- 如果类型 a 属于 Eq 类，那么 Maybe a 才是 Eq 类
    instance Eq a => Eq [a]


### 2. Ord 类

Ord 类是指可以比较大小的数据类型,属于 Ord 类的数据类型必须属于 Eq 类。

    -- 类型 a 属于 Eq 类,那么 a 才属于 Ord 类
    class Eq a => Ord a where
        -- compare 接收两个相同类型的参数,返回一个 Ordering类型（即LT,EQ,GT中的一个）
        compare :: a -> a -> Ordering 
        -- lt,gt,le,ge 函数,只要实现 compare 会自动生成这几个函数
        (<),(>),(<=),(>=) :: a -> a -> Bool

比如 `compare(2,3).show()` 返回 `LT`。`show`的作用是将其转换成字符串。

### 3. Enum 类(枚举型)

在 C 中枚举型本质上是一个整数。在此,属于 Enum 的数据类型指可以转换成一个整数的
数据类型。只需要实现 `toEnum` 和 `fromEnum`。

    class Enum a where
        succ   :: a -> a  -- 相当与 +1; 比如 jHaskell.succ(LT) === EQ
        pred   :: a -> a  --   -1 ; jHaskell.pred("b") === "a"
        toEnum :: Int -> a  -- 把整型转换为 a 类型; jHaskell.toEnum(0) == LT 
        fromEnum  :: a -> Int  -- 与上面相反; jHaskell.fromEnum("a") === 97
        enumFromTo   ::  a -> a -> [a]  -- enumFromTo("a","z") === ["a","b","c"..."z"]
        enumFromThenTo :: a -> a -> a -> [a] 
        -- enumFromThenTo(1,3,9) === [1,3,5,7,9] 等差数列

### 4. Show 类

可转换为字符串,类似toString
    
    class Show a where
        show :: a -> String


### 6. Functor 类(函子)

    class Functor f where
        fmap :: (a -> b) -> f a -> f b

fmap接受两个参数，其中第一个的声明是(a -> b) ，也就是说是一个函数，这个函数接收
一个a类型的参数，返回b类型的参数。f a 是一种 f 类型的值，比如 f 是 Maybe 那么
fmap 的第二个参数就是 Maybe a 类型的，再如果 a 是Float 型那么，fmap的第二个参数
才能确定为 Maybe Float。a b 可为相同或是不同类型  `fmap(x=> x +
10,Just(5)).show() == "Just 5"` `fmap(x=> x + "str",Just(5)).show() == "Just
5str"`

fmap 的作用就是将其中的数据拿出来,然后用这个数据作为函数的输入,然后把返回值放入
这个函子中。`fmap(x=>x+1,Just(5)).show() == "Just 6"`。

为了使用方便和实现实际的class, 我们从 fmap 的各个参数中找出合适的参数，并且给这
个参数定义一个新的 fmap 属性，这样 `fmap(x=>x+1,Just(5))` 就可以写为
`Just(5).fmap(x=>x+1)`，每个jHaskell 定义class 都会选择把这个类支持的函数赋值给
合适参数的对应属性。即把 fmap 赋值给 f a 类型的 fmap 属性，记为 this = f a。


### 8. Monad 类(单子)

    class Monad m where
        -- returnM
        return :: a -> m a
        -- bindM
        (>>=) :: m a -> (a -> m b) -> m b
        -- thenM
        (>>) :: m a -> m b -> m b
        --  this = m a


单子是是一个比较常用的概念,在不同的数据结构中 `bindM` 具有不同的意义,虽然他们具
有相同的数学结构。这正是抽象的魅力,看似不相关的东西其实由相同的数学公式描述。既
然有相同的数学描述，那么我们就可以写相似的代码(只是输出的时候显示不一样)，那么
一段代码出现的概率就越大，出现概率大我们可以通过宏（或者添加语法），把很长的代
码写的很短。比如在Javascript 里面我们经常要写`function (x) { return x+2;}`,所以
ES6规定可以直接写成 `x=>x+2`。看似不相干的东西，能写成类似的代码，就更加提高了
一段代码出现的概率，就可以在规定很少的语法的情况下写出更短的代码。

对于 Maybe：`Just(5).bindM(x=> Just(x+1)).bindM(y=> Just(y+1)).show() == "Just
7"`, `Nothing.bindM(x=> Just(x+1)).bindM(y=> Just(y+1)).show() == "Nothing"`,如
果前面的数据不是Nothing,就从Maybe中取出数据,作为函数的参数执行后面的函数,否则直
接返回这个 Nothing。一个常用的方式就是 `ma.bindM(fn1).bindM(fn2).bindM(fn3)`,
fn1~fn3 是可能出错的函数，如果出错直接返回 Nothing 就可以了，由于bindM 的作用，
如果前面的出错了，后面的函数并不会执行。

对于 List: `[100,200,300].bindM(x => [x+1,x+2,x+3]).show() ==
"[101,102,103,201,202,303]"`也就是说,把数组中的每个元素拿出来,然后应用于后面的
函数,最后把这个函数返回的数组链接起来，因此共有3x3=9个元素。我前面说过，Maybe
可以看作是长度为 0 或 1 的字符串。如果是 `[].bindM(x => [x+1,x+2,x+3]).show()`
因为 []，只有 0 个元素那么返回的就是 0 x N =0 个元素的数组`[]`。有没有发现上面
的类比很正确？而正是 Monad 揭示了他们之间的相似性。

### 三、doM 语法糖

对于一个单子，`Just(5).bindM(x=>Just(x+1)).bindM(y=>Just(10*y));`上面已经讲过，
这样写的意思是把 Just(5) 中的 5 取出,作为形参 x,然后执行这个函数。可是有些时候
，我们希望在第二个匿名函数中也可以使用取出的这个 5，也就是 x。那么我们需要这样
写 `Just(5).bindM(x=>( Just(x+1).bindM(y => Just [x,10*y])));`，如果更长的话写
起来就很麻烦了。而很多东西都是 Monad，因此这样的形式是很常见的。因此我们是不是
可以定义一种简写的方式呢？于是jHaskell 中定义了一个语法糖，于是上面的代码可以写
成：

    function fn(a) 
    { 
        if(Math.random()>0.5) { return Nothing;} // 模拟出错的代码
        return (a+1);
    }
    var code = jHaskell.doM(function(){
        x <- Just(5);
        y <- fn(x);
        Just([x,10*y]);
    });
    eval(code);

`<-` 其实是 `=>` 倒过来写的意思(<=可能会在 Javascript 里用到，因此我们选了一个
不常出现但也是合法的Javascript语句的<-，而且与Haskell中的相同，)。因此在 doM 里
面对于 Maybe， <- 的意义就是从Just中取出对应的值(如果后面不是 Just 不再执行后面
的语句，直接返回这个 Nothing,bindM的定义)，最终返回值是 `Just([x,10*y])`

    var code = jHaskell.doM(function(){
        x <- [1,2,3];
        y <- [100,200,300];
        [x+y];
    });
    eval(code);

对于数组 x <- [1,2,3]; 就是 x 遍历[1,2,3] 的每一个元素，执行后面的代码(这相当于
一个 for); y 遍历 [100,200,300] 中的每一个值，返回[x+y],而 bindM 具有把后面函数
的返回的数组链接到一起的功能,因此结果就是 [101,201,301,102,202,302,301,302,303]
。其实上面的代码相当于:

    var arr = [];
    for(var x of [1,2,3]){
        for(var y of [1,2,3]){
            arr.push([x+y]);
        }
    }
    var ret = Array.prototype.concat.apply(null,arr);

仔细的人可能发现，在 Maybe 单子的例子里，其实
`Just(5).bindM(x=>Just(x+1)).bindM(y=>Just(10*y));`，`Just(5).bindM(x=>(
Just(x+1).bindM(y => Just [x,10*y])));` 改变了一些执行顺序，这对我们的函数有什
么影响吗？答案是对于 Maybe 满足，因为它符合 Monad Law。

## 三. Law

既然定义了新的类型，肯定要满足某种条件，比如Functor满足的条件么，叫做 Functor
Law, 否则多定义这个类还有什么意义。当然如果你在某个类型上定义一个`fmap`不满足
Functor Law。jHaskell中没有任何的限制,但是在程序执行中会通过这些条件进行优化由
此导致错误的结果。

### 1. Functor law

    1. fmap id = id  -- var id = function(x){return x;}
    2. fmap (g.f) = fmap g . fmap f   -- 记得函数调用具有最高优先级,要慢慢习惯哦。
 
g f 是一个函数,g.f 就是函数复合的意思 h = g.f 意思是 h(x) = g(f(x))。fmap 接收
两个参数,如果我们只给它提供一个参数,我们来看 fmap 的声明 (fmap :: (a -> b) -> f
a -> f b)如果我们只给它提供一个参数 fn, 那么它返回的东西就是 f a -> f b, 这是什
么？这是只接受一个参数的函数。也就是说如果我们只是用一个参数调用两个参数的函数
，会返回另外一个接受一个参数的函数，这个函数里面包含了第一个参数信息。这种函数
叫做curry函数,也就是说 fmap g 其实是一个函数。考虑到 Javascript 的函数调用比较
麻烦（要写括号），目前在 jHaskell 中大部分函数还不是curry化的函数。`fmap id =
id` 的意思是说,`fmap id` 和 `id` 是等价的函数，可以相互替换。

    var x = Just(10);  // 任意值，当然要是一个函数子
    fmap(id,x)； // 等价于
    id(x);
    
第二条就是

    function g(x) { return x+10;} // 任意函数
    function f(x) { return x*10;} 
    fmap(x=>g(f(x)),Just(10)); // 等价于

    var t = fmap(f,Just(10));
    fmap(g,t);

你可能觉得 Functor Law 意义不大，因为不知道有什么用，而且就这么两条。能干什么？
正是因为它规定的东西少，所以他可以是任何东西。只要满足上面两条，我们就可以用类
似的代码处理! 当然我们不需要了解上面的 Law，因为我们写代码不需要，Haskell 只需
要知道Haskell里面说某个东西是函子那么它一定符合上面的 Law (经过了严格的数学证明
)，后面的 Law 也是。

### 2. Monad law

    -- bindM 的中缀写法， bindM ma fn 可写作 ma >>= return ,只是优先级不如函数调用高。
    1. m >>= return     =  m                          -- right unit
    2. return x >>= f   =  f x                        -- left unit 
    3. (m >>= f) >>= g  =  m >>= (\x -> f x >>= g)    -- associativity

上面提到 Maybe 的时候说道会改变函数的执行顺序，通过上面第三条可以看到，这两种写法是等价的。
至此你应该可以看懂源码中的注释了，那里面有所有的 class 的定义，以及那些数据类型属于哪些类。

## 三. 数据类型(2)

### 1. Either

Either 有两种数据类型组成。比如,Eihter Bool Float类型的值,可以是包装后的 `Bool`
或是包装后的 `Float`。当然只能取其中一种类型的值。 也就是说 Either 是两种类型的
和。通常情况下,Either也会用来了进行错误处理。好吧,在这种情况下,跟原始的
`try...catch...` 结构相同。可是 Either 的用途不仅仅是错误处理。

    data Either a b = Left a | Right b

Either 对于第二个参数也是一个函子， bindM 的作用就是，如果是Left 就返回这个
Left，如果是Right就取出Right 中的值，执行后面的函数。这个跟 Maybe 类似，只是
Nothing 换成了 Left，而 Left 中是可以保存出错原因的。

## 四. class数据类型类(2)

### 1. Monoid 类（幺半群）

为了简便,有时候我们把二元函数调用 `fn(a,b)` 写为 `a ``fn`` b`（反引号` `` `，键盘左上角，数字1旁边那个）

    class Monoid a where
        mempty :: a   -- 仅仅是一个这种类型的数据,通常叫做单位元
        mappend :: a -> a -> a


#### Monoid Law

    1. mempty `mappend` x = x  --  比如  0 + x = x ,单位元
    2. x `mappend` mempty = x  -- ; x + 0 = x
    3. （x `mappend` y） `mappend` z =  x `mappend` （y `mappend` z）
        -- ; (a + b) + c = a + (b + c) ；分配率

当然因为某些原因,在此 Float 型暂时还没有被定义成 Monoid 类。但是字符串相对与字
符串链接是一个 Monoid,单位元是 "" : `mappend("","abc") == "abc";
mappend("abc","xyz") == "abcxyz"`

### 2. Applicative 类

    class Functor f =>  Applicative f where
        pure :: a -> f a  -- pure(10,Array) == [10] -- 因为pure可以生成多种数据类型,因此需要加一个参数
        // applyTo
        (<*>) :: Applicative f => f (a->b) -> f a -> f b

List 是一个 Applicative: `[x=>x+1,x=>x+2,x=>x+3].applyTo([10,20,30]).show()`,
`[x=>y=> x+y].applyTo([10,20,30]).applyTo([1,2,3]).show()`另外需要说明的是，其
实如果一个类型是 Monad 也是一个 Applicative，return 和 pure 是等价的。只是前人
还没证明的时候就把 Monad 和 Applicative 分别放入了 Haskell 中。
`returnM(10,Array)`,`pure(10,Array)`

#### Applicative Law

    1. pure id <*> v = v
    2. pure f <*> pure x = pure (f x)
    3. u <*> pure y = pure ($ y) <*> u
    4. pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
    
# LICENSE

MIT
