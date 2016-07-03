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
