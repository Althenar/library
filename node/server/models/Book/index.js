'use strict';

const db = require('../index');

require('../Shelf');
require('../Queue');
require('../Borrow');
require('../History');

const Book = db.model('Book', {
	tableName: 'book',
	shelf: function() {
		return this.hasOne('Shelf','id','id_shelf');
	},
	queue: function (){
		return this.hasMany('Queue', 'id_book', 'id');
	},
	borrow: function (){
		return this.hasOne('Borrow', 'id', 'id_book');
	},
	history: function (){
		return this.hasMany('History', 'id_book', 'id');
	},
	validations: {
		isbn: 'isRequired'
	}
});

module.exports = Book;