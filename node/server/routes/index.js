'use strict';

const
	apiRoute = require('./api'),
	userRoute = require('./user'),
	homeRoute = require('./home'),
	swaggerUi = require('swagger-ui-express'),
	YAML = require('yamljs'),
	swaggerDocument = YAML.load('./server/swagger.yaml');

function init(server) {
	server.get('*', function (req, res, next) {
		console.log(`Request was made to: ${req.originalUrl}`);
		return next();
	});

	server.get('/', function (req, res) {
		res.redirect('/api/book');
	});

	server.use('/api', apiRoute);
	server.use('/home', homeRoute);
	server.use('/user', userRoute);
	server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = {
	init: init
};