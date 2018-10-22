'use strict';

const 
	BookcaseService = require('../../services/bookcase'),
	response = require('../');

function getAll(req, res, next){
	const search = BookcaseService.read.getAll();

	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = BookcaseService.read.getById(req.params.id);

	return response.json(search, res, next);
}

function getAllByName(req, res, next){
	const search = BookcaseService.read.getAllByName(req.params.name);

	return response.json(search, res, next);
}

function create(req, res, next){
	const bookcase = {
		name: req.body.name
	};

	const save = BookcaseService.create(bookcase);
	return response.json(save, res, next);
}

function update(req, res, next){
	const bookcase = {
		id: req.params.id,
		name: req.body.name
	};

	const update = BookcaseService.update(bookcase);
	return response.json(update, res, next);
}

function remove(req, res, next){
	const remove = BookcaseService.remove(req.params.id);

	return response.json(remove, res, next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getAllByName
	},
	update,
	remove
};