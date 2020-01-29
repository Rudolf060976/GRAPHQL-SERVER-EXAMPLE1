const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const authorSchema = new mongoose.Schema({
	_id: types.ObjectId,
	name: {
		type: String,
		required: true
	},
	createdAt: {
		type: types.Date,
		default: new Date()
	},
	born: {
		type: types.Date,
		default: new Date()
	}
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;

