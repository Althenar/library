'use strict'; 

const 
	router = require('express').Router(),
	permission = require('permission');

const 
	ShelfController = require('../../../controllers/shelf');

router.get(
	'/', 
	permission(['user', 'admin']), 
	ShelfController.read.getAll
);

router.get(
	'/:id', 
	permission(['user', 'admin']), 
	ShelfController.read.getById
);

router.get(
	'/row/:row', 
	permission(['user', 'admin']), 
	ShelfController.read.getAllByRow
);

router.get(
	'/col/:col', 
	permission(['user', 'admin']), 
	ShelfController.read.getAllByCol
);

router.get(
	'/row/:row/col/:col', 
	permission(['user', 'admin']), 
	ShelfController.read.getByRowAndCol
);

router.get(
	'/bookcase/:id', 
	permission(['user', 'admin']), 
	ShelfController.read.getAllFromBookcase
);

router.post(
	'/', 
	permission(['admin']), 
	ShelfController.create
);

router.put(
	'/:id', 
	permission(['admin']), 
	ShelfController.update
);

router.delete(
	'/:id', 
	permission(['admin']), 
	ShelfController.remove
);

module.exports = router;
