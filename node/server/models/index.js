'use strict';

const settings = require('../../configs/settings');
const knex = require('knex')(settings.database);
const bookshelf = require('bookshelf')(knex);
const validator = require('validator');

validator.isPrime = function (str) {
	const value = parseInt(str);
	if (isNaN(value) || value < 2) return false;

	for(let i = 2; i <= value >> 1; i++)
		if(value % i === 0)
			return false;
};

bookshelf.plugin('registry');
bookshelf.plugin('bookshelf-validate', {
	validator: validator
});

module.exports = bookshelf;
