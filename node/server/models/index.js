'use strict';

const 
	settings = require('../../configs/settings');

const 
	knex = require('knex')(settings.database),
	bookshelf = require('bookshelf')(knex),
	validator = require('validator');

validator.isRequired = (value) => {
	if (value) return true;
	return false;
};

bookshelf.plugin('registry');
bookshelf.plugin('bookshelf-validate', {
	validator: validator,
	validateOnSave: true
});

module.exports = bookshelf;
