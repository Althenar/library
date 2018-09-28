'use strict'; 

const router = require('express').Router();
const permission = require('permission');

const BookController = require('../../../controllers/book');

router.get('/', BookController.read.getAll);

router.get('/:id', BookController.read.getById);

router.get('/borrowed', permission(['admin']), BookController.read.getAllBorrowed);

router.get('/title/:name', BookController.read.getAllByName);

router.get('/isbn/:isbn', BookController.read.getByISBN);

router.get('/author/:name', BookController.read.getAllByAuthor);

router.get('/shelf/:id', permission(['user', 'admin']), BookController.read.getAllFromShelf);

router.post('/', permission(['admin']), BookController.create);

router.put('/:id', permission(['admin']), BookController.update);

router.delete('/:id', permission(['admin']), BookController.remove);

module.exports = router;
