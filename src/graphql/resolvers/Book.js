
const helperFunctions = require('./helpers');

const resolvers = {
	Book: {	
		__resolveType: (obj) => {
			
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
			
			return book.volumes;
		},
		pricePerVolume: book => {
			
			return Number.parseFloat(book.pricePerVolume).toFixed(2);
		}
	},
	SchoolBook: {
		uniquePrice: book => {
			
			return Number.parseFloat(book.uniquePrice).toFixed(2);
		}
	},
	Mutation: {
		addNewBook: (parent, { input }, { crudOperations }) => {

			/*

			LA CONSULTA EN EL LADO DEL CLIENTE SERÁ ASÍ:

			mutation NewBook($inputData: newBookInput!) {
  				addNewBook(input: $inputData) {
   					code
    				success
    				message
    				book {
      					title
      					category 
      					... on CollectionBook {
        				numberOfVolumes
				        pricePerVolume
        				sold
      					}
    				}
  				}
			}

			Y EN LAS VARIABLES SERÁ ASÍ:

			{
 				"inputData": {
    				"title": "Los Miserables",
	    			"authorId": "5e3042bc0c50bb22f456a8f1",
    				"category": "COLLECTION",
    				"volumes": 15,
    				"sold": "WEEKLY",
    				"pricePerVolume": 500
  				}
			}


			*/

			try {
				
				const book = crudOperations.book.addNewBook(input);
				
				return {
					code: '200',
					success: true,
					message: 'new Book added successfully!',
					book
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
	}	
};

module.exports = resolvers;