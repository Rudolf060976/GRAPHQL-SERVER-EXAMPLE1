const { gql } = require('apollo-server-express');


const schema = gql`
	scalar Date
	
	
	type Query {
		getAllAuthors(first: Int, last: Int, after: String, before: String): AuthorConnection!
		getAllBooks(first: Int, last: Int, after: String, before: String): BookConnection!
		getAllCollectionBooks: [CollectionBook!]
		getAllSchoolBooks: [SchoolBook!]
		getBooksById(id: ID!): [Book!]
		getBookById(id: ID!): Book!
		getBooksByAuthor(authorId: ID!): [Book!] 
		getAuthorImages(authorId: ID!): [ID]
	}

	type Mutation {
		addNewAuthor(name: String!, born: String!): AddNewAuthorMutationResponse!
		addNewBook(input: newBookInput): AddNewBookMutationResponse!
		uploadAuthorImage(authorId: ID!, file: Upload!): File
	}

	type File {
		filename: String
		mimetype: String		
	}

	"******* FOR MUTATIONS ***********"

	interface MutationResponse {
		code: String!
		success: Boolean!
		message: String!
	}

	type AddNewAuthorMutationResponse implements MutationResponse {
		code: String!
		success: Boolean!
		message: String!
		author: Author
	}

	type AddNewBookMutationResponse implements MutationResponse {
		code: String!
		success: Boolean!
		message: String!
		book: Book
	}

	input newBookInput {
		title: String!
		authorId: ID!
		category: enumCategory!
		volumes: Int		
		sold: EnumSellingPeriod
		pricePerVolume: Float
		target: EnumTarget
		uniquePrice: Float
	}	


	"********** AUTHOR CONNECTIONS ********"

	type AuthorConnection {
		edges: [AuthorEdge]
		nodes: [Author]
		pageInfo: PageInfo!
		totalCount: Int!
	}

	type AuthorEdge {
		node: Author!
		cursor: String!
	}

	type PageInfo {
		endCursor: String
		hasNextPage: Boolean!
		hasPreviousPage: Boolean!
		startCursor: String
	}


	"********** BOOK CONNECTIONS ********"

	type BookConnection {
		edges: [BookEdge]
		nodes: [Book]
		pageInfo: PageInfo!
		totalCount: Int!
	}

	type BookEdge {
		node: Book!,
		cursor: String!
	}
	
	enum enumCategory {
		COLLECTION
		SCHOOL
	}
	
	interface Book {
		id: ID!
		title: String!
		author: Author!
		category: enumCategory!
	}

	type Author {
		id: ID!
		name: String!
		born: Date!
		books: [Book]
		images: [ID!]		
	}

	type CollectionBook implements Book {
		id: ID!
		title: String!
		author: Author!
		category: enumCategory!
		numberOfVolumes: Int!
		sold: EnumSellingPeriod!		
		pricePerVolume: Float!
	}

	enum EnumSellingPeriod {
		DAILY
		WEEKLY
		MONTHLY
	}

	type SchoolBook implements Book {
		id: ID!
		title: String!
		author: Author!
		category: enumCategory!
		target: EnumTarget!
		uniquePrice: Float!
	}

	enum EnumTarget {
		PRIMARY
		SECONDARY		
	}

`;

module.exports = schema;
