'use strict';

const Bookcase = require('../').Bookcase;

function getAll(){
	const search = Bookcase.fetchAll();
	return search;
}

function getById(id){
	const search = Bookcase.where({id: id}).fetch();
	return search;
}

function getByName(name){
	const search = Bookcase.where({name: name}).fetch();
	return search;
}

function getAllByName(name){
	const search = Bookcase.where('name', 'like', `%${name}%`).fetchAll();
	return search;
}

function create(bookcase){
	const save = new Bookcase(bookcase).save();
	return save;
}

function update(bookcase){
	const update = new Bookcase({id: bookcase.id}).save(bookcase,{patch: true});
	return update;
}

function remove(bookcase){
	const remove = Bookcase.where({id: bookcase}).destroy();
	return remove;
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