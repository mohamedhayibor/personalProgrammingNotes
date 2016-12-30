#### How to read a technical book - paper

1. Get the big picture of what's going on (pause and summarize into your own words frequently)
2. Explain it to a friend
3. Summarize what you know - phrase questions for what you don't
4. Write down questions (what confuses you)
5. Think for yourself (be super pragmatic - tear it apart)

[link](https://www.cs.umd.edu/class/sum2003/cmsc311/Notes/Learn/read.html)

#### Object creation

Creating objects in a manner suitable to the situation.

Two dominant ideas when it comes to creational design patterns:

1. encapsulating knowledge about which concrete classes the system uses.
2. Hiding how instances of these concrete classes are created and combined

Further categorization:

1. Object-creational patterns: deal with object creation (defer part of its object creation to another object)
2. class-creational pattern: class intantiation (defer its object creation to subclasses)

[link](https://en.wikipedia.org/wiki/Creational_pattern)

12/20
---

Haskell: a lazy functional programming language.

- pure: no mutation.
- Expressions never have side effects.

> It is evaluating expression than executing instructions.

Advantages of Haskell:

- equational reasoning
- parallelism: evaluating expressions in parallel is easy when garanteed to not affect each other.
- Easy to define a new control structure by defining a function.
- Possible to define and work with infinite data structures.
- Enables more compositional programming style

Types turns some run-time errors into compile-time error.

Helps with DRY through:

- parametric polymorphism
- Higher-order functions
- type classes

- wholemeal programming (Thinking big): work with an entire list rather than a sequence of elements; develop a solution space, rather than an individual solution, imagine a graph, rather than a single path.

`::`  means `has type`

In haskell variables are not mutable boxes, they are just names for values.

> x = 4 => "X is defined to be 4"

Referential Transparency: f(x) -> y | same x same y

Haskell programs as series of transformations on data `infinite data structures`

Lazy: only when you need it.

spaces are used for function application. All functions only take one argument.

Making basic functions that are obviously correct and then combining them into more complex functions.

else is mandatory for any ifs

Polymorphic: functions that have type variable.

A type class: a sort of interface that defines some behavior.

> If a type  is a part of a typeclass, that means that it supports and implements the behavior the typeclass describes.

Type annotations are a way of explicitely saying what type of an expression should be.

Enums => sequentially ordered types | can be enumerated

#### Recursion

Recursion a way of defining functions in which the function is applied inside its own definition.

Edge condition: Having an element or two in a recursion definition defined non-recursively. In another words where a recursive application doesn't make sense.

> You do computations in Haskell by declaring what something is instead of declaring how you get it.( no while or for loops)

Pivot: an element that you compare against

Examples:

* Lists: empty list
* Trees: a node without any childen

#### Currying

Every function in Haskell officially only takes one parameter.

A function with too few parameters is a partially applied function. Allows you to create functions on the fly (repl)

Functions aren't instances of the `show` typeclass.

Higher Order Functions: functions that take functions as parameters and return functions as return values. (really powerful way of solving problems and thinking about programs)

###### Performance

Due to Haskell lazyness: even if you map something over a list several times and filter it several times, it will only pass over the list once.

#### Lambdas

Lambdas: anonymous functions that are used because we need some functions only once

Lambdas can take any number of parameters

A fold takes a binary function, an accumulator and a list to fold up.

Reason to use `$`: right associative function application

```hs
f a b c == ((f a) b) c)
```

> Reason to use function composition (right associative) over lambdas: conciseness

Value constructors are functions like everything else

```hs
data Shape = Circle Float Float Float

-- :t Circle
-- > Cirlcle :: Float -> Float -> Float -> Shape
```

Typeclasses are like interfaces.
A typeclass defines some behavior (Eq, Ord, Enum) and then types can behave in that way are made instances of that typeclass.

> class is for defining new typeclasses and instance is for making our type instances of typeclasses.

Maybe itself is not a concrete type. It is a type constructor that takes one type parameter (`Char`...) to produce a concrete type (like Maybe Char).


Analyzing type classes with
---

Output from `:info Maybe`

```sh
data Maybe a = Nothing | Just a        -- Defined in ‘GHC.Base’
instance Eq a => Eq (Maybe a)          -- Defined in ‘GHC.Base’
instance Monad Maybe                   -- Defined in ‘GHC.Base’
instance Functor Maybe                 -- Defined in ‘GHC.Base’
instance Ord a => Ord (Maybe a)        -- Defined in ‘GHC.Base’
instance Read a => Read (Maybe a)      -- Defined in ‘GHC.Read’
instance Show a => Show (Maybe a)      -- Defined in ‘GHC.Show’
instance Applicative Maybe             -- Defined in ‘GHC.Base’
instance Foldable Maybe                -- Defined in ‘Data.Foldable’
instance Traversable Maybe             -- Defined in ‘Data.Traversable’
instance Monoid a => Monoid (Maybe a)  -- Defined in ‘GHC.Base’
```

To get the value out of an I/O action, you have to perform it inside another I/O action by binding it to a name with "<-"

Interact: helper for the pattern of getting some string from the input, transforming it with a function and then outputing it.

IO operations:

```hs
data IOMode = ReadMode | WriteMode | AppendMode | ReadWriteMode
```

```hs
-- :t openFile
openFile :: FilePath -> IOMode -> IO Handle
```

> `getContents` will automatically read from the standard input (from terminal), whereas `hGetContents` takes a file handle which tells it which file to read from

Another way to read from a file: `withFile`: takes a path to a file. an IOMode then it takes a function that takes a handle and returns some I/O action.

```hs
> withFile :: FilePath -> IOMode -> (Handle -> IO r) -> IO r
```

Pure code can throw exceptions, but they can only be caught in the I/O part of our code (when we're inside a do block that goes into main.)

> Don't mix pure code with exceptions


```hs
{-
 - Useful type sygnatures to know
 _
 _ :t map      # map    :: (a -> b) -> [a] -> [b]
 - :t fmap     # fmap   :: Functor f => (a -> b) -> f a -> f b
 - :t id       # id     :: a -> a
 - :t maybe    # maybe  :: b -> (a -> b) -> Maybe a -> b
 - :t Right    # Right  :: b -> Either a b
 - :t Left     # Left   :: a -> Either a b

    >          Advanced
 - :t (<$)     # (<$)   :: Functor f => a -> f b -> f a
 - :t (<$>)    # (<$>)  :: Functor f => (a -> b) -> f a -> f b
 - :t (<*)     # (<*)   :: Applicative f => f a -> f b -> f a
 - :t (*>)     # (*>)   :: Applicative f => f a -> f b -> f b
 - :t (<*>)    # (<*>)  :: Applicative f => f (a -> b) -> f a -> f b
-}
```

```hs
instance Functor Maybe where
    fmap f (Just x) = Just (f x)
    fmap f Nothing = Nothing
```

Functors are expected to behave as things that can be mapped over. Calling fmap on a functor should just map a function over the functor, nothing more.

Functor laws:

1. The first functor law that if we map the id function over a functor, the functor that we get back should be the same as the original functor.

2. The second law says that composing two functions and then mapping the resulting function over a functor should be the same as first mapping one function over the functor and then mapping the other one.

```hs
fmap(f . g) F = fmap f (fmap g F)
```

Applicative Functors == beefed up functors

[Libraries](https://downloads.haskell.org/~ghc/latest/docs/html/libraries/)

[Hoogle search engine](https://www.haskell.org/hoogle/)

[Learn you a haskell](http://learnyouahaskell.com/)
