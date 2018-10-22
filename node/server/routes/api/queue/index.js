'use strict';

const 
	router = require('express').Router(),
	permission = require('permission');

const 
	QueueController = require('../../../controllers/queue');

router.get(
	'/', 
	permission(['admin']), 
	QueueController.read.getAll
);

router.get(
	'/user', 
	permission(['user', 'admin']), 
	QueueController.read.getAllByCurrentUser
);

router.get(
	'/user/:id', 
	permission(['admin']), 
	QueueController.read.getAllByUserId
);

router.get(
	'/book/:id', 
	permission(['admin']), 
	QueueController.read.getAllByBookId
);

router.get(
	'/user/:id_user/position/:position',
	permission(['admin']),
	QueueController.read.getByIdUserAndPosition
);

router.get(
	'/user/:id_user/book/:id_book',
	permission(['admin']),
	QueueController.read.getByIdUserAndIdBook
);

router.post(
	'/', 
	permission(['user', 'admin']), 
	QueueController.create
);

router.put(
	'/:id', 
	permission(['user', 'admin']), 
	QueueController.update
);

router.delete(
	'/:id', 
	permission(['user', 'admin']), 
	QueueController.remove
);

module.exports = router;