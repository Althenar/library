'use strict';

const
	express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser');

module.exports = function() {

	const server = express();

	const create = function(config) {

		const routes = require('./routes/index');

		server.set('env', config.env);
		server.set('port', config.port);
		server.set('hostname', config.hostname);
		server.set('viewDir', config.viewDir);

		server.use(express.json());
		server.use(logger('dev'));
		server.use(express.urlencoded({ extended: false }));
		server.use(cookieParser());

		server.set('views', server.get('viewDir'));
		server.set('view engine', 'pug');

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
