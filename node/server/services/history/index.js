'use strict';

const 
	History = require('../').History;

function getAll(){
	const search = History.fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});

	return search;
}

function getById(id){
	const search = History.where({
		id: id
	}).fetch({
		withRelated: [
			'user', 
			'book'
		]
	});

	return search;
}

function getAllByBookId(id){
	const search = History.where({
		id_book: id
	}).fetchAll({
		withRelated: ['user']
	});

	return search;
}

function getAllByBookTitle(bookTitle){
	const search = History.query((qb) => {
		qb.leftJoin(
			'book',
			'history.id_book',
			'book.id'
		).andWhere('title', 'like', `%${bookTitle}%`)
			.select(
				'history.*',
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
	const search = History.where({
		id_user: id
	}).fetchAll({
		withRelated: ['book']
	});

	return search;
}

function getAllByUserName(userName){
	const search = History.query((qb) => {
		qb.leftJoin(
			'user',
			'history.id_user',
			'user.id'
		).andWhere('name', 'like', `%${userName}%`)
			.select(
				'history.*',
				'user.name as borrowedBy'
			);
	}).fetchAll({
		withRelated: ['book']
	});

	return search;
}

function getAllFromDateTillDate(fromDate, tillDate){
	const search = History.query((qb) => {
		qb.where('returnDate', '>=', fromDate)
			.andWhere('returnDate', '<=', tillDate);
	}).fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});

	return search;
}

function getAllFromDate(fromDate){
	const search = History.where('returnDate', '>=', fromDate)
		.fetchAll({
			withRelated: [
				'user', 
				'book'
			]
		});

	return search;
}

function remove(id){
	const remove = History.where({
		id: id
	}).destroy();

	return remove;
}

function removeOlderThan(date){
	const remove = History.where('returnDate', '<', date).destroy();
	
	return remove;
}

module.exports = {
	read: {
		getAll,
		getById,
		getAllByBookId,
		getAllByBookTitle,
		getAllByUserId,
		getAllByUserName,
		getAllFromDateTillDate,
		getAllFromDate
	},
	remove: {
		remove,
		removeOlderThan
	}
};