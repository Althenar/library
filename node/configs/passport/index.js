'use strict';

const passport = require('passport');
const UserService = require('../../server/services/user');

const
	google = require('./google-OAuth'),
	facebook = require('./facebook-OAuth');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	UserService.read.getById(id)
		.then((user) => {
			done(null, user.toJSON());
		}).catch((err) => {
			return done(err, null);
		});
});

passport.use(google);
passport.use(facebook);

module.exports = passport;