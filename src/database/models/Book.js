const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const bookSchema = new mongoose.Schema({

	_id: types.ObjectId,
	title: {
		type: String,
		required: true
	},
	author: {
		type: types.ObjectId,
		ref: 'Author'
	},
	category: {
		type: String,
		enum: ['COLLECTION', 'SCHOOL'],
		required: true
	},
	volumes: {
		type: Number,
		default: 1,
		required: true
	},
	sold: {
		type: String,
		enum: ['DAILY', 'WEEKLY', 'MONTHLY'],
		default: 'DAILY',
		required: true
	},
	pricePerVolume: {
		type: types.Decimal128,
		default: 0,
		required: true
	},
	target: {
		type: String,
		enum: ['PRIMARY', 'SECONDARY'],
		default: 'PRIMARY',
		required: true
	},
	uniquePrice: {
		type: types.Decimal128,
		default: 0,
		required: true
	},
	createdAt: {
		type: types.Date,
		default: new Date()
	}
});


const Book = mongoose.model('Book', bookSchema);

module.exports= Book;