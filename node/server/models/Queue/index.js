'use strict';

const db = require('../index');

require('../User');
require('../Book');

const Queue = db.model('Queue',{
	tableName: 'queue',
	user: function() {
		return this.hasOne('User','id','id_user');
	},
	book: function() {
		return this.hasOne('Book', 'id', 'id_book');
	},
	validations: {
		id_user: 'isRequired',
		id_book: 'isRequired'
	}
});

module.exports = Queue;