
const helperFunctions = require('./helpers');

const resolvers = {
	Book: {	
		__resolveType: (obj) => {
			console.log('(2) DOS');
			switch (obj.category) {
				case 'COLLECTION':
					
					return 'CollectionBook';
				

				case 'SCHOOL':

					return 'SchoolBook';
			
				default:
					
					return null;
			}
		}
	},	
	Query: {
		getAllBooks: (parent, { first, last, after, before }, { models }) => {
			
			return helperFunctions.generateConnection(first, last, after, before, models.Book);

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
	CollectionBook: {
		numberOfVolumes: book => {
			console.log('(3) TRES');
			return book.volumes;
		},
		pricePerVolume: book => {
			console.log('(4) CUATRO');
			return Number.parseFloat(book.pricePerVolume);
		}
	},
	SchoolBook: {
		uniquePrice: book => {
			console.log('(5) CINCO');
			return Number.parseFloat(book.uniquePrice);
		}
	}	
};

module.exports = resolvers;