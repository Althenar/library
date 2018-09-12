'use strict';

const BookcaseRepository = require('../../repository/bookcase');
const response = require('../');

function getAll(res,next){
	const search = BookcaseRepository.read.getAll();
	return response.json(search,res,next);
}

function getById(id,res,next){
	const search = BookcaseRepository.read.getById(id);
	return response.json(search,res,next);
}

function getByName(name,res,next){
	const search = BookcaseRepository.read.getByName(name);
	return response.json(search,res,next);
}

function getAllByName(name,res,next){
	const search = BookcaseRepository.read.getAllByName(name);
	return response.json(search,res,next);
}

function create(bookcase,res,next){
	const save = BookcaseRepository.create(bookcase);
	return response.json(save,res,next);
}

function update(bookcase,res,next){
	const update = BookcaseRepository.update(bookcase);
	return response.json(update,res,next);
}

function remove(bookcase,res,next){
	const remove = BookcaseRepository.remove(bookcase);
	return response.json(remove,res,next);
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getByName,
		getAllByName
	},
	update,
	remove
};