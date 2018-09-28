'use strict';

const User = require('../').User;

function getAll(){
	const search = User.fetchAll();
	return search;
}

function getById(id){
	const search = User.where({id: id}).fetch({withRelated: ['borrowed.book', 'queue.book']});
	return search;
}

function getByIdByProvider(idByProvider) {
	const search = User.where({idByProvider: idByProvider}).fetch();
	return search;
}

function getAllByProvider(provider) {
	const search = User.where({provider: provider}).fetchAll();
	return search;
}

function getByProviderAndIdByProvider(provider, idByProvider){
	const search = User.where({provider: provider, idByProvider: idByProvider}).fetch();
	return search;
}

function getAllByName(name){
	const search = User.where('name', 'like', `%${name}%`).fetchAll();
	return search;
}

function getAllByRole(role){
	const search = User.where('role', 'like', `%${role}%`).fetchAll();
	return search;
}

function create(user){
	const save = new User(user).save();
	return save;
}

function update(user){
	const update = new User({id: user.id}).save(user, {patch: true});
	return update;
}

function remove(user){
	const remove = User.where({id: user}).destroy();
	return remove;
}

module.exports = {
	create,
	read: {
		getAll,
		getById,
		getByIdByProvider,
		getAllByProvider,
		getByProviderAndIdByProvider,
		getAllByName,
		getAllByRole
	},
	update,
	remove
};