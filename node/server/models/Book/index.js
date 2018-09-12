'use strict';

const db = require('../index');

require('../Shelf');

const Book = db.model('Book',{
	tableName: 'book',
	shelf: function() {
		return this.hasOne('Shelf','id','id_shelf');
	},
	validations: {
		isbn: 'isRequired'
	}
});

module.exports = Book;