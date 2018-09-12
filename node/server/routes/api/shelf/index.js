'use strict'; 

const express = require('express');
const router = express.Router();

const ShelfService = require('../../../services/shelf');

router.get('/', function(req, res, next) {
	ShelfService.read.getAll(res,next);
});

router.get('/:id', function(req, res, next) {
	ShelfService.read.getById(req.params.id,res,next);
});

router.get('/row/:row', function(req, res, next){
	ShelfService.read.getAllByRow(req.params.row,res,next);
});

router.get('/col/:col', function(req, res, next){
	ShelfService.read.getAllByCol(req.params.col,res,next);
});

router.get('/r/:row/c/:col', function(req, res, next){
	ShelfService.read.getByRowAndCol(req.params.row,req.params.col,res,next);
});

router.get('/bookcase/:id', function(req, res, next){
	ShelfService.read.getAllFromBookcase(req.params.id,res,next);
});

router.post('/', function(req, res, next){
	const shelf = {
		row: req.body.row,
		col: req.body.col,
		id_bookcase: req.body.id_bookcase
	};

	ShelfService.create(shelf,res,next);
});

router.put('/:id', function(req, res, next){
	const shelf = {
		id: req.params.id,
		row: req.body.row,
		col: req.body.col,
		id_bookcase: req.body.id_bookcase
	};

	ShelfService.update(shelf,res,next);
});

router.delete('/:id', function(req, res, next){
	ShelfService.remove(req.params.id,res,next);
});

module.exports = router;
