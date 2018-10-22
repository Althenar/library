'use strict';

const 
	QueueService = require('../../services/queue'),
	fixPosition = require('../../services/queue/fixPosition'),
	response = require('../');

function getAll(req, res, next){
	const search = QueueService.read.getAll();

	return response.json(search, res, next);
}

function getAllByCurrentUser(req, res, next){
	const search = QueueService.read
		.getAllByUserIdOrderedByPosition(req.user.id);

	return response.json(search, res, next);
}

function getAllByUserId(req, res, next){
	const search = QueueService.read.getAllByUserId(req.params.id);

	return response.json(search, res, next);
}

function getAllByBookId(req, res, next){
	const search = QueueService.read.getAllByBookId(req.params.id);

	return response.json(search, res, next);
}

function getByIdUserAndPosition(req, res, next){
	const search = QueueService.read
		.getByIdUserAndPosition(req.params.id_user, req.params.position);

	return response.json(search, res, next);
}

function getByIdUserAndIdBook(req, res, next){
	const search = QueueService.read
		.getByIdUserAndIdBook(req.params.id_user,req.params.id_book);

	return response.json(search, res, next);
}

function create(req, res, next){
	const queue = {
		id: req.params.id,
		id_user: req.body.id_user,
		id_book: req.body.id_book
	};

	const save = QueueService.create(queue);
	return response.json(save, res, next);
}

async function update(req, res, next){
	const queue = {
		id: req.params.id,
		id_user: req.user.id,
		id_book: req.body.id_book,
		position: req.body.position
	};

	await fixPosition.updateUserQueue(queue);

	const update = QueueService.update(queue);
	return response.json(update, res, next);
}

async function remove(req, res, next){
	let remove;

	await QueueService.getById(req.params.id).then((caughtQueue) => {
		fixPosition.fixUserQueue(caughtQueue.toJSON());
		remove = QueueService.remove(caughtQueue.id);
	});
	
	return response.json(remove, res, next);
}

module.exports = {
	create,
	read: {
		getAll,
		getAllByCurrentUser,
		getAllByUserId,
		getByIdUserAndPosition,
		getAllByBookId,
		getByIdUserAndIdBook
	},
	update,
	remove

};