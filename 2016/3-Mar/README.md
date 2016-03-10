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
