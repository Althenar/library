'use strict';

const Book = require('../').Book;

function getAll(){
	const search = Book.fetchAll({withRelated: ['shelf.bookcase']});
	return search;
}

function getById(id) {
	const search = Book.where({id: id}).fetch({withRelated: ['shelf.bookcase']});
	return search;
}

function getByISBN(isbn) {
	const search = Book.where({isbn: isbn}).fetch({withRelated: ['shelf.bookcase']});
	return search;
}

function getAllByAuthor(author) {
	const search = Book.where('author', 'like', `%${author}%`).fetchAll({withRelated: ['shelf.bookcase']});
	return search;
}

function getAllByName(name){
	const search = Book.where('title', 'like', `%${name}%`).fetchAll({withRelated:['shelf.bookcase']});
	return search;
}

function getAllFromShelf(shelf){
	const search = Book.where({id_shelf: shelf}).fetchAll();
	return search;
}

function create(book){
	const save = new Book(book).save();
	return save;
}

function update(book){
	const update = new Book({id: book.id}).save(book,{patch: true});
	return update;
}

function remove(book){
	const remove = Book.where({id: book}).destroy();
	return remove;
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