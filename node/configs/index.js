'use strict';

const
	_ = require('lodash'),
	env = process.env.NODE_ENV || 'local',
	envConfig = require(`./${env}`);

const defaultConfig = {
	env: env
};

module.exports = _.merge(defaultConfig, envConfig);