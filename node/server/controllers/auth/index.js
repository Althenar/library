'use strict';

function login(req, res) {
    res.render('login', { user: req.user });
}

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

function auth(req, res) {
	res.json('logged in with google');
}

module.exports = {
	login,
	logout,
	auth
};