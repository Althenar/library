'use strict';

function logout(req, res){
	req.logout();
	res.json('logged out');
}

function auth(req, res){
	res.json(req.user.provider);
}

module.exports = {
	logout,
	auth
};