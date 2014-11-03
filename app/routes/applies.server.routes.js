'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var applies = require('../../app/controllers/applies');

	// Applies Routes
	app.route('/applies')
		.get(applies.list)
		.post(users.requiresLogin, applies.create);

	app.route('/applies/:applyId')
		.get(applies.read)
		.put(users.requiresLogin, applies.hasAuthorization, applies.update)
		.delete(users.requiresLogin, applies.hasAuthorization, applies.delete);

	// Finish by binding the Apply middleware
	app.param('applyId', applies.applyByID);
};