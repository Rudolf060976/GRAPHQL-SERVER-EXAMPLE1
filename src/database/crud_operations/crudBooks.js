const models = require('../models');
const { ObjectID } = require('mongodb');


const { ApolloError } = require('apollo-server-express');


const addNewBook = async (inputData) => {

	/* inputData {
		title,
		authorId,
		category,
		volumes,  **** ONLY FOR COLLECTION BOOKS
		sold,	  **** ONLY FOR COLLECTION BOOKS
		pricePerVolume,  **** ONLY FOR COLLECTION BOOKS
		target		**** ONLY FOR SHOOL BOOKS
		uniquePrice	**** ONLY FOR SHOOL BOOKS
	}

	*/

	let book = null;

	const { title, authorId, category } = inputData;
	
	if (!title || !authorId || !category) {

		throw new ApolloError('Bad Arguments','400');

	}

	try {
			
		

		switch (category) {
			case 'COLLECTION':
				
				const { volumes, sold, pricePerVolume } = inputData;

				book = await models.Book.create([
					{
						_id: new ObjectID(),
						category,
						title,
						author: authorId,
						volumes,
						sold,
						pricePerVolume 
					}
				]);

				break;
		
			case 'SCHOOL':

				const { target, uniquePrice } = inputData;

				book = await models.Book.create([
					{
						_id: new ObjectID(),
						category,
						title,
						author: authorId,
						target,
						uniquePrice 
					}
				]);


				break;

			default:
				break;
		}

		return book[0];		

	} catch (error) {
		
		throw new ApolloError('Could not create new Book!','500');

	}

};



module.exports = {
	addNewBook
};
