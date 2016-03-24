03/07 (rationalized a lot in previous days, may those be the end)
----
State ~~ a data model.

* When a web compenent at the lowest level of abstraction is changed, that change in state needs to propagate all the way to top.
* When change our (this.state) by getting a this.props from child components to the parent model (at the top).

React lifecycle hooks:
* componentWillMount() gets triggered once before any rendering. Exple: to load data asynchronously and force rendering through setState
* componentDidMount() gets triggered after initial rendering.
* componentWillReceiveProps(obj, nextProp) triggers when the component receives new props.
* shouldComponentUpdate: to optimize rendering.
* componentDidUpdate() triggered after rendering.
* componentWillUnmount() triggered when a component is about be removed from DOM.
* getInitialState()
* mixins() contains an array of mixins to apply to components

> A store is a single source of truth for a part of your application state.

###### Browser storage:
Whereas sessionStorage loses its data when the browser is closed, localStorage doesn't. Both have same apis:

* storage.getItem(k): Returns the stored string value for the given key.
* storage.removeItem(k): Removes the data with matching key.
* storage.setItem(k, v): Stores the given value using the given key.
* storage.clear(): clears the storage content.

localStorage and sessionStorage can use up to 10 MB of data combined.


###### Alt experimentation:
Alt's FinalStore is a store that listens to all existing stores.

.waitFor() becomes necessary when dealing with asynchronously fetched data that depends on each other.
`exple: this.waitFor(dataStore)`

Decorators provide us simple means to annotate our components.

@DropTarget allows a component to receive components annotated with @DragSource.
DropTarget triggers as we perform actual logic based on the components.

3/8
-----

Algebraic properties in CS:
* Associative: grouping doesn't matter
* commutative: order doesn't matter
* idempotent: duplicates don't matter
* Identity: this value doesn't matter
* Zero: other values don't matter

03/09
------

Quick dive into redux (reducer type, flux implementation):

1. Specify the mutations you want to happen with plain objects called actions.
2. You write a special function (reducer) to decide how every action transforms the entire application state.

Principles:
* Single source: the whole state of the application is stored in an object tree within a single store.
* Read only: the way to mutate state is by emitting an action.
* functional: changes made with pure functions (reducers).

> you can send actions to the store with store.dispatch() || bindActionCreators() to automatically bind many action creators to a dispatch() function.

03/10
------

ES6 Array helpers (9):
.from() | .of() | .copyWithin() | .fill() | .find() | .findIndex() | .keys() | .entries() | .values()

###### Array Methods

* Array.from() transforms arraylike and iterator objects into arrays:

```js
const obj = { '1': 'Apple', '2': 'Orange', length: 4};

console.log( Array.from(obj) );
// [ undefined, 'Apple', 'Orange', undefined ]
// in Js Arrays are zero based
--
function f ( ) {
	return Array.from(arguments)
}
console.log( f(1, 2, 3, 4) );
// [ 1, 2, 3, 4 ]
// arguments is an array like object

// literally any iterable: sets, maps, strings

```

* Array.of() creates a new Array instance with a variable number (regardless of type):

```js
console.log( Array.of(1, null, undefined, 4, NaN) );
// [ 1, null, undefined, 4, NaN ]

```
###### Array Prototypes

* .copyWithin(indices), like the name implies, returns an array with copies within the array depending (starting, end indices):

```js
console.log( [1, 2, 3, 4, 5, 6].copyWithin(0, 3) );
// [ 4, 5, 6, 4, 5, 6 ]

```

* .fill(value, start, end), fills array with a value depending on start, end indices:

```js
console.log( [1, 2, 3, 4, 5, 6].fill(1.1, 2) );
// [ 1, 2, 1.1, 1.1, 1.1, 1.1 ]

```

* .find(callback), returns a value that satifies callback or undefined:

```js
function isEven (x) {
	return x % 2 === 0;
}
console.log( [1, 2, 3, 4, 5, 6].find(isEven) );
// 2
```

* .findIndex(callback), returns index of value that satifies callback or -1:

```js
function isEven (x) {
	return x % 2 === 0;
}
console.log( [1, 2, 3, 4, 5, 6].findIndex(isEven) );
// 1
```

* Array.{ keys, entries, values } returns a new Array iterator:

```js
const arr = [1, 2, 3, 4, 5, 6];
const it = arr.keys();

console.log( it.next() ); // { value: 0, done: false }
console.log( it.next() ); // { value: 1, done: false }

```

* .includes(value), checks if value is within array return true/false:

```js
console.log( [1, 2, 3, 4, 5, 6].includes(5) ); // true

```

03/11
------

##### Tips on Optimizing javascript code:

