
const { ApolloError } = require('apollo-server-express');

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');


const fromCursorStringToDate = string => {

	return new Date(Number.parseInt(string));

};


const generateConnection = async (first, last, after, before, model) => {

			let documents = null;

			let documentsBefore = null;
			let documentsAfter = null;
			let documentsBeforeAndAfter = null;
			let allDocuments = null;

			let nodes = null;
			let edges = null;
			let invertedNodes = null;

			let cursorOptions = null;
			let totalCount = null;
			let hasNextPage = false;
			let hasPreviousPage = false;
			let endCursor = null;
			let startCursor = null;

			validateInput(first, last, after, before);


			if (first) { // HAY FIRST
				


				if (before && after) {

					cursorOptions = {
						createdAt: {
							$gt: fromCursorStringToDate(fromCursorHash(after)),
							$lt: fromCursorStringToDate(fromCursorHash(before))						
						}
					}

					documentsBeforeAndAfter = await model.find(cursorOptions).exec();
				
					totalCount = documentsBeforeAndAfter.length;


				} else if(after) {

					cursorOptions = {
						createdAt: { $gt: fromCursorStringToDate(fromCursorHash(after)) }
					}

					documentsAfter = await model.find(cursorOptions).exec();
				
					totalCount = documentsAfter.length;

				} else if(before) {

					cursorOptions = {
						createdAt: { $lt: fromCursorStringToDate(fromCursorHash(before)) }
					}

					documentsBefore = await model.find(cursorOptions).exec();
				
					totalCount = documentsBefore.length;

				} else {

					cursorOptions = {};

					hasPreviousPage = false;
		
					allDocuments = await model.find({}).exec();

					totalCount = allDocuments.length;

				}
			
				documents = await model.find(cursorOptions).sort({ createdAt: 1 }).limit(first + 1).exec();
								
				hasNextPage = documents.length > first;

				nodes = hasNextPage ? documents.slice(0, -1) : documents;

				edges = nodes.map(node => {

					return {
						node,
						cursor: toCursorHash(node.createdAt.getTime().toString())
					}

				});
				

				endCursor = toCursorHash(nodes[nodes.length - 1].createdAt.getTime().toString());

				startCursor = toCursorHash(nodes[0].createdAt.getTime().toString());

				documentsBefore = await model.find({ createdAt: { $lt: fromCursorStringToDate(fromCursorHash(startCursor))}}).limit(1).exec();

				hasPreviousPage = documentsBefore.length >= 1;







			} else if(last) {  // HAY LAST




				if (before && after) {

					cursorOptions = {
						createdAt: {
							$gt: fromCursorStringToDate(fromCursorHash(after)),
							$lt: fromCursorStringToDate(fromCursorHash(before))						
						}
					}

					documentsBeforeAndAfter = await model.find(cursorOptions).exec();
				
					totalCount = documentsBeforeAndAfter.length;

				} else if(before) {

					cursorOptions = {
						createdAt: { $lt: fromCursorStringToDate(fromCursorHash(before)) }
					}

					documentsBefore = await model.find(cursorOptions).exec();
				
					totalCount = documentsBefore.length;

				} else if(after) {

					cursorOptions = {
						createdAt: { $gt: fromCursorStringToDate(fromCursorHash(after)) }
					}

					documentsAfter = await model.find(cursorOptions).exec();
				
					totalCount = documentsAfter.length;

				} else {

					cursorOptions = {};

					hasNextPage = false;

					allDocuments = await model.find({}).exec();

					totalCount = allDocuments.length;

				}

			
				documents = await model.find(cursorOptions).sort({ createdAt: -1 }).limit(last + 1).exec();

				hasPreviousPage = documents.length > last;
			
				invertedNodes = [];

				documents.map(item => {

					invertedNodes.unshift(item);

				});

				nodes = hasPreviousPage ? invertedNodes.slice(1) : invertedNodes;
				
				edges = nodes.map(node => {

					return {
						node,
						cursor: toCursorHash(node.createdAt.getTime().toString())
					}

				});
			

				endCursor = toCursorHash(nodes[nodes.length - 1].createdAt.getTime().toString());

				startCursor = toCursorHash(nodes[0].createdAt.getTime().toString());

				
				documentsAfter = await model.find({ createdAt: { $gt: fromCursorStringToDate(fromCursorHash(endCursor))}}).limit(1).exec();

				hasNextPage = documentsAfter.length >= 1;


			} else { // NO HAY NI FIRST NI LAST

				if (after && before) {

					cursorOptions = {
						createdAt: {
							$gt: fromCursorStringToDate(fromCursorHash(after)),
							$lt: fromCursorStringToDate(fromCursorHash(before))
						}
					}
				
				} else if(after) {

					cursorOptions = {
						createdAt: { $gt: fromCursorStringToDate(fromCursorHash(after)) }
					}
					
				} else if(before) {

					cursorOptions = {
						createdAt: { $lt: fromCursorStringToDate(fromCursorHash(before)) }
					}

				} else {

					cursorOptions = {};
				}

				documents = await model.find(cursorOptions).sort({ createdAt: 1 }).exec();

				nodes = documents;

				edges = nodes.map(node => {

					return {
						node,
						cursor: toCursorHash(node.createdAt.getTime().toString())
					}

				});

				totalCount = nodes.length;

				endCursor = toCursorHash(nodes[nodes.length - 1].createdAt.getTime().toString());

				startCursor = toCursorHash(nodes[0].createdAt.getTime().toString());
				
				documentsBefore = await model.find({ createdAt: { $lt: fromCursorStringToDate(fromCursorHash(startCursor))}}).limit(1).exec();

				hasPreviousPage = documentsBefore.length >= 1;

				documentsAfter = await model.find({ createdAt: { $gt: fromCursorStringToDate(fromCursorHash(endCursor))}}).limit(1).exec();

				hasNextPage = documentsAfter.length >= 1;

			}			
			
			const output = {
				edges,
				nodes,
				pageInfo: {
					endCursor,
					hasNextPage,
					hasPreviousPage,
					startCursor
				},
				totalCount
			};

			// console.log('output :', output);
			
			return output;
		
};



const validateInput = (first, last, after, before) => {

	if (first <= 0 || last <=0) {
		throw new ApolloError('first & last arguments must be positive values!','BAD_QUERY_ARGUMENTS');
	}

	if (first && last) {
		throw new ApolloError('first & last arguments must not be together!','BAD_QUERY_ARGUMENTS');
	}

};

module.exports = generateConnection;
