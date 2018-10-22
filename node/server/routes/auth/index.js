'use strict';

const 
	router = require('express').Router(),
	permission = require('permission');

const 
	passport = require('../../../configs/passport'),
	AuthController = require('../../controllers/auth');

router.get(
	'/logout', 
	permission(), 
	AuthController.logout
);

router.get(
	'/google', 
	passport.authenticate('google', { 
		scope: ['profile'] 
	})
);

router.get(
	'/facebook', 
	passport.authenticate('facebook')
);

router.get(
	'/google/callback', 
	passport.authenticate('google'), 
	AuthController.auth
);

router.get(
	'/facebook/callback', 
	passport.authenticate('facebook'), 
	AuthController.auth
);

module.exports = router;
