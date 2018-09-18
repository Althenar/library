'use strict'; 

const router = require('express').Router();

const ShelfController = require('../../../controllers/shelf');

router.get('/', ShelfController.read.getAll);

router.get('/:id', ShelfController.read.getById);

router.get('/row/:row', ShelfController.read.getAllByRow);

router.get('/col/:col', ShelfController.read.getAllByCol);

router.get('/r/:row/c/:col', ShelfController.read.getByRowAndCol);

router.get('/bookcase/:id', ShelfController.read.getAllFromBookcase);

router.post('/', ShelfController.create);

router.put('/:id', ShelfController.update);

router.delete('/:id', ShelfController.remove);

module.exports = router;
