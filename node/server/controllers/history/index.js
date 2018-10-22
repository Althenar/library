'use strict';

const 
	HistoryService = require('../../services/history'),
	response = require('../');

function getAll(req, res, next){
	const search = HistoryService.read.getAll();

	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = HistoryService.read.getById(req.params.id);

	return response.json(search, res, next);
}

function getAllByBookId(req, res, next){
	const search = HistoryService.read.getAllByBookId(req.params.id);

	return response.json(search, res, next);
}

function getAllByBookTitle(req, res, next){
	const search = HistoryService.read.getAllByBookTitle(req.params.title);

	return response.json(search, res, next);
}

function getAllByUserId(req, res, next){
	const search = HistoryService.read.getAllByUserId(req.params.id);

	return response.json(search, res, next);
}

function getAllByCurrentUser(req, res, next){
	const search = HistoryService.read.getAllByUserId(req.user.id);

	return response.json(search, res, next);
}

function getAllByUserName(req, res, next){
	const search = HistoryService.read.getAllByUserName(req.params.name);

	return response.json(search, res, next);
}

function getAllFromDateTillDate(req, res, next){
	const search = HistoryService.read
		.getAllFromDateTillDate(req.params.fromDate, req.params.tillDate);
	
	return response.json(search, res, next);
}

function getAllFromDate(req, res, next){
	const search = HistoryService.read.getAllFromDate(req.params.date);
	
	return response.json(search, res, next);
}

function remove(req, res, next){
	const remove = HistoryService.remove.remove(req.params.id);

	return response.json(remove, res, next);
}

function removeOlderThan(req, res, next){
	const remove = HistoryService.remove.removeOlderThan(req.params.date);

	return response.json(remove, res, next);
}

module.exports = {
	read: {
		getAll,
		getById,
		getAllByBookId,
		getAllByBookTitle,
		getAllByUserId,
		getAllByCurrentUser,
		getAllByUserName,
		getAllFromDateTillDate,
		getAllFromDate
	},
	remove: {
		remove,
		removeOlderThan
	}
};