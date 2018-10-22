'use strict';

const db = require('../index');

require('../User');
require('../Book');

const History = db.model('History', {
	tableName: 'history',
	user: function() {
		return this.hasOne('User','id','id_user');
	},
	book: function() {
		return this.hasOne('Book', 'id', 'id_book');
	}
});

module.exports = History;