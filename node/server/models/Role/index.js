'use strict';

const db = require('../index');

const Role = db.model('Role', {
    tableName: 'role'
});
module.exports = Role;
