'use strict';

const FacebookStrategy = require('passport-facebook');
const UserService = require('../../../server/services/user');
const facebookKey = require('../../settings').facebook;

module.exports = new FacebookStrategy(facebookKey, 
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