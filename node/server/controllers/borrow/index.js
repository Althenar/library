'use strict';

const 
	BorrowService = require('../../services/borrow'),
	response = require('../');

function getAll(req, res, next){
	const search = BorrowService.read.getAll();

	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = BorrowService.read.getById(req.params.id);

	return response.json(search, res, next);
}

function getByBookId(req, res, next){
	const search = BorrowService.read.getByBookId(req.params.id);

	return response.json(search, res, next);
}

function getAllByBookTitle(req, res, next){
	const search = BorrowService.read.getAllByBookTitle(req.params.title);

	return response.json(search, res, next);
}

function getAllByUserId(req, res, next){
	const search = BorrowService.read.getAllByUserId(req.params.id);

	return response.json(search, res, next);
}

function getAllByCurrentUser(req, res, next){
	const search = BorrowService.read.getAllByUserId(req.user.id);

	return response.json(search, res, next);
}

function getAllByUserName(req, res, next){
	const search = BorrowService.read.getAllByUserName(req.params.name);

	return response.json(search, res, next);
}

function getAllFromDateTillDate(req, res, next){
	const search = BorrowService.read
		.getAllFromDateTillDate(req.params.fromDate, req.params.tillDate);
	
	return response.json(search, res, next);
}

function getAllFromDate(req, res, next){
	const search = BorrowService.read.getAllFromDate(req.params.date);
	
	return response.json(search, res, next);
}

function create(req, res, next){
	const borrow = {
		borrowDate: new Date().toISOString(),
		id_user: req.body.id_user,
		id_book: req.body.id_book
	};

	const save = BorrowService.create(borrow);
	return response.json(save, res, next);
}

function returnBook(req, res, next){
	const remove = BorrowService.returnBook(req.params.id_book);

	return response.json(remove, res, next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getByBookId,
		getAllByBookTitle,
		getAllByUserId,
		getAllByCurrentUser,
		getAllByUserName,
		getAllFromDateTillDate,
		getAllFromDate
	},
	returnBook
};