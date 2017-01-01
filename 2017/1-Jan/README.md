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
