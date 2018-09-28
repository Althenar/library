'use strict';

const
	bookRoute = require('./book'),
	shelfRoute = require('./shelf'),
	bookcaseRoute = require('./bookcase'),
	userRoute = require('./user'),
	borrowRoute = require('./borrow');

const router = require('express').Router();

router.use('/book', bookRoute);
router.use('/borrow', borrowRoute);
router.use('/shelf', shelfRoute);
router.use('/bookcase', bookcaseRoute);
router.use('/user', userRoute);

module.exports = router;