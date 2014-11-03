'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Apply = mongoose.model('Apply'),
	_ = require('lodash');

/**
 * Create a Apply
 */
exports.create = function(req, res) {
	var apply = new Apply(req.body);
	apply.user = req.user;

	apply.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(apply);
		}
	});
};

/**
 * Show the current Apply
 */
exports.read = function(req, res) {
	res.jsonp(req.apply);
};

/**
 * Update a Apply
 */
exports.update = function(req, res) {
	var apply = req.apply ;

	apply = _.extend(apply , req.body);

	apply.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(apply);
		}
	});
};

/**
 * Delete an Apply
 */
exports.delete = function(req, res) {
	var apply = req.apply ;

	apply.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(apply);
		}
	});
};

/**
 * List of Applies
 */
exports.list = function(req, res) { Apply.find().sort('-created').populate('user', 'displayName').exec(function(err, applies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(applies);
		}
	});
};

/**
 * Apply middleware
 */
exports.applyByID = function(req, res, next, id) { Apply.findById(id).populate('user', 'displayName').exec(function(err, apply) {
		if (err) return next(err);
		if (! apply) return next(new Error('Failed to load Apply ' + id));
		req.apply = apply ;
		next();
	});
};

/**
 * Apply authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.apply.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};