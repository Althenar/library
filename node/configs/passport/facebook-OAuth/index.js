'use strict';

const 
	FacebookStrategy = require('passport-facebook');

const 
	verifyCallback = require('../verifyCallback'),
	facebookKey = require('../../settings').facebook;

const facebook = new FacebookStrategy(facebookKey, verifyCallback);

module.exports = facebook;