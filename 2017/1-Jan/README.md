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
