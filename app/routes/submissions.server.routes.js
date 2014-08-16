'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var submissions = require('../../app/controllers/submissions');

	// Submissions Routes
	app.route('/submissions')
		.get(submissions.list)
		.post(users.requiresLogin, submissions.create);

	app.route('/submissions/:submissionId')
		.get(submissions.read)
		.put(users.requiresLogin, submissions.hasAuthorization, submissions.update)
		.delete(users.requiresLogin, submissions.hasAuthorization, submissions.delete);

	// Finish by binding the Submission middleware
	app.param('submissionId', submissions.submissionByID);
};