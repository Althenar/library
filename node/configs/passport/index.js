'use strict';

const passport = require('passport');
const UserService = require('../../server/services/user');

const
	google = require('./google-OAuth'),
	facebook = require('./facebook-OAuth');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});


passport.deserializeUser(function (id, done) {
	UserService.read.getById(id).then(function(user) {
		done(null, user);
	}).catch(function(err) {
		return done(new Error(err), null);
	});
});


passport.use(google);
passport.use(facebook);

module.exports = passport;