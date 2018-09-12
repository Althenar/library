'use strict'; 

const express = require('express');
const router = express.Router();

const BookcaseService = require('../../../services/bookcase');

router.get('/', function(req, res, next) {
	BookcaseService.read.getAll(res,next);
});

router.get('/:id', function(req, res, next) {
	BookcaseService.read.getById(req.params.id,res,next);
});

router.get('/name/:name', function(req, res, next) {
	BookcaseService.read.getByName(req.params.name,res,next);
});

router.get('/search/:name', function(req, res, next) {
	BookcaseService.read.getAllByName(req.params.name,res,next);
});

router.post('/', function(req, res, next){
	const bookcase = {
		name: req.body.name
	};

	BookcaseService.create(bookcase,res,next);
});

router.put('/:id', function(req, res, next){
	const bookcase = {
		id: req.params.id,
		name: req.body.name
	};

	BookcaseService.update(bookcase,res,next);
});

router.delete('/:id', function(req, res, next){
	BookcaseService.remove(req.params.id,res,next);
});

module.exports = router;
