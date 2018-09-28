'use strict';

const Book = require('../models/Book');
const Shelf = require('../models/Shelf');
const Bookcase = require('../models/Bookcase');
const Borrow = require('../models/Borrow');
const Queue = require('../models/Queue');
const User = require('../models/User');

module.exports = {
	Book,
	Shelf,
	Bookcase,
	Borrow,
	Queue,
	User
};
