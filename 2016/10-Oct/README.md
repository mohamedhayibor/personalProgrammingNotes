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
