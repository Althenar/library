'use strict';

const
	apiRoute = require('./api'),
	userRoute = require('./user'),
	authRoutes = require('./auth'),
    passport = require('passport'),
    profileRoute = require('./profile'),
    passportSetup = require('../../configs/passport-setup'),
    cookieSession = require('cookie-session'),
    keys = require('../../configs/keys'),
	homeRoute = require('./home'),
	swaggerUi = require('swagger-ui-express'),
	YAML = require('yamljs'),
    jsyaml = require('js-yaml'),
	swaggerDocument = YAML.load('./server/swagger.yaml');

function init(server) {

    server.set('view engine', 'ejs');

    // initialize passport
    server.use(passport.initialize());
    server.use(passport.session());

	server.get('*', function (req, res, next) {
		console.log(`Request was made to: ${req.originalUrl}`);
		return next();
	});

	server.get('/', function (req, res) {
        res.render('home', {user:req.user});
		//res.redirect('/api/book');
	});

    server.get('/', function (req, res) {
        res.redirect('/api/book');
    });

    ///////////////////////////
	const swaggerDoc = jsyaml.safeLoad(swaggerDocument);





	////////////////////////////////

	server.use('/api', apiRoute);
	server.use('/home', homeRoute);
    server.use('/profile', profileRoute);
	server.use('/user', userRoute);
	server.use('/auth', authRoutes);
	server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = {
	init: init
};