'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.addBook = function addBook (req, res, next) {
  Default.addBook(req.swagger.params, res, next);
};

module.exports.addBookcase = function addBookcase (req, res, next) {
  Default.addBookcase(req.swagger.params, res, next);
};

module.exports.addShelf = function addShelf (req, res, next) {
  Default.addShelf(req.swagger.params, res, next);
};

module.exports.deleteBook = function deleteBook (req, res, next) {
  Default.deleteBook(req.swagger.params, res, next);
};

module.exports.deleteBookcase = function deleteBookcase (req, res, next) {
  Default.deleteBookcase(req.swagger.params, res, next);
};

module.exports.deleteShelf = function deleteShelf (req, res, next) {
  Default.deleteShelf(req.swagger.params, res, next);
};

module.exports.findBookByID = function findBookByID (req, res, next) {
  Default.findBookByID(req.swagger.params, res, next);
};

module.exports.findBookcaseByID = function findBookcaseByID (req, res, next) {
  Default.findBookcaseByID(req.swagger.params, res, next);
};

module.exports.findBookcases = function findBookcases (req, res, next) {
  Default.findBookcases(req.swagger.params, res, next);
};

module.exports.findBooks = function findBooks (req, res, next) {
  Default.findBooks(req.swagger.params, res, next);
};

module.exports.findShelfByID = function findShelfByID (req, res, next) {
  Default.findShelfByID(req.swagger.params, res, next);
};

module.exports.findShelves = function findShelves (req, res, next) {
  Default.findShelves(req.swagger.params, res, next);
};
