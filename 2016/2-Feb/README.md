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















