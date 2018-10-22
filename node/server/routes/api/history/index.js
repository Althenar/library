'use strict'; 

const 
	router = require('express').Router(),
	permission = require('permission');

const 
	HistoryController = require('../../../controllers/history');

router.get(
	'/', 
	permission(['admin']), 
	HistoryController.read.getAll
);

router.get(
	'/user', 
	permission(['user', 'admin']), 
	HistoryController.read.getAllByCurrentUser
);

router.get(
	'/:id', 
	permission(['admin']), 
	HistoryController.read.getById
);

router.get(
	'/book/:id', 
	permission(['admin']), 
	HistoryController.read.getAllByBookId
);

router.get(
	'/user/:id', 
	permission(['admin']), 
	HistoryController.read.getAllByUserId
);

router.get(
	'/from/:date', 
	permission(['admin']), 
	HistoryController.read.getAllFromDate
);

router.get(
	'/:fromDate/:tillDate', 
	permission(['admin']), 
	HistoryController.read.getAllFromDateTillDate
);

router.get(
	'/book/title/:title',
	permission(['admin']),
	HistoryController.read.getAllByBookTitle
);

router.get(
	'/user/name/:name', 
	permission(['admin']), 
	HistoryController.read.getAllByUserName
);

router.delete(
	'/:id', 
	permission(['admin']), 
	HistoryController.remove.remove
);

router.delete(
	'/older/:date', 
	permission(['admin']), 
	HistoryController.remove.removeOlderThan
);

module.exports = router;