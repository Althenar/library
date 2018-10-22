'use strict';

const
	bookRoute = require('./book'),
	shelfRoute = require('./shelf'),
	bookcaseRoute = require('./bookcase'),
	userRoute = require('./user'),
	historyRoute = require('./history'),
	borrowRoute = require('./borrow'),
	queueRoute = require('./queue');

const 
	router = require('express').Router();

router.use('/book', bookRoute);
router.use('/shelf', shelfRoute);
router.use('/bookcase', bookcaseRoute);
router.use('/queue', queueRoute);
router.use('/borrow', borrowRoute);
router.use('/history', historyRoute);
router.use('/user', userRoute);

module.exports = router;