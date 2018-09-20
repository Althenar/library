'use strict';

function login(req, res) {
	res.json(req.user);
}

function logout(req, res) {
	req.logout();
	res.json('logged out');
}

function auth(req, res) {
	res.json('logged in with google');
}

module.exports = {
	login,
	logout,
	auth
};