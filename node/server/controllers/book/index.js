'use strict';

const BookService = require('../../services/book');
const externalData = require('../externalData');
const response = require('../');

function getAll(req, res, next){
	const search = BookService.read.getAll();
	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = BookService.read.getById(req.params.id);
	return response.json(search, res, next);
}

function getAllBorrowed(req, res, next) {
	const search = BookService.read.getAllBorrowed();
	return response.json(search, res, next);

}

function getByISBN(req, res, next){
	const search = BookService.read.getByISBN(req.params.isbn);
	return response.json(search, res, next);
}

function getAllByAuthor(req, res, next){
	const search = BookService.read.getAllByAuthor(req.params.name);
	return response.json(search, res, next);
}

function getAllByName(req, res, next){
	const search = BookService.read.getAllByName(req.params.name);
	return response.json(search, res, next);
}

function getAllFromShelf(req, res, next){
	const search = BookService.read.getAllFromShelf(req.params.id);
	return response.json(search, res, next);
}

async function create(req, res, next){
	let book = {
		title: req.body.title,
		isbn: req.body.isbn,
		author: req.body.author,
		id_shelf: req.body.id_shelf
	};

	if(book.isbn && (!book.title || !book.author))
		book = await externalData(book);

	const save = BookService.create(book);
	return response.json(save, res, next);
	
}

function update(req, res, next){
	const book = {
		id: req.params.id,
		title: req.body.title,
		isbn: req.body.isbn,
		author: req.body.author,
		id_shelf: req.body.id_shelf
	};

	const update = BookService.update(book);
	return response.json(update, res, next);
}

function remove(req, res, next){
	const remove = BookService.remove(req.params.id);
	return response.json(remove, res, next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getAllBorrowed,
		getByISBN,
		getAllByAuthor,
		getAllByName,
		getAllFromShelf
	},
	update,
	remove
};