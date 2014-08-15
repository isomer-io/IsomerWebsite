'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Subscriber = mongoose.model('Subscriber'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Subscriber already exists';
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

/**
 * Create a Subscriber
 */
exports.create = function(req, res) {
	var subscriber = new Subscriber(req.body);
	subscriber.user = req.user;

	subscriber.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subscriber);
		}
	});
};

/**
 * Show the current Subscriber
 */
exports.read = function(req, res) {
	res.jsonp(req.subscriber);
};

/**
 * Update a Subscriber
 */
exports.update = function(req, res) {
	var subscriber = req.subscriber ;

	subscriber = _.extend(subscriber , req.body);

	subscriber.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subscriber);
		}
	});
};

/**
 * Delete an Subscriber
 */
exports.delete = function(req, res) {
	var subscriber = req.subscriber ;

	subscriber.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subscriber);
		}
	});
};

/**
 * List of Subscribers
 */
exports.list = function(req, res) { Subscriber.find().sort('-created').populate('user', 'displayName').exec(function(err, subscribers) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(subscribers);
		}
	});
};

/**
 * Subscriber middleware
 */
exports.subscriberByID = function(req, res, next, id) { Subscriber.findById(id).populate('user', 'displayName').exec(function(err, subscriber) {
		if (err) return next(err);
		if (! subscriber) return next(new Error('Failed to load Subscriber ' + id));
		req.subscriber = subscriber ;
		next();
	});
};

/**
 * Subscriber authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.subscriber.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};