'use strict';

const User = require('../').User;

function getAll(){
	const search = User.fetchAll({withRelated: ['role']});
	return search;
}

function getById(id){
	const search = User.where({id: id}).fetch({withRelated: ['role']});
	return search;
}

function getByIdByProvider(idByProvider) {
	const search = User.where({idByProvider: idByProvider}).fetch({withRelated: 'role'});
	return search;
}

function getAllByProvider(provider) {
	const search = User.where({provider: provider}).fetchAll({withRelated: 'role'});
	return search;
}

function getByProviderAndIdByProvider(provider, idByProvider){
	const search = User.where({provider: provider, idByProvider: idByProvider}).fetchAll({withRelated: 'role'});
	return search;
}

function getAllByName(name){
	const search = User.where('name', 'like', `%${name}%`).fetchAll({withRelated: 'role'});
	return search;
}

function getAllByRole(id_role){
	const search = User.where('id_role', 'like', `%${id_role}%`).fetchAll({withRelated: 'role'});
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