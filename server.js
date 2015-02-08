'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error('\x1b[31m', 'Could not connect to MongoDB!');
		console.log(err);
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (process.env.NODE_ENV === 'production') {
	if (cluster.isMaster) {
		// Fork workers.
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		cluster.on('exit', function(worker, code, signal) {
			console.log('worker ' + worker.process.pid + ' died');
		});
		// Listen for dying workers
		cluster.on('exit', function (worker) {

			// Replace the dead worker,
			// we're not sentimental
			console.log('Worker ' + worker.id + ' died :(');
			cluster.fork();

		});
	} else {
		// Start the app by listening on <port>
		app.listen(config.port);

// Expose app
		exports = module.exports = app;

// Logging initialization
		console.log('MEAN.JS application started on port ' + config.port);
	}
} else {
	app.listen(config.port);

// Expose app
	exports = module.exports = app;

// Logging initialization
	console.log('MEAN.JS application started on port ' + config.port);
}
