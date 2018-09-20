'use strict';

const settings = require('../../configs/settings');
const knex = require('knex')(settings.database);
const bookshelf = require('bookshelf')(knex);
const validator = require('validator');

validator.isRequired = function (value) {
	if (value) return true;
	return false;
};

bookshelf.plugin('registry');
bookshelf.plugin('bookshelf-validate', {
	validator: validator,
	validateOnSave: true
});

module.exports = bookshelf;
