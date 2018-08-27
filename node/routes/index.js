const express = require('express');
const router = express.Router();

let Book = require('../models/Book');

router.get('/', function(req, res, next) {
  Book.where({isbn: '8385696776'}).fetch({withRelated: ['shelf']})
      .then(function(book) {
          res.json(book);
      })
      .catch(function(err) {
          return next(new Error(err));
      });
});

module.exports = router;
