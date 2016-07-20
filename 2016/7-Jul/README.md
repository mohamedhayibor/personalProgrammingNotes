7/1
--------

Notes from [rnn-effectiveness](http://karpathy.github.io/2015/05/21/rnn-effectiveness)

Recurrent nets allow us to operate over sequences of vectors.

RNNs are turing complete in the sense that they can simulate arbitrary programs (with proper weights).

RNN computation: RNNs accept an input vector x and give you an output vector y. (the output vector's contents are influenced not only by the input you just fed in, but also on the entire history of inputs you've fed in the past.

7/2
------------

### Tackling Rust:

Rust's focus: safety, speed and concurrency.

No garbage collection: 

1. embedding other languages
2. specific space and time reqs
3. writing low level code: device drivers || operating systems

> compile time safety checks: no runtime overhead

> rust files end with an `.rs` extension

> The main function represents the beginning of every program

Macro vs fucntions:
```rs
macro: println!()
function: println()
```

Rust is an expression-oriented language
> Most things are expressions rather than statements.

Any rust program should be compiled before getting run, thus getting the source code and the executable.

Rust is ahead-of-time compiled: executable can be run without the rust installed locally

> cargo rust build system and package manager

##### Cargofying a project


1. Put your source file in the right directory
2. Get rid of old executable
3. Make a cargo config file

Cargo expects the source code to reside inside src

> name it to lib.rs for libraries

creating a config file > Cargo.toml (Tom's Obvious Minimal language)

> cargo needs to know 3 things to compile your program:

1. its name
2. its version
3. its authors

> once everything is set you can run > $ cargo build --release > to compile with optimizations

##### Speeding up dev cycles

Cargo can quickly build the barebones project dir. exple:
```
$ cargo new {name} --bin
```

> Executables are often called binaries 

##### Building guessing game:

> To get the user's input we can import the io library with
```
use std::iol;
```
> the fn syntax declares a new function. main() is the entry point of our program

> let statements are varible bindings

Rust's variables are immutable by default. Including mut makes our variables mutable.
```
let mut guess = String::new();
```

Commenting `//`, Rust will ignore anything inside comments

Rust static methods `::` > associated function of a particular type. (associated to String itself rather than a particular instance of String).

Methods are associated functions only available on a particular instance of a type rather than the type itself.

Readline doesn't take String as an argument it takes > &mut String.

Rust's references allows you to have multiple references to one piece of data, which can reduce copying.

> read_line also returns a value: io::Result

The purpose of Rust's Result types is to encode error handling information.

> in case of a failure panic! is triggered > halts the program > displays message.

Rust will force you to handle possible error from Result > expect()

> a crate is a package of rust code

We can make use anything in the rand crate with:
```
rand::
```

```
rand::thread_rng()
```
> function to get a copy of the random number generator, which is local to the particular thread of execution we are in.

The cmp method can be called on anything that could be compared and it takes a reference to the thing that you want to compare it to.

> Ordering is an enum `enumeration` that looks like:
```
enum Foo {
  Bar,
  Baz,
}
```

> with this definition: anything of type Foo can be either a Foo::Bar or a Foo::Baz, `::` indicates the namespace of a particular enum variant.

The Ordering enum has three variants: Less, Equal, Greater

> The match takes a value type and lets you create an `arm` for each possible value.

> Rust has a strong static type system but also has type inference.

For instance when declaring a string, it deosn't make us write out the type.

> There are a number of types which can have a value between 1 to a hundred.

* i32 > a 32 bit number
* u32 > unsigned 32 bit number

Type coercion is possible with Rust's shadowing.

> Rust has a built in number types.

The loop keyword give us an infinite loop.

##### Variable assignments
Rust let variable assignments are very flexible.

```
let (x, y) = (1, 2);
```

Types comes after a colon
```
let x: i32 = 5;
```

> The possible integer sizes are 8, 16, 32, 64 bits

##### Initializing bindings

Bindings are required to be initialized before they are allowed to be used.

```
let x: i32;
```

Rust will not let you use a variable that hasn't been initialized.

A block is a collection of statements enclosed by `{}`. Function definitions are also blocks.

> special shadowing with blocks: a later variable binding with the same name as another binding, that's currently in scope will overide the previous binding.

Shadowing !== mutable bindings > shadowing enables to rebind a name to a different type. It is also possible to change the mutability of a binding.

###### Functions


```
fn foo() {
}
```

> Unlike let you must declare the argument types.

Forcing functions to declare types while allowing for inference inside of function bodies is a sweetspot between full inference and no inference.

```
fn add_one(x: i32) -> i32 {
    return x + 1;
}
```
> The `->` determines what it returns.

####### Reminder

Rust is an expression based languages.

> expressions return values, statements do not.

There two types of statements in Rust: declaration statements and expression statements. Everything else is an expression.

> Using a return as the last line of a function is considered poor style.

Diverging functions -> functions that do not return

```
fn diverges() -> ! {
    panic!("no returns");
}
```
> A diverging function can be used as any type.

> panic!() causes the current thread of execution to crash with any given message.

Function pointers: variable bindings that point to functions.
```
let f: fn(i32) -> i32;
```

7/3
-------
Rust has a bunch of primitives (built in the lang)

##### Booleans

##### standard if statement

```
let x = 5;

if x == 5 {
    println!("x is five!");
} else if x == 6 {
    println!("x is six!");
} else {
    println!("x is not five or six :(");
}
```
##### Loops

> while, for, loop

> instead of `while true` use `loop`. The more info we can give to the compiler, the better it can do with safety, code generation.

```
for x in 0..10 {
    println!("{}", x); // x: i32
}
```

> You can use .enumerate() if you need to keep track how many times you've looped.

```
for (i,j) in (5..10).enumerate() {
    println!("i = {} and j = {}", i, j);
}
```
> break or return will break the loop. `continue` will jump to the next iteration.

##### Specifying break or continue for a specific loop
```
'outer: for x in 0..10 {
    'inner: for y in 0..10 {
        if x % 2 == 0 { continue 'outer; } // continues the loop over x
        if y % 2 == 0 { continue 'inner; } // continues the loop over y
        println!("x: {}, y: {}", x, y);
    }
}
```

##### Vectors

> a vector is a dynamic or growable array, implemented as the standard library Vec<T>.Vectors always allocate their data on the heap.

> Vectors store their contents as contiguous arrays.of T on the heap. The size of T must be known at compile time. (how many bytes needed to store a T)

> Also important that you must index with usize type:
```
let i: usize = 0;
```

##### Iterating:
You cannot iterate over a vector again if you have already taken ownership of it.

> You can iterate multiple times by just referencing while iterating.

```
let mut v = vec![1, 2, 3, 4, 5];

for i in &v {
    println!("A reference to {}", i);
}

for i in &mut v {
    println!("A mutable reference to {}", i);
}

for i in v {
    println!("Take ownership of the vector and its element {}", i);
}
```

##### Ownership

> Ownership is how Rust achieves `Memory Safety`

The ownership system:

* Ownership
* Borrowing
* Lifetimes

Rust achieves great safety and speed through `Zero-cost abstractions`, which means abstractions cost as little as possible to make them work.

> Variable bindings have ownership to what they are bound to.

> when a binding goes out of scope, Rust will free the bound resources.

vectors behave like arrays except their size may change by pushing more elements into them.

###### To remember:

> when ownership is transferred to another binding, you cannot use the original binding.

> All primitive types implement the Copy trait and their ownership is therefore not moved.

> A binding that borrows something does not deallocate the resource when it goes out of scope.

#### &mut references

A mutable reference allows you to mutate the resource you are borrowing.

##### Rust borrowing rules

1. Any borrows must last for a scope no greater than the owner's.
2. ( one or more references (&T) to a resource || exactly one mutable reference (&mut T) )

> There is `data race` when two or more pointers access the same memory location at the same time, where at least one of them is writing and the operations are not synchronized.

7/4 (happy 4th of july :sunglasses:)
--------
To fix the problem of dangling pointers, Rust provides us with explicit references:

```
// explicit
fn bar<'a>(x: &'a i32) {
}
```
> `a` reads `the lifetime a`


[Read more of multiple lifetimes](https://doc.rust-lang.org/book/lifetimes.html)

> The mutability of a struct is its binding.

```
struct Point {
    x: i32,
    y: i32,
}

let mut a = Point { x: 5, y: 6 };

a.x = 10;

let b = Point { x: 5, y: 6};

b.x = 10; // error: cannot assign to immutable field `b.x`
```

##### Structs
Structs are a way of creating more complex data types.

> By convention structs are capitalized and camelcased.

> the values of structs are immutable by default.

[Read more on structs](https://doc.rust-lang.org/book/structs.html)

##### Enums

A value of an enum can match any of the variants.

an enum constructor can be used like a function: [link](https://doc.rust-lang.org/book/enums.html)

#### Match 

Handy when dealing with complex if - elif conditions (behaves like switch in other languages):

```
let x = 5;

match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    4 => println!("four"),
    5 => println!("five"),
    _ => println!("something else"),
}
```

Form: `	val => expression`

Another powerful feature of enums is the possibility to process the possible variants.

> with the pipe `|` > you can match more pattern 

> equivalent to  `||` in javascript.

```
let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

> In the case of compound data types you destruction values inside the pattern.

```
match origin {
    Point { x, y } => println!("({},{})", x, y),
}
```

> you can bind values with @:
```
let x = 1;

match x {
    e @ 1 ... 5 => println!("got a range element {}", e),
    _ => println!("anything"),
}
```

##### Method Syntax

Instead of `baz(bar(foo))` we can have the same type of operation with Rust impl keyword > foo.bar().baz()

```
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
}

fn main() {
    let c = Circle { x: 0.0, y: 0.0, radius: 2.0 };
    println!("{}", c.area());
}
```

> Gist > make a struct that represents a circle then write an impl block and inside it define a method.

> Methods take a special first parameter, which are 3 variants: self, &self, &mutself ( self -> value on the stack, &self -> reference, &mut self -> mutable reference)

> Default to using `&self` instead of taking ownership and taking immutable references over mutable ones.

##### Chaining methods exple

```rs
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }

    fn grow(&self, increment: f64) -> Circle {
        Circle { x: self.x, y: self.y, radius: self.radius + increment }
    }
}

fn main() {
    let c = Circle { x: 0.0, y: 0.0, radius: 2.0 };
    println!("{}", c.area());

    let d = c.grow(2.0).area();
    println!("{}", d);
}
```

##### Associated functions

```
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

impl Circle {
    fn new(x: f64, y: f64, radius: f64) -> Circle {
        Circle {
            x: x,
            y: y,
            radius: radius,
        }
    }
}

fn main() {
    let c = Circle::new(0.0, 0.0, 2.0);
}
```

> associated functions are called with Struct::function() syntax rather ref.method()

##### Builder pattern

> Rust doesn't have method overloading, named arguments, or variable arguments.

```
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
}

struct CircleBuilder {
    x: f64,
    y: f64,
    radius: f64,
}

impl CircleBuilder {
    fn new() -> CircleBuilder {
        CircleBuilder { x: 0.0, y: 0.0, radius: 1.0, }
    }

    fn x(&mut self, coordinate: f64) -> &mut CircleBuilder {
        self.x = coordinate;
        self
    }

    fn y(&mut self, coordinate: f64) -> &mut CircleBuilder {
        self.y = coordinate;
        self
    }

    fn radius(&mut self, radius: f64) -> &mut CircleBuilder {
        self.radius = radius;
        self
    }

    fn finalize(&self) -> Circle {
        Circle { x: self.x, y: self.y, radius: self.radius }
    }
}

fn main() {
    let c = CircleBuilder::new()
                .x(1.0)
                .y(2.0)
                .radius(2.0)
                .finalize();

    println!("area: {}", c.area());
    println!("x: {}", c.x);
    println!("y: {}", c.y);
}
```

##### Strings

> A string is a sequence of Unicode scalar values encoded as a stream of UTF 8 bytes. All strings are guaranteed to be a valid encoding UTF-8 sequences.

Rust has two main string types: &str and String.

> &str: string slices: are fixed in size and cannot be mutated.

```
let mission = "Take over the world";
```
A string literal is a string slice that is statically allocated (saved inside our compiled program and exists for the entire duration it runs).

> Any function expecting a string slice will also accept a string literal.

> String literal can span multiple lines.

> Add `\` at the end of a line to trim spaces and newlines.

```
let str = "Take over\

        ... the World." // => Take over the World.
```

> You cannot access str directly but only through reference because str is an unsized type which require additional runtime information to be useful.


> A String is a heap allocated string. (growable and guaranteed to be UTF8). Usually created with the to_string() method.

> Strings will coerce into &str with an &.

> Viewing a String as a &str is cheap, but converting &str to String involves allocating memory.

> Because strings are valid UTF8 valid they do not support indexing.

You can use indexing in this way:

```
str.chars().nth( index ).unwrap();
```
> without the unwrap, Rust complains about a format error.

If you have a String, you can concatenate a &str to the end of it.



Int
------------
> get back to `if let` > `while let`

Closures in Rust are also called lambdas.

> Functions that also capture the enclosing environment.

> In Rust their synctax and capabilities make them very convenient for on the fly usage.

1. uses `||` instead `()` around input variables.
2. both input and return types can be inferred.
3. input variables must be specified
4. body delimitation `({})` is optional for single expressions. Required otherwise.
5. The outer variables may be captured
6. calling a closure is the same as calling a function

Closures can capture with:

1. by reference &T
2. by mutable reference &mut T
3. by value: T

Closures capture variable by enclosing scopes. 

> important: closures require generics.

```
fn apply<F>(f: F) where
    F: FnOnce() {
    f()
}
```

> when a closure is created, the compiler automatically creates an unanonimous structure to store the captured variables inside, meanwhile implementing the functionality via one of the traits: Fn, FnMt, FnOnce for this unknown type.

> Because a function can never capture variables, closures are more flexible. Therefore any function that can take a closure as an argument can take a function.

```rs
fn call_function<F: Fn()>(f: F) {
    f()
}

// Define a simple function to be used as an input.
fn print() {
    println!("I'm a function!")
}

fn main() {
    // Define a closure similar to the `print()` function above.
    let closure = || println!("I'm a closure!");

    call_function(closure);
    call_function(print);
}
```

> Fn, FnOnce, FnMut, traits dictate how a closure capture variables from the enclosing scope.

> Returning a closure is only possible by making it concrete. This can be done via boxing: 

1. Fn: normal
2. FnMut: normal
3. FnOnce: 

> Iterator::any is a function which when passed an iterator, will return true if any element satisfies the predicate, otherwise false.

```rs
// native implementation
pub trait Iterator {
    // the type being iterated over
    type Item;

    // any takes `&mut self` meaning the caller may be borrowed
    // and modified, but not consumed
    fn any<F>(&mut self, f: F) -> bool where
        // `FnMut` meaning any captured variable may at most be modified, not 
        // consumed. `Self::Item` states it takes arguments to the closure by value
        F: FnMut(Self::Item) -> bool {} 

}
```

7/8
-----
A bit field is a term in CS to store multiple, logical, neighboring bits, where each sets of bits, and single bits can be addressed. 

Within microprocessors: flags (collection of bit fields) are commonly used to control or indicate the intermediate or final state or outcome of different operations.

Closures in Rust are also called lambdas.

> Functions that also capture the enclosing environment.

> In Rust their synctax and capabilities make them very convenient for on the fly usage.

1. uses `||` instead `()` around input variables.
2. both input and return types can be inferred.
3. input variables must be specified
4. body delimitation `({})` is optional for single expressions. Required otherwise.
5. The outer variables may be captured
6. calling a closure is the same as calling a function

Closures can capture with:

1. by reference &T
2. by mutable reference &mut T
3. by value: T

Closures capture variable by enclosing scopes. 

> important: closures require generics.

```rs
fn apply<F>(f: F) where
    F: FnOnce() {
    f()
}
```

> when a closure is created, the compiler automatically creates an unanonimous structure to store the captured variables inside, meanwhile implementing the functionality via one of the traits: Fn, FnMt, FnOnce for this unknown type.

> Because a function can never capture variables, closures are more flexible. Therefore any function that can take a closure as an argument can take a function.

```rs
fn call_function<F: Fn()>(f: F) {
    f()
}

// Define a simple function to be used as an input.
fn print() {
    println!("I'm a function!")
}

fn main() {
    // Define a closure similar to the `print()` function above.
    let closure = || println!("I'm a closure!");

    call_function(closure);
    call_function(print);
}
```

> Fn, FnOnce, FnMut, traits dictate how a closure capture variables from the enclosing scope.

> Returning a closure is only possible by making it concrete. This can be done via boxing: 

1. Fn: normal
2. FnMut: normal
3. FnOnce: 

> Iterator::any is a function which when passed an iterator, will return true if any element satisfies the predicate, otherwise false.

```rs
// native implementation
pub trait Iterator {
    // the type being iterated over
    type Item;

    // any takes `&mut self` meaning the caller may be borrowed
    // and modified, but not consumed
    fn any<F>(&mut self, f: F) -> bool where
        // `FnMut` meaning any captured variable may at most be modified, not 
        // consumed. `Self::Item` states it takes arguments to the closure by value
        F: FnMut(Self::Item) -> bool {} 

}
```

###### High order functions

Rust Hofs: functions that take one or more functions and/or produce more useful function. Hofs and lazy iterators give Rust its functional flavor.

By default, the items in a module have private visibility, but this can be overidden with the pub modifier.

> structs have an extra level of visibility with their fields. The divisibility defaults to private and can be overridden with the pub modifier. This visibility only matters when a struct is accessed from outside the module where it is defined and has the goal of hiding information (encapsulation).

> However, structs with private fields can be created using public constructors. (cannot be accessed though)


The use declaration can be used to bind a full path to a new name, for easier access.

> super and self keywords > can be used in the path to remove ambiguity when accessing items and to prevent unenecessary hardcoding of paths.

> an attribute is metadata applied to some module, crate or item. This meta data can be used:

1. conditional compilation of code
2. set crate name, version and type (binary or library)
3. disable lints
4. enable compiler features (glob imports)
5. link to a foreign library
6. mark functions as unit tests
7. mark functions that will be part of a benchmark

#![attribute] applies to whole crate (without "!") > applies to a module or item.

> When working with with generics, the type parameters often use traits as bounds to stipulate what functionality a type implements.

```rs
fn printer<T: Display>(t: T) {
     println!("{}", t);
}
```

> Bounding restricts the generic to types that conform to the bounds.

> A consequence of how bounds work is that even if a trait doesn't include any functionality, you can still use it as a bound. `Eq` and `Ord` are examples of such traits from std library.

> Multiple bounds can be applied with a `+`. Like normal, different types are seperated with `,`

```rs
use std::fmt::{Debug, Display};

fn compare_prints<T: Debug + Display>(t: &T) {
    println!("Debug: `{:?}`", t);
    println!("Display: `{}`", t);
}

fn compare_types<T: Debug, U: Debug>(t: &T, u: &U) {
    println!("t: `{:?}", t);
    println!("u: `{:?}", u);
}
```

> a bound can also be expressed using a where clause immediately before the opening {, rather than at the type's first mention. `Where` clauses can also apply bounds to arbitrary types, rather than just parameters.

```rs
use std::fmt::Debug;

trait PrintInOption {
    fn print_in_option(self);
}

impl<T> PrintInOption for T where
    Option<T>: Debug {
    fn print_in_option(self) {
        println!("{:?}", Some(self));
    }
}

fn main() {
    let vec = vec![1, 2, 3];

    vec.print_in_option();
}
```

> "Associated items" refers to the set of rules pertaining to items of various types. It is an extension to `trait` generics, and allows traits to internally define new items.

7/13
--------

When multiple failure points may exist an option can be replaced with an more general : 

```rs
Result<T, E>
```

1. Ok(T): an element T was found
2. Err(E): an error E was found

Result also contains `unwrap` method which returns T or panics

Result aliasing expl:

```rs
type AliasedResult<T> = result::Result<T, ParseIntError>;
```

Any type that implements the Eq and Hash traits can be a key in `HashMap`. This includes: 

1. bool (not helpful - only two options)
2. int, uint 
3. String and &str (You can have a `HashMap` keyed by `String` and call `.get()` with a `&str`

> Important: `f32`, `f64` do not implement `Hash`

> You can easily implement `Eq` `Hash` for a custom type with jus one line:

```rs
#[derive(PartialEq, Eq, Hash)]
```

> `HashSet`: a HashMap where we just care about the keys (`HashSet<T>` is, in actuality just wrapper around `HashMap<T, ()>`. The main advantage is that it guarantees to not have duplicate elements.

If you insert a value that is already present, then the new value will replace the old.

Sets have 4 primary operations:

1. union: get all the unique elements in both sets.
2. difference: get all the elements that are on the first set but not on the second
3. intersection: elements in both sets
4. symmetric_difference: all elements in on set or the other but not both.


Rust provides a mechanism for spawning native OS via the `spawn` function.

```rs
let mut children = vec![];

    for i in 0..NTHREADS {
        // Spin up another thread
        children.push(thread::spawn(move || {
            println!("this is thread number {}", i)
        }));
    }
```

> The threads are scheduled by the OS

Rust provides asynchronous channels for communicating between threads. Channels allow a unidirectional flow of information between two end-points: the sender - the receiver.

7/17
---------
The Path struct represents file paths in the underlying filesystem:

* `posix::Path`: for UNIX-like systems
* `windows::Path`: for windows

A path can be created from almost any type that implements the `BytesContainer` trait, like a string, and provides several methods to get information from the file/path directory the path points to.

The file struct represents a file that has been opened (it wraps a file descriptor), and gives reds or write access to the underlying system.

> The File methods return the io::Result<T> an alias of Result<T, io::Error>

> When a `Process` goes out of scope, its `drop` method will wait until the child process finishes before releasing the resource.

Rust provides a Foreign Function Interface (FFI) to C libraries.

> Foreign functions must be declared inside an extern block annoted with a `#[link]` attribute containing the name of the foreign library.


7/20
--------

Tuples: a collection of values of different types. Constructed using parentheses `()`

1. elements in tuples are immutable.
2. Tuple fields cannot be accessed directly.
3. A tuple must have at least one field.

```rs
let tup = (4, 5.0, false, "hello"); 
```

An array is a collection of objects of the same type `T` > stored in contiguous memory > constructed using brackets `[]`

A common use for enums is to create a linked list:
```
enum List {

    Cons(u32, Box<List>),

    Nil,
}

impl List {
    // Nil is of type List
    fn new () -> List {
        Nil
    }

    fn prepend(self, elem: u32) -> List {
        Cons(elem, Box::new(self))
    }

    fn len (&self) -> u32 {
        match *self {
            Cons(_, ref tail) => 1 + tail.len(),
            Nil => 0,
        }
    }

    fn stringify(&self) -> String {
        match *self {
            Cons(head, ref tail) => {
                format!("{}, {}", tail.stringify(), head )
            },

            Nil => {
                format!("Nil")
            },
        }
    }
}

fn main () {
    let mut list = List::new();

    list = list.prepend(1);
    list = list.prepend(2);
    list = list.prepend(3);

    print!("list len is {}", list.len() );

    println!("list string is: {}", list.stringify() )
}

```

All values in Rust are stack allocated by default. Values can be boxed (allocated in the heap) by creating a Box<T>.

> A box is a smart pointer to a heap allocated value of type `T`. When it goes out of scope, its destructor is called, the inner object is destroyed and the memory heap is freed.

> Boxed values can be deferenced using the `*` operator; this removes one layer of indirection.

7/11
--------
Rust enforces RAII (Resource Acquisition Is Initialization), so whenever an object goes out of scope, its destructor is called and its owned resouces are freed.

> Because variables are in charge of their own resources, resources can only have one owner.

> Mutability of data can be changed whne ownership is transferred.

> When data is immutably borrowed, it also freezes. Frozen data can't be modified via the original object until all references to it go out of scope.

Data can be immutably borrowed any number of times, but while immutably borrowed, the original data can't be mutably borrowed. On the other hand, only one mutable borrow is allowed at a time. The original data can be borrowed again only after the mutable reference goes out of scope. 

> A `ref` borrow on the left side of an assignment is equivalent to an `&` borrow on the right side.

A lifetime (borrow-checker) uses to ensure all borrows are valid.

Function signatures with lifetimes have a few constraints:
* any reference must have an annotated lifetime
* any reference being returned must have the same lifetime as an input or be `static`

> one input reference with lifetime must live at least as long as the function.

A longer lifetime can be coerced into a shorter one so that it works inside a scope normally wouldn't work in. This comes in the form of inferred coercion by Rust compiler, and also in the form of declaring a lifetime difference.

A static lifetime is the longest possible lifetime, and lasts for the lifetime of the running program. A `static` lifetime may also be coerced to a shorter lifetimes.

There are two ways to make a variable with `static` lifetime, both are stored in read-only memory of the binary:

1. Make a constant with the static declaration
2. Make a string literal which has type: &'static str

> The compiler is capable of providing basic implementations for some traits via the #[derive] attribute 

List of derivable traits:

1. comparison traits: Eq, PartialEq, Ord, PartialOrd
2. Clone, to create T from &T via copy.
3. To give 'copy semantics' instead of 'move semantics'
4. Hash: to compute a hash from &T
5. Default: to create an empty instance of data type
6. Zero: to create a zero instance of numeric data type.
7. to format a value using the {:?} formatter

In Rust many operators can be overloaded via traits. (some operators can be used to accomplish different tasks based on their input arguments)

The arguments of a macro are prefixed by a dollar sign `$` and type annotated with a designator. list:

1. block
2. expr
3. ident > used for variable/function names
4. item
5. pat (pattern)
6. path
7. stmt (statement)
8. tt (token free)
9. ty (type)

> and_then() calls its function input with the wrapped value or returns `None` if the `Option` is `None`.

```rs
fn cookable_v2(food: Food) -> Option<Food> {
    have_ingredients(food).and_then(have_recipe)
}
```
