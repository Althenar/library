'use strict';

const router = require('express').Router();
const permission = require('permission');

const UserController = require('../../../controllers/user');

router.get('/', permission(['admin']), UserController.read.getAll);

router.get('/:id', permission(['user', 'admin']), UserController.read.getById);

router.get('/provider/:id', permission(['admin']), UserController.read.getByIdByProvider);

router.get('/provider/name/:provider', permission(['admin']), UserController.read.getAllByProvider);

router.get('/provider/:id/:provider', permission(['admin']), UserController.read.getByProviderAndIdByProvider);

router.get('/name/:name', permission(['user', 'admin']), UserController.read.getAllByName);

router.get('/role/:role', permission(['admin']), UserController.read.getAllByRole);

router.put('/:id', permission(['user', 'admin']), UserController.update);

router.delete('/:id', permission(['admin']), UserController.remove);

module.exports = router;