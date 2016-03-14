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
