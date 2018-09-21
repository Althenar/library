'use strict';

function login(req, res) {
	res.json('/google or /facebook');
}

function logout(req, res) {
	req.logout();
	res.json('logged out');
}

function auth(req, res) {
	res.json(`logged in with ${req.user.provider}`);
}

module.exports = {
	login,
	logout,
	auth
};