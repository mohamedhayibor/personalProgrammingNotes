'use strict'
// boilerplate
const express = require('express'),
	  graphql = require('graphql'),
	  graphqlHTTP = require('express-graphql');

// importing our raw data
const data = require('./data.json')

// Define our user with two fields id and name
const userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: graphql.GraphQLString },
		name: { type: graphql.GraphQLString }
	}
})

// Define our schema, with one top level field, name `user`, that 
// takes an `id` argument and returns the USer with that ID.
const schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: "Query",
		fields: {
			user: {
				type: userType,
				args: {
					id: {type: graphql.GraphQLString }
				},
				resolve: function (root, args) {
					return data[args.id];
				}
			}
		}
	})
});

// make the express server go live
console.log('serving at 3000');

express()
	.use('/graphql', graphqlHTTP({ schema: schema, pretty: true }) )
	.listen(3000)
