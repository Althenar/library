'use strict';

const Borrow = require('../').Borrow;

function getAll(){
	const search = Borrow.fetchAll({withRelated: ['user', 'book']});
	return search;
}

function getById(id){
	const search = Borrow.where({id: id}).fetch({withRelated: ['user', 'book']});
	return search;
}

function getAllByBookId(id){
	const search = Borrow.where({id_book: id}).fetchAll({withRelated: ['user', 'book']});
	return search;
}

function getAllByUserId(id){
	const search = Borrow.where({id_user: id}).fetchAll({withRelated: ['user', 'book']});
	return search;
}

function getAllFromDateTillDate(fromDate, tillDate){
	const search = Borrow.query((qb) => {
		qb.where('borrowDate', '>', fromDate).andWhere('borrowDate', '<', tillDate);
	}).fetchAll({withRelated: ['user', 'book']});
	return search;
}

function getAllFromDate(fromDate){
	const search = Borrow.where('borrowDate', '>', fromDate).fetchAll({withRelated: ['user', 'book']});
	return search;
}

function getAllBorrowed(){
	const search = Borrow.where({returnDate: null}).fetchAll({withRelated: ['user', 'book']});
	return search;
}

function create(borrow){
	const save = new Borrow(borrow).save();
	return save;
}

function update(borrow){
	const update = new Borrow({id: borrow.id}).save(borrow,{patch: true});
	return update;
}

function remove(id){
	const remove = Borrow.where({id: id}).destroy();
	return remove;
}

function removeOlderThan(date){
	const remove = Borrow.where('returnDate', '<', date).destroy();
	return remove;
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
	update,
	remove: {
		remove,
		removeOlderThan
	}
};