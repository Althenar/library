'use strict';

const db = require('../index');

require('../Queue');
require('../Borrow');
require('../History');

const User = db.model('User', {
	tableName: 'user',
	queue: function (){
		return this.hasMany('Queue', 'id_user', 'id');
	},
	borrow: function (){
		return this.hasMany('Borrow', 'id_user', 'id');
	},
	history: function (){
		return this.hasMany('History', 'id_user', 'id');
	},
	validations: {
		name: 'isRequired'
	}
});

module.exports = User;