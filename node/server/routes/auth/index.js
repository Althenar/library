'use strict';

const router = require('express').Router();
const permission = require('permission');
const passport = require('../../../configs/passport');

const AuthController = require('../../controllers/auth');

router.get('/login', AuthController.login);

router.get('/logout', permission(), AuthController.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/google/callback', passport.authenticate('google'), AuthController.auth);

router.get('/facebook/callback', passport.authenticate('facebook'), AuthController.auth);

module.exports = router;
