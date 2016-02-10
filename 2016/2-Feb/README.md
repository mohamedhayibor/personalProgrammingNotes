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


















