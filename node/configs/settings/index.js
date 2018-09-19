'use strict';

const settings = {
	database: {
		client: 'mysql',
		connection: {
			host: '192.168.201.231',
			database: 'r_library',
			user: 'php_library',
			password: 'php_library',
			protocol: 'mysql',
			port: '3306',
			charset  : 'utf8'
		}
	},
	apiKey: 'vqiDyOjwahioB6ALBvIt8w&q',
	google: {
		callbackURL: '',
		clientID: '389125882410-jocemi2fnkd291fj0djqurb3g6osn2ch.apps.googleusercontent.com',
		clientSecret: 'tl1EtqxM2KOIXdxeb4x-6ljP'
	},
	facebook: {
		callbackURL: '',
		clientID: '1233420446798773',
		clientSecret: '3ed8b930f2ffb7939153ca347bae9abe'
	},
	cookieSettings: {
		maxAge: 24 * 60 * 60 * 1000,
		keys: 'AlthSoftLibraryTracker'
	}
};

module.exports = settings;