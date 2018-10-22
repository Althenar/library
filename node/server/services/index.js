'use strict';

const 
	Book = require('../models/Book'),
	Shelf = require('../models/Shelf'),
	Bookcase = require('../models/Bookcase'),
	Queue = require('../models/Queue'),
	Borrow = require('../models/Borrow'),
	History = require('../models/History'),
	User = require('../models/User');

module.exports = {
	Book,
	Shelf,
	Bookcase,
	Queue,
	Borrow,
	History,
	User
};
