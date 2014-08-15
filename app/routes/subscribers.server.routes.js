'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var subscribers = require('../../app/controllers/subscribers');

	// Subscribers Routes
	app.route('/subscribers')
		.get(subscribers.list)
		.post(users.requiresLogin, subscribers.create);

	app.route('/subscribers/:subscriberId')
		.get(subscribers.read)
		.put(users.requiresLogin, subscribers.hasAuthorization, subscribers.update)
		.delete(users.requiresLogin, subscribers.hasAuthorization, subscribers.delete);

	// Finish by binding the Subscriber middleware
	app.param('subscriberId', subscribers.subscriberByID);
};