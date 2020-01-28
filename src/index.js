require('custom-env').env(true, __dirname + './../');

const express = require('express');

const { ObjectID } = require('mongodb');

const { ApolloServer, gql } = require('apollo-server-express');

const cors = require('cors');

const schema = require('./graphql/schema');

const resolvers = require('./graphql/resolvers');

const { connectDB, mongoose } = require('./database/mongoose');

const models = require('./database/models');

const seedDatabase = require('./database/seedDatabase');

const crudOperations = require('./database/crud_operations');

const app = express();

app.use(cors());


connectDB().then( async () => {

	console.log("CONNECTED TO MONGODB!!");	

	const eraseDatabase = true;

	if (eraseDatabase) {

		await Promise.all([
			models.Author.deleteMany({}),
			models.Book.deleteMany({})
		]);
	}

	seedDatabase();


	const server = new ApolloServer({
		typeDefs: schema,
		resolvers,
		context: ({ req }) => {

			return {
				models,
				ObjectID,
				crudOperations
			}

		}
	});
	
	server.applyMiddleware({ app, path: '/graphql'});
	
	
	app.listen({ port: process.env.PORT }, () => {
	
			console.log(`GraphQL Server APP Listening on Port ${process.env.PORT}`);
		
	});


});


