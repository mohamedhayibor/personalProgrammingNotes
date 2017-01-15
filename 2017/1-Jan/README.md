Jan 1
------

> mainly from [real world haskell](http://book.realworldhaskell.org/)

A composite data type is constructed from other types. The most common composite data types in Haskell are lists and tuples.

The combination of precedence and associativity rules are usually referred to as `fixity` rules.

Every expression and function in Haskell has a type.

```hs
5 + 8            -- :: Num a => a
sqrt 16          -- :: Floating a => a
succ 4           -- :: (Num a, Enum a) => a
pred 14          -- :: (Num a, Enum a) => a
sin (pi / 2)     -- :: Floating a => a
truncate pi      -- :: Integral b => b
(19, "Monday")   -- :: Num t => (t, [Char])
("ca", "ma")     -- :: ([Char], [Char])
(||)             -- :: Bool -> Bool -> Bool
take             -- :: Int -> [a] -> [a]
error            -- :: [Char] -> a
maybe            -- :: b -> (a, b) -> Maybe a -> b

errorWithouthStackTrace  -- :: [Char] -> a
```

Polymorphic types: can have any types.

When we want to write a polymorphic type, we use a type variable, which begins with a lowercase letter. A type variable is a placeholder, where we will eventually substitute for a real type.

a kind of C like void in haskell: ()

```hs
()        -- ()
```

Functions are by default pure. Side effects make them impure.The type signature will start with IO

A side effect: introduce a dependency between the global state of the system and the behaviour of a function.

```hs
--for book records
data BookInfo = Book Int String [String]
                deriving (Show)

-- > :t Book  :: Int -> String -> [String] -> BookInfo

-- constructing a new value (Book)
myBook = Book 1234324 "Pushing through" ["mo"]
```

BookInfo: type constructor (all must start with a capital letter)

Book: value constructor (or data constructor)

A value constructor is as just another function, one that happens to create and return a new value of the type we desire.

> we only use a value constructor in actual code.

##### Type synonyms

a type for an existing type > to give a more descriptive name.

```hs
type CustomerID = Int
type ReviewBody = String

data Review = Review CustomerID ReviewBody
```

##### Algebraic data type

can have more than one value constructor.

```hs
data Bool = False | True
```

Algebraic data types over tuples: they allow us to distinguish between identical pieces of information.

> (==) require its arguments to have the same type.

##### Enums equivalent

```hs
data Colors = Red
            | Yellow
            | Green
         deriving (Show, Eq)
```

##### Pattern matching

Haskell lets us define a function as a series of equations: the clauses define the behavior for different pattern of inputs.

> Matching a pattern has no effect on the value we're examining.

##### Record Syntax

```hs
data CreditCard = CreditCard { Name :: String
                             , CardNumber :: Int
                             , Address :: [String]
                             }

-- expressive - readable
TrumpCard = CreditCard { Name = "Donald Trump"
                       , CardNumber = 42332323
                       , Address = ["Trump tower", "Nyc"]
                       }
```

##### Error

doesn't let our caller distinguish between a recoverable or severe one. Solution: use Maybe to represent the possibility of error

```hs
mySecond :: [a] -> Maybe a
mySecond [] = Nothing
mySecond xs = if null $ tail xs
              then Nothing
              else Just (head(tail(xs)))
```

##### Local variables

```hs
lend :: Int -> Int -> Maybe Int
lend amount balance = let reserve = 100
                          newBalance = balance - amount
                      in if balance > reserve
                         then Just newBalance
                         else Nothing
```

> newBalance is not computed if the `if` fails (lazyness)

Shadowing:

```hs
q :: a -> String
q a = let a = "foo" in
          a ++ " bar"
```

> argument a is never used inside the function body (shadowed)

Want to define local variables later, `where` is handy:

```hs
lend :: Int -> Int -> Maybe Int
lend amount balance = if balance > reserve
                         then Just newBalance
                         else Nothing
                         where reserve = 100
                               newBalance = balance - amount
```

01/08
-----

Type sygnatures from libraries:

```hs
compare           :: Ord a => a -> a -> Ordering
sortBy            :: (a -> a -> Ordering) -> [a] -> [a]
break             :: (a -> Bool) -> [a] -> ([a], [a])
elem              :: (Foldable t, Eq a) => a -> t a -> Bool
filter            :: (a -> Bool) -> [a] -> [a]
map               :: (a -> b) -> [a] -> [b]
filter            :: (a -> Bool) -> [a] -> [a]

on                :: (b -> b -> c) -> (a -> b) -> a -> a -> c
```

> Haskell: functional language implementations detect uses of tail recursion, and transform tail recursive calls to run in constant space: tail call optimization (TCO).

Primitive recursive: The class of functions that we can express using `foldr`.

Space leak: invisible thunking: our code is operating normally, but using far more memory than it should.

> Data.List provides foldl' does not build up thunks.

xs@(_:xs') : as pattern: bind the variable xs to the value that matches the right side of symbol `@`



```hs

-- representing JSON data in haskell
data JValue = JString String
            | JNumber Double
            | JBool Bool
            | JNull
            | JObject [(String, JValue)]
            | JArray [JValue]
              deriving (Eq, Ord, Show)

```

Every time we write a type signature: we reduce the likelihood of divergence between our understanding of our code and the compiler's.

To quickly develop the skeleton of a program is to write stub-versions (placeholder) of types and functions.


TypeClasses: allow us to define generic interfaces that provide a common feature set over a wide variety of types. (equality testing and numeric operators).

```hs
isEqual :: (BasicEq a) => a -> a -> Bool
```

For all types a, so long as a is an instance of BasicEq, isEqual takes two parameters of type a returns a Bool.

```hs
let writeFoo = putStrLn "foo"
```

foo is a side effect of `putStrLn` actually writing foo to the terminal.

What is IO in Haskell?

* Have a type IO t
* Are first-class values in Haskell and fit seamlessly with Haskell's type system
* Produce an effect when performed, but not evaluated. (They only produce an effect when called by something else in an I/O context)
* Any expression may produce an action as its value, but the action will not perform I/O until it is executed inside another I/O action (or it is main)
* Performing (executing) an action of type IO t may perform I/O and will ultimately deliver a result of type t

> You can only perform I/O actions from within other I/O actions.

We use <- to get results from IO actions and `let` to get results from pure code.

##### IO

```hs
openFile                 :: FilePath -> IOMode -> IO Handle
openTempFile             :: FilePath -> String -> IO (FilePath, Handle)
openBinaryFile           :: FilePath -> IOMode -> IO Handle

readFile                 :: FilePath -> IO String
writeFile                :: FilePath -> String -> IO ()
interact                 :: (String -> String) -> IO ()

putStrLn                 :: String -> IO ()
getLine                  :: IO String

mapM                     :: (Traversal t, Monad m) => (a -> m b) -> t a -> m (t b)
                         -- forM == mapM reversed
forM                     :: (Traversal t, Monad m) => t a -> (a -> m b) -> m (t b)
mapM_                    :: (Foldable t, Monad m)  => (a -> m b) -> t a -> m ()

filterM                  :: Applicative m => (a -> m Bool) -> [a] -> m [a]
```


```hs
getLine   = hGetLine stdin
putStrLn  = hPutLine stdout
print     = hPrint stdout
```

> I/O is all about changing state. Think of I/O as changing the state of the world.

###### Actions

Actions resembles functions. They do nothing when they are defined, but perform some task when they are invoked.

IO actions are defined within the IO monad. Monads are a powerful way of chaining functions together purely.

###### Sequencing

You can use instead of do blocks: `>>` and `>>=`

```hs
(>>)                :: (Monad m) => m a -> m b -> m b
(>>=)               :: (Monad m) => m a -> (a -> m b) -> m b
```

The (>>) operator sequences two actions together: the first action is performed, then the second. The result of the computation is the result of the second action. The result of the first action is thrown away.

(>>=) runs an action, then passes its result to a function that returns an action. That second action is run as well, and the result of the entire expression is the result of that second action.

> `return` is used to wrap data in a monad. When speaking about I/O, return is used to take pure data and bring it into a rI/O monad.

Buffering allows us to read the same amount of data with far fewer IO requests

##### Efficient file processing

ByteString from `Data.ByteString` represents a string of binary or text data in a single array.

`Data.ByteString.Lazy`'s ByteString represents  a string of data as a list of chunks, arrays of up to 64kb in size.

> The strict ByteString performs best for applications that are less concerned with memory footprint, or that need to access data randomly.

`import qualified` lets refer to a module with  a name of our choosing.

```hs
import qualified Data.ByteString.Lazy as L

{- checking a byte in sequence to determine
 - a file's type. -}

hasElfMagic :: L.ByteString -> Bool
hasElfMagic content = L.take 4 content == elfMagic
    where elfMagic = L.pack [0x7f, 0x45, 0x4c, 0x46]
```

```hs
highestClose = maximum . (Nothing: ) . map closing . L.lines
```

> (Nothing: ) expression ensures that the list of Maybe Int values that we supply to maximum will never be empty.

Embedded domain specific language: using our programming language's native facilities to write code that lets us solve narrow problem

###### Avoiding boilerplate with lifting

```hs
liftP :: (a -> b -> c) -> InfoP a -> b -> InfoP c
liftP q f k w x y z = f w x y z `q` k

greaterP, lesserP :: (Ord a) => InfoP a -> a -> InfoP Bool
greaterP = liftP (>)
lesserP  = liftP (<)

```

> taking a function (> || <), and transforming it into another function that operates in a different context, is refered to as lifting into that context.

1/13
------

idempotency: applying a function twice has the same result as applying it once.

```hs
class Arbitrary a where
    arbitrary = Gen a
```

The generators run in a `Gen` environment. Which is a simple state-passing monad that is used to hide random number generator state that is threaded through the code.

We can use do Syntax to write new generators that access to implicit random number source.

Another approach to data generation is to generate values for one of the basic Haskell types and then translate those values into the type you're actually interested in.

```hs
instance Arbitrary Ternary a where
    arbitrary      = do
        n -> choose (0, 2) :: Gen Int
        return $ case n of
                      0 -> True
                      1 -> False
                      _ -> Unknown
```

> Higher order functions are the basic glue of reusable programming.

Common design pattern: type constraints are pushed out to where they are actually needed.

Within every given do-block, all actions must be the same type. You can't put regular values there (without let), because they aren't actions.

> Functions like `putStrLn` aren't IO actions, they return IO actions.

> You can't mix different kinds of actions in the same do block.

IO perfoms the actions in order with IO side effects. Maybe, on the other hand, specifies that if any step is Nothing, the whole thing stops and exits with a Nothing.

###### Data Structures

Ways to deal with data indexed by a key: association lists and the `Map` type provided by `Data.Map`

* all familiar list functions work with association lists
* Map has considerable advantage over association lists

Association lists are just normal list containing (key, value) tuples. Example `[(Integer, String)]`. Can retrie at an index with `lookup`:

```hs
myLookup :: a -> [(a, b)] -> Maybe b
myLookup _ [] = Nothing
myLookup key ((thisKey, thisValue):rest)
    | key == thisKey   = thisValue
    | otherwise        = myLookup key rest
```

* Maps give us the same capabilities as hash tables do in other languages (implemented with a self balanced tree)

```hs
let f = ("a" ++) . ("b" ++)
-- f [] >  "ab"
```

Each partial application of (++) and (.) represents an append, but it doesn't actually perform the append. (Thecost of partial application is constant "many > linear"

Monoid (requirements):

1. An associative binary operator. Exple: `a * (b * c)` == `(a * b) * c`
2. An identity value. Exple: `a * e == a`, `e * a = a`

1/15
-----
###### Monads

```hs
(>>?) :: Maybe a -> (a -> Maybe b) -> Maybe b
Nothing >>? _ = Nothing
Just v  >>? f = f v
```
> As long as the result type of one function matches the parameter of the next, we can chain functions returning `Maybe` together indefinitely.

(>>?) hide the details of whether `Nothing` gets returned or completely evaluated.

> Monads helps with repeated behaviors by chaining functions one to the next.

3 properties that makeup a monad

* A type constructor m
* A function of type `m a -> (a -> m b) -> m b` for chaining the output of one function into the input of another.
* A function of type `a -> m a` for injecting a normal value into the chain, it wraps a type a with the type constructor m

> monadic structure: passing around implicit data or shortcircuiting a chain of evaluations if one fails, to choose but two.

```hs
class Monad a where
    -- chaining
    (>>=) :: m a -> (a -> m b) -> m b
    -- injecting
    return :: a -> m a
```

(>>) performs chaining but ignores the value on the left

```hs
    (>>) :: ma -> m b -> m b
    a >> f = a (>>=) \_ -> f
```

The second non core monad function is fail:

```hs
    fail :: String -> m a
    fail = error
```

"is Monad": an instance of the `Monad` typeclass. Gives us the necessary monadic triple of type constructor, injection function, and chaining function.

"Foo monad": a type Foo with a Monad typeclass.

We can inject a value into a monad using `return`. We can extract a value from a monad using (>>=) but the function on the right, which can see an unwrapped value, has to wrap its own result back up again.

When a computation in the chain fails, the subsequent production, chaining and consumption of Nothing values is cheap at runtime, but it is not free.


(>>=) definition for lists:

```hs
instance Monad [] where
    return x = [x]
    xs >>= f = concat (map f xs)
```

(>>)

```hs
xs >> f = concat (map (\_ -> f) xs)
fail _  = []
```

To eliminate boilerplate we can add directives to the top of our source file, before the module header:

```hs
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
```

> will broaden our ability to derive typeclass instances, the extensions can automatically make our new type an instance of that typeclass.

Monads provide a powerful way to build computations with effects.

> One of the principal reasons that we use monads is that they let us specify an ordering for effects.

##### Error Handling

The `Either` type is similar to the Maybe type, with one difference: it can carry attached data both for an error and a success.

> `Left` indicates a error, `Right` indicates a success.

handle: when you wish to perform one action if a piece of code completes without an exception, and a different action otherwise.

Haskell automatically indicates a non-successful exit whenever a program is aborted by an exception.


##### Using Databases

A transaction is designed to ensure that all components of a modification get applied, or that none of them do. Can also prevent other processes accessing the same database from seeing partial data from modifications that are in progress.
