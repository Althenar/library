'use strict'; 

const router = require('express').Router();

const BookController = require('../../../controllers/book');

router.get('/', BookController.read.getAll);

router.get('/:id', BookController.read.getById);

router.get('/borrowed', BookController.read.getAllBorrowed);

router.get('/title/:name', BookController.read.getAllByName);

router.get('/isbn/:isbn', BookController.read.getByISBN);

router.get('/author/:name', BookController.read.getAllByAuthor);

router.get('/shelf/:id', BookController.read.getAllFromShelf);

router.post('/', BookController.create);

router.put('/:id', BookController.update);

router.delete('/:id', BookController.remove);

module.exports = router;
