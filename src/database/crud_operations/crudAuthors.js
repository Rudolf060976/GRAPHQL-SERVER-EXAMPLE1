const models = require('../models');
const { ObjectID } = require('mongodb');


const { ApolloError } = require('apollo-server-express');


const addNewAuthor = async (name) => {

	try {
		
		const author = await models.Author.create([
			{
				_id: new ObjectID(),
				name 
			}
		])

		return author[0];		

	} catch (error) {
		
		throw new ApolloError('Could not create new Author!','500');

	}

};



module.exports = {
	addNewAuthor
};
