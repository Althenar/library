'use strict';

const 
	Borrow = require('../').Borrow;

function getAll(){
	const search = Borrow.fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});

	return search;
}

function getById(id){
	const search = Borrow.where({
		id: id
	}).fetch({
		withRelated: [
			'user', 
			'book'
		]
	});

	return search;
}

function getByBookId(id){
	const search = Borrow.where({
		id_book: id
	}).fetch({
		withRelated: ['user']
	});
	
	return search;
}

function getAllByBookTitle(bookTitle){
	const search = Borrow.query((qb) => {
		qb.leftJoin(
			'book',
			'borrow.id_book',
			'book.id'
		).andWhere('title', 'like', `%${bookTitle}%`)
			.select(
				'borrow.*',
				'book.title as book_title',
				'book.author as book_author',
				'book.isbn as book_isbn'
			);
	}).fetchAll({
		withRelated: ['user']
	});

	return search;
}

function getAllByUserId(id){
	const search = Borrow.where({
		id_user: id
	}).fetchAll({
		withRelated: ['book']
	});
	
	return search;
}

function getAllByUserName(userName){
	const search = Borrow.query((qb) => {
		qb.leftJoin(
			'user',
			'borrow.id_user',
			'user.id'
		).andWhere('name', 'like', `%${userName}%`)
			.select(
				'borrow.*',
				'user.name as borrowedBy'
			);
	}).fetchAll({
		withRelated: ['book']
	});

	return search;
}

function getAllFromDateTillDate(fromDate, tillDate){
	const search = Borrow.query((qb) => {
		qb.where('borrowDate', '>=', fromDate)
			.andWhere('borrowDate', '<=', tillDate);
	}).fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});
	
	return search;
}

function getAllFromDate(fromDate){
	const search = Borrow.where('borrowDate', '>=', fromDate)
		.fetchAll({
			withRelated: [
				'user', 
				'book'
			]
		});
	
	return search;
}

function create(borrow){
	const save = new Borrow(borrow).save();
	
	return save;
}

function returnBook(id_book){
	const remove = Borrow.where({
		id_book: id_book
	}).destroy();

	return remove;
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getByBookId,
		getAllByBookTitle,
		getAllByUserId,
		getAllByUserName,
		getAllFromDateTillDate,
		getAllFromDate
	},
	returnBook
};