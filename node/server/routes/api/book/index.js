'use strict'; 

const express = require('express');
const router = express.Router();

const BookService = require('../../../services/book');

router.get('/', function(req, res, next) {
	BookService.read.getAll(res,next);
});

router.get('/:id', function(req, res, next) {
	BookService.read.getById(req.params.id,res,next);
});

router.get('/title/:name',function(req, res, next){
	BookService.read.getAllByName(req.params.name,res,next);
});

router.get('/isbn/:isbn', function(req, res, next){
	BookService.read.getByISBN(req.params.isbn,res,next);
});

router.get('/author/:name',function(req, res, next){
	BookService.read.getAllByAuthor(req.params.name,res,next);
});

router.get('/shelf/:id',function(req, res, next){
	BookService.read.getAllFromShelf(req.params.id,res,next);
});

router.post('/', function(req, res, next){
	const book = {
		title: req.body.title,
		isbn: req.body.isbn,
		author: req.body.author,
		id_shelf: req.body.id_shelf
	};

	BookService.create(book,res,next);
});

router.put('/:id', function(req, res, next){
	const book = {
		id: req.params.id,
		title: req.body.title,
		isbn: req.body.isbn,
		author: req.body.author,
		id_shelf: req.body.id_shelf
	};

	BookService.update(book,res,next);
});

router.delete('/:id', function(req, res, next){
	BookService.remove(req.params.id,res,next);
});

module.exports = router;
