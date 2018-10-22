'use strict'; 

const 
	router = require('express').Router(),
	permission = require('permission');

const 
	BookController = require('../../../controllers/book');

router.get(
	'/', 
	BookController.read.getAll
);

router.get(
	'/borrowed', 
	permission(['admin']), 
	BookController.read.getAllBorrowed
);

router.get(
	'/in-queue', 
	permission(['admin']), 
	BookController.read.getAllInQueue
);

router.get(
	'/:id', 
	BookController.read.getById
);

router.get(
	'/title/:title', 
	BookController.read.getAllByTitle
);

router.get(
	'/isbn/:isbn', 
	BookController.read.getByISBN
);

router.get(
	'/author/:name', 
	BookController.read.getAllByAuthor
);

router.get(
	'/borrowed-by/:name',
	permission(['user', 'admin']),
	BookController.read.getAllByUserThatBorrowed
);

router.get(
	'/shelf/:id', 
	permission(['user', 'admin']), 
	BookController.read.getAllFromShelf
);

router.get(
	'/bookcase/:id', 
	permission(['user', 'admin']), 
	BookController.read.getAllFromBookcase
);

router.post(
	'/', 
	permission(['admin']), 
	BookController.create
);

router.put(
	'/:id', 
	permission(['admin']), 
	BookController.update
);

router.delete(
	'/:id', 
	permission(['admin']), 
	BookController.remove
);

module.exports = router;
