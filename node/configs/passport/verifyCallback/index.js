'use strict';

const 
	UserService = require('../../../server/services/user');

function verify(accessToken, refreshToken, profile, done){
	UserService.read.getByProviderAndIdByProvider(
		profile.provider, profile.id
	).then((currentUser) => {
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

module.exports = verify;