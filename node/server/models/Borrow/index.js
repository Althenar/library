'use strict';

const db = require('../index');

require('../User');
require('../Book');

const Borrow = db.model('Borrow',{
	tableName: 'borrow',
	user: function() {
		return this.hasOne('User','id','id_user');
	},
	book: function() {
		return this.hasOne('Book', 'id', 'id_book');
	}
});

module.exports = Borrow;