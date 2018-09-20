'use strict';

const FacebookStrategy = require('passport-facebook');
const UserService = require('../../../server/services/user');
const facebookKey = require('../../settings').facebook;

module.exports = new FacebookStrategy(
	//facebook strategy definition
);