'use strict';

const BorrowService = require('../../services/borrow');
const response = require('../');

function getAll(req, res, next){
	const search = BorrowService.read.getAll();
	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = BorrowService.read.getById(req.params.id);
	return response.json(search, res, next);
}

function getAllByBookId(req, res, next){
	const search = BorrowService.read.getAllByBookId(req.params.id);
	return response.json(search, res, next);
}

function getAllByUserId(req, res, next){
	const search = BorrowService.read.getAllByUserId(req.params.id);
	return response.json(search, res, next);
}

function getAllFromDateTillDate(req, res, next){
	const search = BorrowService.read.getAllFromDateTillDate(req.params.fromDate, req.params.tillDate);
	return response.json(search, res, next);
}

function getAllFromDate(req, res, next){
	const search = BorrowService.read.getAllFromDate(req.params.date);
	return response.json(search, res, next);
}

function getAllBorrowed(req, res, next){
	const search = BorrowService.read.getAllBorrowed();
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

function update(req, res, next){
	const borrow = {
		id: req.params.id,
		id_user: req.body.id_user,
		id_book: req.body.id_book
	};

	const update = BorrowService.update(borrow);
	return response.json(update, res, next);
}

function returnBook(req, res, next){
	const borrow = {
		id: req.params.id,
		returnDate: new Date().toISOString()
	};

	const update = BorrowService.update(borrow);
	return response.json(update, res, next);
}

function remove(req, res, next){
	const remove = BorrowService.remove.remove(req.params.id);
	return response.json(remove, res, next);
}

function removeOlderThan(req, res, next){
	const remove = BorrowService.remove.removeOlderThan(req.params.date);
	return response.json(remove, res, next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getAllByBookId,
		getAllByUserId,
		getAllFromDateTillDate,
		getAllFromDate,
		getAllBorrowed
	},
	update: {
		update,
		returnBook
	},
	remove: {
		remove,
		removeOlderThan
	}
};