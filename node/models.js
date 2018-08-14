module.exports = function (db, cb) {
    var Bookcase = db.define('bookcase', {
        name: {type: 'text'}
    });

    var Shelf = db.define('shelf', {
        row: {type: 'integer'},
        col: {type: 'integer'}
    }, validations: {
        row: orm.enforce.required("row is required");
        col: orm.enforce.required("col is required");
    });
    Shelf.hasOne('bookcase', Shelf, {required: true, reverse: 'shelves', autoFetch: true});

    var Book = db.define('book', {
        isbn: {type: 'text'},
        author: {type: 'text'},
        title: {type: 'text'}
    }, validations: {
        isbn: orm.enforce.notEmptyString("isbn must not be empty");
    })
    Book.hasOne('shelf', Shelf, {required: true, reverse: 'books', autoFetch: true});

    return cb();
};
