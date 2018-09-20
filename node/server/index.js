'use strict';

const
	express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	passport = require('../configs/passport'),
	session = require('cookie-session');

module.exports = function() {

	const server = express();

	const create = function(config) {

		const routes = require('./routes/index');
		const cookieSettings = require('../configs/settings').cookieSettings;

		server.set('env', config.env);
		server.set('port', config.port);
		server.set('hostname', config.hostname);
		server.set('viewDir', config.viewDir);

		server.use(express.json());
		server.use(logger('dev'));
		server.use(express.urlencoded({ extended: false }));
		server.use(cookieParser());

		server.use(session(cookieSettings));

		server.set('views', server.get('viewDir'));
		server.set('view engine', 'pug');

		server.use(passport.initialize());
		server.use(passport.session());


		routes.init(server);
	};

	const start = function() {

		const hostname = server.get('hostname'),
			port = server.get('port');

		server.listen(port, function () {
			console.log(`Express server listening on - http://${hostname}:${port}/`);
		});
	};

	return {
		create: create,
		start: start
	};
};
