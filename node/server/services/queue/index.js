'use strict';

const 
	Queue = require('../').Queue;

function getAll(){
	const search = Queue.fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});
	
	return search;
}

function getAllByUserId(id) {
	const search = Queue.where({
		id_user: id
	}).fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});
	
	return search;
}

function getAllByUserIdOrderedByPosition(id) {
	const search = Queue.query((qb) => {
		qb.where({
			id_user: id
		}).orderBy('position', 'ASC');
	}).fetchAll({
		withRelated: [
			'user', 
			'book'
		]
	});
	
	return search;
}

function getAllByBookId(id) {
	const search = Queue.where({
		id_book: id
	}).fetchAll({
		withRelated: ['user']
	});
	
	return search;
}

function getByIdUserAndPosition(id_user, position){
	const search = Queue.query((qb) => {
		qb.where({
			id_user: id_user
		}).andWhere({
			position: position
		});
	}).fetch();
	
	return search;
}

function getAllByIdUserAndHigherOrEqualPosition(id_user, position){
	const search = Queue.query((qb) => {
		qb.where({
			id_user: id_user
		}).andWhere('position', '>=', position)
			.orderBy('position', 'ASC');
	}).fetchAll();
	
	return search;
}

function getByIdUserAndIdBook(id_user, id_book){
	const search = Queue.query((qb) => {
		qb.where({
			id_user: id_user
		}).andWhere({
			id_book: id_book
		});
	}).fetch({
		withRelated: [
			'user', 
			'book'
		]
	});
	
	return search;
}

function create(queue){
	const save = new Queue(queue).save();
	
	return save;
}

function update(queue){
	const update = new Queue({
		id: queue.id
	}).save(queue, {
		patch: true
	});
	
	return update;
}

function remove(queueId){
	const remove = Queue.where({
		id: queueId
	}).destroy();

	return remove;
}

module.exports = {
	create,
	read: {
		getAll,
		getAllByUserId,
		getAllByUserIdOrderedByPosition,
		getAllByBookId,
		getByIdUserAndPosition,
		getAllByIdUserAndHigherOrEqualPosition,
		getByIdUserAndIdBook
	},
	update,
	remove
};