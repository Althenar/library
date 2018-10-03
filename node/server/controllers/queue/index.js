'use strict';

const QueueService = require('../../services/queue');
const response = require('../');

function getAll(req, res, next){
    const search = QueueService.read.getAll();
    return response.json(search, res, next);
}

function getByCurrentUserId(req, res, next){
    const search = QueueService.read.getByCurrentUserId(req.params.id);
    return response.json(search, res, next);
}

function getByUserId(req, res, next){
    const search = QueueService.read.getByUserId(req.params.id);
    return response.json(search, res, next);
}

function getByBookId(req, res, next){
    const search = QueueService.read.getByBookId(req.params.id);
    return response.json(search, res, next);
}

function create(req, res, next){
    const queue = {
        id: req.params.id,
        id_user: req.body.id_user,
        id_book: req.body.id_book
    };

    const save = QueueService.create(queue);
    return response.json(save, res, next);
}

function update(req, res, next){
    const queue = {
        id: req.params.id,
        id_user: req.body.id_user,
        id_book: req.body.id_book
    };

    const update = QueueService.update(queue);
    return response.json(update, res, next);
}

function remove(req, res, next){
    const remove = QueueService.remove.remove(req.params.id);
    return response.json(remove, res, next);
}

module.exports = {
    create,
    read: {
        getAll,
        getByCurrentUserId,
        getByUserId,
        getByBookId
    },
    update,
    remove

};