A journey to Mastery...
----
## 02/09
Intro to GrapQL: (A data query language and runtime)

Main Features:

A graphql query is a string interpreted by a server that returns data in the specified format.

Mutations are ways to change the dataset in GraphQL.
* GraphQL assumes a mutation has side effects and changes the dataset behind the Schema.
* GraphQL processes multiple fields in a query with low response time but mutations are executed one by one.
> we can invoke a mutation with mutation { ... }
( Server implementation helps here in detecting errors )

- Fragments are the primary unit of composition in GraphQL.
(allow use to reuse common repeated selection of fields, reduce duplicated text and use spread operators)

```
fragment authorInfo on Author {
  _id,
  name,
  twitterHandle
}
can be replaced with: ...authorInfo
```
* We can nest fragments as well and use them with mutations. (like variables)
* We need to write queries with the complete syntax to use query variables.
```
query getFewPosts($postCount: Int!) {
  recentPosts(count: $postCount) {
    title
  }
}
```
Here we defined the variable porstCount, made it an integer type and required.
Now we could query with the following on the server side:
```
{
	"postCount": 4
}
```
In Graph QL, all fields we define are optional. If we need to make a field required,
we need to mention it explicitely. for example: _id: { type: new GraphQLNonNull(GraphQLString) }

2/10
----

#### Relay: a javascript framework for building data-driven react applications.

* Declare you data requirements using GraphQL and Relay takes care of how and when 
to fetch the data.

* With a heavy GraphQl influence, Relay only fetches queries into efficient network requests
and give you the ability to mutate data both on the client and server side.

* The primary way to declare data requirements is with `Relay.Container` which is a higher order
React component that lets React components encode their data requirements. Those requirements dictate 
the data needed and Relay just guarantees that the data is available before rendering.

* The root of a query is defined by a Route. 
* Relay separates mutations from queries, thus giving a lot of flexibility to the programmer to 
configure the default network via injection.


#### MongoDB aggregation Framework: (best thought of as a pipeline).

```
  	   <--  stages ----->
Collection -> ... -> ... -> Output

```
The stages (data processing unit) perform different operations on the data. You can literally think of it as an assembly line where each stage takes as an input what another stage has outputted before.

The data in this case are streams of documents. 
* Inside the stages we have tunable components that we can control to get to our desired output.

In another words, stages: general process & parameters: for precision.
(we may repeat the same stage in multiple steps in the process before the final output )

Familiar Operations (stages):
- match (Find)
- project
- sort
- skip
- limit

In most cases we would want to use the query method .aggregate() to aggregate the pipeline passed to it.

> A pipeline in this case is an array of documents (stages)

```
db.{{collection}}.aggregate([
	{ $match: { founded_year: 2014 }},
	{ $project: {
		_id: 0,
		name: 1,
	}}
])
```
We have two pipelines in the above example.

