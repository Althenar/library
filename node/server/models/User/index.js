'use strict';

const db = require('../index');

require('../Borrow');

const User = db.model('User',{
	tableName: 'user',
	borrowed: function (){
		return this.hasMany('Borrow', 'id_user', 'id');
	},
	validations: {
		name: 'isRequired',
		provider: 'isRequired',
		idByProvider: 'isRequired'
	}
});

module.exports = User;