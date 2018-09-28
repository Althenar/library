'use strict';

const
	permission = require('permission'),
	YAML = require('yamljs'),
	swaggerUi = require('swagger-ui-express'),
	swaggerDocument = YAML.load('./server/swagger.yaml');

const
	apiRoute = require('./api'),
	authRoutes = require('./auth'),
	homeRoute = require('./home');

const init = (server) => {
	server.get('*', (req, res, next) => {
		console.log(`Request was made to: ${req.originalUrl}`);
		return next();
	});

	server.get('/', (req, res) => {
		res.redirect('/api/book');
	});

	server.use('/api', apiRoute);
	server.use('/home', homeRoute);
	server.use('/auth', authRoutes);
	server.use('/api-docs', permission(['admin']), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = {
	init
};