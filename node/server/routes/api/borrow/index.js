'use strict'; 

const 
	router = require('express').Router(),
	permission = require('permission');

const 
	BorrowController = require('../../../controllers/borrow');

router.get(
	'/', 
	permission(['admin']), 
	BorrowController.read.getAll
);

router.get(
	'/user', 
	permission(['user', 'admin']), 
	BorrowController.read.getAllByCurrentUser
);

router.get(
	'/:id', 
	permission(['admin']), 
	BorrowController.read.getById
);

router.get(
	'/book/:id', 
	permission(['admin']), 
	BorrowController.read.getByBookId
);

router.get(
	'/user/:id', 
	permission(['admin']), 
	BorrowController.read.getAllByUserId
);

router.get(
	'/from/:date', 
	permission(['admin']), 
	BorrowController.read.getAllFromDate
);

router.get(
	'/:fromDate/:tillDate', 
	permission(['admin']), 
	BorrowController.read.getAllFromDateTillDate
);

router.get(
	'/book/title/:title',
	permission(['admin']),
	BorrowController.read.getAllByBookTitle
);

router.get(
	'/user/name/:name', 
	permission(['admin']), 
	BorrowController.read.getAllByUserName
);

router.post(
	'/', 
	permission(['admin']), 
	BorrowController.create
);

router.delete(
	'/return/:id_book', 
	permission(['admin']), 
	BorrowController.returnBook
);

module.exports = router;