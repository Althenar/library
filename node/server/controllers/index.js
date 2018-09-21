'use strict';

function json(param,res,next) {
	param.then(function(model) {
        res.json(model);
    })
        .catch(function(err) {
            return next(new Error(err));
        });
}

module.exports = {
	json
};
