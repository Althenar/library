'use strict';

const
	express = require('express'),
	cookieParser = require('cookie-parser'),
	session = require('cookie-session'),
	logger = require('morgan'),
	https = require('https'),
	fs = require('fs'),
	server = express();

const 
	passport = require('../configs/passport');

const 
	key = fs.readFileSync('configs/encryption/key.pem', 'utf8'),
	cert = fs.readFileSync('configs/encryption/server.crt', 'utf8');

const create = (config) => {

	const 
		routes = require('./routes/index'),
		cookieSettings = require('../configs/settings').cookieSettings;

	server.set('env', config.env);
	server.set('port', config.port);
	server.set('hostname', config.hostname);

	server.use(express.json());
	server.use(logger('dev'));
	server.use(express.urlencoded({ extended: false }));
	server.use(cookieParser());

	server.use(session(cookieSettings));

	server.use(passport.initialize());
	server.use(passport.session());

	routes.init(server);
};

const start = () => {

	const 
		hostname = server.get('hostname'),
		port = server.get('port');

	https.createServer({
		key: key,
		cert: cert
	}, server).listen(port, () => {
		console.log(`Express server listening on - https://${hostname}:${port}/`);
	});
};

module.exports = {
	create,
	start
};