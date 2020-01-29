const helperFunctions = require('./helpers');
const { ApolloError } = require('apollo-server-express');


const resolvers = {
	Query: {
		getAllAuthors: (parent, { first, last, after, before }, { models }) => {

			return helperFunctions.generateConnection(first, last, after, before, models.Author);
			
			/*

			*** RETORNA EL SIGUIENTE OBJETO CON TODO SU CONTENIDO:

			{
				edges,
				nodes,
				pageInfo: {
					endCursor,
					hasNextPage,
					hasPreviousPage,
					startCursor
				},
				totalCount
			}

			*/

		}
	},
	Mutation: {
		addNewAuthor: async (parent, { name, born }, { crudOperations }) => {

			try {
				
				const author = crudOperations.author.addNewAuthor(name, born);

				return {
					code: '200',
					success: true,
					message: 'new Author added successfully!',
					author
				};

			} catch (error) {
				
				return {
					code: error.code,
					success: false,
					message: error.message,
					author: null
				};

			}	

		}
	},
	Author: {
		id: async (parent, args, { models }) => {
			
			if (typeof parent === 'object') {
				return parent._id;
			} else {

				return parent;  // SERÍA UN ID
			}

		},
		name: async (id, args, { models }) => {
		
			if (typeof parent === 'object') {
				return parent.name;
			} else {

				const auth = await models.Author.findById(id);

				return auth.name;
			}			

		}
	}
};

module.exports = resolvers;