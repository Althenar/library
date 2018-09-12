'use strict';

const db = require('../index');

const Bookcase = db.model('Bookcase', {
	tableName: 'bookcase'
});
module.exports = Bookcase;