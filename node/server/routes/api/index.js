'use strict';

const
	bookRoute = require('./book'),
	shelfRoute = require('./shelf'),
	bookcaseRoute = require('./bookcase'),
	express = require('express');

const router = express.Router();

router.use('/book', bookRoute);
router.use('/shelf', shelfRoute);
router.use('/bookcase', bookcaseRoute);

module.exports = router;