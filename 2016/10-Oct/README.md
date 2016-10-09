10/5 Notes on IOS
--------
### High level

Levels (User -> os):

	1. Cocoa Touch
	2. Media
	3. Core Services
	4. Core OS


Core OS: Osx kernel, BSD, Mach 3.0, sockets, security, power management, keychain access, certificates, file system, bonjour.

Core Services: collections, core location, address Book, Net Services, Networking, Threading, File access, preferences, sqlite, URL utilities.

Media: core audio, (jpeg, png, tiff), openAl, pdf, audio mixing, quartz, audio recording, core animation, video playback, openGL ES

Cocoa touch: Multi-Touch, Alerts, Core Motion, Web view, view hierarchy, Map kit, localization, Image picker, controls, camera

-----
- UITableViewDelegate: the delegate UITableView object must adopt it. (optional methods of the protocol allow the delegate to manage selections, configure section headers and footers, help to delete and reorder cells, and perform actions.

Many of its methods protocol take `NSIndexPath` object as parameters and return values.

### MVC

Model: what your application does.
Controller: How your Model is presented to the User (UI logic)
Views: subject to controllers

#### Properties
controllers can always talk to the model
The model and view should never speak to each other.
sometimes the view needs to synchronize with the controller.
The Controller sets itself as the view's delegate.

The delegate is set via a protocol.

views don't own the data they display.

Never import a UIkit inside a model never has to deal with anything with views.

There is a slight difference between internal and public:
1. internal: public within your module
2. public: public to everyone in other modules

optional is an enum:
```
   enum Optional<T> {
       case None,
       case Some(T)
 }
```

enums are special types of classes > a descret set of values, they can't have any contained vars and also can't have inheritance.

> enums are passed by value

In Swift a function is just like any other types. (first class citizens)

Struct is very much like classes:
* has vars (stored and computed)
* no inherittance
* like enums are passed by value whereas classes are passed by reference.

Passing something by reference means that something lives in the heap, when you are passing it around you are passing a pointer to it.

Passing by value means that when you pass it, it copies it.

> enums are like structs (passed by value)

A closure is an inline function that captures the state of its environment.

10/7
------


Constant pointers to a class (let) still can mutate by calling methods and changing properties When passed as an argument, does not make a copy (just passing a pointer to the same instance)

* usually you will choose class over struct. struct tends to be more for fundamental types. Use of enum is situational (any time you have a type of data with discrete values).

#### Methods
All parameters to all functions have an internal and an external name.

* The internal name is the name of the local variable you use inside the method.
* The external name is what callers use when they call the method.

> you can put `_` if you don't want callers to use an external name at all for a given parameter.

Precede your func or var with the keyword override (To override).
A method can be marked as final which will prevent subclasses from being able to override. (classes can also be marked final).


Properties: 
Lazy Initialization: A lazy property does not get initialized until someone accesses it. You can allocate an object, execute a closure, or call a method if you want.

> satisfies the rule "you must initialize all your properties"

Important classes: 

* NSObject: Base class for all Objective-C classes
* NSNumber
* NSDate
* NSData (a bag of bits)

Initialization:

1. By the time any init is done, all properties must have values (optionals can have the value `nil`)
2. Two types of inits: a class: convenience and designated (ie not convenience)

Inheriting init:

* If you do not implement any designated inits, you'll inherit all of your superclass's designateds
* If you override all of your superclass's designated inits, you'll inherit all its convenience inits
* If you implement no inits, you'll inherit all your superclass's inits

NSUserDefaults: A storage mechanism for property list data. It persists between launchings of your application.

typealias: lets you create a type (a nametype that is excatly as some other name type).

A UIView's initializer is different if it comes out of a storyboard.

* init(frame: CGRect) // initializer if the UIVIew is created in code
* init(frame: NSCoder) // initializer if the UIView comes out of a storyboard

Another alternative to initializers in UIView: awakeFromNib() // only called when  the UIView came out of storyboard

Mutability is done with NSMutableAttributedString.

> NSAttributedString is not a String, nor an NSString: You can get its contents as an String/NSString with its string or mutableString property.

10/09
------------
Segues always create a new instance of an MVC:

> When you segue in a navigation controller it will not segue to some old instance, it'll be new

Preparing for a segue:

When a segue happens, the view controller containing the instigator gets a chance to prepate the destination view controller to be segued to.

Automatic Reference Counting (ARC): (Reference types classes are stored in the heap).

> It counts references to each of them and when there are zero references, they get tossed.

You can influence ARC by how you declare a reference-type: strong, weak, unowned.

Protocols are a way to express an API more concisely.

(Instead of forcing the caller of an API to pass a specific class, struct, or enum, an API can let callers pass any class/struct/enum that the caller wants but can require that they implement certain methods and/or properties that the API wants.

> a protocol is a type

