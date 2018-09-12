'use strict';

const db = require('../index');

require('../Bookcase');

const Shelf = db.model('Shelf',{
	tableName: 'shelf',
	bookcase: function () {
		return this.hasOne('Bookcase', 'id', 'id_bookcase');
	},
	validations: {
		row: 'isRequired',
		col: 'isRequired'
	}
});

module.exports = Shelf;