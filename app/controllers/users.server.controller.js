'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication'),
	require('./users/users.authorization'),
	require('./users/users.password'),
	require('./users/users.profile')
);

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'User already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

module.exports.list = function(req, res) {



    User.find().sort('-created').exec(function(err, submissions) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(submissions);
        }
    });
};