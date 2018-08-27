const db = require('./index');

const Bookcase = db.model('Bookcase', {
    tableName: 'bookcase',
    name: String
});
module.exports = Bookcase;