Use of prototypes instead of methods whenever possible to avoid the recreation of functions and closures.

```js
// Bad
baz.Bar = function() {
  // constructor body
  this.foo = function() {
    // method body
  };
}

// Good refactor
baz.Bar = function () {
	// constructor body
}
baz.Bar.prototype.foo = function () {
	// method body
}

```
> only one function ever gets created, no closures are created.

Place variable declarations/initialization with value types (not reference types such as arrays or objects) in prototypes.

```js
// Bad
foo.Bar = function() {
  this.prop1_ = 4;
  this.prop2_ = true;
  this.prop3_ = [];
  this.prop4_ = 'blah';
};
// Better
foo.Bar = function() {
  this.prop3_ = [];
};

foo.Bar.prototype.prop1_ = 4;

foo.Bar.prototype.prop2_ = true;

foo.Bar.prototype.prop4_ = 'blah';

```

Double check closures:
* Common source for memory leaks
* Much slower than using an inner function, much slower than static functions
* They add a level to the scope chain. Exple: When the browser resolves properties, each level of the scope chain must be checked.

Avoid `with`, as it modifies the scope chain, making more expensive to look up variables in other scopes.

[ Google Develpers Link ](https://developers.google.com/speed/articles/optimizing-javascript#defining-class-methods)

3/12
-------

###### The pixel pipeline:
1. Javascript
2. Style calculations
3. Layout
4. Paint
5. Compositing

###### Reflow:
The browser's process of recalculating layout (positions, geometries) of elements in the document.

> Reflows are user-blocking operations in the browser.

Guidelines for reducing reflows:
* reduce unecessary DOM depth (changes at one level can trigger changes at every level of the tree)
* remove unused css
* with animations use absolute values as much as possible
* Avoid complex css selectors

3/13
-------
###### tinkering with redux
common example when using redux:
```js
dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
```
dispatch in this case is a function getting called (executed with an object param.)
> Actions themselves are plain objects

a redux thunk middleware for "Async Action creation"

```js
function addTodo(text) {
  return function (dispatch, getState) {
    if (getState().todos.length === 3) {
      return;
    }
    dispatch(addTodoWithoutCheck(text))
  }
}

```
Middleware lets you inject custom logic that interprets every action before it is dispatched.
> Middleware let us write more expressive, potentially async action creators.
Simplest middleware example:
> thunk: a function returning a function.

The redux store is instantiated with the following:
```js
import { createStore } from 'redux'
var store = createStore(() => {})
```
> expects a function to reduce to the current state.

3/14
---

###### notes from Dan Abramov's video series:

Vid 1:
Complex or Simple you are going to represent your application's state as a single javascript object.

All changes in the state are explicit. It is possible to keep track of all of them.


Vid 2:
The state tree is read only. (you can't directly modify or write to it)
Instead anytime you want to change the state, you need to dispatch an action.
-An action is a plain JS object describing the change.

For instance: the state is the minimal representation of your data within the app. the action is the minimal representation of the change of the data.
The structure of the action object is up to the programmer. The only req is that it should have a type property.

Any change of the state of the application is triggered by actions.

Vid 3:
Some functions that you will write in redux will need to be pure (no mutations)

Vid 4:
To describe state mutations, you have to write a function that takes the previous state of the app, the action being dispatched, and returns the next state of the app and the function has to be pure. The function is called a reducer.

Vid 5:
The reducer accepts (state, action)

vid 6:
createStore has 3 important methods:
* .getState(): retrieves the current state of the redux store.
* .dispatch(): lets you dispatch actions to change the state of your application.
* .subscribe(): lets us register a callback that the redux store will call everytime an action has been dispatched. (for instance: updating the UI of you app)

All three in action:
```js
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(reducer);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT'})
})


```
[JSBIN Link](http://jsbin.com/vedaxipuco/2/edit?js,output)

vid 7:
implementation of redux createStore from scratch (ignoring edge cases).
The only argument: reducer

```js
const createStore = (reducer) {
	let state = state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener)
		};
	};

	dispatch({});

	return { getState, dispatch, subscribe }
};

```

3/15
-------

###### more redux

> applyMiddleware takes all your middlewares as parameters and returns a function to be called
with Redux createStore. At the last function invocation, it produces "a higher-order
store that applies middleware to a store's dispatch".

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
```

updating our views (re-rendering)

> <provider> a component that takes your store as property and has a function as child.

[redux counter example](http://jsbin.com/xupuwefagu/2/edit?js,output)

```js
// combineReducers from scratch (ignoring edge cases)
const combineReducers = (reducers) => {
	return (state = {}, action) => {
		return Object.keys(reducers).reduce(
			(nextState, key) => {
				nextState[key] = reducers[key](
					state[key],
					action
				);
			},
			{}
		);
	};
};

```
3/16
-----

##### DOM: a programming interface for HTML, XMl and SVG.
> provides a structured representation of the document as a tree (group of nodes and objects, posessing various properties and methods).

###### Element.getElementsByTagName() returns a live HTML collection of elements with the given tag name. (search restricted to elements which are descendants of the specified element)
```js
// check the alignment on a number of cells in a table. 
var table = document.getElementById("forecast-table"); 
var cells = table.getElementsByTagName("td"); 
for (var i = 0; i < cells.length; i++) { 
    var status = cells[i].getAttribute("data-status"); 
    if ( status == "open" ) { 
        // grab the data 
    }
}
// from mozilla
```

###### Document.getElementById() returns a reference to the element by its ID (string: case sensitive)

###### Document.createElement() creates the specified HTML element.

###### Node.appendChild() methods adds a node to the end of the list of children of a specified parent node.

###### Element.innerHTML() property sets or gets the HTML syntax describing the element's descendants.
* var content = element.innerHTML  // => on return, content contains the serialized HTML code describing all of the element's descendants.
* element.innerHTML = content // => removes all element's children, parses the content string and assigns the resulting nodes as children of the element.
> This property provides a simple way to completely replace the contents of an element.
```js
document.body.innerHTML = '' // replaces the body content with an empty string.
```
> innerHTML property of many types of elements, body, html,... can be returned or replaced.

For security reasons do not use innerHTML when inserting plain text, instead use node.textContent. This doesn't interpret the passed content as HTML, but instead inserts it as raw text.

###### HTMLElement.style property returns a CSSStyleDeclaration object that represents only the element's inline style attribute, ignoring any applied style rules.

###### Element.setAttribute() adds a new attribute or changes the value of an existing attribute on the specified element.
> element.setAttribute(name, value)
* name: name of the attribute as a string
* value: desired new value of the attribute

```js
var b = document.querySelector("button"); 
b.setAttribute("disabled", "disabled");
```
> set the attr to disabled

###### Element.getAttribute() returns the value of a specified attribute on the element. null or an empty string will be returned if attr doesn't exist.
```js
var attribute = element.getAttribute(attributeName);
```
###### EventTarget.addEventlistener() registers the specified listener on the eventTarget it's called on.
```js
//general example
target.addEventListener(type, listener[, options]);

// with callback
document.getElementById('increment')
	.addEventListener('click', function () {
		store.dispatch({ type: 'INCREMENT'})
	})
```
> it works on any DOM element, not just HTML elements.
###### GlobalEventHandlers.onload, an event handler for the load event of a window
```js
window.onload = function() {
  init();
  doSomethingElse();
};
```
###### Window.scrollTo(), scrolls to a particular set of coordinates in the document.
```js
window.scrollTo( 0, 1000 );
// xcord, ycord
```
3/17
-------
###### DOM Interfaces:
Attr: attribute of a DOM element as an object.
> Element.getAttribute() returns the value of a specified attribute on the element. (used more than getAttributeNode())
```js
var div1 = document.getElementById("div1");
var align = div1.getAttribute("align");
// align == 'div1'
```
Element.hasAttribute() to check for an attribute existence prior to calling getAttribute().

* HTMLCollection.length returns the number of items in the collection.
* MutationObserver provides developers a way to react to changes in a DOM.
```js
new MutationObserver(
  callback
);
```
methods: .observe(), .disconnect(), .takeRecords()
* MutationRecord represents an individual DOM mutation, the object passed to MutationObserver's callback
* NodeFilter interface represents an object used to filter the nodes in a NodeIterator (TreeWalker)
* NodeIterator interface represents an iterator over the members of a list of nodes in a subtree of the DOM.
```js
var nodeIterator = document.createNodeIterator(root, whatToShow, filter);
```
* DocumentFragment interface represents a minimal document object that has no parent. (light version of Document)
* NodeList objects: collection of nodes returned by Node.childNodes and the document.querySelectorAll
* DOMImplementation interface represent an object providing methods which are not dependent on any particular document.
* PromiseResolver interface represents an object controlling the state and the result value from a promise.
* DOMString: UTF-16 string
* The range interface represents a fragment of a document that can contain nodes and part of text nodes.
* Element: object of a Document.
* The Worker interface of the Web Workers API, represents a background task that can be easily created and can send messages back to its creator.
```js
// service worker example
var myWorker = new Worker("worker.js");
var first = document.querySelector('#number1');

first.onchange = function() {
  myWorker.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
```
3/18
----------

CORS (Cross Origin Resource Sharing): allow a site to get resources from a third party site. Sites normally forbid this type of request.

* a source file can serve as a type of bridge to export from another module
```js
export { encrypt as en } from 'crypto';
```

###### Promise: a deferred and asynchronous computations.
(Hasn't completed yet, but is expected to complete) - Params: resolve, reject

It represents a proxy to for a value to be created in the future.
> states: pending, successful, rejected
Methods:
* .then(onFulfilled, onRejected): appends fulfillment and rejection handlers to the promise and returns a new promise resolving the return value of the called handler.
* .catch(onRejected): appends rejection handler callback to the promise and returns a new promise resolving the return value of the callback.

The method (Async composition) is a solution to callback hell (can also revert to functional programming hooks)

3/19
-----
```
 EventTarget  <-  Node  <-  Document 
```
* Document.cookie: get and set cookies associated with the current document.

```js
allCookies = document.cookie // read all cookies accessible from this location

document.cookie = newCookie; // writing a new cookie
```
allCookies: is a string containing a semi-colon separated list of all cookies.

newCookie is a string of form key=value.

* Document.readyState: describes the loading state of the document (3 states: loading, interactive, complete)
* Document.plugins: returns an HTML collection of <embed> elements in the current document.

3/20
-----
Chai Assertion styles:

1. Assert: exposed through assert interface (similar to one from Node.js api)
```js
import { assert } from 'chai'
const name = 'Micheal'
assert.typeOf(name, 'string', 'name is a string') // with optional message
```
[full Assert API](http://chaijs.com/api/assert/)

2. BDD (should || expect)
Both use a chainable language to construct assertions

```js
import { expect } from 'chai'
const name = 'Micheal'
expect(name).to.be.a('string');
```

should differs from expect as it extends each object with a `should` property to start your chain. (caution on browser compatibility)
```js
const should = require('chai').should();
// alternative with import: `import 'chai/should'`

const name = 'Micheal'

name.should.be.a('string')
```
> In brief, expect provides a function as a starting point for chaining language assertions. should extends Object.prototype to provide a single getter as a starting point for assertions.

[full BDD Api](http://chaijs.com/api/bdd/)

###### Mocha is the recommended testing framework for chai, but we also use any other framework.

for your package.json configurations:
```js
"scripts": {
  "test": "mocha --compilers js:babel-core/register --require ./test/test_helper.js --recursive", // test recursively (starting from test/test_helper.js)
  "test:watch": "npm run test -- --watch" // to run all test when files change
},

```
3/21
----
- ImmutableJS's update can help us test nested data structures.
```js
function addMovie(currentState, movie) {
  return currentState.update('movies', movies => movies.push(movie));
}
```
With plain old javascript, `Object.freeze()` can help us in that concern.

- Api endpoints (endpoint: another term for routes)

3/22
-----

updateIn() `ImmutableJS`: returns a new map having applied to updater to the entry found at the keyPath.

Stateless components: Pure components: Dumb components:
1. receives all its data as props, like a function receives all its data arguments. (no side effects)
2. has no internal state: what it renders is fully driven by its input props. (easy to test)

reducer composition: help us in making operations work on the smallest piece or (subtree) of the state possible. (modularization) + more often than not reduce the complexity of our test cases.

> Our main reducer function in that case only hands parts of the state to lower-level reducer functions.

In redux there is only one variable, the store which varies overtime. The rest are constants and immutable values.

###### Security bits:

Securing the bridge (ie when you're implementing socket.io connections "to multiple clients"):

You probably don't want client side Javascript being able to send just any message to any handlers on the server side to all other browsers, and also the ability for any client to listen in on any event bus addresses.

Solution: by default refuse to let through any messages. (Then you can allow some that satisfy different specs). You can do that with `BridgeOptions`:

* setAddress: this represents the exact address the message is being sent to. (ie exact addresses)
* setAddressRegex: a regex that will be matched with against the address.
* setMatch: to allow messages based on their structure. (currently works with JSON messages)

CSRF: Cross Site Request Forgery: a technique by which an unauthorized site can gain your user's private data.

> Prevention: you can use Vert.x-Web's `CSRHandler`

On each get request under this handler a cookie is added to the response with a unique token. Clients are then expected to return this token back in a header.
> Since cookies are sent it is required that the cookie handler is also present on the router.

[vertx.io](http://vertx.io/docs/vertx-web/java/#_securing_the_bridge)

3/23
--------
To get some performance boost, you can use pureRenderMixin when it comes to pure components.
React in will not bother performing deep checks. It uses shouldComponentUpdate under the hood.

```js
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}

// use rather mixins: [pureRenderMixin] in es5
```
