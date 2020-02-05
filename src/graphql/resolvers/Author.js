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

		},
		getAuthorImages: async (parent, { authorId }, { MongoGridFSStore, mongoose, crudOperations, models, ObjectID }) => {

			const author = await models.Author.findById(authorId);

			const images = author.images;
						
			return images;

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

		},
		uploadAuthorImage: async (parent, { authorId, file }, { mongoose, ObjectID, MongoGridFSStore, crudOperations }) => {

			const { filename, mimetype, createReadStream } = await file;
			
			

			// 1. CREAR UN ID PARA LA IMAGEN

			const id = new ObjectID();  // ESTE ES EL ID PARA EL ARCHIVO DE IMAGEN QUE SE GUARDARÁ EN GRIDFS

			const gfs = new MongoGridFSStore(mongoose.connection.db, { bucketName: 'images' });
						
			// 2. ALMACENAR LA IMAGEN EN GRIDFS

			const result = await gfs.write(createReadStream(), { id, filename: filename + new Date().toISOString() });

			// 3. BUSCAR EL AUTHOR Y AGREGAR EL ID DE LA IMAGEN EN EL FIELD images DEL AUTHOR.


				crudOperations.author.addAuthorImageToImagesArray(authorId, id);
			
			
			const output = {
				filename,
				mimetype				
			};

			
			return output;

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