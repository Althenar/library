'use strict';

const router = require('express').Router();
const passport = require('../../../configs/passport');

const AuthController = require('../../controllers/auth');

router.get('/login', AuthController.login);

router.get('/logout', AuthController.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', passport.authenticate('google'), AuthController.auth);

module.exports = router;
