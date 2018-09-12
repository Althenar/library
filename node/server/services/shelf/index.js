'use strict';

const ShelfRepository = require('../../repository/shelf');
const response = require('../');

function getAll(res,next){
	const search = ShelfRepository.read.getAll();
	return response.json(search,res,next);
}

function getById(id,res,next){
	const search = ShelfRepository.read.getById(id);
	return response.json(search,res,next);
}

function getAllByRow(row,res,next){
	const search = ShelfRepository.read.getAllByRow(row);
	return response.json(search,res,next);
}

function getAllByCol(col,res,next){
	const search = ShelfRepository.read.getAllByCol(col);
	return response.json(search,res,next);
}

function getByRowAndCol(row,col,res,next){
	const search = ShelfRepository.read.getByRowAndCol(row,col);
	return response.json(search,res,next);
}

function getAllFromBookcase(bookcase,res,next){
	const search = ShelfRepository.read.getAllFromBookcase(bookcase);
	return response.json(search,res,next);
}

function create(shelf,res,next){
	const save = ShelfRepository.create(shelf);
	return response.json(save,res,next);
}

function update(shelf,res,next){
	const update = ShelfRepository.update(shelf);
	return response.json(update,res,next);
}

function remove(shelf,res,next){
	const remove = ShelfRepository.remove(shelf);
	return response.json(remove,res,next);
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