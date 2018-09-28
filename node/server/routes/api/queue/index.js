'use strict';

const router = require('express').Router();
const permission = require('permission');

const QueueController = require('../../../controllers/queue');

router.get('/', permission(['admin']), QueueController.read.getAll);

router.get('/user', permission(['user', 'admin']), QueueController.read.getByCurrentUserId);

router.get('/user/:id', permission(['admin']), QueueController.read.getByUserId);

router.get('/book/:id', permission(['admin']), QueueController.read.getByBookId);

router.post('/', permission(['user', 'admin']), QueueController.create);

router.put('/:id', permission(['user', 'admin']), QueueController.update);

router.delete('/:id', permission(['user', 'admin']), QueueController.remove);

module.exports = router;