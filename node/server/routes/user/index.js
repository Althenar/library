'use strict';

const router = require('express').Router();
const UserController = require('../../controllers/user');

router.get('/', UserController.read.getAll);

router.get('/:id', UserController.read.getById);

router.get('/provider/:id', UserController.read.getByIdByProvider);

router.get('/provider/name/:provider', UserController.read.getAllByProvider);

router.get('/provider/:id/:provider', UserController.read.getByProviderAndIdByProvider);

router.get('/name/:name', UserController.read.getAllByName);

router.get('/role/:id', UserController.read.getAllByRole);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.remove);

module.exports = router;