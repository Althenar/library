'use strict';

const BookRepository = require('../../repository/book');
const response = require('../');

function getAll(res,next){
	const search = BookRepository.read.getAll();
	return response.json(search,res,next);
}

function getById(id,res,next) {
	const search = BookRepository.read.getById(id);
	return response.json(search,res,next);
}

function getByISBN(isbn,res,next) {
	const search = BookRepository.read.getByISBN(isbn);
	return response.json(search,res,next);
}

function getAllByAuthor(author,res,next) {
	const search = BookRepository.read.getAllByAuthor(author);
	return response.json(search,res,next);
}

function getAllByName(name,res,next){
	const search = BookRepository.read.getAllByName(name);
	return response.json(search,res,next);
}

function getAllFromShelf(shelf,res,next){
	const search = BookRepository.read.getAllFromShelf(shelf);
	return response.json(search,res,next);
}

function create(book,res,next){
	const save = BookRepository.create(book);
	return response.json(save,res,next);
}

function update(book,res,next){
	const update = BookRepository.update(book);
	return response.json(update,res,next);
}

function remove(book,res,next){
	const remove = BookRepository.remove(book);
	return response.json(remove,res,next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getByISBN,
		getAllByAuthor,
		getAllByName,
		getAllFromShelf
	},
	update,
	remove
};