
const authorResolvers = require('./Author');

const bookResolvers = require('./Book');

const { GraphQLDateTime } = require('graphql-iso-date');


const customDateResolver = {
	Date: GraphQLDateTime
};


module.exports = [customDateResolver, authorResolvers, bookResolvers];