'use strict';

const json = (param,res,next) => {
	param
		.then((model) => {
			res.json(model);
		})
		.catch((err) => {
			return next(new Error(err));
		});
};

module.exports = {
	json
};