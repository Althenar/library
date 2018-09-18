'use strict';

const db = require('../index');

require('../Role');

const User = db.model('User',{
	tableName: 'user',
	role: function() {
		return this.hasOne('Role','id','id_role');
	},
	validations: {
		name: 'isRequired',
		provider: 'isRequired',
		idByProvider: 'isRequired'
	}
});

module.exports = User;