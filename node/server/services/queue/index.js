'use strict';

const Queue = require('../').Queue;

function getAll(){
    const search = Queue.fetchAll({withRelated: ['user', 'book']});
    return search;
}

function getByCurrentUserId(id){
    const search = Queue.where({id: id}).fetch({withRelated: ['user', 'book']});
    return search;
}

function getByUserId(id) {
    const search = Queue.where({id_user: id}).fetchAll({withRelated: ['user', 'book']});
    return search;
}

function getByBookId(id) {
    const search = Queue.where({id_book: id}).fetchAll({withRelated: ['user', 'book']});
    return search;
}

function create(queue){
    const save = new Queue(queue).save();
    return save;
}

function update(queue){
    const update = new Queue({id: queue.id}).save(queue, {patch: true});
    return update;
}

function remove(queue){
    const remove = Queue.where({id: queue}).destroy();
    return remove;
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