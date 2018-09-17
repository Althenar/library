'use strict'; 

const express = require('express');
const router = express.Router();

const BookcaseController = require('../../../controllers/bookcase');

router.get('/', BookcaseController.read.getAll);

router.get('/:id', BookcaseController.read.getById);

router.get('/name/:name', BookcaseController.read.getByName);

router.get('/search/:name', BookcaseController.read.getAllByName);

router.post('/', BookcaseController.create);

router.put('/:id', BookcaseController.update);

router.delete('/:id', BookcaseController.remove);

module.exports = router;
