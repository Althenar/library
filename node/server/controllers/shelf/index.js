'use strict';

const ShelfService = require('../../services/shelf');
const response = require('../');

function getAll(req, res, next){
	const search = ShelfService.read.getAll();
	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = ShelfService.read.getById(req.params.id);
	return response.json(search, res, next);
}

function getAllByRow(req, res, next){
	const search = ShelfService.read.getAllByRow(req.params.row);
	return response.json(search, res, next);
}

function getAllByCol(req, res, next){
	const search = ShelfService.read.getAllByCol(req.params.col);
	return response.json(search, res, next);
}

function getByRowAndCol(req, res, next){
	const search = ShelfService.read.getByRowAndCol(req.params.row, req.params.col);
	return response.json(search, res, next);
}

function getAllFromBookcase(req, res, next){
	const search = ShelfService.read.getAllFromBookcase(req.params.id);
	return response.json(search, res, next);
}

function create(req, res, next){
	const shelf = {
		row: req.body.row,
		col: req.body.col,
		id_bookcase: req.body.id_bookcase
	};

	const save = ShelfService.create(shelf);
	return response.json(save, res, next);
}

function update(req, res, next){
	const shelf = {
		id: req.params.id,
		row: req.body.row,
		col: req.body.col,
		id_bookcase: req.body.id_bookcase
	};

	const update = ShelfService.update(shelf);
	return response.json(update, res, next);
}

function remove(req, res, next){
	const remove = ShelfService.remove(req.params.id);
	return response.json(remove, res, next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getAllByRow,
		getAllByCol,
		getByRowAndCol,
		getAllFromBookcase
	},
	update,
	remove
};