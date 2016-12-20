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
