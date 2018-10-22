'use strict';

const
	YAML = require('yamljs'),
	permission = require('permission'),
	swaggerUi = require('swagger-ui-express');

const
	apiRoute = require('./api'),
	authRoutes = require('./auth'),
	swaggerDocument = YAML.load('./server/swagger.yaml');

const init = (server) => {
	server.get('*', (req, res, next) => {
		console.log(`Request was made to: ${req.originalUrl}`);
		
		return next();
	});

	server.get('/', (req, res) => {
		res.redirect('/api/book');
	});

	server.use('/api', apiRoute);
	server.use('/auth', authRoutes);

	server.use(
		'/api-docs', 
		permission(['admin']), 
		swaggerUi.serve, 
		swaggerUi.setup(swaggerDocument)
	);
};

module.exports = {
	init
};