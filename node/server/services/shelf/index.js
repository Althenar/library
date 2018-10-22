'use strict';

const 
	Shelf = require('../').Shelf;

function getAll(){
	const search = Shelf.fetchAll({
		withRelated: ['bookcase']
	});

	return search;
}

function getById(id){
	const search = Shelf.where({
		id: id
	}).fetch({
		withRelated: ['bookcase']
	});

	return search;
}

function getAllByRow(row){
	const search = Shelf.where({
		row: row
	}).fetchAll({
		withRelated: ['bookcase']
	});

	return search;
}

function getAllByCol(col){
	const search = Shelf.where({
		col: col
	}).fetchAll({
		withRelated: ['bookcase']
	});

	return search;
}

function getByRowAndCol(row,col){
	const search = Shelf.where({
		row: row, 
		col: col
	}).fetch({
		withRelated: ['bookcase']
	});

	return search;
}

function getAllFromBookcase(bookcaseId){
	const search = Shelf.where({
		id_bookcase: bookcaseId
	}).fetchAll({
		withRelated: ['bookcase']
	});
	
	return search;
}

function create(shelf){
	const save = new Shelf(shelf).save();

	return save;
}

function update(shelf){
	const update = new Shelf({
		id: shelf.id
	})
		.save(shelf,{
			patch: true
		});

	return update;
}

function remove(shelfId){
	const remove = Shelf.where({
		id: shelfId
	}).destroy();
	
	return remove;
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