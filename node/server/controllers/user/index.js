'use strict';

const UserService = require('../../services/user');
const response = require('../');

function getAll(req, res, next){
	const search = UserService.read.getAll();
	return response.json(search, res, next);
}

function getById(req, res, next){
	const search = UserService.read.getById(req.params.id);
	return response.json(search, res, next);
}

function getByIdByProvider(req, res, next){
	const search = UserService.read.getByIdByProvider(req.params.id);
	return response.json(search, res, next);
}

function getAllByProvider(req, res, next){
	const search = UserService.read.getAllByProvider(req.params.provider);
	return response.json(search, res, next);
}

function getByProviderAndIdByProvider(req, res, next){
	const search = UserService.read.getByProviderAndIdByProvider(req.params.provider, req.params.id);
	return response.json(search, res, next);
}

function getAllByName(req, res, next){
	const search = UserService.read.getAllByName(req.params.name);
	return response.json(search, res, next);
}

function getAllByRole(req, res, next){
	const search = UserService.read.getAllByRole(req.params.id);
	return response.json(search, res, next);
}

function update(req, res, next){
	const user = {
		id: req.params.id,
		name: req.body.name,
		provider: req.body.provider,
		idByProvider: req.body.idByProvider,
		id_role: req.body.id_role
	};

	const update = UserService.update(user);
	return response.json(update, res, next);
}

function remove(req, res, next){
	const remove = UserService.remove(req.params.id);
	return response.json(remove, res, next);
}

module.exports = {
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