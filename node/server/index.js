'use strict';

const
	express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	passport = require('../configs/passport'),
	session = require('cookie-session'),
	https = require('https'),
	fs = require('fs');

const key = fs.readFileSync('configs/encryption/key.pem', 'utf8');
const cert = fs.readFileSync('configs/encryption/server.crt', 'utf8');

module.exports = () => {

	const server = express();

	const create = (config) => {

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

	const start = () => {

		const hostname = server.get('hostname'),
			port = server.get('port');

		https.createServer({
			key: key,
			cert: cert
		}, server).listen(port, () => {
			console.log(`Express server listening on - https://${hostname}:${port}/`);
		});
	};

	return {
		create: create,
		start: start
	};
};
