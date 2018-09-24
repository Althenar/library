'use strict';

//const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const
	bookRoute = require('./book'),
	shelfRoute = require('./shelf'),
	bookcaseRoute = require('./bookcase'),
	express = require('express');

const router = express.Router();

router.use('/book',/* ensureLoggedIn('/auth/login'),*/ bookRoute);
router.use('/shelf', shelfRoute);
router.use('/bookcase', bookcaseRoute);

module.exports = router;