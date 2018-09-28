'use strict'; 

const router = require('express').Router();
const permission = require('permission');

const BookcaseController = require('../../../controllers/bookcase');

router.get('/', permission(['user', 'admin']), BookcaseController.read.getAll);

router.get('/:id', permission(['user', 'admin']), BookcaseController.read.getById);

router.get('/name/:name', permission(['user', 'admin']), BookcaseController.read.getByName);

router.get('/search/:name', permission(['user', 'admin']), BookcaseController.read.getAllByName);

router.post('/', permission(['admin']), BookcaseController.create);

router.put('/:id', permission(['admin']), BookcaseController.update);

router.delete('/:id', permission(['admin']), BookcaseController.remove);

module.exports = router;
