'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Submission = mongoose.model('Submission'),
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
				message = 'Submission already exists';
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
 * Create a Submission
 */
exports.create = function(req, res) {
	var submission = new Submission(req.body);
	submission.user = req.user;

	submission.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(submission);
		}
	});
};

/**
 * Show the current Submission
 */
exports.read = function(req, res) {
	res.jsonp(req.submission);
};

/**
 * Update a Submission
 */
exports.update = function(req, res) {
	var submission = req.submission ;

	submission = _.extend(submission , req.body);

	submission.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(submission);
		}
	});
};

/**
 * Delete an Submission
 */
exports.delete = function(req, res) {
	var submission = req.submission ;

	submission.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(submission);
		}
	});
};

/**
 * List of Submissions
 */
exports.list = function(req, res) { Submission.find().sort('-created').populate('user', 'displayName').exec(function(err, submissions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(submissions);
		}
	});
};

/**
 * Submission middleware
 */
exports.submissionByID = function(req, res, next, id) { Submission.findById(id).populate('user', 'displayName').exec(function(err, submission) {
		if (err) return next(err);
		if (! submission) return next(new Error('Failed to load Submission ' + id));
		req.submission = submission ;
		next();
	});
};

/**
 * Submission authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.submission.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};