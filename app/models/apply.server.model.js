'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Apply Schema
 */
var ApplySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Apply name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Apply', ApplySchema);