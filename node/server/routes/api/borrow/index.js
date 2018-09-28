'use strict'; 

const router = require('express').Router();
const permission = require('permission');

const BorrowController = require('../../../controllers/borrow');

router.get('/', permission(['admin']), BorrowController.read.getAll);

router.get('/borrowed', permission(['admin']), BorrowController.read.getAllBorrowed);

router.get('/:id', permission(['admin']), BorrowController.read.getById);

router.get('/book/:id', permission(['admin']), BorrowController.read.getAllByBookId);

router.get('/user/:id', permission(['admin']), BorrowController.read.getAllByUserId);

router.get('/from/:date', permission(['admin']), BorrowController.read.getAllFromDate);

router.get('/:fromDate/:tillDate', permission(['admin']), BorrowController.read.getAllFromDateTillDate);

router.post('/', permission(['admin']), BorrowController.create);

router.put('/:id', permission(['admin']), BorrowController.update.update);

router.put('/return/:id', permission(['admin']), BorrowController.update.returnBook);

router.delete('/:id', permission(['admin']), BorrowController.remove.remove);

router.delete('/older/:date', permission(['admin']), BorrowController.remove.removeOlderThan);

module.exports = router;