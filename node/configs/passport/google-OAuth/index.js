'use strict';

const 
	GoogleStrategy = require('passport-google-oauth20');

const 
	verifyCallback = require('../verifyCallback'),
	googleKey = require('../../settings').google;

const google = new GoogleStrategy(googleKey, verifyCallback);

module.exports = google;