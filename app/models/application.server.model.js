'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Application Schema
 */
var ApplicationSchema = new Schema({
	firstName: {
		type: String,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	lastName: {
		type: String,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	gender: {
		type: Object(["male", "female", "other"]),
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	street: {
		type: String,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	city: {
		type: String,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	state: {
		type: Object,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	zip: {
		type: Number,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	email: {
		type: String,
		default: '',
		required: 'Please fill Application name',
		trim: true
	},

	phone: {
		type: Number,
		default: '',
		required: 'Please fill Application name',
		trim: true
	}
});

mongoose.model('Application', ApplicationSchema);
