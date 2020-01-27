const helperFunctions = require('./helpers');


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