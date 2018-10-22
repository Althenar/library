'use strict';

const 
	Book = require('../').Book;

function getAll(){
	const search = Book.fetchAll({
		withRelated: [
			'shelf.bookcase', 
			'borrow'
		]
	});

	return search;
}

function getById(id){
	const search = Book.where({
		id: id
	}).fetch({
		withRelated: [
			'shelf.bookcase', 
			'history.user', 
			'borrow.user', 
			'queue.user'
		]
	});

	return search;
}

function getAllBorrowed(){
	const search = Book.where({
		borrowed: true
	}).fetchAll({
		withRelated: ['borrow.user']
	});

	return search;
}

function getAllByUserThatBorrowed(name){
	const search = Book.query((qb) => {
		qb.leftJoin(
			'borrow',
			'book.id',
			'borrow.id_book'
		).leftJoin(
			'user',
			'borrow.id_user',
			'user.id'
		).andWhere('user.name', 'like', `%${name}%`)
			.select(
				'book.*',
				'borrow.borrowDate', 
				'user.name as borrowedBy'
			);
	}).fetchAll();

	return search;
}

function getAllInQueue(){
	const search = Book.where({
		in_queue: true
	}).fetchAll({
		withRelated: ['queue.user']
	});

	return search;
}

function getByISBN(isbn){
	const search = Book.where({
		isbn: isbn
	}).fetch({
		withRelated: [
			'shelf.bookcase', 
			'history.user', 
			'borrow.user', 
			'queue.user'
		]
	});

	return search;
}

function getAllByAuthor(authorName){
	const search = Book.where('author', 'like', `%${authorName}%`)
		.fetchAll({
			withRelated: ['shelf.bookcase']
		});

	return search;
}

function getAllByTitle(bookTitle){
	const search = Book.where('title', 'like', `%${bookTitle}%`)
		.fetchAll({
			withRelated: ['shelf.bookcase']
		});

	return search;
}

function getAllFromShelf(shelfId){
	const search = Book.where({
		id_shelf: shelfId
	}).fetchAll();

	return search;
}

function getAllFromBookcase(bookcaseId){
	const search = Book.query((qb) => {
		qb.leftJoin(
			'shelf',
			'book.id_shelf',
			'shelf.id'
		).leftJoin(
			'bookcase',
			'shelf.id_bookcase',
			'bookcase.id'
		).andWhere('shelf.id_bookcase', bookcaseId)
			.select(
				'book.*',
				'shelf.row as shelf_row', 
				'shelf.col as shelf_col', 
				'bookcase.name as bookcase_name'
			);
	}).fetchAll();

	return search;
}

function create(book){
	const save = new Book(book).save();

	return save;
}

function update(book){
	const update = new Book({id: book.id})
		.save(book,{
			patch: true
		});

	return update;
}

function remove(bookId){
	const remove = Book.where({
		id: bookId
	}).destroy();

	return remove;
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getAllBorrowed,
		getAllByUserThatBorrowed,
		getAllInQueue,
		getByISBN,
		getAllByAuthor,
		getAllByTitle,
		getAllFromShelf,
		getAllFromBookcase
	},
	update,
	remove
};