'use strict';

const GoogleStrategy = require('passport-google-oauth20');
const UserService = require('../../../server/services/user');
const googleKey = require('../../settings').google;

module.exports = new GoogleStrategy(googleKey, 
	(accessToken, refreshToken, profile, done) => {
		UserService.read.getByProviderAndIdByProvider(profile.provider, profile.id)
			.then((currentUser) => {
				if (currentUser)
					done(null, currentUser.toJSON());
				else {
					const user = {
						name: profile.displayName,
						provider: profile.provider,
						idByProvider: profile.id
					};

					UserService.create(user)
						.then((newUser) => {
							done(null, newUser.toJSON());
						});
				}
			});
	}
);