![Aggegation pipeling example](http://res.cloudinary.com/masteryoperation/image/upload/v1455165997/aggregationPipeline_cbvi4o.jpg)

2/11
----
Accumulators involve calculating values in multiple documents.

Unwind:
When working with array fields it is sometimes necessary to add one or more unwind stages.
Unwind allows us to take elements that have array fields and turn them into input documents
such that there is one output document for each element in the array.

Array expressions: ** the double $$ represents a variable defined whithin the expression we are working with.

02/12
---

Queues: FIFO: first in - first out
Stacks: LIFO: last in - first out
******
Fisher-Yates ES6
```js
"use strict";
// simple fisher yates implementation
const shuffle = (deck) => {
  let randomizedDeck = [];
  let array = deck;
  while ( array.length !== 0) {
    let rIndex = Math.floor(array.length * Math.random());
    randomizedDeck.push(array[rIndex]);
    array.splice(rIndex, 1)
  }
  return randomizedDeck;
};

const deck = [1,2,3,4,5,6,7];
// Testing
console.log(shuffle(deck));
```
2/13
----
Binding data, process:
1. Select the elements first
2. Use data to bing the data on the elements
3. Change the attribute or style of the element by attr or style
4. callback function
exple:
```
d3.selectAll("div").data([25,30,35,40,45])
	.style("width", function(i) {
		return i;
	})
```

Adding some animation vars: transition, duration
```
d3.selectAll("div")
	.data([25,30,35,40,45])
	.transition()
	.duration(3 * 1000)
	.style("width", function (i) { return i + "px"; })
```
For .entry() and .exit() methods help us when it comes to more complex transitions.


02/14
----
Cross-origin resource sharing (CORS - W3C spec):

Enables truly open across domain boundaries. (server / client side)
Helpful when you serve public content for universal Javascript/browser access.

> JQuery's $.ajax() method can be used to make both regular xhr and CORS requests.

![cors](http://res.cloudinary.com/masteryoperation/image/upload/v1455510562/cbp_fxiijw.png)

---
02/15
----
bit of git:

git checkout *branch*
* to move to a specific branch or master

git pull origin master
* git pull combines `git fetch` and `git merge`
with fetch: commits are stored as remote branch allowing you to review the changes before merging.

* git checkout -b *name of branch* 
will create a new branch from the master for you to mess with seperately


* git add -u 
will remove the deleted files from the version control

* git push origin *name of branch*
to push the branch to the remote repo

Edge case: if you are out of sync with the brach just pull:
* git pull origin *branch*

Tracking remote branches: git branch -r

To be 100% sync with deleted remote branches: git fetch -p

To check to see what branches are merged and not merged into master: git branch --merged

To see the branches that are not merged yet: git branch --no-merged

The --no-ff flag prevents git merge from executing a `fast-forward`

To delete a side branch: git branch -D *branch*

2/16
----

Optimizing the Critical Rendering Path (CRP): prioritizing the display of content that relates to the current user action.

> helps when it comes to the user's perception in how fast your website is.

Before the browser can render the page it needs to construct the DOM and the CSSOM trees.
Thus we need to deliver the HTML and CSS as quickly as possible. 

Bytes -> characters -> tokens -> nodes -> object model

* The DOM and CSSDOM are independent data structures.

![ chrome rendering ](http://res.cloudinary.com/masteryoperation/image/upload/v1455646739/browser_rendering_jbeqd7.jpg)
credit to developers.google.com

> same process with  CSSOM with the tweak that the css rules "cascade down" and that the styles are applied recursively.

The CSSDOM and DOM trees are combined into a render tree that dictates how the page displays.

* `visibility: hidden`  !== `display: none`
The first makes the element invisible but still occupies space
The second removes the element entirely from the render tree.

After the render tree is set -> the layout stage kicks in.

The output of the layout is a "box model": All relative measures are converted to absolute pixels.
Then we get to the final stage called "painting" or "rasterizing"

If the DOM or CSSDOM is changed, the process is repeated to figure out which pixels need to be re-rendered.

Optimization in the critical rendering path is the minimization the total time spent in the 5 steps:
1. Process HTML markup -> DOM
2. Process CSS markup -> CSSOM
3. DOM + CSSOM -> Render Tree
4. Run Layout on the render tree to compute the geometry of each node
5. Paint individual nodes to the screen.

> achieve higher refresh rate for interactive content.

###### Render blocking CSS:

Both HTML and CSS are render blocking resources.
* Keep it lean to deliver it as quickly as possible
* Use media types and queries to unblock CSS rendering.

> Regardless of blocking or non-blocking behavior, all css resources are downloaded by the browser.

Exple of media query: `<link rel="stylesheet" href="print.css" media="print">`

> Implementation of media queries have big impact on the critical rendering path.

JS also blocks DOM construction.
Solution: make your JS async.
1. DOM construction is paused at a script tag until it has executed
2. JS can modify both the DOM and CSSOM
3. JS execution is delayed until the CSSOM is ready

> We mark our JS script tag async like: `<script src="app.js" async></script>`
Adding the async tag tells the browser not to block the DOM construction.

On dev tools -> network -> navigation timing we can measure our CRP.

* domLoading: the browser starts parsing the first bytes of HTML
* domInteractive: when finished parsing HTML and DOM construction ready.
* domContentLoaded: DOM is ready and no stylesheets blocking JS execution.
* domComplete: all processing is done.
* loadEvent: an onLoad event is fired which can trigger additional application logic.

Rules of thumbs: Getting the browser to paint as soon as possible

* in-lined JS is also parser blocking.

Goal: Minimize these
* crytical Resource: resource that may block initial rendering of the page.
* critical Path length: number of roundtrips || the total time required to fetch all critical resources.
* critical Bytes: total amount of bytes required to get the first rendering of the page.
* 

2/17
----

MongoDB types of replica sets nodes:
* Regular
* Arbiter (just there for voting purposes)
* Delayed / Regular (Desaster recovery node)
* Hidden (never the primary)

If both writes and reads are to the primary => You get strong consistency. (You won't read stale data).
If not you might get eventual consistency.

02/18
----

A heinsenbug: a software bug that seems to disappear or alter its behavior when one attempts to study it. (name inspired by the Heinsenberg observer effect)

Simple software principles:
SOLID "Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion"

* S : Single Responsibility Principle (SRP): a module or function should have responsibility over a single part of the software functionality.
* O : Open/Closed principle (OCP): modules, functions... should be open for extension but closed for modification.
* L : Liskov substitution principle (LSP): If S is a subtype of T on a computer software, T may be replaced with S without altering (correctness, task performed)
* I : Interface segregation principle (ISP): (no client should be forced to depend on methods it does not use)
* D : Dependency inversion principle (DIP): High-level modules should not depend on low-level modules. Abstraction should not depend on details. (All should depend on abstractions.)
* 

2/19
----
Layering: For each software component, count the number of other components it relies on. (The metric of how complex the component is)

ORM: Object Relational Mapping: a programming technique for converting data between incompatible type systems in Object-oriented programming languages.
UML: Unified Modeling Language: a modeling language to provide a standard to visualize the design of system.

###### List data structure:
an abstract data type that represents an ordered sequence of values, where the same value may occur more than once.
> implemented with either linked list or array (dynamic, variable length)

Linked list: a linear collection of data elements (connected through pointers): [integer, link to the next node]

Doubly linked list: each node contains, besides the next node link, a second link pointing to the previous node in the sequence.

2/20
----

popular topics in CS: 

#### Sorting:
* Merge Sort
* Quick Sort
* Bucket Sort
* Heap Sort
* Counting Sort

#### Search:
* Binary search: in linear data structures: O(log2N)
* Depth/Breadth First Search (DFS / BFS)
> used in search engines, artificial intelligence, finding shortest paths

#### Hashing:

Hash lookup is a technique used to find appropriate data by key or ID.
The data structure is called Hash-Map, Hash-Table or dictionary that maps keys into values.

> Used in routers to store IP address

#### Dynamic Programming:
A method for solving complex problem by breaking it down into simpler subproblems. Then solving the subproblems, remembering their results and using them we make our way to solve the complex problem quickly. (In another words remembering stuff to save time later)

###### 5 easy steps to DP:
1. define subproblems
2. guess (part of solution)
3. relate subproblem solutions
4. Recurse Memoize (acyclic topo order) or build DP table bottom up
5. Solve the original problem


#### Exponentiation by squaring (Binary exponentiation):
a general method for fast computation of large integer powers of a number in O(log2N) 
* exple: calculating 2^32 in 5 steps
> used in RSA encryption, calculation of large numbers


#### String Matching and parsing

KMP Algorithm (Knuth-Morris-Pratt), string matching matching a short patter in a long string.
> exple: Ctrl+F to match pattern in whole document

Regular expression (string parsing)
> used heavily on url routing


#### Primality Testing algorithms
exple: Sieve of Eratosthenes (deterministic): for any number n, incrementally testing up to sqrt(n) (deterministic)

#### Debugging: 
1. Keep record of what you tried
2. Reconsidder assumptions
3. Debug code, not comments
4. Get help or try to explain how the code works
5. Take a break for fresh eyes

02/26
----

flow => a typechecking for Javascript. Helps you mitigate subtle bugs through static analysis and type annotations.

 /* @flow */ is required on top of any snippets of code we want to type check.
 
 Flow is able to infer the types within the snippet, so we don't have to always annotate the types.


 * Flow requires that we annotate for functions that are imported from a module.

 * Flow protects us from nullable types (null) (will fail at runtime)

 * Flow also gives us the option to specify the type of primitive within the array. (ex: Array: <number>)


Using the flow server:

* using the `flow` command with a running server, eliminates the overhead of having to recheck all files.
* `flow stop` will stop the flow server.
* `flow check --all` allows to check all snippets whether or not they have /* @flow */

In weak mode, flow will make less inferences => /* @flow weak */

* any is the annotation for ultimate dynamic typing


Flow's limitations:
* Object.assign, solution:
```
if(!Object.assign) {
	Object.assign = require('object-assign');
}
```
* doesn't allow class instances to be extended at runtime.
* module files
