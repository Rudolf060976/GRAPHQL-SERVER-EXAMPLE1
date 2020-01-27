const mongoose = require('mongoose');

const models = require('./models');

const { ObjectID } = require('mongodb');

const seedDatabase = async () => {

	const id1 = new ObjectID();

	const id2 = new ObjectID();

	const id3 = new ObjectID();

	const id4 = new ObjectID();

	const id5 = new ObjectID();

	const id6 = new ObjectID();

	await models.Author.create([
		{
			_id: id1,
			name: 'Rómulo Gallegos',
			createdAt: new Date().getTime() + 10000
		},
		{
			_id: id2,
			name: 'Rafael Urbina',
			createdAt: new Date().getTime() + 20000
		},
		{
			_id: id3,
			name: 'Roberto Durán',
			createdAt: new Date().getTime() + 30000
		},
		{
			_id: id4,
			name: 'Carlos Aldemar Otero',
			createdAt: new Date().getTime() + 40000
		},
		{
			_id: id5,
			name: 'Carlos Trujillo',
			createdAt: new Date().getTime() + 50000
		},
		{
			_id: id6,
			name: 'Raul Enrique Castro',
			createdAt: new Date().getTime() + 60000
		}
	]);


	await models.Book.create([
		{
			_id: new ObjectID(),
			title: 'Enciclopedia de la Cultura',
			author: id1,
			category: 'COLLECTION',
			volumes: 5,
			sold: 'WEEKLY',
			pricePerVolume: 200000,
			createdAt: new Date().getTime() + 1000
		},
		{
			_id: new ObjectID(),
			title: 'Historia de Venezuela 2da. Edición',
			author: id4,
			category: 'SCHOOL',
			target: 'SECONDARY',
			uniquePrice: 150000,
			createdAt: new Date().getTime() + 2000
		},
		{
			_id: new ObjectID(),
			title: 'Enciclopedia de las Ciencias',
			author: id3,
			category: 'COLLECTION',
			volumes: 8,
			sold: 'MONTHLY',
			pricePerVolume: 50000,
			createdAt: new Date().getTime() + 3000
		},
		{
			_id: new ObjectID(),
			title: 'Enciclopedia Arquitectónica Global',
			author: id5,
			category: 'COLLECTION',
			volumes: 4,
			sold: 'WEEKLY',
			pricePerVolume: 75000,
			createdAt: new Date().getTime() + 4000
		},
		{
			_id: new ObjectID(),
			title: 'Matemáticas 1er. Año',
			author: id3,
			category: 'SCHOOL',
			target: 'SECONDARY',
			uniquePrice: 25000,
			createdAt: new Date().getTime() + 5000
		},
		{
			_id: new ObjectID(),
			title: 'Física 9no. Grado',
			author: id2,
			category: 'SCHOOL',
			target: 'SECONDARY',
			uniquePrice: 35000,
			createdAt: new Date().getTime() + 6000
		},
		{
			_id: new ObjectID(),
			title: 'Enciclopedia del Sexo',
			author: id5,
			category: 'COLLECTION',
			volumes: 2,
			sold: 'MONTHLY',
			pricePerVolume: 120000,
			createdAt: new Date().getTime() + 7000
		},
		{
			_id: new ObjectID(),
			title: 'Química 9no. Grado',
			author: id3,
			category: 'SCHOOL',
			target: 'SECONDARY',
			uniquePrice: 45000,
			createdAt: new Date().getTime() + 8000
		}
	]);

};

module.exports = seedDatabase;