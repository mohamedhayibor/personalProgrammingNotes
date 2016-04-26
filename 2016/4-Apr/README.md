
4/1 (Finally got some momentum, let's kill it!!!)
------
###### More css rule patterns

* X:visited and X:link
:link pseudo to target links not clicked yet, :visited for the ones clicked
```
a: link { color: red; }
a: visited { color: purple; }
```

* X > Y
will only select direct children
```
div#container > ul {
  border: 1px solid black;
}
```

* X ~ Y: less strict version X + Y
```
ul ~ p {
   color: red;
}
```

* X[title]: will select the anchor tags that have a title attribute:
```
a[title] {
   color: green;
}
```

* X[href$=".jpg"]: searching for all anchors which link to an image:
```
a[href$=".jpg"] {
   color: red;
}
```

* X: checked : will only target a ui element that has been checked:
```
input[type=radio]: checked {
  border: 1px solid black;
}
```

* X: after/ before : generate content around the selected element.

* X:hover
```
div:hover {
  background: #e3e3e3;
}
```
* X:not(selector) : negation

``` 
div:not(#container) {
   color: blue;
}
```
[codeTutsplus](http://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)

4/2
---------
Git squash: pushing a bunch of commits as a single commit (use case: for a pr).

example squashing 5 commits
```
git rebase -i HEAD~5
```
Reasons to use git rebase:
1. edit previous commit messages.
2. squashing.
3. Delete or revert commits that are no longer necessary.

Rebasing commits against a branch:
```
git rebase -i `otherBranchName`
```

Commands available while rebasing:
* pick: to include commit (delete entire line to not include commit).
* reword: like pick, but the rebase process will pause and give you the chance to alter the commit message.
* edit: you'll get the chance to add or change the commit entirely. (also allows you to to split a large commit into smaller ones)
* squash: (see example above), gives you the chance to write a new commit message.
* fixup: similar to squash, but the commit to be merged has its message discarded.
* exec: lets you run arbitrary shell commands against a commit.

Since rebase changes the git history, rather than `git push origin` use:
```
git push origin master --force
```

4/3
-----
Quick dive into building a chrome extension:

1. create a `manifest.json` file
2. Set up minimum resources: icon.png and popup.html (enabled with popup.js)
3. Load the extension: `load unpacked extension` via extensions developer mode
4. Set up trigger action with manifest.json file

```json
{
  ...
  "browser_action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html",
    "default_title": "Click here!"
  },
  ...
}

```
[Chrome ext api](https://developer.chrome.com/extensions/api_index)

4/4
----
Event.target: a reference to the object that dispatched the event. (can be used for event delegation).

example: hiding an element when a click event fires:
```js
function hide(e) {
  e.target.style.visibility = 'hidden';
}
// adding listener
element.addEventListener('click', hide, false);
```
4/5
----
To add a listener when dealing with the DOM, we can use a method called addEventListener:

```js
// with unanimous callback
var button = document.querySelector("button");
button.addEventListener("click", function () {
	console.log("a click event fired");
})
```
###### Performance & Memory issues:
> It is preferable to use named function instead unanonimous ones so that .removeEventListener() can be used to detach the event.

```js
Element.removeEventListener('click', listener, false);
```

When looping an unanonimous function will be recreated every single time, which can be a performance issue.

4/6
----
A Hash function is any function that can be used to data of arbitrary size to data of fixed size (returned values are called hash values, hash codes, hash sums or hashes).

A hash table is used for quick lookup (accelerate table or database lookup by detecting duplicated records in a large file)

Properties:

1. Deterministic: for a given input it must always generate the same hash value.
2. Uniformity: should map the expected inputs as evenly as possible over its output range.
3. Defined range: (ie output that is constrained to 32 bit integer values can be used to index an array).
4. Data normalization
5. Continuity
6. Non-invertible: (impossible to reconstruct the input values from hash values)

4/7
----

Hash function algorithms: (Mostly depends on the nature of the input data and the normal distribution of the application)

> a perfect hash function: maps each input to a different hash value. (injective)

######z-index (css)
property specifies the z-order of an element and its descendants. An element with a higher z-index usually covers another with a lesser one.

For a positioned box: the z index specifies:

1. The stack level of the box in the current stacking context
2. Whether the box establishes a local stacking context

> Stacking context: a the 3-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user.

4/08
-------
The location interface represents the location URL of the object is linked to. Changes done on it are reflected on the object it relates to.

Properties:

* Location.href > a DOMString containing the entire url.
* Location.hostname > a DOMString containing the domain url.
* Location.username / .password > a DOMString containing the username/password specified before the domain name.

Methods:

Location.assign() method causes the window to load and display the document at the URL specified.
```js
document.location.assign('https://google.com');
```

The Location.reload() method reloads from the current URL. example:
```js
document.location.reload(true)
```

4/9
----
Microservices: a software achitechture in which complex applications are composed of small, independent processes communicating with each other using using language agnositc Apis.

> small building blocks, highly decoupled and focussed on doing a small task well (unix philosophy)

properties:

1. Easy to replace
2. Organized around capabilities
3. Architectures are symetrical rather than hierarchical
4. 

4/10
-------
codebase: a single or set of repositories who share a root commit (in a decentralized revision control system).

a distributed system: multiple codebases. (each component in a D.S. is an app)

a deploy: a running instance of the app.

> one codebase per app. Many deploys of the app.

App's config: everything that is likely to vary between deploy's (staging, production, developer environments)

> strict separation of config from code.  (config varies substantially across deploys, code does not)

Litmus test: can the codebase be open sourced without compromising any credentials.

> store config in environment variables.

A backing service is any service the app consumes over the network as part of its normal operation.

A codebase is transformed into a deploy through 3 stages:

1. Build stage: converts a code repo into an executable bundle known as a build.
2. Release stage: the build produced by the build stage and combines it with the deploy's current config.
3. Run stage: (runtime) runs the app in the execution environment.

Processes: execute the app as one or more stateless processes.

> Any data that need to persist must be stored in a stateful backing service (ie database)

Port binding: the web app exports HTTP as a service by binding to a port.

Disposability: (can be started or stopped at a moment's notice)

Maximize robustness with fast startup and graceful shutdown.

* Processes should strive to minimize startup time.
* shut down gracefully when they receive a SIGTERM. (for instance: ceasing to listen on the service port)

[12 factor app](http://12factor.net/)

4/11
-------

SOA: service oriented architecture (SOA): architectural pattern in which application components provide services to other components via a communication protocol.

npm onsite soa example:
![im](http://res.cloudinary.com/masteryoperation/image/upload/v1460432872/Screen_Shot_2016-04-11_at_11.45.32_PM_hp3ojh.png)

a trie: digital tree or (radix || prefix tree: can be searched by prefixes) is an ordered tree data structure used to store a dynamic set of associative array where the keys are usually strings. 

4/12
-------
###### Trie

Characteristics:

* The trie is a tree where each vertex represents a single word or a prefix.
* The root represents an empty string. A vertex with k edges of distance of the root have an associated prefix of length k.
* Let v and w be two vertexes of the trie, if v a direct father of w, then v must have an associated prefix of w.

Advantage of using a trie:

1. Looking up data in a trie is faster in the worst case scenario.
2. There are no collisions of different keys in a trie
3. Buckets in a trie are necessary only if a single key is associated with more than one value.
4. No need to provide a hash function or to change hash functions as more keys are added to a trie.
5. can provide alphabetical ordering of the entries by key

Drawbacks: 

1. Slower than hash tables for looking up data in some cases.
2. Some keys, such as floating point numbers, can lead to long chains and prefixes that are not particularly meaningful.
3. Some tries can require more space than a hash table. (as memory may be allocated for each character in the search string rather than a single chunk of memory for the whole entry)

Common Application:

Storing a predictive text or auto-complete dictionary.

Alternative: DAFSA (Deterministic acyclic finite state automaton): can compress identical branches from the trie which corresponds to the same suffixes (or paths) of different words being stored.

Tries are also well suited for implementing approximate matching algorithms (spell-checking, hyphenation).

Trie implementation: 

There are many implementations with different trade-offs between memory use and speed of operations. 

data: 
```js
{ "amy": 56, "ann": 15, "emma": 30, "rob": 27, "roger": 52 }
/** implementation for ann and amy
   .
   |
   a
 /   \
m     n
|     |
y     n
|     |
\0 56 \0 15
*/

/** implementation for all
          .
  /       |      \
  a        e       r
/   \      |       |
m     n     m       o
|     |     |     /   \
y     n     m    b     g
|     |     |    |     |
\0 56 \0 15   a  \0 27   e
     |          |
   \0 30        r
                |
              \0 52
*/

```
[topcoder trie article](https://www.topcoder.com/community/data-science/data-science-tutorials/using-tries/)

4/13
-------
radix sort: a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value.

DAFSA or DAWG: a data structure that represents a sets of strings, and allows for a query operation that tests whether a given string belongs to the set in time proportional to its length.

4/14
--------
Session management: a process by which a server maintains state of an entity (interacting with it) to remember how to react to subsequent request throughout a transaction. (Should be unique per user and computationally very difficult to predict).

Open Authorization (OAuth): a protocol that allows users to approve an application acting on their behalf without sharing passwords.

OpenId: an HTTP-based protocol that uses identity providers (Google, FB, Twitter...) to validate that a user is who he/she is.


> JWT = JSON Web Token: for passing claims between parties in web application environment. JWT claims can be used to pass identity of authenticated users between an identity provider and a service provider, or any other type of claims as required by business processes.
[NodeJS implementation](https://github.com/auth0/node-jsonwebtoken)


ClickJacking: (UI redress attack) a malicious technique of tricking a web user into clicking on something different from what the user perceives they are clicking on. Thus, potentially revealing confidential information or taking control of their computer.

> similar: LikeJacking, CursorJacking

4/15
-----------

##### Nodejs Child processes

exec syntax: require('child_process').exec(command, [options], callback)

```js
var exec = require('child_process').exec;
var child = exec('node -v');
child.stdout.on('data', data => {
    console.log('stdout: ' + data); // stdout: v5.6.0
});
child.stderr.on('data', data => {
    console.log('stdout: ' + data);
});
child.on('close', code => {
    console.log('closing code: ' + code); // closing code: 0
});

```
4/16
-------
DNS prefetching: a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced by the document (css, js, ...).

> DOne in the background, so that DNS is most likely resolved the the time referenced items are needed.

> By default prefetching of embedded link hostnames is not performed on documents loaded over HTTPS.

###### Controlling

A server can opt out of DNS prefetching by serving content by setting `x-dns-prefetch-control` to `off`.

For individual documents, using http-equiv attribute is an alternative:
```html
<meta http-equiv="x-dns-prefetch-control" content="off"> <!-- "on" to turn on -->
```
The content provider can force the lookup of specific hostnames without specific anchors:
```html
<link rel="dns-prefetch" href="http://www.link.com">
```

http-equiv attribute: defines the pragma (defined using the content) that can alter servers and user-agents behavior. example:

```html
<!-- For Google Chrome Frame that enhance IE browsing experience (using Google Chrome rendering technology: latest HTML5 features) -->
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<!-- refreshing document every 30s -->
<meta http-equiv="refresh" content="30">
```


(css prop) justify-content: property defines how the browser distributes space between and around flex items along the main-axis of their container.
(alignment done after the lengths and auto margins are applied)

```css
/* pack elements around the center */
justify-content: center;

/* distribute items evenly, equal space around them */
justify-content: evenly-spaced;

```

4/17
-------

E6 curry example:
```js
const curryAdd = (x) => (y) => (z) => x + y + z;

curryAdd(3)(1)(2) // 6
```
Partial application (function): the process of fixing the number of arguments to a function, producing another function of smaller arity.

Practical example: calling a carried function with only some of its arguments.

a combinator: a higher order function that uses only function application and earlier combinators to define the result from its arguments.

Once function decorator:
```js
const once = (fn) => {
  let called = false;

  return () => (called) ? void 0: ((called = true), fn.apply(this, arguments));
}

const askedOnBlindDate = once( () => 'Executed!');

console.log( askedOnBlindDate() ) // 'Executed'
console.log( askedOnBlindDate() ) // undefined
console.log( askedOnBlindDate() ) // undefined

```

4/18
--------

y-combinator enables you to make recursive functions without needing to bind a function to a name in an environment.

> with fixed-point combinators it's possible to compute everything computable without binding names.

```js
function Y (f) {
  return (function(x) {
    return f(function (v) {
      return x(x)(v);
    })
  })(function (x) {
    return f(function (v) {
      return x(x)(v);
    })
  })
}
------
// es6
const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)))


const factorial = Y(function (fac) {
  return function (n) {
    return (n === 0 ? 1 : n * fac(n - 1));
  }
})

console.log( factorial(10) ) // 3628800

```

a function decorator takes a function as an argument returns a function with a semantic relationship between the two.

> by default lean towards writing function decorators in a "context agnostic" way.

4/19
------
Function.prototype.bind: creates a binding that cannot be overridden. You cannot override the context of a function that has already been bound unless unbound.

a trampoline: a loop that iteratively invokes thunk-returning functions (lisp style). (- also associated with jumps, different code paths in low level programming).

```js
function tramp(f) {
    var result = f;
    while(true) {
        if (typeof(result) == 'function') {
            result = result();
        } else {
            return result;
        }
    }
}

```
4/20
--------

(Publish-subscribe): pub/sub a messaging pattern where senders of messages (publishers), do not program the messages to be sent directly to specific receivers (subscribers), but instead characterize published messages into classes without knowledge of which subscribers.

Advantages:

1. Loose coupling
2. Scalability

Disadvantages:

1. Inflexible Semantic coupling
2. Message Delivery Issues

--
a computer cluster consists of  a set of loosely or tightly connected computers that work together (a single system != grid computing)

Grid computing: a distributed system with non-interactive workloads that involve a large number of files. (each computer is set to perform a different task/application)

Distributed system: a software system in which components located on networked computers communicate and coordinate their actions by passing messages. Significant characteristics:

1. concurrency of components.
2. lack of global clock.
3. independent failure of components.

Dining philosophers problem: refer to problems in concurrent algorithm designs to illustrate synchronization issues and techniques for resolving them.

4/21
--------

(OTP): The open telecom platform: a development system platform for building telecommunications applications, and a control system platform for running them.

MQTT protocol: light weight messaging protocol for use on top of the TCP/IP protocol. (small code footprint due to limited bandwidth).

4/22 
--------

Domain Name System (DNS): a hierarchical decentralized naming system for computers, services connected to the internet or a private network.

Interpreted means that the code is executed by an interpreter rather than a compiler. (tradeoff: flexibility rather than executing safety)

Object-oriented means the language supports encapsulation (data and behavior packed together).

4/23 (beginning the chocolate007 project)
---------
##### Ruby
Just about everything in ruby is an object, down to each individual number.

you can open a class up again and modify it. (new objects and existing objects)

4/24
------

Local variable names and method names are nearly identical. 

- Class variables are shared between a class, its subclasses and its instances.

> a class variable must start with a @@ 

> global variables start with $

Always have a receiver when dealing with method assignments, otherwise ruby assumes you are assigning to a local variable.

> ||= : makes an assignment if the value was nil or false

> &&= : makes an assignment if the value was not nil or false

modules serve two purposes in Ruby: namespacing and mix-in functionality.

Mix-in functionality allows sharing common methods across multiple classes or modules.

A module may be reopened any number of times to add, change, or remove functionality.

```rb
if __FILE__ == $0
# __FILE__ > magic variable that contains the name of the current file.
# $0 > the name of the file used to start the program.

# unless == if not

# until === !while
```

> everything but nil and false evaluate to true.

> Ruby does type checking (duck-typing) at runtime, not compile time.

Design philosophie (duck-typing): code to interfaces rather than implementations.

4/25
------
Static analysis: analysis of computer software performed without actually running programs.

Fuzzing: fuzz testing: a software testing technique, (semi) automated that involves providing, unexpected, random data, to the input of the computer program.

trace: measure of how long something takes, e.g. (db query, network request)
Transaction: a group of traces e.g (traces associated with incoming HTTP request)
